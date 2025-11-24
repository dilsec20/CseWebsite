const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'dilip',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    database: process.env.DB_NAME || 'placement_prep',
});

async function fixUsernames() {
    try {
        console.log('Connecting to database...');

        // First, check current usernames
        const check = await pool.query(`
            SELECT user_id, user_name 
            FROM users 
            WHERE user_name ~ '[^a-zA-Z0-9_]'
        `);

        console.log(`\nFound ${check.rows.length} usernames with spaces or special characters:`);
        check.rows.forEach(u => console.log(`  - "${u.user_name}"`));

        if (check.rows.length === 0) {
            console.log('\n✅ All usernames are already valid!');
            return;
        }

        // Fix them
        console.log('\nFixing usernames...');
        const result = await pool.query(`
            UPDATE users 
            SET user_name = LOWER(
                REGEXP_REPLACE(
                    REGEXP_REPLACE(user_name, '\\s+', '_', 'g'), 
                    '[^a-zA-Z0-9_]', '', 'g'
                )
            ) 
            WHERE user_name ~ '[^a-zA-Z0-9_]'
            RETURNING user_id, user_name
        `);

        console.log(`\n✅ Fixed ${result.rows.length} usernames:`);
        result.rows.forEach(u => console.log(`  ✓ ${u.user_name}`));

    } catch (err) {
        console.error('❌ Error:', err.message);
    } finally {
        await pool.end();
    }
}

fixUsernames();
