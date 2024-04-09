"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userControllers_1 = require("../controllers/userControllers");
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware"));
const userRouter = express_1.default.Router();
userRouter.post("/register", userControllers_1.registerUser);
userRouter.post("/login", userControllers_1.loginUser);
userRouter.get("/me", authMiddleware_1.default, userControllers_1.userDetails);
userRouter.put("/me", authMiddleware_1.default, userControllers_1.updateUserDetails);
exports.default = userRouter;
