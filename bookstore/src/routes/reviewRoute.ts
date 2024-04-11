import express from "express";
import authMiddleware from "../middlewares/authMiddleware";
import {
  addReview,
  getAllReviews,
  getReviewById,
} from "../controllers/reviewController";

const reviewRouter = express.Router();

reviewRouter.post("/", addReview);

reviewRouter.get("/", authMiddleware, getReviewById);

reviewRouter.get("/:id", authMiddleware, getReviewById);

export default reviewRouter;
