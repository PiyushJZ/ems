import mongoose from 'mongoose';

export const validateObjectId = (string) => {
  return mongoose.Types.ObjectId.isValid(string);
};
