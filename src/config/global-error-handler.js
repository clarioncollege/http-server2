const globalErrorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const error = err.message || "Internal Server Error";

  res.status(statusCode).json({ error });
};

module.exports = globalErrorHandler;
