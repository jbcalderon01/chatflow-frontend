import { useMutation } from "@tanstack/react-query";
import { ConversationsService } from "../../services";

export const useGenerateSummary = () => {
  return useMutation({
    mutationFn: (conversationId: string) =>
      ConversationsService.getSummary(conversationId),
  });
};
