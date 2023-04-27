import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getTasks } from "../../redux/fetchSlice";

const TaskTable = () => {
  const { tasks } = useSelector((state) => state.fetch);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTasks());
  }, []);

  const renderTime = (time) => {
    if (isNaN(time)) {
      return;
    }
    return `${parseInt(time / 60 / 60)} : ${parseInt(time / 60) % 60} : ${
      parseInt(time) % 60
    }`;
  };

  const getTotalTime = (userEmail) => {
    const userTasks = tasks[userEmail];
    const totalTime = userTasks.reduce((total, task) => {
      if (task.start && task.end) {
        const timeTaken = (new Date(task.end) - new Date(task.start)) / 1000;
        return total + timeTaken;
      }
      return total;
    }, 0);
    return renderTime(totalTime);
  };

  const renderTable = () => {
    return (
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          {/* head */}
          <thead>
            <tr>
              <th>employee email</th>
              <th>tasks</th>
              <th>time taken</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(tasks).map((userEmail, index) => {
              return (
                <tr key={index}>
                  <td>{userEmail}</td>
                  <td>
                    <select
                      defaultValue={"select"}
                      className="select select-bordered w-full max-w-xs"
                    >
                      <option value={"select"} disabled>
                        Select a task
                      </option>
                      {tasks[userEmail].map((task) => {
                        return (
                          <option key={task._id} value={task.description}>
                            {/* <React.Fragment> */}
                            <React.Fragment>{task.description}</React.Fragment>
                            &emsp;
                            <React.Fragment>
                              {renderTime(
                                parseInt(
                                  new Date(task.end) - new Date(task.start)
                                ) / 1000
                              )}
                            </React.Fragment>
                            {/* </React.Fragment> */}
                          </option>
                        );
                      })}
                    </select>
                  </td>
                  <td>{getTotalTime(userEmail)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };

  return <>{renderTable()}</>;
};

export default TaskTable;
