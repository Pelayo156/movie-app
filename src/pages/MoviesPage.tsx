import { useEffect, useState } from "react";
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
  const [moviesList, setMoviesList] = useState<MovieListsResult[]>();
  const [currentCategory, setCurrentCategory] = useState<Categories | null>("now_playing");
  const [totalPages, setTotalPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchText, setSearchText] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    searchText == null
      ? fetchMoviesByCategory(currentCategory, currentPage)
      : searchMoviesWithText(searchText);
  }, [currentCategory, currentPage]);

  const fetchMoviesByCategory = async (category: string | null, page: number) => {
    setIsLoading(true);
    try {
      const response = await movieListsService.getMoviesByCategory(
        category ? category : "",
        page,
      );
      setMoviesList(response.results);
      setTotalPages(response.total_pages);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const changeCategory = (category: Categories) => {
    setCurrentCategory(category);
    setCurrentPage(1);
    let userSearchText = document.getElementById("search") as HTMLInputElement;
    userSearchText.value = "";
    setSearchText(null);
  };

  const handlePageSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentPage(Number(event.target.value));
  };

  const searchMoviesWithText = async (
    text: string,
    firstSearch: boolean = false,
  ): Promise<void> => {
    setCurrentCategory(null);
    let response;
    try {
      response = await searchService.getSearchMovie(text, currentPage);
    } catch (error) {
      throw new Error(`No ha sido posible obtener la lista de películas: ${error}`);
    }
    if (firstSearch) setCurrentPage(1);
    setSearchText(text);
    setMoviesList(response.results);
    setTotalPages(response.total_pages);
  };

  return (
    <div className="bg-gray-950 pt-8 md:pt-10 min-h-screen">

      {/* TÍTULO */}
      <div className="text-white text-3xl md:text-5xl text-center">Películas</div>

      <SearchBar onSearch={searchMoviesWithText} />

      {/* CATEGORÍAS */}
      {/* En móvil: grid de 2x2. En desktop: fila con gap grande */}
      <div className="grid grid-cols-2 md:flex md:flex-wrap gap-5 md:gap-x-20 md:gap-y-10 justify-items-center md:justify-center px-4 md:px-0 py-6 md:py-10">
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

      {/* TEXTO DE BÚSQUEDA */}
      {searchText != null && (
        <div className="px-4 mb-2">
          <span className="text-white text-xl md:text-3xl font-thin">
            Búsqueda "{searchText}"
          </span>
        </div>
      )}

      {/* LISTA DE PELÍCULAS */}
      <div className="mt-4 min-h-[90vh]">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 3xl:grid-cols-8 gap-x-3 gap-y-8 md:gap-x-5 md:gap-y-10 justify-items-center px-3 md:px-4">
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
        <div className="mt-10 md:mt-20 pb-10 text-white/80 flex gap-4 md:gap-20 justify-center items-center">
          <button
            className={`font-bold text-sm md:text-base ${
              currentPage > 1 && "hover:text-white"
            } disabled:opacity-50 disabled:cursor-not-allowed`}
            disabled={currentPage <= 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            <FontAwesomeIcon icon={faLessThan} className="mr-1 md:mr-2 text-xs md:text-sm" />
            Anterior
          </button>

          <div className="flex items-center gap-2 md:gap-3 font-bold text-sm md:text-base">
            <span>Página</span>
            <select
              value={currentPage}
              onChange={handlePageSelect}
              className="bg-gray-800 border border-gray-600 text-white text-xs md:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block cursor-pointer"
              aria-label="Seleccionar página"
            >
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
                <option key={pageNumber} value={pageNumber}>
                  {pageNumber}
                </option>
              ))}
            </select>
            <span>de {totalPages}</span>
          </div>

          <button
            className={`font-bold text-sm md:text-base ${
              currentPage < totalPages && "hover:text-white"
            } disabled:opacity-50 disabled:cursor-not-allowed`}
            disabled={currentPage >= totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Siguiente
            <FontAwesomeIcon icon={faGreaterThan} className="ml-1 md:ml-2 text-xs md:text-sm" />
          </button>
        </div>
      )}
    </div>
  );
}
export default MoviesPage;
