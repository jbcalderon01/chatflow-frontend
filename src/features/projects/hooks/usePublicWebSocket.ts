import { useCallback, useMemo } from "react";
import { Message } from "@/shared/api";
import { useWebSocket } from "@/shared/hooks";

interface UsePublicWebSocketProps {
  url?: string;
  conversationId: string | null;
  onMessage: (message: Message) => void;
  onTyping: (isTyping: boolean) => void;
  onConnect?: () => void;
  onDisconnect?: () => void;
}

export const usePublicWebSocket = ({
  url,
  conversationId,
  onMessage,
  onTyping,
  onConnect,
  onDisconnect,
}: UsePublicWebSocketProps) => {
  const queryParams = useMemo(
    () => (conversationId ? { conversationId } : undefined),
    [conversationId],
  );

  const handleReceiveMessage = useCallback(
    (message: Message) => {
      if (message.conversationId !== conversationId) return;
      onMessage(message);
    },
    [conversationId],
  );

  const handleIsTyping = useCallback(
    (message: {
      conversationId: string;
      senderType: string;
      isTyping: boolean;
      type: string;
    }) => {
      if (message.conversationId === conversationId) {
        onTyping(message.isTyping);
      }
    },
    [conversationId],
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
        default:
          break;
      }
    },
    [handleIsTyping, handleReceiveMessage],
  );

  const { sendMessage: send, isConnected } = useWebSocket({
    url,
    queryParams,
    onOpen: onConnect,
    onClose: onDisconnect,
    onMessage: handleOnMessage,
    shouldConnect: !!url && !!conversationId,
  });

  const sendMessage = useCallback(
    (content: string) => {
      send({
        action: "sendMessage",
        content,
        conversationId,
        senderType: "LEAD",
      });
    },
    [send, conversationId],
  );

  const notifyTyping = useCallback(
    (isTyping: boolean) => {
      send({
        action: "typing",
        isTyping,
        conversationId,
        senderType: "LEAD",
      });
    },
    [send, conversationId],
  );

  const leaveConversation = useCallback(() => {
    send({
      action: "leaveConversation",
      conversationId,
      senderType: "LEAD",
    });
  }, [send, conversationId]);

  return {
    sendMessage,
    notifyTyping,
    isConnected,
    leaveConversation,
  };
};
