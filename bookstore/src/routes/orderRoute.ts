import express from "express";
import {
  deleteOrder,
  getAllOrders,
  getOrderById,
  registerOrder,
  updateOrder,
} from "../controllers/orderController";

const orderRouter = express.Router();

orderRouter.post("/", registerOrder);

orderRouter.get("/", getAllOrders);

orderRouter.get("/:id", getOrderById);

orderRouter.put("/:id", updateOrder);

orderRouter.delete("/:id", deleteOrder);

export default orderRouter;
