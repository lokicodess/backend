import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

export async function registerAdmin(req: Request, res: Response) {
  const prisma = new PrismaClient();
  const { email } = req.body;

  let admin = await prisma.admin.findUnique({
    where: {
      email,
    },
  });

  if (admin) {
    return res.json({
      message: "admin already exist",
    });
  }
  admin = await prisma.admin.create({
    data: req.body,
  });
  const token = jwt.sign({ userId: admin.id.toString() }, "secret");
  res.json({
    message: "admin registered successfully",
    admin,
    token,
  });
}

export async function loginAdmin(req: Request, res: Response) {
  const prisma = new PrismaClient();
  const { email, password } = req.body;

  let admin = await prisma.admin.findUnique({
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

  const token = jwt.sign({ userId: admin.id.toString() }, "secret");

  res.json({
    message: "admin logged in successfully",
    admin,
    token,
  });
}

export async function adminDetails(req: Request, res: Response) {
  const prisma = new PrismaClient();
  const userId = parseInt(req.headers["userId"] as string);

  const admin = await prisma.admin.findUnique({
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
}

export async function fetchAdminById(req: Request, res: Response) {
  const prisma = new PrismaClient();
  const { id } = req.params;

  const admin = await prisma.admin.findUnique({
    where: {
      id: parseInt(id as string),
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
}

export async function updateAdmin(req: Request, res: Response) {
  const prisma = new PrismaClient();
  const userId = req.headers["userId"];

  let admin = await prisma.admin.findUnique({
    where: {
      id: parseInt(userId as string),
    },
  });
  if (!admin) {
    return res.json({
      message: "admin not exist",
    });
  }
  admin = await prisma.admin.update({
    where: {
      id: parseInt(userId as string),
    },
    data: req.body,
  });
  res.json({
    message: "admin updated successfully",
    admin,
  });
}
