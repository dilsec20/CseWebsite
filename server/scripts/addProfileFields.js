const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'dilip',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    database: process.env.DB_NAME || 'placement_prep',
});

async function addProfileFields() {
    const client = await pool.connect();

    try {
        console.log('🔗 Connected to PostgreSQL...');

        // Check if columns already exist
        const checkColumns = await client.query(`
            SELECT column_name 
            FROM information_schema.columns 
            WHERE table_name = 'users' AND column_name IN ('bio', 'profile_picture', 'linkedin_url', 'github_url')
        `);

        if (checkColumns.rows.length > 0) {
            console.log('⚠️  Profile fields already exist!');
            console.log('Existing columns:', checkColumns.rows.map(r => r.column_name).join(', '));
            return;
        }

        console.log('📝 Adding profile fields to users table...');

        // Add profile columns
        await client.query(`
            ALTER TABLE users 
            ADD COLUMN bio TEXT,
            ADD COLUMN profile_picture TEXT,
            ADD COLUMN linkedin_url VARCHAR(255),
            ADD COLUMN github_url VARCHAR(255)
        `);

        console.log('✅ Profile fields added successfully!');
        console.log('   ✓ bio (TEXT)');
        console.log('   ✓ profile_picture (TEXT) - for base64 images');
        console.log('   ✓ linkedin_url (VARCHAR)');
        console.log('   ✓ github_url (VARCHAR)');

        // Show updated schema
        const schema = await client.query(`
            SELECT column_name, data_type, character_maximum_length
            FROM information_schema.columns
            WHERE table_name = 'users'
            ORDER BY ordinal_position
        `);

        console.log('\n📊 Updated users table schema:');
        schema.rows.forEach(col => {
            const length = col.character_maximum_length ? `(${col.character_maximum_length})` : '';
            console.log(`   - ${col.column_name}: ${col.data_type}${length}`);
        });

    } catch (error) {
        console.error('❌ Migration failed:', error.message);
        throw error;
    } finally {
        client.release();
        await pool.end();
    }
}

// Run migration
addProfileFields()
    .then(() => {
        console.log('\n🎉 Profile fields migration complete!');
        process.exit(0);
    })
    .catch(error => {
        console.error('\nMigration failed:', error);
        process.exit(1);
    });
