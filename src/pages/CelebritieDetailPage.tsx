import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { peopleService } from "../services/peopleService";
import type { APITmdbPeopleDetailsResponse } from "../types/people.types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const apiImageUrl = import.meta.env.VITE_API_IMAGE_URL;
function CelebritieDetailPage() {
  const celebritieId = useParams().id;

  const [celebritieDetail, setCelebritieDetail] =
    useState<APITmdbPeopleDetailsResponse | null>(null);

  // Variables para estado de carga y mensajes de errores
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<String | null>(null);

  useEffect(() => {
    // Para que el usuario cuando entre a esta vista se vea desde el inicio
    window.scrollTo(0, 0);

    const fetchCelebritieDetail = async () => {
      setIsLoading(true);
      setError(null);

      // Se guardan detalles de Celebridad
      try {
        if (celebritieId) {
          const response = await peopleService.getDetailPeople(celebritieId);
          setCelebritieDetail(response);
        }
      } catch (err) {
        setError(
          `Error al obtener detalle de celebridad con id ${celebritieId}.`
        );
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCelebritieDetail();
  }, []);

  return (
    <div className="min-h-screen grid place-items-center">
      {/* INICIO CARD */}
      <div className="p-6 grid h-[600px] w-full max-w-6xl grid-cols-1 gap-6 md:grid-cols-3 rounded-xl bg-gray-800">
        <div className="col-span-1 flex flex-col overflow-hidden rounded-3xl bg-black/25 shadow-xl">
          {/* PARTE IZQUIERDA DE LA CARD */}
          <div className="relative h-2/3 w-full">
            <img
              src={`${apiImageUrl}/w500${celebritieDetail?.profile_path}`}
              alt="Celebritie Image"
              className="h-full w-full object-cover"
              style={{
                maskImage:
                  "linear-gradient(to bottom, black 60%, transparent 100%)",
                WebkitMaskImage:
                  "linear-gradient(to bottom, black 60%, transparent 100%)",
              }}
            />
          </div>
          <div className="flex h-1/3 flex-col justify-center px-8 pb-8 text-zinc-300">
            <h2 className="text-2xl font-bold text-white">
              {celebritieDetail?.name}
            </h2>
            <span className="mb-6 text-sm text-zinc-500">
              {celebritieDetail?.known_for_department}
            </span>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between border-b border-zinc-800 pb-2">
                <span className="shrink-0">Nacimiento</span>
                <span className="text-white">{celebritieDetail?.birthday}</span>
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
                  145.32
                </span>
              </div>
            </div>
          </div>
        </div>
        {/* PARTE DERECHA DE LA CARD: BIOGRAFIA */}
        <div className="col-span-2 rounded-3xl bg-black/25 p-10 shadow-xl overflow-y-auto custom-scrollbar">
          <h3 className="mb-5 text-3xl font-bold text-white py-2">Biografía</h3>
          <div className="space-y-4 text-lg leading-relaxed text-zinc-300">
            <p className="text-justify font-extralight">
              {celebritieDetail?.biography
                ? celebritieDetail.biography
                : "No disponible"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default CelebritieDetailPage;
