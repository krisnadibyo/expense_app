import { API_URL } from "../../constants/api";
import { RegisterCredentials, RegisterResponse } from "../../types/auth";



export const authService = {
  async signUp(credentials: RegisterCredentials) {
    console.log(credentials);
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
      throw new Error('Failed to sign up');
    }
    const data: RegisterResponse = await response.json();
    return data;
  }
}