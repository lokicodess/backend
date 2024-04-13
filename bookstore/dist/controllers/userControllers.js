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
        try {
            const { email } = req.body;
            const prisma = new client_1.PrismaClient();
            let user = yield prisma.user.findUnique({
                where: {
                    email: email,
                },
            });
            if (user) {
                return res.status(400).json({
                    success: false,
                    message: "User already exists.",
                });
            }
            user = yield prisma.user.create({
                data: req.body,
            });
            const token = jsonwebtoken_1.default.sign({ userId: user.id.toString() }, "secret");
            res.status(201).json({
                success: true,
                message: "User successfully registered.",
                user,
                token,
            });
        }
        catch (error) {
            if (error instanceof Error) {
                res.status(500).json({
                    success: false,
                    message: error.message,
                });
            }
        }
    });
}
exports.registerUser = registerUser;
function loginUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const prisma = new client_1.PrismaClient();
            const { email, password } = req.body;
            let user = yield prisma.user.findUnique({
                where: {
                    email,
                },
            });
            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: "User not found.",
                });
            }
            if (user.password !== password) {
                return res.status(401).json({
                    success: false,
                    message: "Wrong credentials.",
                });
            }
            const token = jsonwebtoken_1.default.sign({ userId: user.id.toString() }, "secret");
            res.status(200).json({
                success: true,
                message: "User logged in successfully.",
                user,
                token,
            });
        }
        catch (error) {
            if (error instanceof Error) {
                res.status(500).json({
                    success: false,
                    message: error.message,
                });
            }
        }
    });
}
exports.loginUser = loginUser;
function userDetails(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const prisma = new client_1.PrismaClient();
            const userId = parseInt(req.headers["userId"]);
            const user = yield prisma.user.findUnique({
                where: {
                    id: userId,
                },
            });
            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: "User not found.",
                });
            }
            res.status(200).json({
                success: true,
                message: "User found.",
                user,
            });
        }
        catch (error) {
            if (error instanceof Error) {
                res.status(500).json({
                    success: false,
                    message: error.message,
                });
            }
        }
    });
}
exports.userDetails = userDetails;
function updateUserDetails(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const prisma = new client_1.PrismaClient();
            const userId = parseInt(req.headers["userId"]);
            let user = yield prisma.user.findUnique({
                where: {
                    id: userId,
                },
            });
            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: "User not found.",
                });
            }
            user = yield prisma.user.update({
                where: {
                    id: userId,
                },
                data: req.body,
            });
            res.status(200).json({
                success: true,
                message: "User updated.",
                user,
            });
        }
        catch (error) {
            if (error instanceof Error) {
                res.status(500).json({
                    success: false,
                    message: error.message,
                });
            }
        }
    });
}
exports.updateUserDetails = updateUserDetails;
