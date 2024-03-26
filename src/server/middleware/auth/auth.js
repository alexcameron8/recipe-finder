// backend/middleware/auth.js
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const userVerification = async (req, res, next) => {
  const token = req.headers;
  console.log(token);
  if (!token) {
    return res.json({ status: false });
  }

  jwt.verify(token, process.env.VITE_TOKEN_KEY, async (err, data) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    } else {
      req.userId = data.userId;
      next();
    }
  });
};

export default userVerification;
