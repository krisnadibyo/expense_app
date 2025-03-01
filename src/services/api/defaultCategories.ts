import { categoryService } from './categories';
import { Category } from '../../types/database';

const DEFAULT_CATEGORIES: Partial<Category>[] = [
  {
    name: 'Food & Dining',
    color: '#FF5722',
    icon: 'food',
    is_default: true,
  },
  {
    name: 'Entertainment',
    color: '#9C27B0',
    icon: 'movie',
    is_default: true,
  },
  {
    name: 'Transportation',
    color: '#2196F3',
    icon: 'car',
    is_default: true,
  },
  {
    name: 'Shopping',
    color: '#4CAF50',
    icon: 'cart',
    is_default: true,
  },
  {
    name: 'Bills & Utilities',
    color: '#FFC107',
    icon: 'home',
    is_default: true,
  },
  {
    name: 'Healthcare',
    color: '#F44336',
    icon: 'medical-bag',
    is_default: true,
  },
  {
    name: 'Travel',
    color: '#03A9F4',
    icon: 'airplane',
    is_default: true,
  },
  {
    name: 'Education',
    color: '#3F51B5',
    icon: 'school',
    is_default: true,
  },
];

export const defaultCategoriesService = {
  async createDefaultCategories(): Promise<void> {
    try {
      const existingCategories = await categoryService.getAll();
      
      // Only create defaults if user has no categories
      if (existingCategories.length === 0) {
        await Promise.all(
          DEFAULT_CATEGORIES.map(category => categoryService.create(category))
        );
      }
    } catch (error) {
      console.error('Error creating default categories:', error);
      throw error;
    }
  }
}; 