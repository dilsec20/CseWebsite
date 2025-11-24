const pool = require('../db');

async function fixUsernames() {
    const client = await pool.connect();

    try {
        console.log('Starting username sanitization...');

        // Start transaction
        await client.query('BEGIN');

        // Get all users with problematic usernames (containing spaces or special chars)
        const result = await client.query(`
            SELECT user_id, user_name 
            FROM users 
            WHERE user_name ~ '[^a-zA-Z0-9_]'
        `);

        console.log(`Found ${result.rows.length} usernames to fix`);

        for (const user of result.rows) {
            const oldUsername = user.user_name;
            const newUsername = oldUsername
                .toLowerCase()
                .replace(/\s+/g, '_')           // Replace spaces with underscores
                .replace(/[^a-z0-9_]/g, '');    // Remove special characters

            console.log(`Fixing: "${oldUsername}" -> "${newUsername}"`);

            await client.query(
                'UPDATE users SET user_name = $1 WHERE user_id = $2',
                [newUsername, user.user_id]
            );
        }

        // Commit transaction
        await client.query('COMMIT');
        console.log('✓ All usernames fixed successfully!');

    } catch (err) {
        await client.query('ROLLBACK');
        console.error('Error fixing usernames:', err);
    } finally {
        client.release();
        await pool.end();
    }
}

fixUsernames();
