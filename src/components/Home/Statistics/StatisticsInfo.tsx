import styled from '@emotion/styled';
import React from 'react';
import { RiArrowDownSFill, RiArrowUpSFill } from 'react-icons/ri';

interface IProps {
  data: IStatistics;
}

const StatisticsInfo = ({ data }: IProps) => {
  const {
    serving_count,
    serving_count_before,
    move_distance,
    move_distance_before,
    avg_serving_time,
    avg_serving_time_before,
    performance,
    performance_before,
  } = data;

  const STATISTICS_INFO = [
    {
      id: 1,
      title: '서빙횟수',
      unit: '',
      currentValue: serving_count,
      prevValue: serving_count_before,
    },
    {
      id: 2,
      title: '이동거리',
      unit: 'km',
      currentValue: move_distance,
      prevValue: move_distance_before,
    },
    {
      id: 3,
      title: '서빙평균시간',
      unit: 'm',
      currentValue: avg_serving_time,
      prevValue: avg_serving_time_before,
    },
    {
      id: 4,
      title: '주행효율',
      unit: '%',
      currentValue: performance,
      prevValue: performance_before,
    },
  ];

  const calcComparedPrev = (cur: string, prev: string) => {
    return Math.abs(Math.floor(((+cur - +prev) / +prev) * 100));
  };

  return (
    <StStatisticsInfo>
      <StBody>
        {STATISTICS_INFO.map(({ id, title, unit, currentValue, prevValue }) => (
          <StInfoBox key={id}>
            <StCurrentBox>
              <StCurrent>
                {currentValue}
                {unit}
              </StCurrent>
              <StTitle>{title}</StTitle>
            </StCurrentBox>
            <StPercentageBox isOver={prevValue > currentValue}>
              {prevValue > currentValue ? <RiArrowUpSFill /> : <RiArrowDownSFill />}
              <StPercentage>{calcComparedPrev(currentValue, prevValue)}%</StPercentage>
            </StPercentageBox>
          </StInfoBox>
        ))}
      </StBody>
    </StStatisticsInfo>
  );
};

const StStatisticsInfo = styled.div`
  width: 100%;
`;

const StBody = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 10px;
`;

const StInfoBox = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 10px;
  width: 100%;
  background: white;
  border-radius: 5px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
`;

const StCurrentBox = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 50%;
  height: 100%;
  gap: 5px;
`;

const StCurrent = styled.p`
  font-size: 18px;
  font-weight: 600;
`;

const StTitle = styled.p`
  font-size: 13px;
  color: ${({ theme }) => theme.color.gray600};
`;

const StPercentageBox = styled.div<{ isOver: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: ${({ theme, isOver }) => (isOver ? `3px solid ${theme.color.major}` : `3px solid ${theme.color.critical}`)};
  color: ${({ theme, isOver }) => (isOver ? theme.color.major : theme.color.critical)};
`;

const StPercentage = styled.p`
  font-size: 14px;
`;

export default StatisticsInfo;
