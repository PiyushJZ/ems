import React, { useEffect } from 'react';
import { getTasks } from '../../redux/fetchSlice';
import { useDispatch } from 'react-redux';

const Del = () => {

    const dispatch = useDispatch();
    
    useEffect(()=>{
       dispatch(getTasks());
    },[])

  return (
    <>
    
    </>
  )
}

export default Del