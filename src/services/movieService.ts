import apiClient from "./apiClient";
import type { APITmdbMovieResponse } from "../types/movie.types";

export const movieService = {
    getDetails: async (movieId: string): Promise<APITmdbMovieResponse> => {
        const response = await apiClient.get(`/movie/${movieId}`);
        return response.data;
    }
}