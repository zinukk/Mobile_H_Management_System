import styled from '@emotion/styled';
import DatePicker from 'react-datepicker';
import ko from 'date-fns/locale/ko';
import 'react-datepicker/dist/react-datepicker.css';
import React, { Dispatch, SetStateAction } from 'react';
import { IDates } from '@src/types/error';

interface IProps {
  event: (arg: IDates) => void;
  storeId: number;
  startDate: Date;
  endDate: Date;
  setStartDate: Dispatch<SetStateAction<Date>>;
  setEndDate: Dispatch<SetStateAction<Date>>;
}

const Calendar = ({ event, storeId, startDate, setStartDate, endDate, setEndDate }: IProps) => {
  const startDateHandler = (date: Date) => {
    setStartDate(date);
  };

  const endDateHandler = (date: Date) => {
    setEndDate(date);
  };

  const convertDate = (date: Date) => {
    const year = date.getFullYear().toString();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);

    return year + '-' + month + '-' + day;
  };

  const data = {
    start_date: convertDate(startDate),
    end_date: convertDate(endDate),
    map_id: storeId,
  };

  return (
    <StCalendar>
      <StCustomDatePicker
        locale={ko}
        dateFormat="yyyy.MM.dd (eee)"
        showPopperArrow={false}
        selected={startDate}
        onChange={(date: Date) => {
          startDateHandler(date);
        }}
      />
      <StCustomDatePicker
        locale={ko}
        dateFormat="yyyy.MM.dd (eee)"
        showPopperArrow={false}
        minDate={startDate}
        selected={endDate}
        onChange={(date: Date) => {
          endDateHandler(date);
        }}
      />
      <StSubmitBtn
        onClick={() => {
          event(data);
        }}>
        검색
      </StSubmitBtn>
    </StCalendar>
  );
};

const StCalendar = styled.div`
  margin-top: 10px;
  display: flex;
  width: 100%;
`;

const StCustomDatePicker = styled(DatePicker)`
  padding: 0 5px;
  width: 120px;
  height: 30px;
  color: ${({ theme }) => theme.color.white};
  background: ${({ theme }) => theme.color.sub};
  border: none;
  border-radius: 5px;
  font-size: 11px;
  text-align: center;
  cursor: pointer;

  :hover {
    background: ${({ theme }) => theme.color.main};
  }
`;

const StSubmitBtn = styled.button`
  padding: 0 5px;
  width: 120px;
  height: 30px;
  color: ${({ theme }) => theme.color.white};
  background: ${({ theme }) => theme.color.main};
  border-radius: 5px;
  font-size: 11px;
  border: none;
  cursor: pointer;
`;

export default Calendar;
