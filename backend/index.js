require('dotenv').config();
const connectToMongo = require('./db');
const express = require('express');
const cors = require('cors');

connectToMongo();
const app = express();
const port = process.env.PORT || 5000;

// ✅ CORS Setup
app.use(cors({
  origin: '*', // Replace with 'http://localhost:5173' or your deployed frontend domain for better security
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware
app.use(express.json());

// Routes
app.use('/api/auth/', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

// Start Server
app.listen(port, () => {
  console.log(`iNotebook backend listening at http://localhost:${port}`);
});
