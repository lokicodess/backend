import express from "express";
import {
  allAuthorDetails,
  authorById,
  deleteAuthor,
  loginAuthor,
  registerAuthor,
} from "../controllers/authorController";
import authMiddleware from "../middlewares/authMiddleware";

const authorRouter = express.Router();

authorRouter.post("/register", registerAuthor);
authorRouter.post("/login", loginAuthor);

authorRouter.get("/", authMiddleware, allAuthorDetails);

authorRouter.get("/:id", authMiddleware, authorById);
authorRouter.delete("/:id", authMiddleware, deleteAuthor);

export default authorRouter;
