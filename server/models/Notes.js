import mongoose from 'mongoose';

const notesSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    createdUser: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Notes = mongoose.model('Note', notesSchema);

export default Notes;
