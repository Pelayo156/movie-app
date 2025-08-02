// Tipos para consulta sobre películas en tendencia (quicktype -> página para sacar tipos de respuestas)
export type APITmdbTrendingMoviesResponse = {
    page:          number;
    results:       Result[];
    total_pages:   number;
    total_results: number;
}

export type Result = {
    adult:             boolean;
    backdrop_path:     string;
    id:                number;
    title:             string;
    original_title:    string;
    overview:          string;
    poster_path:       string;
    media_type:        MediaType;
    original_language: OriginalLanguage;
    genre_ids:         number[];
    popularity:        number;
    release_date:      string;
    video:             boolean;
    vote_average:      number;
    vote_count:        number;
}

export type MediaType = "movie";

export type OriginalLanguage = "en" | "sv" | "zh";