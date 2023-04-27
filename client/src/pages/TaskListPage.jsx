import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getTasks, updateList } from "../redux/fetchSlice";
import Task from "./Task";

const TaskList = () => {
  const { tasks } = useSelector((state) => state.fetch);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTasks());
    let allTasks = [];
    tasks.forEach((task) => {
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
    console.log(allTasks);
    dispatch(updateList(allTasks));
  }, []);

  const renderHeader = () => {
    if (tasks.length === 0) {
      if (isLoggedIn) {
        return <h6>No Tasks Created Yet</h6>;
      } else {
        return (
          <div>
            <h6>No Tasks Created Yet</h6>
            <h6>Log in to create</h6>
          </div>
        );
      }
    } else {
      return <h6>Tasks</h6>;
    }
  };

  return (
    <div>
      {/* {renderHeader()} */}
      {tasks.map((task, index) => {
        return (
          <React.Fragment>
            <Task
              key={task.id}
              index={index}
              description={task.description}
              status={task.status}
              id={task.id}
              start={task?.start}
              end={task?.end}
            />
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default TaskList;
