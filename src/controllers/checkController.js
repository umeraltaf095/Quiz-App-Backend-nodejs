import answerModel from "../models/answerModel.js";
import questionModel from "../models/quizModel.js";

export const checkAnswers = async (req, res) => {
  try {
    const submittedAnswers = await answerModel.find();

    if (!submittedAnswers.length) {
      return res.json({ message: "No answers found" });
    }

    const questions = await questionModel.find();
    if (!questions.length) {
      return res.json({ message: "No questions found" });
    }

    let evaluationResults = [];
    let marks = 0;

    submittedAnswers.forEach((answer) => {
      answer.answers.forEach((ans) => {
        const question = questions.find(
          (q) => q._id.toString() === ans.questionId
        );

        if (question) {
          evaluationResults.push({
            questionId: ans.questionId,
            userId: answer.userId,
            selectedOption: ans.selectedAnswer,
            correctOption: question.correctOption,
            isCorrect: ans.selectedAnswer === question.correctOption,
          });
          if (ans.selectedAnswer === question.correctOption) {
            marks++;
          }
        } else {
          evaluationResults.push({
            questionId: ans.questionId,
            userId: answer.userId,
            message: "Question not found",
          });
        }
      });
    });

    res.json({ evaluationResults, TotlaMarks: marks });
  } catch (err) {
    res.json({ error: err.message });
  }
};
