// api/index.js
const express = require('express');
const serverless = require('serverless-http');
require('dotenv').config();
const connectToMongo = require('../backend/db'); // adjust if needed

const app = express();
app.use(express.json());

// Connect to Mongo
connectToMongo();

// Sample route
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from Express on Vercel!' });
});

module.exports.handler = serverless(app);
