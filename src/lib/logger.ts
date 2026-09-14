import pino from 'pino';

export const logger = pino({
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  redact: {
    paths: [
      'answers',
      'secret',
      'req.headers.authorization',
      'headers.authorization',
      'headers["x-webhook-secret"]',
      'webhookUrl',
    ],
    remove: true,
  },
});
