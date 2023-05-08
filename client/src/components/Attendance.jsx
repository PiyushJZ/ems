import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const Attendance = ({ attendance }) => {
  const [dates, setDates] = useState([new Date()]);
  console.log(dates);
  useEffect(() => {
    attendance.map((item) => {
      setDates([...dates, new Date(item.date)]);
    });
  }, []);

  return (
    <>
      <div>
        <Calendar
          activeStartDate={new Date()}
          defaultValue={dates}
        />
      </div>
    </>
  );
};

export default Attendance;
