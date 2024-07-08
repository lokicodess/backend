import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import { token } from "morgan";

export async function registerAuthor(req: Request, res: Response) {
  try {
    const prisma = new PrismaClient();
    const { email } = req.body;

    // Assuming there's an email field in the author table
    const existingAuthor = await prisma.author.findUnique({
      where: {
        email,
      },
    });

    if (existingAuthor) {
      return res.status(400).json({
        success: false,
        message: "Author with this email already exists.",
      });
    }

    const author = await prisma.author.create({
      data: req.body,
    });

    const token = jwt.sign({ userId: author.id.toString() }, "secret");

    res.status(201).json({
      success: true,
      message: "Author registered successfully.",
      author,
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
export async function loginAuthor(req: Request, res: Response) {
  try {
    const prisma = new PrismaClient();
    const { email, password } = req.body;

    // Assuming there's an email field in the author table
    const existingAuthor = await prisma.author.findUnique({
      where: {
        email,
      },
    });

    if (!existingAuthor) {
      return res.status(400).json({
        success: false,
        message: "Author with this email doesnt exist .",
      });
    }

    if (password != existingAuthor.password) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials.",
      });
    }

    res.status(201).json({
      success: true,
      message: "Author logged in successfully.",
      existingAuthor,
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

export async function allAuthorDetails(req: Request, res: Response) {
  try {
    const prisma = new PrismaClient();

    const authors = await prisma.author.findMany();

    if (!authors || authors.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Authors not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Authors found.",
      authors,
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

export async function authorById(req: Request, res: Response) {
  try {
    const prisma = new PrismaClient();
    const { id } = req.params;

    const author = await prisma.author.findUnique({
      where: {
        id: parseInt(id as string),
      },
    });

    if (!author) {
      return res.status(404).json({
        success: false,
        message: "Author not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Author found.",
      author,
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

export async function deleteAuthor(req: Request, res: Response) {
  try {
    const prisma = new PrismaClient();
    const { id } = req.params;

    const existingAuthor = await prisma.author.delete({
      where: {
        id: parseInt(id as string),
      },
    });
    if (!existingAuthor) {
      return res.status(404).json({
        success: false,
        message: "author not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "author deleted successfully",
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
}
