const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'dilip',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    database: process.env.DB_NAME || 'placement_prep',
});

async function verifyProblems() {
    const client = await pool.connect();
    try {
        // Get total count
        const count = await client.query('SELECT COUNT(*) FROM problems');
        console.log(`\n📊 Total Problems: ${count.rows[0].count}\n`);

        // Get breakdown by difficulty
        const difficulty = await client.query(`
            SELECT difficulty, COUNT(*) as count 
            FROM problems 
            GROUP BY difficulty 
            ORDER BY difficulty
        `);
        console.log('Difficulty Breakdown:');
        difficulty.rows.forEach(row => {
            console.log(`   ${row.difficulty}: ${row.count}`);
        });

        // Get breakdown by topic
        const topics = await client.query(`
            SELECT topic, COUNT(*) as count 
            FROM problems 
            GROUP BY topic 
            ORDER BY count DESC
        `);
        console.log('\nTopic Breakdown:');
        topics.rows.forEach(row => {
            console.log(`   ${row.topic}: ${row.count}`);
        });

        // Sample a few problems
        const sample = await client.query(`
            SELECT title, difficulty, topic 
            FROM problems 
            ORDER BY RANDOM() 
            LIMIT 10
        `);
        console.log('\nSample Problems:');
        sample.rows.forEach((row, idx) => {
            console.log(`   ${idx + 1}. [${row.difficulty}] ${row.title} (${row.topic})`);
        });

        // Check test cases
        const testCases = await client.query(`
            SELECT 
                COUNT(*) as total,
                COUNT(*) FILTER (WHERE is_sample = true) as sample,
                COUNT(*) FILTER (WHERE is_sample = false) as hidden
            FROM test_cases
        `);
        console.log('\nTest Cases:');
        console.log(`   Total: ${testCases.rows[0].total}`);
        console.log(`   Sample: ${testCases.rows[0].sample}`);
        console.log(`   Hidden: ${testCases.rows[0].hidden}`);

    } finally {
        client.release();
        pool.end();
    }
}

verifyProblems();
