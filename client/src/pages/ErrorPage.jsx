import React from "react";
import { Link } from "react-router-dom";
import { GrHomeRounded } from "react-icons/gr";
import { PATHS } from "../router/paths";
const ErrorPage = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center bg-neutral-100">
      <div className="w-1/2 h-1/2 bg-neutral-300 rounded-xl shadow-lg">
        <div className="flex flex-col justify-center items-center w-full h-full gap-4 p-4">
          <h1 className="text-4xl md:text-5xl lg:text-8xl">404 Error</h1>
          <p className="text-lg md:text-2xl lg:text-4xl">Page doesnot exist</p>
          <Link
            className="btn w-[4rem] btn-info outline-none px-4 py-2 flex  gap-4 "
            to={PATHS.createTasks}
          >
            <GrHomeRounded size={20} />
          </Link>
          <span>click to go back to home</span>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
