import { createLogger, format, transports } from "winston";
import * as chalk from "chalk";
const { combine, printf, timestamp } = format;

const { NODE_ENV } = process.env;
const chalkColors = {
  INFO: "seagreen",
  DEBUG: "dodgerblue",
  ERROR: "firebrick"
};

function formatObject(param) {
  if (typeof param === 'object') {
    return JSON.stringify(param);
  }
  return `"${param}"`;
}

const logFormatter = printf(info => {
  info.level = info.level.toUpperCase();
  return chalk.keyword(chalkColors[info.level])(
    `[${info.timestamp}] [${info.level}]: {"message": ${formatObject(
      info.message
    )}}`
  );
});

const logger = createLogger({
  level: NODE_ENV === "production" ? "error" : "debug",
  format: combine(
    timestamp({
      format: "YYYY-MM-DD HH:mm:ss"
    }),
    logFormatter
  ),
  transports: [new transports.Console({})]
});

export default logger;
