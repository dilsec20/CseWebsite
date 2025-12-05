const fs = require('fs');
const path = require('path');
const pool = require('../db');

async function applyRLS() {
    try {
        console.log('🔒 Applying Row Level Security (RLS) policies...');

        const sqlPath = path.join(__dirname, '../enable_rls.sql');
        const sqlContent = fs.readFileSync(sqlPath, 'utf8');

        // Split by semicolon, but handle cases where semicolons might be in strings (simple split is usually ok for this file)
        // Filtering out empty statements
        const statements = sqlContent
            .split(';')
            .map(s => s.trim())
            .filter(s => s.length > 0);

        for (const statement of statements) {
            try {
                // console.log(`Executing: ${statement.substring(0, 50)}...`);
                await pool.query(statement);
                // console.log('✓ Success');
            } catch (err) {
                // Ignore "relation does not exist" errors nicely, but log them
                if (err.code === '42P01') {
                    console.warn(`⚠️  Table/Relation not found for statement: ${statement.substring(0, 30)}...`);
                } else if (err.code === '42710') {
                    // duplicate object (policy already exists - likely if CREATE POLICY doesn't have IF NOT EXISTS, 
                    // preventing error if we didn't drop it successfully or concurrency)
                    console.warn(`⚠️  Policy already exists: ${statement.substring(0, 30)}...`);
                } else {
                    console.error(`❌ Error executing statement: "${statement.substring(0, 50)}..."`);
                    console.error(`   Details: ${err.message}`);
                }
            }
        }

        console.log('✅ RLS application process finished.');
    } catch (err) {
        console.error('❌ Script error:', err);
    } finally {
        pool.end();
    }
}

applyRLS();
