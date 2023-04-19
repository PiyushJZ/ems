import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useSelector, useDispatch } from 'react-redux';
import { updateList } from '../redux/taskListSlice';
import axios from 'axios';
import './Task.css';

function Task({ description, status, id }) {
  const user = useSelector((state) => state.auth.user);
  const tasks = useSelector((state) => state.taskList.tasks);
  const dispatch = useDispatch();
  function editTask() {}
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
    if (response.status === 200) {
      updatedTask = {
        description,
        id,
        status: 'running',
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

    if (response.status === 200) {
      updatedTask = {
        description,
        id,
        status: 'complete',
      };
      const temp = tasks.filter((task) => {
        return task.id !== id;
      });
      dispatch(updateList([...temp, updatedTask]));
    }
  }

  const renderControls = () => {
    if (status === 'pending') {
      return (
        <ButtonGroup
          variant='contained'
          aria-label='outlined primary button group'
          sx={{ m: 1 }}
        >
          <Button onClick={startTask}>Start</Button>
          <Button onClick={endTask}>Stop</Button>
        </ButtonGroup>
      );
    } else if (status === 'running') {
      return (
        <ButtonGroup
          variant='contained'
          aria-label='outlined primary button group'
          sx={{ m: 1 }}
        >
          <Button disabled>Start</Button>
          <Button onClick={endTask}>Stop</Button>
        </ButtonGroup>
      );
    } else {
      return;
    }
  };
  return (
    <>
      <Box
        sx={{ bgcolor: '#e4e4f0', m: 2, p: 1, width: '300%' }}
        className='box'
      >
        <Typography sx={{ m: 0.5 }}>{description}</Typography>
        <ButtonGroup
          variant='contained'
          aria-label='outlined primary button group'
          sx={{ m: 1 }}
        >
          <Button onClick={editTask}>
            <EditIcon />
          </Button>
          <Button onClick={deleteTask}>
            <DeleteIcon />
          </Button>
        </ButtonGroup>
        {renderControls()}
      </Box>
    </>
  );
}

export default Task;
