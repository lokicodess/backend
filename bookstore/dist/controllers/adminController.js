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
        const prisma = new client_1.PrismaClient();
        const { email } = req.body;
        let admin = yield prisma.admin.findUnique({
            where: {
                email,
            },
        });
        if (admin) {
            return res.json({
                message: "admin already exist",
            });
        }
        admin = yield prisma.admin.create({
            data: req.body,
        });
        const token = jsonwebtoken_1.default.sign({ userId: admin.id.toString() }, "secret");
        res.json({
            message: "admin registered successfully",
            admin,
            token,
        });
    });
}
exports.registerAdmin = registerAdmin;
function loginAdmin(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const prisma = new client_1.PrismaClient();
        const { email, password } = req.body;
        let admin = yield prisma.admin.findUnique({
            where: {
                email,
            },
        });
        if (!admin) {
            return res.json({
                message: "admin not found",
            });
        }
        if (password != admin.password) {
            return res.json({
                message: "invalid credentials",
            });
        }
        const token = jsonwebtoken_1.default.sign({ userId: admin.id.toString() }, "secret");
        res.json({
            message: "admin logged in successfully",
            admin,
            token,
        });
    });
}
exports.loginAdmin = loginAdmin;
function adminDetails(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const prisma = new client_1.PrismaClient();
        const userId = parseInt(req.headers["userId"]);
        const admin = yield prisma.admin.findUnique({
            where: {
                id: userId,
            },
        });
        if (!admin) {
            return res.json({
                message: "admin not found",
            });
        }
        res.json({
            message: "admin found",
            admin,
        });
    });
}
exports.adminDetails = adminDetails;
function fetchAdminById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const prisma = new client_1.PrismaClient();
        const { id } = req.params;
        const admin = yield prisma.admin.findUnique({
            where: {
                id: parseInt(id),
            },
        });
        if (!admin) {
            return res.json({
                message: "admin not found",
            });
        }
        res.json({
            message: "admin found",
            admin,
        });
    });
}
exports.fetchAdminById = fetchAdminById;
function updateAdmin(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const prisma = new client_1.PrismaClient();
        const userId = req.headers["userId"];
        let admin = yield prisma.admin.findUnique({
            where: {
                id: parseInt(userId),
            },
        });
        if (!admin) {
            return res.json({
                message: "admin not exist",
            });
        }
        admin = yield prisma.admin.update({
            where: {
                id: parseInt(userId),
            },
            data: req.body,
        });
        res.json({
            message: "admin updated successfully",
            admin,
        });
    });
}
exports.updateAdmin = updateAdmin;
