import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";

export const registerController = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
      return res.json({ message: "Field cannot be empty" });
    } else {
      const existingemail = await userModel.findOne({ email });
      if (existingemail) {
        return res.json({ message: "Email already exist" });
      }
      await userModel.create({ name, email, password, role });
      return res.json({ message: "User registered successfully" });
    }
  } catch (err) {
    res.json({ error: err.message });
  }
};

export const getUser = async (req, res) => {
  try {
    const userData = await userModel.find();

    return res.json(userData);
  } catch (err) {
    res.json({ error: err.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res.status(404).json({ message: "Any field cannot be empty" });
    }
    const loginInfo = await userModel.findOne({ email, password });
    if (!loginInfo) {
      return res.json({ message: "Wrong Email or Password" });
    }
    if (loginInfo.role !== role) {
      return res.json({ message: "Role does not match" });
    }

    const token = jwt.sign(
      { email: loginInfo.email, role: loginInfo.role },
      process.env.SECRET_KEY,
      {
        expiresIn: "1h",
      }
    );
    return res.json({ message: "User logged in successfully", token: token });
  } catch (error) {
    res.status(500).json({ message: "Error occured", error: error.message });
  }
};
