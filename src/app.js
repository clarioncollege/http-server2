const express = require("express");
const app = express();
const sanitizer = require("perfect-express-sanitizer");
const cookieParser = require("cookie-parser");
const { rateLimit } = require("express-rate-limit");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const userRoutes = require("./routes/user-routes");
const authRoutes = require("./routes/auth-routes");
const watchlistRoutes = require("./routes/watchlist-routes");
const globalErrorHandler = require("./config/global-error-handler");
const NotFoundError = require("./config/not-found-error");
const HttpExceptions = require("./config/http-exception");
const swaggerSpec = require("./config/swagger");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minute
  limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  standardHeaders: "draft-8", // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  ipv6Subnet: 56, // Set to 60 or 64 to be less aggressive, or 52 or 48 to be more aggressive
  // store: ... , // Redis, Memcached, etc. See below.
  handler: () => {
    throw new HttpExceptions(
      "Too many requests from this IP, please try again later.",
      429
    );
  },
});

app.use(cors({ origin: ["http://localhost:5173"], credentials: true }));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(limiter);
app.use(express.json({ limit: "1kb" }));
app.use(express.urlencoded({ extended: true, limit: "1kb" }));
app.use(cookieParser());
app.use(sanitizer.clean({ xxs: true, sql: true, noSql: true, level: 5 }));

// server health check
app.get("/api/v1", (req, res) => {
  res.json({ message: "Hello World!" });
});

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/watchlists", watchlistRoutes);

app.use(NotFoundError);
app.use(globalErrorHandler);

module.exports = app;
