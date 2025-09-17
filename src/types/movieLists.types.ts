// Resultado genérico
export interface Result {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

// Tipos para Películas "Popular"
export interface APITmdbMovieListsPopularResponse {
  page: number;
  results: Result[];
  total_pages: number;
  total_results: number;
}

// Tipos para películas "Now Plaiying"
export interface APITmdbMovieListsNowPlayingResponse {
  dates: Dates;
  page: number;
  results: Result[];
  total_pages: number;
  total_results: number;
}

export interface Dates {
  maximum: Date;
  minimum: Date;
}

export type MovieListsResult = Result;
