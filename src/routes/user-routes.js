const { Router } = require("express");
const {
  createNewUser,
  getUserById,
  updateUserById,
  verifyUserEmail,
  getUserProfile,
} = require("../controllers/users-controller");
const {
  checkValidationResult,
  userDataValidators,
  userVerificationValidator,
} = require("../middlewares/data-validators");
const { authGuard } = require("../middlewares/auth-guard");

const userRoutes = Router();

userRoutes.post("/", userDataValidators, checkValidationResult, createNewUser);
userRoutes.get("/me", authGuard, getUserProfile);

userRoutes.get("/:userId", getUserById);

userRoutes.put(
  "/verify",
  userVerificationValidator,
  checkValidationResult,
  verifyUserEmail
);

userRoutes.put("/:userId", updateUserById);

module.exports = userRoutes;
