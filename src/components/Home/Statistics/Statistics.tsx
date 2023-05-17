import styled from '@emotion/styled';
import { IDateTab, IServingByDate } from '@src/types/home';
import { useState } from 'react';
import StatisticsInfo from './StatisticsInfo';

interface IProps {
  serving: IServingByDate;
}

const Statistics = ({ serving }: IProps) => {
  const { day, week, month } = serving;

  const [tab, setTab] = useState<string>('일간');

  const tabHandler = (tab: string) => {
    setTab(tab);
  };

  const DATE_TAB: IDateTab = {
    일간: <StatisticsInfo data={day} />,
    주간: <StatisticsInfo data={week} />,
    월간: <StatisticsInfo data={month} />,
  };

  return (
    <StStatistics>
      <StHeader>
        {Object.keys(DATE_TAB).map((cur, idx) => (
          <StTabBtn
            key={idx}
            isCurrentTab={tab === cur}
            onClick={() => {
              tabHandler(cur);
            }}>
            {cur}
          </StTabBtn>
        ))}
      </StHeader>
      <StBody>{DATE_TAB[tab]}</StBody>
    </StStatistics>
  );
};

const StStatistics = styled.div`
  width: 100%;
`;

const StHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  width: 100%;
  height: 30px;
`;

const StBody = styled.div`
  width: 100%;
`;

const StTabBtn = styled.button<{ isCurrentTab: boolean }>`
  width: 100px;
  height: 30px;
  border: none;
  color: ${({ theme, isCurrentTab }) => (isCurrentTab ? theme.color.white : theme.color.black)};
  background: ${({ theme, isCurrentTab }) => (isCurrentTab ? theme.color.sub : theme.color.white)};
  border-radius: 5px;
  font-size: 16px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  cursor: pointer;
`;

export default Statistics;
