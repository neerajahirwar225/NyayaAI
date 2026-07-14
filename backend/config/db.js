const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb+srv://neerajahirwar225_db_user:Og8UQphqmn3622uR@cluster0.ixptnr1.mongodb.net/nyaya-ai?retryWrites=true&w=majority&appName=Cluster0';
    const conn = await mongoose.connect(mongoUri);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
