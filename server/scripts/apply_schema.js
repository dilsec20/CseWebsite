const fs = require('fs');
const path = require('path');
const pool = require('../db');

const seedFile = path.join(__dirname, '../production_seed.sql');

async function applySchema() {
    try {
        const sql = fs.readFileSync(seedFile, 'utf8');
        console.log('Reading schema file...');

        await pool.query(sql);
        console.log('✅ Schema applied successfully!');
    } catch (err) {
        console.error('❌ Error applying schema:', err);
    } finally {
        pool.end();
    }
}

applySchema();
