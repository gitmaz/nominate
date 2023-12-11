const { connectToDatabase, disconnectFromDatabase } = require('./db');
//const { connectToDatabase, disconnectFromDatabase } = require('./lowdb');
// @ts-ignore
const Applicant = require('./models/Applicant');
//const Applicant = require('./models/lowdb/Applicant');

// Function to list all applicants
const listApplicants = async () => {
  try {
    await connectToDatabase();

    // Retrieve all applicants from the database
    const allApplicants = await Applicant.find();

    // Output the list of applicants
    console.log('List of Applicants:');
    console.log(allApplicants);

    return allApplicants; // You can modify this line to return the data for further use in your application

  } catch (error) {
    console.error('Error listing applicants:', error.message);
  } finally {
    disconnectFromDatabase();
  }
};

module.exports = listApplicants;
