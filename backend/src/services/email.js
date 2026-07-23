const nodemailer = require('nodemailer');
const env = require('../config/env');

let transporter = null;

function getTransporter() {
  if (!env.smtp.host || !env.smtp.user) return null;
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: env.smtp.host,
      port: env.smtp.port,
      secure: env.smtp.port === 465,
      auth: { user: env.smtp.user, pass: env.smtp.pass },
    });
  }
  return transporter;
}

/**
 * Sends an email. If SMTP is not configured, it no-ops (logs in dev) so the
 * app keeps working in local/dev without credentials.
 */
async function sendMail({ to, subject, html, text }) {
  const tx = getTransporter();
  if (!tx) {
    if (env.nodeEnv !== 'production') console.log(`[email:skipped] -> ${to} | ${subject}`);
    return { skipped: true };
  }
  return tx.sendMail({ from: env.mailFrom, to, subject, html, text });
}

function appointmentConfirmation(appointment) {
  return {
    to: appointment.email,
    subject: `Appointment received — ${appointment.appointmentId}`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:560px;margin:auto">
        <h2 style="color:#193b2e">DEVI Homeopathy Clinic</h2>
        <p>Dear ${appointment.name},</p>
        <p>We have received your appointment request. Our team will confirm your slot shortly.</p>
        <table style="border-collapse:collapse">
          <tr><td style="padding:4px 12px 4px 0"><b>Reference</b></td><td>${appointment.appointmentId}</td></tr>
          <tr><td style="padding:4px 12px 4px 0"><b>Preferred date</b></td><td>${new Date(appointment.preferredDate).toDateString()}</td></tr>
          <tr><td style="padding:4px 12px 4px 0"><b>Concern</b></td><td>${appointment.treatment || '—'}</td></tr>
        </table>
        <p style="margin-top:16px;color:#555">Gentle Care • Natural Healing • Lasting Wellness</p>
      </div>`,
  };
}

module.exports = { sendMail, appointmentConfirmation };
