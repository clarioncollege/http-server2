const jwt = require("jsonwebtoken");
const { REFRESH_JWT_SECRET, ACCESS_JWT_SECRET } = require("../config");

const generateAccessToken = (payload, expiresIn) => {
  return jwt.sign(payload, ACCESS_JWT_SECRET, { expiresIn });
};

const generateRefreshToken = (payload, expiresIn) => {
  return jwt.sign(payload, REFRESH_JWT_SECRET, { expiresIn });
};

const verifyAccessToken = (accessToken) => {
  return jwt.verify(accessToken, ACCESS_JWT_SECRET);
};

const verifyRefreshToken = (refreshToken) => {
  return jwt.verify(refreshToken, REFRESH_JWT_SECRET);
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
};
