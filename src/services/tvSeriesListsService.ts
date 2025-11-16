import apiClient from "./apiClient";
import type { APITmdbTVSeriesListResponse } from "../types/tvSeriesLists.types";

export const tvSeriesListsService = {
  getTvSerieByCategory: async (
    category: string,
    page: number = 1
  ): Promise<APITmdbTVSeriesListResponse> => {
    const response = await apiClient.get(
      `/tv/${category}?language=es&page=${page}`
    );
    return response.data;
  },
};
