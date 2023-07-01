import { useState } from 'react';
import { useMutation } from 'react-query';
import { convertDate } from '@src/utils/convertDate';
import { IDates, IServeErrorCount } from '@src/types/error';
import errorAPI from '@src/api/error';
import homeAPI from '@src/api/home';
import Calendar from '@src/components/Common/Calendar';
import DropDown from '@src/components/Common/DropDown';
import ServingErrorChart from '@src/components/Error/ServingErrorChart';
import ErrorList from '@src/components/Error/ErrorList';
import styled from '@emotion/styled';

export async function getServerSideProps() {
  const stores = await homeAPI.getStores();

  const errors = await errorAPI.getErrorList();

  return {
    props: {
      stores: stores,
      errors: errors,
    },
  };
}

interface IProps {
  stores: IResponse;
  errors: {
    error_notice: IErrorNotice[];
    serve_error_count: IServeErrorCount;
  };
}

const Error = ({ stores, errors }: IProps) => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  const [errorList, setErrorList] = useState<IErrorNotice[]>(errors.error_notice);
  const [serveErrorCount, setServeErrorCount] = useState<IServeErrorCount>(errors.serve_error_count);
  const [startDate, setStartDate] = useState<Date>(new Date(year, month, day - 6));
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [storeName, setStoreName] = useState<string>('전체매장');
  const [storeId, setStoreId] = useState<number>(0);

  const dropdownList: IDropDownList[] = stores.stores.map(({ map_name: storeName, map_id: storeId }) => ({
    id: storeId,
    option: storeName,
  }));

  const errorListHandler = (errorLists: IErrorNotice[]) => {
    setErrorList(errorLists);
  };

  const serveErrorCountHandler = (serveErrorCount: IServeErrorCount) => {
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

  const { mutate: postDates, isLoading: mutateLoading } = useMutation((data: IDates) => errorAPI.postErrorDates(data), {
    onSuccess: ({ error_notice, serve_error_count }: any) => {
      errorListHandler(error_notice);
      serveErrorCountHandler(serve_error_count);
    },
  });

  const postDateHandler = () => {
    const dateData: IDates = {
      start_date: convertDate(startDate),
      end_date: convertDate(endDate),
      map_id: storeId,
    };

    postDates(dateData);
  };

  return (
    <StError>
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
    </StError>
  );
};

const StError = styled.div`
  padding: 10vh 20px;
  width: 100%;
  background: ${({ theme }) => theme.color.background};
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

  :hover {
    background: ${({ theme }) => theme.color.main};
  }
`;

const StBody = styled.main`
  width: 100%;
`;

export default Error;
