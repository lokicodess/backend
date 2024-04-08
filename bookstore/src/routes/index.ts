import express from "express";

import userRouter from "./userRoute/userRoute";
import bookRouter from "./bookRoute/bookRoute";
import cartRouter from "./cartRoute/cartRoute";
import adminRouter from "./adminRoute/adminRoute";

const router = express.Router();

router.use("/users", userRouter);
router.use("/books", bookRouter);
router.use("/cart", cartRouter);
router.use("/admin", adminRouter);

export default router;
