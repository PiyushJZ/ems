import React, { useEffect, useState } from "react";
import TimerOutlinedIcon from "@mui/icons-material/TimerOutlined";
import Tooltip from "@mui/material/Tooltip";
import "./Timer.css";

function Timer({ start, end }) {
  const currentTimer = parseInt((Date.now() - new Date(start)) / 1000);
  const [timer, setTimer] = useState(currentTimer);

  useEffect(() => {
    const timeout = setTimeout(() => setTimer(timer + 1), 1000);
    if (end) {
      clearTimeout(timeout);
    }
  }, [timer]);

  const renderTimer = () => {
    let secs = timer % 60;
    let mins = timer > 60 ? parseInt(timer / 60) % 60 : 0;
    let hrs = parseInt(timer / 60 / 60);
    return `${hrs} : ${mins} : ${secs}`;
  };

  const renderMain = () => {
    if (!end) {
      return (
        <div className="timer">
          <Tooltip title="Time Elapsed" arrow placement="left">
            <TimerOutlinedIcon />
          </Tooltip>
          <p>{renderTimer()}</p>
        </div>
      );
    }
    const timeTaken = (new Date(end) - new Date(start)) / 1000;
    console.log(timeTaken);
    const result = `Time Taken: ${parseInt(timeTaken / 60 / 60)} hrs-${
      parseInt(timeTaken / 60) % 60
    } mins-${parseInt(timeTaken) % 60} secs`;
    return <div>{result}</div>;
  };

  return <div>{renderMain()}</div>;
}

export default Timer;
