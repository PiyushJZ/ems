import React from "react";
import { useState } from "react";
import { FETCH_WRAPPER } from "../api/index";

const CreateTasksPage = () => {
  const [description, setDescription] = useState("");

  const taskCreation = async (e) => {
    e.preventDefault();

    if (!/[a-zA-Z0-9]/.test(description)) {
      alert("please enter some text");
      return;
    }

    const email = localStorage.getItem("email");

    const data = {
      email,
      description,
    };

    try {
      const response = await FETCH_WRAPPER.post("tasks", data);
      console.log(response);
      if (response) {
        alert("Task created successfully");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="w-screen h-[92.5vh] mx-auto flex flex-col justify-start items-center py-20">
        <h1 className="text-center text-6xl mb-10 ">Create Task</h1>
        <form onSubmit={taskCreation} className="flex flex-col gap-4">
          <input
            type="text"
            className="input input-info"
            defaultValue={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input type="submit" value="Create Task" className="btn" />
        </form>
      </div>
    </>
  );
};

export default CreateTasksPage;
