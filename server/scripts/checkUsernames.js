const pool = require('../db');

async function checkUsernames() {
    try {
        const result = await pool.query(`
            SELECT user_name, 
                   user_name ~ '[^a-zA-Z0-9_]' as has_invalid_chars
            FROM users 
            ORDER BY user_name
            LIMIT 10
        `);

        console.log('\nCurrent usernames in database:');
        console.log('================================');
        result.rows.forEach(row => {
            const status = row.has_invalid_chars ? '❌ NEEDS FIX' : '✓ OK';
            console.log(`${status} - "${row.user_name}"`);
        });

        const invalidCount = result.rows.filter(r => r.has_invalid_chars).length;
        console.log(`\nTotal checked: ${result.rows.length}`);
        console.log(`Need fixing: ${invalidCount}`);

        if (invalidCount > 0) {
            console.log('\n📝 To fix, run this in your PostgreSQL client:');
            console.log('UPDATE users SET user_name = LOWER(REGEXP_REPLACE(REGEXP_REPLACE(user_name, \'\\\\s+\', \'_\', \'g\'), \'[^a-zA-Z0-9_]\', \'\', \'g\')) WHERE user_name ~ \'[^a-zA-Z0-9_]\';');
        } else {
            console.log('\n✅ All usernames are valid!');
        }

    } catch (err) {
        console.error('Error:', err.message);
    } finally {
        await pool.end();
    }
}

checkUsernames();
