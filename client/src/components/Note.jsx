import React, { useState } from "react";
import { FETCH_WRAPPER } from "../api";
import { editNote, getNotes, updateNote } from "../redux/fetchSlice";
import { useSelector, useDispatch } from "react-redux";

const Note = ({ val }) => {
  const { title, createdUser, description, createdAt } = val;

  const [isEdit, setIsEdit] = useState(false);
  const [editVal, seteditVal] = useState({ title, description, createdUser });
  const { notes } = useSelector((store) => store.fetch);
  const dispatch = useDispatch();

  // onChange
  const handleChange = (e) => {
    const { name, value } = e.target;
    seteditVal({ ...editVal, [name]: value });
  };

  // edit details
  const editNotes = async (id) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await FETCH_WRAPPER.put(`notes/${id}`, editVal, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response) {
        dispatch(getNotes());
        setIsEdit(!isEdit);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // Delete the Note
  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await FETCH_WRAPPER.delete(`notes/${id}`, editVal, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response);
      if (response) {
        const filteredNotes = notes.filter((v) => v._id !== id);
        dispatch(updateNote(filteredNotes));
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    // edit modal
    <>
      {isEdit && (
        <div className="min-w-[20vw] h-[50vh] ease-in duration-200 cursor-pointer hover:scale-105 bg-red-300">
          <br />
          <input
            type="text"
            name="title"
            onChange={handleChange}
            value={editVal.title}
            id="title"
            placeholder="title"
          />{" "}
          <br /> <br />
          <input
            type="text"
            name="description"
            onChange={handleChange}
            value={editVal.description}
            id="description"
            placeholder="description"
          />
          <br />
          <br />
          <button onClick={() => editNotes(val._id)}>Edit</button>
          <br />
          <br />
          <button onClick={() => setIsEdit(!isEdit)}>close</button>
        </div>
      )}
      {/* End edit modal */}
      <div className="min-w-[20vw] h-[50vh]  rounded-xl bg-base-200 shadow-lg hover:shadow-2xl transition ease-in duration-200 cursor-pointer hover:scale-105">
        <h4>{title}</h4>
        <h4>{createdUser}</h4>
        <h4>{description}</h4>
        <h4>{createdAt}</h4>
        <br />
        <br />
        <button onClick={() => setIsEdit(!isEdit)}>Edit</button>
        <br />
        <br />
        <button onClick={() => handleDelete(val._id)}>Delete</button>
      </div>
    </>
  );
};

export default Note;
