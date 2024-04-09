"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const reviewRouter = express_1.default.Router();
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
exports.default = reviewRouter;
