"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const adminRouter = express_1.default.Router();
adminRouter.get("/register", (req, res) => {
    res.json({
        message: "admin registered successfully",
    });
});
adminRouter.post("/login", (req, res) => {
    res.json({
        message: "admin logged in successfully",
    });
});
adminRouter.put("/:id", (req, res) => {
    res.json({
        message: "admin details fetched  successfully",
    });
});
exports.default = adminRouter;
