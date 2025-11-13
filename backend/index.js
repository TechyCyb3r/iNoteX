require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectToMongo = require('./db');

connectToMongo();

const app = express();
app.use(express.json());

const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:5173",
  "https://inote-x.vercel.app",
  "https://i-note-x.vercel.app",
  "https://inotex.thehimanshu.tech",
  /\.vercel\.app$/,
  /\.thehimanshu\.tech$/
];

app.use(cors({
  origin: function(origin, callback) {
    // allow non-browser requests (curl, Postman) that have no origin
    if (!origin) return callback(null, true);

    const allowed = allowedOrigins.some(o => {
      if (o instanceof RegExp) return o.test(origin);
      return o === origin;
    });

    if (allowed) {
      // echo the origin (required when credentials: true)
      callback(null, true);
    } else {
      callback(new Error('CORS not allowed for origin: ' + origin));
    }
  },
  credentials: true,
  methods: ["GET","POST","PUT","DELETE","OPTIONS"],
  allowedHeaders: ["Content-Type","Authorization","auth-token","Accept"],
  optionsSuccessStatus: 204
}));

// ensure preflight (OPTIONS) gets correct headers
app.options('*', cors());

app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

app.get('/', (req, res) => {
  res.send('API is running...');
});

module.exports = app;

if (require.main === module) {
  const port = process.env.PORT || 5000;
  app.listen(port, () => console.log(`Backend running on port ${port}`));
}
