import mongoose from "mongoose";


const answersSchema = new mongoose.Schema({
  userId: {
    type:mongoose.Schema.Types.ObjectId,
    ref: 'UserModel',
    required: true
    
  },
   quizId: {
    type: mongoose.Schema.Types.ObjectId,
    ref : 'questionModel',
    required: true,
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
