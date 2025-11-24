const pool = require('../db');

async function checkMissingSamples() {
    const client = await pool.connect();
    try {
        console.log('🔍 Checking Descriptions for Missing Samples...\n');

        const ids = [1340, 1407, 1408, 1440, 1501];

        const res = await client.query(`
            SELECT problem_id, title, description 
            FROM problems 
            WHERE problem_id = ANY($1)
        `, [ids]);

        res.rows.forEach(p => {
            console.log(`[${p.problem_id}] ${p.title}`);
            console.log(`Desc Preview: ${p.description.substring(0, 200).replace(/\n/g, ' ')}...\n`);
        });

    } catch (err) {
        console.error('Error:', err);
    } finally {
        client.release();
        await pool.end();
    }
}

checkMissingSamples();
