import { useState } from 'react';
import { useMutation } from 'react-query';
import { convertDate } from '@src/utils/convertDate';
import { TDates, TError, TErrorState, TServeErrorCount } from '@src/types/robotError';
import { TStore } from '@src/types/store';
import { TDropDown } from '@src/types/common';
import errorAPI from '@src/api/robotError';
import homeAPI from '@src/api/home';
import Calendar from '@src/components/Common/Calendar';
import DropDown from '@src/components/Common/DropDown';
import ServingErrorChart from '@src/components/RobotError/ServingErrorChart';
import ErrorList from '@src/components/RobotError/ErrorList';
import Modal from '@src/components/Common/Modal';
import styled from '@emotion/styled';

export async function getServerSideProps() {
  const { data: stores } = await homeAPI.getStores();

  const { data: errors } = await errorAPI.getErrorList();

  return {
    props: {
      stores,
      errors,
    },
  };
}

interface IProps {
  stores: TStore;
  errors: TError;
}

const RobotError = ({ stores, errors }: IProps) => {
  const date = new Date();

  const year = date.getFullYear();

  const month = date.getMonth();

  const day = date.getDate();

  const [errorList, setErrorList] = useState<TErrorState[]>(errors.error_notice);

  const [serveErrorCount, setServeErrorCount] = useState<TServeErrorCount>(errors.serve_error_count);

  const [startDate, setStartDate] = useState<Date>(new Date(year, month, day - 6));

  const [endDate, setEndDate] = useState<Date>(new Date());

  const [storeName, setStoreName] = useState<string>('전체매장');

  const [storeId, setStoreId] = useState<number>(0);

  const [isOpen, setisOpen] = useState<boolean>(false);

  const dropdownList: TDropDown[] = stores.stores.map(({ map_name: storeName, map_id: storeId }) => ({
    id: storeId,
    option: storeName,
  }));

  const errorListHandler = (errorLists: TErrorState[]) => {
    setErrorList(errorLists);
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

  const { mutate: postDates, isLoading: mutateLoading } = useMutation((data: TDates) => errorAPI.postErrorDates(data), {
    onSuccess: ({ error_notice, serve_error_count }: any) => {
      errorListHandler(error_notice);
      serveErrorCountHandler(serve_error_count);
    },
  });

  const postDateHandler = () => {
    if (storeId === 0) return setisOpen(true);

    const dateData: TDates = {
      start_date: convertDate(startDate),
      end_date: convertDate(endDate),
      map_id: storeId,
    };

    postDates(dateData);
  };

  return (
    <StRobotError isOpen={isOpen}>
      <StHeader>
        <StFilterBox>
          <DropDown selected={storeName} list={dropdownList} event={dropdownHandler} />
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
