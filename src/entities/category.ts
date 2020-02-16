export enum CategoryType {
  '아침' = '아침',
  '브런치' = '브런치',
  '점심' = '점심',
  '디저트' = '디저트',
  '저녁' = '저녁',
  '술자리' = '술자리',
  '야식' = '야식',
}

export type Category = {
  readonly name: CategoryType;
};
