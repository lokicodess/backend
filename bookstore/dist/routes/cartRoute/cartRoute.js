"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cartRouter = express_1.default.Router();
cartRouter.post("/cart/add", (req, res) => {
    res.json({
        message: "added to the cart",
    });
});
cartRouter.get("/cart", (req, res) => {
    res.json({
        message: "fetched the cart ",
    });
});
cartRouter.delete("/cart/:id", (req, res) => {
    res.json({
        message: "item deleted from the cart",
    });
});
cartRouter.post("/orders/checkout", (req, res) => {
    res.json({
        message: "checkout successfully",
    });
});
exports.default = cartRouter;
