import { atom } from 'recoil';

export const navState = atom<string>({
  key: 'navState',
  default: '',
});
