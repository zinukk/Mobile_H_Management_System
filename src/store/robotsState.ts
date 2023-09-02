import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';
import { IRobotState } from '@src/types/robot';

//2. sessionStorage에 저장하고 싶은 경우
//Next.js를 쓴다면 sessionStorage는 아래와 같이 따로 설정 필요
const localStorage = typeof window !== 'undefined' ? window.localStorage : undefined;

const { persistAtom } = recoilPersist({
  key: 'robotsState',
  storage: localStorage,
});

//Recoil-persist를 적용시키려면 아래의 effects_UNSTABLE을 적어주어야 한다.
export const robotsState = atom<IRobotState[]>({
  key: 'robotsState',
  default: [],
  effects_UNSTABLE: [persistAtom],
});
