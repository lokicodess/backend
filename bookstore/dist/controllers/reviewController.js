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
exports.getReviewById = exports.getAllReviews = exports.addReview = void 0;
const client_1 = require("@prisma/client");
function addReview(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const prisma = new client_1.PrismaClient();
        const review = yield prisma.review.create({
            data: req.body,
        });
        res.json({
            message: "review added ",
            review,
        });
    });
}
exports.addReview = addReview;
function getAllReviews(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const prisma = new client_1.PrismaClient();
        const reviews = yield prisma.review.findMany();
        res.json({
            message: "all reviews fetched ",
            reviews,
        });
    });
}
exports.getAllReviews = getAllReviews;
function getReviewById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const prisma = new client_1.PrismaClient();
        const { id } = req.params;
        const review = yield prisma.review.findUnique({
            where: {
                id: parseInt(id),
            },
        });
        if (!review) {
            return res.json({
                message: "review not exist",
            });
        }
        res.json({
            message: "review fetched successfully",
            review,
        });
    });
}
exports.getReviewById = getReviewById;
