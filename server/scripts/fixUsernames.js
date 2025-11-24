const pool = require('../db');

// Function to sanitize username: remove spaces, keep only alphanumeric and underscores
function sanitizeUsername(name) {
    if (!name) return 'user';

    // Replace spaces with underscores, remove special characters
    let sanitized = name
        .replace(/\s+/g, '_')           // Replace spaces with underscores
        .replace(/[^a-zA-Z0-9_]/g, '')  // Remove any character that's not alphanumeric or underscore
        .toLowerCase();

    // If empty after sanitization, use 'user'
    if (!sanitized) sanitized = 'user';

    return sanitized;
}

async function fixUsernames() {
    try {
        console.log('Starting username fix...');

        // Get all users
        const users = await pool.query('SELECT user_id, user_name FROM users');
        console.log(`Found ${users.rows.length} users`);

        let fixedCount = 0;

        for (const user of users.rows) {
            const sanitized = sanitizeUsername(user.user_name);

            // Check if username needs fixing
            if (sanitized !== user.user_name) {
                console.log(`Fixing: "${user.user_name}" -> "${sanitized}"`);

                // Check if sanitized username already exists
                let finalUsername = sanitized;
                let counter = 1;

                while (true) {
                    const check = await pool.query(
                        'SELECT user_id FROM users WHERE user_name = $1 AND user_id != $2',
                        [finalUsername, user.user_id]
                    );

                    if (check.rows.length === 0) {
                        break; // Username is available
                    }

                    // Add counter to make it unique
                    finalUsername = `${sanitized}${counter}`;
                    counter++;
                }

                // Update the username
                await pool.query(
                    'UPDATE users SET user_name = $1 WHERE user_id = $2',
                    [finalUsername, user.user_id]
                );

                console.log(`  ✓ Updated to: "${finalUsername}"`);
                fixedCount++;
            }
        }

        console.log(`\nFixed ${fixedCount} usernames`);
        console.log('Username fix complete!');

    } catch (err) {
        console.error('Error fixing usernames:', err);
    } finally {
        pool.end();
    }
}

fixUsernames();
