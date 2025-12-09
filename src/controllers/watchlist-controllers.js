const {
  addMovieToWatchlist,
  getWatchlistByUserId,
} = require("../services/watchlist-services");
const ResponseHandler = require("../config/response-handler");

const createWatchlist = async (req, res, next) => {
  try {
    const { userId } = req.user;
    const { movieTitle, movieId, ratings, moviePoster } = req.body;

    const result = await addMovieToWatchlist(userId, {
      movieTitle,
      movieId,
      ratings,
      moviePoster,
    });

    if (result) {
      ResponseHandler.ok(res, "movie added to watchlist", result);
    } else {
      ResponseHandler.ok(res, "movie removed from watchlist", null);
    }
  } catch (error) {
    next(error);
  }
};

const getWatchlist = async (req, res, next) => {
  try {
    const { userId } = req.user;
    const params = req.query;

    const result = await getWatchlistByUserId(userId, params);

    ResponseHandler.ok(res, "success", result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createWatchlist,
  getWatchlist,
};
