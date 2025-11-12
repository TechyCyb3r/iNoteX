require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectToMongo = require('./db');

connectToMongo();

const app = express();

app.use(cors({
  origin: [
    "https://inote-x-git-main-himanshus-projects-87fce76b.vercel.app", // frontend domain
    "http://localhost:5173"
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
}));
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

module.exports = app; // for vercel

if (require.main === module) {
  const port = process.env.PORT || 5000;
  app.listen(port, () => console.log(`Backend running on port ${port}`));
}
