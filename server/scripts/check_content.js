const { Pool } = require('pg');
const fs = require('fs');

const pool = new Pool({
    connectionString: 'postgresql://postgres.xlqzqcqacpajpqwneqpa:05Supabase%40%40%3F%3F@aws-1-ap-south-1.pooler.supabase.com:6543/postgres',
    ssl: { rejectUnauthorized: false }
});

async function checkContent() {
    const full = await pool.query('SELECT title, content FROM cp_topics WHERE topic_id = 2');
    fs.writeFileSync('topic_sample.md', full.rows[0].content);
    console.log('Written to topic_sample.md');
    await pool.end();
}

checkContent();
