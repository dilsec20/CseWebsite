const pool = require('../db');

const addMissingColumns = async () => {
    try {
        console.log('Adding missing columns to submissions table...');

        await pool.query(`
            ALTER TABLE submissions 
            ADD COLUMN IF NOT EXISTS output TEXT,
            ADD COLUMN IF NOT EXISTS execution_time VARCHAR(50),
            ADD COLUMN IF NOT EXISTS memory_usage VARCHAR(50);
        `);

        console.log('Successfully added output, execution_time, and memory_usage columns.');

    } catch (err) {
        console.error('Error updating schema:', err.message);
    } finally {
        pool.end();
    }
};

addMissingColumns();
