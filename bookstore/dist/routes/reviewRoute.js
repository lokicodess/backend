"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware"));
const reviewController_1 = require("../controllers/reviewController");
const reviewRouter = express_1.default.Router();
reviewRouter.post("/register", reviewController_1.addReview);
reviewRouter.get("/", authMiddleware_1.default, reviewController_1.getAllReviews);
reviewRouter.get("/:id", authMiddleware_1.default, reviewController_1.getReviewById);
exports.default = reviewRouter;
