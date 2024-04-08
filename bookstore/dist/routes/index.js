"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRoute_1 = __importDefault(require("./userRoute/userRoute"));
const bookRoute_1 = __importDefault(require("./bookRoute/bookRoute"));
const cartRoute_1 = __importDefault(require("./cartRoute/cartRoute"));
const adminRoute_1 = __importDefault(require("./adminRoute/adminRoute"));
const router = express_1.default.Router();
router.use("/users", userRoute_1.default);
router.use("/books", bookRoute_1.default);
router.use("/cart", cartRoute_1.default);
router.use("/admin", adminRoute_1.default);
exports.default = router;
