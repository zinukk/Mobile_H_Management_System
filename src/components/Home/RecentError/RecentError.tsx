import { useRef } from 'react';
import { useQuery } from 'react-query';
import { useRecoilState } from 'recoil';
import homeAPI from '@src/api/home';
import Title from '@src/components/Common/Title';
import RiskDegree from './RiskDegree';
import useInfiniteScroll from '@src/hooks/useInfiniteScroll';
import RecentErrorList from './RecentErrorList';
import { IRiskDegree, IRiskDegreeList, ITimeMap } from '@src/types/home';
import { recentErrorsState } from '@src/store/recentErrors';
import styled from '@emotion/styled';

const RecentError = () => {
  const [recentErrors, setRecentErrors] = useRecoilState(recentErrorsState);
  const observerRef = useRef<HTMLDivElement>(null);

  const { data, isLoading } = useInfiniteScroll(recentErrors, observerRef);

  const riskDegree: IRiskDegree = data.reduce(
    (acc: IRiskDegree, { risk_degree }) => {
      acc['all'] = acc['all'] + 1;
      acc[risk_degree] = acc[risk_degree] + 1;
      return acc;
    },
    { all: 0, minor: 0, major: 0, critical: 0 },
  );

  const riskDegreeList: IRiskDegreeList[] = Object.entries(riskDegree).map(([degree, count], id) => ({
    id,
    degree,
    count,
  }));

  const refetchTime = () => {
    const present: number = new Date().getTime();
    const firstErrorTime: number = new Date(recentErrors && recentErrors[0] && recentErrors[0].created_at).getTime();
    const secondErrorTime: number = new Date(recentErrors && recentErrors[1] && recentErrors[1].created_at).getTime();
    const gap: number = firstErrorTime - secondErrorTime;

    const timeMap: ITimeMap = {
      60000: 5000,
      300000: 10000,
      600000: 20000,
      1200000: 30000,
    };

    if (present - firstErrorTime > 300000) return 30000;

    for (const timeRange in timeMap) {
      if (gap <= Number(timeRange)) {
        return timeMap[timeRange];
      }
    }

    return 30000;
  };

  const fetchedData = useQuery(
    ['recentErrors'],
    async () => {
      const data = homeAPI.getRecentErrors();
      return data;
    },
    {
      onSuccess: (data: { error_notice: IErrorNotice[] }) => {
        setRecentErrors(data.error_notice);
      },
      refetchInterval: refetchTime(),
      staleTime: 30000,
    },
  );

  return (
    <StRecentError>
      <StHeader>
        <Title title="최근 에러" />
        <StDegreeBox>
          {riskDegreeList.map(({ id, degree }) => (
            <StFlexBox key={id}>
              <StColor color={degree} />
              <StDegree>{degree[0].toUpperCase() + degree.slice(1)}</StDegree>
            </StFlexBox>
          ))}
        </StDegreeBox>
      </StHeader>
      <StBody>
        <RiskDegree riskDegreeList={riskDegreeList} />
        <RecentErrorList data={data} isLoading={isLoading} observerRef={observerRef} />
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
  margin-top: 30px;
  width: 100%;
`;

export default RecentError;
