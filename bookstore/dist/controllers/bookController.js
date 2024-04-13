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
exports.deleteBook = exports.updateBook = exports.getBookById = exports.getAllBooks = exports.registerBook = void 0;
const client_1 = require("@prisma/client");
function registerBook(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const prisma = new client_1.PrismaClient();
            const book = yield prisma.book.create({
                data: req.body,
            });
            res.status(201).json({
                success: true,
                message: "Book added successfully.",
                book,
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
exports.registerBook = registerBook;
function getAllBooks(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const prisma = new client_1.PrismaClient();
            const books = yield prisma.book.findMany();
            if (!books || books.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: "Books not found.",
                });
            }
            res.status(200).json({
                success: true,
                message: "Books found.",
                books,
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
exports.getAllBooks = getAllBooks;
function getBookById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const prisma = new client_1.PrismaClient();
            const { id } = req.params;
            const book = yield prisma.book.findUnique({
                where: {
                    id: parseInt(id),
                },
            });
            if (!book) {
                return res.status(404).json({
                    success: false,
                    message: "Book not found.",
                });
            }
            res.status(200).json({
                success: true,
                message: "Book found.",
                book,
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
exports.getBookById = getBookById;
function updateBook(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const prisma = new client_1.PrismaClient();
            const { id } = req.params;
            let book = yield prisma.book.findUnique({
                where: {
                    id: parseInt(id),
                },
            });
            if (!book) {
                return res.status(404).json({
                    success: false,
                    message: "Book not found.",
                });
            }
            book = yield prisma.book.update({
                where: {
                    id: parseInt(id),
                },
                data: req.body,
            });
            res.status(200).json({
                success: true,
                message: "Book updated successfully.",
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
exports.updateBook = updateBook;
function deleteBook(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const prisma = new client_1.PrismaClient();
            const { id } = req.params;
            const book = yield prisma.book.findUnique({
                where: {
                    id: parseInt(id),
                },
            });
            if (!book) {
                return res.status(404).json({
                    success: false,
                    message: "Book not found, unable to delete.",
                });
            }
            yield prisma.book.delete({
                where: {
                    id: parseInt(id),
                },
            });
            res.status(200).json({
                success: true,
                message: "Book deleted successfully.",
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
exports.deleteBook = deleteBook;
