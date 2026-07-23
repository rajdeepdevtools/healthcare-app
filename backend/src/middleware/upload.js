const multer = require('multer');

// In-memory storage: buffers are streamed to Cloudinary (see services/cloudinary.js).
const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter(req, file, cb) {
    const ok = /image\/(png|jpe?g|webp)|application\/pdf/.test(file.mimetype);
    cb(ok ? null : new Error('Only images and PDF files are allowed'), ok);
  },
});

module.exports = upload;
