import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';
import validator from 'validator';

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = new User({ name, email, password });
    await user.save();

    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '30d' });

    res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
    res.cookie('userId', user._id.toString(), { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
    res.cookie('role', user.role, { httpOnly: false, secure: process.env.NODE_ENV === 'production' });

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: { userId: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Error registering user', error: error.message });
  }
};


export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '30d' });

    res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
    res.cookie('userId', user._id.toString(), { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
    res.cookie('role', user.role, { httpOnly: false, secure: process.env.NODE_ENV === 'production' });

    res.json({
      message: 'User logged in successfully',
      token,
      user: { userId: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ message: 'Error logging in user', error: error.message });
  }
};


export const logoutUser = async (req, res) => {
  try {

    res.clearCookie('token', { httpOnly: true, secure: process.env.NODE_ENV === 'production', path: '/' });
    res.clearCookie('userId', { httpOnly: true, secure: process.env.NODE_ENV === 'production', path: '/' });
    res.clearCookie('role', { httpOnly: false, secure: process.env.NODE_ENV === 'production', path: '/' });

    res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    console.error('Error during logout:', error);
    res.status(500).json({ message: 'An error occurred during logout' });
  }
};



