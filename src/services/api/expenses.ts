import { supabase } from '../supabase';
import { Expense } from '../../types/database';
import { isConnected, handleNetworkError } from '../../utils/networkUtils';

export const expenseService = {
  async getAll(): Promise<Expense[]> {
    try {
      // Check for internet connection first
      const connected = await isConnected();
      if (!connected) {
        throw new Error('No internet connection. Please check your network settings.');
      }

      const { data, error } = await supabase
        .from('expenses')
        .select(
          `
          *,
          category:categories(*)
        `
        )
        .order('date', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching expenses:', error);
      throw new Error(handleNetworkError(error));
    }
  },

  async create(expense: Partial<Expense>): Promise<Expense> {
    try {
      // Check for internet connection first
      const connected = await isConnected();
      if (!connected) {
        throw new Error('No internet connection. Please check your network settings.');
      }

      // Make sure user_id is set from the current session
      const {
        data: { session },
      } = await supabase.auth.getSession();
      const expenseWithUserId = {
        ...expense,
        user_id: session?.user?.id,
      };

      const { data, error } = await supabase
        .from('expenses')
        .insert(expenseWithUserId)
        .select(
          `
          *,
          category:categories(*)
        `
        )
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error creating expense:', error);
      throw new Error(handleNetworkError(error));
    }
  },

  async update(id: string, expense: Partial<Expense>): Promise<Expense> {
    try {
      // Check for internet connection first
      const connected = await isConnected();
      if (!connected) {
        throw new Error('No internet connection. Please check your network settings.');
      }

      const { data, error } = await supabase
        .from('expenses')
        .update(expense)
        .eq('id', id)
        .select(
          `
          *,
          category:categories(*)
        `
        )
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error updating expense:', error);
      throw new Error(handleNetworkError(error));
    }
  },

  async delete(id: string): Promise<void> {
    try {
      // Check for internet connection first
      const connected = await isConnected();
      if (!connected) {
        throw new Error('No internet connection. Please check your network settings.');
      }

      const { error } = await supabase.from('expenses').delete().eq('id', id);

      if (error) throw error;
    } catch (error) {
      console.error('Error deleting expense:', error);
      throw new Error(handleNetworkError(error));
    }
  },

  async getByDateRange(startDate: string, endDate: string): Promise<Expense[]> {
    try {
      // Check for internet connection first
      const connected = await isConnected();
      if (!connected) {
        throw new Error('No internet connection. Please check your network settings.');
      }

      const { data, error } = await supabase
        .from('expenses')
        .select(
          `
          *,
          category:categories(*)
        `
        )
        .gte('date', startDate)
        .lte('date', endDate)
        .order('date', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching expenses by date range:', error);
      throw new Error(handleNetworkError(error));
    }
  },
};
