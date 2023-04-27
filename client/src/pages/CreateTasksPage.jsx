import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FETCH_WRAPPER } from "../api";

function CreateTask() {
  const [description, setDescription] = useState("");
  const user = useSelector((state) => state.auth.user);
  const tasks = useSelector((state) => state.fetch.tasks);
  const dispatch = useDispatch();

  console.log("AUTH USER:  ", user);

  const taskCreation = async (e) => {
  //   e.preventDefault();
  //   console.log("hi");
  //   const data = {
  //     user: user?.email,
  //     description,
  //   };

  //   try {
  //     const response = await FETCH_WRAPPER.post('/tasks' , data);
  //     console.log(response);
  //     // if(response){
  //     //   dispatch(updateList([]))
  //     // }
  //   } catch (error) {
  //     console.log(error);
  //   }
  };

  return (
    <>
      <div className="flex align-center justify-center">
        <h2 >create task page</h2>
        <div className="bg-gray-300">
          <form>
            <input type="text" onChange={(e)=>setDescription(e.target.value)} />
            <input type="submit" value="Submit" onClick={taskCreation} />
          </form>
        </div>
      </div>
    </>
  );
}

export default CreateTask;
