const pool = require('./db');
const mockData = require('./mockData');

async function seedQuizzes() {
    try {
        console.log("Starting seed process...");

        // 1. Seed Quizzes
        console.log(`Seeding ${mockData.quizzes.length} quizzes...`);
        for (const q of mockData.quizzes) {
            await pool.query(`
                INSERT INTO quizzes (quiz_id, title, category, description)
                VALUES ($1, $2, $3, $4)
                ON CONFLICT (quiz_id) DO UPDATE 
                SET title = EXCLUDED.title, 
                    category = EXCLUDED.category, 
                    description = EXCLUDED.description
            `, [q.quiz_id, q.title, q.category, q.description]);
        }

        // 2. Seed Questions
        console.log(`Seeding ${mockData.quiz_questions.length} questions...`);
        for (const q of mockData.quiz_questions) {
            await pool.query(`
                INSERT INTO quiz_questions (question_id, quiz_id, question_text)
                VALUES ($1, $2, $3)
                ON CONFLICT (question_id) DO UPDATE 
                SET question_text = EXCLUDED.question_text
            `, [q.question_id, q.quiz_id, q.question_text]);
        }

        // 3. Seed Options
        console.log(`Seeding ${mockData.quiz_options.length} options...`);
        for (const opt of mockData.quiz_options) {
            await pool.query(`
                INSERT INTO quiz_options (option_id, question_id, option_text, is_correct)
                VALUES ($1, $2, $3, $4)
                ON CONFLICT (option_id) DO UPDATE 
                SET option_text = EXCLUDED.option_text,
                    is_correct = EXCLUDED.is_correct
            `, [opt.option_id, opt.question_id, opt.option_text, opt.is_correct]);
        }

        console.log("✅ Quiz seeding complete!");

    } catch (err) {
        console.error("Error seeding quizzes:", err);
    } finally {
        pool.end();
    }
}

seedQuizzes();
