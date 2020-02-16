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

const situationFoodKeywords = new Map<SituationType, FoodKeywordType[]>([
  ['데이트', ['고급진', '파스타', '스테이크', '스시', '와인']],
  ['소개팅', ['고급진', '파스타', '스테이크', '와인']],
  ['새로운 맛집 도전', ['인도', '멕시코', '외국']],
  ['혼자만의 시간', ['혼밥', '스시', '분식', '햄버거']],
  ['간단하게 먹고 싶은 날', ['빵', '분식', '햄버거']],
  ['설레는 여행', ['고기', '회', '양식', '치킨']],
  ['진지한 자리', ['스시', '중국집', '한식', '소고기']],
  ['해장이 필요한 날', ['국물', '국밥', '얼큰한']],
  ['친구들과 신나는 파티', ['고기', '치킨', '이자카야']],
  ['갑자기 배가 고픈 날', ['24시간', '맥도날드', '롯데리아']],
  ['차가운게 먹고 싶은 날', ['빙수', '아이스크림']],
  ['달달한게 땡기는 날', ['마카롱', '아이스크림', '빵']],
  ['기분 전환하고 싶은 날', ['양주', '맥주', '포차']],
  ['새로운 만남', ['양주', '와인', '포차']],
]);

export class MemorySituationRepository implements SituationRepository {
  getSituationsByCategory(category: CategoryType): SituationType[] {
    const situations = categorySituations.get(category);
    return situations;
  }

  getFoodKeywordsBySituation(situation: SituationType): FoodKeywordType[] {
    const keywords = situationFoodKeywords.get(situation);
    return keywords;
  }
}
