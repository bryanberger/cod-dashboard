const path = require('path')
const { createLogger, format, transports } = require('winston')
const { combine, timestamp, label, printf } = format
const logPath = path.resolve(__dirname, '../logs')

const logFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level}: ${message}`
})

const logger = createLogger({
  level: 'info',
  // format: format.json(),
  format: combine(timestamp(), logFormat),
  transports: [
    //
    // - Write to all logs with level `info` and below to `combined.log`
    // - Write all logs error (and below) to `error.log`.
    //
    new transports.File({
      filename: path.join(logPath, 'error.log'),
      level: 'error',
    }),
    new transports.File({ filename: path.join(logPath, 'combined.log') }),
  ],
})

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new transports.Console({
      format: format.simple(),
    }),
  )
}

module.exports = logger
