import mongoose from "mongoose";

const answersSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  answers: {
    type: [
      {
        questionId: {
          type: String,
        },
        selectedAnswer: String,
      },
    ],
    required: true,
  },
});

const answerModel = mongoose.model("answerModel", answersSchema);

export default answerModel;
