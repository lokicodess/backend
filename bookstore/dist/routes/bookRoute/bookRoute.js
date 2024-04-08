"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bookRouter = express_1.default.Router();
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
exports.default = bookRouter;
