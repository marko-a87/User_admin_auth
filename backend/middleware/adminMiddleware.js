import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";

//Protects the route for the user if token is not valid
const protectAdmin = asyncHandler(async (req, res, next) => {
  let token;

  token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.ADMIN_SECRET);

      if (decoded) {
        next();
      } else {
        console.log("Does not match");
        return;
      }
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

export { protectAdmin };
