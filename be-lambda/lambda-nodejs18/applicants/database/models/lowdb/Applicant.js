// Applicant.js

const { db } = require('../../lowdb');

// Function to get the lowdb applicants collection
const getApplicantsCollection = () => db.get('applicants');

// Function to list all applicants
const findAll = () => getApplicantsCollection().value();

// Function to find an applicant by uuid
const findByUuid = (uuid) => getApplicantsCollection().find({ uuid }).value();

// Function to find an applicant by email
const findByEmail = (email) => getApplicantsCollection().find({ email }).value();

// Function to create a new applicant
const create = (applicant) => getApplicantsCollection().push(applicant).write();

// Function to update an existing applicant by uuid
const updateByUuid = (uuid, data) => getApplicantsCollection().find({ uuid }).assign(data).write();


// Function to find applicants based on query (for example: { isPrimary: true })
const find = (query) => getApplicantsCollection().filter(query).value();

// Function to find the first applicant based on query (for example: { isPrimary: true })
const findOne = (query) => getApplicantsCollection().find(query).value();

// Function to update the first applicant based on query (for example: { uuid: '123' })
const updateOne = (query, data) => getApplicantsCollection().find(query).assign(data).write();


module.exports = {
  findAll,
  findByUuid,
  findByEmail,
  create,
  updateByUuid,
  find,
  findOne,
  updateOne,
};
