import { useState } from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import { useSelector, useDispatch } from "react-redux";
import { updateList } from "../redux/taskListSlice";
import axios from "axios";
import Timer from "./Timer";

function Task({ description, status, id, start, end }) {
  const [isEdit, setIsEdit] = useState(false);
  const [desc, setDesc] = useState(description);
  const user = useSelector((state) => state.auth.user);
  const tasks = useSelector((state) => state.taskList.tasks);
  const dispatch = useDispatch();

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
        return task.id !== id;
      });
      const temp2 = tasks.filter((task) => {
        return task.id === id;
      });
      const updatedTask = {
        desc,
        id,
        status: temp2[0].status,
      };
      dispatch(updateList([...temp, updatedTask]));
      setIsEdit(false);
    }
  }
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
      const updatedTask = {
        description,
        id,
        status: "running",
        start: response.data.task.start,
      };
      const temp = tasks.filter((task) => {
        return task.id !== id;
      });
      dispatch(updateList([...temp, updatedTask]));
    }
  }
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
      const updatedTask = {
        description,
        id,
        status: "complete",
        start: response.data.task.start,
        end: response.data.task.end,
      };
      const temp = tasks.filter((task) => {
        return task.id !== id;
      });
      dispatch(updateList([...temp, updatedTask]));
    }
  }

  const renderControls = () => {
    if (status === "pending") {
      return (
        <div
          variant="contained"
          aria-label="outlined primary button group"
          sx={{ m: 1 }}
        >
          <button onClick={startTask}>Start</button>

          <button onClick={endTask}>Stop</button>
        </div>
      );
    } else if (status === "running") {
      return (
        <div
          variant="contained"
          aria-label="outlined primary button group"
          sx={{ m: 1 }}
        >
          <button disabled>Start</button>
          <button onClick={endTask}>Stop</button>
        </div>
      );
    } else {
      return;
    }
  };

  function renderDescription() {
    if (!isEdit) {
      return (
        <h2>
          {desc}
          {status === "complete" ? ": Complete" : ""}
        </h2>
      );
    }
    return (
      <>
        <input
          label="Task Description"
          required
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <button onClick={editTask}>
          <h2>Edit Task</h2>
        </button>
      </>
    );
  }

  const renderTimer = () => {
    if (status === "running") {
      return <Timer start={start} end={end} />;
    }
    return;
  };

  return (
    <>
      <div
        container
        flexDirection={"column"}
        justifyContent={"space-evenly"}
        alignItems={"center"}
        sx={{ bgcolor: "#e4e4f0", m: 1, p: 1.5 }}
      >
        <div item>{renderDescription()}</div>
        <div item>{renderTimer()}</div>
        <div item>
          <div
            variant="contained"
            aria-label="outlined primary button group"
            sx={{ m: 1 }}
          >
            <button onClick={() => setIsEdit(true)}>
              <EditIcon />
            </button>

            <button onClick={deleteTask}>
              <DeleteIcon />
            </button>
          </div>
        </div>
        <div item>{renderControls()}</div>
      </div>
    </>
  );
}

export default Task;
