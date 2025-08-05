// Tipos para consulta sobre películas en tendencia (quicktype -> página para sacar tipos de respuestas)
export type APITmdbTrendingMoviesResponse = {
    page:          number;
    results:       ResultMovies[];
    total_pages:   number;
    total_results: number;
}

export type ResultMovies = {
    adult:             boolean;
    backdrop_path:     string;
    id:                number;
    title:             string;
    original_title:    string;
    overview:          string;
    poster_path:       string;
    media_type:        MediaTypeMovies;
    original_language: OriginalLanguageMovies;
    genre_ids:         number[];
    popularity:        number;
    release_date:      string;
    video:             boolean;
    vote_average:      number;
    vote_count:        number;
}

export type MediaTypeMovies = "movie";

export type OriginalLanguageMovies = "en" | "sv" | "zh";

// Tipos para consulta sobre TV Series en tendencia
export type APITmdbTrendingTVSeriesResponse = {
    page:          number;
    results:       ResultTVSeries[];
    total_pages:   number;
    total_results: number;
}

export type ResultTVSeries = {
    adult:             boolean;
    backdrop_path:     string;
    id:                number;
    name:              string;
    original_name:     string;
    overview:          string;
    poster_path:       string;
    media_type:        MediaTypeTVSeries;
    original_language: OriginalLanguageTVSeries;
    genre_ids:         number[];
    popularity:        number;
    first_air_date:    string;
    vote_average:      number;
    vote_count:        number;
    origin_country:    OriginCountryTVSeries[];
}

export type MediaTypeTVSeries = "tv";

export type OriginCountryTVSeries = "US" | "JP" | "KR" | "CN";

export type OriginalLanguageTVSeries = "en" | "ja" | "ko" | "zh";