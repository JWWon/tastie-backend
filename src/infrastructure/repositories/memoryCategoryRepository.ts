import { CategoryRepository } from '@/interfaces/repositories';
import { Category } from '@/entities';

export class MemoryCategoryRepository implements CategoryRepository {
  async getAll(): Promise<Category[]> {
    return [{ name: '아침' }, { name: '브런치' }];
  }
}
