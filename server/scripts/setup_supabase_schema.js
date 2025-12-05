const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

const supabasePassword = encodeURIComponent("05Supabase@@??");
const supabaseConnectionString = `postgresql://postgres.xlqzqcqacpajpqwneqpa:${supabasePassword}@aws-1-ap-south-1.pooler.supabase.com:6543/postgres`;

async function setupSchema() {
    const pool = new Pool({
        connectionString: supabaseConnectionString,
        ssl: { rejectUnauthorized: false }
    });

    try {
        const schemaPath = path.join(__dirname, '..', 'database.sql');
        const schemaSql = fs.readFileSync(schemaPath, 'utf8');

        console.log("Executing schema on Supabase...");
        await pool.query(schemaSql);
        console.log("✅ Schema executed successfully!");
    } catch (err) {
        console.error("❌ Schema execution failed:", err.message);
    } finally {
        await pool.end();
    }
}

setupSchema();
