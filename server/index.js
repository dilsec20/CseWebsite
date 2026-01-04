const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const pool = require('./db');
const path = require('path');
const fs = require('fs');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// CORS Configuration
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    env: process.env.NODE_ENV,
    timestamp: new Date().toISOString()
  });
});

// Production database seeding endpoint
app.get('/api/admin/seed-prod', async (req, res) => {
  const secret = req.query.secret;
  if (secret !== 'dilip_admin') {
    return res.status(403).json({ error: 'Unauthorized' });
  }

  try {
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

// Gamification Migration Endpoint (Production)
app.get('/api/admin/migrate-gamification', async (req, res) => {
  if (req.query.secret !== 'dilip_admin') return res.status(403).json({ error: 'Unauthorized' });
  try {
    console.log('🎮 Starting Gamification Migration...');
    // 1. Add columns
    await pool.query(`
          ALTER TABLE users 
          ADD COLUMN IF NOT EXISTS current_streak INT DEFAULT 0,
          ADD COLUMN IF NOT EXISTS last_solved_at TIMESTAMP,
          ADD COLUMN IF NOT EXISTS total_solved INT DEFAULT 0;
      `);

    // 2. Backfill total_solved
    await pool.query(`
          WITH user_counts AS (
              SELECT user_id, COUNT(DISTINCT problem_id) as solved_count
              FROM submissions
              WHERE status = 'Accepted' OR status = 'Success'
              GROUP BY user_id
          )
          UPDATE users
          SET total_solved = user_counts.solved_count
          FROM user_counts
          WHERE users.user_id = user_counts.user_id;
      `);

    res.json({ status: 'success', message: 'Gamification Schema Applied & Backfilled' });
  } catch (err) {
    console.error('Migration failed:', err);
    res.status(500).json({ error: err.message });
  }
});

// Fix RLS Access
app.get('/api/admin/fix-rls', async (req, res) => {
  if (req.query.secret !== 'dilip_admin') return res.status(403).json({ error: 'Unauthorized' });
  try {
    const sqlPath = path.join(__dirname, 'fix_rls.sql');
    if (!fs.existsSync(sqlPath)) return res.status(404).json({ error: 'fix_rls.sql not found' });

    await pool.query(fs.readFileSync(sqlPath, 'utf8'));
    res.json({ status: 'success', message: 'RLS Backend Access Fixed' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Disable RLS (Emergency)
app.get('/api/admin/disable-rls', async (req, res) => {
  if (req.query.secret !== 'dilip_admin') return res.status(403).json({ error: 'Unauthorized' });
  try {
    const sqlPath = path.join(__dirname, 'disable_rls.sql');
    if (!fs.existsSync(sqlPath)) return res.status(404).json({ error: 'disable_rls.sql not found' });

    await pool.query(fs.readFileSync(sqlPath, 'utf8'));
    res.json({ status: 'success', message: 'RLS Disabled on all tables' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Routes
app.use("/auth", require("./routes/jwtAuth"));
app.use("/api/dashboard", require("./routes/dashboard"));
app.use("/api/problems", require("./routes/problems"));
app.use("/api/execute", require("./routes/execute"));
app.use("/api/admin", require("./routes/admin")); // Admin Routes
app.use("/api/quizzes", require("./routes/quizzes"));
app.use("/api/contests", require("./routes/contests"));
app.use("/api/admin/contests", require("./routes/admin_contests")); // New Admin Contest Routes
app.use("/api/public", require("./routes/public"));
app.use("/api/dsa", require("./routes/dsa"));
app.use("/api/cp", require("./routes/cp"));
app.use("/api/ai", require("./routes/ai"));
app.use("/api/gamification", require("./routes/gamification"));
app.use("/api/study-plans", require("./routes/studyPlans"));
app.use("/api/blogs", require("./routes/blogs"));
app.use("/api/social", require("./routes/social"));
app.use("/api/courses", require("./routes/courses"));

// Serve static assets in production
const distPath = path.join(__dirname, '../client/dist');

if (process.env.NODE_ENV === 'production' || fs.existsSync(distPath)) {
  console.log(`📂 Serving static files from: ${distPath}`);

  app.use(express.static(distPath));

  // Handle SPA routing - return index.html for any unknown routes
  app.get(/.*/, (req, res) => {
    res.sendFile(path.resolve(distPath, 'index.html'));
  });
}

// Auto-fix schema on startup
const fixSchema = require('./scripts/fix_schema');
fixSchema();

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
