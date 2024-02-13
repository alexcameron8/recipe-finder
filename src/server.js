import express from "express";
import userRoutes from "./routes/users.js";
import path from "path";
import { fileURLToPath } from "url";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const babelRegister = require("@babel/register");

// Register Babel to transpile JSX files on the fly
babelRegister({
  presets: ["@babel/preset-react"],
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const PORT = process.env.VITE_PORT || 3000;
app.use("/users", userRoutes);

app.get("/", (req, res) => {
  // Send JSX file content as response
  res.send("Main Page");
});

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ message: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
