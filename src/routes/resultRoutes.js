import { checkAnswers } from "../controllers/checkController.js";

import express from "express";

const resultRouter = express.Router();

resultRouter.get('/result', checkAnswers);

export default resultRouter;