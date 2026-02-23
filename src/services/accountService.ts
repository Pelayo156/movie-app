import type {
  APITmdbFavoriteResponse,
  APITmdbAccountStatesResponse
} from "../types/account.types";
import apiClient from "./apiClient";
import type { APITmdbMovieListsPopularResponse } from "../types/movieLists.types";
import type { APITmdbTVSeriesListResponse } from "../types/tvSeriesLists.types";
import type { MediaAction, MediaType } from "../types/account.types";

export const accountService = {
  /**
  * Función para cambiar estado de favoritos o ver más tarde de una película o tv show
  */
  toggleMediaStatus: async (
    accountId: number,
    sessionId: string,
    mediaType: MediaType,
    mediaId: number,
    action: MediaAction,
    isActive: boolean
  ): Promise<APITmdbFavoriteResponse> => {
    const response = await apiClient.post(
      `/account/${accountId}/${action}`,
      {
        media_type: mediaType,
        media_id: mediaId,
        [action]: isActive, 
      },
      {
        params: { session_id: sessionId },
      }
    );
    return response.data;
  },

  /**
   * función para obtener lista de favoritos o ver más tarde, ya sea de películas o tv shows
   */
  getMediaList: async (
    accountId: number,
    action: MediaAction,
    mediaType: MediaType,
    page: number
  ): Promise<APITmdbMovieListsPopularResponse | APITmdbTVSeriesListResponse> => {
    const sessionId = localStorage.getItem("tmdb_session_id");
    
    const urlMediaType = mediaType === "movie" ? "movies" : "tv";

    const response = await apiClient.get(
      `/account/${accountId}/${action}/${urlMediaType}`,
      {
        params: {
          session_id: sessionId,
          language: "es-CL",
          page: page,
        },
      }
    );
    return response.data;
  },
  /**
   *
   * Función que verifica en un solo llamado si está en favoritos o ver más tarde (ambos al mismo tiempo)
   */
  getAccountStates: async (
    mediaId: number,
    mediaType: MediaType,
    sessionId: string
  ): Promise<APITmdbAccountStatesResponse> => {
    try {
      const response = await apiClient.get(`/${mediaType}/${mediaId}/account_states`, {
        params: { session_id: sessionId },
      });
      return response.data;
    } catch (error) {
      console.error(`Error obteniendo el estado de la cuenta para el ID ${mediaId}:`, error);
      return { id: 0, favorite: false, watchlist: false, rated: {
        value: 0
      } };
    }
  },
};
