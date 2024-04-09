import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

export default async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.json({
      message: "invalid access",
    });
  }
  const payload = jwt.verify(token, "secret") as JwtPayload;

  if (!payload) {
    return res.json({
      message: "invalid access",
    });
  }

  req.headers["userId"] = payload.userId;

  next();
}
