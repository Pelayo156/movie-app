export interface APITmdbCreateNewTokenResponse {
  success: boolean;
  expires_at: string;
  request_token: string;
}

export interface APITmdbUserResponse {
  id: number;
  username: string;
  name: string;
  avatar?: {
    gravatar?: {
      hash: string;
    };
    tmdb?: {
      avatar_path: string | null;
    };
  };
}

export interface APITmdbSessionResponse {
  success: boolean;
  session_id: string;
}
