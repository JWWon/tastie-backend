export const SituationTypeList = [
  '간단하게 먹고 싶은 날',
  '그룹 모임',
  '기분 전환하고 싶은 시간',
  '다이어트중',
  '데이트',
  '밤샘 공부',
  '새로운 만남',
  '새로운 맛집 도전',
  '설레는 여행',
  '소개받는 자리',
  '소개팅',
  '아무거나',
  '자연스러운 만남을 하고픈 날',
  '조금 어려운 자리',
  '진지한 자리',
  '친구들과 분위기있게 보내는 시간',
  '친구들과 신나는 파티',
  '테이크아웃',
  '해장이 필요한 날',
  '혼자 조용히 공부하는 시간',
  '혼자만의 시간',
] as const;

export type SituationType = typeof SituationTypeList[number];
export type Situation = {
  readonly name: SituationType;
};
