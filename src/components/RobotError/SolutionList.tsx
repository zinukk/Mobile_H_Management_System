import { TErrorSolution } from '@src/types/robotError';
import Title from '../Common/Title';
import Null from '../Common/Null';
import styled from '@emotion/styled';

interface IProps {
  solutionList: TErrorSolution[];
}

const SolutionList = ({ solutionList }: IProps) => {
  return (
    <StSolutionList>
      <StHeader>
        <Title title="해당 에러와 관련된 해결 방법" />
      </StHeader>
      <StBody>
        {solutionList && solutionList.length === 0 ? (
          <Null />
        ) : (
          solutionList &&
          solutionList.map(({ error_id, manager, content }) => (
            <StSolution key={error_id}>
              <StFlexBox>
                <StTitle>담당자 : </StTitle>
                <StDescription>{manager ? manager : '등록되지 않은 담당자입니다'}</StDescription>
              </StFlexBox>
              <StFlexBox>
                <StTitle>해결 방법 : </StTitle>
                <StDescription>{content ? content : '등록되지 않은 해결방법입니다'}</StDescription>
              </StFlexBox>
              <StFlexBox>
                <StTitle>에러 아이디 : </StTitle>
                <StDescription>{error_id}</StDescription>
              </StFlexBox>
            </StSolution>
          ))
        )}
      </StBody>
    </StSolutionList>
  );
};

const StSolutionList = styled.div`
  margin-top: 30px;
  width: 100%;
`;

const StHeader = styled.div`
  width: 100%;
`;

const StBody = styled.div`
  position: relative;
  padding: 20px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  min-height: 100px;
  max-height: 300px;
  background: ${({ theme }) => theme.color.white};
  border-radius: 5px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  overflow: scroll;
`;

const StSolution = styled.div`
  padding: 10px;
  width: 100%;
  background: ${({ theme }) => theme.color.gray100};
  border: ${({ theme }) => `1px solid ${theme.color.gray400}`};
  border-radius: 5px;
  gap: 10px;
`;

const StFlexBox = styled.div`
  width: 100%;
  word-break: break-all;
`;

const StTitle = styled.span`
  color: ${({ theme }) => theme.color.gray700};
  font-size: 14px;
`;

const StDescription = styled.span`
  color: ${({ theme }) => theme.color.main};
  font-size: 14px;
  font-weight: 600;
`;

export default SolutionList;
