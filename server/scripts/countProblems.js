const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'dilip',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    database: process.env.DB_NAME || 'placement_prep',
});

async function checkProblemCount() {
    const client = await pool.connect();
    try {
        const result = await client.query('SELECT COUNT(*) FROM problems');
        console.log(`\nTotal problems in database: ${result.rows[0].count}`);

        const byDifficulty = await client.query(`
            SELECT difficulty, COUNT(*) 
            FROM problems 
            GROUP BY difficulty 
            ORDER BY difficulty
        `);

        console.log('\nBy difficulty:');
        byDifficulty.rows.forEach(row => {
            console.log(`  ${row.difficulty}: ${row.count}`);
        });

        const byTopic = await client.query(`
            SELECT topic, COUNT(*) 
            FROM problems 
            GROUP BY topic 
            ORDER BY topic
        `);

        console.log('\nBy topic:');
        byTopic.rows.forEach(row => {
            console.log(`  ${row.topic}: ${row.count}`);
        });

    } catch (err) {
        console.error('Error:', err.message);
    } finally {
        client.release();
        pool.end();
    }
}

checkProblemCount();
