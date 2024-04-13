"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const orderController_1 = require("../controllers/orderController");
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware"));
const orderRouter = express_1.default.Router();
orderRouter.post("/register", authMiddleware_1.default, orderController_1.registerOrder);
orderRouter.get("/", authMiddleware_1.default, orderController_1.getAllOrders);
orderRouter.get("/:id", authMiddleware_1.default, orderController_1.getOrderById);
orderRouter.put("/:id", authMiddleware_1.default, orderController_1.updateOrder);
orderRouter.delete("/:id", authMiddleware_1.default, orderController_1.deleteOrder);
exports.default = orderRouter;
