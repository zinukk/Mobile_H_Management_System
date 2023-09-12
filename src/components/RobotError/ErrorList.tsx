import { useRef } from 'react';
import { TErrorState } from '@src/types/robotError';
import Title from '../Common/Title';
import useInfiniteScroll from '@src/hooks/useInfiniteScroll';
import Error from '../Common/Error';
import Spinner from '../Common/Spinner';
import styled from '@emotion/styled';

interface IProps {
  errorList: TErrorState[];
  mutateLoading: boolean;
}

const ErrorList = ({ errorList, mutateLoading }: IProps) => {
  const observerRef = useRef<HTMLDivElement>(null);

  const { data, isLoading: scrollLoading } = useInfiniteScroll(errorList, observerRef);

  return (
    <StErrorList>
      <StHeader>
        <Title title="에러 리스트" />
      </StHeader>
      <StBody>
        {mutateLoading ? (
          <Spinner />
        ) : data.length !== 0 ? (
          data.map((cur: TErrorState, idx: number) => <Error key={idx} {...cur} />)
        ) : (
          <StNull>조건에 맞는 에러가 존재하지 않습니다</StNull>
        )}
        {scrollLoading && (
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
