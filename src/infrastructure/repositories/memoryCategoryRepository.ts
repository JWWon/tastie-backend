import { CategoryRepository } from '@/interfaces/repositories';
import { Category } from '@/entities';

export class MemoryCategoryRepository implements CategoryRepository {
  async getAll(): Promise<Category[]> {
    return [];
  }
}
