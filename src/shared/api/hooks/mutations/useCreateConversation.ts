import { useMutation } from "@tanstack/react-query";
import { ConversationsService } from "../../services";
import { CreateConversationRequest } from "../../types";

export const useCreateConversation = () => {
  return useMutation({
    mutationFn: (data: CreateConversationRequest) =>
      ConversationsService.createConversation(data),
  });
};
