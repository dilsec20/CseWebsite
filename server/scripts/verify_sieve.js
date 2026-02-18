const pool = require('../db');

async function verify() {
    try {
        const r = await pool.query(
            "SELECT LENGTH(content) as len, LEFT(content, 400) as preview FROM cp_topics WHERE title LIKE '%Sieve%'"
        );
        console.log('Content length:', r.rows[0].len, 'characters');
        console.log('---');
        console.log('Preview:\n', r.rows[0].preview);
        console.log('---');
        console.log('✅ Content verified in database!');
        process.exit(0);
    } catch (err) {
        console.error('Error:', err.message);
        process.exit(1);
    }
}

verify();
