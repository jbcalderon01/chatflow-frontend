import { apiClient } from "@/shared/lib/apiClient";
import { GetDashboardMetricsResponse } from "../types/Dashboard.type";
const baseURL = "/dashboard";

export class DashboardService {
  static async getMetrics(): Promise<GetDashboardMetricsResponse> {
    const response = await apiClient.get(baseURL);
    return response.data;
  }
}
