const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, printf } = format;

const fmt = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] [${level}] ${message}`;
});

const registerLogger = lbl => {
  return createLogger({
    level: 'debug',
    transports: [new transports.Console()],
    format: combine(label({ label: lbl }), timestamp(), fmt),
  });
};

module.exports.logger = registerLogger;
