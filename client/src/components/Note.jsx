import React from 'react';
import { FETCH_WRAPPER } from '../api';
import { updateNote } from '../redux/fetchSlice';
import { useSelector, useDispatch } from 'react-redux';

const Note = ({ val }) => {
  const { title, createdUser, description, createdAt } = val;

  const { notes } = useSelector((store) => store.fetch);
  const dispatch = useDispatch();

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await FETCH_WRAPPER.delete(`notes/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response) {
        const filteredNotes = notes.filter((v) => v._id !== id);
        dispatch(updateNote(filteredNotes));
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='card min-w-[20vw] max-w-[20vw] h-auto rounded-xl bg-base-300 shadow-xl hover:shadow-2xl transition ease-in duration-200 cursor-pointer hover:scale-105'>
      <div className='card-body'>
        <h2 className='card-title'>{title}</h2>
        <p className='my-2'>{description}</p>
        <div className='card-actions justify-start'>
          <div className='badge badge-outline'>
            {new Date(createdAt).toDateString().slice(4)}
          </div>
        </div>
        <div className='card-actions justify-end'>
          <button className='btn btn-info'>Edit</button>
          <button
            className='btn btn-error'
            onClick={() => handleDelete(val._id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Note;
