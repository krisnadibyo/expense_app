import { API_URL } from "../../constants/api";
import { RegisterCredentials, RegisterResponse } from "../../types/auth";



export const authService = {
  async signUp(credentials: RegisterCredentials) {
    const response = await fetch(`${API_URL}/api/v1/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
        username: credentials.username,
        wa_number: credentials.phone,
      }),
    });
    if (!response.ok) {
      const payload = await response.json();
      throw new Error(payload.detail);
    }
  }
}