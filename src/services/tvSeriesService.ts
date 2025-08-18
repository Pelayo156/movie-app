import apiClient from "./apiClient";
import type { APITmdbTVSeriesResponse } from "../types/tvSeries.types";

export const tvSeriesService = {
    getDetails: async (seriesId: string): Promise<APITmdbTVSeriesResponse> => {
        const response = await apiClient.get(`/tv/${seriesId}?language=es`);
        return response.data;
    }
}