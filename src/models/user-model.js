const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
      trim: true,
    },

    lastName: {
      type: String,
      required: [true, "Last name is required"],
      trim: true,
    },

    email: {
      type: String,
      unique: true,
      required: [true, "Email is required"],
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    verificationToken: {
      type: String,
    },

    verificationTokenExpiresIn: {
      type: Date,
      default: Date.now() + 3600000,
    },

    passwordResetToken: {
      type: String,
    },
    passwordResetTokenExpiresIn: {
      type: Date,
      default: Date.now() + 3600000,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("user", userSchema);

module.exports = User;
