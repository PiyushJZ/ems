import Notes from "../models/Notes.js"
import { validateObjectId } from "../utils/validation.js";
import {v2 as cloudinary} from "cloudinary"

cloudinary.config({
  cloud_name:"dmpm3z3us",
  api_key:"726228357198369",
  api_secret:"dlT11EWoYDZiSLA3YOLhmsghwT8"
})

export const getNotes = async (req, res) => {
  try {
    const notes = await Notes.find();
    res
      .status(200)
      .json({ notes, status: true, message: 'Notes found successfully...' });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ status: false, message: 'Internal Server Error' });
  }
};

export const postNotes = async (req, res) => {
  try {
    const { title, description, createdUser } = req.body;
    if (!description) {
      return res
        .status(400)
        .json({ status: false, message: 'Description of note not found' });
    }
  };

  export const postNotes = async (req, res) => {
    try {
      // File Uploadation
      const isFile = req.files;

      if(isFile){
        const file = req.files.image;
        await cloudinary.uploader.upload(file.tempFilePath, (error, result) => {
          req.body.fileUrl = result.url
        })
      }
      console.log(req.body)

      // checks for other fields

      const { title, description, createdUser, fileUrl } = req.body;


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

      if (!createdUser) {
        return res
          .status(400)
          .json({ status: false, message: "Created User ID not found" });
      }

      if (!validateObjectId(createdUser)) {
        return res.status(400).json({ status: false, message: "Created User ID is not valid" });
      }

      const task = await Notes.create({ createdUser, description, title, image:fileUrl });
      res
        .status(200)
        .json({ task, status: true, message: "Task created successfully.." });
    } catch (err) {
      return res
        .status(500)
        .json({ status: false, message: err.message });
    }

    const note = await Notes.create({ createdUser, description, title });
    res
      .status(200)
      .json({ note, status: true, message: 'Note created successfully..' });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ status: false, message: 'Internal Server Error' });
  }
};

export const updateNote = async (req, res) => {
  try {
    if (!validateObjectId(req.params.noteId)) {
      return res
        .status(400)
        .json({ status: false, message: 'Note Id not valid' });
    }

    let note = await Notes.findById(req.params.noteId);
    if (!note) {
      return res
        .status(400)
        .json({ status: false, message: 'Note with given id not found' });
    }

    note = await Notes.findByIdAndUpdate(
      req.params.noteId,
      { ...req.body },
      { new: true }
    );
    res
      .status(200)
      .json({ note, status: true, message: 'Note updated successfully..' });
  } catch (error) {
    console.log('Error >> ', error);
  }
};

export const deleteNote = async (req, res) => {
  if (!validateObjectId(req.params.noteId)) {
    return res
      .status(400)
      .json({ status: false, message: 'Note Id not valid' });
  }

  let note = await Notes.findById(req.params.noteId);
  if (!note) {
    return res
      .status(400)
      .json({ status: false, message: 'Note with given Id not found' });
  }

  await Notes.findByIdAndDelete(req.params.noteId);
  res.status(200).json({ status: true, message: 'Note deleted successfully' });
};
