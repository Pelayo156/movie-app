import apiClient from "./apiClient";
import type {
  APITmdbPeopleDetailsResponse,
  APITmdbPeopleImagesResponse,
} from "../types/people.types";

export const peopleService = {
  getDetailPeople: async (
    id: string
  ): Promise<APITmdbPeopleDetailsResponse> => {
    const response = await apiClient.get(`/person/${id}?language=es`);
    return response.data;
  },

  getImagesPeople: async (id: string): Promise<APITmdbPeopleImagesResponse> => {
    const response = await apiClient.get(`/person/${id}/images`);
    return response.data;
  },
};
