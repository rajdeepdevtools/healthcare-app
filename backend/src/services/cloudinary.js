const env = require('../config/env');

let cloudinary = null;
try {
  // Optional dependency: only load if installed & configured.
  cloudinary = require('cloudinary').v2;
} catch {
  cloudinary = null;
}

const isConfigured = Boolean(env.cloudinary.cloudName && env.cloudinary.apiKey);

if (cloudinary && isConfigured) {
  cloudinary.config({
    cloud_name: env.cloudinary.cloudName,
    api_key: env.cloudinary.apiKey,
    api_secret: env.cloudinary.apiSecret,
  });
}

/**
 * Uploads a file buffer to Cloudinary. Falls back gracefully if Cloudinary
 * is not installed/configured (returns null so callers can handle it).
 */
function uploadBuffer(buffer, folder = 'devi-clinic') {
  if (!cloudinary || !isConfigured) return Promise.resolve(null);
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream({ folder }, (err, result) => {
      if (err) return reject(err);
      return resolve(result.secure_url);
    });
    stream.end(buffer);
  });
}

module.exports = { cloudinary, isConfigured, uploadBuffer };
