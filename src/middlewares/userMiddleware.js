import jwt from "jsonwebtoken";

export const authenticToken = (req, res, next) => {
  const jwtToken = req.headers["authorization"];

  if (!jwtToken) {
    res.json({ message: "Token not found" });
  }

  try {
    const authentic = jwt.verify(jwtToken, process.env.SECRET_KEY);
    console.log(authentic.role);
    req.user = authentic.role;

    if (authentic) {
      next();
    }
  } catch (err) {
    res.json({
      error: err.message,
    });
  }
};

export const authenticRole = async (req, res, next) => {
  try {
    if (req.user == "teacher") {
      next();
    } else {
      return res.json({
        message: "Access denied other than the teachers",
      });
    }
  } catch (err) {
    return res.json({ error: err.message });
  }
};
