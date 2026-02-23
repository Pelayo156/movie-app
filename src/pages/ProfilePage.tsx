import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faClock,
  faFilm,
  faTv,
} from "@fortawesome/free-solid-svg-icons";
import type { Result } from "../types/movieLists.types";
import type { ResultTvSeriesLists } from "../types/tvSeriesLists.types";
import { accountService } from "../services/accountService";
import { Link } from "react-router-dom";

const apiImageUrl = import.meta.env.VITE_API_IMAGE_URL;

function ProfilePage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<"favorites" | "watchlater">(
    "favorites"
  );
  const [mediaType, setMediaType] = useState<"movie" | "tv">("movie");

  const menuItems = [
    { id: "favorites", label: "Favoritos", icon: faHeart },
    { id: "watchlater", label: "Ver más tarde", icon: faClock },
  ];

  // 👇 NUEVO - Opciones del selector
  const mediaTypeOptions = [
    { value: "movie", label: "Películas", icon: faFilm },
    { value: "tv", label: "Series", icon: faTv },
  ];

  // Variables para almacenar películas
  const [moviesList, setMoviesList] = useState<Result[]>([]);

  // Variables para almacenar series
  const [tvShowsList, setTvShowsList] = useState<ResultTvSeriesLists[]>([]);

  // Variables para estado de carga y mensajes de errores
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // UseEffect para cargar datos cuando cambia el tab o el mediaType
  useEffect(() => {
    if (user != null) {
      fetchMenuOptionList(activeTab);
    }
  }, [activeTab, mediaType]);

  const fetchMenuOptionList = async (option: "favorites" | "watchlater") => {
    setIsLoading(true);
    setError(null);

    try {
      if (option === "favorites") {
        // Cargar películas favoritas
        const moviesResponse = await accountService.getFavoritesMoviesList(
          1,
          user?.id
        );
        setMoviesList(moviesResponse.results);

        // Cargar series favoritas
        const tvResponse = await accountService.getFavoritesTVList(1, user?.id);
        setTvShowsList(tvResponse.results);
      } else if (option === "watchlater") {
        setMoviesList([]);
        setTvShowsList([]);
      }
    } catch (err) {
      setError(`No ha sido posible obtener la lista de ${option}`);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // 👇 NUEVO - Obtener la lista correcta según el tipo de media seleccionado
  const getCurrentList = () => {
    return mediaType === "movie" ? moviesList : tvShowsList;
  };

  return (
    <div className="h-screen bg-gray-900 flex flex-col overflow-hidden">
      {/* Header con info del usuario - FIJO */}
      <div className="flex-shrink-0 w-full px-10 py-6 h-44 flex flex-row items-center gap-4 bg-gradient-to-r from-cyan-950/60 to-blue-950/60 backdrop-blur-sm">
        <div className="bg-gradient-to-br from-cyan-500 to-blue-900 w-32 h-32 rounded-full grid place-items-center shadow-xl ring-4 ring-white/20">
          <span className="text-6xl text-white font-bold uppercase leading-none">
            {user?.username.at(0)}
          </span>
        </div>

        <div className="flex flex-col gap-2">
          <div className="text-white text-4xl font-bold">{user?.username}</div>
          <div className="text-white/70 text-sm">{user?.name}</div>
        </div>
      </div>

      {/* Contenedor principal */}
      <div className="flex flex-1 overflow-hidden">
        {/* Menú lateral - FIJO */}
        <div className="w-80 bg-white/5 border-r border-white/10 relative overflow-hidden flex-shrink-0">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-600/10 via-transparent to-blue-600/10 pointer-events-none" />

          <nav className="relative z-10 p-6 space-y-3">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as any)}
                className={`
                  w-full px-6 py-4 rounded-xl text-left
                  flex items-center gap-4
                  transition-all duration-300 ease-out
                  group relative overflow-hidden
                  ${
                    activeTab === item.id
                      ? "bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-white shadow-lg shadow-cyan-500/20"
                      : "text-white/70 hover:text-white hover:bg-white/10"
                  }
                `}
              >
                <div
                  className={`
                    absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/10 to-blue-500/0
                    translate-x-[-100%] group-hover:translate-x-[100%]
                    transition-transform duration-700 ease-out
                    ${activeTab === item.id ? "opacity-0" : ""}
                  `}
                />

                <FontAwesomeIcon
                  icon={item.icon}
                  className="text-2xl relative z-10"
                />
                <span className="font-medium text-lg relative z-10">
                  {item.label}
                </span>
              </button>
            ))}
          </nav>

          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-cyan-500/5 to-transparent pointer-events-none" />
        </div>

        {/* Contenido principal - SCROLLABLE */}
        <div className="flex-1 overflow-y-auto bg-gray-950">
          <div className="p-8">
            <div className="max-w-6xl mx-auto">
              {/* Header con título y selector */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-white text-3xl font-bold">
                  {menuItems.find((item) => item.id === activeTab)?.label}
                </h2>

                {/* Selector de tipo de media */}
                <div className="flex gap-2 bg-white/5 backdrop-blur-sm p-1 rounded-xl border border-white/10">
                  {mediaTypeOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() =>
                        setMediaType(option.value as "movie" | "tv")
                      }
                      className={`
                        px-6 py-2 rounded-lg flex items-center gap-2
                        transition-all duration-300
                        ${
                          mediaType === option.value
                            ? "bg-gradient-to-r from-cyan-500/30 to-blue-500/30 text-white shadow-lg"
                            : "text-white/70 hover:text-white hover:bg-white/10"
                        }
                      `}
                    >
                      <FontAwesomeIcon icon={option.icon} />
                      <span className="font-medium">{option.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Estados de carga y error */}
              {isLoading && (
                <div className="flex items-center justify-center py-20">
                  <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-cyan-500"></div>
                </div>
              )}

              {error && (
                <div className="text-center py-20">
                  <p className="text-red-500 text-xl">{error}</p>
                </div>
              )}

              {/* Grid de contenido */}
              {!isLoading && !error && (
                <>
                  {getCurrentList().length === 0 ? (
                    <div className="text-center py-20">
                      <p className="text-white/60 text-xl">
                        No tienes{" "}
                        {mediaType === "movie" ? "películas" : "series"} en esta
                        lista
                      </p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {mediaType === "movie"
                        ? // Renderizar películas
                          moviesList.map((movie) => (
                            <Link
                              to={`/movie/${movie.id}`}
                              key={movie.id}
                              className="bg-white/5 backdrop-blur-sm rounded-xl p-5 border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:cursor-pointer"
                            >
                              <div className="aspect-video bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg mb-4 overflow-hidden">
                                <img
                                  src={
                                    movie.backdrop_path
                                      ? `${apiImageUrl}/w300/${movie.backdrop_path}`
                                      : "https://via.placeholder.com/300x169?text=No+Image"
                                  }
                                  alt={movie.title}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <h3 className="text-white font-semibold mb-2 line-clamp-2">
                                {movie.title}
                              </h3>
                              <p className="text-white/60 text-sm">
                                {movie.release_date
                                  ? new Date(movie.release_date).getFullYear()
                                  : "N/A"}
                              </p>
                            </Link>
                          ))
                        : // Renderizar series
                          tvShowsList.map((show) => (
                            <Link
                              to={`/tv/${show.id}`}
                              key={show.id}
                              className="bg-white/5 backdrop-blur-sm rounded-xl p-5 border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:cursor-pointer"
                            >
                              <div className="aspect-video bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg mb-4 overflow-hidden">
                                <img
                                  src={
                                    show.backdrop_path
                                      ? `${apiImageUrl}/w300/${show.backdrop_path}`
                                      : "https://via.placeholder.com/300x169?text=No+Image"
                                  }
                                  alt={show.name}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <h3 className="text-white font-semibold mb-2 line-clamp-2">
                                {show.name}
                              </h3>
                              <p className="text-white/60 text-sm">
                                {show.first_air_date
                                  ? new Date(show.first_air_date).getFullYear()
                                  : "N/A"}
                              </p>
                            </Link>
                          ))}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
