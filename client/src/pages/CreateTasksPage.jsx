import React from "react";
import { useState } from "react";
import { FETCH_WRAPPER } from "../api/index";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { PATHS } from "../router/paths";

const CreateTasksPage = () => {
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const taskCreation = async (e) => {
    e.preventDefault();

    if (!/[a-zA-Z0-9]/.test(description)) {
      // alert("please enter some text");
      Swal.fire({
        icon: "info",
        title: "Task should not be an empty field",
      });
      return;
    }

    const email = localStorage.getItem("email");

    const data = {
      email,
      description,
    };

    try {
      const response = await FETCH_WRAPPER.post("tasks", data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      console.log(response);
      if (response) {
        Swal.fire({
          icon: "success",
          title: "Task created successfully",
        }).then(() => {
          navigate(PATHS.taskList);
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: error.message,
      });
      console.log(error);
    }
  };

  return (
    <>
      <div className="max-w-screen h-[88vh]">
        <form
          className="w-full h-full flex flex-col gap-4 justify-center items-center"
          onSubmit={taskCreation}
        >
          <h1 className="text-xl md:text-3xl lg:text-4xl font-semibold text-info mb-8 text-center">
            Create Task
          </h1>

          <input
            type="text"
            className="input input-info input-lg text-center"
            placeholder="enter task details"
            onChange={(e) => setDescription(e.target.value)}
          />
          <input type="submit" value="Create Task" className="btn btn-info" />
        </form>
      </div>
    </>
  );
};

export default CreateTasksPage;
