import React, { useEffect, useState } from 'react';
import { Calendar, DateObject } from 'react-multi-date-picker';
import DatePicker from 'react-multi-date-picker';
import 'react-multi-date-picker/styles/layouts/mobile.css';

const Attendance = ({ attendance }) => {
  const [dates, setDates] = useState(new DateObject());

  useEffect(() => {
    const temp = [];
    attendance.map(item => {
      temp.push(new DateObject(item.date));
    });
    setDates(temp);
  }, []);

  return (
    <>
      <div>
        <Calendar
          value={dates}
          showOtherDays={true}
          // disabled={true}
          months={new DateObject().months.map(month => month.shortName)}
          // disableDayPicker={true}
          // onChange={}
          monthYearSeparator={'|'}
          highlightToday={false}
          maxDate={new DateObject()}
          className='rmdp-mobile'
        />
      </div>
    </>
  );
};

export default Attendance;
