import Task from "./Task";

function TaskList() {
  return (
    <div>
      <Task props={{description: "Fsdfa", status: "done"}}/>
      <Task props={{description: "jdkshfasdkljf", status: "pending"}}/>
    </div>
  );
}

export default TaskList;
