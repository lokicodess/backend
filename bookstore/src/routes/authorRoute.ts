import express from "express";

const authorRouter = express.Router();

authorRouter.get("/", (req, res) => {
  res.json({
    message: "all authors fetched successfully",
  });
});

authorRouter.get("/:id", (req, res) => {
  res.json({
    message: "author fetched successfully",
  });
});

export default authorRouter;
