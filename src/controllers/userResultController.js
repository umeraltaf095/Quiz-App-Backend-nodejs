import resultModel from "../models/resultModel.js";

export const userResult = async (req , res) =>{
    try{
    const userId = req.query.id;

     const existingUser =  await resultModel.find({userId});
     if(!existingUser){
        res.json({message : "Result of this user not found"});
     }
     res.json(existingUser);
     

    } catch (err){
        res.json({error:err.message});
    }


}