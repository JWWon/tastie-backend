export const SituationTypeList = [
  '데이트',
  '소개팅',
  '새로운 맛집 도전',
  '혼자만의 시간',
  '간단하게 먹고 싶은 날',
  '설레는 여행',
  '진지한 자리',
  '해장이 필요한 날',
  '친구들과 신나는 파티',
  '갑자기 배가 고픈 날',
  '차가운게 먹고 싶은 날',
  '달달한게 땡기는 날',
  '기분 전환하고 싶은 날',
  '새로운 만남',
] as const;

export type SituationType = typeof SituationTypeList[number];
export type Situation = {
  readonly name: SituationType;
};
