import apiClient from "./apiClient";
import type { APITmdbTrendingMoviesResponse, APITmdbTrendingTVSeriesResponse } from "../types/trending.types";

export const trendingService = {
    getMovies: async (): Promise<APITmdbTrendingMoviesResponse> => {
        const response = await apiClient.get('/trending/movie/day');
        return response.data;
    },
    getTvSeries: async (): Promise<APITmdbTrendingTVSeriesResponse> => {
        const response = await apiClient.get('/trending/tv/day');
        return response.data;
    }
}