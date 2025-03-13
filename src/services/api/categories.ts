import { Category } from '../../types/category';

// Placeholder for your API implementation
const api = {
  async get(endpoint: string) {
    // TODO: Implement your API GET logic
    return { data: [] };
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

export const categoriesService = {
  async getCategories(): Promise<Category[]> {
    const { data } = await api.get('/categories');
    return data || [];
  },

  async createCategory(category: Omit<Category, 'id'>): Promise<Category> {
    const { data } = await api.post('/categories', category);
    return data;
  },

  async updateCategory(category: Category): Promise<Category> {
    const { data } = await api.put(`/categories/${category.id}`, category);
    return data;
  },

  async deleteCategory(id: string): Promise<void> {
    await api.delete(`/categories/${id}`);
  },
};
