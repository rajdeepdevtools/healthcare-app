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

// Require the actual User model so the password gets hashed by the pre-save hook
const User = require('../src/models/User');

const email = process.argv[2];
const password = process.argv[3];
const name = process.argv[4] || 'Admin User';

if (!email || !password) {
  console.error('\n❌  Usage: node scripts/create-admin.js <email> <password> ["Name"]\n');
  process.exit(1);
}

async function main() {
  console.log('\n🔗  Connecting to MongoDB...');
  await mongoose.connect(process.env.MONGO_URI);
  console.log('✅  Connected.\n');

  let user = await User.findOne({ email: email.toLowerCase().trim() });

  if (user) {
    console.log(`⚠️   User with email ${email} already exists. Promoting to admin...`);
    user.role = 'admin';
    await user.save();
  } else {
    console.log(`✨  Creating new admin user...`);
    user = await User.create({
      name,
      email: email.toLowerCase().trim(),
      password: password,
      role: 'admin'
    });
  }

  console.log(`✅  Done!`);
  console.log(`    Name     : ${user.name}`);
  console.log(`    Email    : ${user.email}`);
  console.log(`    Role     : admin\n`);
  console.log('🎉  You can now log in with these credentials at /login and access /admin.\n');

  await mongoose.disconnect();
}

main().catch((err) => {
  console.error('❌  Error:', err.message);
  process.exit(1);
});
