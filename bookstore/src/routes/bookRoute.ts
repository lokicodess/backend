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

bookRouter.get("/", authMiddleware, getAllBooks);

bookRouter.get("/books/:id", authMiddleware, getBookById);

bookRouter.post("/", authMiddleware, registerBook);

bookRouter.put("/books/:id", authMiddleware, updateBook);

bookRouter.delete("/books/:id", authMiddleware, deleteBook);

export default bookRouter;
