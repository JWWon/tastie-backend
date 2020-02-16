export const convertKoreanDateFromUTC = (utcDate: Date): Date => {
  return new Date(
    utcDate.toLocaleString('ko-kr', {
      timeZone: 'Asia/Seoul',
    }),
  );
};
