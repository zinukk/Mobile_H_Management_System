import styled from '@emotion/styled';
import Link from 'next/link';

const Custom404 = () => {
  return (
    <StCustom404>
      <StHeader>요청하신 페이지를 찾을 수 없습니다 :(</StHeader>
      <StBody>404 ERROR</StBody>
      <StFooter>
        <Link href={'/'}>
          <StBack>홈으로 돌아가기</StBack>
        </Link>
      </StFooter>
    </StCustom404>
  );
};

const StCustom404 = styled.div`
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

export default Custom404;
