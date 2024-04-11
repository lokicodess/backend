import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

export async function addReview(req: Request, res: Response) {
  const prisma = new PrismaClient();

  const review = await prisma.review.create({
    data: req.body,
  });

  res.json({
    message: "review added ",
    review,
  });
}

export async function getAllReviews(req: Request, res: Response) {
  const prisma = new PrismaClient();

  const reviews = await prisma.review.findMany();

  res.json({
    message: "all reviews fetched ",
    reviews,
  });
}

export async function getReviewById(req: Request, res: Response) {
  const prisma = new PrismaClient();
  const { id } = req.params;

  const review = await prisma.review.findUnique({
    where: {
      id: parseInt(id as string),
    },
  });

  if (!review) {
    return res.json({
      message: "review not exist",
    });
  }

  res.json({
    message: "review fetched successfully",
    review,
  });
}
