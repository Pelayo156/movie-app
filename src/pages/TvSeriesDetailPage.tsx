import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import type { APITmdbTVSeriesResponse } from "../types/tvSeries.types";
import { tvSeriesService } from "../services/tvSeriesService";
import PosterDetail from "../components/layouts/PosterDetail";

function TvSeriesDetailPage() {
  // Variable para guardar datos de la Serie
  const [tvSerieDetail, setTvSerieDetail] =
    useState<APITmdbTVSeriesResponse | null>(null);

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
    <div className="mt-20">
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
    </div>
  );
}
export default TvSeriesDetailPage;
