import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

export async function registerBook(req: Request, res: Response) {
  const prisma = new PrismaClient();

  const book = await prisma.book.create({
    data: req.body,
  });

  res.json({
    message: "book added successfully",
    book,
  });
}

export async function getAllBooks(req: Request, res: Response) {
  const prisma = new PrismaClient();
  const books = await prisma.book.findMany();

  if (!books) {
    return res.json({
      message: "books not found",
    });
  }
  res.json({
    message: "books found",
    books,
  });
}

export async function getBookById(req: Request, res: Response) {
  const prisma = new PrismaClient();
  const { id } = req.params;

  const book = await prisma.book.findUnique({
    where: {
      id: parseInt(id as string),
    },
  });
  if (!book) {
    return res.json({
      message: "book not found",
    });
  }
  res.json({
    message: "book found",
    book,
  });
}

export async function updateBook(req: Request, res: Response) {
  const prisma = new PrismaClient();
  const { id } = req.params;

  let book = await prisma.book.findUnique({
    where: {
      id: parseInt(id as string),
    },
  });
  if (!book) {
    return res.json({
      message: "book not found",
    });
  }
  book = await prisma.book.update({
    where: {
      id: parseInt(id as string),
    },
    data: req.body,
  });
  res.json({
    message: "book updated successfully",
  });
}

export async function deleteBook(req: Request, res: Response) {
  const prisma = new PrismaClient();
  const { id } = req.params;

  let book = await prisma.book.findUnique({
    where: {
      id: parseInt(id as string),
    },
  });
  if (!book) {
    return res.json({
      message: "book not found , unable to delete",
    });
  }
  await prisma.book.delete({
    where: {
      id: parseInt(id as string),
    },
  });
  res.json({
    message: "book deleted successfully",
  });
}
