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

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchCelebritieDetail = async () => {
      try {
        if (celebritieId) {
          const response = await peopleService.getDetailPeople(celebritieId);
          setCelebritieDetail(response);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchCelebritieDetail();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10">
      {/* CARD */}
      <div className="p-4 md:p-6 w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 rounded-xl bg-gray-800">
        {/* PARTE IZQUIERDA */}
        <div className="col-span-1 flex flex-col overflow-hidden rounded-3xl bg-black/25 shadow-xl">
          {/* En móvil la imagen es más pequeña y no ocupa 2/3 de altura fija */}
          <div className="relative w-full h-64 sm:h-80 md:h-2/3">
            <img
              src={`${apiImageUrl}/w500${celebritieDetail?.profile_path}`}
              alt="Celebritie Image"
              className="h-full w-full object-cover object-top"
              style={{
                maskImage:
                  "linear-gradient(to bottom, black 60%, transparent 100%)",
                WebkitMaskImage:
                  "linear-gradient(to bottom, black 60%, transparent 100%)",
              }}
            />
          </div>

          {/* Info debajo de la foto */}
          <div className="flex flex-col justify-center px-6 md:px-8 py-6 md:pb-8 text-zinc-300">
            <h2 className="text-xl md:text-2xl font-bold text-white">
              {celebritieDetail?.name}
            </h2>
            <span className="mb-4 md:mb-6 text-sm text-zinc-500">
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

        {/* PARTE DERECHA: BIOGRAFÍA */}
        {/* En móvil no tiene altura fija, crece con el contenido */}
        <div className="col-span-1 md:col-span-2 rounded-3xl bg-black/25 p-6 md:p-10 shadow-xl overflow-y-auto md:max-h-[600px] custom-scrollbar">
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
    </div>
  );
}
export default CelebritieDetailPage;
