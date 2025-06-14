import { checkAnswers } from "../controllers/checkController.js";
import { userResult } from "../controllers/userResultController.js";
import { authenticToken , authenticRole } from "../middlewares/userMiddleware.js";


import express from "express";

const resultRouter = express.Router();

resultRouter.get("/calculateResult", authenticToken,  authenticRole, checkAnswers);
resultRouter.get("/userResult", authenticToken, authenticRole, userResult);

export default resultRouter;
