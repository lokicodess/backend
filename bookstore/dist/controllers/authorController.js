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
exports.deleteAuthor = exports.authorById = exports.allAuthorDetails = exports.loginAuthor = exports.registerAuthor = void 0;
const client_1 = require("@prisma/client");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const morgan_1 = require("morgan");
function registerAuthor(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const prisma = new client_1.PrismaClient();
            const { email } = req.body;
            // Assuming there's an email field in the author table
            const existingAuthor = yield prisma.author.findUnique({
                where: {
                    email,
                },
            });
            if (existingAuthor) {
                return res.status(400).json({
                    success: false,
                    message: "Author with this email already exists.",
                });
            }
            const author = yield prisma.author.create({
                data: req.body,
            });
            const token = jsonwebtoken_1.default.sign({ userId: author.id.toString() }, "secret");
            res.status(201).json({
                success: true,
                message: "Author registered successfully.",
                author,
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
exports.registerAuthor = registerAuthor;
function loginAuthor(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const prisma = new client_1.PrismaClient();
            const { email, password } = req.body;
            // Assuming there's an email field in the author table
            const existingAuthor = yield prisma.author.findUnique({
                where: {
                    email,
                },
            });
            if (!existingAuthor) {
                return res.status(400).json({
                    success: false,
                    message: "Author with this email doesnt exist .",
                });
            }
            if (password != existingAuthor.password) {
                return res.status(401).json({
                    success: false,
                    message: "Invalid credentials.",
                });
            }
            res.status(201).json({
                success: true,
                message: "Author logged in successfully.",
                existingAuthor,
                token: morgan_1.token,
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
exports.loginAuthor = loginAuthor;
function allAuthorDetails(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const prisma = new client_1.PrismaClient();
            const authors = yield prisma.author.findMany();
            if (!authors || authors.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: "Authors not found.",
                });
            }
            res.status(200).json({
                success: true,
                message: "Authors found.",
                authors,
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
exports.allAuthorDetails = allAuthorDetails;
function authorById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const prisma = new client_1.PrismaClient();
            const { id } = req.params;
            const author = yield prisma.author.findUnique({
                where: {
                    id: parseInt(id),
                },
            });
            if (!author) {
                return res.status(404).json({
                    success: false,
                    message: "Author not found.",
                });
            }
            res.status(200).json({
                success: true,
                message: "Author found.",
                author,
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
exports.authorById = authorById;
function deleteAuthor(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const prisma = new client_1.PrismaClient();
            const { id } = req.params;
            const existingAuthor = yield prisma.author.delete({
                where: {
                    id: parseInt(id),
                },
            });
            if (!existingAuthor) {
                return res.status(404).json({
                    success: false,
                    message: "author not found",
                });
            }
            res.status(200).json({
                success: true,
                message: "author deleted successfully",
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
exports.deleteAuthor = deleteAuthor;
