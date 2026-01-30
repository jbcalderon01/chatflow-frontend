import { queryKeys } from "@/shared/consts";
import { useQuery } from "@tanstack/react-query";
import { DashboardService } from "../../services";

export const useGetDashboardMetrics = () => {
  const { data, isLoading } = useQuery({
    queryKey: queryKeys.dashboard.metrics,
    queryFn: () => DashboardService.getMetrics(),
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    refetchInterval: 60 * 1000,
  });
  return { data, isLoading };
};
