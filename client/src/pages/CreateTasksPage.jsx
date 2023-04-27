import React from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FETCH_WRAPPER } from "../api/index";

const CreateTasksPage = () => {
  const [description, setDescription] = useState("");
  const user = useSelector((state) => state.auth.user);
  const tasks = useSelector((state) => state.fetch.tasks);
  const dispatch = useDispatch();

  console.log("AUTH USER:  ", user);

  const taskCreation = async (e) => {
    e.preventDefault();
    const data = {
      user: user?.email,
      description,
    };
    try {
      const response = await FETCH_WRAPPER.post("/tasks", data);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h2>create task page</h2>
      <div className="bg-gray-300 mt-20 relative z-10 ">
        <form onSubmit={taskCreation}>
          <input
            type="text"
            className="border-4"
            onChange={(e) => setDescription(e.target.value)}
          />
          <input type="submit" value="Submit" />
        </form>
      </div>
    </>
  );
};

export default CreateTasksPage;
