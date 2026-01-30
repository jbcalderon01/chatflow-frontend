"use client";
import { useGetDashboardMetrics } from "@/shared/api/hooks/queries";

export const useDashboard = () => {
  const { data, isLoading } = useGetDashboardMetrics();

  return { metrics: data, isLoading };
};
