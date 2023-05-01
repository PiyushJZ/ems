import React from "react";
import { Note } from "../components";

const NotesListPage = () => {
  return (
    <div className="w-screen h-auto">
      <h1 className="py-8 text-4xl text-center">Notes List</h1>
      <div className="p-8 w-full h-full flex flex-wrap gap-6 justify-center">
        <Note />
        <Note />
        <Note />
        <Note />
        <Note />
      </div>
      <Note />
    </div>
  );
};

export default NotesListPage;
