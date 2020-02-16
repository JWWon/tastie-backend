import { Category } from '@/entities';

export interface CategoryRepository {
  getAll(): Promise<Category[]>;
}

export const CategoryRepositoryToken = Symbol();
