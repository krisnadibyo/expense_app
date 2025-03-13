import { API_URL } from "../../constants/api";
import { LoginRequest, LoginResponse, RegisterRequest } from "../../types/auth";



export const authService = {
  async signIn(credentials: LoginRequest): Promise<LoginResponse> {
    const response = await fetch(`${API_URL}/api/v1/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });
    const payload = await response.json();
    if (!response.ok) {
      throw new Error(payload.detail);
    }
    return payload as LoginResponse;
  },
  async signUp(request: RegisterRequest) {
    const response = await fetch(`${API_URL}/api/v1/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: request.email,
        password: request.password,
        username: request.username,
        wa_number: request.phone,
      }),
    });
    if (!response.ok) {
      const payload = await response.json();
      throw new Error(payload.detail);
    }
  }
}