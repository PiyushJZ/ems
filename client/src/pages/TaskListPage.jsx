import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getTasks } from '../redux/fetchSlice';
import { useDispatch, useSelector } from 'react-redux';
import Table from '../components/Table';

const TaskList = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { tasks } = useSelector((state) => state.fetch);

  useEffect(() => {
    if (location.pathname !== '/admin-page/create-task') {
      dispatch(getTasks());
    }
  }, []);

  return (
    <div className='z-10'>
      {tasks.length > 0 ? (
        <Table
          type={'employee'}
          tasks={tasks}
        />
      ) : (
        <div className='flex justify-center items-center bg-red-100 w-full h-16'>
          <h2 className='text-lg font-medium'>No Tasks Found</h2>
        </div>
      )}
    </div>
  );
};

export default TaskList;
