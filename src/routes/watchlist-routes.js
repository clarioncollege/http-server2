const { Router } = require("express");
const {
  createWatchlist,
  getWatchlist,
} = require("../controllers/watchlist-controllers");
const { authGuard } = require("../middlewares/auth-guard");
const {
  watchlistDataValidators,
  checkValidationResult,
} = require("../middlewares/data-validators");

const watchlistRoutes = Router();

watchlistRoutes.post(
  "/",
  authGuard,
  watchlistDataValidators,
  checkValidationResult,
  createWatchlist
);
watchlistRoutes.get("/", authGuard, getWatchlist);

module.exports = watchlistRoutes;
