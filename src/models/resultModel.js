import mongoose from "mongoose";
import userModel from "./userModel.js";

const resultSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userModel",
  },
  result: {
    type: Number,
    required: true,
  },
});

const resultModel = mongoose.model("resultModel", resultSchema);

export default resultModel;
