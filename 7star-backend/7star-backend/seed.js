require('dotenv').config();
const connectDB = require('./config/db');
const Product = require('./models/Product');
const seedData = require('./seedData');

async function seed() {
  await connectDB();

  try {
    await Product.deleteMany({});
    await Product.insertMany(seedData);
    console.log(`Seeded ${seedData.length} products into MongoDB.`);
  } catch (error) {
    console.error('Seeding failed:', error.message);
  } finally {
    process.exit(0);
  }
}

seed();
