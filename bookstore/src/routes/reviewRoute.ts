import express from "express";

const reviewRouter = express.Router();

reviewRouter.post("/", (req, res) => {
  res.json({
    message: "new review added ",
  });
});

reviewRouter.get("/", (req, res) => {
  res.json({
    message: "all reviews fetched successfully",
  });
});

reviewRouter.get("/:id", (req, res) => {
  res.json({
    message: "review fetched successfully",
  });
});

export default reviewRouter;
