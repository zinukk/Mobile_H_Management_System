import { useRouter } from 'next/router';
import styled from '@emotion/styled';

const Custom500 = () => {
  const router = useRouter();

  const pageHandler = () => {
    router.push('/');
  };

  return (
    <StCustom500>
      <StHeader>서버에 오류가 발생했습니다 :(</StHeader>
      <StBody>500 ERROR</StBody>
      <StFooter>
        <StBack onClick={pageHandler}>홈으로 돌아가기</StBack>
      </StFooter>
    </StCustom500>
  );
};

const StCustom500 = styled.div`
  width: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const StHeader = styled.header`
  width: 100%;
  color: ${({ theme }) => theme.color.gray500};
  font-size: 20px;
  text-align: center;
`;

const StBody = styled.main`
  margin: 50px 0;
  width: 100%;
  color: ${({ theme }) => theme.color.main};
  font-size: 60px;
  font-weight: 700;
  text-align: center;
`;

const StFooter = styled.footer`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const StBack = styled.button`
  width: 300px;
  height: 40px;
  border: none;
  border-radius: 5px;
  color: ${({ theme }) => theme.color.white};
  background: ${({ theme }) => theme.color.sub};
  cursor: pointer;
`;

export default Custom500;
