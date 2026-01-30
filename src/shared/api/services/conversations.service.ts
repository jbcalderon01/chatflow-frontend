import { apiClient } from "@/shared/lib/apiClient";
import {
  CreateConversationRequest,
  CreateConversationResponse,
  GetMyConversationsResponse,
} from "../types";

const baseURL = "/conversations";

export class ConversationsService {
  static async getMyConversations(): Promise<GetMyConversationsResponse> {
    const response = await apiClient.get(baseURL);
    return response.data;
  }
  static async createConversation(body: CreateConversationRequest) {
    const response = await apiClient.post<CreateConversationResponse>(
      "/public/conversations",
      body,
    );
    return response.data;
  }
  static async getConversationById(id: string) {
    const response = await apiClient.get(`${baseURL}/${id}`);
    return response.data;
  }
  static async getSummary(id: string) {
    const response = await apiClient.post<{ summary: string }>(
      `${baseURL}/${id}/summary`,
    );
    return response.data;
  }
}
