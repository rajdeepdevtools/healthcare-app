const jwt = require('jsonwebtoken');
const env = require('../config/env');

function generateToken(user) {
  return jwt.sign(
    { sub: user.id || user._id.toString(), role: user.role || 'patient' },
    env.jwtSecret,
    { expiresIn: env.jwtExpiresIn },
  );
}

module.exports = { generateToken };
