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
import PosterDetailSkeleton from "../components/layouts/PosterDetailSkeleton";

const apiImageUrl = import.meta.env.VITE_API_IMAGE_URL;
function TvSeriesDetailPage() {
  const tvSerieId = useParams().id;

  const [tvSerieDetail, setTvSerieDetail] =
    useState<APITmdbTVSeriesResponse | null>(null);
  const [tvSerieVideos, setTvSerieVideos] = useState<VideoResult[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [seasons, setSeasons] = useState<Season[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchAllData = async () => {
      if (!tvSerieId) return;
      setIsLoading(true);
      try {
        const [details, videos] = await Promise.all([
          tvSeriesService.getDetails(tvSerieId),
          tvSeriesService.getVideos(tvSerieId),
        ]);
        setTvSerieDetail(details);
        setSeasons(details.seasons);
        setTvSerieVideos(videos.results);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllData();
  }, [tvSerieId]);

  const getOfficialTrailer = (video: VideoResult[]): VideoResult | null => {
    let trailer = video.find(
      (video) =>
        video.name === "Official Trailer" &&
        video.official &&
        video.site === "YouTube"
    );
    if (!trailer) {
      trailer = video.find(
        (video) =>
          video.type === "Trailer" && video.official && video.site === "YouTube"
      );
    }
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
      {/* Poster Principal */}
      {isLoading ? (
        <PosterDetailSkeleton />
      ) : (
        <PosterDetail
          backdrop_path={tvSerieDetail?.backdrop_path}
          genres={tvSerieDetail?.genres}
          overview={tvSerieDetail?.overview}
          poster_path={tvSerieDetail?.poster_path}
          release_date={tvSerieDetail?.first_air_date}
          seasons={tvSerieDetail?.seasons.length}
          title={tvSerieDetail?.name}
          vote_average={tvSerieDetail?.vote_average}
          mediaType="tv"
        />
      )}

      {/* Contenido principal */}
      <div className="bg-stone-200 px-4 md:px-8 py-6 md:py-8">
        {/* En móvil: columna. En desktop: grid de 8 columnas */}
        <div className="flex flex-col md:grid md:grid-cols-8 gap-6">
          {/* Botón trailer y detalles: arriba en móvil, columna derecha en desktop */}
          <div className="flex flex-row md:flex-col md:col-start-8 md:col-span-1 gap-3 md:gap-6">
            <div
              className="flex gap-2 justify-center items-center bg-blue-600 flex-1 md:flex-none p-2 md:p-3 rounded-xl cursor-pointer
                         transition-all duration-200 ease-in-out hover:scale-105 hover:shadow-xl"
            >
              <button
                className="text-white text-sm md:text-lg font-bold"
                onClick={handleWatchTrailer}
              >
                {tvSerieVideos && getOfficialTrailer(tvSerieVideos)
                  ? "Ver Trailer"
                  : "Sin Trailer"}
              </button>
              <FontAwesomeIcon
                icon={faPlay}
                className="text-white text-xs md:text-base"
              />
            </div>

            <div className="flex flex-row md:flex-col gap-3 md:gap-6 flex-1 md:flex-none">
              <TextDetail title="Estado" value={tvSerieDetail?.status} />
              <TextDetail
                title="Lenguaje"
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

          {/* Temporadas */}
          <div className="md:col-span-6 md:row-start-1">
            <span className="text-2xl md:text-3xl text-black font-serif font-bold">
              Temporadas
            </span>
            <div className="mt-4 md:h-[70vh] md:overflow-y-auto md:pr-2 scrollbar-hide">
              {seasons.map((season) => (
                <div
                  key={season.season_number}
                  className="my-4 md:my-6 flex w-full bg-gray-900 rounded-xl shadow-sm overflow-hidden min-h-[140px] md:min-h-[180px]"
                >
                  {/* Poster de la temporada */}
                  <div className="w-24 sm:w-32 md:w-40 flex-shrink-0">
                    <img
                      className="h-full w-full object-cover"
                      src={`${apiImageUrl}/w500/${season.poster_path}`}
                      alt={season.name}
                    />
                  </div>

                  {/* Info de la temporada */}
                  <div className="p-3 md:p-4 flex flex-col justify-center flex-1">
                    <div className="mb-1">
                      <span className="text-blue-600 text-xs font-bold uppercase tracking-widest">
                        Temporada {season.season_number}
                      </span>
                      <h2 className="text-base md:text-xl font-bold text-gray-900 leading-tight">
                        {season.name}
                      </h2>
                    </div>

                    <div className="flex items-center mb-2 md:mb-3">
                      <div className="flex text-yellow-400 text-xs md:text-sm">
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

                    {/* Descripción oculta en móvil para ahorrar espacio */}
                    <p className="hidden sm:block text-white text-sm mb-3">
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
            </div>
          </div>
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
