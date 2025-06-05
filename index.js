import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import userRouter from "./src/routes/userRoutes.js";
import questionRouter from "./src/routes/questionRoutes.js";
import answerRouter from "./src/routes/answerRoutes.js";

dotenv.config();

 const app = express();
 app.use(express.json());

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

// Connect to MongoDB
mongoose
  .connect(MONGO_URI, {})
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

//Routes
app.use('/', userRouter);
app.use('/', questionRouter);
app.use('/',answerRouter);
app.get("/", (req, res) => {
  res.send("Hello from Express and MongoDB!");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
