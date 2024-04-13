import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

export async function registerUser(req: Request, res: Response) {
  try {
    const { email } = req.body;
    const prisma = new PrismaClient();
    let user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (user) {
      return res.status(400).json({
        success: false,
        message: "User already exists.",
      });
    }
    user = await prisma.user.create({
      data: req.body,
    });
    const token = jwt.sign({ userId: user.id.toString() }, "secret");
    res.status(201).json({
      success: true,
      message: "User successfully registered.",
      user,
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

export async function loginUser(req: Request, res: Response) {
  try {
    const prisma = new PrismaClient();
    const { email, password } = req.body;
    let user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }
    if (user.password !== password) {
      return res.status(401).json({
        success: false,
        message: "Wrong credentials.",
      });
    }
    const token = jwt.sign({ userId: user.id.toString() }, "secret");
    res.status(200).json({
      success: true,
      message: "User logged in successfully.",
      user,
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

export async function userDetails(req: Request, res: Response) {
  try {
    const prisma = new PrismaClient();
    const userId = parseInt(req.headers["userId"] as string);

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }
    res.status(200).json({
      success: true,
      message: "User found.",
      user,
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

export async function updateUserDetails(req: Request, res: Response) {
  try {
    const prisma = new PrismaClient();
    const userId = parseInt(req.headers["userId"] as string);

    let user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }
    user = await prisma.user.update({
      where: {
        id: userId,
      },
      data: req.body,
    });
    res.status(200).json({
      success: true,
      message: "User updated.",
      user,
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
