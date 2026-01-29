import config from './config/index.js';
import app from './app.js';
import { log } from './utils/logger.js';
import connectDB from './database/index.js';

// Catch synchronous crashes
process.on('uncaughtException', (err) => {
  log({
    level: "error",
    event: "UNCAUGHT_EXCEPTION",
    message: err.message,
    data: err
  });
  setTimeout(() => process.exit(1), 100);
});

// Catch unhandled promise rejections
process.on('unhandledRejection', (err) => {
  log({
    level: "error",
    event: "UNHANDLED_REJECTION",
    message: err.message,
    data: err
  });
  setTimeout(() => process.exit(1), 100);
});

(async () => {
  try {
    await connectDB(); 

    app.listen(config.port, () => {
      log({
        level: "info",
        event: "SERVER_STARTED",
        message: `Server running on port ${config.port}`
      });
    });

  } catch (err) {
    log({
      level: "error",
      event: "STARTUP_ERROR",
      message: err.message,
      data: err
    });
    process.exit(1);
  }
})();
