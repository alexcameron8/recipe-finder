import { Router } from "express";
import { sanitize, body, validationResult } from "express-validator";
import mongoose from "mongoose";

const router = Router();
// Create static routes to dynamic routes top to bottom
// Define a User schema
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Create a User model
const User = mongoose.model("User", userSchema);

router.get("/", (req, res) => {
  res.send("User List");
});

router.post("/login", sanitizeInput, async (req, res) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    // Find the user in the database by email
    User.findOne({ email }, (err, user) => {
      if (err) {
        console.error("Error finding user:", err);
        return res.status(500).json({ message: "Internal server error" });
      }

      if (!user) {
        return res.status(400).json({ message: "Invalid email or password" });
      }

      // Compare the provided password with the hashed password in the database
      bcrypt.compare(password, user.password, (err, passwordMatch) => {
        if (err) {
          console.error("Error comparing passwords:", err);
          return res.status(500).json({ message: "Internal server error" });
        }

        if (!passwordMatch) {
          return res.status(400).json({ message: "Invalid email or password" });
        }

        // If the password matches, the user is authenticated
        return res.status(200).json({ message: "Authentication successful" });
      });
    });
  } catch (error) {
    console.error("Error authenticating user:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

router
  .route("/:userId")
  .get((req, res) => {
    req.params.userId;
    res.send(`Get user with ID ${req.params.userId}`);
  })
  .put((req, res) => {
    req.params.userId;
    res.send(`Update user with ID ${req.params.userId}`);
  })
  .delete((req, res) => {
    req.params.userId;
    res.send(`Delete user with ID ${req.params.userId}`);
  });

// Middleware to sanitize input
const sanitizeInput = (req, res, next) => {
  // Sanitize input using express-validator
  body("email").trim().isEmail().normalizeEmail();
  body("password").trim().isLength({ min: 6 });

  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

export default router;
