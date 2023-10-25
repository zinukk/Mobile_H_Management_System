import Link from 'next/link';
import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import styled from '@emotion/styled';

const Error = () => {
  const { query } = useRouter();

  const { errorDescription, errorCode } = query as ParsedUrlQuery;

  return (
    <StError>
      <StHeader>{errorDescription}</StHeader>
      <StBody>Error Code {errorCode}</StBody>
      <StFooter>
        <Link href={'/'}>
          <StBack>홈으로 돌아가기</StBack>
        </Link>
      </StFooter>
    </StError>
  );
};

const StError = styled.div`
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

export default Error;
