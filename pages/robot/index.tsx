import { useRef, useState } from 'react';
import { TRobot, TRobotType } from '@src/types/robot';
import { convertRobotState } from '@src/utils/convertRobotState';
import { convertStoreName } from '@src/utils/convertStoreName';
import { TStore } from '@src/types/store';
import homeAPI from '@src/api/home';
import robotAPI from '@src/api/robot';
import DropDown from '@src/components/Common/DropDown';
import Null from '@src/components/Common/Null';
import Spinner from '@src/components/Common/Spinner';
import Title from '@src/components/Common/Title';
import RobotCard from '@src/components/Robot/RobotCard';
import useInfiniteScroll from '@src/hooks/useInfiniteScroll';
import styled from '@emotion/styled';
import { TDropDown } from '@src/types/common';

interface IProps {
  stores: TStore;
  robots: TRobot[];
}

export async function getServerSideProps() {
  const { data: stores } = await homeAPI.getStores();

  const { data: robots } = await robotAPI.getRobots();

  const organizedRobots: TRobot[] = robots.robot.map((robot: TRobot) => ({
    ...robot,
    k_map_name: convertStoreName(robot.k_map_name) || null,
    robot_state: convertRobotState(robot.robot_state) || null,
  }));

  return {
    props: {
      stores,
      robots: organizedRobots,
    },
  };
}

const Robot = ({ robots, stores }: IProps) => {
  const [robotList, setRobotList] = useState<TRobot[]>(robots);

  const [storeName, setStoreName] = useState<string>('전체매장');

  const [robotState, setRobotState] = useState<string>('전체로봇');

  const observerRef = useRef<HTMLDivElement>(null);

  const { data, isLoading } = useInfiniteScroll(robotList, observerRef);

  const copiedRobotList: TRobot[] = [...robots];

  const storeNameList: TDropDown[] = [
    { id: '0', option: '전체매장' },
    ...stores.stores.map(({ map_name, map_id }) => ({
      id: map_id,
      option: map_name,
    })),
  ];

  const createRobotType = (id: string, option: string, color?: string) => {
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

  const storeNameHandler = (storeName: string) => {
    setStoreName(storeName);
  };

  const robotStateHandler = (robotState: string) => {
    setRobotState(robotState);
  };

  const robotListHandler = (robotList: TRobot[]) => {
    setRobotList(robotList);
  };

  const filterByStoreName = (option: string) => {
    storeNameHandler(option);

    robotStateHandler('전체로봇');

    if (option === '전체매장') return robotListHandler(copiedRobotList);

    robotListHandler(copiedRobotList.filter((robot) => robot.k_map_name === option));
  };

  const filterByRobotState = (option: string) => {
    robotStateHandler(option);

    if (storeName === '전체매장' && option === '전체로봇') {
      return robotListHandler(copiedRobotList);
    }

    if (storeName !== '전체매장' && option === '전체로봇')
      return robotListHandler(copiedRobotList.filter((robot) => robot.k_map_name === storeName));

    storeName === '전체매장'
      ? robotListHandler(copiedRobotList.filter((robot) => robot.robot_state === option))
      : robotListHandler(
          copiedRobotList.filter((robot) => robot.k_map_name === storeName && robot.robot_state === option),
        );
  };

  return (
    <StRobot>
      <StHeader>
        <Title title="로봇 현황" />
        <StDropDownBox>
          <DropDown selected={storeName} list={storeNameList} event={filterByStoreName} />
          <DropDown selected={robotState} list={ROBOT_TYPE} event={filterByRobotState} />
        </StDropDownBox>
      </StHeader>
      <StBody>
        {data.length !== 0 ? (
          data.map((cur: TRobot, idx: number) => <RobotCard key={idx} {...cur} ROBOT_TYPE={ROBOT_TYPE} />)
        ) : (
          <Null />
        )}
        {isLoading && (
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
