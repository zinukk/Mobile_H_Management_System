import { IErrorStatus } from '@src/types/home';

export const ERROR_STATUS: IErrorStatus[] = [
  { id: 0, status: '에러', color: 'main' },
  { id: 1, status: '서빙', color: 'sub' },
  { id: 2, status: '대기', color: 'stroke' },
  { id: 3, status: '수리', color: 'light' },
];
