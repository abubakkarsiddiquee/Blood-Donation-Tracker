const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());

// Create a MySQL connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

db.connect(err => {
  if (err) throw err;
  console.log('MySQL connected...');
});

// Route to request a donation
app.post('/request-donation', (req, res) => {
  const { requester_id, blood_type } = req.body;

  // Insert a new donation request
  const query = `INSERT INTO DonationRequests (requester_id, blood_type) VALUES (?, ?)`;
  db.query(query, [requester_id, blood_type], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    
    const request_id = result.insertId;
    res.json({ message: 'Donation request submitted', request_id });
  });
});

// Route to match donors based on blood type
app.get('/find-donors/:blood_type', (req, res) => {
  const { blood_type } = req.params;

  const query = `SELECT * FROM Users WHERE blood_type = ? AND role = 'donor'`;
  db.query(query, [blood_type], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    
    res.json(results);
  });
});

// Route to confirm a donation by a donor
app.post('/confirm-donation', (req, res) => {
  const { request_id, donor_id } = req.body;

  const query = `INSERT INTO DonorMatches (request_id, donor_id, confirmed) VALUES (?, ?, TRUE)`;
  db.query(query, [request_id, donor_id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });

    res.json({ message: 'Donation confirmed' });
  });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
