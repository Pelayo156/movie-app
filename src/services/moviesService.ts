import apiClient from "./apiClient";
import type {
  APITmdbMovieDetailsResponse,
  APITmdbMovieCreditsResponse,
} from "../types/movies.types";

export const moviesService = {
  getDetails: async (movieId: string): Promise<APITmdbMovieDetailsResponse> => {
    const response = await apiClient.get(`/movie/${movieId}?language=es`);
    return response.data;
  },
  getCredits: async (movieId: string): Promise<APITmdbMovieCreditsResponse> => {
    const response = await apiClient.get(
      `/movie/${movieId}/credits?language=es`
    );
    return response.data;
  },
};
