import { useEffect } from "react";
import {} from "react-redux";

const TaskTable = () => {
  const tasks = useSelector((state) => state.taskList.tasks);
  useEffect(() => {
    console.log(tasks);
  }, []);
  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra w-full">
        {/* head */}
        <thead>
          <tr>
            <th>employee email</th>
            <th>tasks</th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          <tr>
            <td>Cy Ganderton</td>
            <td>Quality Control Specialist</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TaskTable;
