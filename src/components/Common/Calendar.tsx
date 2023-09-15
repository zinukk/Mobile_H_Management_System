import { Dispatch, SetStateAction } from 'react';
import DatePicker from 'react-datepicker';
import ko from 'date-fns/locale/ko';
import 'react-datepicker/dist/react-datepicker.css';
import styled from '@emotion/styled';

interface IProps {
  type: string;
  startDate: Date;
  setDate: Dispatch<SetStateAction<Date>>;
  endDate: Date;
}

const Calendar = ({ type, startDate, endDate, setDate }: IProps) => {
  const selected: Date = type === 'start' ? startDate : endDate;

  const minDate: Date | null = type === 'end' ? startDate : null;

  const maxDate: Date = new Date();

  const dateHandler = (date: Date) => {
    setDate(date);
  };

  return (
    <StContainer>
      <StCalendar
        locale={ko}
        dateFormat="yyyy.MM.dd (eee)"
        showPopperArrow={false}
        selected={selected}
        minDate={minDate}
        maxDate={maxDate}
        onChange={(date: Date) => {
          dateHandler(date);
        }}
      />
    </StContainer>
  );
};

const StContainer = styled.div`
  .react-datepicker__input-container {
    width: 115px;
  }
`;

const StCalendar = styled(DatePicker)`
  padding: 0 5px;
  width: 115px;
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

export default Calendar;
