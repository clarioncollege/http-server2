module.exports = {
  "/api/v1/watchlists": {
    post: {
      tags: ["Watchlists"],
      summary: "Add and remove from watchlists",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                movieTitle: { type: "string" },
                movieId: { type: "string" },
                moviePoster: { type: "number" },
              },
              required: ["movieTitle", "movieId", "moviePoster"],
            },
          },
        },
      },
      responses: {
        201: { description: "New movie added to watchlist" },
      },
    },

    get: {
      tags: ["Watchlists"],
      summary: "Get all watchlist items for a user",
      parameters: [
        {
          in: "query",
          name: "page",
          schema: {
            type: "integer",
            default: 1,
          },
          description: "Page number for pagination",
        },

        {
          in: "query",
          name: "limit",
          schema: {
            type: "integer",
            default: 10,
          },
          description: "Limit number for pagination",
        },
      ],
      response: {
        200: { description: "Success" },
      },
    },
  },
};
