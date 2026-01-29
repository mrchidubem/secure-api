export function log({
  level = "info",
  event = "GENERAL",
  message = "",
  data = null
} = {}) {
  const logEntry = {
    level,           // log severity
    event,           // machine-readable event
    message,         // human-readable message
    data,            // optional context
    time: new Date().toISOString() // timestamp
  };

  if (level === "error") {
    console.error(logEntry);
  } else if (level === "warn") {
    console.warn(logEntry);
  } else {
    console.log(logEntry);
  }
}
