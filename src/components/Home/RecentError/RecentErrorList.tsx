import { RefObject } from 'react';
import { TRecentErrors } from '@src/types/home';
import Error from '@src/components/Common/Error';
import Spinner from '@src/components/Common/Spinner';
import styled from '@emotion/styled';

interface IProps {
  recentErrorList: TRecentErrors[];
  isLoading: boolean;
  observerRef: RefObject<HTMLDivElement>;
}

const RecentErrorList = ({ recentErrorList, isLoading, observerRef }: IProps) => {
  return (
    <StRecentErrorList>
      <StBody>
        {recentErrorList.map((cur: TRecentErrors, idx) => (
          <Error key={idx} {...cur} />
        ))}
        {isLoading && (
          <StSpinnerBox>
            <Spinner />
          </StSpinnerBox>
        )}
        <div ref={observerRef} />
      </StBody>
    </StRecentErrorList>
  );
};

const StRecentErrorList = styled.div`
  margin-top: 20px;
  width: 100%;
  background: ${({ theme }) => theme.color.white};
  border-radius: 5px;
`;

const StBody = styled.main`
  padding: 20px;
  width: 100%;
  height: 300px;
  overflow: scroll;

  :last-child {
    margin-bottom: 0;
  }
`;

const StSpinnerBox = styled.div`
  position: relative;
  width: 100%;
`;

export default RecentErrorList;
