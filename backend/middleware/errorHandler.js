// Global error handler - catches all errors passed via next(error)
const errorHandler = (err, req, res, next) => {
  // Use status code from error or default to 500
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Something went wrong';

  res.status(statusCode).json({
    success: false,
    message,
    // Show stack trace only in development
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
  });
};

module.exports = errorHandler;
