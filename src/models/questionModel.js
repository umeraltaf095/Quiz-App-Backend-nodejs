import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  questions: [
    {
      question: {
        type: String,
        required: true,
      },
      options: {
        type: [String],
        required: true,
      },
      correctOption: {
        type: String,
        required: true,
      },
    },
  ],
});

const questionModel = mongoose.model("questionModel", questionSchema);
export default questionModel;
