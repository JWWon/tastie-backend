export const CategoryTypeList = [
  '아침',
  '브런치',
  '점심',
  '디저트',
  '저녁',
  '술자리',
  '야식',
] as const;

export type CategoryType = typeof CategoryTypeList[number];
export type Category = {
  readonly name: CategoryType;
};

export const validCategoryType = (category: string): boolean => {
  const c: any = category;
  return CategoryTypeList.indexOf(c) >= 0;
};
