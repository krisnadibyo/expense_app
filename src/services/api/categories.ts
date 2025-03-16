import { API_URL, API_URL_LOCAL } from "../../constants/api";
import { preferences } from "../storage/securestorage";

// Placeholder for your API implementation
export const categoriesService = {
  async get(): Promise<string[]> {
    const response = await fetch(`${API_URL}/api/v1/categories`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${await preferences.getValue('token')}`,
        "ngrok-skip-browser-warning": "69420",
      },
    });
    const payload = await response.json();
    if (!response.ok) {
      throw new Error(payload.detail);
    }
    return payload.names;
  },
  async post(endpoint: string, data: any) {
    // TODO: Implement your API POST logic
    return { data };
  },
  async put(endpoint: string, data: any) {
    // TODO: Implement your API PUT logic
    return { data };
  },
  async delete(endpoint: string) {
    // TODO: Implement your API DELETE logic
    return { success: true };
  },
};
