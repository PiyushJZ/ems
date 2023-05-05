import Task from './Task';

const Table = ({ type, tasks }) => {
  const accessType = localStorage.getItem('accessType');

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
              <th></th>
              <th>employee email</th>
              <th>tasks</th>
              <th>time taken</th>
            </tr>
          )}
        </thead>
        {/* Table Body */}
        <tbody>
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
        </tbody>
      </table>
    </div>
  );
};

export default Table;
