const pool = require('../db');

const checkSchema = async () => {
    try {
        console.log('Checking submissions table...');
        const res1 = await pool.query("SELECT column_name, data_type, character_maximum_length FROM information_schema.columns WHERE table_name = 'submissions'");
        res1.rows.forEach(r => console.log(`${r.column_name}: ${r.data_type} (${r.character_maximum_length})`));

        console.log('Checking user_progress table...');
        const res2 = await pool.query("SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'user_progress'");
        res2.rows.forEach(r => console.log(`${r.column_name}: ${r.data_type}`));
    } catch (err) {
        console.error(err);
    } finally {
        pool.end();
    }
};

checkSchema();
