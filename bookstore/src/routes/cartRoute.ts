import express from "express";

const cartRouter = express.Router();

cartRouter.post("/cart/add", (req, res) => {
  res.json({
    message: "added to the cart",
  });
});

cartRouter.get("/cart", (req, res) => {
  res.json({
    message: "fetched the cart ",
  });
});

cartRouter.delete("/cart/:id", (req, res) => {
  res.json({
    message: "item deleted from the cart",
  });
});

cartRouter.post("/orders/checkout", (req, res) => {
  res.json({
    message: "checkout successfully",
  });
});

export default cartRouter;
