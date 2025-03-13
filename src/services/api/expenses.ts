import { Expense } from '../../types/expense';

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

export const expensesService = {
  async getExpenses(): Promise<Expense[]> {
    const { data } = await api.get('/expenses');
    return data || [];
  },

  async createExpense(expense: Omit<Expense, 'id'>): Promise<Expense> {
    const { data } = await api.post('/expenses', expense);
    return data;
  },

  async updateExpense(expense: Expense): Promise<Expense> {
    const { data } = await api.put(`/expenses/${expense.id}`, expense);
    return data;
  },

  async deleteExpense(id: string): Promise<void> {
    await api.delete(`/expenses/${id}`);
  },

  async getExpensesByCategory(categoryId: string): Promise<Expense[]> {
    const { data } = await api.get(`/expenses?categoryId=${categoryId}`);
    return data || [];
  },
};
