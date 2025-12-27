export interface User {
  idUser: number;
  id_role: string;
  name: string;
  email: string;
  username?: string;
}

export interface LoginResponse {
  api_status: number;
  api_message: string[];
  data: {
    token?: string;
    session_id?: string;
    id_role: string;
    name: string;
    email: string;
    idUser: number;
  };
}

export interface OAuthTokenResponse {
  api_status: number;
  api_message: string[];
  data: {
    token: string;
  };
}
