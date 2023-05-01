import React, { useState } from 'react';
import { FETCH_WRAPPER } from '../api';
import { editNote, getNotes, updateNote } from '../redux/fetchSlice';
import { useSelector, useDispatch } from 'react-redux';

const Note = ({ val }) => {
  const { title, description, createdAt } = val;

  const [isEdit, setIsEdit] = useState(false);
  const [editVal, seteditVal] = useState({ title, description });
  const { notes } = useSelector((store) => store.fetch);
  const dispatch = useDispatch();

  // onChange
  const handleChange = (e) => {
    const { name, value } = e.target;
    seteditVal({ ...editVal, [name]: value });
  };

  // edit details
  const editNotes = async (id) => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await FETCH_WRAPPER.put(`notes/${id}`, editVal, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response) {
        dispatch(getNotes());
        setIsEdit(!isEdit);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // Delete the Note
  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await FETCH_WRAPPER.delete(`notes/${id}`, editVal, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response);
      if (response) {
        const filteredNotes = notes.filter((v) => v._id !== id);
        dispatch(updateNote(filteredNotes));
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    // edit modal

    <div className='card min-w-[20vw] max-w-[20vw] h-auto rounded-xl bg-base-300 shadow-xl hover:shadow-2xl transition ease-in duration-200 cursor-pointer hover:scale-105'>
      <div className='card-body'>
        {isEdit ? (
          <input
            type='text'
            name='title'
            onChange={handleChange}
            value={editVal.title}
            id='title'
            placeholder='title'
          />
        ) : (
          <h2 className='card-title'>{title}</h2>
        )}
        {isEdit ? (
          <input
            type='text'
            name='description'
            onChange={handleChange}
            value={editVal.description}
            id='description'
            placeholder='description'
          />
        ) : (
          <p className='my-2'>{description}</p>
        )}
        <div className='card-actions justify-start'>
          <div className='badge badge-outline'>
            {new Date(createdAt).toDateString().slice(4)}
          </div>
        </div>
        <div className='card-actions justify-end'>
          {isEdit ? (
            <>
              <button
                className='btn btn-info'
                onClick={() => editNotes(val._id)}
              >
                Done
              </button>
              <button
                className='btn btn-error'
                onClick={() => setIsEdit(!isEdit)}
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              className='btn btn-info'
              onClick={() => setIsEdit(!isEdit)}
            >
              Edit
            </button>
          )}

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
