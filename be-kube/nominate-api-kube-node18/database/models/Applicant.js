// Applicant.js

const mongoose = require('mongoose');

// Define the schema
const applicantSchema = new mongoose.Schema({
  uuid: {
    type: String,
    required: true,
    unique: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  mobileNumber: String,
  email: {
    type: String,
    required: true,
    unique: true,
  },
  isPrimary: Boolean,
});

// Create and export the model
const Applicant = mongoose.model('Applicant', applicantSchema);
module.exports = Applicant;
