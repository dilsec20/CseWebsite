const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const pool = require('./db');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// CORS Configuration with debugging
const allowedOrigins = [
  "https://placement-prep-frontend.onrender.com",
  "http://localhost:5173",
  "http://localhost:3000",
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "token"]
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

// Initialize database on startup
async function initializeDatabase() {
  try {
    // Check if tables exist and have the correct schema (username column)
    const result = await pool.query("SELECT username FROM users LIMIT 1");
    console.log('✅ Database tables already exist');
  } catch (error) {
    // Tables don't exist, create them
    console.log('📝 Tables not found, initializing database...');
    const fs = require('fs');
    const path = require('path');

    try {
      // Read and execute schema
      const schemaPath = path.join(__dirname, 'database.sql');
      const schema = fs.readFileSync(schemaPath, 'utf8');
      await pool.query(schema);
      console.log('✅ Database tables created!');

      // Initialize mock data
      const mockData = require('./mockData.js');

      // Insert problems
      console.log('📊 Inserting mock problems...');
      for (const problem of mockData.problems) {
        await pool.query(
          'INSERT INTO problems (title, description, difficulty, topic, test_case_input, test_case_output) VALUES ($1, $2, $3, $4, $5, $6)',
          [problem.title, problem.description, problem.difficulty, problem.topic, problem.test_case_input, problem.test_case_output]
        );
      }
      console.log(`✅ Inserted ${mockData.problems.length} problems`);

      // Insert quizzes
      for (const quiz of mockData.quizzes) {
        await pool.query(
          'INSERT INTO quizzes (quiz_id, title, category, description) VALUES ($1, $2, $3, $4)',
          [quiz.quiz_id, quiz.title, quiz.category, quiz.description]
        );
      }

      // Insert quiz questions
      for (const question of mockData.quiz_questions) {
        await pool.query(
          'INSERT INTO quiz_questions (question_id, quiz_id, question_text) VALUES ($1, $2, $3)',
          [question.question_id, question.quiz_id, question.question_text]
        );
      }

      // Insert quiz options
      for (const option of mockData.quiz_options) {
        await pool.query(
          'INSERT INTO quiz_options (option_id, question_id, option_text, is_correct) VALUES ($1, $2, $3, $4)',
          [option.option_id, option.question_id, option.option_text, option.is_correct]
        );
      }

      // Insert DSA Modules
      console.log('📚 Inserting DSA modules...');
      for (const module of mockData.dsa_modules) {
        await pool.query(
          'INSERT INTO dsa_modules (module_id, title, description, order_index) VALUES ($1, $2, $3, $4)',
          [module.module_id, module.title, module.description, module.order_index]
        );
      }

      // Insert DSA Topics
      console.log('📖 Inserting DSA topics...');
      for (const topic of mockData.dsa_topics) {
        // Try to find linked problem ID if needed
        let problemId = topic.problem_id;
        if (topic.title.includes("Kadane")) {
          const probRes = await pool.query("SELECT problem_id FROM problems WHERE title ILIKE '%Maximum Subarray%' LIMIT 1");
          if (probRes.rows.length > 0) problemId = probRes.rows[0].problem_id;
        }

        await pool.query(
          'INSERT INTO dsa_topics (topic_id, module_id, title, content, problem_id, order_index) VALUES ($1, $2, $3, $4, $5, $6)',
          [topic.topic_id, topic.module_id, topic.title, topic.content, problemId, topic.order_index]
        );
      }

      console.log(`✅ Mock data initialized: ${mockData.problems.length} problems, ${mockData.quiz_questions.length} quiz questions, ${mockData.dsa_modules.length} DSA modules`);
    } catch (initError) {
      console.error('❌ Error initializing database:', initError.message);
    }
  }
}

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV}`);
  console.log(`FRONTEND_URL: ${process.env.FRONTEND_URL}`);
  await initializeDatabase();
});
