import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { MutationFunction, useMutation } from 'react-query';
import { ParsedUrlQuery } from 'querystring';
import { IErrorState } from '@src/types/error';
import errorAPI from '@src/api/error';
import DetailNav from '@src/components/Common/DetailNav';
import ErrorInfo from '@src/components/Error/ErrorInfo';
import Count from '@src/components/Error/Count';
import SolutionList from '@src/components/Error/SolutionList';
import RelatedErrors from '@src/components/Error/RelatedErrors';
import styled from '@emotion/styled';

const ErrorDetail = () => {
  const router = useRouter();

  const requestData = router.query as ParsedUrlQuery & IErrorState;

  const mutationFn: MutationFunction<any, IErrorState> = async (data: IErrorState) => {
    const response = await errorAPI.getErrorDetail(data);
    return response;
  };

  const { mutate: postErrorState, data: errorDetail } = useMutation(mutationFn, { mutationKey: 'errorDetail' });

  useEffect(() => {
    if (Object.keys(requestData).length !== 0) {
      return postErrorState(requestData);
    }
  }, [requestData]);

  const errorCount = errorDetail && errorDetail.error_count;
  const errorInfo = errorDetail && errorDetail.error_info;
  const relatedErrors = errorDetail && errorDetail.error_list;
  const solutionList = errorDetail && errorDetail.error_solve_list;

  return (
    <StErrorDetail>
      <StHeader>
        <DetailNav title={'Error id : ' + requestData.error_id} />
      </StHeader>
      <StBody>
        <ErrorInfo errorInfo={errorInfo && errorInfo} />
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
        <RelatedErrors relatedErrors={relatedErrors && relatedErrors} />
        <SolutionList solutionList={solutionList && solutionList} />
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

export default ErrorDetail;
