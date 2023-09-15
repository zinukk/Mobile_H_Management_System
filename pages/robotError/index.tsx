import { GetServerSideProps } from 'next';
import { useState } from 'react';
import { useMutation } from 'react-query';
import { convertDate } from '@src/utils/convertDate';
import { getYear } from '@src/utils/getYear';
import { getMonth } from '@src/utils/getMonth';
import { getDay } from '@src/utils/getDay';
import { TDateData, TError, TErrorState, TServeErrorCount } from '@src/types/robotError';
import { TStoreName } from '@src/types/common';
import errorAPI from '@src/api/robotError';
import Calendar from '@src/components/Common/Calendar';
import DropDown from '@src/components/Common/DropDown';
import ServingErrorChart from '@src/components/RobotError/ServingErrorChart';
import ErrorList from '@src/components/RobotError/ErrorList';
import Modal from '@src/components/Common/Modal';
import styled from '@emotion/styled';

interface IProps {
  errors: TError;
}

export const getServerSideProps: GetServerSideProps<IProps> = async () => {
  const { data: errors } = await errorAPI.getErrorList();

  return {
    props: {
      errors,
    },
  };
};

const RobotError = ({ errors }: IProps) => {
  const [errorList, setErrorList] = useState<TErrorState[]>(errors.error_notice);

  const [serveErrorCount, setServeErrorCount] = useState<TServeErrorCount>(errors.serve_error_count);

  const [startDate, setStartDate] = useState<Date>(new Date(getYear, getMonth, getDay - 6));

  const [endDate, setEndDate] = useState<Date>(new Date());

  const [storeName, setStoreName] = useState<string>('전체매장');

  const [storeId, setStoreId] = useState<number>(0);

  const [isOpen, setisOpen] = useState<boolean>(false);

  const dateData: TDateData = {
    start_date: convertDate(startDate),
    end_date: convertDate(endDate),
    map_id: storeId,
  };

  const errorListHandler = (errorList: TErrorState[]) => {
    setErrorList(errorList);
  };

  const serveErrorCountHandler = (serveErrorCount: TServeErrorCount) => {
    setServeErrorCount(serveErrorCount);
  };

  const storeNameHandler = (storeName: string) => {
    setStoreName(storeName);
  };

  const storeIdHandler = (storeId: string) => {
    setStoreId(Number(storeId));
  };

  const dropdownHandler = (option: string, id: string) => {
    storeNameHandler(option);
    storeIdHandler(id);
  };

  const closeModalHandler = () => {
    setisOpen(false);
  };

  const { mutate: postDates, isLoading: mutateLoading } = useMutation(
    async (dateData: TDateData) => {
      const { data: error } = await errorAPI.postErrorDates(dateData);
      return error;
    },
    {
      onSuccess: ({ error_notice, serve_error_count }: Pick<TError, 'error_notice' | 'serve_error_count'>) => {
        errorListHandler(error_notice);
        serveErrorCountHandler(serve_error_count);
      },
    },
  );

  const postDateHandler = () => {
    if (storeId === 0) return setisOpen(true);

    postDates(dateData);
  };

  const createStoreName = (id: string, option: string): TStoreName => {
    return { id, option };
  };

  const STORE_NAME: TStoreName[] = [
    createStoreName('0', '전체매장'),
    createStoreName('1', '향동 노리 배달쿡'),
    createStoreName('2', '연신내 더피플버거'),
    createStoreName('3', '오산 공유주방'),
    createStoreName('4', '차세대 융합 기술 연구원'),
    createStoreName('5', '더티프라이'),
    createStoreName('6', '노원 발란'),
  ];

  return (
    <StRobotError isOpen={isOpen}>
      <StHeader>
        <StFilterBox>
          <DropDown selected={storeName} list={STORE_NAME} event={dropdownHandler} />
          <Calendar type="start" startDate={startDate} setDate={setStartDate} endDate={endDate} />
          <Calendar type="end" startDate={startDate} setDate={setEndDate} endDate={endDate} />
        </StFilterBox>
        <StSubmitBtn onClick={postDateHandler}>검색</StSubmitBtn>
      </StHeader>
      <StBody>
        <ServingErrorChart serveErrorCount={serveErrorCount} mutateLoading={mutateLoading} />
        <ErrorList errorList={errorList} mutateLoading={mutateLoading} />
      </StBody>
      {isOpen && <Modal text="검색하실 매장을 선택해주세요" event={closeModalHandler} />}
    </StRobotError>
  );
};

const StRobotError = styled.div<{ isOpen: boolean }>`
  padding: 10vh 20px;
  width: 100%;
  background: ${({ theme }) => theme.color.background};
  height: ${({ isOpen }) => (isOpen ? '100vh' : null)};
  overflow: ${({ isOpen }) => (isOpen ? 'hidden' : null)};
`;

const StHeader = styled.header`
  width: 100%;
`;

const StFilterBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StSubmitBtn = styled.button`
  margin-top: 10px;
  padding: 0 5px;
  width: 100%;
  height: 30px;
  background: ${({ theme }) => theme.color.stroke};
  color: ${({ theme }) => theme.color.white};
  border: none;
  border-radius: 5px;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  font-size: 11px;
  z-index: 20;
  cursor: pointer;
`;

const StBody = styled.main`
  width: 100%;
`;

export default RobotError;
