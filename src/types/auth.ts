export interface LoginRequest {
  email?: string | null;
  wa_number?: string | null;
  username?: string | null;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  token_type: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  confirmPassword: string;
  username: string;
  phone: string;
} 

export interface RegisterResponse {
  username: string;
  email: string;
  wa_number: string;
}