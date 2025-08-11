// Tipos para consulta sobre películas en tendencia (quicktype -> página para sacar tipos de respuestas)
export type TrendingMediaType = "movie" | "tv";

export interface BaseTrendingResult {
    adult:             boolean;
    backdrop_path:     string;
    id:                number;
    overview:          string;
    poster_path:       string;
    genre_ids:         number[];
    popularity:        number;
    vote_average:      number;
    vote_count:        number;
    original_language: string;
    media_type:        TrendingMediaType;
}

export interface ResultMovies extends BaseTrendingResult {
    media_type:        "movie";
    title:             string;
    original_title:    string;
    release_date:      string;
    video:             boolean;
}

export interface ResultTVSeries extends BaseTrendingResult {
    media_type:        "tv";
    name:              string;
    original_name:     string;
    first_air_date:    string;
    origin_country:    string[];
}

export interface APITmdbTrendingMoviesResponse {
    page:          number;
    results:       ResultMovies[];
    total_pages:   number;
    total_results: number;
}

export interface APITmdbTrendingTVSeriesResponse {
    page:          number;
    results:       ResultTVSeries[];
    total_pages:   number;
    total_results: number;
}

export type TrendingResult = ResultMovies | ResultTVSeries;