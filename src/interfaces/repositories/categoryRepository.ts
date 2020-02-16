import { Category } from '@/entities';

export interface CategoryRepository {
  getAll(utcNow: Date): Promise<Category[]>;
}

export const CategoryRepositoryToken = Symbol();
