"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const adminController_1 = require("../controllers/adminController");
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware"));
const adminRouter = express_1.default.Router();
adminRouter.post("/register", adminController_1.registerAdmin);
adminRouter.post("/login", adminController_1.loginAdmin);
// adminRouter.get("/:id", authMiddleware, adminDetails);
adminRouter.get("/me", authMiddleware_1.default, adminController_1.adminDetails);
adminRouter.put("/me", authMiddleware_1.default, adminController_1.updateAdmin);
exports.default = adminRouter;
