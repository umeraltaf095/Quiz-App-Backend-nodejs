import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  options: {
    type: Array,
    default: [],
    required: true,
  },
  correctOption: {
    type: String,
    required: true,
  },
});

const questionModel = mongoose.model("questionModel", questionSchema);
export default questionModel;
