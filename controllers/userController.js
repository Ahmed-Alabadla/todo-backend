const jwt = require("jsonwebtoken");
const User = require("../models/User"); // Import User model

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
    const userId = req.user._id; // Get the logged-in user's ID

    const user = await User.findById(userId);

    // Check if the password is correct
    const isMatch = await user.comparePassword(old_password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Update the password
    Object.assign(user, { password: new_password });
    await user.save();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// =========== CHANGE NAME ===========
const changeName = async (req, res) => {
  const { password, new_name } = req.body;

  try {
    const userId = req.user._id; // Get the logged-in user's ID

    const user = await User.findById(userId);

    // Check if the password is correct
    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Update the password
    Object.assign(user, { name: new_name });
    await user.save();

    res.status(200).json({ message: "Password updated successfully" });
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
