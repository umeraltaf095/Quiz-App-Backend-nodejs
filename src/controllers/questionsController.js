import questionModel from "../models/questionModel.js";

export const saveQuestion = async (req, res) => {
  try {
    const data = req.body;

    await questionModel.create(data);
    return res.json({ message: "Question added successfully" });
  } catch (err) {
    return res.json({ error: err.message });
  }
};

export const showQuestion = async (req, res) => {
  try {
    const existingQuiz = req.query.quizId;

    if (!existingQuiz) {
      return res.json({ message: "Invalid quiz ID" });
    }

    const data = await questionModel.findOne({ _id: existingQuiz });

    if (!data) {
      return res.json({ message: "Requested quiz not found" });
    }

    if (req.user === "teacher") {
      return res.json(data);
    } else if (req.user === "student") {
      const formatted = data.questions.map((q) => ({
        questionId: q._id,
        question: q.question,
        options: q.options,
      }));
      return res.json(formatted);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
