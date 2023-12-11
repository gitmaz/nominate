const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('./../storage/lowdb/db.json'); // Specify the path to your JSON file
const db = low(adapter);

// Set up defaults if the file doesn't exist
db.defaults({ applicants: [] }).write();

const connectToDatabase = async () => {
  try {
    // No specific connection logic needed for lowdb with JSON file
    console.log('Connected to lowdb');
  } catch (error) {
    console.error('Error connecting to lowdb:', error.message);
    process.exit(1); // Exit the process on database connection error
  }
};

const disconnectFromDatabase = () => {
  // No specific disconnection logic needed for lowdb with JSON file
  console.log('Disconnected from lowdb');
};

module.exports = {
  connectToDatabase,
  disconnectFromDatabase,
  db, // Export the lowdb instance for use in other modules
};
