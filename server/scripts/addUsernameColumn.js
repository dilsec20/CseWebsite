const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'dilip',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    database: process.env.DB_NAME || 'placement_prep',
});

// Function to generate username from name
function generateUsername(name) {
    return name.toLowerCase().replace(/\s+/g, '');
}

async function addUsernameColumn() {
    const client = await pool.connect();

    try {
        console.log('🔗 Connected to PostgreSQL...');

        // Check if username column already exists
        const checkColumn = await client.query(`
            SELECT column_name 
            FROM information_schema.columns 
            WHERE table_name = 'users' AND column_name = 'username'
        `);

        if (checkColumn.rows.length > 0) {
            console.log('⚠️  Username column already exists!');
            return;
        }

        console.log('📝 Adding username column to users table...');

        // Add username column
        await client.query(`
            ALTER TABLE users 
            ADD COLUMN username VARCHAR(100) UNIQUE
        `);

        console.log('✅ Username column added successfully!');

        // Get all existing users
        const users = await client.query('SELECT user_id, user_name FROM users');

        if (users.rows.length > 0) {
            console.log(`\n📊 Generating usernames for ${users.rows.length} existing user(s)...`);

            const usedUsernames = new Set();

            for (const user of users.rows) {
                let baseUsername = generateUsername(user.user_name);
                let username = baseUsername;
                let counter = 1;

                // Handle duplicates
                while (usedUsernames.has(username)) {
                    username = `${baseUsername}${counter}`;
                    counter++;
                }

                usedUsernames.add(username);

                // Update user with generated username
                await client.query(
                    'UPDATE users SET username = $1 WHERE user_id = $2',
                    [username, user.user_id]
                );

                console.log(`   ✓ ${user.user_name} → @${username}`);
            }
        }

        // Make username NOT NULL now that all users have usernames
        await client.query(`
            ALTER TABLE users 
            ALTER COLUMN username SET NOT NULL
        `);

        // Create index for faster lookups
        await client.query(`
            CREATE INDEX idx_users_username ON users(username)
        `);

        console.log('\n✅ Migration completed successfully!');
        console.log('📊 Username column is now required and indexed');

    } catch (error) {
        console.error('❌ Migration failed:', error.message);
        throw error;
    } finally {
        client.release();
        await pool.end();
    }
}

// Run migration
addUsernameColumn()
    .then(() => {
        console.log('\n🎉 Database migration complete!');
        process.exit(0);
    })
    .catch(error => {
        console.error('\nMigration failed:', error);
        process.exit(1);
    });
