// require('dotenv').config();
// const connectToMongo = require('./db');
// const express = require('express')
// var cors = require('cors')

// connectToMongo();
// const app = express();
// const port = process.env.PORT;

// app.use(cors())
// app.use(express.json())

// // connect mongo on port 5000

// // Middleware to parse JSON
// app.use(express.json());

// // Available routes: -
// app.use('/api/auth/', require('./routes/auth'))
// app.use('/api/notes', require('./routes/notes'))

// app.listen(port, () => {
//   console.log(`iNotebook backent listning at http://localhost:${port}`)
// })


// // require('dotenv').config();
// // const connectToMongo = require('./db');
// // const express = require('express');
// // const cors = require('cors');

// // connectToMongo();
// // const app = express();

// // app.use(cors());
// // app.use(express.json());

// // // Available routes
// // app.use('/api/auth', require('./routes/auth'));
// // app.use('/api/notes', require('./routes/notes'));

// // // ✅ Export app (Don't listen here for Vercel)
// // module.exports = app;


// No need for dotenv on Vercel
// require('dotenv').config(); 

const connectToMongo = require('./db');
const express = require('express');
var cors = require('cors');

// Connect to the database
connectToMongo();

const app = express();

// Enable CORS for all routes
app.use(cors());

// Middleware to parse JSON request bodies
app.use(express.json());

// Available API routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

// This is the most important change:
// Export the Express app for Vercel to use as a serverless function
module.exports = app;
