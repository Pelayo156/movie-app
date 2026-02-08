import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faGreaterThan,
  faLessThan,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { ResultPeople } from "../types/peopleLists.types";
import { peopleListsService } from "../services/peopleListsService";
import { searchService } from "../services/searchService";
import SearchBar from "../components/ui/SearchBar";

const apiImageUrl = import.meta.env.VITE_API_IMAGE_URL;
function CelebritiesPage() {
  // Lista para guardar celebridades
  const [celebritiesList, setCelebritiesList] = useState<ResultPeople[]>();

  // Variable para guardar número de páginas total
  const [totalPages, setTotalPages] = useState<number>(2);

  // Variable para llevar la cuenta de la página actual
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Variable para guardar texto de búsqueda ingresado por el usuario
  const [searchText, setSearchText] = useState<string | null>(null);

  // Variables para estado de carga y mensajes de errores
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<String | null>(null);

  useEffect(() => {
    searchText == null
      ? fetchCelebritiesList()
      : searchPersonsWithText(searchText);
  }, [currentPage]);

  const fetchCelebritiesList = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await peopleListsService.getPopularPeople(currentPage);
      const data = response;
      setCelebritiesList(data.results);

      if (data.total_pages > 100) {
        setTotalPages(100);
      } else {
        setTotalPages(data.total_pages);
      }
    } catch (err) {
      setError("Error al obtener lista de celebridades.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const searchPersonsWithText = async (
    text: string,
    firstSearch: boolean = false
  ): Promise<void> => {
    let response;
    try {
      // Se hace el llamado a la API con el texto proporcionado por el usuario
      response = await searchService.getSearchPerson(text, currentPage);
    } catch (error) {
      throw new Error(
        `No ha sido posible obtener la lista de películas: ${error}`
      );
    }

    if (firstSearch) setCurrentPage(1);
    setSearchText(text);
    setCelebritiesList(response.results);
    setTotalPages(response.total_pages);
  };

  const handlePageSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedPage = Number(event.target.value);
    setCurrentPage(selectedPage);
  };

  return (
    <div className="bg-gray-950 pt-10 min-h-screen">
      <h1 className="ml-10 text-white text-center text-5xl">Celebridades</h1>

      {/* BARRA DE BÚSQUEDA */}
      <SearchBar onSearch={searchPersonsWithText} />

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
                <Link
                  to={`/celebritie/${celebritie.id}`}
                  className="text-white font-semibold text-lg hover:text-white/85 hover:cursor-pointer"
                >
                  {celebritie.name}
                </Link>
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

      {/* PAGINADOR */}
      {!isLoading && totalPages > 1 && (
        <div className="mt-20 pb-10 text-white/80 flex gap-10 md:gap-20 justify-center items-center">
          <button
            className={`font-bold ${
              currentPage > 1 && "hover:text-white"
            } disabled:opacity-50 disabled:cursor-not-allowed`}
            disabled={currentPage <= 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            <FontAwesomeIcon icon={faLessThan} className="mr-2 text-sm" />
            Anterior
          </button>

          <div className="flex items-center gap-3 font-bold">
            <span>Página</span>
            <select
              value={currentPage}
              onChange={handlePageSelect}
              className="bg-gray-800 border border-gray-600 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block cursor-pointer"
              aria-label="Seleccionar página"
            >
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (pageNumber) => (
                  <option key={pageNumber} value={pageNumber}>
                    {pageNumber}
                  </option>
                )
              )}
            </select>
            <span>de {totalPages}</span>
          </div>

          <button
            className={`font-bold ${
              currentPage < totalPages && "hover:text-white"
            } disabled:opacity-50 disabled:cursor-not-allowed`}
            disabled={currentPage >= totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Siguiente
            <FontAwesomeIcon icon={faGreaterThan} className="ml-2 text-sm" />
          </button>
        </div>
      )}
    </div>
  );
}
export default CelebritiesPage;
