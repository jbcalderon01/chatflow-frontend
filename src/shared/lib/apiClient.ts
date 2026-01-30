import axios from "axios";
import { fetchAuthSession } from "aws-amplify/auth";
import { ENV } from "../consts";

const API_BASE_URL = ENV.API_URL;

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(async (config) => {
  try {
    const session = await fetchAuthSession();
    const token = session.tokens?.idToken?.toString();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch (error) {
    console.error("Error fetching auth session for axios interceptor:", error);
  }
  return config;
});
