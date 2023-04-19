import { Box, Typography } from "@mui/material";
import Task from "./Task";
import { useSelector } from "react-redux";

function TaskList() {
  const tasks = useSelector((state) => state.taskList.tasks);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const renderHeader = () => {
    if (tasks.length === 0) {
      if (isLoggedIn) {
        return (
          <Typography variant="h6" align="center">
            No Tasks Created Yet
          </Typography>
        );
      } else {
        return (
          <div>
            <Typography variant="h6" align="center">
              No Tasks Created Yet
            </Typography>
            <Typography variant="h6" align="center">
              Log in to create
            </Typography>
          </div>
        );
      }
    } else {
      return (
        <Typography variant="h6" align="center">
          Tasks
        </Typography>
      );
    }
  };

  return (
    <Box sx={{ mt: 6 }}>
      {renderHeader()}
      {tasks.map((task, index) => {
        return (
          <div key={index}>
            <Task description={task.description} status={task.status} />
          </div>
        );
      })}
    </Box>
  );
}

export default TaskList;
