"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRouter = express_1.default.Router();
userRouter.post("/register", (req, res) => {
    res.json({
        message: "user successfully registered",
    });
});
userRouter.post("/login", (req, res) => {
    res.json({
        message: "user login successfully",
    });
});
userRouter.get("/me", (req, res) => {
    res.json({
        message: "user fetched",
    });
});
userRouter.put("/me", (req, res) => {
    res.json({
        message: "user updated",
    });
});
exports.default = userRouter;
