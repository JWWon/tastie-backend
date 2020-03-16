import { Category } from '@/entities';

export interface CategoryRepository {
  getCategories(): Promise<Category[]>;
  getCategoriesByUTCDate(utcNow: Date): Promise<Category[]>;
}

export const CategoryRepositoryToken = Symbol();
