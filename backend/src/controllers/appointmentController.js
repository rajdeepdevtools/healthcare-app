const { Appointment } = require('../models');
const asyncHandler = require('../utils/asyncHandler');
const { uploadBuffer } = require('../services/cloudinary');
const { sendMail, appointmentConfirmation } = require('../services/email');

exports.create = asyncHandler(async (req, res) => {
  if (String(req.body.consent) !== 'true' && req.body.consent !== true) {
    const e = new Error('Consent is required to book an appointment'); e.statusCode = 400; throw e;
  }
  let reportUrl = '';
  if (req.file) reportUrl = (await uploadBuffer(req.file.buffer, 'devi-clinic/reports')) || '';
  const appointment = await Appointment.create({
    ...req.body,
    consent: true,
    reportUrl,
    patient: req.user ? req.user.sub : undefined,
  });
  sendMail(appointmentConfirmation(appointment)).catch(() => {});
  res.status(201).json({ success: true, appointment });
});

exports.list = asyncHandler(async (req, res) => {
  const { status, q } = req.query;
  const filter = {};
  if (status) filter.status = status;
  if (q) filter.$or = [{ name: new RegExp(q, 'i') }, { email: new RegExp(q, 'i') }, { appointmentId: new RegExp(q, 'i') }];
  const appointments = await Appointment.find(filter).sort({ createdAt: -1 });
  res.json({ success: true, count: appointments.length, appointments });
});

exports.mine = asyncHandler(async (req, res) => {
  const appointments = await Appointment.find({ patient: req.user.sub }).sort({ createdAt: -1 });
  res.json({ success: true, appointments });
});

exports.updateStatus = asyncHandler(async (req, res) => {
  const appointment = await Appointment.findByIdAndUpdate(
    req.params.id, { status: req.body.status }, { new: true, runValidators: true });
  if (!appointment) { const e = new Error('Appointment not found'); e.statusCode = 404; throw e; }
  res.json({ success: true, appointment });
});

exports.remove = asyncHandler(async (req, res) => {
  const appointment = await Appointment.findByIdAndDelete(req.params.id);
  if (!appointment) { const e = new Error('Appointment not found'); e.statusCode = 404; throw e; }
  res.json({ success: true, message: 'Appointment deleted' });
});
