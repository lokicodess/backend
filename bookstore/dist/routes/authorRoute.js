"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authorController_1 = require("../controllers/authorController");
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware"));
const authorRouter = express_1.default.Router();
authorRouter.post("/register", authorController_1.registerAuthor);
authorRouter.get("/", authMiddleware_1.default, authorController_1.allAuthorDetails);
authorRouter.get("/:id", authMiddleware_1.default, authorController_1.authorById);
exports.default = authorRouter;
