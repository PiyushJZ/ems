import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Snackbar from "@mui/material/Snackbar";
import  IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close"
import axios from "axios";

function CreateTask() {
  const [creation, setCreation] = useState(false);
  const [description, setDescription] = useState("Hello");
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);

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
    axios
      .post("http://localhost:3001/api/tasks", {
        description,
      })
      .then((response) => {
        console.log(response);
        setSuccess(true);
        setCreation(false);
      })
      .catch((err) => {
        console.log(err);
        setFailure(true);
        setCreation(false);
      });
  };

  const renderCreation = () => {
    if (creation) {
      return (
        <Grid
          container
          direction="column"
          justifyContent="space-between"
          alignItems="center"
        >
          <TextField
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            type="search"
          />
          <Button variant="contained" onClick={createTask}>
            <Typography>Add Task</Typography>
          </Button>
          <Snackbar
            open={success}
            severity="success"
            autoHideDuration={6000}
            onClose={handleClose}
            message="Task Created Successfully"
            action={action}
          />
          <Snackbar
            open={failure}
            severity="error"
            autoHideDuration={6000}
            onClose={handleClose}
            message="Task Creation Failed"
            action={action}
          />
        </Grid>
      );
    } else {
      return (
        <Button variant="contained" onClick={() => setCreation(true)}>
          <Typography variant="h6">Create Task</Typography>
          <AddIcon />
        </Button>
      );
    }
  };
  return <>{renderCreation()}</>;
}

export default CreateTask;
