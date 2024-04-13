import express from "express";
import authMiddleware from "../middlewares/authMiddleware";
import {
  addReview,
  getAllReviews,
  getReviewById,
} from "../controllers/reviewController";

const reviewRouter = express.Router();

reviewRouter.post("/register", addReview);

reviewRouter.get("/", authMiddleware, getAllReviews);

reviewRouter.get("/:id", authMiddleware, getReviewById);

export default reviewRouter;
