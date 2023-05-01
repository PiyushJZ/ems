import React from "react";

const NotesPage = () => {
  return (
    <>
      <div className="w-screen h-screen p-8 flex flex-col gap-4 justify-center items-center">
        <div>
          <h1 className="text-xl md:text-3xl lg:text-4xl text-primary mb-8">
            Create tasks
          </h1>
          <input
            placeholder="enter title"
            className="input input-primary w-1/4"
            type="text"
          />
          <input
            placeholder="enter description"
            className="input input-primary w-1/4"
            type="text"
          />
          <button className="btn btn-info w-1/4">Submit</button>
        </div>
      </div>
    </>
  );
};

export default NotesPage;
