const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'dilip',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    database: process.env.DB_NAME || 'placement_prep',
});

async function testDatabase() {
    const client = await pool.connect();

    try {
        console.log('🔗 Testing PostgreSQL connection...\n');

        // Test problem count
        const problemCount = await client.query('SELECT COUNT(*) FROM problems');
        console.log(`✅ Problems table: ${problemCount.rows[0].count} problems`);

        // Test problems by difficulty
        const diffResult = await client.query(`
            SELECT difficulty, COUNT(*) as count 
            FROM problems 
            GROUP BY difficulty 
            ORDER BY difficulty
        `);
        console.log('\n📊 Problems by difficulty:');
        diffResult.rows.forEach(row => {
            console.log(`   ${row.difficulty}: ${row.count}`);
        });

        // Test problems by topic
        const topicResult = await client.query(`
            SELECT topic, COUNT(*) as count 
            FROM problems 
            GROUP BY topic 
            ORDER BY count DESC 
            LIMIT 10
        `);
        console.log('\n📚 Top 10 topics:');
        topicResult.rows.forEach(row => {
            console.log(`   ${row.topic}: ${row.count}`);
        });

        // Test tables exist
        const tablesResult = await client.query(`
            SELECT table_name 
            FROM information_schema.tables 
            WHERE table_schema = 'public'
            ORDER BY table_name
        `);
        console.log('\n🗄️  Database tables:');
        tablesResult.rows.forEach(row => {
            console.log(`   ✓ ${row.table_name}`);
        });

        console.log('\n✅ All database tests passed!');

    } catch (error) {
        console.error('❌ Database test failed:', error.message);
        throw error;
    } finally {
        client.release();
        await pool.end();
    }
}

testDatabase()
    .then(() => process.exit(0))
    .catch(() => process.exit(1));
