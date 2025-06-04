import { registerController , getUser , loginUser } from "../controllers/userController.js";
import { authenticToken } from "../middlewares/userMiddleware.js";

import express from 'express'

const userRouter = express.Router();

userRouter.post('/register', registerController);
userRouter.get('/getUser', authenticToken , getUser);
userRouter.post('/login',   loginUser);

export default userRouter;