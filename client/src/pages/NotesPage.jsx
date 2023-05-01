import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
const NotesPage = () => {
  const notesSchema = yup.object({
    title: yup
      .string()
      .max(25, "Title cannot be more than 25 characters!")
      .required("Title cannot be an empty string"),
    description: yup.string().required("Description cannot be an empty field!"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(notesSchema),
  });
  const onSubmit = (data) => console.log("NOTES DATA: ", data);
  return (
    <>
      <div className="w-screen h-screen p-8">
        <form
          className="w-full h-full flex flex-col gap-4 justify-center items-center"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h1 className="text-xl md:text-3xl lg:text-4xl font-semibold text-info mb-8 text-center">
            Create Notes
          </h1>
          <input
            {...register("title")}
            name="title"
            placeholder="enter title"
            className="input input-info w-1/4"
            type="text"
          />
          <p className="text-rose-500">{errors.title?.message}</p>
          <textarea
            {...register("description")}
            name="description"
            placeholder="enter description"
            className="textarea textarea-info  w-1/4 h-auto"
            type="text"
          />
          <p className="text-rose-500">{errors.description?.message}</p>
          <button className="btn btn-info w-1/4">Submit</button>
        </form>
      </div>
    </>
  );
};

export default NotesPage;
