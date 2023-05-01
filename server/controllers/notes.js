import Notes from "../models/Notes.js"
import { validateObjectId } from "../utils/validation.js";

export const getNotes = async (req, res) => {
    try {
      const tasks = await Notes.find();
      res
        .status(200)
        .json({ tasks, status: true, message: "Notes found successfully..." });
    } catch (err) {
      console.error(err);
      return res
        .status(500)
        .json({ status: false, message: "Internal Server Error" });
    }
  };

  export const postNotes = async (req, res) => {
    try {
      const { title, description, createdUser } = req.body;
      if (!description) {
        return res
          .status(400)
          .json({ status: false, message: "Description of task not found" });
      }

      if (!title) {
        return res
          .status(400)
          .json({ status: false, message: "Title of task not found" });
      }

      const task = await Notes.create({ createdUser, description, title });
      res
        .status(200)
        .json({ task, status: true, message: "Task created successfully.." });
    } catch (err) {
      console.error(err);
      return res
        .status(500)
        .json({ status: false, message: "Internal Server Error" });
    }
  };

  export const updateNote = async (req,res)=> {
    try {
        if (!validateObjectId(req.params.noteId)) {
            return res.status(400).json({ status: false, message: "Note Id not valid" });
          }

          let note = await Notes.findById(req.params.noteId);
          if (!note) {
            return res
              .status(400)
              .json({ status: false, message: "Note with given id not found" });
          }

          note = await Notes.findByIdAndUpdate(
            req.params.noteId,
            { ...req.body },
            { new: true }
          );
          res
            .status(200)
            .json({ note, status: true, message: "Note updated successfully.." });

    } catch (error) {
        console.log('Error >> ',error)
    }
  }

  export const deleteNote = async (req,res)=> {
    if (!validateObjectId(req.params.noteId)) {
        return res.status(400).json({ status: false, message: "Task id not valid" });
      }

      let note = await Notes.findById(req.params.noteId);
    if (!note) {
      return res
        .status(400)
        .json({ status: false, message: "Note with given id not found" });
    }

    await Notes.findByIdAndDelete(req.params.noteId);
    res.status(200).json({ status: true, message: "Note deleted successfully" });
  }