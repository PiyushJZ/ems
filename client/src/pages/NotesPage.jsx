import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { FETCH_WRAPPER } from '../api';
import Swal from 'sweetalert2';
const NotesPage = () => {
  const notesSchema = yup.object({
    title: yup
      .string()
      .max(25, 'Title cannot be more than 25 characters!')
      .required('Title cannot be left empty'),
    description: yup.string().required('Description cannot be an empty field!'),
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(notesSchema),
  });
  const onSubmit = async (data) => {
    try {
      data['createdUser'] = localStorage.getItem('email');
      const response = FETCH_WRAPPER.post('/notes', data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      });
      Swal.fire({
        icon: 'success',
        title: 'Note created successfully',
      });
      reset();
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: error.message,
      });
      console.log(err);
    }
  };
  return (
    <>
      <div className='max-w-screen h-screen p-8'>
        <form
          className='w-full h-full flex flex-col gap-4 justify-center items-center'
          onSubmit={handleSubmit(onSubmit)}
        >
          <h1 className='text-xl md:text-3xl lg:text-4xl font-semibold text-info mb-8 text-center'>
            Create Note
          </h1>
          <input
            {...register('title')}
            name='title'
            placeholder='Enter Title'
            className='input input-info w-1/4'
            type='text'
          />
          <p className='text-rose-500'>{errors.title?.message}</p>
          <input
            {...register('description')}
            name='description'
            placeholder='Enter Description'
            className='input input-info w-1/4'
            type='text'
          />
          <p className='text-rose-500'>{errors.description?.message}</p>
          <button className='btn btn-info w-1/4'>Submit</button>
        </form>
      </div>
    </>
  );
};

export default NotesPage;
