const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');
require('dotenv').config();

// Database configuration - matches db.js
const pool = new Pool({
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'password',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    database: process.env.DB_NAME || 'placement_prep',
});

async function seedProblems() {
    const client = await pool.connect();

    try {
        console.log('Connected to database...');

        // Read the SQL file
        const sqlFilePath = path.join(__dirname, 'problems_seed.sql');
        const sql = fs.readFileSync(sqlFilePath, 'utf-8');

        console.log('Deleting existing problems...');
        // Delete existing problems first
        await client.query('DELETE FROM problems');

        console.log('Inserting new problems...');
        // Execute the SQL
        await client.query(sql);

        // Get count
        const result = await client.query('SELECT COUNT(*) FROM problems');
        console.log(`✓ Successfully seeded ${result.rows[0].count} problems to the database!`);

    } catch (error) {
        console.error('Error seeding problems:', error.message);
        console.error('Full error:', error);
    } finally {
        client.release();
        await pool.end();
    }
}

// Run the seeding
seedProblems();
