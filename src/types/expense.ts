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

export interface ExpenseResponse {
  start_date: string;
  end_date: string;
  expenses: Expense[];
  expenses_per_category: ExpensePerCategory[];
  expenses_per_day: ExpensePerDay[];
  total_amount: number;
}


