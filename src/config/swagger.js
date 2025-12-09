const swaggerJsdoc = require("swagger-jsdoc");
const userDocs = require("../routes/swagger-docs/user-docs");
const watchlistDocs = require("../routes/swagger-docs/watchlist-docs");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "My REST API Documentation",
      version: "1.0.0",
      description: "API documentation for my REST API using Swagger",
    },
    paths: {
      ...userDocs,
      ...watchlistDocs,
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: [],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
