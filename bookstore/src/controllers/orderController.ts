import { Request, Response } from "express";
import { Prisma, PrismaClient } from "@prisma/client";

export async function registerOrder(req: Request, res: Response) {
  const prisma = new PrismaClient();

  const order = await prisma.order.create({
    data: req.body,
  });

  res.json({
    message: "order created successfully",
    order,
  });
}

export async function getAllOrders(req: Request, res: Response) {
  const prisma = new PrismaClient();

  const orders = await prisma.order.findMany();

  res.json({
    message: "orders fetched successfully",
    orders,
  });
}

export async function getOrderById(req: Request, res: Response) {
  const prisma = new PrismaClient();
  const { id } = req.params;

  const order = await prisma.order.findUnique({
    where: {
      id: parseInt(id as string),
    },
  });

  res.json({
    message: "order fetched successfully",
    order,
  });
}

export async function updateOrder(req: Request, res: Response) {
  const prisma = new PrismaClient();
  const { id } = req.params;

  const order = await prisma.order.update({
    where: {
      id: parseInt(id as string),
    },
    data: req.body,
  });

  res.json({
    message: "order updated successfully",
    order,
  });
}

export async function deleteOrder(req: Request, res: Response) {
  const prisma = new PrismaClient();
  const { id } = req.params;

  const order = await prisma.order.findUnique({
    where: {
      id: parseInt(id as string),
    },
  });

  if (!order) {
    return res.json({
      message: "order not exist",
    });
  }

  await prisma.order.delete({
    where: {
      id: parseInt(id as string),
    },
  });

  res.json({
    message: "order deleted successfully",
  });
}
