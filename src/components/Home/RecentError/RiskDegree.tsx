import { IRiskDegreeList } from '@src/types/home';
import styled from '@emotion/styled';

interface IProps {
  riskDegreeList: IRiskDegreeList[];
}

const RiskDegree = ({ riskDegreeList }: IProps) => {
  return (
    <StRiskDegree>
      <StBody>
        {riskDegreeList.map(({ id, degree, count }) => (
          <StRiskDegreeBox key={id}>
            <StDegree>{degree[0].toUpperCase() + degree.slice(1)}</StDegree>
            <StCount>{count}</StCount>
          </StRiskDegreeBox>
        ))}
      </StBody>
    </StRiskDegree>
  );
};

const StRiskDegree = styled.div`
  padding: 10px 20px;
  width: 100%;
  background: ${({ theme }) => theme.color.white};
  border-radius: 5px;
`;

const StBody = styled.main`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const StRiskDegreeBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
`;

const StDegree = styled.p`
  color: ${({ theme }) => theme.color.gray600};
  font-size: 14px;
`;

const StCount = styled.p`
  color: ${({ theme }) => theme.color.gray700};
  font-size: 14px;
  font-weight: 600;
`;

export default RiskDegree;
