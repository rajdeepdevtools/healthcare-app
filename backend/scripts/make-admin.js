/**
 * make-admin.js — Run this script to promote a user to admin role.
 * 
 * Usage:
 *   node scripts/make-admin.js your@email.com
 */

require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const mongoose = require('mongoose');
const dns = require('dns');

// Fix for Windows DNS resolution with MongoDB Atlas SRV records
const configuredDnsServers = dns.getServers();
if (
  configuredDnsServers.length === 0 ||
  configuredDnsServers.every(server => server === '127.0.0.1' || server === '::1')
) {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
}

const email = process.argv[2];

if (!email) {
  console.error('\n❌  Please provide an email address.');
  console.error('    Usage: node scripts/make-admin.js your@email.com\n');
  process.exit(1);
}

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  role: { type: String, enum: ['patient', 'admin', 'doctor'], default: 'patient' },
}, { strict: false });

async function main() {
  console.log('\n🔗  Connecting to MongoDB...');
  await mongoose.connect(process.env.MONGO_URI);
  console.log('✅  Connected.\n');

  const User = mongoose.model('User', UserSchema);
  const user = await User.findOne({ email: email.toLowerCase().trim() });

  if (!user) {
    console.error(`❌  No user found with email: ${email}`);
    await mongoose.disconnect();
    process.exit(1);
  }

  const prevRole = user.role;
  user.role = 'admin';
  await user.save();

  console.log(`✅  Done!`);
  console.log(`    Name  : ${user.name}`);
  console.log(`    Email : ${user.email}`);
  console.log(`    Role  : ${prevRole} → admin\n`);
  console.log('🎉  This user can now log in and access the Admin Panel.\n');

  await mongoose.disconnect();
}

main().catch((err) => {
  console.error('❌  Error:', err.message);
  process.exit(1);
});
