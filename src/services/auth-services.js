const { getUser } = require("./user-services");
const { verifyPassword } = require("../helpers/password");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../helpers/jwt-helpers");
const HttpExceptions = require("../config/http-exception");

/**
 * Authenticate user with email and password.
 */
const authenthicateUser = async (email, password) => {
  const user = await getUser({ email });

  if (!user) {
    throw new HttpExceptions("User with this email does not exist", 404);
  }

  if (!user.isVerified) {
    throw new HttpExceptions("User account is not verified", 403);
  }

  const passwordIsValid = await verifyPassword(password, user?.password);

  if (!passwordIsValid) {
    throw new HttpExceptions("Invalid login credentials", 403);
  }

  const payload = { userId: user._id.toString(), email: user.email };

  const accessToken = generateAccessToken(payload, "1h");
  const refreshToken = generateRefreshToken(payload, "24h");

  return { accessToken, refreshToken };
};

/**
 * Generate a new access token for the user.
 */
const getNewAccessToken = async (userId) => {
  const user = await getUser({ _id: userId });

  const payload = { userId: user._id.toString(), email: user.email };

  const accessToken = generateAccessToken(payload, "1h");

  return { accessToken };
};

module.exports = { authenthicateUser, getNewAccessToken };
