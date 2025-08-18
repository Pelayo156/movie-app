import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { moviesService } from "../services/moviesService";
import { faList, faHeart, faBookmark } from "@fortawesome/free-solid-svg-icons";
import AccountActionButton from "../components/ui/AccountActionButton";
import type { APITmdbMovieResponse } from "../types/movies.types";
import PosterDetail from "../components/layouts/PosterDetail";

const apiImageUrl = import.meta.env.VITE_API_IMAGE_URL;
function MoviesDetailPage() {
  // Variable para guardar datos de la película
  const [movieDetail, setMovieDetail] = useState<APITmdbMovieResponse | null>(
    null
  );

  // Variables para estado de carga y mensajes de errores
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<String | null>(null);

  const movieId = useParams().id;

  useEffect(() => {
    const fetchMovieDetails = async () => {
      setIsLoading(true);
      setError(null);

      // Se guardan detalles de la película
      try {
        if (movieId) {
          const response = await moviesService.getDetails(movieId);
          setMovieDetail(response);
        }
      } catch (err) {
        setError(`Error al obtener película con id ${movieId}.`);
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMovieDetails();
  }, [movieId]);

  return (
    <div className="mt-20">
      {/* Inicio Poster Principal */}
      <div className="mt-20">
        <PosterDetail
          backdrop_path={movieDetail?.backdrop_path}
          genres={movieDetail?.genres}
          overview={movieDetail?.overview}
          poster_path={movieDetail?.poster_path}
          release_date={movieDetail?.release_date}
          runtime={movieDetail?.runtime}
          title={movieDetail?.title}
          vote_average={movieDetail?.vote_average}
        />
      </div>
      {/* Fin Poster Principal */}
    </div>
  );
}
export default MoviesDetailPage;
