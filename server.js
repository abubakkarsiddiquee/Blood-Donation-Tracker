const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const nodemailer = require('nodemailer'); // Import Nodemailer
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: 'http://10.10.251.233:5000',
  credentials: true,
}));

app.use(bodyParser.json());

// Create MySQL connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

// Connect to the database
db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL Database');
});

// Configure MySQL session store
const sessionStore = new MySQLStore({
  expiration: 10800000,
  createDatabaseTable: true,
}, db);

// Express-session configuration
app.use(session({
  key: 'user_sid',
  secret: 'secret_key', // Replace with your own secret
  resave: false,
  saveUninitialized: false,
  store: sessionStore,
  cookie: {
    expires: 600000,
    httpOnly: true,
  },
}));

// Create the Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
  },
});

// Function to send emails to donors
const sendEmailToDonors = async (emails, bloodType) => {
    const mailOptions = {
        from: process.env.EMAIL,
        to: emails.join(', '), // Join emails for multiple recipients
        subject: `Urgent Blood Donation Request for ${bloodType}`,
        text: `Dear Donor,\n\nWe are in urgent need of blood type ${bloodType}. If you are able to donate, please contact us at your earliest convenience.\n\nThank you for your support!`,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Emails sent successfully!');
    } catch (error) {
        console.error('Error sending emails:', error);
    }
};

// Default route for root
app.get('/', (req, res) => {
  res.send('Welcome to the Donation API');
});

// Signup endpoint
app.post('/api/signup', async (req, res) => {
  const { name, email, blood_type, password } = req.body;

  // Check if all fields are provided
  if (!name || !email || !blood_type || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Check if the user already exists
    const checkUserQuery = 'SELECT * FROM Users WHERE email = ?';
    const [existingUser] = await db.promise().query(checkUserQuery, [email]);
    if (existingUser.length > 0) {
      return res.status(400).json({ message: 'User already exists with this email.' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Insert the user into the database
    const query = 'INSERT INTO Users (name, email, blood_type, password) VALUES (?, ?, ?, ?)';
    const [result] = await db.promise().query(query, [name, email, blood_type, hashedPassword]);

    // Save the user ID in the session
    req.session.user = {
      id: result.insertId,
      name,
      email,
      blood_type,
    };

    // Send response with userId and success message
    res.status(201).json({ userId: result.insertId, message: 'Signup successful' });
  } catch (err) {
    console.error('Server error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Login endpoint
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  // Check if both email and password are provided
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  const query = 'SELECT * FROM Users WHERE email = ?';
  db.query(query, [email], async (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Server error' });
    }

    if (results.length === 0) {
      return res.status(400).json({ message: 'User not found' });
    }

    const user = results[0];
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    // Create session for the logged-in user without blood_type
    req.session.user = {
      id: user.id,
      name: user.name,
      email: user.email,
    };

    res.json({
      message: 'Login successful',
      userId: user.id,
      user: {
        name: user.name,
        email: user.email,
      },
    });
  });
});

// Search for donors by blood type or name
app.get('/api/users/search', (req, res) => {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ error: 'Search query is required' });
  }

  // SQL query to match blood type or name
  let sql = 'SELECT * FROM Users WHERE blood_type LIKE ? OR name LIKE ?';
  const values = [`%${query}%`, `%${query}%`];

  db.query(sql, values, (err, results) => {
    if (err) {
      console.error('Query error:', err);
      return res.status(500).json({ error: 'Database error' });
    }

    res.json(results);
  });
});

// Endpoint to send email requests to donors
app.post('/api/users/send-email', async (req, res) => {
  const { blood_type } = req.body;

  if (!blood_type) {
      return res.status(400).json({ error: 'Blood type is required' });
  }

  try {
      // Find donors with the specified blood type
      const [donors] = await db.promise().query('SELECT * FROM Users WHERE blood_type = ?', [blood_type]);

      if (donors.length === 0) {
          return res.status(404).json({ error: 'No donors found for this blood type' });
      }

      // Extract email addresses from donors
      const emails = donors.map(donor => donor.email);

      // Send emails to each donor
      await sendEmailToDonors(emails, blood_type);

      res.status(200).json({ message: 'Emails sent successfully' });
  } catch (error) {
      console.error('Error sending emails:', error);
      res.status(500).json({ error: 'Failed to send emails' });
  }
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
