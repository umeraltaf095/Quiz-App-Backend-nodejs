import {
  saveQuestion,
  showQuestion,
} from "../controllers/questionsController.js";
import {
  authenticRole,
  authenticToken,
} from "../middlewares/userMiddleware.js";

import express from "express";

const questionRouter = express.Router();

questionRouter.post(
  "/addQuestion",
  authenticToken,
  authenticRole,
  saveQuestion
);
questionRouter.get(
  "/getQuestions",
  authenticToken,
  authenticRole,
  showQuestion
);

export default questionRouter;
