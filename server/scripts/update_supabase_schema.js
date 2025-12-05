const { Pool } = require('pg');

const supabasePassword = encodeURIComponent("05Supabase@@??");
const supabaseConnectionString = `postgresql://postgres.xlqzqcqacpajpqwneqpa:${supabasePassword}@aws-1-ap-south-1.pooler.supabase.com:6543/postgres`;

async function updateSchema() {
    const pool = new Pool({
        connectionString: supabaseConnectionString,
        ssl: { rejectUnauthorized: false }
    });

    try {
        console.log("Adding missing columns to Supabase...");

        await pool.query(`
            ALTER TABLE problems 
            ADD COLUMN IF NOT EXISTS constraints TEXT,
            ADD COLUMN IF NOT EXISTS format TEXT,
            ADD COLUMN IF NOT EXISTS source VARCHAR(255);
        `);

        console.log("✅ Schema updated successfully!");
    } catch (err) {
        console.error("❌ Schema update failed:", err.message);
    } finally {
        await pool.end();
    }
}

updateSchema();
