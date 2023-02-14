import { createLogger, format, transports } from "winston";

const logger = createLogger({
  // specify the format of logs
  format: format.combine(
    format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    format.errors({ stack: true }),
    format.metadata(),
    format.json(),
    format.prettyPrint()
  ),
  // specify where to write the logs based on their severity level
  transports: [
    new transports.Console({ level: "info" }),
    // new transports.File({ filename: "logs/logInfo.log", level: "info" }),
    new transports.File({
      filename: "logs/logErrors.log",
      level: "error",
    }),
    new transports.File({
      filename: "logs/logWarnings.log",
      level: "warn",
    }),
  ],
});

export default logger;
