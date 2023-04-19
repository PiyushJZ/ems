import mongoose from 'mongoose';
import bcrypt from "bcrypt"

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please enter your name'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Please enter your email'],
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Please enter your password'],
    },
  }
);

const User = mongoose.model('User', userSchema);
const hashpass = await bcrypt.hash("pass", 10)
const testUsers = await User.create([
  {
    name: "test1",
    email: "test1@abc.com",
    password: hashpass
  },
  {
    name: "test2",
    email: "test2@abc.com",
    password: hashpass
  },
  {
    name: "test3",
    email: "test3@abc.com",
    password: hashpass
  },
  {
    name: "test4",
    email: "test4@abc.com",
    password: hashpass
  },
  {
    name: "test5",
    email: "test5@abc.com",
    password: hashpass
  },
])
export default User;
