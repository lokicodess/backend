"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const orderRouter = express_1.default.Router();
orderRouter.post("/", (req, res) => {
    res.json({
        message: "new order created",
    });
});
orderRouter.get("/", (req, res) => {
    res.json({
        message: "all orders fetched successfully",
    });
});
orderRouter.get("/:id", (req, res) => {
    res.json({
        message: "order fetched successfully",
    });
});
exports.default = orderRouter;
