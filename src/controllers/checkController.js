import answerModel from "../models/answerModel.js";
import questionModel from "../models/questionModel.js";
import resultModel from "../models/resultModel.js";

export const checkAnswers = async (req, res) => {
  try {
    const quizId = req.query.id;

    const quizExist = await questionModel.findOne({ _id: quizId });

    if (!quizExist) {
      return res.json({ message: "Quiz does not exist" });
    }

    const answerDocs = await answerModel.find({ quizId });

    for (const answer of answerDocs) {
      let marks = 0;

      for (const userAnswer of answer.answers) {
        const matchedQuestion = quizExist.questions.find(
          (q) => q._id.toString() === userAnswer.questionId
        );

        if (matchedQuestion) {
          const isCorrect =
            matchedQuestion.correctOption === userAnswer.selectedAnswer;

          if (isCorrect) marks++;
        }
      }

      await resultModel.create({
        userId: answer.userId,
        result: marks,
      });
    }

    res.json({ message: "Results calculated and saved successfully." });
  } catch (err) {
    res.json({ error: err.message });
  }
};
