import express from "express";

const adminRouter = express.Router();

adminRouter.get("/register", (req, res) => {
  res.json({
    message: "admin registered successfully",
  });
});

adminRouter.post("/login", (req, res) => {
  res.json({
    message: "admin logged in successfully",
  });
});

adminRouter.put("/:id", (req, res) => {
  res.json({
    message: "admin details fetched  successfully",
  });
});

export default adminRouter;
