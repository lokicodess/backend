import express from "express";
import {
  deleteOrder,
  getAllOrders,
  getOrderById,
  registerOrder,
  updateOrder,
} from "../controllers/orderController";
import authMiddleware from "../middlewares/authMiddleware";

const orderRouter = express.Router();

orderRouter.post("/", authMiddleware, registerOrder);

orderRouter.get("/", authMiddleware, getAllOrders);

orderRouter.get("/:id", authMiddleware, getOrderById);

orderRouter.put("/:id", authMiddleware, updateOrder);

orderRouter.delete("/:id", authMiddleware, deleteOrder);

export default orderRouter;
