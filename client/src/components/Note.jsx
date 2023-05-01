import React from "react";
import { FETCH_WRAPPER } from "../api";
import { updateNote } from "../redux/fetchSlice";
import { useSelector , useDispatch } from "react-redux";

const Note = ({ val }) => {
  const { title, createdUser, description, createdAt } = val;

  const { notes } = useSelector((store) => store.fetch);
  const dispatch = useDispatch();

  console.log(notes);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await FETCH_WRAPPER.delete(`notes/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response) {
        const filteredNotes = notes.filter((v) => v._id !== id);
        dispatch(updateNote(filteredNotes));
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-w-[20vw] h-[50vh]  rounded-xl bg-base-200 shadow-lg hover:shadow-2xl transition ease-in duration-200 cursor-pointer hover:scale-105">
      <h4>{title}</h4>
      <h4>{createdUser}</h4>
      <h4>{description}</h4>
      <h4>{createdAt}</h4>
      <br />
      <br />
      <button>Edit</button>
      <br />
      <br />
      <button onClick={() => handleDelete(val._id)}>Delete</button>
    </div>
  );
};

export default Note;
