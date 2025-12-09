const { Router } = require("express");
const {
  loginUser,
  logoutUser,
  generateNewAccessToken,
} = require("../controllers/auth-controllers");
const { authGuard, getRefreshHeaders } = require("../middlewares/auth-guard");
const authRoutes = Router();

authRoutes.post("/login", loginUser);
authRoutes.post("/logout", authGuard, logoutUser);
authRoutes.get("/new-access-token", getRefreshHeaders, generateNewAccessToken);

module.exports = authRoutes;
