import type {
  APITmdbFavoriteResponse,
  APITmdbFavoriteMoviesResponse,
} from "../types/account.types";
import apiClient from "./apiClient";
import type { APITmdbMovieListsPopularResponse } from "../types/movieLists.types";

export const accountService = {
  // Endpoint para añadir o quitar una película de favoritos. Esto en el caso de que el usuario esté logueado
  toggleFavorite: async (
    accountId: number,
    sessionId: string,
    mediaType: string,
    mediaId: number,
    favorite: boolean
  ): Promise<APITmdbFavoriteResponse> => {
    const response = await apiClient.post(
      `/account/${accountId}/favorite`,
      {
        media_type: mediaType,
        media_id: mediaId,
        favorite: favorite,
      },
      {
        params: {
          session_id: sessionId,
        },
      }
    );
    return response.data;
  },
  getFavoritesList: async (
    page: number,
    accountId?: number
  ): Promise<APITmdbMovieListsPopularResponse> => {
    const response = await apiClient.get(
      `/account/${accountId}/favorite/movies?language=es-CL&page=${page}`
    );
    return response.data;
  },
};
