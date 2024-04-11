import express from "express";
import {
  adminDetails,
  fetchMe,
  loginAdmin,
  registerAdmin,
  updateAdmin,
} from "../controllers/adminController";
import authMiddleware from "../middlewares/authMiddleware";

const adminRouter = express.Router();

adminRouter.post("/register", registerAdmin);

adminRouter.post("/login", loginAdmin);

// adminRouter.get("/:id", authMiddleware, adminDetails);
adminRouter.get("/me", authMiddleware, fetchMe);
adminRouter.put("/me", authMiddleware, updateAdmin);

export default adminRouter;
