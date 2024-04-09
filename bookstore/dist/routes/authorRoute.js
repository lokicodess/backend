"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authorRouter = express_1.default.Router();
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
exports.default = authorRouter;
