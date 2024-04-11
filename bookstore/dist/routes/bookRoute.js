"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bookController_1 = require("../controllers/bookController");
const bookRouter = express_1.default.Router();
bookRouter.get("/", bookController_1.getAllBooks);
bookRouter.get("/books/:id", bookController_1.getBookById);
bookRouter.post("/", bookController_1.registerBook);
bookRouter.put("/books/:id", bookController_1.updateBook);
bookRouter.delete("/books/:id", bookController_1.deleteBook);
exports.default = bookRouter;
