require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const User = require('./models/User');

const email = process.env.ADMIN_EMAIL || 'admin@7star.com';
const password = process.env.ADMIN_PASSWORD || 'Admin@12345';

async function createAdmin() {
  await connectDB();
  const existingUser = await User.findOne({ email: email.toLowerCase() });

  if (existingUser) {
    existingUser.name = '7STAR Admin';
    existingUser.password = password;
    existingUser.role = 'admin';
    await existingUser.save();
    console.log(`Admin account updated: ${email}`);
  } else {
    await User.create({ name: '7STAR Admin', email, password, role: 'admin' });
    console.log(`Admin account created: ${email}`);
  }

  await mongoose.disconnect();
}

createAdmin().catch(async (error) => {
  console.error('Could not create admin:', error.message);
  await mongoose.disconnect();
  process.exitCode = 1;
});
