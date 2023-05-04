import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FETCH_WRAPPER } from "../api";
import Swal from "sweetalert2";
import NotesListPage from "./NotesListPage";
import { getNotes } from "../redux/fetchSlice";
import { useDispatch } from "react-redux";

const NotesPage = () => {
  const dispatch = useDispatch();

  const notesSchema = yup.object({
    title: yup
      .string()
      .max(25, "Title cannot be more than 25 characters!")
      .required("Title cannot be left empty"),
    description: yup.string().required("Description cannot be an empty field!"),
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(notesSchema),
  });
  const onSubmit = async (data) => {
    try {
      data["createdUser"] = localStorage.getItem("email");
      const response = FETCH_WRAPPER.post("/notes", data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      Swal.fire({
        icon: "success",
        title: "Note created successfully",
      }).then(() => dispatch(getNotes()));
      reset();
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: error.message,
      });
      console.log(err);
    }
  };

  // validate File
  const validateFile = (e) => {
    const val = e.target.value;
    const index = val.lastIndexOf(".");
    const extention = val.slice(index + 1, val.length).toLowerCase();
    console.log(index, val, extention);
    const bool = ["jpg", "jpeg", "jfif", "pjpeg", "pjp", "png"].includes(
      extention
    );

    if (bool) {
    }
  };

  return (
    <>
      <div className="max-w-screen h-[88vh]">
        <form
          className="w-full h-full flex flex-col gap-4 justify-center items-center"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h1 className="text-xl md:text-3xl lg:text-4xl font-semibold text-info mb-8 text-center">
            Create Note
          </h1>
          <input
            {...register("title")}
            name="title"
            placeholder="Enter Title"
            className="input input-info w-1/4"
            type="text"
          />
          <p className="text-rose-500">{errors.title?.message}</p>
          <input
            {...register("description")}
            name="description"
            placeholder="Enter Description"
            className="input input-info w-1/4"
            type="text"
          />
          <label htmlFor="file" className="btn btn-outline">
            <input
              type="file"
              id="file"
              name="file"
              placeholder="Choose File"
              className="input hidden"
              accept="image/*"
              onChange={validateFile}
            />
            Choose File
          </label>
          <p className="text-rose-500">{errors.description?.message}</p>
          <button className="btn btn-info w-1/4">Submit</button>
        </form>
      </div>

      <NotesListPage />
    </>
  );
};

export default NotesPage;
