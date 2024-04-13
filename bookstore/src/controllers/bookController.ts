import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

export async function registerBook(req: Request, res: Response) {
  try {
    const prisma = new PrismaClient();
    const book = await prisma.book.create({
      data: req.body,
    });

    res.status(201).json({
      success: true,
      message: "Book added successfully.",
      book,
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

export async function getAllBooks(req: Request, res: Response) {
  try {
    const prisma = new PrismaClient();
    const books = await prisma.book.findMany();

    if (!books || books.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Books not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Books found.",
      books,
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

export async function getBookById(req: Request, res: Response) {
  try {
    const prisma = new PrismaClient();
    const { id } = req.params;

    const book = await prisma.book.findUnique({
      where: {
        id: parseInt(id as string),
      },
    });

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Book found.",
      book,
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

export async function updateBook(req: Request, res: Response) {
  try {
    const prisma = new PrismaClient();
    const { id } = req.params;

    let book = await prisma.book.findUnique({
      where: {
        id: parseInt(id as string),
      },
    });

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found.",
      });
    }

    book = await prisma.book.update({
      where: {
        id: parseInt(id as string),
      },
      data: req.body,
    });

    res.status(200).json({
      success: true,
      message: "Book updated successfully.",
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

export async function deleteBook(req: Request, res: Response) {
  try {
    const prisma = new PrismaClient();
    const { id } = req.params;

    const book = await prisma.book.findUnique({
      where: {
        id: parseInt(id as string),
      },
    });

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found, unable to delete.",
      });
    }

    await prisma.book.delete({
      where: {
        id: parseInt(id as string),
      },
    });

    res.status(200).json({
      success: true,
      message: "Book deleted successfully.",
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
