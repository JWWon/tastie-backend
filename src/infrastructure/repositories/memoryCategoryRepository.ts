import { CategoryRepository } from '@/domain/case/categoryRepository';
import { Category, CategoryTypeList } from '@/entities';

const allCategories = CategoryTypeList.map(type => ({
  name: type,
}));

export class MemoryCategoryRepository implements CategoryRepository {
  async getCategories(): Promise<Category[]> {
    return allCategories;
  }
}
