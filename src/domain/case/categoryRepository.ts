import { Category } from '@/entities';

export interface CategoryRepository {
  getCategoriesByUTCDate(utcNow: Date): Promise<Category[]>;
}

export const CategoryRepositoryToken = Symbol();
