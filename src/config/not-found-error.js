const NotFoundError = (req, res, next) => {
  res.status(404).json({
    error: "Not Found",
    path: req.originalUrl,
    method: req.method,
    status: 404,
  });
};

module.exports = NotFoundError;
