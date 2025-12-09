const User = require("../models/user-model");
const { generateVerificationToken } = require("../helpers/auth-helpers");
const HttpExceptions = require("../config/http-exception");
const { hashPassword } = require("../helpers/password");
const { sendVerificationEmail } = require("./email-services");

const createUser = async (userData) => {
  const verificationToken = generateVerificationToken();
  const user = await User.create({
    ...userData,
    verificationToken,
    password: await hashPassword(userData.password),
  });

  if (!user) {
    throw new HttpExceptions("User creation failed", 400);
  }

  // await sendVerificationEmail(
  //   user.email,
  //   "Email Verification",
  //   user.verificationToken,
  //   user.firstName
  // );
  return {
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    verificationToken: user.verificationToken,
  };
};

const getUser = async (query) => {
  const user = await User.findOne(query).select(
    "firstName lastName email isVerified password verificationToken verificationTokenExpiresIn"
  );

  if (!user) {
    throw new HttpExceptions("User not found", 404);
  }

  return user;
};

const updateUser = async (query, updateData) => {
  const updatedUser = await User.findOneAndUpdate(query, updateData, {
    new: true,
  });

  if (!updatedUser) {
    throw new HttpExceptions("User update failed", 400);
  }

  return updatedUser;
};

module.exports = { createUser, getUser, updateUser };
