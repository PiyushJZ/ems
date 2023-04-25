import { useState } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import { useSelector, useDispatch } from "react-redux";
import { updateList } from "../redux/taskListSlice";
import axios from "axios";

function Task({ description, status, id }) {
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
        <ButtonGroup
          variant="contained"
          aria-label="outlined primary button group"
          sx={{ m: 1 }}
        >
          <Tooltip title="Start Task" arrow placement="left">
            <Button onClick={startTask}>Start</Button>
          </Tooltip>
          <Tooltip title="Stop Task" arrow placement="right">
            <Button onClick={endTask}>Stop</Button>
          </Tooltip>
        </ButtonGroup>
      );
    } else if (status === "running") {
      return (
        <ButtonGroup
          variant="contained"
          aria-label="outlined primary button group"
          sx={{ m: 1 }}
        >
          <Tooltip title="Start Task" arrow placement="left">
            <Button disabled>Start</Button>
          </Tooltip>
          <Tooltip title="Stop Task" arrow placement="right">
            <Button onClick={endTask}>Stop</Button>
          </Tooltip>
        </ButtonGroup>
      );
    } else {
      return;
    }
  };

  function renderDescription() {
    if (!isEdit) {
      return (
        <Typography sx={{ m: 0.5 }}>
          {desc}
          {status === "complete" ? ": Complete" : ""}
        </Typography>
      );
    }
    return (
      <>
        <TextField
          label="Task Description"
          required
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          type="search"
          sx={{ m: 1 }}
        />
        <Button variant="contained" onClick={editTask} sx={{ m: 1 }}>
          <Typography>Edit Task</Typography>
        </Button>
      </>
    );
  }

  return (
    <>
      <Box
        sx={{ bgcolor: "#e4e4f0", m: 2, p: 1, width: "300%" }}
        className="box"
      >
        {renderDescription()}
        <ButtonGroup
          variant="contained"
          aria-label="outlined primary button group"
          sx={{ m: 1 }}
        >
          <Tooltip title="Edit" arrow placement="left">
            <Button onClick={() => setIsEdit(true)}>
              <EditIcon />
            </Button>
          </Tooltip>
          <Tooltip title="Delete" arrow placement="right">
            <Button onClick={deleteTask}>
              <DeleteIcon />
            </Button>
          </Tooltip>
        </ButtonGroup>
        {renderControls()}
      </Box>
    </>
  );
}

export default Task;
