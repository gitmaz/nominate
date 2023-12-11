// app.js
const express = require('express');
const listApplicants = require('./database/list-applicants');
const upsertApplicants = require('./database/upsert-applicants');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// GET route to list all applicants
app.get('/api/applicants', async (req, res) => {
  try {
    const allApplicants = await listApplicants();
    res.status(200).json(allApplicants);
  } catch (error) {
    console.error('Error listing applicants:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// POST to upsert applicants
app.post('/api/applicants', async (req, res) => {
  const applicantsToUpdate = req.body;

  try {
    await upsertApplicants(applicantsToUpdate);
    res.status(200).json({ message: 'Applicants upserted successfully!' });
  } catch (error) {
    console.error('Error upserting applicants:', error.message);
    
     // Handle custom error for duplicate key violation
     if (error.message === 'Email must be unique.') {
      res.status(400).json({ error: error.message });
    } else {
      // Handle other errors
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
});


// listen to requests
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
