const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/authroutes');
const inventoryRoutes = require('./routes/inventory');
const membersRoutes = require('./routes/members-simple');
const { initializeInventoryDB, initializeDefaultStock } = require('./inventory');

const app = express(); // ✅ This must come BEFORE using app.use()

app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:8080', 'http://localhost:8081','https://buildfit.onrender.com','https://buildfit.netlify.app'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/inventory', inventoryRoutes);

// Debug: Test if members route is loaded
console.log('📝 Loading members routes...');
try {
  app.use('/api/members', membersRoutes);
  console.log('✅ Members routes loaded successfully');
} catch (error) {
  console.error('❌ Error loading members routes:', error);
}

// Test route to verify server is working
app.get('/api/test', (req, res) => {
  res.json({ message: 'Server is working!', timestamp: new Date().toISOString() });
});

// Stats endpoint (redirect to members stats)
app.get('/api/stats', (req, res) => {
  console.log('📊 GET /api/stats called - redirecting to members stats');
  // For now, return simple stats since we're using in-memory storage
  res.json({
    success: true,
    data: {
      totalMembers: 0,
      activeMembers: 0,
      pendingMembers: 0,
      membershipTypes: {
        basic: 0,
        premium: 0,
        elite: 0
      },
      recentMembers: []
    }
  });
});

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('✅ MongoDB connected'))
.catch((err) => console.error('❌ MongoDB connection error:', err));

// Initialize inventory database
initializeInventoryDB()
  .then(() => initializeDefaultStock())
  .then(() => {
    console.log('✅ Inventory system initialized successfully');
  })
  .catch(err => {
    console.error('❌ Failed to initialize inventory system:', err);
  });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
