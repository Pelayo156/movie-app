import type { Result } from "./movieLists.types";

export interface APITmdbFavoriteResponse {
  success: boolean;
  status_code: number;
  status_message: string;
}

export interface APITmdbFavoriteMoviesResponse {
  page: number;
  results: Result[];
  total_pages: number;
  total_results: number;
}
