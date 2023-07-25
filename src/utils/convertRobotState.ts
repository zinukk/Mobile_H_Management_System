import { IRobotStateObj } from '@src/types/common';

export const convertRobotState = (robotState: string) => {
  const robotStateObj: IRobotStateObj = {
    '1': '에러',
    '2': '이동중',
    '3': '대기중',
    '4': '충전중',
    '5': '수리중',
    '6': '정보없음',
  };

  return robotStateObj[robotState];
};
