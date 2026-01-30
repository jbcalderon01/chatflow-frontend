import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/shared/consts";
import { ConversationsService } from "../../services";

export const useGetMyConversations = (enabled?: boolean) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: queryKeys.conversations.me,
    queryFn: () => ConversationsService.getMyConversations(),
    enabled: enabled ?? true,
  });

  return { data, isLoading, error, refetch };
};
