const pool = require('../db');

async function checkRemoveElements() {
    const client = await pool.connect();
    try {
        console.log('🔍 Checking Remove Linked List Elements...\n');

        const res = await client.query("SELECT problem_id, title, description FROM problems WHERE title ILIKE '%Remove%Element%' OR description ILIKE '%Remove all elements from linked list%'");

        res.rows.forEach(p => {
            console.log(`\n[ID: ${p.problem_id}] Title: ${p.title}`);
            console.log(`Description: ${p.description}`);
        });

    } catch (err) {
        console.error('Error:', err);
    } finally {
        client.release();
        await pool.end();
    }
}

checkRemoveElements();
