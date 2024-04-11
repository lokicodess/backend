"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bookController_1 = require("../controllers/bookController");
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware"));
const bookRouter = express_1.default.Router();
bookRouter.get("/", authMiddleware_1.default, bookController_1.getAllBooks);
bookRouter.get("/books/:id", authMiddleware_1.default, bookController_1.getBookById);
bookRouter.post("/", authMiddleware_1.default, bookController_1.registerBook);
bookRouter.put("/books/:id", authMiddleware_1.default, bookController_1.updateBook);
bookRouter.delete("/books/:id", authMiddleware_1.default, bookController_1.deleteBook);
exports.default = bookRouter;
