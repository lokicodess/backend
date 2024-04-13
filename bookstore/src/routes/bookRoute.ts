import express from "express";
import {
  deleteBook,
  getAllBooks,
  getBookById,
  registerBook,
  updateBook,
} from "../controllers/bookController";
import authMiddleware from "../middlewares/authMiddleware";

const bookRouter = express.Router();

bookRouter.get("/", getAllBooks);

bookRouter.get("/:id", getBookById);

bookRouter.post("/register", registerBook);

bookRouter.put("/:id", updateBook);

bookRouter.delete("/:id", deleteBook);

export default bookRouter;
