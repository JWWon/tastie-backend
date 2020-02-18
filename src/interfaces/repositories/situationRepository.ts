import {
  SituationType,
  CategoryType,
  FoodKeywordType,
  Situation,
} from '@/entities';

export interface SituationRepository {
  getSituationsByCategory(category: CategoryType): Situation[];
  getFoodKeywordsBySituation(situation: SituationType): FoodKeywordType[];
}

export const SituationRepositoryToken = Symbol();
