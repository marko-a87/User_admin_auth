import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";
import { generateToken } from "../util/generateToken.js";

import { sendEmail } from "../util/sendEmail.js";
const registerUser = asyncHandler(async (req, res) => {
  const { username, password, email } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    console.log("User already exists");
    return res.status(400).json({ Error: "User already exists" });
  }
  const user = await User.create({
    username,
    password,
    email,
  });

  if (user) {
    res.status(201).json({
      message: "User registered",
    });
    sendEmail(user.email);
    console.log("User registered");
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  const user_password = await user.matchPassword(password);
  if (user && user_password) {
    generateToken(res, user._id, process.env.JWT_SECRET);
    res.status(200).json({
      message: "User logged in",
    });
    console.log("User logged in");
  } else {
    res.status(404);
    throw new Error("Invalid username or password");
  }
});

const logoutUser = asyncHandler(async (req, res) => {
  let token;

  token = req.cookies.jwt;
  if (token) {
    res.cookie("jwt", "", {
      httpOnly: true,
      expires: new Date(0),
    });
    res.status(200).json({
      message: "User logged out",
    });
    console.log("User logged out");
  } else {
    res.status(400);

    throw new Error("No user logged in");
  }
});

const getUserProfile = asyncHandler(async (req, res) => {
  try {
    if (req.user) {
      res.status(201).json({
        _id: req.user._id,
        username: req.user.username,
        password: req.user.password,
        email: req.user.email,
      });
    }
  } catch (error) {
    console.log(error);
  }
});

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();
    console.log("User data updated");
    return res.json({
      _id: updatedUser._id,
      username: updatedUser.username,
      password: updatedUser.password,
      email: updatedUser.email,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export {
  registerUser,
  loginUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
};
