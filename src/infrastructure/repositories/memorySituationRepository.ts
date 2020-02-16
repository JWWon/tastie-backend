import { SituationRepository } from '@/interfaces/repositories';
import { CategoryType, SituationType, FoodKeywordType } from '@/entities';

const categorySituations = new Map<CategoryType, SituationType[]>([
  ['아침', ['간단하게 먹고 싶은 날', '설레는 여행', '해장이 필요한 날']],
  ['브런치', ['간단하게 먹고 싶은 날', '설레는 여행', '해장이 필요한 날']],
  [
    '점심',
    [
      '데이트',
      '새로운 맛집 도전',
      '혼자만의 시간',
      '간단하게 먹고 싶은 날',
      '설레는 여행',
      '해장이 필요한 날',
    ],
  ],
  ['디저트', ['차가운게 먹고 싶은 날', '달달한게 땡기는 날']],
  [
    '저녁',
    [
      '데이트',
      '소개팅',
      '새로운 맛집 도전',
      '혼자만의 시간',
      '간단하게 먹고 싶은 날',
      '설레는 여행',
      '진지한 자리',
      '친구들과 신나는 파티',
    ],
  ],
  ['술자리', ['친구들과 신나는 파티', '기분 전환하고 싶은 날', '새로운 만남']],
  ['야식', ['갑자기 배가 고픈 날']],
]);

export class MemorySituationRepository implements SituationRepository {
  getSituationsByCategory(category: CategoryType): SituationType[] {
    const situations = categorySituations.get(category);
    return situations;
  }

  getFoodKeywordsBySituation(situation: SituationType): FoodKeywordType[] {
    return [];
  }
}
