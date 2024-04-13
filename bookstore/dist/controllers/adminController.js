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
exports.updateAdmin = exports.fetchAdminById = exports.adminDetails = exports.loginAdmin = exports.registerAdmin = void 0;
const client_1 = require("@prisma/client");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function registerAdmin(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const prisma = new client_1.PrismaClient();
            const { email } = req.body;
            let admin = yield prisma.admin.findUnique({
                where: {
                    email,
                },
            });
            if (admin) {
                return res.status(400).json({
                    success: false,
                    message: "Admin already exists.",
                });
            }
            admin = yield prisma.admin.create({
                data: req.body,
            });
            const token = jsonwebtoken_1.default.sign({ userId: admin.id.toString() }, "secret");
            res.status(201).json({
                success: true,
                message: "Admin registered successfully.",
                admin,
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
exports.registerAdmin = registerAdmin;
function loginAdmin(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const prisma = new client_1.PrismaClient();
            const { email, password } = req.body;
            let admin = yield prisma.admin.findUnique({
                where: {
                    email,
                },
            });
            if (!admin) {
                return res.status(404).json({
                    success: false,
                    message: "Admin not found.",
                });
            }
            if (password !== admin.password) {
                return res.status(401).json({
                    success: false,
                    message: "Invalid credentials.",
                });
            }
            const token = jsonwebtoken_1.default.sign({ userId: admin.id.toString() }, "secret");
            res.status(200).json({
                success: true,
                message: "Admin logged in successfully.",
                admin,
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
exports.loginAdmin = loginAdmin;
function adminDetails(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const prisma = new client_1.PrismaClient();
            const userId = parseInt(req.headers["userId"]);
            const admin = yield prisma.admin.findUnique({
                where: {
                    id: userId,
                },
            });
            if (!admin) {
                return res.status(404).json({
                    success: false,
                    message: "Admin not found.",
                });
            }
            res.status(200).json({
                success: true,
                message: "Admin found.",
                admin,
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
exports.adminDetails = adminDetails;
function fetchAdminById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const prisma = new client_1.PrismaClient();
            const { id } = req.params;
            const admin = yield prisma.admin.findUnique({
                where: {
                    id: parseInt(id),
                },
            });
            if (!admin) {
                return res.status(404).json({
                    success: false,
                    message: "Admin not found.",
                });
            }
            res.status(200).json({
                success: true,
                message: "Admin found.",
                admin,
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
exports.fetchAdminById = fetchAdminById;
function updateAdmin(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const prisma = new client_1.PrismaClient();
            const userId = req.headers["userId"];
            let admin = yield prisma.admin.findUnique({
                where: {
                    id: parseInt(userId),
                },
            });
            if (!admin) {
                return res.status(404).json({
                    success: false,
                    message: "Admin not found.",
                });
            }
            admin = yield prisma.admin.update({
                where: {
                    id: parseInt(userId),
                },
                data: req.body,
            });
            res.status(200).json({
                success: true,
                message: "Admin updated successfully.",
                admin,
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
exports.updateAdmin = updateAdmin;
