require('dotenv').config();

const nodeEnv = process.env.NODE_ENV || 'development';

function positiveNumber(value, fallback) {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

const env = Object.freeze({
  nodeEnv,
  port: positiveNumber(process.env.PORT, 5000),
  mongoUri: process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/devi_clinic',
  jwtSecret: process.env.JWT_SECRET || (nodeEnv === 'production' ? '' : 'development-only-secret-change-me'),
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
  clientOrigins: (process.env.CLIENT_URL || 'http://localhost:5173')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean),
  rateLimitWindowMs: positiveNumber(process.env.RATE_LIMIT_WINDOW_MS, 15 * 60 * 1000),
  rateLimitMax: positiveNumber(process.env.RATE_LIMIT_MAX, 100),
  trustProxy: positiveNumber(process.env.TRUST_PROXY, 1),
  smtp: {
    host: process.env.SMTP_HOST || '',
    port: positiveNumber(process.env.SMTP_PORT, 587),
    user: process.env.SMTP_USER || '',
    pass: process.env.SMTP_PASS || '',
  },
  mailFrom: process.env.MAIL_FROM || 'DEVI Homeopathy Clinic <no-reply@devihomeopathy.com>',
  cloudinary: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME || '',
    apiKey: process.env.CLOUDINARY_API_KEY || '',
    apiSecret: process.env.CLOUDINARY_API_SECRET || '',
  },
});

if (!env.jwtSecret) throw new Error('JWT_SECRET is required in production');

module.exports = env;
