// ============================================
// Global Error Middleware
// ============================================

/**
 * 404 Route Handler
 */

export const notFoundHandler = (
  req,
  res,
  next
) => {
  res.status(404).json({
    success: false,

    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
};

/**
 * Global Error Handler
 */

export const errorHandler = (
  err,
  req,
  res,
  next
) => {
  console.error(
    "Server Error:",
    err
  );

  let statusCode =
    res.statusCode &&
    res.statusCode !== 200
      ? res.statusCode
      : 500;

  let message =
    err.message ||
    "Internal Server Error";

  /* MongoDB Cast Error */

  if (
    err.name ===
    "CastError"
  ) {
    statusCode = 400;

    message =
      "Invalid resource ID";
  }

  /* Duplicate Key */

  if (
    err.code === 11000
  ) {
    statusCode = 400;

    message =
      "Duplicate field value already exists";
  }

  /* Validation Error */

  if (
    err.name ===
    "ValidationError"
  ) {
    statusCode = 400;

    message = Object.values(
      err.errors
    )
      .map(
        (val) =>
          val.message
      )
      .join(", ");
  }

  res.status(statusCode).json({
    success: false,

    message,

    stack:
      process.env
        .NODE_ENV ===
      "production"
        ? null
        : err.stack,
  });
};