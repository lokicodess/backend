import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

export async function addReview(req: Request, res: Response) {
  try {
    const prisma = new PrismaClient();

    const review = await prisma.review.create({
      data: req.body,
    });

    res.status(201).json({
      success: true,
      message: "Review added successfully.",
      review,
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

export async function getAllReviews(req: Request, res: Response) {
  try {
    const prisma = new PrismaClient();

    const reviews = await prisma.review.findMany();

    res.status(200).json({
      success: true,
      message: "All reviews fetched successfully.",
      reviews,
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

export async function getReviewById(req: Request, res: Response) {
  try {
    const prisma = new PrismaClient();
    const { id } = req.params;

    const review = await prisma.review.findUnique({
      where: {
        id: parseInt(id as string),
      },
    });

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Review fetched successfully.",
      review,
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
