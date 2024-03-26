import dotenv from "dotenv";
dotenv.config();

import jwt from "jsonwebtoken";

export function createSecretToken(id) {
  const private_token = process.env.VITE_TOKEN_KEY;
  return jwt.sign({ id }, private_token, { expiresIn: "3d" });
}
