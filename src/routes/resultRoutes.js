import { checkAnswers } from "../controllers/checkController.js";
import { userResult } from "../controllers/userResultController.js";

import express from "express";

const resultRouter = express.Router();

resultRouter.get("/result", checkAnswers);
resultRouter.get('/userResult', userResult );

export default resultRouter;
