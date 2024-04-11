"use strict";
// import { Request, Response } from "express";
// import { PrismaClient } from "@prisma/client";
// export async function registerAuthor(req: Request, res: Response) {
//   const prisma = new PrismaClient();
//   const { email } = req.body;
// //   const author = await prisma.author.findUnique({
// //     where: {
// //       email,
// //     },
// //   });
// //   if (author) {
// //     return res.json({});
// //   }
// // }
// export async function allAuthorDetails(req: Request, res: Response) {
//   const prisma = new PrismaClient();
//   const author = await prisma.author.findMany();
//   if (!author) {
//     return res.json({
//       message: "authors not found",
//     });
//   }
//   res.json({
//     message: "authors found",
//     author,
//   });
// }
// export async function authorById(req: Request, res: Response) {
//   const prisma = new PrismaClient();
//   const { id } = req.params;
//   const author = await prisma.author.findUnique({
//     where: {
//       id: parseInt(id as string),
//     },
//   });
//   if (!author) {
//     return res.json({
//       message: "author not found",
//     });
//   }
//   res.json({
//     message: "author found",
//     author,
//   });
// }
