import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { peopleService } from "../services/peopleService";
import type {
  APITmdbPeopleDetailsResponse,
  APITmdbPeopleProfile,
} from "../types/people.types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const apiImageUrl = import.meta.env.VITE_API_IMAGE_URL;

// Skeleton que imita la estructura de la card
function CelebritieDetailSkeleton() {
  return (
    <div className="p-4 md:p-6 w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 rounded-xl bg-gray-800 animate-pulse">
      {/* Columna izquierda */}
      <div className="col-span-1 flex flex-col overflow-hidden rounded-3xl bg-black/25 shadow-xl">
        {/* Imagen */}
        <div className="w-full aspect-[2/3] bg-gray-700" />

        {/* Info */}
        <div className="flex flex-col px-6 md:px-8 py-6 md:pb-8 gap-4">
          {/* Nombre */}
          <div className="h-6 bg-gray-700 rounded w-3/4" />
          {/* Departamento */}
          <div className="h-4 bg-gray-700 rounded w-1/2 -mt-2" />

          <div className="space-y-4 mt-2">
            {/* Nacimiento */}
            <div className="flex justify-between border-b border-zinc-800 pb-2">
              <div className="h-4 bg-gray-700 rounded w-1/4" />
              <div className="h-4 bg-gray-700 rounded w-1/3" />
            </div>
            {/* Lugar */}
            <div className="flex justify-between border-b border-zinc-800 pb-2">
              <div className="h-4 bg-gray-700 rounded w-1/4" />
              <div className="h-4 bg-gray-700 rounded w-2/5" />
            </div>
            {/* Popularidad */}
            <div className="flex justify-between border-b border-zinc-800 pb-2">
              <div className="h-4 bg-gray-700 rounded w-1/4" />
              <div className="h-4 bg-gray-700 rounded w-1/6" />
            </div>
          </div>
        </div>
      </div>

      {/* Columna derecha: biografía */}
      <div className="col-span-1 md:col-span-2 rounded-3xl bg-black/25 p-6 md:p-10 shadow-xl">
        {/* Título */}
        <div className="h-8 bg-gray-700 rounded w-1/3 mb-6" />
        {/* Líneas de texto */}
        <div className="space-y-3">
          <div className="h-4 bg-gray-700 rounded w-full" />
          <div className="h-4 bg-gray-700 rounded w-full" />
          <div className="h-4 bg-gray-700 rounded w-5/6" />
          <div className="h-4 bg-gray-700 rounded w-full" />
          <div className="h-4 bg-gray-700 rounded w-4/6" />
          <div className="h-4 bg-gray-700 rounded w-full" />
          <div className="h-4 bg-gray-700 rounded w-3/4" />
          <div className="h-4 bg-gray-700 rounded w-full" />
          <div className="h-4 bg-gray-700 rounded w-5/6" />
        </div>
      </div>
    </div>
  );
}

function CelebritieDetailPage() {
  const celebritieId = useParams().id;

  const [celebritieDetail, setCelebritieDetail] =
    useState<APITmdbPeopleDetailsResponse | null>(null);
  const [bestPhoto, setBestPhoto] = useState<APITmdbPeopleProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchAllData = async () => {
      if (!celebritieId) return;
      setIsLoading(true);
      try {
        const [details, images] = await Promise.all([
          peopleService.getDetailPeople(celebritieId),
          peopleService.getImagesPeople(celebritieId),
        ]);

        setCelebritieDetail(details);

        if (images.profiles.length > 0) {
          const best = images.profiles.reduce((prev, curr) =>
            curr.vote_average > prev.vote_average ? curr : prev
          );
          setBestPhoto(best);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllData();
  }, [celebritieId]);

  const photoPath = bestPhoto?.file_path ?? celebritieDetail?.profile_path;

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10">
      {isLoading ? (
        <CelebritieDetailSkeleton />
      ) : (
        <div className="p-4 md:p-6 w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 rounded-xl bg-gray-800 md:items-stretch">
          {/* PARTE IZQUIERDA */}
          <div className="col-span-1 flex flex-col overflow-hidden rounded-3xl bg-black/25 shadow-xl">
            <div className="w-full flex-shrink-0">
              <img
                src={`${apiImageUrl}/w500${photoPath}`}
                alt={`Foto de ${celebritieDetail?.name}`}
                className="w-full h-auto object-contain"
                style={{
                  maskImage:
                    "linear-gradient(to bottom, black 75%, transparent 100%)",
                  WebkitMaskImage:
                    "linear-gradient(to bottom, black 75%, transparent 100%)",
                }}
              />
            </div>

            <div className="flex flex-col justify-center px-6 md:px-8 py-6 md:pb-8 text-zinc-300 flex-shrink-0">
              <h2 className="text-xl md:text-2xl font-bold text-white">
                {celebritieDetail?.name}
              </h2>
              <span className="mb-4 md:mb-6 text-sm text-zinc-500">
                {celebritieDetail?.known_for_department}
              </span>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between border-b border-zinc-800 pb-2">
                  <span className="shrink-0">Nacimiento</span>
                  <span className="text-white">
                    {celebritieDetail?.birthday}
                  </span>
                </div>
                <div className="flex justify-between items-start border-b border-zinc-800 pb-2 gap-4">
                  <span className="shrink-0">Lugar</span>
                  <span className="text-white text-right flex-1 break-words">
                    {celebritieDetail?.place_of_birth}
                  </span>
                </div>
                <div className="flex justify-between items-start border-b border-zinc-800 pb-2 gap-4">
                  <span className="shrink-0">Popularidad</span>
                  <span className="text-yellow-500">
                    <FontAwesomeIcon
                      icon={faStar}
                      className="text-xs text-yellow-300"
                    />{" "}
                    {celebritieDetail?.popularity?.toFixed(2) ?? "—"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* PARTE DERECHA: BIOGRAFÍA */}
          <div className="col-span-1 md:col-span-2 rounded-3xl bg-black/25 p-6 md:p-10 shadow-xl md:h-full md:overflow-y-auto custom-scrollbar">
            <h3 className="mb-4 md:mb-5 text-2xl md:text-3xl font-bold text-white py-2">
              Biografía
            </h3>
            <div className="space-y-4 text-base md:text-lg leading-relaxed text-zinc-300">
              <p className="text-justify font-extralight">
                {celebritieDetail?.biography
                  ? celebritieDetail.biography
                  : "No disponible"}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CelebritieDetailPage;
