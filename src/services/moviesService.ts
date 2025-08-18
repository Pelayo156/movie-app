import apiClient from "./apiClient";
import type { APITmdbMovieResponse } from "../types/movies.types";

export const moviesService = {
    getDetails: async (movieId: string): Promise<APITmdbMovieResponse> => {
        const response = await apiClient.get(`/movie/${movieId}?language=es`);
        return response.data;
    }
}