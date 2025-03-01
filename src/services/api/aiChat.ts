import { supabase } from '../supabase';
import { AIChatHistory } from '../../types/database';

export const aiChatService = {
  async getHistory(limit = 50): Promise<AIChatHistory[]> {
    const { data, error } = await supabase
      .from('ai_chat_history')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit);
    
    if (error) throw error;
    return data;
  },

  async saveInteraction(message: string, response: string): Promise<AIChatHistory> {
    const { data, error } = await supabase
      .from('ai_chat_history')
      .insert({ message, response })
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }
}; 