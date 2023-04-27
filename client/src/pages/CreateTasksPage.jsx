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
      <div className="bg-gray-300 h-60 w-80 m-auto rounded-lg mt-10">
        <form
          onSubmit={taskCreation}
          className="flex flex-col justify-around items-center h-full"
        >
          <textarea
            type="text"
            className="flex rounded-sm resize-none w-56 h-20 outline-none p-1 "
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
