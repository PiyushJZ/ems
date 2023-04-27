import React, { useEffect, useState } from "react";

function Timer({ start, end }) {
  const currentTimer = parseInt(
    (Date.now() - new Date(start).valueOf()) / 1000
  );
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

  const renderTimeTaken = () => {
    const timeTaken = (new Date(end) - new Date(start)) / 1000;
    const result = `Time Taken: ${parseInt(timeTaken / 60 / 60)} hrs-${
      parseInt(timeTaken / 60) % 60
    } mins-${parseInt(timeTaken) % 60} secs`;
    return result;
  };

  return (
    <>
      {!start && !end ? "Not Yet Started" : ""}
      {start && !end ? <>{renderTimer()}</> : ""}
      {start && end ? <>{renderTimeTaken()}</> : ""}
    </>
  );
}

export default Timer;
