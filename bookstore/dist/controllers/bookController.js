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
        const prisma = new client_1.PrismaClient();
        const book = yield prisma.book.create({
            data: req.body,
        });
        res.json({
            message: "book added successfully",
            book,
        });
    });
}
exports.registerBook = registerBook;
function getAllBooks(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const prisma = new client_1.PrismaClient();
        const books = yield prisma.book.findMany();
        if (!books) {
            return res.json({
                message: "books not found",
            });
        }
        res.json({
            message: "books found",
            books,
        });
    });
}
exports.getAllBooks = getAllBooks;
function getBookById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const prisma = new client_1.PrismaClient();
        const { id } = req.params;
        const book = yield prisma.book.findUnique({
            where: {
                id: parseInt(id),
            },
        });
        if (!book) {
            return res.json({
                message: "book not found",
            });
        }
        res.json({
            message: "book found",
            book,
        });
    });
}
exports.getBookById = getBookById;
function updateBook(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const prisma = new client_1.PrismaClient();
        const { id } = req.params;
        let book = yield prisma.book.findUnique({
            where: {
                id: parseInt(id),
            },
        });
        if (!book) {
            return res.json({
                message: "book not found",
            });
        }
        book = yield prisma.book.update({
            where: {
                id: parseInt(id),
            },
            data: req.body,
        });
        res.json({
            message: "book updated successfully",
        });
    });
}
exports.updateBook = updateBook;
function deleteBook(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const prisma = new client_1.PrismaClient();
        const { id } = req.params;
        let book = yield prisma.book.findUnique({
            where: {
                id: parseInt(id),
            },
        });
        if (!book) {
            return res.json({
                message: "book not found , unable to delete",
            });
        }
        yield prisma.book.delete({
            where: {
                id: parseInt(id),
            },
        });
        res.json({
            message: "book deleted successfully",
        });
    });
}
exports.deleteBook = deleteBook;
