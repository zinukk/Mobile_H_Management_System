import Title from '@src/components/Common/Title';
import RiskDegree from './RiskDegree';
import { IRiskDegree, IRiskDegreeList } from '@src/types/home';
import styled from '@emotion/styled';

interface IProps {
  errors: IErrorNotice[];
}

const RecentError = ({ errors }: IProps) => {
  const riskDegree: IRiskDegree = errors.reduce(
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
