const fs = require('fs');
const path = require('path');
const pool = require('../db');

async function disableRLS() {
    try {
        console.log('🔓 Disabling RLS on all tables...');

        const sqlPath = path.join(__dirname, '../disable_rls.sql');
        const sql = fs.readFileSync(sqlPath, 'utf8');

        await pool.query(sql);

        console.log('✅ RLS disabled successfully.');
    } catch (err) {
        console.error('❌ Error disabling RLS:', err);
    } finally {
        pool.end();
    }
}

disableRLS();
