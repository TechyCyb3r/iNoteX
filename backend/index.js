require('dotenv').config();
const connectToMongo = require('./db');
const express = require('express');
const cors = require('cors');

// MongoDB connection
connectToMongo();

// Create app
const app = express();

// CORS Setup
app.use(cors({
  origin: '*', // Or use your frontend domain for more security
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

// ✅ DON'T use app.listen()
// Instead, export the app for Vercel
module.exports = app;
