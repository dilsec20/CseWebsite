const pool = require('../db');

async function fixRLS() {
    try {
        console.log('🔧 Fixing RLS Policies for CP Tables...');

        // 1. CP Modules Policy
        try {
            await pool.query(`
                CREATE POLICY "Enable read access for all users" ON cp_modules
                FOR SELECT USING (true);
            `);
            console.log('✅ Created SELECT policy for cp_modules');
        } catch (e) {
            console.log('ℹ️ Policy for cp_modules might already exist or RLS is off:', e.message);
        }

        // 2. CP Topics Policy
        try {
            await pool.query(`
                CREATE POLICY "Enable read access for all users" ON cp_topics
                FOR SELECT USING (true);
            `);
            console.log('✅ Created SELECT policy for cp_topics');
        } catch (e) {
            console.log('ℹ️ Policy for cp_topics might already exist or RLS is off:', e.message);
        }

        // 3. Verify Data Visibility
        const modulesCount = await pool.query('SELECT COUNT(*) FROM cp_modules');
        const topicsCount = await pool.query('SELECT COUNT(*) FROM cp_topics');

        console.log('📊 Verification:');
        console.log(`   - Modules found: ${modulesCount.rows[0].count}`);
        console.log(`   - Topics found: ${topicsCount.rows[0].count}`);

        if (parseInt(modulesCount.rows[0].count) === 0) {
            console.warn('⚠️ WARNING: Tables appear empty! You might need to re-run setup_cp.js');
        } else {
            console.log('✅ Data is visible.');
        }

        process.exit(0);
    } catch (err) {
        console.error('❌ Error:', err);
        process.exit(1);
    }
}

fixRLS();
