import AddIcon from "@mui/icons-material/Add";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button"

function CreateTask() {
    const createTask = () => {
        console.log("createTask")
    }
    return (
      <Button onClick={createTask}>
        <Typography variant="h6">Create Task</Typography>
        <AddIcon />
      </Button>
    );
  }

  export default CreateTask