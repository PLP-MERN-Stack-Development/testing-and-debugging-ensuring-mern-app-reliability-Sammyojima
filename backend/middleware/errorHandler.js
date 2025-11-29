// middleware/errorHandler.js
export const errorHandler = (err, req, res, next) => {
  console.error(err.stack); // log the error stack for debugging

  const statusCode = err.statusCode || 500; // default to 500 if not set
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    success: false,
    message,
  });
};
