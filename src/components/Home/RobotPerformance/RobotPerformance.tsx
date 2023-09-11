import { useState } from 'react';
import { TDateTab, TPerformanceByDate } from '@src/types/home';
import Title from '@src/components/Common/Title';
import PerformanceInfo from './PerformanceInfo';
import styled from '@emotion/styled';

interface IProps {
  performance: TPerformanceByDate;
}

const RobotPerformance = ({ performance }: IProps) => {
  const [tab, setTab] = useState<string>('일간');

  const { day, week, month } = performance;

  const tabHandler = (tab: string) => {
    setTab(tab);
  };

  const DATE_TAB: TDateTab = {
    일간: <PerformanceInfo date={day} />,
    주간: <PerformanceInfo date={week} />,
    월간: <PerformanceInfo date={month} />,
  };

  return (
    <StRobotPerformance>
      <StHeader>
        <Title title="로봇 성능" />
        <StTabBox>
          {Object.keys(DATE_TAB).map((tabName, idx) => (
            <StTabBtn
              key={idx}
              isCurrentTab={tab === tabName}
              onClick={() => {
                tabHandler(tabName);
              }}>
              {tabName}
            </StTabBtn>
          ))}
        </StTabBox>
      </StHeader>
      <StBody>{DATE_TAB[tab]}</StBody>
    </StRobotPerformance>
  );
};

const StRobotPerformance = styled.div`
  width: 100%;
`;

const StHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  width: 100%;
`;

const StTabBox = styled.div`
  display: flex;
  gap: 20px;
`;

const StTabBtn = styled.button<{ isCurrentTab: boolean }>`
  width: 50px;
  height: 30px;
  border: none;
  color: ${({ theme, isCurrentTab }) => (isCurrentTab ? theme.color.white : theme.color.gray700)};
  background: ${({ theme, isCurrentTab }) => (isCurrentTab ? theme.color.sub : theme.color.white)};
  border-radius: 5px;
  font-size: 12px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  cursor: pointer;

  :hover {
    background: ${({ theme, isCurrentTab }) => !isCurrentTab && theme.color.gray100};
  }
`;

const StBody = styled.div`
  width: 100%;
`;

export default RobotPerformance;
