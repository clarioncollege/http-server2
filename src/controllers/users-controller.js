const {
  createUser,
  getUser,
  updateUser,
} = require("../services/user-services");
const { verifyEmail } = require("../services/verification-services");
const ResponseHandler = require("../config/response-handler");

const createNewUser = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const user = await createUser({ firstName, lastName, email, password });

    ResponseHandler.create(res, "User created successfully", user);
  } catch (error) {
    next(error);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const user = await getUser({ _id: userId });

    ResponseHandler.ok(res, "User fetched successfully", user);
  } catch (error) {
    next(error);
  }
};

const updateUserById = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { firstName, lastName, email, password } = req.body;

    const updateduser = await updateUser(
      { _id: userId },
      { firstName, lastName, email, password }
    );

    ResponseHandler.ok(res, "User updated successfully", updateduser);
  } catch (error) {
    next(error);
  }
};

const verifyUserEmail = async (req, res, next) => {
  try {
    const { verificationToken } = req.body;

    const user = await verifyEmail(verificationToken);

    ResponseHandler.ok(res, "User email verified successfully", user);
  } catch (error) {
    next(error);
  }
};

const getUserProfile = async (req, res, next) => {
  try {
    const { userId } = req.user;

    const currentUser = await getUser({ _id: userId });

    ResponseHandler.ok(res, "success", currentUser);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createNewUser,
  getUserById,
  updateUserById,
  verifyUserEmail,
  getUserProfile,
};
