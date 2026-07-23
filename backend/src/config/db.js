const mongoose = require('mongoose');
const dns = require('dns');
const env = require('./env');

// Some Windows setups expose only a non-responsive loopback DNS server to Node.
// Use public resolvers only in that specific case so mongodb+srv records resolve.
const configuredDnsServers = dns.getServers();
if (
    configuredDnsServers.length === 0 ||
    configuredDnsServers.every(server => server === '127.0.0.1' || server === '::1')
) {
    dns.setServers(['8.8.8.8', '1.1.1.1']);
}

const connectDB = async () => {
    try {
        await mongoose.connect(env.mongoUri);
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection failed:', error.message);
        throw error;
    }
};

module.exports = connectDB;
