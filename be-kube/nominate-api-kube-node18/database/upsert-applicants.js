const { connectToDatabase, disconnectFromDatabase } = require('./db');
//const { connectToDatabase, disconnectFromDatabase } = require('./lowdb');
// @ts-ignore
const Applicant = require('./models/Applicant');
//const Applicant = require('./models/Applicant');

// Function to upsert (update or insert) applicants
const upsertApplicants = async (applicants) => {
  try {
    await connectToDatabase();

    for (const applicant of applicants) {
      const existingApplicant = await Applicant.findOne({ uuid: applicant.uuid });

      if (existingApplicant) {
        await Applicant.updateOne({ uuid: applicant.uuid }, { $set: applicant });
      } else {
        await Applicant.create(applicant);
      }
    }

    console.log('Applicants upserted successfully!');
  } catch (error) {
    console.error('Error upserting applicants:', error.message);

    // Check if it's a MongoDB duplicate key error
    if (error.code === 11000) {
      throw new Error('Email must be unique.'); // Throw custom error with specific message
    }

    throw error; // Re-throw other errors

  } finally {
    disconnectFromDatabase();
  }
};

module.exports = upsertApplicants;
