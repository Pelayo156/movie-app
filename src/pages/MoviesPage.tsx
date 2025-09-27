import { use, useEffect, useState } from "react";
import CategoryButton from "../components/ui/CategoryButton";
import { Link } from "react-router-dom";
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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const apiImageUrl = import.meta.env.VITE_API_IMAGE_URL;
function MoviesPage() {
  // Variable para guardar lista de películas según la categoría que seleccione el usuario
  const [moviesList, setMoviesList] = useState<MovieListsResult[]>();

  // Variable para almacenar categoría actual
  const [currentCategory, setCurrentCategory] =
    useState<Categories>("now_playing");

  // Variable para guardar número de páginas total
  const [totalPages, setTotalPages] = useState<number>(0);

  // Variable para guardar número actual de página
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Variables para estado de carga y mensajes de errores
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<String | null>(null);

  useEffect(() => {
    fetchMoviesByCategory(currentCategory, currentPage);
  }, [currentCategory, currentPage]);

  const fetchMoviesByCategory = async (category: string, page: number) => {
    try {
      const response = await movieListsService.getMoviesByCategory(
        category,
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
  };

  return (
    <div className="bg-gray-950 mt-20 pt-10 min-h-screen">
      {/* TÍTULO */}
      <div className="text-white text-5xl text-center">Películas</div>

      {/* CATEGORÍAS */}
      <div className="flex flex-wrap gap-x-20 gap-y-10 justify-center md:py-10">
        <CategoryButton
          title="En Cartelera"
          icon={faFilmSimple}
          onClick={() => changeCategory("now_playing")}
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
        <CategoryButton
          title="Próximamente"
          icon={faCalendarDays}
          onClick={() => changeCategory("upcoming")}
        />
      </div>

      {/* LISTA DE PELÍCULAS */}
      <div className="mt-5 flex flex-wrap justify-center gap-10">
        {moviesList?.map((movie) => (
          <Link to={`/movie/${movie.id}`} key={movie.id}>
            <div
              className="w-40 sm:w-44 md:w-48 lg:w-52 xl:w-56
                        rounded-xl border-2 border-transparent 
                        hover:border-2 hover:border-white hover:scale-105 
                        transform transition-all duration-300 ease-in-out cursor-pointer"
            >
              <img
                src={
                  movie.poster_path
                    ? `${apiImageUrl}/w300/${movie.poster_path}`
                    : "https://via.placeholder.com/500x750?text=No+Image"
                }
                alt={movie.title}
                className="w-full h-auto object-cover rounded-xl"
              />
            </div>
          </Link>
        ))}
      </div>

      {/* PAGINADOR */}
      <div className="mt-20 text-white/80 flex gap-20 justify-center items-center">
        <button
          className={`font-bold ${currentPage > 1 && "hover:text-white"}`}
          disabled={currentPage <= 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          <FontAwesomeIcon icon={faLessThan} className="mr-2 text-sm" />
          Anterior
        </button>
        <div className="flex gap-2 font-bold">
          <p>página</p>
          <p>{currentPage}</p>
          <p>-</p>
          <p>{totalPages}</p>
        </div>
        <button
          className={`font-bold ${
            currentPage < totalPages && "hover:text-white"
          }`}
          disabled={currentPage >= totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Siguiente
          <FontAwesomeIcon icon={faGreaterThan} className="ml-2 text-sm" />
        </button>
      </div>
    </div>
  );
}
export default MoviesPage;
