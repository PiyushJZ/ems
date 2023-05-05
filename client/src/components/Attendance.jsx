import React, { useState , useEffect } from "react";
import Calendar from "react-calendar";
import { FETCH_WRAPPER } from "../api";
import "react-calendar/dist/Calendar.css";

const Attendance = () => {
  const [value, onChange] = useState(new Date());
  const [allAttendance, setAllAttendance] = useState([]);

  //   get the attendance data
  const fetchAttendance = async () => {
    const token = localStorage.getItem("authToken");

    try {
      const response = await FETCH_WRAPPER.get("attendence", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      //   console.log(response.data.data);
      setAllAttendance(response.data.data);
      if (response.status === 200) {
        // Swal.fire({
        //   icon: "success",
        //   title: "Attendance Marked",
        // });
        // return navigate(PATHS.taskList);
        console.log("true");
      }
    } catch (err) {
      console.log(err);
      //   Swal.fire({
      //     icon: "error",
      //     title: "Attendance Not Marked",
      //     text: err.response.data.message,
      //   });
    }
  };

  useEffect(() => {
    fetchAttendance();
  }, []);

  console.log(allAttendance);

  


  return (
    <>
      <div>
        <Calendar
          value={value}
          onChange={onChange}
        />
      </div>
    </>
  );
};

export default Attendance;
