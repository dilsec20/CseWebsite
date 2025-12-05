const pool = require('../db');

async function verifyRLS() {
    try {
        const res = await pool.query(
            "SELECT tablename, rowsecurity FROM pg_tables WHERE schemaname = 'public' ORDER BY tablename"
        );
        console.log('Table RLS Status:');
        res.rows.forEach(r => {
            console.log(`${r.tablename}: ${r.rowsecurity ? '✅ Enabled' : '❌ Disabled'}`);
        });
    } catch (err) {
        console.error('Error:', err);
    } finally {
        pool.end();
    }
}

verifyRLS();
