import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { MutationFunction, useMutation } from 'react-query';
import { ParsedUrlQuery } from 'querystring';
import { TErrorState } from '@src/types/robotError';
import errorAPI from '@src/api/robotError';
import DetailNav from '@src/components/Common/DetailNav';
import ErrorInfo from '@src/components/RobotError/ErrorInfo';
import Count from '@src/components/RobotError/Count';
import SolutionList from '@src/components/RobotError/SolutionList';
import RelatedErrors from '@src/components/RobotError/RelatedErrors';
import styled from '@emotion/styled';

const RobotErrorDetail = () => {
  const router = useRouter();

  const requestData = router.query as ParsedUrlQuery & TErrorState;

  const mutationFn: MutationFunction<any, TErrorState> = async (data: TErrorState) => {
    const { data: errorDetail } = await errorAPI.getErrorDetail(data);
    return errorDetail;
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
    <StRobotErrorDetail>
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
    </StRobotErrorDetail>
  );
};

const StRobotErrorDetail = styled.div`
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

export default RobotErrorDetail;
