import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const registerController = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (req.user.role === "admin") {
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
    } else {
      res.json({ message: `User cannot be registered by a ${role}` });
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
      return res.status(400).json({ message: "All fields are required" });
    }

    const loginInfo = await userModel.findOne({ email });
    if (!loginInfo) {
      return res.status(401).json({ message: "Wrong Email or Password" });
    }

    if (loginInfo.role !== role) {
      return res.status(403).json({ message: "Role does not match" });
    }

    const isMatch = await bcrypt.compare(password, loginInfo.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Password did not match" });
    }

    const token = jwt.sign(
      { email: loginInfo.email, role: loginInfo.role , id:loginInfo._id },
      process.env.SECRET_KEY,
      { expiresIn: "1h" }
    );

    return res.status(200).json({
      message: `${role} logged in successfully`,
      token: token,
    });
  } catch (error) {
    res.status(500).json({ message: "Error occurred", error: error.message });
  }
};
