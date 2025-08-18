import apiClient from "./apiClient";
import type { APITmdbMovieListsPopularResponse } from "../types/movieLists.types";

export const movieListsService = {
    getPopular: async(): Promise<APITmdbMovieListsPopularResponse> => {
        const response = await apiClient.get('/movie/popular?language=es');
        return response.data;
    }
}