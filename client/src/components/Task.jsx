import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from '@mui/icons-material/Edit';

function Task() {
  const description =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";
  return (
    <>
      <Box
        sx={{ bgcolor: "#e4e4f0", margin: "1rem", padding: "1rem" }}
        className="box"
      >
        <Typography>{description}</Typography>
        <ButtonGroup
          variant="contained"
          aria-label="outlined primary button group"
        >
          <Button>
            <EditIcon/>
          </Button>
          <Button>
            <DeleteIcon />
          </Button>
        </ButtonGroup>
        <ButtonGroup
          variant="contained"
          aria-label="outlined primary button group"
        >
          <Button>Start</Button>
          <Button>Stop</Button>
        </ButtonGroup>
      </Box>
    </>
  );
}

export default Task;
