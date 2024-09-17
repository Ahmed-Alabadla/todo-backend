const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// Define the User schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide your name"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Please provide your email"],
    unique: true, // Ensure the email is unique
    lowercase: true, // Store the email in lowercase
    match: [/.+@.+\..+/, "Please fill a valid email address"], // Email validation
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: 6, // Password length requirement
    select: false, // Exclude the password field when querying users
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },

  tasks: [
    {
      type: mongoose.Schema.Types.ObjectId, // Reference to the Task model
      ref: "Task",
    },
  ],
});

// Pre-save hook to hash the password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); // Only hash if the password is modified

  try {
    this.password = await bcrypt.hash(this.password, 10); // Hash the password
    next();
  } catch (error) {
    next(error);
  }
});

// Method to check the password during login
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password); // Compare the entered password with the hashed password
};

// Compile the schema into a model
const User = mongoose.model("User", userSchema);

module.exports = User;
