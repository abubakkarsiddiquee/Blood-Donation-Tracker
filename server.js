const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: 'http://192.168.0.105:5000', // or '*'
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
    expires: 600000,  // Session expiration (in milliseconds)
    httpOnly: true,   // Prevents client-side JavaScript from accessing cookies
  },
}));

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

// Search users endpoint
app.get('/api/users/search', (req, res) => {
  const { blood_type, name } = req.query;

  // Log received query parameters
  console.log('Received query parameters:', req.query);

  let sql = 'SELECT * FROM Users WHERE 1=1';
  const values = [];

  if (blood_type) {
      sql += ' AND blood_type = ?';
      values.push(blood_type);
  }

  if (name) {
      sql += ' AND name LIKE ?';
      values.push(`%${name}%`); // For partial matches
  }

  // Log the query and values
  console.log('SQL Query:', sql);
  console.log('Values:', values);

  db.query(sql, values, (err, results) => {
      if (err) {
          console.error('Query error:', err);
          return res.status(500).json({ error: 'Database error' });
      }

      // Log the results
      console.log('Query Results:', results);

      // Return the found users
      res.json(results);
  });
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
