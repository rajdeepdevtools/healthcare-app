/**
 * reset-password.js — Reset any user's password directly from command line.
 *
 * Usage:
 *   node scripts/reset-password.js your@email.com NewPassword123
 */

require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const dns = require('dns');

// Fix for Windows DNS resolution with MongoDB Atlas SRV records
const configuredDnsServers = dns.getServers();
if (
  configuredDnsServers.length === 0 ||
  configuredDnsServers.every(server => server === '127.0.0.1' || server === '::1')
) {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
}

const email    = process.argv[2];
const newPass  = process.argv[3];

if (!email || !newPass) {
  console.error('\n❌  Usage: node scripts/reset-password.js your@email.com NewPassword123\n');
  process.exit(1);
}

if (newPass.length < 6) {
  console.error('\n❌  Password must be at least 6 characters.\n');
  process.exit(1);
}

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: String,
}, { strict: false });

async function main() {
  console.log('\n🔗  Connecting to MongoDB...');
  await mongoose.connect(process.env.MONGO_URI);
  console.log('✅  Connected.\n');

  const User = mongoose.model('User', UserSchema);
  const user = await User.findOne({ email: email.toLowerCase().trim() });

  if (!user) {
    console.error(`❌  No user found with email: ${email}`);
    console.log('    Please register first at /register on the website.\n');
    await mongoose.disconnect();
    process.exit(1);
  }

  const hashed = await bcrypt.hash(newPass, 12);
  user.password = hashed;
  await user.save();

  console.log('✅  Password updated successfully!');
  console.log(`    Email    : ${user.email}`);
  console.log(`    New Pass : ${newPass}`);
  console.log(`    Role     : ${user.role}\n`);
  console.log('🎉  You can now login with these credentials.\n');

  await mongoose.disconnect();
}

main().catch((err) => {
  console.error('❌  Error:', err.message);
  process.exit(1);
});
