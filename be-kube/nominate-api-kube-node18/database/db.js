const mongoose = require('mongoose');

//const mongodbUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/applicants-app-db';
const mongodbUri = process.env.MONGODB_URI || 'mongodb://mongodb:27017/applicants-app-db';
//const mongodbUri = process.env.MONGODB_URI || 'mongodb://host.docker.internal:27017/applicants-app-db';

// Connect to MongoDB
const connectToDatabase = async () => {
  try {

    await mongoose.connect(mongodbUri, {});
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1); // Exit the process on database connection error
  }
};

const disconnectFromDatabase = () => {
  mongoose.disconnect();
  console.log('Disconnected from MongoDB');
};

module.exports = {
  connectToDatabase,
  disconnectFromDatabase,
};
