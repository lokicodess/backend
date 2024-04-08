"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const adminRouter = express_1.default.Router();
adminRouter.get("/admin/books", (req, res) => {
    res.json({
        message: "books fetched successfully",
    });
});
adminRouter.get("/admin/orders", (req, res) => {
    res.json({
        message: "all orders fetched successfully",
    });
});
adminRouter.put("/admin/orders/:id", (req, res) => {
    res.json({
        message: "update the order status successfully",
    });
});
exports.default = adminRouter;
