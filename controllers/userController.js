const jwt = require("jsonwebtoken");
const User = require("../models/User"); // Import User model
const bcrypt = require("bcryptjs");

const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// ========== REGISTER ==========
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const user = await User.create({ name, email, password });
    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    res.status(400).json({ message: "Error registering user", error });
  }
};

// ========== LOGIN ==========
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  // Check if email and password are provided
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    // Find user by email and explicitly select password
    const user = await User.findOne({ email }).select("+password");

    // If no user found
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Check if the password is correct
    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate JWT token
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(200).json({
      message: "User Logging successfully",
      token: token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        tasks: user.tasks,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// =========== CHANGE PASSWORD ===========
const changePassword = async (req, res) => {
  const { old_password, new_password } = req.body;

  try {
    const userId = req.user._id;

    // Find the user by their ID and select the password field
    const user = await User.findById(userId).select("+password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the old password matches
    const isMatch = await user.comparePassword(old_password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid old password" });
    }

    // Hash the new password before saving
    // const hashedPassword = await bcrypt.hash(new_password, 10);
    // user.password = hashedPassword;
    user.password = new_password;

    // Save the updated user with the new hashed password
    await user.save();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Error changing password: ", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ========== CHANGE NAME ==========
const changeName = async (req, res) => {
  const { new_name, password } = req.body;

  try {
    const userId = req.user._id; // Assuming userId is set by authentication middleware

    // Find the user by their ID and select the password field
    const user = await User.findById(userId).select("+password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the provided password matches the stored password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Update the user's name
    user.name = new_name;
    await user.save();

    res.status(200).json({
      message: "Name updated successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// ===========  DELETE USER ===========
const deleteUser = async (req, res) => {
  try {
    const userId = req.user._id; // Get the logged-in user's ID

    const user = await User.findByIdAndDelete(userId);

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getUsers,
  registerUser,
  loginUser,
  changePassword,
  changeName,
  deleteUser,
};
