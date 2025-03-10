import { supabase } from '../supabase';
import { Category } from '../../types/database';
import { isConnected, handleNetworkError } from '../../utils/networkUtils';

export const categoryService = {
  async getAll(): Promise<Category[]> {
    try {
      // Check for internet connection first
      const connected = await isConnected();
      if (!connected) {
        throw new Error('No internet connection. Please check your network settings.');
      }

      const { data, error } = await supabase.from('categories').select('*').order('name');

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw new Error(handleNetworkError(error));
    }
  },

  async create(category: Partial<Category>): Promise<Category> {
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
      const categoryWithUserId = {
        ...category,
        user_id: session?.user?.id,
      };

      const { data, error } = await supabase
        .from('categories')
        .insert(categoryWithUserId)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error creating category:', error);
      throw new Error(handleNetworkError(error));
    }
  },

  async update(id: string, category: Partial<Category>): Promise<Category> {
    try {
      // Check for internet connection first
      const connected = await isConnected();
      if (!connected) {
        throw new Error('No internet connection. Please check your network settings.');
      }

      const { data, error } = await supabase
        .from('categories')
        .update(category)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error updating category:', error);
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

      const { error } = await supabase.from('categories').delete().eq('id', id);

      if (error) throw error;
    } catch (error) {
      console.error('Error deleting category:', error);
      throw new Error(handleNetworkError(error));
    }
  },
};
