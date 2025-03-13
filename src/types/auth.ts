export interface AuthUser {
  id: string;
  email: string;
  created_at: string;
}

export interface AuthError {
  message: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials extends LoginCredentials {
  confirmPassword: string;
  username: string;
  phone: string;
} 

export interface RegisterResponse {
  username: string;
  email: string;
  wa_number: string;
}