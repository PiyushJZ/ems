import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import "./Task.css";

function Task({ description, status }) {
  const renderControls = () => {
    if (status === "pending") {
      return (
        <ButtonGroup
          variant="contained"
          aria-label="outlined primary button group"
          sx={{ m: 1 }}
        >
          <Button>Start</Button>
          <Button>Stop</Button>
        </ButtonGroup>
      );
    } else {
      return;
    }
  };
  return (
    <>
      <Box sx={{ bgcolor: "#e4e4f0", m: 2, p: 1 }} className="box">
        <Typography sx={{ m: 0.5 }}>{description}</Typography>
        <ButtonGroup
          variant="contained"
          aria-label="outlined primary button group"
          sx={{ m: 1 }}
        >
          <Button>
            <EditIcon />
          </Button>
          <Button>
            <DeleteIcon />
          </Button>
        </ButtonGroup>
        {renderControls()}
      </Box>
    </>
  );
}

export default Task;
