const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const pool = require('./db');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Routes
app.use("/auth", require("./routes/jwtAuth"));
app.use("/dashboard", require("./routes/dashboard"));
app.use("/api/problems", require("./routes/problems"));
app.use("/api/execute", require("./routes/execute"));
app.use("/api/quizzes", require("./routes/quizzes"));
app.use("/api/quizzes", require("./routes/quizzes"));
app.use("/api/contests", require("./routes/contests"));
app.use("/api/public", require("./routes/public"));
app.use("/api/dsa", require("./routes/dsa"));

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
