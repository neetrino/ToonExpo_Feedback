import pino from 'pino';

export const logger = pino({
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  redact: {
    paths: [
      'email',
      'phone',
      'firstName',
      'lastName',
      'answers',
      'req.headers.authorization',
      'webhookUrl',
    ],
    remove: true,
  },
});
