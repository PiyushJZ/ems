import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const DateSelector = ({ selectedDate }) => {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    selectedDate(
      `${date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()}/${
        date.getMonth() + 1 < 10
          ? `0${date.getMonth() + 1}`
          : date.getMonth() + 1
      }/${date.getFullYear()}`
    );
  }, []);

  return (
    <DatePicker
      selected={date}
      onChange={(d) => {
        setDate(d);
        selectedDate(
          `${d.getDate() < 10 ? `0${d.getDate()}` : d.getDate()}/${
            d.getMonth() + 1 < 10 ? `0${d.getMonth() + 1}` : d.getMonth() + 1
          }/${d.getFullYear()}`
        );
      }}
      // showIcon
      required
      title='Select Date'
      dateFormat='dd/MM/yyyy'
      placeholderText='dd/MM/yyyy'
      dropdownMode='scroll'
      maxDate={new Date()}
      openToDate={new Date()}
      isClearable={false}
      className='input-info input w-full'
      form='attendance-form'
    />
  );
};

export default DateSelector;
