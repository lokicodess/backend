import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

export async function registerOrder(req: Request, res: Response) {
  try {
    const prisma = new PrismaClient();

    const order = await prisma.order.create({
      data: req.body,
    });

    res.status(201).json({
      success: true,
      message: "Order created successfully.",
      order,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
}

export async function getAllOrders(req: Request, res: Response) {
  try {
    const prisma = new PrismaClient();

    const orders = await prisma.order.findMany();

    res.status(200).json({
      success: true,
      message: "Orders fetched successfully.",
      orders,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
}

export async function getOrderById(req: Request, res: Response) {
  try {
    const prisma = new PrismaClient();
    const { id } = req.params;

    const order = await prisma.order.findUnique({
      where: {
        id: parseInt(id as string),
      },
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Order fetched successfully.",
      order,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
}

export async function updateOrder(req: Request, res: Response) {
  try {
    const prisma = new PrismaClient();
    const { id } = req.params;

    const order = await prisma.order.update({
      where: {
        id: parseInt(id as string),
      },
      data: req.body,
    });

    res.status(200).json({
      success: true,
      message: "Order updated successfully.",
      order,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
}

export async function deleteOrder(req: Request, res: Response) {
  try {
    const prisma = new PrismaClient();
    const { id } = req.params;

    const order = await prisma.order.findUnique({
      where: {
        id: parseInt(id as string),
      },
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found.",
      });
    }

    await prisma.order.delete({
      where: {
        id: parseInt(id as string),
      },
    });

    res.status(200).json({
      success: true,
      message: "Order deleted successfully.",
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
}
