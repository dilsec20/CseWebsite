const { Pool } = require('pg');

const pool = new Pool({
    connectionString: 'postgresql://postgres.xlqzqcqacpajpqwneqpa:05Supabase%40%40%3F%3F@aws-1-ap-south-1.pooler.supabase.com:6543/postgres',
    ssl: { rejectUnauthorized: false }
});

async function restoreOriginalContent() {
    try {
        const res = await pool.query('SELECT topic_id, title, content FROM cp_topics');
        console.log('Restoring original content for ' + res.rowCount + ' topics...');

        let restored = 0;
        for (const row of res.rows) {
            // Check if content has the template prepended
            if (row.content.includes('*Previous content:*')) {
                // Extract the original content after "Previous content:"
                const parts = row.content.split('*Previous content:*');
                if (parts.length > 1) {
                    const originalContent = parts[1].trim();
                    await pool.query('UPDATE cp_topics SET content = $1 WHERE topic_id = $2', [originalContent, row.topic_id]);
                    console.log('Restored: ' + row.title);
                    restored++;
                }
            }
        }

        console.log('Restored ' + restored + ' topics to original content.');
    } catch (err) {
        console.error('Error:', err);
    } finally {
        await pool.end();
    }
}

restoreOriginalContent();
