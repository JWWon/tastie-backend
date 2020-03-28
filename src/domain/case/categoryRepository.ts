import { Category } from '@/entities';

export interface CategoryRepository {
  getCategories(): Promise<Category[]>;
}

export const CategoryRepositoryToken = Symbol();
