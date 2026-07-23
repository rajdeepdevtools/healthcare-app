const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema(
  {
    appointmentId: { type: String, unique: true, index: true },
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    phone: { type: String, required: true, trim: true },
    age: { type: Number, min: 0 },
    gender: { type: String, enum: ['Male', 'Female', 'Other'] },
    treatment: { type: String, trim: true },
    preferredDate: { type: Date, required: true },
    message: { type: String, trim: true },
    reportUrl: { type: String, default: '' },
    consent: { type: Boolean, required: true },
    status: { type: String, enum: ['pending', 'confirmed', 'completed', 'cancelled'], default: 'pending', index: true },
    patient: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

appointmentSchema.pre('validate', function genId(next) {
  if (!this.appointmentId) {
    const rand = Math.floor(1000 + Math.random() * 9000);
    this.appointmentId = `DEVI-${Date.now().toString(36).toUpperCase()}-${rand}`;
  }
  next();
});

module.exports = mongoose.model('Appointment', appointmentSchema);
