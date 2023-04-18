import { Box, Typography } from '@mui/material';
import Task from './Task';
import { useEffect } from 'react';

function TaskList() {
  useEffect(() => {}, []);
  return (
    <Box sx={{ mt: 6 }}>
      <Typography
        variant='h6'
        align='center'
      >
        Tasks
      </Typography>
      <Task taskInfo={{ description: 'Fsdfa', status: 'done' }} />
      <Task taskInfo={{ description: 'jdkshfasdkljf', status: 'pending' }} />
    </Box>
  );
}

export default TaskList;
