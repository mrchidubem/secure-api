/**
 * Express global error handler
 * - Catches errors from controllers & middleware
 * - Sends consistent JSON response to client
 * - Logs error using centralized logger
 */

import { log } from "../utils/logger.js";

export const globalErrorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const status = err.status || "error";

  // Log error
  log({
    level: "error",
    event: "REQUEST_ERROR",
    message: err.message,
    data: {
      path: req.originalUrl,
      method: req.method,
      stack: err.stack,
    },
  });

  res.status(statusCode).json({
    status,
    message: err.message,
  });
};
