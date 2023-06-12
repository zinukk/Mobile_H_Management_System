import styled from '@emotion/styled';
import DatePicker from 'react-datepicker';
import ko from 'date-fns/locale/ko';
import 'react-datepicker/dist/react-datepicker.css';
import React, { Dispatch, SetStateAction } from 'react';
import { IDates } from '@src/types/error';

interface IProps {
  event: (arg: IDates) => void;
  startDate: Date;
  endDate: Date;
  setStartDate: Dispatch<SetStateAction<Date>>;
  setEndDate: Dispatch<SetStateAction<Date>>;
}

const Calendar = ({ event, startDate, setStartDate, endDate, setEndDate }: IProps) => {
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

  const dates = {
    start_date: convertDate(startDate),
    end_date: convertDate(endDate),
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
          event(dates);
        }}>
        검색
      </StSubmitBtn>
    </StCalendar>
  );
};

const StCalendar = styled.div`
  display: flex;
  width: 100%;
`;

const StCustomDatePicker = styled(DatePicker)`
  width: 100px;
  height: 25px;
  color: ${({ theme }) => theme.color.white};
  background: ${({ theme }) => theme.color.stroke};
  border: none;
  border-radius: 5px;
  font-size: 11px;
  text-align: center;
  cursor: pointer;
`;

const StSubmitBtn = styled.button`
  width: 100px;
  height: 25px;
  color: ${({ theme }) => theme.color.white};
  background: ${({ theme }) => theme.color.main};
  border-radius: 5px;
  font-size: 11px;
  border: none;
  cursor: pointer;
`;

export default Calendar;
