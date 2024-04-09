import express from "express";

const orderRouter = express.Router();

orderRouter.post("/", (req, res) => {
  res.json({
    message: "new order created",
  });
});

orderRouter.get("/", (req, res) => {
  res.json({
    message: "all orders fetched successfully",
  });
});

orderRouter.get("/:id", (req, res) => {
  res.json({
    message: "order fetched successfully",
  });
});

export default orderRouter;
