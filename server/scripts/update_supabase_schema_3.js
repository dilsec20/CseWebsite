const { Pool } = require('pg');

const supabasePassword = encodeURIComponent("05Supabase@@??");
const supabaseConnectionString = `postgresql://postgres:${supabasePassword}@db.xlqzqcqacpajpqwneqpa.supabase.co:5432/postgres`;

async function updateSchema() {
    const pool = new Pool({
        connectionString: supabaseConnectionString,
        ssl: { rejectUnauthorized: false }
    });

    try {
        console.log("Adding input_format column to Supabase...");

        await pool.query(`
            ALTER TABLE problems 
            ADD COLUMN IF NOT EXISTS input_format TEXT;
        `);

        console.log("✅ Schema updated successfully!");
    } catch (err) {
        console.error("❌ Schema update failed:", err.message);
    } finally {
        await pool.end();
    }
}

updateSchema();
