import { useQuery } from "@tanstack/react-query";
import { UsersService } from "../../services";
import { queryKeys } from "@/shared/consts";

export const useGetMySelf = (enabled?: boolean) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: queryKeys.users.me,
    queryFn: () => UsersService.getMySelf(),
    enabled: enabled ?? true,
  });

  return { data, isLoading, error, refetch };
};
