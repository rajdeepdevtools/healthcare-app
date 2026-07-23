const { Feedback } = require('../models');
const asyncHandler = require('../utils/asyncHandler');

exports.create = asyncHandler(async (req, res) => {
  const feedback = await Feedback.create({ ...req.body, status: 'pending' });
  res.status(201).json({ success: true, message: 'Thank you! Your feedback is awaiting review.', feedback });
});

exports.listApproved = asyncHandler(async (req, res) => {
  const feedback = await Feedback.find({ status: 'approved' }).sort({ createdAt: -1 });
  res.json({ success: true, data: feedback });
});

exports.listAll = asyncHandler(async (req, res) => {
  const filter = req.query.status ? { status: req.query.status } : {};
  const feedback = await Feedback.find(filter).sort({ createdAt: -1 });
  res.json({ success: true, data: feedback });
});

exports.setStatus = asyncHandler(async (req, res) => {
  const feedback = await Feedback.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
  if (!feedback) { const e = new Error('Feedback not found'); e.statusCode = 404; throw e; }
  res.json({ success: true, feedback });
});
