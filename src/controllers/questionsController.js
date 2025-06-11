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
    if (req.user == "teacher") {
      res.json(data);
    } else if (req.user == "student") {
      res.json(
        data.map((i) => ({
          id: i.id,
          question: i.question,
          options: i.options,
        }))
      );
    }
  } catch (err) {
    res.json({ error: err.message });
  }
};

