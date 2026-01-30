import { apiClient } from "@/shared/lib/apiClient";
const baseURL = "/public/projects";

export class ProjectsService {
  static async getProjects() {
    const response = await apiClient.get(baseURL);
    return response.data;
  }
}
