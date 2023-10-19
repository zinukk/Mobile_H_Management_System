import { GetServerSideProps } from 'next';
import { useRef, useState } from 'react';
import { TRobot, TRobotType } from '@src/types/robot';
import { convertRobotState } from '@src/utils/convertRobotState';
import { convertStoreName } from '@src/utils/convertStoreName';
import { TStoreName } from '@src/types/common';
import robotAPI from '@src/api/robot';
import DropDown from '@src/components/Common/DropDown';
import Null from '@src/components/Common/Null';
import Spinner from '@src/components/Common/Spinner';
import Title from '@src/components/Common/Title';
import RobotCard from '@src/components/Robot/RobotCard';
import useInfiniteScroll from '@src/hooks/useInfiniteScroll';
import styled from '@emotion/styled';

interface IProps {
  robots: TRobot[];
}

export const getServerSideProps: GetServerSideProps<IProps> = async () => {
  const { data: robots } = await robotAPI.getRobots();

  const organizedRobots: TRobot[] = robots.robot.map((robot: TRobot) => ({
    ...robot,
    k_map_name: convertStoreName(robot.k_map_name) || null,
    robot_state: convertRobotState(robot.robot_state) || null,
  }));

  return {
    props: {
      robots: organizedRobots,
    },
  };
};

const Robot = ({ robots }: IProps) => {
  const [robotList, setRobotList] = useState<TRobot[]>(robots);

  const [storeName, setStoreName] = useState<string>('전체매장');

  const [robotState, setRobotState] = useState<string>('전체로봇');

  const observerRef = useRef<HTMLDivElement>(null);

  const { data: filteredRobotList, isLoading: scrollLoading } = useInfiniteScroll(robotList, observerRef);

  const isValid: boolean = filteredRobotList.length !== 0;

  const storeNameHandler = (storeName: string) => {
    setStoreName(storeName);
  };

  const robotStateHandler = (robotState: string) => {
    setRobotState(robotState);
  };

  const robotListHandler = (robotList: TRobot[]) => {
    setRobotList(robotList);
  };

  const filterByStoreName = (storeName: string) => {
    storeNameHandler(storeName);

    robotStateHandler('전체로봇');

    const filteredByStoreName: TRobot[] =
      storeName === '전체매장'
        ? robots
        : robots.filter(({ k_map_name }: Pick<TRobot, 'k_map_name'>) => k_map_name === storeName);

    robotListHandler(filteredByStoreName);
  };

  const filterByRobotState = (robotState: string) => {
    robotStateHandler(robotState);

    const filteredByStoreName: TRobot[] = robots.filter(
      ({ k_map_name: store_name }: Pick<TRobot, 'k_map_name'>) => storeName === '전체매장' || store_name === storeName,
    );

    const filteredByRobotState: TRobot[] =
      robotState === '전체로봇'
        ? robots
        : filteredByStoreName.filter(({ robot_state }: Pick<TRobot, 'robot_state'>) => robot_state === robotState);

    robotListHandler(filteredByRobotState);
  };

  const createStoreName = (id: string, option: string): TStoreName => {
    return { id, option };
  };

  const STORE_NAME: TStoreName[] = [
    createStoreName('0', '전체매장'),
    createStoreName('1', '향동 노리 배달쿡'),
    createStoreName('2', '연신내 더피플버거'),
    createStoreName('3', '오산 공유주방'),
    createStoreName('4', '차세대 융합 기술 연구원'),
    createStoreName('5', '더티프라이'),
    createStoreName('6', '노원 발란'),
  ];

  const createRobotType = (id: string, option: string, color?: string): TRobotType => {
    return {
      id,
      option,
      color,
    };
  };

  const ROBOT_TYPE: TRobotType[] = [
    createRobotType('0', '전체로봇'),
    createRobotType('1', '에러', '#c82d34'),
    createRobotType('2', '이동중', '#6ed449'),
    createRobotType('3', '대기중', '#3c3473'),
    createRobotType('4', '충전중', '#ef742b'),
    createRobotType('5', '수리중', '#3f5af5'),
    createRobotType('6', '정보없음', '#000'),
  ];

  return (
    <StRobot>
      <StHeader>
        <Title title="로봇 현황" />
        <StDropDownBox>
          <DropDown selected={storeName} list={STORE_NAME} event={filterByStoreName} />
          <DropDown selected={robotState} list={ROBOT_TYPE} event={filterByRobotState} />
        </StDropDownBox>
      </StHeader>
      <StBody>
        {isValid ? (
          filteredRobotList.map((robotInfo: TRobot, idx: number) => (
            <RobotCard key={idx} robotInfo={robotInfo} ROBOT_TYPE={ROBOT_TYPE} />
          ))
        ) : (
          <Null />
        )}
        {scrollLoading && (
          <StSpinnerBox>
            <Spinner />
          </StSpinnerBox>
        )}
        <div ref={observerRef} />
      </StBody>
    </StRobot>
  );
};

const StRobot = styled.div`
  padding: 10vh 20px;
  width: 100%;
  background: ${({ theme }) => theme.color.background};
`;

const StHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  width: 100%;
`;

const StDropDownBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
`;

const StBody = styled.main`
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  gap: 10px;
`;

const StSpinnerBox = styled.div`
  position: relative;
  width: 100%;
`;

export default Robot;
