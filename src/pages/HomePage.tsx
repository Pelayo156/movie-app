import { useEffect, useState } from "react";
import type { APITmdbTrendingMoviesResponse } from "../types/trending.types";
import { trendingService } from "../services/trendingService";
import CarouselMovieCard from "../components/ui/CarouselMovieCard";

function HomePage() {
  const [trendingMovies, setTrendingMovies] =
    useState<APITmdbTrendingMoviesResponse>();
  const [error, setError] = useState<String | null>(null);

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        const data = await trendingService.getMovies();
        setTrendingMovies(data);
      } catch (err) {
        setError("Error al traer películas en tendencia.");
      }
    };

    fetchTrendingMovies();
  }, []);

  return (
    <div className="bg-gray-950">
      <div className="font-bold text-2xl text-white flex flex-row max-w-7xl mx-auto pt-8">
        Tendencia
      </div>
      <div className="flex flex-row max-w-7xl mx-auto overflow-x-auto space-x-6 px-2 pt-6">
        {trendingMovies?.results.map((movie) => (
          <CarouselMovieCard
            poster_path={movie.poster_path}
            title={movie.title}
            release_date={movie.release_date}
          ></CarouselMovieCard>
        ))}
      </div>
    </div>
  );
}
export default HomePage;
