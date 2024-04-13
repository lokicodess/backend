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
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorById = exports.allAuthorDetails = exports.registerAuthor = void 0;
const client_1 = require("@prisma/client");
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
            res.status(201).json({
                success: true,
                message: "Author registered successfully.",
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
exports.registerAuthor = registerAuthor;
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
