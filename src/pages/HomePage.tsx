import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import type { TrendingResult } from "../types/trending.types";
import type { MovieListsResult } from "../types/movieLists.types";
import { trendingService } from "../services/trendingService";
import { movieListsService } from "../services/movieListsService";
import MovieCard from "../components/ui/MovieCard";

const apiImageUrl = import.meta.env.VITE_API_IMAGE_URL;
function HomePage() {
  // Variables para setear listas de películas para los Carousel
  const [trendingItems, setTrendingItems] = useState<TrendingResult[]>([]);
  const [movieListsItems, setmovieListsItems] = useState<MovieListsResult[]>(
    []
  );

  // Variables para cambiar opción del toogle de cada Carousel
  const [trendingMediaType, setTrendingMediaType] = useState<
    "Películas" | "TV Series"
  >("Películas");

  // Variables para de referencias para elementos del DOM
  const trendingCarouselRef = useRef<HTMLDivElement>(null);
  const movieListsCarouselRef = useRef<HTMLDivElement>(null);

  // Variables para estado de carga y mensajes de errores
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<String | null>(null);

  // Variable para guardar película que se mostrará en el poster inicial
  const posterMovie = trendingItems.length > 0 ? trendingItems[7] : null;

  useEffect(() => {
    // Obtener películas en tendencia
    const fetchTrendingItems = async () => {
      setIsLoading(true);
      setError(null);

      // Se guardan las películas en tendencia en solo un estado dependiendo de la elección del usuario.
      try {
        let data;
        if (trendingMediaType === "Películas") {
          const response = await trendingService.getMovies();
          data = response.results;
        } else {
          const response = await trendingService.getTvSeries();
          data = response.results;
        }
        setTrendingItems(data);
      } catch (err) {
        setError("Error al obtener películas o series en tendencia.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTrendingItems();
  }, [trendingMediaType]);

  useEffect(() => {
    const fetchMovieListsItems = async () => {
      setIsLoading(true);
      setError(null);

      // Se guardan las películas en movie Lists.
      try {
        const response = await movieListsService.getPopular();
        const data = response.results;
        setmovieListsItems(data);
      } catch (err) {
        setError("Error al obtener películas o series populares.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMovieListsItems();
  }, []);

  // Función para hacer Scroll hacia la izquierda en Carousel
  const scrollLeft = (ref: React.RefObject<HTMLDivElement | null>) => {
    if (ref.current) {
      ref.current.scrollBy({
        left: -ref.current.offsetWidth,
        behavior: "smooth",
      });
    }
  };

  // Función para hacer Scroll hacia la derecha en Carousel
  const scrollRight = (ref: React.RefObject<HTMLDivElement | null>) => {
    if (ref.current) {
      ref.current.scrollBy({
        left: ref.current.offsetWidth,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="bg-gray-950">
      {/* Inicio Poster Principal */}
      <div
        // h-[75vh] es un buen punto de partida, pero podemos ajustarlo para pantallas más pequeñas
        className="relative w-full h-[60vh] md:h-[75vh] bg-cover bg-top bg-no-repeat"
        style={{
          backgroundImage: `url(${apiImageUrl}/original/${posterMovie?.backdrop_path})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/65 to-transparent"></div>

        <div className="absolute top-0 left-0 flex h-full w-full items-center z-10">
          {/* Ajuste de padding y tamaños de texto para responsividad */}
          <div className="px-5 md:px-10 lg:px-20">
            {posterMovie && (
              // Tamaño de texto responsivo
              <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold">
                {"name" in posterMovie ? posterMovie.name : posterMovie.title}
              </h1>
            )}
            {/* Tamaño de texto y ancho máximo responsivos */}
            <p className="text-white text-sm sm:text-base md:text-lg text-justify mt-4 md:mt-10 max-w-xl md:max-w-2xl lg:max-w-3xl">
              {posterMovie?.overview}
            </p>
          </div>
        </div>
      </div>
      {/* Fin Poster Principal */}

      {/* Inicio Carousel de Tendencias */}
      <div className="font-bold text-xl md:text-2xl text-white flex flex-col md:flex-row items-start md:items-center max-w-[95%] lg:max-w-[90%] mx-auto pt-8 md:pt-10">
        Tendencia
        {/* Ajuste de márgenes y espaciado para el toggle */}
        <div className="flex space-x-2 bg-gray-300 p-1 rounded-xl mt-4 md:mt-0 md:ml-8">
          <button
            onClick={() => setTrendingMediaType("Películas")}
            className={`px-3 py-1 text-sm font-semibold rounded-lg transition-colors duration-300 ${
              trendingMediaType === "Películas"
                ? "bg-black text-white shadow"
                : "bg-transparent text-gray-600 hover:bg-gray-300"
            }`}
          >
            Películas
          </button>
          <button
            onClick={() => setTrendingMediaType("TV Series")}
            className={`px-3 py-1 text-sm font-semibold rounded-lg transition-colors duration-300 ${
              trendingMediaType === "TV Series"
                ? "bg-black text-white shadow"
                : "bg-transparent text-gray-600 hover:bg-gray-300"
            }`}
          >
            TV Series
          </button>
        </div>
      </div>
      {/* Ancho del contenedor del carrusel y márgenes */}
      <div className="relative max-w-[100%] mx-0 sm:mx-2 md:mx-4">
        {/* Botones de navegación del carrusel - ajustamos padding y tamaños de ícono para pantallas pequeñas */}
        <button
          onClick={() => {
            scrollLeft(trendingCarouselRef);
          }}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-black/50 text-white p-1 sm:p-2 rounded-full hover:bg-black/80 transition-all"
          aria-label="Scroll Left"
        >
          <FontAwesomeIcon
            icon={faChevronLeft}
            size="sm"
            className="sm:text-lg"
          />
        </button>
        <div
          ref={trendingCarouselRef}
          // Ajuste de max-w, overflow, espaciado y padding para responsividad
          className="flex flex-row max-w-[95%] lg:max-w-[90%] mx-auto overflow-x-auto space-x-3 sm:space-x-4 md:space-x-6 px-1 sm:px-2 pt-4 md:pt-6 scrollbar-hide"
        >
          {isLoading && <p className="text-white">Cargando...</p>}
          {error && <p className="text-red-500">{error}</p>}

          {!isLoading &&
            !error &&
            trendingItems.map((items) => (
              <Link
                to={
                  trendingMediaType == "Películas"
                    ? `/movie/${items.id}`
                    : `/tv/${items.id}`
                }
                key={items.id}
              >
                <MovieCard
                  poster_path={items.poster_path}
                  title={"title" in items ? items.title : items.name}
                  release_date={
                    "release_date" in items
                      ? items.release_date
                      : items.first_air_date
                  }
                />
              </Link>
            ))}
        </div>
        <button
          onClick={() => {
            scrollRight(trendingCarouselRef);
          }}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-black/50 text-white p-1 sm:p-2 rounded-full hover:bg-black/80 transition-all"
          aria-label="Scroll Right"
        >
          <FontAwesomeIcon
            icon={faChevronRight}
            size="sm"
            className="sm:text-lg"
          />
        </button>
      </div>
      {/* Fin Carousel de Tendencias */}

      {/* Inicio Carousel de Movie Lists */}
      <div className="font-bold text-xl md:text-2xl text-white flex flex-row max-w-[95%] lg:max-w-[90%] mx-auto pt-8 md:pt-10 text-prueba-funciona">
        Populares
      </div>
      {/* Ancho del contenedor del carrusel y márgenes */}
      <div className="relative max-w-[100%] mx-0 sm:mx-2 md:mx-4">
        {/* Botones de navegación del carrusel - ajustamos padding y tamaños de ícono para pantallas pequeñas */}
        <button
          onClick={() => {
            scrollLeft(movieListsCarouselRef);
          }}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-black/50 text-white p-1 sm:p-2 rounded-full hover:bg-black/80 transition-all"
          aria-label="Scroll Left"
        >
          <FontAwesomeIcon
            icon={faChevronLeft}
            size="sm"
            className="sm:text-lg"
          />
        </button>
        <div
          ref={movieListsCarouselRef}
          // Ajuste de max-w, overflow, espaciado y padding para responsividad
          className="flex flex-row max-w-[95%] lg:max-w-[90%] mx-auto overflow-x-auto space-x-3 sm:space-x-4 md:space-x-6 px-1 sm:px-2 pt-4 md:pt-6 scrollbar-hide"
        >
          {isLoading && <p className="text-white">Cargando...</p>}
          {error && <p className="text-red-500">{error}</p>}

          {!isLoading &&
            !error &&
            movieListsItems.map((items) => (
              <Link to={`/movie/${items.id}`} key={items.id}>
                <MovieCard
                  key={items.id}
                  poster_path={items.poster_path}
                  title={items.original_title}
                  release_date={items.release_date}
                />
              </Link>
            ))}
        </div>
        <button
          onClick={() => {
            scrollRight(movieListsCarouselRef);
          }}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-black/50 text-white p-1 sm:p-2 rounded-full hover:bg-black/80 transition-all"
          aria-label="Scroll Right"
        >
          <FontAwesomeIcon
            icon={faChevronRight}
            size="sm"
            className="sm:text-lg"
          />
        </button>
      </div>
      {/* Fin Carousel de Movie Lists */}
    </div>
  );
}
export default HomePage;
