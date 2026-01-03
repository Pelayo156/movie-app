import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalfAlt } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import type { APITmdbTVSeriesResponse, Season } from "../types/tvSeries.types";
import { tvSeriesService } from "../services/tvSeriesService";
import PosterDetail from "../components/layouts/PosterDetail";

const apiImageUrl = import.meta.env.VITE_API_IMAGE_URL;
function TvSeriesDetailPage() {
  // Variable para guardar datos de la Serie
  const [tvSerieDetail, setTvSerieDetail] =
    useState<APITmdbTVSeriesResponse | null>(null);

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
  }, [tvSerieId]);

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

      <div className="p-8 grid grid-cols-8">
        <div className="col-span-6">
          <span className="text-3xl text-white font-serif font-bold">
            Temporadas
          </span>
          {/* Lista de temporadas */}
          {seasons.map((season) => (
            <div className="my-6 flex w-full bg-white/95 rounded-xl shadow-sm border border-gray-200 overflow-hidden min-h-[180px]">
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

                <p className="text-gray-600 text-sm mb-3">
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
          {/* Lista de temporadas */}
        </div>
        <div className="col-span-2"></div>
      </div>
    </div>
  );
}
export default TvSeriesDetailPage;
