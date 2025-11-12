// Load environment variables
require('dotenv').config();

// Import dependencies
const connectToMongo = require('./db');
const express = require('express');
const cors = require('cors');

// Connect to MongoDB
connectToMongo();

// Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

// ✅ Export app for Vercel (do NOT listen here)
module.exports = app;

// ✅ Optional local dev mode
if (require.main === module) {
  const port = process.env.PORT || 5000;
  app.listen(port, () => {
    console.log(`iNoteX backend running locally on http://localhost:${port}`);
  });
}
