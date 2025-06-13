import answerModel from "../models/answerModel.js";
import questionModel from "../models/quizModel.js";
import resultModel from "../models/resultModel.js";

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

    await Promise.all(
      submittedAnswers.map(async (answer) => {
        let marks = 0;

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
        const user_id = answer.userId;
        const existingUser = await resultModel.findOne({userId: user_id});
        if (!existingUser) {
          await resultModel.create({ userId: answer.userId, result: marks });
        }
      })
    );

    res.json({
      evaluationResults,
      message: "Result has been stored successfully",
    });
  } catch (err) {
    res.json({ error: err.message });
  }
};
