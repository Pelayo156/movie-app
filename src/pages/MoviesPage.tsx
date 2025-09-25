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
import type { MovieListsResult } from "../types/movieLists.types";
import { movieListsService } from "../services/movieListsService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const apiImageUrl = import.meta.env.VITE_API_IMAGE_URL;
function MoviesPage() {
  // Variable para guardar lista de películas según la categoría que seleccione el usuario
  const [moviesList, setMoviesList] = useState<MovieListsResult[]>();

  // Variable para guardar número de páginas total
  const [totalPages, setTotalPages] = useState<number>(0);

  // Variable para guardar número actual de página
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Variables para estado de carga y mensajes de errores
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<String | null>(null);

  useEffect(() => {
    fetchNowPlayingMovies();
  }, []);

  // Función para obtener películas en cartelera desde la API
  const fetchNowPlayingMovies = async () => {
    try {
      const response = await movieListsService.getNowPlaying(currentPage);
      const data = response.results;
      setMoviesList(data);
      setTotalPages(response.total_pages);
    } catch (err) {
      setError("Error al obtener películas populares.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Función para obtener películas populares desde la API
  const fetchPopularMovies = async () => {
    try {
      const response = await movieListsService.getPopular(currentPage);
      const data = response.results;
      setMoviesList(data);
      setTotalPages(response.total_pages);
    } catch (err) {
      setError("Error al obtener películas en Cartelera.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Función para obtener películas más valoradas desde la API
  const fetchTopRatedMovies = async () => {
    try {
      const response = await movieListsService.getTopRated(currentPage);
      const data = response.results;
      setMoviesList(data);
      setTotalPages(response.total_pages);
    } catch (err) {
      setError("Error al obtener películas Más valoradas.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Función para obtener películas próximamente desde la API
  const fetchUpcomingMovies = async () => {
    try {
      const response = await movieListsService.getUpcoming(currentPage);
      const data = response.results;
      setMoviesList(data);
      setTotalPages(response.total_pages);
    } catch (err) {
      setError("Error al obtener películas Próximamente.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
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
          onClick={fetchNowPlayingMovies}
        />
        <CategoryButton
          title="Popular"
          icon={faStar}
          onClick={fetchPopularMovies}
        />
        <CategoryButton
          title="Más Valorado"
          icon={faMedal}
          onClick={fetchTopRatedMovies}
        />
        <CategoryButton
          title="Próximamente"
          icon={faCalendarDays}
          onClick={fetchUpcomingMovies}
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
      <div className="mt-20 text-white flex gap-20 justify-center items-center">
        <button className="font-bold">
          <FontAwesomeIcon icon={faLessThan} className="mr-2 text-sm" />
          Anterior
        </button>
        <div className="flex gap-2 font-bold">
          <p>página</p>
          <p>{currentPage}</p>
          <p>-</p>
          <p>{totalPages}</p>
        </div>
        <button className="font-bold">
          Siguiente
          <FontAwesomeIcon icon={faGreaterThan} className="ml-2 text-sm" />
        </button>
      </div>
    </div>
  );
}
export default MoviesPage;
