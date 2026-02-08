import type {
  APITmdbCreateNewTokenResponse,
  APITmdbUserResponse,
  APITmdbSessionResponse,
} from "../types/authentication.types";
import apiClient from "./apiClient";

export const authenticationService = {
  createRequestToken: async (): Promise<APITmdbCreateNewTokenResponse> => {
    const response = await apiClient.get("/authentication/token/new");
    return response.data;
  },
  createSession: async (
    requestToken: string
  ): Promise<APITmdbSessionResponse> => {
    const response = await apiClient.post("/authentication/session/new", {
      request_token: requestToken,
    });
    return response.data;
  },
  getAccountDetails: async (
    sessionId: string
  ): Promise<APITmdbUserResponse> => {
    const response = await apiClient.get(`/account/${sessionId}`);
    return response.data;
  },
};
