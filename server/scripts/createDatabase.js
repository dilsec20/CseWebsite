const { Client } = require('pg');
require('dotenv').config();

async function createDatabase() {
    // Connect to postgres database (default) to create our database
    const client = new Client({
        user: process.env.DB_USER || 'postgres',
        password: process.env.DB_PASSWORD || 'dilip',
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 5432,
        database: 'postgres' // Connect to default postgres database
    });

    try {
        await client.connect();
        console.log('🔗 Connected to PostgreSQL server...');

        // Check if database already exists
        const checkDb = await client.query(
            "SELECT 1 FROM pg_database WHERE datname = 'placement_prep'"
        );

        if (checkDb.rows.length > 0) {
            console.log('ℹ️  Database "placement_prep" already exists');
        } else {
            // Create the database
            await client.query('CREATE DATABASE placement_prep');
            console.log('✅ Database "placement_prep" created successfully!');
        }

    } catch (error) {
        console.error('❌ Error:', error.message);
        throw error;
    } finally {
        await client.end();
    }
}

// Run
createDatabase()
    .then(() => {
        console.log('\n✨ Ready to setup schema. Run: node scripts/setupDatabase.js');
        process.exit(0);
    })
    .catch(error => {
        console.error('Failed:', error);
        process.exit(1);
    });
