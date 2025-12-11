import CategoryButton from "../components/ui/CategoryButton";
import { useState, useEffect } from "react";
import { tvSeriesListsService } from "../services/tvSeriesListsService";
import {
  faStar,
  faFilmSimple,
  faMedal,
  faGreaterThan,
  faLessThan,
} from "@fortawesome/free-solid-svg-icons";
import type {
  ResultTvSeriesLists,
  Categories,
} from "../types/tvSeriesLists.types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ListCard from "../components/ui/ListCard";
import ListCardSkeleton from "../components/ui/ListCardSkeleton";

function TvSeriesPage() {
  // Variable para guardar lista de tv series según categoría seleccionada por el usuario
  const [tvSeriesList, setTvSeriesList] = useState<ResultTvSeriesLists[]>();

  // Variable para almacenar categoría actual
  const [currentCategory, setCurrentCategory] =
    useState<Categories>("airing_today");

  // Variable para guardar número de páginas total
  const [totalPages, setTotalPages] = useState<number>(0);

  // Variable para guardar número actual de página
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Variables para estado de carga y mensajes de errores
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<String | null>(null);

  useEffect(() => {
    fetchTvSeriesByCategory(currentCategory, currentPage);
  }, [currentCategory, currentPage]);

  const fetchTvSeriesByCategory = async (category: string, page: number) => {
    setIsLoading(true);
    try {
      const response = await tvSeriesListsService.getTvSerieByCategory(
        category,
        page
      );
      const data = response;
      setTvSeriesList(data.results);
      setTotalPages(data.total_pages);
    } catch (err) {
      setError("Error al obtener películas populares.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Función para cambiar de categoría
  const changeCategory = (category: Categories) => {
    setCurrentCategory(category);
    setCurrentPage(1);
  };

  const handlePageSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedPage = Number(event.target.value);
    setCurrentPage(selectedPage);
  };

  return (
    <div className="bg-gray-950 pt-10 min-h-screen">
      {/* TÍTULO */}
      <div className="text-white text-5xl text-center">TV Shows</div>

      {/* CATEGORÍAS */}
      <div className="flex flex-wrap gap-x-20 gap-y-10 justify-center md:py-10">
        <CategoryButton
          title="Al Aire"
          icon={faFilmSimple}
          onClick={() => changeCategory("airing_today")}
        />
        <CategoryButton
          title="Popular"
          icon={faStar}
          onClick={() => changeCategory("popular")}
        />
        <CategoryButton
          title="Más Valorado"
          icon={faMedal}
          onClick={() => changeCategory("top_rated")}
        />
      </div>

      <div className="min-h-[90vh]">
        {/* LISTA DE PELÍCULAS */}
        <div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6
                     3xl:grid-cols-8 gap-x-5 gap-y-10 justify-items-center px-4"
        >
          {isLoading
            ? Array.from({ length: 20 }).map((_, index) => (
                <ListCardSkeleton key={index} />
              ))
            : tvSeriesList?.map((tvSerie) => (
                <ListCard
                  id={tvSerie.id}
                  title={tvSerie.name}
                  poster_path={tvSerie.poster_path}
                  content_type="tv"
                />
              ))}
        </div>
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
export default TvSeriesPage;
