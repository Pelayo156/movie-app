import { use, useEffect, useState } from "react";
import CategoryButton from "../components/ui/CategoryButton";
import {
  faStar,
  faFilmSimple,
  faMedal,
  faCalendarDays,
  faGreaterThan,
  faLessThan,
} from "@fortawesome/free-solid-svg-icons";
import type { MovieListsResult, Categories } from "../types/movieLists.types";
import { movieListsService } from "../services/movieListsService";
import { searchService } from "../services/searchService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ListCard from "../components/ui/ListCard";
import ListCardSkeleton from "../components/ui/ListCardSkeleton";
import SearchBar from "../components/ui/SearchBar";

function MoviesPage() {
  // Variable para guardar lista de películas según la categoría que seleccione el usuario
  const [moviesList, setMoviesList] = useState<MovieListsResult[]>();

  // Variable para almacenar categoría actual
  const [currentCategory, setCurrentCategory] = useState<Categories | null>(
    "now_playing"
  );

  // Variable para guardar número de páginas total
  const [totalPages, setTotalPages] = useState<number>(0);

  // Variable para guardar número actual de página
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Variable para guardar texto de búsqueda ingresado por el usuario
  const [searchText, setSearchText] = useState<string | null>(null);

  // Variables para estado de carga y mensajes de errores
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<String | null>(null);

  useEffect(() => {
    searchText == null
      ? fetchMoviesByCategory(currentCategory, currentPage)
      : searchMoviesWithText(searchText);
  }, [currentCategory, currentPage]);

  const fetchMoviesByCategory = async (
    category: string | null,
    page: number
  ) => {
    setIsLoading(true);
    try {
      const response = await movieListsService.getMoviesByCategory(
        category ? category : "",
        page
      );
      const data = response;
      setMoviesList(data.results);
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

    // Limpiar varibales relacionadas con la búsqueda por barra
    let userSearchText = document.getElementById("search") as HTMLInputElement;
    userSearchText.value = "";

    setSearchText(null);
  };

  const handlePageSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedPage = Number(event.target.value);
    setCurrentPage(selectedPage);
  };

  /*
   * Función para buscar películas mediante alguna palabra clave

   * @param text - Variable de texto utilizada para buscar películas con algún título similar
   */
  const searchMoviesWithText = async (
    text: string,
    firstSearch: boolean = false
  ): Promise<void> => {
    // Limpiar variables de categoría
    setCurrentCategory(null);

    let response;
    try {
      // Se hace el llamado a la API con el texto proporcionado por el usuario
      response = await searchService.getSearchMovie(text, currentPage);
    } catch (error) {
      throw new Error(
        `No ha sido posible obtener la lista de películas: ${error}`
      );
    }

    if (firstSearch) setCurrentPage(1);
    setSearchText(text);
    setMoviesList(response.results);
    setTotalPages(response.total_pages);
  };

  return (
    <div className="bg-gray-950 pt-10 min-h-screen">
      {/* TÍTULO */}
      <div className="text-white text-5xl text-center">Películas</div>

      <SearchBar onSearch={searchMoviesWithText} />

      {/* CATEGORÍAS */}
      <div className="flex flex-wrap gap-x-20 gap-y-10 justify-center md:py-10">
        <CategoryButton
          title="En Cartelera"
          icon={faFilmSimple}
          isActive={"now_playing" === currentCategory}
          onClick={() => changeCategory("now_playing")}
        />
        <CategoryButton
          title="Popular"
          icon={faStar}
          isActive={"popular" === currentCategory}
          onClick={() => changeCategory("popular")}
        />
        <CategoryButton
          title="Más Valorado"
          icon={faMedal}
          isActive={"top_rated" === currentCategory}
          onClick={() => changeCategory("top_rated")}
        />
        <CategoryButton
          title="Próximamente"
          icon={faCalendarDays}
          isActive={"upcoming" === currentCategory}
          onClick={() => changeCategory("upcoming")}
        />
      </div>

      {/* TÍTULO DE PALABRA DE BÚSQUEDA (EN EL CASO DE QUE HAYA) */}
      {searchText != null && (
        <span className="ml-4 text-white text-3xl font-thin" text-center>
          Búsqueda "{searchText}"
        </span>
      )}

      <div className="mt-4 min-h-[90vh]">
        {/* LISTA DE PELÍCULAS */}
        <div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6
                     3xl:grid-cols-8 gap-x-5 gap-y-10 justify-items-center px-4"
        >
          {isLoading
            ? Array.from({ length: 20 }).map((_, index) => (
                <ListCardSkeleton key={index} />
              ))
            : moviesList?.map((movie) => (
                <ListCard
                  id={movie.id}
                  title={movie.title}
                  poster_path={movie.poster_path}
                  content_type="movie"
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
export default MoviesPage;
