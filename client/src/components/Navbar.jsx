import React, { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { PATHS } from "../router/paths";
import { useSelector } from "react-redux";
const Navbar = () => {
  const navigate = useNavigate();
  const { auth } = useSelector((x) => x.auth);
  console.log("AUTH: ", auth);
  const [toggleLogout, setToggleLogout] = useState(false);
  const handleToggle = () => {
    setToggleLogout((previousToggle) => !previousToggle);
  };

  const handleLogout = () => {
    const token = localStorage.getItem("authToken");
    if (token) {
      localStorage.removeItem("authToken");
      navigate(PATHS.root);
    } else {
      setToggleLogout((prevoiusToggleState) => !prevoiusToggleState);
    }
  };

  return (
    <nav className="fixed w-screen py-6 bg-base-300 px-4 md:px-6 lg:px-8 border-b-[1px] border-base-100 transition duration-150">
      <div className="max-w-full mx-auto flex justify-between">
        <h1>Tasks Logger</h1>

        <div
          onClick={() => handleToggle()}
          className="cursor-pointer flex justify-center items-center"
        >
          <BsThreeDotsVertical size={24} />
        </div>
      </div>
      {/* toggle menu */}
      {toggleLogout && (
        <aside className="absolute top-20 rounded-lg right-10 w-[10rem] h-auto bg-neutral-content">
          <div className="w-full">
            <button
              onClick={() => handleLogout()}
              className="btn btn-primary w-full"
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
