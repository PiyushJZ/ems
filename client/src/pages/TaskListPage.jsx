import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearList, getTasks, updateList } from "../redux/fetchSlice";
import Task from "../components/Task";

const TaskList = () => {
  const { tasks } = useSelector((state) => state.fetch);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTasks());
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
    <div className="z-10">
      {/* {renderHeader()} */}
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          {/* head */}
          <thead>
            <tr>
              <th>Sr. No.</th>
              <th>Task Description</th>
              <th>Status</th>
              <th>Date</th>
              <th>Controls</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task, index) => {
              return (
                <Task
                  key={task._id}
                  index={index}
                  description={task.description}
                  status={task.status}
                  id={task._id}
                  start={task?.start}
                  end={task?.end}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TaskList;
