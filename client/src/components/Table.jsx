import { ImListNumbered } from 'react-icons/im';
import { BsCalendarDate } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getAttendance, updateList } from '../redux/fetchSlice';
import { PATHS } from '../router/paths';
import Task from './Task';

const Table = ({ type, tasks }) => {
  const accessType = localStorage.getItem('accessType');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const renderTime = time => {
    if (isNaN(time)) {
      return;
    }
    return `${parseInt(time / 60 / 60)} : ${parseInt(time / 60) % 60} : ${
      parseInt(time) % 60
    }`;
  };

  const getTotalTime = task => {
    try {
      const totalTime = task.tasks.reduce((total, task) => {
        if (task.start && task.end) {
          const timeTaken = (new Date(task.end) - new Date(task.start)) / 1000;
          return total + timeTaken;
        }
        return total;
      }, 0);
      return renderTime(totalTime);
    } catch (err) {
      return '';
    }
  };

  return (
    <div className='overflow-x-auto'>
      <table className='table table-zebra w-full'>
        {/* Table Headers */}
        <thead>
          {type === 'employee' ? (
            <tr>
              <th>Sr. No.</th>
              <th>Task Description</th>
              <th>Status</th>
              <th>Date</th>
              {accessType === 'employee' ? <th>controls</th> : ''}
              <th>Options</th>
            </tr>
          ) : (
            <tr>
              <th>S no.</th>
              <th>employee email</th>
              <th>Attendance</th>
              <th>Tasks</th>
              <th>time taken</th>
            </tr>
          )}
        </thead>
        {/* Table Body */}
        <tbody>
          <>
            {type === 'employee'
              ? tasks.map((task, index) => {
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
                })
              : ''}
          </>
          <>
            {type === 'admin'
              ? tasks.map((task, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{task.email}</td>
                      <td>
                        <button
                          className='btn btn-primary btn-square'
                          onClick={() => {
                            localStorage.setItem('assignTask', task.email);
                            dispatch(getAttendance());
                            navigate(PATHS.attendance);
                          }}
                        >
                          <BsCalendarDate />
                        </button>
                      </td>
                      <td>
                        <button
                          onClick={() => {
                            localStorage.setItem('assignTask', task.email);
                            dispatch(updateList(task.tasks));
                            navigate(PATHS.adminPage + PATHS.createTasks);
                          }}
                          className='btn btn-accent btn-circle'
                        >
                          <ImListNumbered />
                        </button>
                      </td>
                      <td>{getTotalTime(task)}</td>
                    </tr>
                  );
                })
              : ''}
          </>
        </tbody>
      </table>
    </div>
  );
};

export default Table;
