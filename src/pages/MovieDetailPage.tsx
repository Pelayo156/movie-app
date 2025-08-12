import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { movieService } from "../services/movieService";
import type { APITmdbMovieResponse } from "../types/movie.types";

const apiImageUrl = import.meta.env.VITE_API_IMAGE_URL;
function MovieDetailPage() {
  // Variable para guardar datos de la película
  const [movieDetail, setMovieDetail] = useState<APITmdbMovieResponse | null>(
    null
  );

  // Variables para estado de carga y mensajes de errores
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<String | null>(null);

  const movieId = useParams().id;

  useEffect(() => {
    const fetchMovieListsItems = async () => {
      setIsLoading(true);
      setError(null);

      // Se guardan las películas en movie Lists.
      try {
        if (movieId) {
          const response = await movieService.getDetails(movieId);
          setMovieDetail(response);
        }
      } catch (err) {
        setError("Error al obtener películas o series populares.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMovieListsItems();
  }, [movieId]);

  return (
    <div className="mt-20">
      {/* Inicio Poster Principal */}
      <div
        className="relative w-full h-[60vh] bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${apiImageUrl}/original/${movieDetail?.backdrop_path})`,
        }}
      >
        <img
          className="py-12 pl-28 absolute w-auto h-full z-10"
          src={`${apiImageUrl}/w500/${movieDetail?.poster_path}`}
        />
        <div className="absolute inset-0 bg-black/75"></div>

        <div className="absolute top-0 left-0 flex h-full w-full items-center z-10">
          <div className="px-[30%]">
            {movieDetail?.original_title && (
              <h1 className="text-white text-6xl font-bold">
                {movieDetail.original_title}
              </h1>
            )}
            <p className="text-white text-lg mt-4 max-w-lg">
              {movieDetail?.overview}
            </p>
          </div>
        </div>
      </div>
      {/* Fin Poster Principal */}
    </div>
  );
}
export default MovieDetailPage;
