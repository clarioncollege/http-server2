const HttpExceptions = require("../config/http-exception");
const WatchList = require("../models/watchlist-model");
const { getPagination } = require("../helpers/pagination");

const addMovieToWatchlist = async (userId, movieData) => {
  const movieExistOnWatchlist = await WatchList.findOne({
    movieId: movieData.movieId,
    createdBy: userId,
  });

  if (movieExistOnWatchlist) {
    await WatchList.findOneAndDelete({
      movieId: movieData.movieId,
      createdBy: userId,
    });
  } else {
    const newMovie = new WatchList({ ...movieData, createdBy: userId });

    await newMovie.save();

    return newMovie;
  }
};

const getWatchlistByUserId = async (userId, params) => {
  const { pageNumber, limitNumber, skip } = getPagination(
    params.page,
    params.limit
  );

  const [watchlist, totalItems] = await Promise.all([
    WatchList.find({ createdBy: userId })
      .sort({ createdAt: -1 }) // Optional: sort by newest first
      .skip(skip)
      .limit(limitNumber)
      .populate("createdBy", "email firstName lastName isVerified"),
    WatchList.countDocuments({ createdBy: userId }),
  ]);

  return {
    page: pageNumber,
    totalPages: Math.ceil(totalItems / limitNumber),
    totalItems,
    watchlist,
  };
};

module.exports = { addMovieToWatchlist, getWatchlistByUserId };
