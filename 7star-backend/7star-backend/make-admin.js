require('dotenv').config();
const connectDB = require('./config/db');
const User = require('./models/User');

async function makeAdmin() {
  const email = process.argv[2];
  if (!email) {
    console.error('Usage: npm run make-admin -- user@example.com');
    process.exitCode = 1;
    return;
  }

  await connectDB();
  const user = await User.findOneAndUpdate(
    { email: email.toLowerCase() },
    { role: 'admin' },
    { new: true }
  );

  if (!user) {
    console.error(`No user found for ${email}`);
    await require('mongoose').disconnect();
    process.exitCode = 1;
    return;
  }

  console.log(`${user.email} is now an admin.`);
  await require('mongoose').disconnect();
  process.exitCode = 0;
}

makeAdmin().catch((error) => {
  console.error('Could not promote user:', error.message);
  process.exitCode = 1;
});
