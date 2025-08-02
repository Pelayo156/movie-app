import apiClient from "./apiClient";
import type { APITmdbTrendingMoviesResponse } from "../types/trending.types";

export const trendingService = {
    getMovies: async (): Promise<APITmdbTrendingMoviesResponse> => {
        const response = await apiClient.get('/trending/movie/day');
        return response.data;
    }
}