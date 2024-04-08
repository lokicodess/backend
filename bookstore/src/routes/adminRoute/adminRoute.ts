import express from "express";

const adminRouter = express.Router();

adminRouter.get("/admin/books", (req, res) => {
  res.json({
    message: "books fetched successfully",
  });
});

adminRouter.get("/admin/orders", (req, res) => {
  res.json({
    message: "all orders fetched successfully",
  });
});

adminRouter.put("/admin/orders/:id", (req, res) => {
  res.json({
    message: "update the order status successfully",
  });
});

export default adminRouter;
