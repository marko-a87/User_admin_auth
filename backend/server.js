import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import userRoutes from "./routes/userRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import { notFound, errorHandler } from "./middleware/errorHandler.js";
import { connectDB } from "./config/db.js";
dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/", userRoutes);
app.use("/admin", adminRoutes);
app.use(notFound);
app.use(errorHandler);
const PORT = process.env.PORT || 3000;
connectDB();

app.listen(PORT, () =>
  console.log(`Server is connected to http://localhost:${PORT}`)
);
