import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';

const Attendance = () => {
  const [value, onChange] = useState(new Date());


  return (
    <>
      <div>
        <Calendar value={value} onChange={onChange} />
      </div>
    </>
  );
};

export default Attendance;
