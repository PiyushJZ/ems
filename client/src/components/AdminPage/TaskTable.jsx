import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getTasks } from "../../redux/fetchSlice";

const TaskTable = () => {
  const { tasks } = useSelector((state) => state.fetch.apiData);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTasks());
  }, []);

  const getTotalTime = (userEmail) => {
    const userTasks = tasks[userEmail];
    userTasks.reduce((total, task) => {
      if (task.start && task.end) {
        const timeTaken = new Date(task.end) - new Date(task.start);
        return total + timeTaken;
      }
    }, 0);
  };

  const renderTable = () => {
    if (!tasks) {
      return <h3>No Tasks Present</h3>;
    }
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
                    <select>
                      <option default disabled>
                        Select a task
                      </option>
                      {tasks[userEmail].map((task) => {
                        return (
                          <option key={task._id} value={task.description}>
                            {task.description}
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
