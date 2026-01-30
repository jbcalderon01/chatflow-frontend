"use client";
import { useState, useCallback } from "react";
import { Project } from "@/shared/api";
import { useGetProjects, useCreateConversation } from "@/shared/api/hooks";
import { usePublicWebSocket } from "./usePublicWebSocket";
import { Message } from "@/shared/api";
import { ENV } from "@/shared/consts";

export type ChatState = "IDLE" | "SUBMITTING" | "WAITING" | "ACTIVE";

export const useProjectView = () => {
  const { data: projects, isLoading } = useGetProjects();
  const { mutateAsync: createConversation, isPending: isCreating } =
    useCreateConversation();

  const [state, setState] = useState<ChatState>("IDLE");
  const [messages, setMessages] = useState<Message[]>([]);
  const [agentName, setAgentName] = useState<string | null>(null);
  const [isTypingAgent, setIsTypingAgent] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [project, setProject] = useState<string>("");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const selectProject = (p: Project) => {
    setSelectedProject(p);
    setProject(p.id);
  };

  const startChat = useCallback(
    async (data: {
      name: string;
      email: string;
      phone: string;
      project: string;
      message: string;
    }) => {
      setState("SUBMITTING");
      setProject(data.project);
      try {
        const response = await createConversation({
          projectId: data.project,
          name: data.name,
          email: data.email,
          phone: data.phone,
          message: data.message,
        });

        setConversationId(response.id);
        setAgentName(response.assignedAgent?.name);
        // Ensure messages are set from response, which should include the initial message if backend processed it
        setMessages(response.messages);

        // No initial user message to show, just wait for agent or connection
        setState("WAITING");
      } catch (error) {
        console.error("Error starting conversation:", error);
        setState("IDLE");
      }
    },
    [createConversation],
  );

  const {
    sendMessage: sendWs,
    notifyTyping,
    leaveConversation,
  } = usePublicWebSocket({
    url: ENV.WEBSOCKET_URL,
    conversationId: conversationId || null,
    onMessage: (msg) => {
      setMessages((prev) => [...prev, msg]);
    },
    onTyping: (typing) => setIsTypingAgent(typing),
    onConnect: () => {
      console.log("WS Connected in View");
      if (state === "WAITING") {
        setState("ACTIVE");
        setMessages((prev) => [...prev]);
      }
    },
    onDisconnect: () => console.log("WS Disconnected in View"),
  });

  const resetChat = useCallback(() => {
    setState("IDLE");
    setMessages([]);
    setAgentName(null);
    setIsTypingAgent(false);
    setConversationId(null);
    setSelectedProject(null);
    setProject("");
    leaveConversation();
  }, [conversationId]);

  const sendMessage = useCallback(
    (content: string) => {
      if (!content.trim()) return;
      // Send via WS if active
      if (conversationId) {
        sendWs(content);
        // Optimistic update
        const msg: Message = {
          id: Math.random().toString(),
          conversationId: conversationId,
          senderType: "LEAD",
          content,
          createdAt: new Date().toISOString(),
        };
        setMessages((prev) => [...prev, msg]);
      }
    },
    [conversationId, sendWs],
  );

  return {
    state,
    messages,
    agentName,
    isTypingAgent,
    project,
    projects: projects?.data ?? [],
    isProjectsLoading: isLoading,
    selectedProject,
    selectProject,
    resetChat,
    startChat,
    sendMessage,
    notifyTyping,
  };
};
export default useProjectView;
