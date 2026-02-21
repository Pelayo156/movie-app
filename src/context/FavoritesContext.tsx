import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import { accountService } from "../services/accountService";

interface FavoritesContextType {
  favorites: number[];
  toggleFavorite: (
    movieId: number,
    mediaType?: "movie" | "tv"
  ) => Promise<void>;
  isFavorite: (movieId: number) => boolean;
  loading: boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined
);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<number[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const toggleFavorite = async (
    movieId: number,
    mediaType: "movie" | "tv" = "movie"
  ) => {
    try {
      setLoading(true);

      const sessionId = localStorage.getItem("tmdb_session_id");
      const accountId = localStorage.getItem("tmdb_account_id");

      if (!sessionId || !accountId) {
        throw new Error("Usuario no autenticado");
      }

      const isFav = favorites.includes(movieId);

      // Añadir o quitar película de favoritos dependiendo del caso
      await accountService.toggleFavorite(
        parseInt(accountId),
        sessionId,
        mediaType,
        movieId,
        !isFav
      );

      // Actualizar estado local dependiendo si era favorita o no
      if (isFav) {
        setFavorites(favorites.filter((id) => id !== movieId));
      } else {
        setFavorites([...favorites, movieId]);
      }
    } catch (error) {
      console.error("Error al actualizar favorito: ", error);
    } finally {
      setLoading(false);
    }
  };

  const isFavorite = (movieId: number) => {
    return favorites.includes(movieId);
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, toggleFavorite, isFavorite, loading }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

// Custom hook para usar context
export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error("useFavorites debe usarse dentro de FavoritesProvider");
  }
}
