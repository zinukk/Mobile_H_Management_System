import { useRef } from 'react';
import { useQuery } from 'react-query';
import { useRecoilState } from 'recoil';
import { TRiskDegree, TRiskDegreeList, TTimeMap } from '@src/types/home';
import { recentErrorsState } from '@src/store/recentErrors';
import homeAPI from '@src/api/home';
import Title from '@src/components/Common/Title';
import RiskDegree from './RiskDegree';
import useInfiniteScroll from '@src/hooks/useInfiniteScroll';
import RecentErrorList from './RecentErrorList';
import styled from '@emotion/styled';

const RecentError = () => {
  const [recentErrors, setRecentErrors] = useRecoilState(recentErrorsState);

  const observerRef = useRef<HTMLDivElement>(null);

  const { data: recentErrorList, isLoading: scrollLoading } = useInfiniteScroll(recentErrors, observerRef);

  const riskDegree: TRiskDegree = recentErrorList.reduce(
    (acc: TRiskDegree, { risk_degree }) => {
      acc['all'] = acc['all'] + 1;
      acc[risk_degree] = acc[risk_degree] + 1;
      return acc;
    },
    { all: 0, minor: 0, major: 0, critical: 0 },
  );

  const riskDegreeList: TRiskDegreeList[] = Object.entries(riskDegree).map(([degree, count], id) => ({
    id,
    degree,
    count,
  }));

  const refetchTime = () => {
    const present: number = new Date().getTime();

    const presentHour: number = new Date().getHours();

    const isNightTime: boolean = presentHour >= 2 && presentHour < 6;

    const firstErrorTime: number = new Date(recentErrors && recentErrors[0] && recentErrors[0].created_at).getTime();

    const secondErrorTime: number = new Date(recentErrors && recentErrors[1] && recentErrors[1].created_at).getTime();

    const gap: number = firstErrorTime - secondErrorTime;

    const timeMap: TTimeMap = {
      60000: 5000,
      300000: 10000,
      600000: 20000,
      1200000: 30000,
    };

    if (isNightTime) return 600000;

    if (present - firstErrorTime > 300000) return 30000;

    for (const timeRange in timeMap) {
      if (gap <= Number(timeRange)) {
        return timeMap[timeRange];
      }
    }

    return 30000;
  };

  const fetchedErrorList = useQuery(
    ['recentErrors'],
    async () => {
      const { data: errorList } = await homeAPI.getRecentErrors();

      return errorList;
    },
    {
      onSuccess: ({ error_notice: recentErrors }) => {
        return setRecentErrors(recentErrors);
      },
      refetchInterval: refetchTime(),
    },
  );

  return (
    <StRecentError>
      <StHeader>
        <Title title="최근 에러" />
        <StDegreeBox>
          {riskDegreeList.map(({ id, degree }: TRiskDegreeList) => (
            <StFlexBox key={id}>
              <StColor color={degree} />
              <StDegree>{degree[0].toUpperCase() + degree.slice(1)}</StDegree>
            </StFlexBox>
          ))}
        </StDegreeBox>
      </StHeader>
      <StBody>
        <RiskDegree riskDegreeList={riskDegreeList} />
        <RecentErrorList recentErrorList={recentErrorList} isLoading={scrollLoading} observerRef={observerRef} />
      </StBody>
    </StRecentError>
  );
};

const StRecentError = styled.div`
  margin-top: 60px;
  width: 100%;
`;

const StHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const StDegreeBox = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 30px;
  gap: 20px;
`;

const StFlexBox = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const StColor = styled.div<{ color: string }>`
  width: 10px;
  height: 10px;
  background: ${({ theme, color }) => theme.color[color]};
  border: ${({ color }) => color === 'all' && '1px solid black'};
  border-radius: 10px;
`;

const StDegree = styled.p`
  font-size: 12px;
`;

const StBody = styled.main`
  position: relative;
  margin-top: 30px;
  width: 100%;
  min-height: 300px;
`;

export default RecentError;
