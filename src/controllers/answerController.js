import answerModel from "../models/answerModel.js";

export const submitAnswer = async (req, res) => {
  try {
    if (req.user == "student") {
      const data = req.body;
      if (!data.answers.length || !data.userId) {
        res.json({ message: "questionId or UserId not found" });
      } else if (!data.answers[0].selectedAnswer) {
        res.json({ message: "please select any option" });
      }
      const saveAnswer = await answerModel.create(data);
      return res.json(saveAnswer);
    } else {
        res.json({message:"Access denied"})
    }
  } catch (err) {
    res.json({ error: err.message });
  }
};
