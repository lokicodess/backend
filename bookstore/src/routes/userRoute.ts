import express from "express";
import {
  loginUser,
  registerUser,
  updateUserDetails,
  userDetails,
} from "../controllers/userControllers";
import authMiddleware from "../middlewares/authMiddleware";

const userRouter = express.Router();

userRouter.post("/register", registerUser);

userRouter.post("/login", loginUser);

userRouter.get("/me", authMiddleware, userDetails);

userRouter.put("/me", authMiddleware, updateUserDetails);

export default userRouter;
