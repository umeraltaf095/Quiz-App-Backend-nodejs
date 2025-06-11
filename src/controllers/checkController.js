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

    let evaluationResults = submittedAnswers.map((answer) => {
      const question = questions.find((q) => q.id === answer.questionId);

      if (question) {
        return {
          questionId: answer.questionId,
          userId: answer.userId,
          selectedOption: answer.answers[0].selectedAnswer,
          correctOption: question.correctOption,
          isCorrect: answer.answers[0].selectedAnswer === question.correctOption,
        };
      } else {
        return {
          questionId: answer.questionId,
          userId: answer.userId,
          message: "Question not found for the provided answer",
        };
      }
    });

    res.json(evaluationResults);
  } catch (err) {
    res.json({ error: err.message });
  }
};
