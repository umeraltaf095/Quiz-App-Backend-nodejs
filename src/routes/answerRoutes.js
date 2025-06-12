import { submitAnswer } from "../controllers/answerController.js";
import { authenticToken } from "../middlewares/userMiddleware.js";

import express from "express";

const answerRouter = express.Router();

answerRouter.post("/submitAnswers", authenticToken, submitAnswer);

export default answerRouter;
