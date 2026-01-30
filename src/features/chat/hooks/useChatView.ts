"use client";
import { useState, useMemo, useCallback, useEffect } from "react";
import { useChat } from "@/features/chat/hooks/useChat";

import { useAuth, useWebSocket } from "@/shared/hooks";
import { ENV } from "@/shared/consts";
import { Conversation, Message } from "@/shared/api";

export const useChatView = () => {
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const { user } = useAuth();
  const {
    conversations,
    messages,
    setMessages,
    setConversations,
    isLoading: isLoadingConversation,
  } = useChat(selectedChatId);

  const params = useMemo(() => {
    const token = user?.token || "";
    return {
      token,
    };
  }, [user]);

  const handleReceiveMessage = useCallback(
    (message: Message) => {
      if (message.conversationId !== selectedChatId) {
        const findConversation = conversations.find(
          (c) => c.id === message.conversationId,
        );
        if (findConversation) {
          setConversations((prev) =>
            prev.map((c) =>
              c.id === message.conversationId
                ? {
                    ...c,
                    unreadMessagesCount: c.unreadMessagesCount + 1,
                  }
                : c,
            ),
          );
        }
      } else {
        setMessages((prev) => [...prev, message]);
      }
      setConversations((prev) =>
        prev.map((c) =>
          c.id === message.conversationId
            ? {
                ...c,
                lastMessageAt: message.createdAt,
                messages: [message],
              }
            : c,
        ),
      );
    },
    [selectedChatId, conversations, setConversations, setMessages],
  );

  const handleIsTyping = useCallback(
    (message: {
      conversationId: string;
      senderType: string;
      isTyping: boolean;
      type: string;
    }) => {
      if (message.conversationId === selectedChatId) {
        setIsTyping(message.isTyping);
      }
    },
    [selectedChatId],
  );

  const handleReceiveConversation = useCallback(
    (conversation: Conversation) => {
      const isExist = conversations.find((c) => c.id === conversation.id);
      if (isExist) {
        setConversations((prev) =>
          prev.map((c) =>
            c.id === conversation.id ? { ...c, ...conversation } : c,
          ),
        );
      } else {
        setConversations((prev) => [...prev, conversation]);
      }
    },
    [conversations, setConversations],
  );

  const handleOnMessage = useCallback(
    (data: MessageEvent) => {
      const receiveMessage = JSON.parse(data.data) as {
        type: string;
      };

      switch (receiveMessage.type) {
        case "new_message": {
          const message = receiveMessage as {
            conversationId: string;
            message: Message;
            type: string;
          };
          handleReceiveMessage(message.message);
          break;
        }
        case "typing": {
          const message = receiveMessage as {
            conversationId: string;
            senderType: string;
            isTyping: boolean;
            type: string;
          };
          handleIsTyping(message);
          break;
        }
        case "new_conversation": {
          const conversation = receiveMessage as {
            conversation: Conversation;
            type: string;
          };
          handleReceiveConversation(conversation.conversation);
          break;
        }
        default:
          break;
      }
    },
    [handleIsTyping, handleReceiveMessage, handleReceiveConversation],
  );

  const ws = useWebSocket({
    url: ENV.WEBSOCKET_URL,
    queryParams: params,
    shouldConnect: !!user,
    onMessage: handleOnMessage,
  });

  const onJoinConversation = useCallback(() => {
    ws.sendMessage({
      action: "joinConversation",
      conversationId: selectedChatId,
    });
    const findedConversation = conversations.find(
      (c) => c.id === selectedChatId,
    );
    if (findedConversation?.unreadMessagesCount) {
      setConversations((prev) =>
        prev.map((c) =>
          c.id === selectedChatId ? { ...c, unreadMessagesCount: 0 } : c,
        ),
      );
    }
  }, [selectedChatId, conversations, ws.sendMessage, setConversations]);

  const handleSendMessage = useCallback(
    async (content: string) => {
      if (!selectedChatId || !content.trim()) return;
      ws.sendMessage({
        action: "sendMessage",
        content,
        conversationId: selectedChatId,
        senderType: "AGENT",
      });

      const msg: Message = {
        id: Math.random().toString(),
        conversationId: selectedChatId,
        senderType: "AGENT",
        content,
        createdAt: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, msg]);
      setConversations((prev) =>
        prev.map((c) =>
          c.id === selectedChatId
            ? {
                ...c,
                lastMessageAt: new Date().toISOString(),
                messages: [msg],
              }
            : c,
        ),
      );
    },
    [selectedChatId, ws.sendMessage, setConversations, setMessages],
  );

  const notifyTyping = useCallback(
    (isTyping: boolean) => {
      ws.sendMessage({
        action: "typing",
        conversationId: selectedChatId,
        senderType: "AGENT",
        isTyping,
      });
    },
    [selectedChatId, ws.sendMessage],
  );

  const selectedConversation = useMemo(
    () => conversations.find((c) => c.id === selectedChatId),
    [conversations, selectedChatId],
  );

  useEffect(() => {
    if (selectedChatId) {
      onJoinConversation();
    }
  }, [selectedChatId, onJoinConversation]);

  const resetSelection = () => setSelectedChatId(null);

  return {
    conversations,
    messages,
    isTyping,
    sendMessage: handleSendMessage,
    notifyTyping,
    selectedChatId,
    setSelectedChatId,
    selectedConversation,
    resetSelection,
    isLoading: isLoadingConversation,
  };
};
