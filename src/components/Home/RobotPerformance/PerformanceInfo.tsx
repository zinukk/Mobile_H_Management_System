import { RiArrowDownSFill, RiArrowUpSFill } from 'react-icons/ri';
import { TPerformanceData, TPerformanceInfo } from '@src/types/home';
import styled from '@emotion/styled';

interface IProps {
  date: TPerformanceData;
}

const PerformanceInfo = ({ date }: IProps) => {
  const {
    serving_count,
    serving_count_before,
    move_distance,
    move_distance_before,
    avg_serving_time,
    avg_serving_time_before,
    performance,
    performance_before,
  } = date;

  const createPerformanceInfo = (
    id: number,
    title: string,
    unit: string,
    currentValue: string,
    prevValue: string,
  ): TPerformanceInfo => {
    return {
      id,
      title,
      unit,
      currentValue,
      prevValue,
    };
  };

  const PERFORMANCE_INFO: TPerformanceInfo[] = [
    createPerformanceInfo(1, '서빙횟수', '번', serving_count, serving_count_before),
    createPerformanceInfo(2, '이동거리', 'km', move_distance, move_distance_before),
    createPerformanceInfo(3, '서빙평균시간', 'm', avg_serving_time, avg_serving_time_before),
    createPerformanceInfo(4, '주행효율', '', performance, performance_before),
  ];

  const calcComparedPrev = (cur: string, prev: string) => {
    return Math.abs(Math.floor(((+cur - +prev) / +prev) * 100));
  };

  return (
    <StPerformanceInfo>
      <StBody>
        {PERFORMANCE_INFO.map(({ id, title, unit, currentValue, prevValue }) => (
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
    </StPerformanceInfo>
  );
};

const StPerformanceInfo = styled.div`
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

export default PerformanceInfo;
