import { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useSelector, useDispatch } from "react-redux";
import { updateList } from "../redux/fetchSlice";
import axios from "axios";
import Timer from "./Timer";

function Task({ description, status, id, start, end, index }) {
  const [isEdit, setIsEdit] = useState(false);
  const [desc, setDesc] = useState(description);
  const user = useSelector((state) => state.auth.user);
  const { tasks } = useSelector((state) => state.fetch);
  const dispatch = useDispatch();

  // Edit the task
  async function editTask() {
    const data = {
      description: desc,
    };
    const response = await axios.put(
      `http://localhost:3001/api/tasks/${id}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    if (response.data.status === true) {
      const temp = tasks.filter((task) => {
        return task.id === id ? { ...task, description: desc } : task;
      });
      dispatch(updateList([...temp]));
      setIsEdit(!isEdit);
    }
  }

  // delete the task
  async function deleteTask() {
    const response = await axios.delete(
      `http://localhost:3001/api/tasks/${id}`,
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    if (response.status === 200) {
      const updatedList = tasks.filter((task) => {
        return task.id !== id;
      });
      dispatch(updateList(updatedList));
    }
  }

  // start the task
  async function startTask() {
    const start = Date.now();
    const data = {
      start,
    };
    const response = await axios.put(
      `http://localhost:3001/api/tasks/${id}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    if (response.data.status === true) {
      const temp = tasks.filter((task) => {
        return task.id === id ? { ...task, status: 'running', start: response.data.task.start } : task;
      });
      dispatch(updateList([...temp]));
    }
  }

  // End the task
  async function endTask() {
    const end = Date.now();
    const data = {
      end,
    };
    const response = await axios.put(
      `http://localhost:3001/api/tasks/${id}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );

    if (response.data.status === true) {
      const temp = tasks.filter((task) => {
        return task.id === id ? {
          ...task, status: "complete",
          end: response.data.task.end
        } : task;
      });
      dispatch(updateList([...temp]));
    }
  }

  // render buttons
  const renderControls = () => {
    if (status === "pending") {
      return (
        <div className="flex" >
          <button className="mx-3 bg-blue-300 px-4 py-1 rounded-md " onClick={startTask}>Start</button>
          <button className="mx-3 bg-blue-300 px-4 py-1 rounded-md" onClick={endTask}>Stop</button>
        </div>
      );
    } else if (status === "running") {
      return (
        <div>
          <button disabled>Start</button>
          <button onClick={endTask}>Stop</button>
        </div>
      );
    } else {
      return;
    }
  };

  // open the modal to edit description
  function changeDescription() {
    return (
      <>
        {isEdit && <>  <input
          label="Task Description"
          required
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
          <button onClick={editTask}>
            <h2>Edit Task</h2>
          </button> </>}
      </>
    );
  }

  // time render component
  const renderTimer = () => {
    if (status !== "pending") {
      return <Timer start={start} end={end} />;
    }
    return;
  };

  return (
    <>

      <div className="overflow-x-auto">

        {changeDescription()}

        <table className="table w-full">
          <tbody>
            <tr>
              <th className="w-2" >{index + 1}</th>
              <td className="w-10"  >{desc}</td>
              <td className="w-20"  >{renderTimer()}</td>
              <td className="w-10"  >{renderControls()}</td>
              <td className="w-10"  >
                <button onClick={() => setIsEdit(true)}>
                  <EditIcon />
                </button>
                <button onClick={deleteTask}>
                  <DeleteIcon />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Task;
