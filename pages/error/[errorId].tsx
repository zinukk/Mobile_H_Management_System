import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useMutation } from 'react-query';
import { ParsedUrlQuery } from 'querystring';
import { AxiosError } from 'axios';
import { IErrorDetail, IErrorState, ISolution } from '@src/types/error';
import errorAPI from '@src/api/error';
import ErrorInfo from '@src/components/Error/ErrorInfo';
import Count from '@src/components/Error/Count';
import SolutionList from '@src/components/Error/SolutionList';
import RelatedErrors from '@src/components/Error/RelatedErrors';
import styled from '@emotion/styled';

const ErrorDetail = () => {
  const router = useRouter();

  const requestData = router.query as ParsedUrlQuery & IErrorState;

  const { mutate: postErrorState, data } = useMutation<IErrorDetail, AxiosError, IErrorState>(
    'errorDetail',
    (data: IErrorState) => errorAPI.getErrorDetail(data),
  );

  useEffect(() => {
    if (Object.keys(requestData).length !== 0) {
      return postErrorState(requestData);
    }
  }, [requestData]);

  const errorContent = data && data.error_content;
  const errorCount = data && data.error_count;
  const errorInfo = data && data.error_info;
  const relatedErrors = data && data.error_list;
  const solutionList: ISolution[] = data && data.error_solve_list;

  return (
    <StErrorDetail>
      <StBody>
        <ErrorInfo errorInfo={errorInfo} />
        <Count
          type="error"
          week={errorCount && errorCount.week_error_count}
          month={errorCount && errorCount.month_error_count}
        />
        <Count
          type="serving"
          week={errorCount && errorCount.week_serving_count}
          month={errorCount && errorCount.month_serving_count}
        />
        <RelatedErrors relatedErrors={relatedErrors} />
        <SolutionList solutionList={solutionList} />
      </StBody>
    </StErrorDetail>
  );
};

const StErrorDetail = styled.div`
  padding: 10vh 20px;
  width: 100%;
  background: ${({ theme }) => theme.color.background};
`;

const StHeader = styled.header`
  width: 100%;
`;

const StBody = styled.main`
  width: 100%;
`;

const StFooter = styled.footer`
  width: 100%;
`;

export default ErrorDetail;
