const HttpExceptions = require("../config/http-exception");
const {
  verifyAccessToken,
  verifyRefreshToken,
} = require("../helpers/jwt-helpers");

const authGuard = (req, res, next) => {
  const { authToken } = req.cookies;

  if (!authToken) {
    throw new HttpExceptions("Unauthorized access", 403);
  }

  const payload = verifyAccessToken(authToken);

  req.user = { userId: payload.userId, email: payload.email };

  next();
};

const getRefreshHeaders = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    throw new HttpExceptions("invalid authorization headers", 403);
  }

  const refreshToken = authorization.split(" ")[1];

  const payload = verifyRefreshToken(refreshToken);

  req.user = { userId: payload.userId, email: payload.email };
  next();
};

module.exports = { authGuard, getRefreshHeaders };
