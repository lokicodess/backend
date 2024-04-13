import express from "express";

import userRouter from "./userRoute";
import bookRouter from "./bookRoute";
import adminRouter from "./adminRoute";
import reviewRouter from "./reviewRoute";
import orderRouter from "./orderRoute";
import authorRouter from "./authorRoute";

const router = express.Router();

router.use("/users", userRouter);
router.use("/books", bookRouter);
router.use("/admin", adminRouter);
router.use("/reviews", reviewRouter);
router.use("/orders", orderRouter);
router.use("/authors", authorRouter);

export default router;
