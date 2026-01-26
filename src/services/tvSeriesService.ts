import apiClient from "./apiClient";
import type { APITmdbTVSeriesResponse } from "../types/tvSeries.types";
import type { APITmdbTVSeriesVideosResponse } from "../types/tvSeries.types";

export const tvSeriesService = {
  // Endpoint para obtener el detalle de la serie especificada
  getDetails: async (seriesId: string): Promise<APITmdbTVSeriesResponse> => {
    const response = await apiClient.get(`/tv/${seriesId}?language=es`);
    return response.data;
  },

  // Endpoint para obtener videos sobre serie especificada
  getVideos: async (
    seriesId: string
  ): Promise<APITmdbTVSeriesVideosResponse> => {
    const response = await apiClient.get(
      `/tv/${seriesId}/videos?language=en-US`
    );
    return response.data;
  },
};
