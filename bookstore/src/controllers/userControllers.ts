import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

export async function registerUser(req: Request, res: Response) {
  const { email } = req.body;
  const prisma = new PrismaClient();
  let user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  if (user) {
    return res.json({
      message: "user already exist",
    });
  }
  user = await prisma.user.create({
    data: req.body,
  });
  jwt.sign({ userId: user.id.toString() }, "secret");
  res.json({
    message: "user successfully registered",
    user,
  });
}

export async function loginUser(req: Request, res: Response) {
  const prisma = new PrismaClient();
  const { email, password } = req.body;
  let user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (!user) {
    return res.json({
      message: "user doesnt exist",
    });
  }
  if (user.password != password) {
    return res.json({
      message: "wrong credentials",
    });
  }
  const token = jwt.sign({ userId: user.id.toString() }, "secret");
  res.json({
    message: "user logged in successfully",
    user,
    token,
  });
}

export async function userDetails(req: Request, res: Response) {
  const prisma = new PrismaClient();
  const userId = parseInt(req.headers["userId"] as string);

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    return res.json({
      message: "user doesnt found",
    });
  }
  res.json({
    message: "user found",
    user,
  });
}

export async function updateUserDetails(req: Request, res: Response) {
  const prisma = new PrismaClient();
  const userId = parseInt(req.headers["userId"] as string);

  let user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    return res.json({
      message: "user doesnt found",
    });
  }
  user = await prisma.user.update({
    where: {
      id: userId,
    },
    data: req.body,
  });
  res.json({
    message: "user updated",
    user,
  });
}
