import { API_URL, API_URL_LOCAL } from '../../constants/api';
import { Expense, ExpenseResponse } from '../../types/expense';
import { preferences } from '../storage/securestorage';

export const expenseService = {
  async get(type: string = 'month'): Promise<ExpenseResponse> {
    const response = await fetch(`${API_URL}/api/v1/expenses/${type}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${await preferences.getValue('token')}`,
        "ngrok-skip-browser-warning": "69420",
      }
    });
    if (!response.ok) {
      const payload = await response.json();
      throw new Error(payload.detail);
    }
    
    try {
      const payload = await response.json();
      return payload as ExpenseResponse;
    } catch (error) {
      console.log(error);
    }
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

