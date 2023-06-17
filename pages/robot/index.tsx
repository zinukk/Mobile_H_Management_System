import styled from '@emotion/styled';
import homeAPI from '@src/api/home';
import robotAPI from '@src/api/robot';
import DropDown from '@src/components/Common/DropDown';
import Null from '@src/components/Common/Null';
import Spinner from '@src/components/Common/Spinner';
import Title from '@src/components/Common/Title';
import RobotCard from '@src/components/Robot/RobotCard';
import useInfiniteScroll from '@src/hooks/useInfiniteScroll';
import { IRobotState, IRobotStateObj, IRobotType, IStoreNameObj } from '@src/types/robot';
import { useRef, useState } from 'react';

export async function getServerSideProps() {
  const stores = await homeAPI.getStores();

  const robots: any = await robotAPI.getRobots();

  const changeStoreName = (storeName: string) => {
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

  const changeRobotState = (robotState: string) => {
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

  const organizedRobots = robots.robot.map((robot: IRobotState) => ({
    ...robot,
    k_map_name: changeStoreName(robot.k_map_name),
    robot_state: changeRobotState(robot.robot_state),
  }));

  return {
    props: {
      stores: stores,
      robots: organizedRobots,
    },
  };
}

interface IProps {
  stores: IResponse;
  robots: IRobotState[];
}

const Robot = ({ robots, stores }: IProps) => {
  const [robotList, setRobotList] = useState<IRobotState[]>(robots);

  const [storeName, setStoreName] = useState<string>('전체매장');

  const [robotState, setRobotState] = useState<string>('전체로봇');

  const observerRef = useRef<HTMLDivElement>(null);

  const { data, isLoading } = useInfiniteScroll(robotList, observerRef);

  const storeNameList: IDropDownList[] = [
    { id: '0', option: '전체매장' },
    ...stores.stores.map(({ map_name, map_id }) => ({
      id: map_id,
      option: map_name,
    })),
  ];

  const copiedRobotList = [...robots];

  const createRobotType = (id: string, option: string, color?: string) => {
    return {
      id,
      option,
      color,
    };
  };

  const ROBOT_TYPE: IRobotType[] = [
    createRobotType('0', '전체로봇'),
    createRobotType('1', '에러', '#DA376E'),
    createRobotType('2', '이동중', '#299D38'),
    createRobotType('3', '대기중', '#D9AC37'),
    createRobotType('4', '충전중', '#D9AC37'),
    createRobotType('5', '수리중', '#406DFA'),
    createRobotType('6', '정보없음'),
  ];

  const storeNameHandler = (storeName: string) => {
    setStoreName(storeName);
  };

  const robotStateHandler = (robotState: string) => {
    setRobotState(robotState);
  };

  const robotListHandler = (robotList: IRobotState[]) => {
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
          data.map((cur: IRobotState, idx: number) => <RobotCard key={idx} {...cur} ROBOT_TYPE={ROBOT_TYPE} />)
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
