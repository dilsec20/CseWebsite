const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const pool = require('./db');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// CORS Configuration
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Production database seeding endpoint
app.get('/api/admin/seed-prod', async (req, res) => {
  const secret = req.query.secret;
  if (secret !== 'dilip_admin') {
    return res.status(403).json({ error: 'Unauthorized' });
  }

  try {
    const fs = require('fs');
    const path = require('path');
    const seedPath = path.join(__dirname, 'production_seed.sql');

    if (!fs.existsSync(seedPath)) {
      return res.status(404).json({ error: 'Production seed file not found' });
    }

    console.log('🌱 Starting production database seed...');
    const sql = fs.readFileSync(seedPath, 'utf8');

    await pool.query(sql);

    console.log('✅ Production database seeded successfully!');
    res.json({
      status: 'success',
      message: 'Database seeded successfully with all 254 problems and content',
      timestamp: new Date().toISOString()
    });
  } catch (err) {
    console.error('❌ Seed error:', err);
    res.status(500).json({
      error: 'Seeding failed',
      details: err.message
    });
  }
});

// Routes
app.use("/auth", require("./routes/jwtAuth"));
app.use("/dashboard", require("./routes/dashboard"));
app.use("/api/problems", require("./routes/problems"));
app.use("/api/execute", require("./routes/execute"));
app.use("/api/quizzes", require("./routes/quizzes"));
app.use("/api/contests", require("./routes/contests"));
app.use("/api/public", require("./routes/public"));
app.use("/api/dsa", require("./routes/dsa"));

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
