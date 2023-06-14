import styled from '@emotion/styled';
import { useState } from 'react';
import { useMutation } from 'react-query';
import errorAPI from '@src/api/error';
import homeAPI from '@src/api/home';
import Calendar from '@src/components/Common/Calendar';
import DropDown from '@src/components/Common/DropDown';
import { IDates, IServeErrorCount } from '@src/types/error';
import ServingErrorChart from '@src/components/Error/ServingErrorChart';
import ErrorList from '@src/components/Error/ErrorList';

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
  const [errorList, setErrorList] = useState<IErrorNotice[]>(errors.error_notice);
  const [serveErrorCount, setServeErrorCount] = useState<IServeErrorCount>(errors.serve_error_count);
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [storeName, setStoreName] = useState<string>('전체매장');
  const [storeId, setStoreId] = useState<number>(0);

  const dropdownList: IDropDownList[] = stores.stores.map(({ map_name: storeName, map_id: storeId }) => ({
    id: storeId,
    option: storeName,
  }));

  const errorListHandler = (errorList: IErrorNotice[]) => {
    setErrorList(errorList);
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

  const { mutate: postDates } = useMutation((data: IDates) => errorAPI.postErrorDates(data), {
    onSuccess: ({ error_notice, serve_error_count }: any) => {
      errorListHandler(error_notice);
      serveErrorCountHandler(serve_error_count);
    },
  });

  return (
    <StError>
      <StHeader>
        <DropDown selected={storeName} list={dropdownList} event={dropdownHandler} />
        <Calendar
          event={postDates}
          storeId={storeId}
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
        />
      </StHeader>
      <StBody>
        <ServingErrorChart serveErrorCount={serveErrorCount} />
        <ErrorList errorList={errorList} />
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

const StBody = styled.main`
  width: 100%;
`;

export default Error;
