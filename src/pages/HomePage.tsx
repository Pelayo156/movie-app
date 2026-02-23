import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faFilm,
  faTv,
} from "@fortawesome/free-solid-svg-icons";
import type { TrendingResult } from "../types/trending.types";
import type { MovieListsResult } from "../types/movieLists.types";
import { trendingService } from "../services/trendingService";
import { movieListsService } from "../services/movieListsService";
import MovieCard from "../components/ui/MovieCard";
import MovieCardSkeleton from "../components/ui/MovieCardSkeleton";

const apiImageUrl = import.meta.env.VITE_API_IMAGE_URL;

function HomePage() {
  const [trendingItems, setTrendingItems] = useState<TrendingResult[]>([]);
  const [movieListsItems, setmovieListsItems] = useState<MovieListsResult[]>(
    []
  );
  const [trendingMediaType, setTrendingMediaType] = useState<
    "Películas" | "TV Series"
  >("Películas");

  const trendingCarouselRef = useRef<HTMLDivElement>(null);
  const movieListsCarouselRef = useRef<HTMLDivElement>(null);

  const [isTrendingLoading, setIsTrendingLoading] = useState(true);
  const [isMovieListsLoading, setIsMovieListsLoading] = useState(true);
  const isReady = !isTrendingLoading && !isMovieListsLoading;

  const [error, setError] = useState<String | null>(null);

  const posterMovie = trendingItems.length > 0 ? trendingItems[7] : null;

  const toggleOptions = [
    { value: "Películas", label: "Películas", icon: faFilm },
    { value: "TV Series", label: "TV Series", icon: faTv },
  ];

  useEffect(() => {
    const fetchTrendingItems = async () => {
      setIsTrendingLoading(true);
      setError(null);
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
      } finally {
        setIsTrendingLoading(false);
      }
    };
    fetchTrendingItems();
  }, [trendingMediaType]);

  useEffect(() => {
    const fetchMovieListsItems = async () => {
      setIsMovieListsLoading(true);
      setError(null);
      try {
        const response = await movieListsService.getPopular();
        setmovieListsItems(response.results);
      } catch (err) {
        setError("Error al obtener películas o series populares.");
      } finally {
        setIsMovieListsLoading(false);
      }
    };
    fetchMovieListsItems();
  }, []);

  const scrollLeft = (ref: React.RefObject<HTMLDivElement | null>) => {
    if (ref.current) {
      ref.current.scrollBy({
        left: -ref.current.offsetWidth,
        behavior: "smooth",
      });
    }
  };

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
      {/* Poster Principal */}
      <div
        className="relative w-full h-[50vh] md:h-[75vh] bg-cover bg-top bg-no-repeat"
        style={{
          backgroundImage: `url(${apiImageUrl}/original/${posterMovie?.backdrop_path})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 to-transparent"></div>
        <div className="absolute top-0 left-0 flex h-full w-full items-center z-10">
          <div className="px-5 md:px-10 lg:px-20">
            {posterMovie && (
              <h1 className="text-white text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold drop-shadow-lg">
                {"name" in posterMovie ? posterMovie.name : posterMovie.title}
              </h1>
            )}
            {/* Descripción oculta en móvil para no saturar el poster */}
            <p className="hidden sm:block text-white text-sm sm:text-base md:text-lg text-justify mt-4 md:mt-10 max-w-xl md:max-w-2xl lg:max-w-3xl">
              {posterMovie?.overview}
            </p>
          </div>
        </div>
      </div>

      {/* Encabezado Carousel de Tendencias */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center max-w-[95%] lg:max-w-[90%] mx-auto pt-8 md:pt-10 gap-3 sm:gap-0">
        <span className="font-bold text-xl md:text-2xl text-white">
          Tendencia
        </span>

        {/* Toggle estilo ProfilePage */}
        <div className="flex gap-2 bg-white/5 backdrop-blur-sm p-1 rounded-xl border border-white/10 sm:ml-6">
          {toggleOptions.map((option) => (
            <button
              key={option.value}
              onClick={() =>
                setTrendingMediaType(option.value as "Películas" | "TV Series")
              }
              className={`
                px-4 py-2 rounded-lg flex items-center gap-2
                transition-all duration-300 text-sm font-medium
                ${
                  trendingMediaType === option.value
                    ? "bg-gradient-to-r from-cyan-500/30 to-blue-500/30 text-white shadow-lg"
                    : "text-white/70 hover:text-white hover:bg-white/10"
                }
              `}
            >
              <FontAwesomeIcon icon={option.icon} className="text-xs" />
              <span>{option.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Carousel de Tendencias */}
      <div className="relative max-w-[100%] mx-0 sm:mx-2 md:mx-4">
        <button
          onClick={() => scrollLeft(trendingCarouselRef)}
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
          className="flex flex-row max-w-[95%] lg:max-w-[90%] mx-auto overflow-x-auto space-x-3 sm:space-x-4 md:space-x-6 px-1 sm:px-2 pt-4 md:pt-6 scrollbar-hide"
        >
          {error && <p className="text-red-500">{error}</p>}
          {!isReady
            ? Array.from({ length: 10 }).map((_, i) => (
                <MovieCardSkeleton key={i} />
              ))
            : trendingItems.map((items) => (
                <Link
                  to={
                    trendingMediaType === "Películas"
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
          onClick={() => scrollRight(trendingCarouselRef)}
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

      {/* Encabezado Carousel de Populares */}
      <div className="font-bold text-xl md:text-2xl text-white max-w-[95%] lg:max-w-[90%] mx-auto pt-8 md:pt-10">
        Populares
      </div>

      {/* Carousel de Populares */}
      <div className="relative max-w-[100%] mx-0 sm:mx-2 md:mx-4">
        <button
          onClick={() => scrollLeft(movieListsCarouselRef)}
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
          className="flex flex-row max-w-[95%] lg:max-w-[90%] mx-auto overflow-x-auto space-x-3 sm:space-x-4 md:space-x-6 px-1 sm:px-2 pt-4 md:pt-6 scrollbar-hide"
        >
          {error && <p className="text-red-500">{error}</p>}
          {!isReady
            ? Array.from({ length: 10 }).map((_, i) => (
                <MovieCardSkeleton key={i} />
              ))
            : movieListsItems.map((items) => (
                <Link to={`/movie/${items.id}`} key={items.id}>
                  <MovieCard
                    poster_path={items.poster_path}
                    title={items.original_title}
                    release_date={items.release_date}
                  />
                </Link>
              ))}
        </div>
        <button
          onClick={() => scrollRight(movieListsCarouselRef)}
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
    </div>
  );
}
export default HomePage;
