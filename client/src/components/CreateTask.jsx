import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Alert from "@mui/material/Alert";
import axios from "axios";
import { useSelector } from "react-redux";

function CreateTask() {
  const [creation, setCreation] = useState(false);
  const [description, setDescription] = useState("Hello");
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);
  const user = useSelector((state) => state.auth.user);

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
      user: user.email,
      description,
    };
    axios
      .post("http://localhost:3001/api/tasks", data, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
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
          sx={{ m: 4 }}
        >
          <TextField
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            type="search"
            sx={{ m: 1 }}
          />
          <Button variant="contained" onClick={createTask} sx={{ m: 1 }}>
            <Typography>Add Task</Typography>
          </Button>
          <Snackbar
            open={success}
            autoHideDuration={4000}
            onClose={handleClose}
            action={action}
          >
            <Alert
              severity="success"
              onClose={handleClose}
              sx={{ width: "100%" }}
            >
              Task Created Successfully
            </Alert>
          </Snackbar>
          <Snackbar
            open={failure}
            autoHideDuration={4000}
            onClose={handleClose}
            action={action}
          >
            <Alert
              severity="error"
              onClose={handleClose}
              sx={{ width: "100%" }}
            >
              Task Creation Failed
            </Alert>
          </Snackbar>
        </Grid>
      );
    } else {
      return (
        <Button
          variant="contained"
          onClick={() => setCreation(true)}
          sx={{ m: 4 }}
        >
          <Typography variant="h6">Create Task</Typography>
          <AddIcon />
        </Button>
      );
    }
  };
  return <>{renderCreation()}</>;
}

export default CreateTask;
