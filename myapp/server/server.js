const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const { initializeInventoryDB, initializeDefaultStock } = require('./inventory');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:8080', 'http://localhost:8081'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Test route to verify server is working
app.get('/api/test', (req, res) => {
  res.json({ message: 'Server is working!', timestamp: new Date().toISOString() });
});

// Import and use inventory routes
try {
  const inventoryRoutes = require('./routes/inventory');
  app.use('/api/inventory', inventoryRoutes);
  console.log('✅ Inventory routes loaded successfully');
} catch (error) {
  console.error('❌ Failed to load inventory routes:', error);
}

// Database setup
const dbPath = path.join(__dirname, 'membership.db');
const db = new sqlite3.Database(dbPath);

// Initialize inventory database
initializeInventoryDB()
  .then(() => initializeDefaultStock())
  .then(() => {
    console.log('Inventory system initialized successfully');
  })
  .catch(err => {
    console.error('Failed to initialize inventory system:', err);
  });

// Create tables if they don't exist
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS members (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    fullName TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    phone TEXT NOT NULL,
    age INTEGER NOT NULL,
    gender TEXT NOT NULL,
    height REAL NOT NULL,
    weight REAL NOT NULL,
    bmi REAL NOT NULL,
    bmiCategory TEXT NOT NULL,
    goal TEXT NOT NULL,
    experience TEXT NOT NULL,
    preferredTime TEXT,
    medicalConditions TEXT,
    address TEXT,
    emergencyContact TEXT NOT NULL,
    membershipPlan TEXT NOT NULL,
    submittedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);
});

// Helper function to calculate BMI category
const getBMICategory = (bmi) => {
  const bmiValue = parseFloat(bmi);
  if (bmiValue < 18.5) return "Underweight";
  if (bmiValue < 25) return "Normal weight";
  if (bmiValue < 30) return "Overweight";
  return "Obese";
};

// Routes

// GET all members
app.get('/api/members', (req, res) => {
  db.all('SELECT * FROM members ORDER BY submittedAt DESC', (err, rows) => {
    if (err) {
      console.error('Error fetching members:', err);
      return res.status(500).json({ error: 'Failed to fetch members' });
    }
    res.json({ success: true, data: rows });
  });
});

// GET member by ID
app.get('/api/members/:id', (req, res) => {
  const { id } = req.params;
  db.get('SELECT * FROM members WHERE id = ?', [id], (err, row) => {
    if (err) {
      console.error('Error fetching member:', err);
      return res.status(500).json({ error: 'Failed to fetch member' });
    }
    if (!row) {
      return res.status(404).json({ error: 'Member not found' });
    }
    res.json({ success: true, data: row });
  });
});

// POST new member
app.post('/api/members', (req, res) => {
  const {
    fullName, email, phone, age, gender, height, weight, bmi,
    goal, experience, preferredTime, medicalConditions, address,
    emergencyContact, membershipPlan
  } = req.body;

  // Validate required fields
  if (!fullName || !email || !phone || !age || !gender || !height || !weight || !emergencyContact || !membershipPlan) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const bmiCategory = getBMICategory(bmi);

  const query = `INSERT INTO members (
    fullName, email, phone, age, gender, height, weight, bmi, bmiCategory,
    goal, experience, preferredTime, medicalConditions, address,
    emergencyContact, membershipPlan
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  const values = [
    fullName, email, phone, age, gender, height, weight, bmi, bmiCategory,
    goal, experience, preferredTime, medicalConditions, address,
    emergencyContact, membershipPlan
  ];

  db.run(query, values, function(err) {
    if (err) {
      console.error('Error inserting member:', err);
      if (err.code === 'SQLITE_CONSTRAINT_UNIQUE') {
        return res.status(400).json({ error: 'Email already exists' });
      }
      return res.status(500).json({ error: 'Failed to create member' });
    }
    
    res.status(201).json({ 
      success: true, 
      message: 'Member created successfully',
      data: { id: this.lastID }
    });
  });
});

// PUT update member
app.put('/api/members/:id', (req, res) => {
  const { id } = req.params;
  const {
    fullName, email, phone, age, gender, height, weight, bmi,
    goal, experience, preferredTime, medicalConditions, address,
    emergencyContact, membershipPlan
  } = req.body;

  const bmiCategory = getBMICategory(bmi);

  const query = `UPDATE members SET 
    fullName = ?, email = ?, phone = ?, age = ?, gender = ?, height = ?, weight = ?, 
    bmi = ?, bmiCategory = ?, goal = ?, experience = ?, preferredTime = ?, 
    medicalConditions = ?, address = ?, emergencyContact = ?, membershipPlan = ?
    WHERE id = ?`;

  const values = [
    fullName, email, phone, age, gender, height, weight, bmi, bmiCategory,
    goal, experience, preferredTime, medicalConditions, address,
    emergencyContact, membershipPlan, id
  ];

  db.run(query, values, function(err) {
    if (err) {
      console.error('Error updating member:', err);
      return res.status(500).json({ error: 'Failed to update member' });
    }
    
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Member not found' });
    }
    
    res.json({ success: true, message: 'Member updated successfully' });
  });
});

// DELETE member
app.delete('/api/members/:id', (req, res) => {
  const { id } = req.params;
  
  db.run('DELETE FROM members WHERE id = ?', [id], function(err) {
    if (err) {
      console.error('Error deleting member:', err);
      return res.status(500).json({ error: 'Failed to delete member' });
    }
    
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Member not found' });
    }
    
    res.json({ success: true, message: 'Member deleted successfully' });
  });
});

// GET statistics
app.get('/api/stats', (req, res) => {
  const queries = {
    totalMembers: 'SELECT COUNT(*) as count FROM members',
    averageAge: 'SELECT AVG(age) as avg FROM members',
    averageBMI: 'SELECT AVG(bmi) as avg FROM members',
    goalDistribution: 'SELECT goal, COUNT(*) as count FROM members GROUP BY goal',
    bmiDistribution: 'SELECT bmiCategory, COUNT(*) as count FROM members GROUP BY bmiCategory'
  };

  const stats = {};
  let completed = 0;
  const total = Object.keys(queries).length;

  Object.entries(queries).forEach(([key, query]) => {
    db.all(query, (err, rows) => {
      if (err) {
        console.error(`Error in ${key} query:`, err);
        stats[key] = null;
      } else {
        stats[key] = rows;
      }
      
      completed++;
      if (completed === total) {
        res.json({ success: true, data: stats });
      }
    });
  });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'Server is running', timestamp: new Date().toISOString() });
});

// Test endpoint for frontend
app.get('/api/test', (req, res) => {
  res.json({
    success: true,
    message: 'Frontend-Backend connection working!',
    timestamp: new Date().toISOString(),
    headers: req.headers
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📊 Database: ${dbPath}`);
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down server...');
  db.close((err) => {
    if (err) {
      console.error('Error closing database:', err);
    } else {
      console.log('✅ Database connection closed');
    }
    process.exit(0);
  });
});
