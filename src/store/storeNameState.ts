import { atom } from 'recoil';

export const storeNameState = atom<string>({
  key: 'storeNameState',
  default: '전체매장',
});
