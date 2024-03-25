// Use `info` as our standard log level if not specified
// eslint-disable-next-line no-undef
const options: any = {level: process.env.LOG_LEVEL || 'info'};

// If we're doing `debug` logging, make the logs easier to read
if (process.env.NODE_ENV === 'development' || options.level === 'debug') {
  // https://github.com/pinojs/pino-pretty
  options.transport = {
    target: 'pino-pretty',
    options: {
      colorize: true,
    },
  };
}

if (process.env.NODE_ENV === 'production') {
  // https://github.com/pinojs/pino/blob/master/docs/redaction.md
  options.redact = {
    paths: [], // add object properties to redact
    censor: '[REDACTED]',
    // remove: true,
  };
};

// Create and export a Pino Logger instance:
// https://getpino.io/#/docs/api?id=logger
export default require('pino')(options);
