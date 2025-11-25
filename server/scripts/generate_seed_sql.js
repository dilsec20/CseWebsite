const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const pool = new Pool({
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'dilip',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    database: process.env.DB_NAME || 'placement_prep',
});

function escapeSql(val) {
    if (val === null || val === undefined) return 'NULL';
    if (typeof val === 'number') return val;
    if (typeof val === 'boolean') return val ? 'true' : 'false';
    if (typeof val === 'object') return `'${JSON.stringify(val).replace(/'/g, "''")}'`;
    // Escape single quotes by doubling them
    return `'${val.replace(/'/g, "''")}'`;
}

async function generateSeed() {
    try {
        console.log('📦 Generating Seed SQL...');
        const stream = fs.createWriteStream(path.join(__dirname, '../seed_prod.sql'));

        stream.write('-- Production Seed File\n');
        stream.write('BEGIN;\n\n');

        // 1. Users
        console.log('   - Exporting Users...');
        const users = await pool.query('SELECT * FROM users');
        for (const row of users.rows) {
            stream.write(`INSERT INTO users (user_id, username, email, password, full_name, role, created_at, bio, profile_picture, linkedin_url, github_url, website_url, twitter_url) VALUES (${escapeSql(row.user_id)}, ${escapeSql(row.username)}, ${escapeSql(row.email)}, ${escapeSql(row.password)}, ${escapeSql(row.full_name)}, ${escapeSql(row.role)}, ${escapeSql(row.created_at)}, ${escapeSql(row.bio)}, ${escapeSql(row.profile_picture)}, ${escapeSql(row.linkedin_url)}, ${escapeSql(row.github_url)}, ${escapeSql(row.website_url)}, ${escapeSql(row.twitter_url)}) ON CONFLICT (user_id) DO UPDATE SET bio = EXCLUDED.bio, profile_picture = EXCLUDED.profile_picture, linkedin_url = EXCLUDED.linkedin_url, github_url = EXCLUDED.github_url;\n`);
        }

        // 2. DSA Modules
        console.log('   - Exporting DSA Modules...');
        const modules = await pool.query('SELECT * FROM dsa_modules ORDER BY order_index');
        for (const row of modules.rows) {
            stream.write(`INSERT INTO dsa_modules (module_id, title, description, order_index, created_at) VALUES (${escapeSql(row.module_id)}, ${escapeSql(row.title)}, ${escapeSql(row.description)}, ${escapeSql(row.order_index)}, ${escapeSql(row.created_at)}) ON CONFLICT (module_id) DO NOTHING;\n`);
        }

        // 3. DSA Topics
        console.log('   - Exporting DSA Topics...');
        const topics = await pool.query('SELECT * FROM dsa_topics ORDER BY order_index');
        for (const row of topics.rows) {
            stream.write(`INSERT INTO dsa_topics (topic_id, module_id, title, content, order_index, created_at) VALUES (${escapeSql(row.topic_id)}, ${escapeSql(row.module_id)}, ${escapeSql(row.title)}, ${escapeSql(row.content)}, ${escapeSql(row.order_index)}, ${escapeSql(row.created_at)}) ON CONFLICT (topic_id) DO NOTHING;\n`);
        }

        // 4. Problems
        console.log('   - Exporting Problems...');
        const problems = await pool.query('SELECT * FROM problems');
        for (const row of problems.rows) {
            stream.write(`INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (${escapeSql(row.problem_id)}, ${escapeSql(row.title)}, ${escapeSql(row.description)}, ${escapeSql(row.difficulty)}, ${escapeSql(row.topic)}, ${escapeSql(row.test_case_input)}, ${escapeSql(row.test_case_output)}, ${escapeSql(row.input_format)}, ${escapeSql(row.output_format)}, ${escapeSql(row.constraints)}, ${escapeSql(row.source)}, ${escapeSql(row.created_at)}) ON CONFLICT (problem_id) DO NOTHING;\n`);
        }

        // 5. Test Cases (This is huge, maybe chunk it?)
        console.log('   - Exporting Test Cases...');
        const testCases = await pool.query('SELECT * FROM test_cases');
        for (const row of testCases.rows) {
            stream.write(`INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (${escapeSql(row.test_case_id)}, ${escapeSql(row.problem_id)}, ${escapeSql(row.input)}, ${escapeSql(row.expected_output)}, ${escapeSql(row.is_hidden)}, ${escapeSql(row.is_sample)}) ON CONFLICT (test_case_id) DO NOTHING;\n`);
        }

        // 6. Quizzes
        console.log('   - Exporting Quizzes...');
        const quizzes = await pool.query('SELECT * FROM quizzes');
        for (const row of quizzes.rows) {
            stream.write(`INSERT INTO quizzes (quiz_id, title, description, category, difficulty, time_limit, created_at) VALUES (${escapeSql(row.quiz_id)}, ${escapeSql(row.title)}, ${escapeSql(row.description)}, ${escapeSql(row.category)}, ${escapeSql(row.difficulty)}, ${escapeSql(row.time_limit)}, ${escapeSql(row.created_at)}) ON CONFLICT (quiz_id) DO NOTHING;\n`);
        }

        // 7. Quiz Questions
        console.log('   - Exporting Quiz Questions...');
        const quizQuestions = await pool.query('SELECT * FROM quiz_questions');
        for (const row of quizQuestions.rows) {
            stream.write(`INSERT INTO quiz_questions (question_id, quiz_id, text, type, points, created_at) VALUES (${escapeSql(row.question_id)}, ${escapeSql(row.quiz_id)}, ${escapeSql(row.text)}, ${escapeSql(row.type)}, ${escapeSql(row.points)}, ${escapeSql(row.created_at)}) ON CONFLICT (question_id) DO NOTHING;\n`);
        }

        // 8. Quiz Options
        console.log('   - Exporting Quiz Options...');
        const quizOptions = await pool.query('SELECT * FROM quiz_options');
        for (const row of quizOptions.rows) {
            stream.write(`INSERT INTO quiz_options (option_id, question_id, text, is_correct) VALUES (${escapeSql(row.option_id)}, ${escapeSql(row.question_id)}, ${escapeSql(row.text)}, ${escapeSql(row.is_correct)}) ON CONFLICT (option_id) DO NOTHING;\n`);
        }

        stream.write('COMMIT;\n');
        stream.end();
        console.log('✅ Seed file generated: server/seed_prod.sql');

    } catch (err) {
        console.error('❌ Error generating seed:', err);
    } finally {
        pool.end();
    }
}

generateSeed();
