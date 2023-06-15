import styled from '@emotion/styled';
import React, { useRef } from 'react';
import Title from '../Common/Title';
import useInfiniteScroll from '@src/hooks/useInfiniteScroll';
import Error from '../Common/Error';
import Spinner from '../Common/Spinner';
import { IErrorState } from '@src/types/error';

interface IProps {
  errorList: IErrorNotice[];
}

const ErrorList = ({ errorList }: IProps) => {
  const observerRef = useRef<HTMLDivElement>(null);

  const { data, isLoading } = useInfiniteScroll(errorList, observerRef);

  return (
    <StErrorList>
      <StHeader>
        <Title title="에러 리스트" />
        <StLength>{data.length + ' / ' + errorList.length}</StLength>
      </StHeader>
      <StBody>
        {data.length !== 0 ? (
          data.map((cur: IErrorState, idx) => <Error key={idx} {...cur} />)
        ) : (
          <StNull>조건에 맞는 에러가 존재하지 않습니다</StNull>
        )}
        {isLoading && (
          <StSpinnerBox>
            <Spinner />
          </StSpinnerBox>
        )}
        <div ref={observerRef} />
      </StBody>
    </StErrorList>
  );
};

const StErrorList = styled.div`
  margin-top: 30px;
  width: 100%;
`;

const StHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const StBody = styled.main`
  position: relative;
  padding: 20px;
  margin-top: 20px;
  width: 100%;
  height: 290px;
  background: ${({ theme }) => theme.color.white};
  border-radius: 5px;
  overflow: scroll;
  :last-child {
    margin-bottom: 0;
  }
`;

const StLength = styled.p`
  margin-left: 10px;
  color: ${({ theme }) => theme.color.gray500};
  font-size: 14px;
  font-weight: 600;
`;

const StNull = styled.p`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: ${({ theme }) => theme.color.gray600};
`;

const StSpinnerBox = styled.div`
  position: relative;
  width: 100%;
`;

export default ErrorList;
