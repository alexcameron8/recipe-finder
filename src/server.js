import express from "express";
import userRoutes from "./routes/users.js";
const app = express();

app.use("/users", userRoutes);

app.get("/", (req, res) => {
  console.log("Here");
  res.status(500).send("Hi");
  res.render("index");
});

app.listen(3000);
