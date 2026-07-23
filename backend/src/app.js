const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const { rateLimit } = require('express-rate-limit');
const morgan = require('morgan');
const env = require('./config/env');
const { errorHandler, notFound } = require('./middleware/errorMiddleware');
const routes = require('./routes');

const app = express();

// Health check endpoint for Render
app.get('/', (req, res) => {
  res.status(200).send('API is running smoothly!');
});


app.disable('x-powered-by');
app.set('trust proxy', env.trustProxy);

app.use(helmet());
app.use(cors({
  origin(origin, callback) {
    if (!origin || env.clientOrigins.includes(origin)) return callback(null, true);
    const error = new Error('Origin is not allowed by CORS');
    error.statusCode = 403;
    return callback(error);
  },
  credentials: true,
}));
app.use(rateLimit({
  windowMs: env.rateLimitWindowMs,
  limit: env.rateLimitMax,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  message: { success: false, message: 'Too many requests. Please try again shortly.' },
}));
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

if (env.nodeEnv !== 'test') app.use(morgan(env.nodeEnv === 'production' ? 'combined' : 'dev'));

app.get('/api/health', (req, res) => {
  res.status(200).json({ success: true, message: 'DEVI Clinic API is healthy' });
});
app.use('/api', routes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
