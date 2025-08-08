const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

// API Route
app.get('/api/hello', (req, res) => {
  res.json({ message: "Hello from backend!" });
});

// Don't serve frontend here — Vercel handles that

module.exports = app;
