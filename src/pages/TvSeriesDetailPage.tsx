import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faStarHalfAlt,
  faPlay,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import type { APITmdbTVSeriesResponse, Season } from "../types/tvSeries.types";
import type { VideoResult } from "../types/tvSeries.types";
import TrailerModal from "../components/ui/TrailerModal";
import { tvSeriesService } from "../services/tvSeriesService";
import PosterDetail from "../components/layouts/PosterDetail";
import TextDetail from "../components/layouts/TextDetail";
import { capitalize } from "../utils/textUtils";

const apiImageUrl = import.meta.env.VITE_API_IMAGE_URL;
function TvSeriesDetailPage() {
  // Variable para guardar datos de la Serie
  const [tvSerieDetail, setTvSerieDetail] =
    useState<APITmdbTVSeriesResponse | null>(null);

  // Variable para guardar datos sobre videos de la serie
  const [tvSerieVideos, setTvSerieVideos] = useState<VideoResult[]>([]);

  // Variable para comprobar si el modal del trailer está abierto
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [seasons, setSeasons] = useState<Season[]>([]);

  // Variables para estado de carga y mensajes de errores
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<String | null>(null);

  const tvSerieId = useParams().id;

  useEffect(() => {
    const fetchTvSerieDetails = async () => {
      setIsLoading(true);
      setError(null);

      // Se guardan detalles de la serie
      try {
        if (tvSerieId) {
          const response = await tvSeriesService.getDetails(tvSerieId);
          setTvSerieDetail(response);
          setSeasons(response.seasons);
        }
      } catch (err) {
        setError(`Error al obtener TV Serie con id ${tvSerieId}.`);
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTvSerieDetails();

    const fetchTvSerieVideos = async () => {
      setIsLoading(true);
      setError(null);

      // Se guardan videos de la serie
      try {
        if (tvSerieId) {
          const response = await tvSeriesService.getVideos(tvSerieId);
          setTvSerieVideos(response.results);
        }
      } catch (err) {
        setError(`Error al obtener videos de TV Serie con id ${tvSerieId}`);
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTvSerieVideos();
  }, [tvSerieId]);

  // Función para obtener trailer de la serie
  const getOfficialTrailer = (video: VideoResult[]): VideoResult | null => {
    // Buscar trailer oficial con nombre "Official Trailer"
    let trailer = video.find(
      (video) =>
        video.name === "Official Trailer" &&
        video.official &&
        video.site === "YouTube"
    );

    /// Si no encuentra, buscar cualquier trailer oficial
    if (!trailer) {
      trailer = video.find(
        (video) =>
          video.type === "Trailer" && video.official && video.site === "YouTube"
      );
    }

    // Si aún no encuentra, buscar cualquier trailer
    if (!trailer) {
      trailer = video.find(
        (video) => video.type === "Trailer" && video.site === "YouTube"
      );
    }

    return trailer || null;
  };

  const trailer = tvSerieVideos ? getOfficialTrailer(tvSerieVideos) : null;

  const handleWatchTrailer = () => {
    if (tvSerieVideos && getOfficialTrailer(tvSerieVideos)) {
      setIsModalOpen(true);
    }
  };

  return (
    <div>
      {/* Inicio Poster Principal */}
      <PosterDetail
        backdrop_path={tvSerieDetail?.backdrop_path}
        genres={tvSerieDetail?.genres}
        overview={tvSerieDetail?.overview}
        poster_path={tvSerieDetail?.poster_path}
        release_date={tvSerieDetail?.first_air_date}
        seasons={tvSerieDetail?.seasons.length}
        title={tvSerieDetail?.name}
        vote_average={tvSerieDetail?.vote_average}
      />
      {/* Fin Poster Principal */}

      <div className="p-8 grid grid-cols-8 bg-stone-200">
        <div className="col-span-6">
          <span className="text-3xl text-black font-serif font-bold">
            Temporadas
          </span>
          {/* Lista de temporadas */}
          {seasons.map((season) => (
            <div className="my-6 flex w-full bg-gray-900 rounded-xl shadow-sm overflow-hidden min-h-[180px]">
              {/* Imagen: Reducida a w-32 (128px) o w-40 (160px) */}
              <div className="w-32 sm:w-40 flex-shrink-0">
                <img
                  className="h-full w-full object-cover"
                  src={`${apiImageUrl}/w500/${season.poster_path}`}
                  alt={season.name}
                />
              </div>

              {/* Contenido de texto */}
              <div className="p-4 flex flex-col justify-center flex-1">
                <div className="mb-1">
                  <span className="text-blue-600 text-xs font-bold uppercase tracking-widest">
                    Temporada {season.season_number}
                  </span>
                  <h2 className="text-xl font-bold text-gray-900 leading-tight">
                    {season.name}
                  </h2>
                </div>

                {/* Rating con Font Awesome */}
                <div className="flex items-center mb-3">
                  <div className="flex text-yellow-400 text-sm">
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStarHalfAlt} />
                  </div>
                  <span className="ml-2 text-xs font-medium text-gray-500">
                    {season.vote_average || "8.5"} / 10
                  </span>
                </div>

                <p className="text-white text-sm mb-3">
                  {season.overview ||
                    "No hay descripción disponible para esta temporada de la serie."}
                </p>

                <div className="text-xs text-gray-400 font-medium">
                  {season.episode_count} Episodios •{" "}
                  {season.air_date?.split("-")[0]}
                </div>
              </div>
            </div>
          ))}
          {/* Fin Lista de temporadas */}
        </div>
        <div className="col-start-8 col-span-1 flex flex-col gap-6">
          {/* Inicio botón para ver trailer */}
          <div
            className="flex gap-2 justify-center items-center bg-blue-600 w-full p-2 md:p-3 rounded-xl cursor-pointer
                       transition-all duration-200 ease-in-out
                       hover:scale-105 hover:shadow-xl"
          >
            <button
              className="text-white text-base md:text-lg font-bold"
              onClick={handleWatchTrailer}
            >
              {tvSerieVideos && getOfficialTrailer(tvSerieVideos)
                ? "Ver Trailer"
                : "Trailer no disponible"}
            </button>
            <FontAwesomeIcon
              icon={faPlay}
              className="text-white text-sm md:text-base"
            />
          </div>
          {/* Fin botón para ver trailer */}

          <TextDetail title="Estado" value={tvSerieDetail?.status} />

          <TextDetail
            title="Lenguaje original"
            value={
              tvSerieDetail?.original_language &&
              capitalize(
                new Intl.DisplayNames(["es"], { type: "language" }).of(
                  tvSerieDetail?.original_language
                )
              )
            }
          />
        </div>
      </div>

      {/* Modal del Trailer */}
      <TrailerModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        videoKey={trailer?.key || ""}
        movieTitle={tvSerieDetail?.name ?? ""}
      />
    </div>
  );
}
export default TvSeriesDetailPage;
