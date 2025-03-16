import { API_URL } from "../../constants/api";
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
    return payload.names
  },
  async post(newCategory: string) {
    const response = await fetch(`${API_URL}/api/v1/categories`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${await preferences.getValue('token')}`,
        "ngrok-skip-browser-warning": "69420",
      },
      body: JSON.stringify({ name: newCategory }),
    });
    const payload = await response.json();
    if (!response.ok) {
      throw new Error(payload.detail);
    }
    return true;
  },
  async put(oldCategory: string, newCategory: string) {
    const response = await fetch(`${API_URL}/api/v1/categories`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${await preferences.getValue('token')}`,
        "ngrok-skip-browser-warning": "69420",
      },
      body: JSON.stringify({ name: oldCategory, new_name: newCategory }),
    });
    const payload = await response.json();
    if (!response.ok) {
      throw new Error(payload.detail);
    }
    return true;
  },
  async delete(category: string) {
    const response = await fetch(`${API_URL}/api/v1/categories`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${await preferences.getValue('token')}`,
        "ngrok-skip-browser-warning": "69420",
      },  
      body: JSON.stringify({ name: category }),
    });
    const payload = await response.json();
    if (!response.ok) {
      throw new Error(payload.detail);
    }
    return true;
  },
};
