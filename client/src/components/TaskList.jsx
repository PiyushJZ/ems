import React, { useEffect } from "react";
import { Grid, Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { updateList } from "../redux/taskListSlice";
import axios, { all } from "axios";
import Task from "./Task";

function TaskList() {
  const tasks = useSelector((state) => state.taskList.tasks);
  const { isLoggedIn, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchTasks() {
      const response = await axios.get("http://localhost:3001/api/tasks", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      let allTasks = [];
      response.data.tasks.forEach((task) => {
        if (task.start && task.end) {
          const newTask = {
            id: task._id,
            description: task.description,
            status: "complete",
            start: task.start,
            end: task.end,
          };
          allTasks = [...allTasks, newTask];
        } else if (task.start && !task.end) {
          const newTask = {
            id: task._id,
            description: task.description,
            status: "running",
            start: task.start,
          };
          allTasks = [...allTasks, newTask];
        } else if (!task.start && !task.end) {
          const newTask = {
            id: task._id,
            description: task.description,
            status: "pending",
          };
          allTasks = [...allTasks, newTask];
        }
      });
      dispatch(updateList(allTasks));
    }

    if (isLoggedIn) {
      fetchTasks();
    }
  }, [isLoggedIn]);

  const renderHeader = () => {
    if (tasks.length === 0) {
      if (isLoggedIn) {
        return (
          <Typography variant="h6" align="center">
            No Tasks Created Yet
          </Typography>
        );
      } else {
        return (
          <div>
            <Typography variant="h6" align="center">
              No Tasks Created Yet
            </Typography>
            <Typography variant="h6" align="center">
              Log in to create
            </Typography>
          </div>
        );
      }
    } else {
      return (
        <Typography variant="h6" align="center">
          Tasks
        </Typography>
      );
    }
  };

  return (
    <Grid flexDirection={"column"} alignItems={"center"} sx={{ mt: 6 }}>
      {renderHeader()}
      {tasks.map((task) => {
        return (
          <React.Fragment key={task.id}>
            <Task
              description={task.description}
              status={task.status}
              id={task.id}
              start={task?.start}
              end={task?.end}
            />
          </React.Fragment>
        );
      })}
    </Grid>
  );
}

export default TaskList;
