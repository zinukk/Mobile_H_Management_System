import { IStoreNameObj } from '@src/types/common';

export const convertStoreName = (storeName: string) => {
  if (storeName === null) return '정보없음';

  const storeNameObj: IStoreNameObj = {
    '노리배달쿡 항동점': '항동 노리 배달쿡',
    '더피플버거 연신내점': '연신내 더피플버거',
    '배달쿡공유주방 오산점': '오산 공유주방',
    차세대융합인증원: '차세대 융합 기술 연구원',
    신도림: '더티프라이',
    노원_발란: '노원 발란',
  };

  return storeNameObj[storeName];
};
