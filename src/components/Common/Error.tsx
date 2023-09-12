import { useRouter } from 'next/router';
import { MdArrowForwardIos } from 'react-icons/md';
import { TErrorState } from '@src/types/robotError';
import styled from '@emotion/styled';

const Error = ({
  error_msg,
  created_at,
  k_map_name,
  risk_degree,
  error_id,
  error_type,
  map_id,
  robot_id,
}: TErrorState) => {
  const router = useRouter();

  const requestData = { created_at, error_id, error_type, map_id, robot_id };

  const pageHandler = () => {
    router.push({
      pathname: `/robotError/${error_id}`,
      query: requestData,
    });
  };

  return (
    <StError onClick={pageHandler}>
      <StHeader color={risk_degree} />
      <StBody>
        <StErrorMessage>{error_msg ? error_msg.split(',').join(', ') : '확인되지 않은 에러입니다.'}</StErrorMessage>
        <StFlexBox>
          <StStoreName>{k_map_name ? k_map_name : error_type}</StStoreName>
          <StTime>{created_at}</StTime>
        </StFlexBox>
      </StBody>
      <StFooter>
        <StIcon size={20} />
      </StFooter>
    </StError>
  );
};

const StError = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  width: 100%;
  height: 70px;
  border: ${({ theme }) => `1px solid ${theme.color.gray400}`};
  border-radius: 5px;
  gap: 10px;
  cursor: pointer;

  :hover {
    background: ${({ theme }) => theme.color.gray100};
  }

  :last-child {
    margin-bottom: 0;
  }
`;

const StHeader = styled.header<{ color: string }>`
  width: 5%;
  height: 70px;
  background: ${({ theme, color }) => (color ? theme.color[color] : theme.color.stroke)};
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
`;

const StBody = styled.main`
  display: flex;
  flex-direction: column;
  width: 100%;
  flex-wrap: wrap;
  gap: 10px;
`;

const StErrorMessage = styled.p`
  font-size: 14px;
`;

const StFlexBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const StStoreName = styled.p`
  color: ${({ theme }) => theme.color.gray700};
  font-size: 12px;
`;

const StTime = styled.p`
  color: ${({ theme }) => theme.color.gray700};
  font-size: 10px;
`;

const StFooter = styled.footer`
  width: 10%;
`;

const StIcon = styled(MdArrowForwardIos)`
  color: ${({ theme }) => theme.color.gray500};
`;

export default Error;
