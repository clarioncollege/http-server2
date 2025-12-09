const { Schema, model } = require("mongoose");

const watchlistSchema = new Schema(
  {
    movieTitle: {
      type: String,
      required: [true, "Movie title is required"],
    },

    movieId: {
      type: String,
      required: [true, "Movie ID is required"],
    },

    ratings: {
      type: String,
    },

    moviePoster: {
      type: String,
    },

    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { timestamps: true }
);

const WatchList = model("watchlist", watchlistSchema);

module.exports = WatchList;
