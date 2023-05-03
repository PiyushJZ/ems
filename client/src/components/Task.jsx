import { useState } from 'react';
import { GrEdit, GrTrash } from 'react-icons/gr';
import { useDispatch, useSelector } from 'react-redux';
import { getTasks, updateList } from '../redux/fetchSlice';
import { FETCH_WRAPPER } from '../api';
import Timer from './Timer';
import Swal from 'sweetalert2';

function Task({ description, id, start, end, index }) {
  const { tasks } = useSelector((state) => state.fetch);
  const [isEdit, setIsEdit] = useState(false);
  const [desc, setDesc] = useState(description);
  const accessType = localStorage.getItem('accessType');
  const dispatch = useDispatch();

  // Edit the task
  async function editTask() {
    const data = {
      description: desc,
    };
    const response = await FETCH_WRAPPER.put(`tasks/${id}`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
      },
    });
    if (response.data.status === true) {
      setIsEdit(!isEdit);
    } else {
      alert('Task description not changed');
    }
  }

  // delete the task
  async function deleteTask() {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.value) {
        const response = await FETCH_WRAPPER.delete(`tasks/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          },
        });
        if (response.status === 200) {
          if (accessType === 'admin') {
            dispatch(updateList(tasks.filter((task) => task._id !== id)));
          } else {
            dispatch(getTasks());
          }
          Swal.fire({
            icon: 'success',
            title: 'task deleted successfully',
          });
        }
      } else {
        Swal('Task is not deleted');
      }
    });
  }

  // start the task
  async function startTask() {
    const start = Date.now();
    const data = {
      start,
    };
    const response = await FETCH_WRAPPER.put(`tasks/${id}`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
      },
    });
    if (response.data.status === true) {
      dispatch(getTasks());
    }
  }

  // End the task
  async function endTask() {
    if (!start) {
      alert('NOT ALLOWED');
      return;
    }
    const end = Date.now();
    const data = {
      end,
    };
    const response = await FETCH_WRAPPER.put(`tasks/${id}`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
      },
    });

    if (response.data.status === true) {
      dispatch(getTasks());
    }
  }

  return (
    <tr>
      <th className='w-2'>{index + 1}</th>
      {isEdit ? (
        <>
          <td className='w-10 max-w-[200px] overflow-auto whitespace-nowrap'>
            <input
              className='input max-w-[200px] relative input-bordered input-sm'
              type='text'
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
            <button
              onClick={editTask}
              className='btn border-2 btn-info btn-sm absolute mx-2'
            >
              Change Description
            </button>
          </td>
        </>
      ) : (
        <>
          <td className='w-10 max-w-[200px] relative overflow-auto whitespace-nowrap'>
            {desc}
          </td>
        </>
      )}
      <td className='w-20'>
        {!start && !end ? 'Not Yet Started' : ''}
        {start ? (
          <Timer
            start={start}
            end={end}
          />
        ) : (
          ''
        )}
      </td>
      {/* new Date column added */}
      <td className='w-20'>
        {!end ? 'Task not Completed' : ''}
        {start ? <Timer end={end} /> : ''}
      </td>
      {/* new Date column ended */}
      {accessType === 'employee' ? (
        <td className='w-10'>
          {start && end ? 'Task Completed' : ''}
          {start && !end ? (
            <div className='flex gap-4'>
              <button
                disabled
                className='btn btn-info btn-sm'
              >
                Start
              </button>
              <button
                className='btn btn-error btn-sm'
                onClick={endTask}
              >
                Stop
              </button>
            </div>
          ) : (
            ''
          )}
          {!start && !end ? (
            <div className='flex gap-4'>
              <button
                className='btn btn-success btn-sm'
                onClick={startTask}
              >
                Start
              </button>
              <button
                className='btn btn-warning btn-sm'
                onClick={endTask}
              >
                Stop
              </button>
            </div>
          ) : (
            ''
          )}
        </td>
      ) : (
        ''
      )}

      <td className='w-10'>
        <button
          className='btn btn-info btn-sm'
          onClick={() => {
            setIsEdit(!isEdit);
            setDesc(description);
          }}
        >
          <GrEdit />
        </button>
        <button
          className='btn btn-error ml-4 btn-sm'
          onClick={deleteTask}
        >
          <GrTrash />
        </button>
      </td>
    </tr>
  );
}

export default Task;
