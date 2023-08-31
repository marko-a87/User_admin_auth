import express from "express";

import {
  registerUser,
  loginUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
} from "../controllers/userControllers.js";
import { protect } from "../middleware/userMiddleware.js";
const router = express.Router();

//@ Access  Private
//@Route GET /user and PUT /user
//@desc Get user profile and update user profile

router
  .route("/user")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

//@ Access  Public
//@Route POST /register
//@desc Register user
router.post("/register", registerUser);

//@ Access  Public
//@Route POST /login
//@desc Login user
router.post("/login", loginUser);

//@ Access  Public
//@Route POST /logout
//@desc Login user
router.post("/logout", logoutUser);

//@ Access  Private
//@Route PUT /update/user
//@desc update user information

//router.put("/update", updateUserProfile);

export default router;
