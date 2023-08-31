import express from "express";
import {
  getAllUserProfile,
  registerAdmin,
  deleteUser,
  loginAdmin,
  logoutAdmin,
} from "../controllers/adminControllers.js";
import { protectAdmin } from "../middleware/adminMiddleware.js";
const router = express.Router();

//@ Access  Private
//@Route GET admin/user
//@desc GETS All user profiles
router.get("/users", protectAdmin, getAllUserProfile);

//@ Access  Public
//@Route POST admin/register
//@desc Register admin profile
router.post("/register", registerAdmin);

//@ Access  Private
//@Route DELETE admin/user/delete
//@desc delete user profile
router.delete("/user/delete", protectAdmin, deleteUser);

//@ Access  Public
//@Route POST admin/login
//@desc Login admin profile
router.post("/login", loginAdmin);

//@ Access  Public
//@Route POST admin/logout
//@desc Logout admin profile
router.post("/logout", logoutAdmin);

export default router;
