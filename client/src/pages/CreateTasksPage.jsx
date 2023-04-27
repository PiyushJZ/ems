import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { updateList } from "../redux/taskListSlice";

function CreateTask() {
  const [creation, setCreation] = useState(false);
  const [description, setDescription] = useState("");
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const tasks = useSelector((state) => state.taskList.tasks);
  const dispatch = useDispatch();
  console.log("AUTH USER:  ", user);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSuccess(false);
    setFailure(false);
  };

  const action = (
    <IconButton
      size="small"
      aria-label="close"
      color="inherit"
      onClick={handleClose}
    >
      <CloseIcon fontSize="small" />
    </IconButton>
  );

  const createTask = () => {
    const data = {
      user: user?.email,
      description,
    };
    axios
      .post("http://localhost:3001/api/tasks", data, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })
      .then((response) => {
        const newTask = {
          description: response.data.task.description,
          status: "pending",
          id: response.data.task._id,
        };
        dispatch(updateList([...tasks, newTask]));
        setDescription("");
        setSuccess(true);
        setCreation(false);
      })
      .catch((err) => {
        console.log(err);
        setDescription("");
        setFailure(true);
        setCreation(false);
      });
  };

  // const renderCreation = () => {
  //   if (creation) {
  //     return (
  //       <div>
  //         <Navbar />
  //         <input
  //           label="Task Description"
  //           required
  //           value={description}
  //           onChange={(e) => setDescription(e.target.value)}
  //         />
  //         <button onClick={createTask}>
  //           <Typography>Add Task</Typography>
  //         </button>
  //       </div>
  //     );
  //   } else {
  //     return (
  //       <button onClick={() => setCreation(true)}>
  //         <h6>Create Task</h6>
  //       </button>
  //     );
  //   }
  // };

  return (
    <>
      <h2>create task page</h2>
      {/* {renderCreation()}
      <Navbar />
      <Snackbar
        open={success}
        autoHideDuration={4000}
        onClose={handleClose}
        action={action}
      >
        <Alert severity="success" onClose={handleClose} sx={{ width: "100%" }}>
          Task Created Successfully
        </Alert>
      </Snackbar>
      <Snackbar
        open={failure}
        autoHideDuration={4000}
        onClose={handleClose}
        action={action}
      >
        <Alert severity="error" onClose={handleClose} sx={{ width: "100%" }}>
          Task Creation Failed
        </Alert>
      </Snackbar> */}
    </>
  );
}

export default CreateTask;
