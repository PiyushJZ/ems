import User from '../models/User.js';
import bcrypt from 'bcrypt';
import { createAccessToken } from '../utils/token.js';

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ status: false, msg: 'Please enter all details!!' });
    }

    const user = await User.findOne({ email });
    if (!user)
      return res
        .status(400)
        .json({ status: false, msg: 'This email is not registered!!' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res
        .status(400)
        .json({ status: false, msg: 'Password incorrect!!' });

    const token = createAccessToken({ id: user._id });
    delete user.password;
    res
      .status(200)
      .json({ token, user, status: true, msg: 'Login successful..' });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ status: false, msg: 'Internal Server Error' });
  }
};
