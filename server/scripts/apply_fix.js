const fs = require('fs');
const path = require('path');
const pool = require('../db');

async function applyFix() {
    try {
        console.log('🔧 Applying RLS backend access fix...');

        const sqlPath = path.join(__dirname, '../fix_rls.sql');
        const sql = fs.readFileSync(sqlPath, 'utf8');

        await pool.query(sql);

        console.log('✅ Fix applied: Admin roles now have explicit full access.');
    } catch (err) {
        console.error('❌ Error applying fix:', err);
    } finally {
        pool.end();
    }
}

applyFix();
