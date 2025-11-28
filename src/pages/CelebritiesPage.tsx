import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { use, useEffect, useState } from "react";
import type { ResultPeople } from "../types/peopleLists.types";
import { peopleListsService } from "../services/peopleListsService";

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
          <button className="p-4 bg-gray-50/10 rounded-full">
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className="text-xl text-white"
            />
          </button>
        </div>
      </div>

      {/* TABLA CELEBRIDADES */}
      <div className="mt-10 grid grid-cols-8 overflow-scroll">
        <div className=""></div>
        {celebritiesList?.map((celebritie) => (
          <div className="p-4 col-start-2 col-span-6 bg-white/75 border-b-2 border-black/70">
            {celebritie.name}
          </div>
        ))}
      </div>
    </div>
  );
}
export default CelebritiesPage;
