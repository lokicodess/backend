"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserDetails = exports.userDetails = exports.loginUser = exports.registerUser = void 0;
const client_1 = require("@prisma/client");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function registerUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email } = req.body;
        const prisma = new client_1.PrismaClient();
        let user = yield prisma.user.findUnique({
            where: {
                email: email,
            },
        });
        if (user) {
            return res.json({
                message: "user already exist",
            });
        }
        user = yield prisma.user.create({
            data: req.body,
        });
        jsonwebtoken_1.default.sign({ userId: user.id.toString() }, "secret");
        res.json({
            message: "user successfully registered",
            user,
        });
    });
}
exports.registerUser = registerUser;
function loginUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const prisma = new client_1.PrismaClient();
        const { email, password } = req.body;
        let user = yield prisma.user.findUnique({
            where: {
                email,
            },
        });
        if (!user) {
            return res.json({
                message: "user doesnt exist",
            });
        }
        if (user.password != password) {
            return res.json({
                message: "wrong credentials",
            });
        }
        const token = jsonwebtoken_1.default.sign({ userId: user.id.toString() }, "secret");
        res.json({
            message: "user logged in successfully",
            user,
            token,
        });
    });
}
exports.loginUser = loginUser;
function userDetails(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const prisma = new client_1.PrismaClient();
        const userId = parseInt(req.headers["userId"]);
        const user = yield prisma.user.findUnique({
            where: {
                id: userId,
            },
        });
        if (!user) {
            return res.json({
                message: "user doesnt found",
            });
        }
        res.json({
            message: "user found",
            user,
        });
    });
}
exports.userDetails = userDetails;
function updateUserDetails(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const prisma = new client_1.PrismaClient();
        const userId = parseInt(req.headers["userId"]);
        let user = yield prisma.user.findUnique({
            where: {
                id: userId,
            },
        });
        if (!user) {
            return res.json({
                message: "user doesnt found",
            });
        }
        user = yield prisma.user.update({
            where: {
                id: userId,
            },
            data: req.body,
        });
        res.json({
            message: "user updated",
            user,
        });
    });
}
exports.updateUserDetails = updateUserDetails;
