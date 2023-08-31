import Admin from "../models/adminModel.js";
import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";
import { generateToken } from "../util/generateToken.js";

const getAllUserProfile = asyncHandler(async (req, res) => {
  const users = await User.find();
  if (users) {
    res.status(200).json({ users });
  } else {
    res.status(404);
    throw new Error("No users found");
  }
});

const registerAdmin = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  const adminExists = await Admin.findOne({ username });
  if (adminExists) {
    res.status(404).json({ Error: "Admin already exists" });
  }
  const admin = await Admin.create({
    username,
    password,
  });

  if (admin) {
    res.status(201).json({
      message: "Admin registered",
    });

    console.log("Admin registered");
  } else {
    res.status(400);
    throw new Error("Invalid Admin user data");
  }
});

const deleteUser = asyncHandler(async (req, res) => {
  const { _id } = req.body;
  const userProfile = await User.findByIdAndDelete({ _id });
  if (userProfile) {
    res.status(200).json({
      message: "User deleted",
    });

    console.log("User deleted");
  } else {
    res.status(404);
    throw new Error("No user found");
  }
});

const loginAdmin = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  const admin = await Admin.findOne({ username });
  const admin_password = await admin.matchPassword(password);
  if (admin && admin_password) {
    generateToken(res, admin._id, process.env.ADMIN_SECRET);
    res.status(200).json({
      message: "Admin logged in",
    });
    console.log("Admin logged in");
  } else {
    res.status(404);
    throw new Error("Invalid username or password");
  }
});

const logoutAdmin = asyncHandler(async (req, res) => {
  let token;

  token = req.cookies.jwt;
  if (token) {
    res.cookie("jwt", "", {
      httpOnly: true,
      expires: new Date(0),
    });
    res.status(200).json({
      message: "Admin logged out",
    });
  } else {
    res.status(400);
    throw new Error("No admin logged in");
  }
});
export {
  getAllUserProfile,
  registerAdmin,
  deleteUser,
  loginAdmin,
  logoutAdmin,
};
