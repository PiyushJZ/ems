import React from 'react';
import { useEffect } from 'react';
import { ImListNumbered } from 'react-icons/im';
import { useSelector, useDispatch } from 'react-redux';
import { getTasks, updateList } from '../redux/fetchSlice';
import { PATHS } from '../router/paths';
import { useNavigate } from 'react-router-dom';

const AdminPage = () => {
  const { tasks } = useSelector((state) => state.fetch);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log('TASKS: ', tasks);

  useEffect(() => {
    dispatch(getTasks());
  }, []);

  const renderTime = (time) => {
    if (isNaN(time)) {
      return;
    }
    return `${parseInt(time / 60 / 60)} : ${parseInt(time / 60) % 60} : ${
      parseInt(time) % 60
    }`;
  };

  const getTotalTime = (userEmail) => {
    const userTasks = tasks[userEmail];
    const totalTime = userTasks.reduce((total, task) => {
      if (task.start && task.end) {
        const timeTaken = (new Date(task.end) - new Date(task.start)) / 1000;
        return total + timeTaken;
      }
      return total;
    }, 0);
    return renderTime(totalTime);
  };

  const renderTable = () => {
    return (
      <div className='overflow-x-auto'>
        <table className='table table-zebra w-full'>
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>employee email</th>
              <th>tasks</th>
              <th>time taken</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(tasks).map((userEmail, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{userEmail}</td>
                  <td>
                    <button
                      onClick={() => {
                        dispatch(updateList(tasks[userEmail]));
                        return navigate(PATHS.adminPage + PATHS.taskList);
                      }}
                      className='btn btn-accent btn-sm'
                    >
                      <ImListNumbered />
                    </button>
                  </td>
                  <td>{getTotalTime(userEmail)}</td>
                  {/* <td>"dfasdfa"</td> */}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };

  return <>{renderTable()}</>;
};

export default AdminPage;
