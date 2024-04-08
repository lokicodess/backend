import express from "express";

const bookRouter = express.Router();

bookRouter.get("/", (req, res) => {
  res.json({
    message: "all the books",
  });
});

bookRouter.get("/books/:id", (req, res) => {
  res.json({
    message: "book fetched",
  });
});

bookRouter.post("/", (req, res) => {
  res.json({
    message: "book added",
  });
});

bookRouter.put("/books/:id", (req, res) => {
  res.json({
    message: "book updated",
  });
});

bookRouter.delete("/books/:id", (req, res) => {
  res.json({
    message: "book deleted successfully",
  });
});

export default bookRouter;
