import express from "express";
import {
  allAuthorDetails,
  authorById,
  registerAuthor,
} from "../controllers/authorController";
import authMiddleware from "../middlewares/authMiddleware";

const authorRouter = express.Router();

authorRouter.post("/register", registerAuthor);

authorRouter.get("/", authMiddleware, allAuthorDetails);

authorRouter.get("/:id", authMiddleware, authorById);

export default authorRouter;
