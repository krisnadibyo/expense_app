export interface Expense {
  id: number;
  amount: number;
  description: string;
  date: string;
  category_name: string;
}

export interface ExpensePerCategory {
  category_name: string;
  amount: number;
}

export interface ExpensePerDay {
  date: string;
  amount: number;
}

export interface ExpenseCreate {
  amount: number;
  description: string;
  date: string;
  category_name: string;
}

export interface ExpenseUpdate {
  id: number;
  amount: number | null;
  description: string | null;
  date: string | null;
  category_name: string | null;
}

export interface ExpensesResponse {
  start_date: string;
  end_date: string;
  expenses: Expense[];
  expenses_per_category: ExpensePerCategory[];
  expenses_per_day: ExpensePerDay[];
  total_amount: number;
}


