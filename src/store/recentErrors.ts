import { atom } from 'recoil';

export const recentErrorsState = atom<IErrorNotice[]>({
  key: 'recentErrorsState',
  default: [],
});
