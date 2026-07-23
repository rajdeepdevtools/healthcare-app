const crypto = require('crypto');
const { User } = require('../models');
const { generateToken } = require('../utils/jwt');
const asyncHandler = require('../utils/asyncHandler');
const { sendMail } = require('../services/email');

const publicUser = (u) => ({ id: u._id, name: u.name, email: u.email, phone: u.phone, role: u.role, avatar: u.avatar });

exports.register = asyncHandler(async (req, res) => {
  const { name, email, password, phone } = req.body;
  if (await User.findOne({ email })) {
    const e = new Error('An account with this email already exists'); e.statusCode = 409; throw e;
  }
  const user = await User.create({ name, email, password, phone });
  res.status(201).json({ success: true, token: generateToken(user), user: publicUser(user) });
});

exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select('+password');
  if (!user || !(await user.comparePassword(password))) {
    const e = new Error('Invalid email or password'); e.statusCode = 401; throw e;
  }
  res.json({ success: true, token: generateToken(user), user: publicUser(user) });
});

exports.me = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.sub);
  if (!user) { const e = new Error('User not found'); e.statusCode = 404; throw e; }
  res.json({ success: true, user: publicUser(user) });
});

exports.forgotPassword = asyncHandler(async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  // Always respond success to avoid leaking which emails exist.
  if (user) {
    const token = crypto.randomBytes(32).toString('hex');
    user.resetPasswordToken = crypto.createHash('sha256').update(token).digest('hex');
    user.resetPasswordExpires = Date.now() + 60 * 60 * 1000;
    await user.save();
    const link = `${req.headers.origin || ''}/reset-password/${token}`;
    await sendMail({ to: user.email, subject: 'Reset your DEVI Clinic password',
      html: `<p>Reset your password using the link below (valid 1 hour):</p><p><a href="${link}">${link}</a></p>` });
  }
  res.json({ success: true, message: 'If that email exists, a reset link has been sent.' });
});

exports.resetPassword = asyncHandler(async (req, res) => {
  const hashed = crypto.createHash('sha256').update(req.params.token).digest('hex');
  const user = await User.findOne({ resetPasswordToken: hashed, resetPasswordExpires: { $gt: Date.now() } }).select('+password');
  if (!user) { const e = new Error('Reset token is invalid or has expired'); e.statusCode = 400; throw e; }
  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  await user.save();
  res.json({ success: true, message: 'Password updated. You can now sign in.' });
});
