/**
 * create_dsa_user_notes_table.js
 * 
 * Creates the dsa_user_notes table for storing user notes per DSA module.
 * 
 * Usage: node scripts/create_dsa_user_notes_table.js "DATABASE_URL"
 */

const { Pool } = require('pg');

const DATABASE_URL = process.argv[2];

if (!DATABASE_URL) {
    console.error('❌ Please provide DATABASE_URL as argument!');
    process.exit(1);
}

const pool = new Pool({
    connectionString: DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

async function createTable() {
    try {
        console.log('🚀 Creating dsa_user_notes table...');

        await pool.query(`
            CREATE TABLE IF NOT EXISTS dsa_user_notes (
                note_id SERIAL PRIMARY KEY,
                user_id UUID REFERENCES users(user_id) ON DELETE CASCADE,
                module_id INT REFERENCES dsa_modules(module_id) ON DELETE CASCADE,
                content TEXT DEFAULT '',
                updated_at TIMESTAMP DEFAULT NOW(),
                UNIQUE(user_id, module_id)
            );
        `);

        console.log('✅ Table dsa_user_notes created successfully!');

        // Create index for faster lookups
        await pool.query(`
            CREATE INDEX IF NOT EXISTS idx_dsa_user_notes_user_module 
            ON dsa_user_notes(user_id, module_id);
        `);

        console.log('✅ Index created successfully!');

    } catch (err) {
        console.error('❌ Error:', err.message);
    } finally {
        await pool.end();
    }
}

createTable();
