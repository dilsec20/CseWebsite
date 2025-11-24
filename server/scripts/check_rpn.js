const pool = require('../db');

async function checkRPN() {
    const client = await pool.connect();
    try {
        console.log('🔍 Checking Evaluate Reverse Polish Notation...\n');

        const res = await client.query("SELECT problem_id, title, description FROM problems WHERE title = 'Evaluate Reverse Polish Notation'");

        res.rows.forEach(p => {
            console.log(`\n[ID: ${p.problem_id}] Length: ${p.description?.length}`);
            console.log(`Preview: ${p.description?.substring(0, 50)}...`);
        });

    } catch (err) {
        console.error('Error:', err);
    } finally {
        client.release();
        await pool.end();
    }
}

checkRPN();
