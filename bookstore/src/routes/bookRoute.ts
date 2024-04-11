import express from "express";
import {
  deleteBook,
  getAllBooks,
  getBookById,
  registerBook,
  updateBook,
} from "../controllers/bookController";

const bookRouter = express.Router();

bookRouter.get("/", getAllBooks);

bookRouter.get("/books/:id", getBookById);

bookRouter.post("/", registerBook);

bookRouter.put("/books/:id", updateBook);

bookRouter.delete("/books/:id", deleteBook);

export default bookRouter;
