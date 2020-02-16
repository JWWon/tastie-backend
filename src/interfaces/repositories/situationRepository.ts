import { SituationType, CategoryType, FoodKeywordType } from '@/entities';

export interface SituationRepository {
  getSituationsByCategory(category: CategoryType): SituationType[];
  getFoodKeywordsBySituation(situation: SituationType): FoodKeywordType[];
}

export const SituationRepositoryToken = Symbol();
