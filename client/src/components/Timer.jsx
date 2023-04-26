import React, { useEffect, useState } from "react";
import Icon from "@mui/material/Icon";
import TimerOutlinedIcon from "@mui/icons-material/TimerOutlined";
import Tooltip from "@mui/material/Tooltip";
import { Grid, Typography } from "@mui/material";

function Timer({ start, end }) {
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    console.log(start, end);
    setTimeout(() => setTimer(timer + 1), 1000);
  }, [timer]);

  const renderTimer = () => {
    let secs = timer % 60;
    let mins = timer > 60 ? parseInt(timer / 60) % 60 : 0;
    let hrs = parseInt(timer / 60 / 60);
    return `${hrs} : ${mins} : ${secs}`;
  };

  return (
    <Grid
      display={"flex"}
      alignItems={"center"}
      justifyContent={"space-evenly"}
    >
      <Tooltip title="Time Elapsed" arrow placement="left">
        <Icon>
          <TimerOutlinedIcon />
        </Icon>
      </Tooltip>
      <Typography>{renderTimer()}</Typography>
    </Grid>
  );
}

export default Timer;
