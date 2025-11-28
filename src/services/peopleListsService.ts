import apiClient from "./apiClient";
import type { APITmdbPeopleListsResponse } from "../types/peopleLists.types";

export const peopleListsService = {
  getPopularPeople: async (
    page: number
  ): Promise<APITmdbPeopleListsResponse> => {
    const response = await apiClient.get(
      `/person/popular?language=es&page=${page}`
    );
    return response.data;
  },
};
