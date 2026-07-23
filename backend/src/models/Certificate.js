const mongoose = require('mongoose');
const crypto = require('crypto');

const certificateSchema = new mongoose.Schema(
  {
    certificateId: { type: String, unique: true, index: true },
    recipientName: { type: String, required: true, trim: true },
    recipientEmail: { type: String, lowercase: true, trim: true },
    courseTitle: { type: String, required: true, trim: true },
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
    issuedBy: { type: String, default: 'DEVI Homeopathy Clinic' },
    issuedOn: { type: Date, default: Date.now },
    verificationCode: { type: String, index: true },
    status: { type: String, enum: ['valid', 'revoked'], default: 'valid' },
  },
  { timestamps: true }
);

// Generate a human-friendly certificate id + verification code before save.
certificateSchema.pre('validate', function assignIds(next) {
  if (!this.certificateId) {
    const rand = crypto.randomBytes(3).toString('hex').toUpperCase();
    const year = new Date(this.issuedOn || Date.now()).getFullYear();
    this.certificateId = `DEVI-${year}-${rand}`;
  }
  if (!this.verificationCode) {
    this.verificationCode = crypto.randomBytes(8).toString('hex');
  }
  next();
});

module.exports = mongoose.model('Certificate', certificateSchema);
