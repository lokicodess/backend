import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

export async function registerAdmin(req: Request, res: Response) {
  try {
    const prisma = new PrismaClient();
    const { email } = req.body;

    let admin = await prisma.admin.findUnique({
      where: {
        email,
      },
    });

    if (admin) {
      return res.status(400).json({
        success: false,
        message: "Admin already exists.",
      });
    }

    admin = await prisma.admin.create({
      data: req.body,
    });

    const token = jwt.sign({ userId: admin.id.toString() }, "secret");

    res.status(201).json({
      success: true,
      message: "Admin registered successfully.",
      admin,
      token,
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

export async function loginAdmin(req: Request, res: Response) {
  try {
    const prisma = new PrismaClient();
    const { email, password } = req.body;

    let admin = await prisma.admin.findUnique({
      where: {
        email,
      },
    });

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found.",
      });
    }

    if (password !== admin.password) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials.",
      });
    }

    const token = jwt.sign({ userId: admin.id.toString() }, "secret");

    res.status(200).json({
      success: true,
      message: "Admin logged in successfully.",
      admin,
      token,
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

export async function adminDetails(req: Request, res: Response) {
  try {
    const prisma = new PrismaClient();
    const userId = parseInt(req.headers["userId"] as string);

    const admin = await prisma.admin.findUnique({
      where: {
        id: userId,
      },
    });

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Admin found.",
      admin,
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

export async function fetchAdminById(req: Request, res: Response) {
  try {
    const prisma = new PrismaClient();
    const { id } = req.params;

    const admin = await prisma.admin.findUnique({
      where: {
        id: parseInt(id as string),
      },
    });

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Admin found.",
      admin,
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

export async function updateAdmin(req: Request, res: Response) {
  try {
    const prisma = new PrismaClient();
    const userId = req.headers["userId"];

    let admin = await prisma.admin.findUnique({
      where: {
        id: parseInt(userId as string),
      },
    });

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found.",
      });
    }

    admin = await prisma.admin.update({
      where: {
        id: parseInt(userId as string),
      },
      data: req.body,
    });

    res.status(200).json({
      success: true,
      message: "Admin updated successfully.",
      admin,
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
