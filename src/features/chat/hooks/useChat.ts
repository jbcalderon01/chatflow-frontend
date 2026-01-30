"use client";
import { useState, useEffect } from "react";
import { useGetMyConversations } from "@/shared/api/hooks/queries";
import { useGetConversationById } from "@/shared/api/hooks/queries/useGetConversationById";
import { Conversation, Message } from "@/shared/api";

export const useChat = (conversationId?: string | null) => {
  const { data: dataConversations } = useGetMyConversations();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);

  const {
    data: conversation,
    isLoading: isLoadingConversation,
    error: errorConversation,
  } = useGetConversationById(conversationId || "");

  useEffect(() => {
    if (conversation?.messages && conversation.messages !== messages) {
      setMessages(conversation.messages);
    }
  }, [conversation, messages]);

  useEffect(() => {
    if (dataConversations?.data && dataConversations.data !== conversations) {
      setConversations(dataConversations.data);
    }
  }, [dataConversations, conversations]);

  return {
    conversations,
    messages,
    isLoading: isLoadingConversation,
    error: errorConversation,
    setMessages,
    setConversations,
  };
};
