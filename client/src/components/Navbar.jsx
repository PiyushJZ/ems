import React, { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { PATHS } from "../router/paths";
const Navbar = () => {
  const navigate = useNavigate();
  const [toggleLogout, setToggleLogout] = useState(false);
  const handleToggle = () => {
    setToggleLogout((previousToggle) => !previousToggle);
  };

  const handleLogout = () => {
    const token = localStorage.getItem("authToken");
    if (token) {
      localStorage.removeItem("authToken");
      navigate(PATHS.root);
    }
    setToggleLogout((prevoiusToggleState) => !prevoiusToggleState);
  };

  const handlePageChange = (path) => {
    setToggleLogout(false);
    switch (path) {
      case PATHS.taskList:
        return navigate(PATHS.taskList);
      case PATHS.createTasks:
        return navigate(PATHS.createTasks);

      default:
        break;
    }
  };

  return (
    <nav className="relative w-screen py-6 bg-base-300 px-4 md:px-6 lg:px-8 border-b-[1px] border-base-100 transition duration-150">
      <div className="max-w-full mx-auto flex justify-between">
        <h1>Tasks Logger</h1>

        {localStorage.getItem("authToken") && (
          <div
            onClick={() => handleToggle()}
            className="cursor-pointer flex justify-center items-center"
          >
            <BsThreeDotsVertical size={24} />
          </div>
        )}
      </div>
      {/* toggle menu */}
      {toggleLogout && (
        <aside className="absolute z-50 top-20 rounded-lg right-10 w-[10rem] h-auto">
          <div className="w-full flex flex-col gap-5">
            <button
              className="btn btn-primary w-full"
              onClick={() => handlePageChange(PATHS.createTasks)}
            >
              Create Tasks
            </button>
            <button
              onClick={() => handlePageChange(PATHS.taskList)}
              className="btn btn-primary w-full"
            >
              Task List
            </button>
            <button
              onClick={() => handleLogout()}
              className="btn btn-error w-full"
            >
              Logout
            </button>
          </div>
        </aside>
      )}
    </nav>
  );
};

export default Navbar;
