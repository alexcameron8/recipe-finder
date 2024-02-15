import { Router } from "express";
import { createUser, findUser } from "../server/connect.js";

// Note: Create static routes to dynamic routes top to bottom
const router = Router();

// Function to validate email format
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Function to validate password format
function validatePassword(password) {
  // Password must be at least 6 characters and contain at least one number, one character, and one symbol
  const passwordRegex =
    /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&*(),.?":{}|<>])[a-zA-Z0-9!@#$%^&*(),.?":{}|<>]{6,}$/;
  return passwordRegex.test(password);
}

// Function to check for special characters in a string
function containsSpecialCharacters(str) {
  // Regular expression to match special characters
  const regex = /[!@#$%^&*()+=[\]{};':"\\|,.<>/?]/;
  return regex.test(str);
}

// Middleware to sanitize input
const sanitizeLoginInput = (req, res, next) => {
  // Extract email and password from request body
  const { email, password } = req.body;
  const errors = [];

  // Validate email
  if (!validateEmail(email)) {
    errors.push({ msg: "Invalid email format" });
  }

  // Check for validation errors
  if (errors.length > 0) {
    return res.status(403).json({ errors });
  }
  next();
};

const sanitizeRegisterInput = (req, res, next) => {
  // Extract email and password from request body
  const { firstName, lastName, email, password, confirmPassword } = req.body;
  const errors = [];
  // Check for special characters in first name
  if (containsSpecialCharacters(firstName)) {
    errors.push({ msg: "First name contains invalid characters" });
  }

  // Check for special characters in last name
  if (containsSpecialCharacters(lastName)) {
    errors.push({ msg: "Last name contains invalid characters" });
  }
  // Validate email
  if (!validateEmail(email)) {
    errors.push({ msg: "Invalid email format" });
  }

  // Validate password
  if (!validatePassword(password)) {
    errors.push({
      msg: "Password must be at least 6 characters and contain at least one number, one character, and one symbol",
    });
  }
  if (password !== confirmPassword) {
    errors.push({
      msg: "Passwords do not match",
    });
  }

  // Check for validation errors
  if (errors.length > 0) {
    return res.status(403).json({ errors });
  }
  next();
};

router.get("/", (req, res) => {
  res.send("User List");
});

router.post("/register", sanitizeRegisterInput, async (req, res) => {
  try {
    console.log("Request body:", req.body);

    const { email, password, firstName, lastName, confirmPassword } = req.body;

    const result = await createUser(
      email.toLowerCase(),
      firstName,
      lastName,
      password,
      confirmPassword,
    );
    if (result.status) {
      res.status(200).send(result.data);
    } else {
      res.status(403).json({ error: "Registration failed - provide reason" });
    }
  } catch (error) {
    res.status(500).json({ error: "Unknown Error: Registration failed" });
  }
});

router.post("/login", sanitizeLoginInput, async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await findUser(email.toLowerCase(), password);

    if (result.status) {
      //user successfully logged in
      return res.status(200).send(result.data);
    } else {
      //user unsuccessfully logged in
      return res.status(403).send(result.data);
    }
    // await console.log(user);
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

export default router;
