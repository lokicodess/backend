"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const orderController_1 = require("../controllers/orderController");
const orderRouter = express_1.default.Router();
orderRouter.post("/", orderController_1.registerOrder);
orderRouter.get("/", orderController_1.getAllOrders);
orderRouter.get("/:id", orderController_1.getOrderById);
orderRouter.put("/:id", orderController_1.updateOrder);
orderRouter.delete("/:id", orderController_1.deleteOrder);
exports.default = orderRouter;
