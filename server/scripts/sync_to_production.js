const { Pool } = require('pg');
require('dotenv').config();

// Local database connection
const localPool = new Pool({
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'dilip',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    database: process.env.DB_NAME || 'placement_prep',
});

// Production database connection
const prodPool = new Pool({
    connectionString: 'postgres://postgres_4skc_user:A5sR9gJjXh2tZkLp@dpg-d4i99fpr0fns73ane58g-a.singapore-postgres.render.com/postgres_4skc',
    ssl: { rejectUnauthorized: false }
});

async function syncTable(tableName, idColumn, columns) {
    const localClient = await localPool.connect();
    const prodClient = await prodPool.connect();

    try {
        console.log(`\n🔄 Syncing table: ${tableName}...`);

        // Get all local data
        const res = await localClient.query(`SELECT * FROM ${tableName}`);
        const rows = res.rows;
        console.log(`   Found ${rows.length} rows locally.`);

        if (rows.length === 0) return;

        let inserted = 0;
        let skipped = 0;

        for (const row of rows) {
            // Construct INSERT query dynamically
            const cols = columns.filter(c => row[c] !== undefined);
            const values = cols.map(c => row[c]);
            const placeholders = cols.map((_, i) => `$${i + 1}`).join(', ');
            const colNames = cols.map(c => `"${c}"`).join(', '); // Quote column names

            const query = `
                INSERT INTO ${tableName} (${colNames})
                VALUES (${placeholders})
                ON CONFLICT ("${idColumn}") DO NOTHING
            `;

            try {
                const result = await prodClient.query(query, values);
                if (result.rowCount > 0) inserted++;
                else skipped++;
            } catch (err) {
                console.error(`   ❌ Error inserting row ${row[idColumn]}: ${err.message}`);
            }
        }

        console.log(`   ✅ Synced: ${inserted} inserted, ${skipped} skipped (already existed).`);

    } catch (err) {
        console.error(`   ❌ Error syncing ${tableName}: ${err.message}`);
    } finally {
        localClient.release();
        prodClient.release();
    }
}

async function syncAll() {
    try {
        console.log('🚀 Starting Data Sync: Local -> Production');
        console.log('----------------------------------------');

        // 1. Users
        await syncTable('users', 'user_id', [
            'user_id', 'username', 'email', 'password', 'created_at', 'avatar', 'about',
            'github_url', 'linkedin_url', 'website_url', 'twitter_url', 'full_name'
        ]);

        // 2. DSA Modules
        await syncTable('dsa_modules', 'module_id', [
            'module_id', 'title', 'description', 'order_index', 'created_at'
        ]);

        // 3. DSA Topics
        await syncTable('dsa_topics', 'topic_id', [
            'topic_id', 'module_id', 'title', 'content', 'order_index', 'created_at'
        ]);

        // 4. Problems
        await syncTable('problems', 'problem_id', [
            'problem_id', 'title', 'description', 'difficulty', 'topic',
            'test_case_input', 'test_case_output', 'created_at',
            'input_format', 'output_format', 'constraints', 'source'
        ]);

        // 5. Test Cases
        await syncTable('test_cases', 'test_case_id', [
            'test_case_id', 'problem_id', 'input', 'expected_output', 'is_hidden', 'is_sample'
        ]);

        // 6. Quizzes
        await syncTable('quizzes', 'quiz_id', [
            'quiz_id', 'title', 'description', 'category', 'difficulty', 'time_limit', 'created_at'
        ]);

        // 7. Quiz Questions
        await syncTable('quiz_questions', 'question_id', [
            'question_id', 'quiz_id', 'text', 'type', 'points', 'created_at'
        ]);

        // 8. Quiz Options
        await syncTable('quiz_options', 'option_id', [
            'option_id', 'question_id', 'text', 'is_correct'
        ]);

        console.log('\n----------------------------------------');
        console.log('✨ Data Sync Complete!');

    } catch (err) {
        console.error('❌ Fatal Error:', err);
    } finally {
        localPool.end();
        prodPool.end();
    }
}

syncAll();
