import type {
  APITmdbFavoriteResponse,
  APITmdbFavoriteMoviesResponse,
} from "../types/account.types";
import apiClient from "./apiClient";
import type { APITmdbMovieListsPopularResponse } from "../types/movieLists.types";
import type { APITmdbTVSeriesListResponse } from "../types/tvSeriesLists.types";

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
  toggleWatchlist: async (
    accountId: number,
    sessionId: string,
    mediaType: string,
    mediaId: number,
    watchlist: boolean
  ): Promise<APITmdbFavoriteResponse> => {
    // Puedes usar el mismo tipo de respuesta
    const response = await apiClient.post(
      `/account/${accountId}/watchlist`,
      {
        media_type: mediaType,
        media_id: mediaId,
        watchlist: watchlist,
      },
      {
        params: {
          session_id: sessionId,
        },
      }
    );
    return response.data;
  },
  getFavoritesMoviesList: async (
    page: number,
    accountId?: number
  ): Promise<APITmdbMovieListsPopularResponse> => {
    const response = await apiClient.get(
      `/account/${accountId}/favorite/movies?language=es-CL&page=${page}`
    );
    return response.data;
  },
  getFavoritesTVList: async (
    page: number,
    accountId?: number
  ): Promise<APITmdbTVSeriesListResponse> => {
    const sessionId = localStorage.getItem("tmdb_session_id");
    const response = await apiClient.get(`/account/${accountId}/favorite/tv`, {
      params: {
        session_id: sessionId,
        page: page,
      },
    });
    return response.data;
  },
  isFavoriteMovie: async (
    accountId: number | null,
    mediaId: number | null
  ): Promise<boolean> => {
    try {
      if (accountId == null || mediaId == null) {
        return false;
      }

      // Obtener primera página
      let favoritesList = await accountService.getFavoritesMoviesList(
        1,
        accountId
      );
      const totalPages = favoritesList.total_pages;

      // revisar en cada una de las páginas
      for (let page = 1; page <= totalPages; page++) {
        if (page > 1) {
          favoritesList = await accountService.getFavoritesMoviesList(
            page,
            accountId
          );
        }

        const found = favoritesList.results.some(
          (media: any) => media.id === mediaId
        );

        if (found) return true;
      }

      return false;
    } catch (error) {
      console.error("Error al verificar favorito:", error);
      return false;
    }
  },
  isFavoriteTVShow: async (
    accountId: number | null,
    mediaId: number | null
  ): Promise<boolean> => {
    try {
      if (accountId == null || mediaId == null) {
        return false;
      }

      let favoritesList = await accountService.getFavoritesTVList(1, accountId);
      const totalPages = favoritesList.total_pages;

      for (let page = 1; page <= totalPages; page++) {
        if (page > 1) {
          favoritesList = await accountService.getFavoritesTVList(
            page,
            accountId
          );
        }

        const found = favoritesList.results.some(
          (media: any) => media.id === mediaId
        );

        if (found) return true;
      }

      return false;
    } catch (error) {
      console.error("Error al verificar favorito de serie:", error);
      return false;
    }
  },
};
