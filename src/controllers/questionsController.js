import questionModel from "../models/quizModel.js";

export const saveQuestion = async (req, res) => {
  try {
    const data = req.body;
    if (!data.question) {
      return res.json({ message: "Question field is empty" });
    }
    const findQuestion = await questionModel.findOne({
      question: data.question,
    });
    if (findQuestion) {
      return res.json({ message: "Question already exist" });
    }
    await questionModel.create(data);
    return res.json({ message: "Question added successfully" });
  } catch (err) {
    return res.json({ error: err.message });
  }
};

export const showQuestion = async (req, res) => {
  try {
    const data = await questionModel.find();
    if (role == "teacher") {
      return res.json(data);
    } else if (role == "student") {
      return res.json(data.question, data.options);
    }
  } catch (err) {
    res.json({ error: err.message });
  }
};
