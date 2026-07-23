const { Certificate } = require('../models');
const asyncHandler = require('../utils/asyncHandler');

// Admin: issue a new certificate.
exports.issue = asyncHandler(async (req, res) => {
  const cert = await Certificate.create(req.body);
  res.status(201).json({ success: true, data: cert });
});

// Admin: list all certificates.
exports.list = asyncHandler(async (req, res) => {
  const filter = req.query.status ? { status: req.query.status } : {};
  const certs = await Certificate.find(filter).sort({ createdAt: -1 });
  res.json({ success: true, count: certs.length, data: certs });
});

// Public: verify a certificate by its id or verification code.
exports.verify = asyncHandler(async (req, res) => {
  const { code } = req.params;
  const cert = await Certificate.findOne({
    $or: [{ certificateId: code.toUpperCase() }, { verificationCode: code }],
  });
  if (!cert) {
    return res.status(404).json({ success: false, valid: false, message: 'No certificate matches this code.' });
  }
  return res.json({
    success: true,
    valid: cert.status === 'valid',
    data: {
      certificateId: cert.certificateId,
      recipientName: cert.recipientName,
      courseTitle: cert.courseTitle,
      issuedBy: cert.issuedBy,
      issuedOn: cert.issuedOn,
      status: cert.status,
    },
  });
});

// Admin: revoke a certificate.
exports.revoke = asyncHandler(async (req, res) => {
  const cert = await Certificate.findByIdAndUpdate(req.params.id, { status: 'revoked' }, { new: true });
  if (!cert) { const e = new Error('Certificate not found'); e.statusCode = 404; throw e; }
  res.json({ success: true, data: cert });
});
