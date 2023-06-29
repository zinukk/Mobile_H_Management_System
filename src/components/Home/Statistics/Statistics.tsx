import { useState } from 'react';
import { IDateTab, IServingByDate } from '@src/types/home';
import StatisticsInfo from './StatisticsInfo';
import styled from '@emotion/styled';
import Title from '@src/components/Common/Title';

interface IProps {
  serving: IServingByDate;
}

const Statistics = ({ serving }: IProps) => {
  const [tab, setTab] = useState<string>('일간');

  const { day, week, month } = serving;

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
        <Title title="통계 자료" />
        <StTabBox>
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
        </StTabBox>
      </StHeader>
      <StBody>{DATE_TAB[tab]}</StBody>
    </StStatistics>
  );
};

const StStatistics = styled.div`
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

export default Statistics;
