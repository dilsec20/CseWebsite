const { Pool } = require('pg');

const supabasePassword = encodeURIComponent("05Supabase@@??");
const supabaseConnectionString = `postgresql://postgres:${supabasePassword}@db.xlqzqcqacpajpqwneqpa.supabase.co:5432/postgres`;

async function cleanup() {
    const pool = new Pool({
        connectionString: supabaseConnectionString,
        ssl: { rejectUnauthorized: false }
    });

    try {
        console.log("Cleaning up dummy row...");
        const res = await pool.query("DELETE FROM problems WHERE title = 'Test Problem'");
        console.log(`Deleted ${res.rowCount} rows.`);
    } catch (err) {
        console.error("Cleanup failed:", err.message);
    } finally {
        await pool.end();
    }
}

cleanup();
