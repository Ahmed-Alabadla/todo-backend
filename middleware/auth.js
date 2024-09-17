const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Middleware to authenticate and attach user to request

// Authentication Middleware
const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization").replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    // Verify the token (will throw an error if expired)
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded; // Attach the decoded token data (e.g., user ID) to the request object
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res
        .status(401)
        .json({ message: "Session expired. Please log in again." });
    }
    res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = authMiddleware;
