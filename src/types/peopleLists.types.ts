export interface APITmdbPeopleListsResponse {
  page: number;
  results: ResultPeople[];
  total_pages: number;
  total_results: number;
}

export interface ResultPeople {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  known_for: KnownFor[];
}

export interface KnownFor {
  adult: boolean;
  backdrop_path: string;
  id: number;
  name?: string;
  original_name?: string;
  overview: string;
  poster_path: string;
  media_type: MediaType;
  original_language: string;
  genre_ids: number[];
  popularity: number;
  first_air_date?: String;
  vote_average: number;
  vote_count: number;
  origin_country?: string[];
  title?: string;
  original_title?: string;
  release_date?: String;
  video?: boolean;
}

export type MediaType = "tv" | "movie";
