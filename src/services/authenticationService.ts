import type { APITmdbCreateNewTokenResponse } from "../types/authentication.types";
import apiClient from "./apiClient";

export const authenticationService = {
  createRequestToken: async (): Promise<APITmdbCreateNewTokenResponse> => {
    const response = await apiClient.get("/authentication/token/new");
    return response.data;
  },
};
