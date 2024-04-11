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
exports.deleteOrder = exports.updateOrder = exports.getOrderById = exports.getAllOrders = exports.registerOrder = void 0;
const client_1 = require("@prisma/client");
function registerOrder(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const prisma = new client_1.PrismaClient();
        const order = yield prisma.order.create({
            data: req.body,
        });
        res.json({
            message: "order created successfully",
            order,
        });
    });
}
exports.registerOrder = registerOrder;
function getAllOrders(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const prisma = new client_1.PrismaClient();
        const orders = yield prisma.order.findMany();
        res.json({
            message: "orders fetched successfully",
            orders,
        });
    });
}
exports.getAllOrders = getAllOrders;
function getOrderById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const prisma = new client_1.PrismaClient();
        const { id } = req.params;
        const order = yield prisma.order.findUnique({
            where: {
                id: parseInt(id),
            },
        });
        res.json({
            message: "order fetched successfully",
            order,
        });
    });
}
exports.getOrderById = getOrderById;
function updateOrder(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const prisma = new client_1.PrismaClient();
        const { id } = req.params;
        const order = yield prisma.order.update({
            where: {
                id: parseInt(id),
            },
            data: req.body,
        });
        res.json({
            message: "order updated successfully",
            order,
        });
    });
}
exports.updateOrder = updateOrder;
function deleteOrder(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const prisma = new client_1.PrismaClient();
        const { id } = req.params;
        const order = yield prisma.order.findUnique({
            where: {
                id: parseInt(id),
            },
        });
        if (!order) {
            return res.json({
                message: "order not exist",
            });
        }
        yield prisma.order.delete({
            where: {
                id: parseInt(id),
            },
        });
        res.json({
            message: "order deleted successfully",
        });
    });
}
exports.deleteOrder = deleteOrder;
