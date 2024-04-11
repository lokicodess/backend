import express from "express";
import { allAuthorDetails, authorById } from "../controllers/authorController";

const authorRouter = express.Router();

authorRouter.get("/", allAuthorDetails);

authorRouter.get("/:id", authorById);

export default authorRouter;
