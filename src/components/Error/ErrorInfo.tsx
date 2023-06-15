import Title from '../Common/Title';
import { IConstantData, IErrorInfo } from '@src/types/error';
import { IStoreNameObj } from '@src/types/robot';
import styled from '@emotion/styled';

interface IProps {
  errorInfo?: IErrorInfo;
}

const ErrorInfo = ({ errorInfo }: IProps) => {
  if (!errorInfo) {
    return null;
  }

  const finalTarget: string = errorInfo && errorInfo.robot_path.split(',')[0].split('!').join(' , ');
  const organizedPath = errorInfo && errorInfo.robot_path.split(',').join(' , ');

  const createErrorInfo = (id: number, title: string, description: string) => {
    return { id, title, description };
  };

  const ERROR_INFO: IConstantData[] = [
    createErrorInfo(0, '에러가 발생한 Map Node', errorInfo && errorInfo.map_existence),
    createErrorInfo(1, '최근 목적지', errorInfo && errorInfo.recent_table + '번 테이블'),
    createErrorInfo(2, '현재 배터리', errorInfo && errorInfo.battery + '%'),
    createErrorInfo(3, '최근 Final Traget', finalTarget),
    createErrorInfo(4, '최근 경로', organizedPath),
  ];

  return (
    <StErrorInfo>
      <StHeader>
        <Title title="에러 정보" />
      </StHeader>
      <StBody>
        {ERROR_INFO.map(({ id, title, description }) => (
          <StFlexBox key={id}>
            <StTitle>{title} : </StTitle>
            <StDescription>{description ? description : '등록되지 않은 데이터입니다'}</StDescription>
          </StFlexBox>
        ))}
      </StBody>
    </StErrorInfo>
  );
};

const StErrorInfo = styled.div`
  width: 100%;
`;

const StHeader = styled.header`
  width: 100%;
`;

const StBody = styled.main`
  position: relative;
  padding: 20px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  background: ${({ theme }) => theme.color.white};
  border-radius: 5px;
`;

const StFlexBox = styled.div`
  width: 100%;
`;

const StTitle = styled.span`
  color: ${({ theme }) => theme.color.gray700};
`;

const StDescription = styled.span`
  color: ${({ theme }) => theme.color.main};
  font-weight: 600;
`;

export default ErrorInfo;
