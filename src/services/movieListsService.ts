import apiClient from "./apiClient";
import type {
  APITmdbMovieListsPopularResponse,
  APITmdbMovieListsNowPlayingResponse,
  APITmdbMovieListsGeneral,
} from "../types/movieLists.types";

export const movieListsService = {
  getNowPlaying: async (
    page: number = 1
  ): Promise<APITmdbMovieListsNowPlayingResponse> => {
    const response = await apiClient.get(
      `/movie/now_playing?language=es&page=${page}`
    );
    return response.data;
  },
  getPopular: async (
    page: number = 1
  ): Promise<APITmdbMovieListsPopularResponse> => {
    const response = await apiClient.get(
      `/movie/popular?language=es&page=${page}`
    );
    return response.data;
  },
  getTopRated: async (
    page: number = 1
  ): Promise<APITmdbMovieListsPopularResponse> => {
    const response = await apiClient.get(
      `/movie/top_rated?language=es&page=${page}`
    );
    return response.data;
  },
  getUpcoming: async (
    page: number = 1
  ): Promise<APITmdbMovieListsNowPlayingResponse> => {
    const response = await apiClient.get(
      `/movie/upcoming?language=es&page=${page}`
    );
    return response.data;
  },
  getMoviesByCategory: async (
    category: string,
    page: number = 1
  ): Promise<APITmdbMovieListsGeneral> => {
    const response = await apiClient.get(
      `/movie/${category}?language=es&page=${page}`
    );
    return {
      results: response.data["results"],
      total_pages: response.data["total_pages"],
    };
  },
};
