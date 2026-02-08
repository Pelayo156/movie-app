import type { APITmdbMovieListsPopularResponse } from "../types/movieLists.types";
import type { APITmdbTVSeriesListResponse } from "../types/tvSeriesLists.types";
import type { APITmdbPeopleListsResponse } from "../types/peopleLists.types";
import apiClient from "./apiClient";

export const searchService = {
  getSearchMovie: async (
    searchText: string,
    page: number
  ): Promise<APITmdbMovieListsPopularResponse> => {
    const response = await apiClient.get(
      `/search/movie?query=${searchText}&language=es-CL&page=${page}`
    );
    return response.data;
  },
  getSearchTv: async (
    searchText: string,
    page: number
  ): Promise<APITmdbTVSeriesListResponse> => {
    const response = await apiClient.get(
      `/search/tv?query=${searchText}&language=es-CL&page=${page}`
    );
    return response.data;
  },
  getSearchPerson: async (
    searchText: string,
    page: number
  ): Promise<APITmdbPeopleListsResponse> => {
    const response = await apiClient.get(
      `/search/person?query=${searchText}&language=es-CL&page=${page}`
    );
    return response.data;
  },
};
