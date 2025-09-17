import apiClient from "./apiClient";
import type {
  APITmdbMovieListsPopularResponse,
  APITmdbMovieListsNowPlayingResponse,
} from "../types/movieLists.types";

export const movieListsService = {
  getNowPlaying: async (): Promise<APITmdbMovieListsNowPlayingResponse> => {
    const response = await apiClient.get("/movie/now_playing?language=es");
    return response.data;
  },
  getPopular: async (): Promise<APITmdbMovieListsPopularResponse> => {
    const response = await apiClient.get("/movie/popular?language=es");
    return response.data;
  },
  getTopRated: async (): Promise<APITmdbMovieListsPopularResponse> => {
    const response = await apiClient.get("/movie/top_rated?language=es");
    return response.data;
  },
  getUpcoming: async (): Promise<APITmdbMovieListsNowPlayingResponse> => {
    const response = await apiClient.get("/movie/upcoming?language=es");
    return response.data;
  },
};
