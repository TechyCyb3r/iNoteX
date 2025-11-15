require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectToMongo = require('./db');

connectToMongo();

const app = express();
app.use(express.json());

// CORS CONFIG
app.use(cors({
  origin: [
    "http://localhost:3000",
    "https://*.vercel.app",
    "https://inotex.thehimanshu.tech"
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true
}));

// ROUTES
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

app.get('/', (req, res) => {
  res.send('API is running...');
});

// EXPORT APP
module.exports = app;

// RUN SERVER (Only when running directly)
if (require.main === module) {
  const port = process.env.PORT || 5000;
  app.listen(port, () => console.log(`Backend running on port ${port}`));
}
