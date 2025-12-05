const { Pool } = require('pg');

const renderConnectionString = "postgresql://placement_prep_user:5BzUiBiTbPL8WEwQJdzEgcBIiGbqmxs7@dpg-d4ib377diees73aag370-a.singapore-postgres.render.com/placement_prep";

async function getSchema() {
    const pool = new Pool({ connectionString: renderConnectionString, ssl: { rejectUnauthorized: false } });

    try {
        const tables = ['user_progress', 'password_reset_tokens'];

        for (const table of tables) {
            console.log(`\n--- Schema for ${table} ---`);
            const res = await pool.query(`
                SELECT column_name, data_type, is_nullable, column_default
                FROM information_schema.columns 
                WHERE table_name = $1 
                ORDER BY ordinal_position`, [table]);

            res.rows.forEach(row => {
                console.log(`${row.column_name} ${row.data_type} (Default: ${row.column_default}, Nullable: ${row.is_nullable})`);
            });

            // Get constraints (PK, FK, Unique)
            // Simplified check for now
        }

    } catch (err) {
        console.error("Error:", err.message);
    } finally {
        await pool.end();
    }
}

getSchema();
