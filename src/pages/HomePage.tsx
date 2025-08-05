import { useEffect, useState } from "react";
import type {
  APITmdbTrendingMoviesResponse,
  APITmdbTrendingTVSeriesResponse,
} from "../types/trending.types";
import { trendingService } from "../services/trendingService";
import MovieCard from "../components/ui/MovieCard";

function HomePage() {
  const [trendingMovies, setTrendingMovies] =
    useState<APITmdbTrendingMoviesResponse>();

  const [trendingTvSeries, settrendingTvSeries] =
    useState<APITmdbTrendingTVSeriesResponse>();

  const [trendingMediaType, setTrendingMediaType] = useState<"Películas" | "TV Series">(
    "Películas"
  );

  const [error, setError] = useState<String | null>(null);

  useEffect(() => {
    // Obtener películas en tendencia
    const fetchTrendingMovies = async () => {
      try {
        const data = await trendingService.getMovies();
        setTrendingMovies(data);
      } catch (err) {
        setError("Error al traer películas en tendencia.");
      }
    };

    fetchTrendingMovies();

    // Obtener TV series en tendencia
    const fetchTrendingTVSeries = async () => {
      try {
        const data = await trendingService.getTvSeries();
        settrendingTvSeries(data);
      } catch (err) {
        setError("Error al traer TV Series en tendencia.");
      }
    };

    fetchTrendingTVSeries();
  }, []);

  return (
    <div className="bg-gray-950">
      {/* Inicio Poster Principal */}

      {/* Inicio Carousel de Tendencias */}
      <div className="font-bold text-2xl text-white flex flex-row max-w-7xl mx-auto pt-20">
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
      <div className="flex flex-row max-w-7xl mx-auto overflow-x-auto space-x-6 px-2 pt-6">
        {trendingMediaType === "Películas"
          ? trendingMovies?.results.map((movie) => (
              <MovieCard
              key={movie.id}
                poster_path={movie.poster_path}
                title={movie.title}
                release_date={movie.release_date}
              ></MovieCard>
            ))
          : trendingTvSeries?.results.map((serie) => (
              <MovieCard
              key={serie.id}
                poster_path={serie.poster_path}
                title={serie.name}
                release_date={serie.first_air_date}
              ></MovieCard>
            ))}
      </div>
      {/* Fin Carousel de Tendencias */}
    </div>
  );
}
export default HomePage;
