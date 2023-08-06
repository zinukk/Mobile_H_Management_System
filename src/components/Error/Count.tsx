import Title from '../Common/Title';
import { IConstantData } from '@src/types/error';
import styled from '@emotion/styled';

interface IProps {
  type: string;
  week: string;
  month: string;
}

const Count = ({ type, week, month }: IProps) => {
  const createCountInfo = (id: number, title: string, description: string) => {
    return { id, title, description };
  };

  const COUNT_INFO: IConstantData[] = [createCountInfo(0, '일주일', week), createCountInfo(1, '한 달', month)];

  return (
    <StCount>
      <StHeader>
        <Title title={type === 'error' ? '최근 에러 횟수' : '최근 서빙 횟수'} />
      </StHeader>
      <StBody>
        <StFlexBox>
          {COUNT_INFO.map(({ id, title, description }) => (
            <StCountBox key={id}>
              <StDescription>{description}</StDescription>
              <StPeriod>{title}</StPeriod>
            </StCountBox>
          ))}
        </StFlexBox>
      </StBody>
    </StCount>
  );
};

const StCount = styled.div`
  margin-top: 30px;
  width: 100%;
`;

const StHeader = styled.header`
  width: 100%;
`;

const StBody = styled.main`
  padding: 20px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  background: ${({ theme }) => theme.color.white};
  border-radius: 5px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
`;

const StPeriod = styled.p`
  margin-top: 5px;
  color: ${({ theme }) => theme.color.gray700};
`;

const StDescription = styled.p`
  color: ${({ theme }) => theme.color.main};
  font-weight: 600;
`;

const StFlexBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 100px;
`;

const StCountBox = styled.div`
  width: fit-content;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export default Count;
