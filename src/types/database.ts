export interface Category {
  id: string;
  user_id: string;
  name: string;
  color: string;
  icon?: string;
  is_default: boolean;
  created_at: string;
  updated_at: string;
}

export interface Expense {
  id: string;
  user_id: string;
  category_id: string;
  amount: number;
  description?: string;
  date: string;
  created_at: string;
  updated_at: string;
  receipt_url?: string;
  is_recurring: boolean;
  recurring_metadata?: {
    frequency: 'daily' | 'weekly' | 'monthly' | 'yearly';
    end_date?: string;
  };
}

export interface Budget {
  id: string;
  user_id: string;
  category_id: string;
  amount: number;
  period: 'monthly' | 'weekly' | 'yearly';
  start_date: string;
  end_date?: string;
  created_at: string;
  updated_at: string;
}

export interface AIChatHistory {
  id: string;
  user_id: string;
  message: string;
  response: string;
  created_at: string;
} 