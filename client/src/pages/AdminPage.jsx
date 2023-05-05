import React from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getTasks } from '../redux/fetchSlice';
import Table from '../components/Table';

const AdminPage = () => {
  const { tasks } = useSelector((state) => state.fetch);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTasks());
  }, []);

  const renderTable = () => {
    return (
      <div>
        <Table
          type={'admin'}
          tasks={tasks}
        />
      </div>
    );
  };

  return <>{renderTable()}</>;
};

export default AdminPage;
