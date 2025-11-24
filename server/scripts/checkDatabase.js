const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'dilip',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    database: process.env.DB_NAME || 'placement_prep',
});

async function checkDatabase() {
    const client = await pool.connect();
    try {
        console.log('✅ Database connected successfully\n');

        // Check if users table exists
        const usersTable = await client.query(`
            SELECT EXISTS (
                SELECT FROM information_schema.tables 
                WHERE table_name = 'users'
            );
        `);
        console.log('Users table exists:', usersTable.rows[0].exists);

        if (usersTable.rows[0].exists) {
            // Check users table structure
            const columns = await client.query(`
                SELECT column_name, data_type 
                FROM information_schema.columns 
                WHERE table_name = 'users'
                ORDER BY ordinal_position;
            `);
            console.log('\nUsers table columns:');
            columns.rows.forEach(col => {
                console.log(`  ${col.column_name}: ${col.data_type}`);
            });

            // Count users
            const userCount = await client.query('SELECT COUNT(*) FROM users');
            console.log(`\nTotal users: ${userCount.rows[0].count}`);

            // Sample user
            const sampleUser = await client.query('SELECT user_id, user_name, user_email FROM users LIMIT 1');
            if (sampleUser.rows.length > 0) {
                console.log('Sample user:', sampleUser.rows[0]);
            }
        }

        // Check problems table
        const problemsTable = await client.query(`
            SELECT EXISTS (
                SELECT FROM information_schema.tables 
                WHERE table_name = 'problems'
            );
        `);
        console.log('\nProblems table exists:', problemsTable.rows[0].exists);

        if (problemsTable.rows[0].exists) {
            const problemCount = await client.query('SELECT COUNT(*) FROM problems');
            console.log(`Total problems: ${problemCount.rows[0].count}`);
        }

        // Check test_cases table
        const testCasesTable = await client.query(`
            SELECT EXISTS (
                SELECT FROM information_schema.tables 
                WHERE table_name = 'test_cases'
            );
        `);
        console.log('\nTest cases table exists:', testCasesTable.rows[0].exists);

        if (testCasesTable.rows[0].exists) {
            const testCount = await client.query('SELECT COUNT(*) FROM test_cases');
            console.log(`Total test cases: ${testCount.rows[0].count}`);
        }

    } catch (err) {
        console.error('❌ Database error:', err.message);
        console.error('Stack:', err.stack);
    } finally {
        client.release();
        pool.end();
    }
}

checkDatabase();
