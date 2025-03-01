import { supabase } from '../supabase';
import { Budget } from '../../types/database';

export const budgetService = {
  async getAll(): Promise<Budget[]> {
    const { data, error } = await supabase
      .from('budgets')
      .select('*, categories(*)')
      .order('start_date', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  async create(budget: Partial<Budget>): Promise<Budget> {
    const { data, error } = await supabase
      .from('budgets')
      .insert(budget)
      .select('*, categories(*)')
      .single();
    
    if (error) throw error;
    return data;
  },

  async update(id: string, budget: Partial<Budget>): Promise<Budget> {
    const { data, error } = await supabase
      .from('budgets')
      .update(budget)
      .eq('id', id)
      .select('*, categories(*)')
      .single();
    
    if (error) throw error;
    return data;
  },

  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('budgets')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  },

  async getCurrentBudgets(): Promise<Budget[]> {
    const today = new Date().toISOString().split('T')[0];
    const { data, error } = await supabase
      .from('budgets')
      .select('*, categories(*)')
      .lte('start_date', today)
      .or(`end_date.is.null,end_date.gte.${today}`);
    
    if (error) throw error;
    return data;
  }
}; 