const env = require('./config/env');
const connectDB = require('./config/db');
const app = require('./app');

async function startServer() {
  await connectDB();
  app.listen(env.port, () => {
    console.log(`DEVI Clinic API listening on port ${env.port}`);
  });
}

startServer().catch((error) => {
  console.error('Unable to start server:', error.message);
  process.exit(1);
});
