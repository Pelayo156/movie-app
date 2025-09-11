import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { moviesService } from "../services/moviesService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faPlay } from "@fortawesome/free-solid-svg-icons";
import type {
  APITmdbMovieDetailsResponse,
  APITmdbMovieCreditsResponse,
  APITmdbMovieVideosResponse,
  Result,
} from "../types/movies.types";
import PosterDetail from "../components/layouts/PosterDetail";
import TextDetail from "../components/layouts/TextDetail";
import TrailerModal from "../components/ui/TrailerModal";
import { capitalize } from "../utils/textUtils";

const apiImageUrl = import.meta.env.VITE_API_IMAGE_URL;
function MovieDetailPage() {
  // Variable para guardar datos de la película
  const [movieDetail, setMovieDetail] =
    useState<APITmdbMovieDetailsResponse | null>(null);

  // Variable para guardar creditos la película
  const [movieCredits, setMovieCredits] =
    useState<APITmdbMovieCreditsResponse>();

  // Variable para guardar videos la película
  const [movieVideos, setMovieVideos] = useState<APITmdbMovieVideosResponse>();

  // Variable para comprobar si el modal del trailer está abierto
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Variables para estado de carga y mensajes de errores
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<String | null>(null);

  const movieId = useParams().id;

  useEffect(() => {
    // Para que el usuario cuando entre a esta vista se vea desde el inicio
    window.scrollTo(0, 0);

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
        setError(`Error al obtener detalles de película con id ${movieId}.`);
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    const fetchMovieCredits = async () => {
      setIsLoading(true);
      setError(null);

      // Se guardan creditos de la película
      try {
        if (movieId) {
          const response = await moviesService.getCredits(movieId);
          setMovieCredits(response);
        }
      } catch (err) {
        setError(`Error al obtener creditos de película con id ${movieId}.`);
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    const fetchMovieVideos = async () => {
      setIsLoading(true);
      setError(null);

      // Se guardan videos de la película
      try {
        if (movieId) {
          const response = await moviesService.getVideos(movieId);
          setMovieVideos(response);
        }
      } catch (err) {
        setError(`Error al obtener videos de película con id ${movieId}.`);
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovieDetails();
    fetchMovieCredits();
    fetchMovieVideos();
  }, [movieId]);

  // Función para obtener el primer trailer oficial
  const getOfficialTrailer = (
    videos: APITmdbMovieVideosResponse
  ): Result | null => {
    // Buscar trailer oficial con nombre "Official Trailer"
    let trailer = videos.results.find(
      (video) =>
        video.name === "Official Trailer" &&
        video.official &&
        video.site === "YouTube"
    );

    // Si no encuentra, buscar cualquier trailer oficial
    if (!trailer) {
      trailer = videos.results.find(
        (video) =>
          video.type === "Trailer" && video.official && video.site === "YouTube"
      );
    }

    // Si aún no encuentra, buscar cualquier trailer
    if (!trailer) {
      trailer = videos.results.find(
        (video) => video.type === "Trailer" && video.site === "YouTube"
      );
    }

    return trailer || null;
  };

  const officialTrailer = movieVideos ? getOfficialTrailer(movieVideos) : null;

  const handleWatchTrailer = () => {
    if (movieVideos && getOfficialTrailer(movieVideos)) {
      setIsModalOpen(true);
    }
  };

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

      <div className="flex bg-gray-200">
        <div className="w-1/12"></div>
        {/* Inicio Carousel Cast */}
        <div className="p-10 w-2/3">
          <h2 className="text-2xl font-semibold mb-4 text-black">Reparto</h2>
          <div className="grid grid-cols-3 sm:grid-cols-6 lg:grid-cols-8 gap-6">
            {movieCredits?.cast.slice(0, 7).map((actor) => (
              <div
                key={actor.id}
                className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
              >
                <div className="w-full h-40">
                  <img
                    src={
                      actor.profile_path
                        ? `${apiImageUrl}/w300/${actor.profile_path}`
                        : "https://via.placeholder.com/500x750?text=No+Image"
                    }
                    alt={actor.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-3">
                  <p className="text-sm text-gray-600 truncate">
                    {actor.character}
                  </p>
                  <h3 className="text-base font-semibold truncate">
                    {actor.name}
                  </h3>
                </div>
              </div>
            ))}
            <div className="flex justify-center items-center gap-1 underline">
              <div className="font-bold cursor-pointer text-black hover:text-black/50">
                Ver más
              </div>
              <FontAwesomeIcon icon={faArrowRight} />
            </div>
          </div>
        </div>
        {/* Fin Carousel Cast */}
        <div className="w-1/4 py-10">
          <div className="w-2/3 flex flex-col gap-6">
            <div
              className="flex gap-2 justify-center items-center bg-black/90 w-1/2 p-3 rounded-xl cursor-pointer
                          transition-all duration-200 ease-in-out
                          hover:scale-105 hover:shadow-xl"
            >
              <button
                className="text-white text-lg font-bold"
                onClick={handleWatchTrailer}
              >
                {(movieVideos && getOfficialTrailer(movieVideos) ? 'Ver Trailer' : 'Trailer no disponible')}
              </button>
              <FontAwesomeIcon icon={faPlay} className="text-white" />
            </div>

            <TextDetail title="Estado" value={movieDetail?.status} />
            <TextDetail
              title="Lenguaje original"
              value={
                movieDetail?.original_language &&
                capitalize(
                  new Intl.DisplayNames(["es"], { type: "language" }).of(
                    movieDetail?.original_language
                  )
                )
              }
            />
            <TextDetail
              title="Presupuesto"
              value={
                movieDetail?.budget &&
                (movieDetail?.budget).toLocaleString("es-CL", {
                  style: "currency",
                  currency: "CLP",
                })
              }
            />
            <TextDetail
              title="Ganancia"
              value={
                movieDetail?.revenue &&
                (movieDetail?.revenue).toLocaleString("es-CL", {
                  style: "currency",
                  currency: "CLP",
                })
              }
            />
          </div>
        </div>
      </div>

      {/* Modal del Trailer */}
      <TrailerModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        videoKey={officialTrailer?.key || ''}
        movieTitle={movieDetail?.title ?? ''}
      />
    </div>
  );
}
export default MovieDetailPage;
