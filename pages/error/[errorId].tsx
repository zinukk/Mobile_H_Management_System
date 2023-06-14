import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useMutation } from 'react-query';
import { ParsedUrlQuery } from 'querystring';
import { AxiosError } from 'axios';
import { IErrorDetail, IErrorState } from '@src/types/error';
import errorAPI from '@src/api/error';
import ErrorInfo from '@src/components/Error/ErrorInfo';
import ServingErrorCount from '@src/components/Error/ServingErrorCount';
import SolutionList from '@src/components/Error/SolutionList';
import RelatedErrors from '@src/components/Error/RelatedErrors';
import styled from '@emotion/styled';

const ErrorDetail = () => {
  const router = useRouter();

  const requestData = router.query as ParsedUrlQuery & IErrorState;

  const {
    mutate: postErrorState,
    data,
    isLoading,
  } = useMutation<IErrorDetail, AxiosError, IErrorState>('errorDetail', (data: IErrorState) =>
    errorAPI.getErrorDetail(data),
  );

  useEffect(() => {
    if (Object.keys(requestData).length !== 0) {
      return postErrorState(requestData);
    }
  }, [requestData]);

  const errorContent = data && data.error_content;
  const errorCount = data && data.error_count;
  const errorInfo = data && data.error_info;
  const errorList = data && data.error_list;
  const errorSolveList = data && data.error_solve_list;

  return (
    <StErrorDetail>
      <StBody>
        <ErrorInfo />
        <ServingErrorCount />
        <RelatedErrors />
        <SolutionList />
      </StBody>
    </StErrorDetail>
  );
};

const StErrorDetail = styled.div`
  width: 100%;
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
