import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faStar,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import type { ResultPeople } from "../types/peopleLists.types";
import { peopleListsService } from "../services/peopleListsService";

const apiImageUrl = import.meta.env.VITE_API_IMAGE_URL;
function CelebritiesPage() {
  // Lista para guardar celebridades
  const [celebritiesList, setCelebritiesList] = useState<ResultPeople[]>();

  // Variable para llevar la cuenta de la página actual
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Variables para estado de carga y mensajes de errores
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<String | null>(null);

  useEffect(() => {
    const fetchCelebritiesList = async () => {
      setIsLoading(true);
      setError(null);

      console.log("hola");

      try {
        const response = await peopleListsService.getPopularPeople(currentPage);
        const data = response.results;
        setCelebritiesList(data);
      } catch (err) {
        setError("Error al obtener lista de celebridades.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCelebritiesList();
  }, []);

  return (
    <div className="bg-gray-950 pt-10 min-h-screen">
      <h1 className="ml-10 text-white text-center text-5xl">Celebridades</h1>

      <div className="mt-10 grid grid-cols-6 gap-4">
        {/* BUSCADOR */}
        <div className="col-span-4 col-start-2">
          <input
            type="text"
            id="search"
            name="search"
            className="w-full p-4 rounded-full bg-gray-50/10 text-white font-light"
          />
        </div>
        <div className="col-span-1 flex items-center">
          <button className="p-4 bg-gray-50/10  rounded-full">
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className="text-xl text-white"
            />
          </button>
        </div>
      </div>

      {/* TABLA CELEBRIDADES */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4 w-11/12 xl:w-4/5 mx-auto">
        {celebritiesList?.map((celebritie) => (
          <div
            key={celebritie.id}
            className="p-4 bg-gray-900 border-b-2 border-black/70 rounded-sm"
          >
            <div className="ml-6 w-full h-36 flex gap-10 items-center">
              <img
                src={
                  celebritie.profile_path
                    ? `${apiImageUrl}/w300/${celebritie.profile_path}`
                    : "https://via.placeholder.com/500x750?text=No+Image"
                }
                alt={celebritie.name}
                className="w-36 h-full object-cover rounded-full"
              />

              <div className="flex flex-col gap-1">
                <span className="text-white font-semibold text-lg hover:text-white/85 hover:cursor-pointer">
                  {celebritie.name}
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-white text-md">
                    {celebritie.known_for_department}
                  </span>
                  <span className="text-white font-bold">-</span>
                  <span className="text-white text-md">
                    {celebritie.popularity.toFixed(1)}%
                  </span>
                  <div>
                    <FontAwesomeIcon
                      icon={faStar}
                      className="text-xs text-yellow-300"
                    />
                    {Number(celebritie.popularity) >= 40 && (
                      <FontAwesomeIcon
                        icon={faStar}
                        className="text-xs text-yellow-300"
                      />
                    )}
                    {Number(celebritie.popularity) >= 75 && (
                      <FontAwesomeIcon
                        icon={faStar}
                        className="text-xs text-yellow-300"
                      />
                    )}
                  </div>
                </div>
                <span className="text-white text-md hover:text-white/85 hover:cursor-pointer">
                  {celebritie.known_for.at(0)?.name
                    ? celebritie.known_for.at(0)?.name
                    : celebritie.known_for.at(0)?.title}{" "}
                  (
                  {celebritie.known_for.at(0)?.release_date
                    ? celebritie.known_for.at(0)?.release_date?.split("-")[0]
                    : celebritie.known_for.at(0)?.first_air_date?.split("-")[0]}
                  )
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default CelebritiesPage;
