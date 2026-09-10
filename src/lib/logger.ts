import pino from 'pino';

export const logger = pino({
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  redact: {
    paths: [
      'answers',
      'req.headers.authorization',
      'webhookUrl',
    ],
    remove: true,
  },
});
