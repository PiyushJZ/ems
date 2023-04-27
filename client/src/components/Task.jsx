import { useEffect, useState } from "react";
import { GrEdit, GrTrash } from "react-icons/gr";
import { useSelector, useDispatch } from "react-redux";
import { getTasks, updateList } from "../redux/fetchSlice";
import { FETCH_WRAPPER } from "../api";
import Timer from "./Timer";

function Task({ description, id, start, end, index }) {
  const [isEdit, setIsEdit] = useState(false);
  const [desc, setDesc] = useState(description);
  const dispatch = useDispatch();

  // Edit the task
  async function editTask() {
    const data = {
      description: desc,
    };
    const response = await FETCH_WRAPPER.put(`tasks/${id}`, data);
    if (response.data.status === true) {
      setIsEdit(!isEdit);
    } else {
      alert("Task description not changed");
    }
  }

  // delete the task
  async function deleteTask() {
    const response = await FETCH_WRAPPER.delete(`tasks/${id}`);
    if (response.status === 200) {
      dispatch(getTasks());
      alert("Task deleted Successfully");
    }
  }

  // start the task
  async function startTask() {
    const start = Date.now();
    const data = {
      start,
    };
    const response = await FETCH_WRAPPER.put(`tasks/${id}`, data);
    if (response.data.status === true) {
      dispatch(getTasks());
    }
  }

  // End the task
  async function endTask() {
    const end = Date.now();
    const data = {
      end,
    };
    const response = await FETCH_WRAPPER.put(`tasks/${id}`, data);

    if (response.data.status === true) {
      dispatch(getTasks());
    }
  }

  return (
    <tr>
      <th className="w-2">{index + 1}</th>
      <td className="w-10">
        {isEdit ? (
          <>
            <input
              className="input input-bordered input-sm w-full max-w-xs"
              type="text"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
            <button onClick={editTask} className="btn border-2 btn-info btn-sm">
              Change Description
            </button>
          </>
        ) : (
          <>{desc}</>
        )}
      </td>
      <td className="w-20">
        <Timer start={start} end={end} />
      </td>
      <td className="w-10">
        {start && end ? "Task Completed" : ""}{" "}
        {start && !end ? (
          <>
            <button
              disabled
              className="btn btn-info btn-sm"
              onClick={startTask}
            >
              Start
            </button>
            <button className="btn btn-error btn-sm" onClick={endTask}>
              Stop
            </button>
          </>
        ) : (
          ""
        )}{" "}
        {!start && !end ? (
          <>
            <button className="btn btn-info btn-sm" onClick={startTask}>
              Start
            </button>
            <button className="btn btn-error btn-sm" onClick={endTask}>
              Stop
            </button>
          </>
        ) : (
          ""
        )}
      </td>
      <td className="w-10">
        <button
          className="btn btn-info btn-sm"
          onClick={() => setIsEdit(!isEdit)}
        >
          <GrEdit />
        </button>
        <button className="btn btn-error btn-sm" onClick={deleteTask}>
          <GrTrash />
        </button>
      </td>
    </tr>
  );
}

export default Task;
