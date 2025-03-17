import { API_URL, DELETE, GET, POST, PUT } from '../../constants/api';
import { headersWithToken } from './headers';


// Placeholder for your API implementation
export const categoriesService = {
  async get(): Promise<string[]> {
    const response = await fetch(`${API_URL}/api/v1/categories`, {
      method: GET,
      headers: await headersWithToken(),
    });
    const payload = await response.json();
    if (!response.ok) {
      throw new Error(payload.detail);
    }
    return payload.names;
  },
  async post(newCategory: string) {
    const response = await fetch(`${API_URL}/api/v1/categories`, {
      method: POST,
      headers: await headersWithToken(),
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
      method: PUT,
      headers: await headersWithToken(),
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
      method: DELETE,
      headers: await headersWithToken(),
      body: JSON.stringify({ name: category }),
    });
    const payload = await response.json();
    if (!response.ok) {
      throw new Error(payload.detail);
    }
    return true;
  },
};
