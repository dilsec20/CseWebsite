const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const pool = require('./db');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// CORS Configuration with debugging
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'https://placement-prep-frontend.onrender.com',
  process.env.FRONTEND_URL
].filter(Boolean);

console.log('🔐 CORS Allowed Origins:', allowedOrigins);

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      console.log(`✅ Allowing origin: ${origin}`);
      callback(null, true);
    } else {
      console.warn(`❌ Blocking origin: ${origin}`);
      callback(null, true); // Temporarily allow all for debugging
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'token']
}));

app.use(express.json({ limit: '10mb' }));

// Routes
app.use("/auth", require("./routes/jwtAuth"));
app.use("/dashboard", require("./routes/dashboard"));
app.use("/api/problems", require("./routes/problems"));
app.use("/api/execute", require("./routes/execute"));
app.use("/api/quizzes", require("./routes/quizzes"));
app.use("/api/contests", require("./routes/contests"));
app.use("/api/public", require("./routes/public"));
app.use("/api/dsa", require("./routes/dsa"));

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV}`);
  console.log(`FRONTEND_URL: ${process.env.FRONTEND_URL}`);
});
