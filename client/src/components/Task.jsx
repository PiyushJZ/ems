import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import "./Task.css"

function Task(props) {
  const renderControls = () => {
    if (props.props.status === "pending") {
      return (
        <ButtonGroup
          variant="contained"
          aria-label="outlined primary button group"
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
      <Box
        sx={{ bgcolor: "#e4e4f0", margin: "1rem", padding: "1rem" }}
        className="box"
      >
        <Typography>{props.props.description}</Typography>
        <ButtonGroup
          variant="contained"
          aria-label="outlined primary button group"
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
