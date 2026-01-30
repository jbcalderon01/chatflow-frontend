import { PriorityLevel, StatusTag } from "@/shared/types";

export type Conversation = {
  id: string;
  leadId: string;
  lead: {
    id: string;
    name: string;
    email: string;
    phone?: string;
  };
  messages: Message[];
  lastMessageAt: string;
  statusTag: StatusTag;
  priorityLevel: PriorityLevel;
  unreadMessagesCount: number;
  project: Project;
};

export type AssignedAgent = {
  id: string;
  name: string;
};

type Project = {
  id: string;
  name: string;
};

export type Message = {
  id: string;
  conversationId?: string;
  content: string;
  senderType: "LEAD" | "AGENT";
  createdAt: string;
};

export type GetMyConversationsResponse = {
  data: Array<Conversation>;
  total_count: number;
  per_page: number;
  page: number;
};

export type CreateConversationRequest = {
  projectId: string;
  name: string;
  email: string;
  phone: string;
  message?: string;
};

export type CreateConversationResponse = Conversation & {
  assignedAgent: AssignedAgent;
  messages: Message[];
};
