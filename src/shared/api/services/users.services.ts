import { apiClient } from "@/shared/lib/apiClient";
import { GetMySelfResponse } from "../types";

export class UsersService {
  static async getMySelf(): Promise<GetMySelfResponse> {
    const response = await apiClient.get("/users/me");
    return response.data;
  }
}
