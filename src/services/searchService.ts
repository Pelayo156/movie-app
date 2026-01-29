import type { APITmdbMovieListsPopularResponse } from "../types/movieLists.types";
import apiClient from "./apiClient";

export const authenticationService = {
  getSearchMovie: async (searchText: string, page: number): Promise<APITmdbMovieListsPopularResponse> => {
    const response = await apiClient.get(`/search/movie/${searchText}&language=es-CL&page=${page}`);
    return response.data;
  }
};