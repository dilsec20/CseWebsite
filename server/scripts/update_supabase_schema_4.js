const { Pool } = require('pg');

const supabasePassword = encodeURIComponent("05Supabase@@??");
const supabaseConnectionString = `postgresql://postgres:${supabasePassword}@db.xlqzqcqacpajpqwneqpa.supabase.co:5432/postgres`;

async function updateSchema() {
    const pool = new Pool({
        connectionString: supabaseConnectionString,
        ssl: { rejectUnauthorized: false }
    });

    try {
        console.log("Adding created_at column to test_cases in Supabase...");

        await pool.query(`
            ALTER TABLE test_cases 
            ADD COLUMN IF NOT EXISTS created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;
        `);

        console.log("✅ Schema updated successfully!");
    } catch (err) {
        console.error("❌ Schema update failed:", err.message);
    } finally {
        await pool.end();
    }
}

updateSchema();
