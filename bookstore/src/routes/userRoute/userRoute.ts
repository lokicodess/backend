import express from "express";

const userRouter = express.Router();

userRouter.post("/register", (req, res) => {
  res.json({
    message: "user successfully registered",
  });
});

userRouter.post("/login", (req, res) => {
  res.json({
    message: "user login successfully",
  });
});

userRouter.get("/me", (req, res) => {
  res.json({
    message: "user fetched",
  });
});

userRouter.put("/me", (req, res) => {
  res.json({
    message: "user updated",
  });
});

export default userRouter;
