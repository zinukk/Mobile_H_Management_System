import { TErrorNotice } from '@src/types/robotError';
import { atom } from 'recoil';

export const recentErrorsState = atom<TErrorNotice[]>({
  key: 'recentErrorsState',
  default: [],
});
