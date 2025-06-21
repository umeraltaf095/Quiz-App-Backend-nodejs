import answerModel from "../models/answerModel.js";

export const submitAnswer = async (req, res) => {
  try {
    if (req.user == "student") {
      const data = req.body;
      if(req.data.id !== data.userId){
        return res.json({message:"You are not authorized to submit answers for another user."});
      }
      const existingId = await answerModel.findOne({userId:req.body.userId , quizId: req.body.quizId});
      if(existingId){
        return res.json({message:"Quiz have been already submitted by this user"})
      }
      if (!data.answers.length || !data.userId) {
        res.json({ message: "questionId or UserId not found" });
      } else if (!data.answers[0].selectedAnswer) {
        res.json({ message: "please select any option" });
      }
      const saveAnswer = await answerModel.create(data);
      return res.json(saveAnswer);
    } else {
      res.json({ message: `${req.user} cannot perform a quiz` });
    }
  } catch (err) {
    res.json({ error: err.message });
  }
};
