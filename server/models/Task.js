import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  start: Date,
  end: Date,
});

const Task = mongoose.model("Task", taskSchema);
export default Task;
