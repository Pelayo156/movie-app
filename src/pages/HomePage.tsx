import { useEffect, useState } from "react";
import type { TrendingResult } from "../types/trending.types";
import type { MovieListsResult } from "../types/movieLists.types";
import { trendingService } from "../services/trendingService";
import { movieListsService } from "../services/movieListsService";
import MovieCard from "../components/ui/MovieCard";

const apiImageUrl = import.meta.env.VITE_API_IMAGE_URL;
function HomePage() {
  const [trendingItems, setTrendingItems] = useState<TrendingResult[]>([]);
  const [movieListsItems, setmovieListsItems] = useState<MovieListsResult[]>(
    []
  );

  const [trendingMediaType, setTrendingMediaType] = useState<
    "Películas" | "TV Series"
  >("Películas");

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<String | null>(null);

  // Variable para guardar película que se mostrará en el poster inicial
  const posterMovie = trendingItems.at(
    Math.floor(Math.random() * trendingItems.length)
  );

  useEffect(() => {
    // Obtener películas en tendencia
    const fetchTrendingItems = async () => {
      setIsLoading(true);
      setError(null);

      // Se guardan las películas en tendencia en solo un estado dependiendo de la elección del usuario.
      try {
        let data;
        if (trendingMediaType === "Películas") {
          const response = await trendingService.getMovies();
          data = response.results;
        } else {
          const response = await trendingService.getTvSeries();
          data = response.results;
        }
        setTrendingItems(data);
      } catch (err) {
        setError("Error al obtener películas o series en tendencia.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTrendingItems();
  }, [trendingMediaType]);

  useEffect(() => {
    const fetchMovieListsItems = async () => {
      setIsLoading(true);
      setError(null);

      // Se guardan las películas en movie Lists.
      try {
        const response = await movieListsService.getPopular();
        const data = response.results;
        setmovieListsItems(data);
      } catch (err) {
        setError("Error al obtener películas o series populares.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMovieListsItems();
  }, []);

  return (
    <div className="bg-gray-950">
      {/* Inicio Poster Principal */}
      <div
        className="relative w-full h-[75vh] bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${apiImageUrl}/original/${posterMovie?.backdrop_path})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/65 to-transparent"></div>

        <div className="absolute top-0 left-0 flex h-full w-full items-center z-10">
          <div className="px-20">
            {/* pt-20 para la navbar y px-20 para el margen lateral */}
            {posterMovie && (
              <h1 className="text-white text-6xl font-bold">
                {"name" in posterMovie
                  ? posterMovie.name
                  : posterMovie.original_title}
              </h1>
            )}
            <p className="text-white text-lg mt-4 max-w-lg">
              {trendingItems[0]?.overview}
            </p>
            {/* Puedes agregar más elementos como botones aquí */}
          </div>
        </div>
      </div>
      {/* Fin Poster Principal */}

      {/* Inicio Carousel de Tendencias */}
      <div className="font-bold text-2xl text-white flex flex-row max-w-9/10 mx-auto pt-10">
        Tendencia
        <div className="flex space-x-2 bg-gray-300 p-1 rounded-xl ml-8">
          <button
            onClick={() => setTrendingMediaType("Películas")}
            className={`px-3 py-1 text-sm font-semibold rounded-lg transition-colors duration-300 ${
              trendingMediaType === "Películas"
                ? "bg-black text-white shadow"
                : "bg-transparent text-gray-600 hover:bg-gray-300"
            }`}
          >
            Películas
          </button>
          <button
            onClick={() => setTrendingMediaType("TV Series")}
            className={`px-3 py-1 text-sm font-semibold rounded-lg transition-colors duration-300 ${
              trendingMediaType === "TV Series"
                ? "bg-black text-white shadow"
                : "bg-transparent text-gray-600 hover:bg-gray-300"
            }`}
          >
            TV Series
          </button>
        </div>
      </div>
      <div className="flex flex-row max-w-9/10 mx-auto overflow-x-auto space-x-6 px-2 pt-6">
        {isLoading && <p className="text-white">Cargando...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {!isLoading &&
          !error &&
          trendingItems.map((items) => (
            <MovieCard
              key={items.id}
              poster_path={items.poster_path}
              title={"title" in items ? items.title : items.name}
              release_date={
                "release_date" in items
                  ? items.release_date
                  : items.first_air_date
              }
            />
          ))}
      </div>
      {/* Fin Carousel de Tendencias */}

      {/* Inicio Carousel de Movie Lists */}
      <div className="font-bold text-2xl text-white flex flex-row max-w-9/10 mx-auto pt-20">
        Populares
      </div>
      <div className="flex flex-row max-w-9/10 mx-auto overflow-x-auto space-x-6 px-2 pt-6">
        {isLoading && <p className="text-white">Cargando...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {!isLoading &&
          !error &&
          movieListsItems.map((items) => (
            <MovieCard
              key={items.id}
              poster_path={items.poster_path}
              title={items.original_title}
              release_date={items.release_date}
            />
          ))}
      </div>
      {/* Fin Carousel de Movie Lists */}
    </div>
  );
}
export default HomePage;
