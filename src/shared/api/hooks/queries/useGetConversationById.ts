import { queryKeys } from "@/shared/consts";
import { ConversationsService } from "../../services";
import { useQuery } from "@tanstack/react-query";

export const useGetConversationById = (id: string) => {
  const { data, isLoading, error } = useQuery({
    queryKey: queryKeys.conversations.id(id),
    queryFn: () => ConversationsService.getConversationById(id),
    enabled: !!id,
  });
  return { data, isLoading, error };
};
