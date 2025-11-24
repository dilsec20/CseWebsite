const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'dilip',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    database: process.env.DB_NAME || 'placement_prep',
});

async function createTestCasesTable() {
    const client = await pool.connect();

    try {
        console.log('🔗 Connected to PostgreSQL...\n');

        // Check if table already exists
        const checkTable = await client.query(`
            SELECT EXISTS (
                SELECT FROM information_schema.tables 
                WHERE table_schema = 'public' 
                AND table_name = 'test_cases'
            );
        `);

        if (checkTable.rows[0].exists) {
            console.log('⚠️  test_cases table already exists!\n');

            // Show existing test cases count
            const count = await client.query('SELECT COUNT(*) FROM test_cases');
            console.log(`📊 Current test cases in database: ${count.rows[0].count}`);
            return;
        }

        console.log('📝 Creating test_cases table...\n');

        // Create test_cases table
        await client.query(`
            CREATE TABLE test_cases (
                test_case_id SERIAL PRIMARY KEY,
                problem_id INTEGER NOT NULL REFERENCES problems(problem_id) ON DELETE CASCADE,
                input TEXT NOT NULL,
                expected_output TEXT NOT NULL,
                is_sample BOOLEAN DEFAULT false,
                test_case_order INTEGER DEFAULT 0,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);

        console.log('✅ test_cases table created successfully!');

        // Create index for faster queries
        await client.query(`
            CREATE INDEX idx_test_cases_problem ON test_cases(problem_id);
        `);

        console.log('✅ Index created on problem_id\n');

        // Show table schema
        const schema = await client.query(`
            SELECT column_name, data_type, character_maximum_length, is_nullable
            FROM information_schema.columns
            WHERE table_name = 'test_cases'
            ORDER BY ordinal_position
        `);

        console.log('📊 test_cases table schema:');
        schema.rows.forEach(col => {
            const nullable = col.is_nullable === 'YES' ? '(nullable)' : '(NOT NULL)';
            console.log(`   - ${col.column_name}: ${col.data_type} ${nullable}`);
        });

    } catch (error) {
        console.error('❌ Failed to create table:', error.message);
        throw error;
    } finally {
        client.release();
        await pool.end();
    }
}

// Run
createTestCasesTable()
    .then(() => {
        console.log('\n🎉 Test cases table setup complete!');
        process.exit(0);
    })
    .catch(error => {
        console.error('\nSetup failed:', error);
        process.exit(1);
    });
