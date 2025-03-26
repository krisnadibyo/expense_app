import { API_URL, DELETE, GET, POST, PUT } from '../../constants/api';
import { Expense, ExpenseCreate, ExpensesResponse, ExpenseUpdate } from '../../types/expense';
import { headersWithToken } from './headers';

export const expenseService = {
  async get(startDate: string = '', endDate: string = ''): Promise<ExpensesResponse> {
    if (startDate && endDate) {
      const queryParams = new URLSearchParams({
        start_date: startDate,
        end_date: endDate,
      }).toString();
      const response = await fetch(`${API_URL}/api/v1/expenses?${queryParams}`, {
        method: GET,
        headers: await headersWithToken(),
      });
      if (!response.ok) {
        const payload = await response.json();
        throw new Error(payload.detail);
      }
      const payload = await response.json();
      return payload as ExpensesResponse;
    }
    
    const response = await fetch(`${API_URL}/api/v1/expenses/month`, {
      method: GET,
      headers: await headersWithToken(),
    });
    if (!response.ok) {
      const payload = await response.json();
      throw new Error(payload.detail);
    }

    try {
      const payload = await response.json();
      return payload as ExpensesResponse;
    } catch (error) {
      console.log(error);
    }
  },
  async post(expense: ExpenseCreate): Promise<Expense> {
    const response = await fetch(`${API_URL}/api/v1/expenses`, {
      method: POST,
      headers: await headersWithToken(),
      body: JSON.stringify(expense),
    });
    const payload = await response.json();
    if (!response.ok) {
      throw new Error(payload.detail);
    }
    return payload as Expense;
  },
  async put(expense: ExpenseUpdate): Promise<Expense> {
    const response = await fetch(`${API_URL}/api/v1/expenses`, {
      method: PUT,
      headers: await headersWithToken(),
      body: JSON.stringify(expense),
    });
    const payload = await response.json();
    if (!response.ok) {
      throw new Error(payload.detail);
    }
    return payload as Expense;
  },
  async delete(expenseId: number): Promise<boolean> {
    const response = await fetch(`${API_URL}/api/v1/expenses/${expenseId}`, {
      method: DELETE,
      headers: await headersWithToken(),
    });
    if (!response.ok) {
      const payload = await response.json();
      throw new Error(payload.detail);
    }
    return true;
  },
};
