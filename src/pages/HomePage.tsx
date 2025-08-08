import { useEffect, useState } from "react";
import type { TrendingResult } from "../types/trending.types";
import { trendingService } from "../services/trendingService";
import MovieCard from "../components/ui/MovieCard";

function HomePage() {
  const [trendingItems, setTrendingItems] = useState<TrendingResult[]>([]);

  const [trendingMediaType, setTrendingMediaType] = useState<
    "Películas" | "TV Series"
  >("Películas");

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<String | null>(null);

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
    </div>
  );
}
export default HomePage;
