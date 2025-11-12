require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectToMongo = require('./db');

connectToMongo();

const app = express();

app.use(cors({
  origin: [
    "http://localhost:5173",
    /\.vercel\.app$/,
    /\.thehimanshu\.tech$/
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true
}));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

module.exports = app; // for vercel

if (require.main === module) {
  const port = process.env.PORT || 5000;
  app.listen(port, () => console.log(`Backend running on port ${port}`));
}
