import React from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { getTasks } from '../redux/fetchSlice';
import Task from '../components/Task';

const TaskList = () => {
  const { tasks } = useSelector((state) => state.fetch);
  const accessType = localStorage.getItem('accessType');
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== '/admin-page/task-list') {
      dispatch(getTasks());
    }
  }, []);

  const renderHeader = () => {
    if (tasks.length === 0) {
      if (isLoggedIn) {
        return <h6>No Tasks Created Yet</h6>;
      } else {
        return (
          <div>
            <h6>No Tasks Created Yet</h6>
            <h6>Log in to create</h6>
          </div>
        );
      }
    } else {
      return <h6>Tasks</h6>;
    }
  };

  return (
    <div className='z-10'>
      {/* {renderHeader()} */}
      <div className='overflow-x-auto'>
        {/* if task is not present so we can not show table */}
        {tasks.length > 0 ? (
          <table className='table table-zebra w-full'>
            {/* head */}
            <thead>
              <tr>
                <th>Sr. No.</th>
                <th>Task Description</th>
                <th>Status</th>
                <th>Date</th>
                {accessType === 'employee' ? <th>controls</th> : ''}
                <th>Options</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task, index) => {
                return (
                  <Task
                    key={task._id}
                    index={index}
                    description={task.description}
                    status={task.status}
                    id={task._id}
                    start={task?.start}
                    end={task?.end}
                  />
                );
              })}
            </tbody>
          </table>
        ) : (
          <div className='flex justify-center items-center bg-red-100 w-full h-16'>
            <h2 className='text-lg font-medium'>No Tasks Found</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskList;
