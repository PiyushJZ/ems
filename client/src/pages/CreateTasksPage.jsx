import React from "react";
import { useState } from "react";
import { FETCH_WRAPPER } from "../api/index";
import { useNavigate } from "react-router-dom";
import { getTasks , updateList } from "../redux/fetchSlice";
import Swal from "sweetalert2";
import TaskList from "./TaskListPage";
import { useDispatch , useSelector } from "react-redux";
import { PATHS } from "../router/paths";


const CreateTasksPage = () => {
  const { tasks } = useSelector((state) => state.fetch);
  console.log(tasks);
  const [description, setDescription] = useState("");
  const navigate = useNavigate();
  const accessType = localStorage.getItem("accessType");
  const assignTask = localStorage.getItem("assignTask");

  const dispatch = useDispatch();

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

    const email = localStorage.getItem(
      accessType === "admin" ? "assignTask" : "email"
    );

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
          dispatch(getTasks());
          navigate(PATHS.adminPage);
          localStorage.removeItem('assignTask')
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
      <div className=" h-auto">
        <form className="py-8" onSubmit={taskCreation}>
          <h1 className="text-xl md:text-3xl lg:text-4xl font-semibold text-info mb-8 text-center">
            {accessType === "admin" ? "Task Assignmnent" : "Create Task"}
          </h1>

          <div className="flex px-5 md:mx-auto items-center justify-center flex-col gap-8">
            <input
              type="text"
              className="input input-info input-lg text-center w-full px-8 md:w-1/3"
              placeholder="enter task details"
              onChange={(e) => setDescription(e.target.value)}
            />
            <input
              type="submit"
              value={accessType === "amdin" ? "Assign a Task" : "Create Task"}
              className="btn btn-info btn-lg w-full px-8 md:w-1/3"
            />
          </div>
        </form>
      </div>

      {accessType !== "admin" && <TaskList />}
    </>
  );
};

export default CreateTasksPage;
