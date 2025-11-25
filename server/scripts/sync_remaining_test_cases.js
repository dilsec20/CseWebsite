const { Pool } = require('pg');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const localPool = new Pool({
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'dilip',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    database: process.env.DB_NAME || 'placement_prep',
});

const prodPool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

async function syncRemainingTestCases() {
    console.log('🚀 Starting Full Test Case Sync...');

    let localClient, prodClient;
    try {
        localClient = await localPool.connect();
        prodClient = await prodPool.connect();

        // 1. Fetch all local test cases
        console.log('📥 Fetching local test cases...');
        // Use simple query first to avoid JOIN issues if any
        const localRes = await localClient.query('SELECT * FROM test_cases');
        const localTestCases = localRes.rows;
        console.log(`   Found ${localTestCases.length} local test cases.`);

        // 2. Fetch local problems to map ID -> Title
        console.log('📥 Fetching local problem titles...');
        const localProbsRes = await localClient.query('SELECT problem_id, title FROM problems');
        const localProbMap = new Map(); // local_id -> title
        localProbsRes.rows.forEach(p => localProbMap.set(p.problem_id, p.title));

        // 3. Fetch production problems to map Title -> ID
        console.log('📥 Fetching production problem IDs...');
        const prodProbsRes = await prodClient.query('SELECT problem_id, title FROM problems');
        const prodProbMap = new Map(); // title -> prod_id
        prodProbsRes.rows.forEach(p => prodProbMap.set(p.title, p.problem_id));

        // 4. Prepare insertion data
        console.log('⚙️  Mapping data...');
        const toInsert = [];
        let skipped = 0;

        for (const tc of localTestCases) {
            const title = localProbMap.get(tc.problem_id);
            if (!title) {
                // console.log(`   ⚠️ Local problem ID ${tc.problem_id} not found in problems table`);
                continue;
            }

            const prodId = prodProbMap.get(title);
            if (prodId) {
                toInsert.push({
                    problem_id: prodId,
                    input: tc.input,
                    output: tc.output,
                    is_sample: tc.is_sample
                });
            } else {
                skipped++;
            }
        }
        console.log(`   Ready to insert ${toInsert.length} test cases. Skipped ${skipped}.`);

        // 5. Insert into production
        if (toInsert.length > 0) {
            console.log('🗑️  Clearing production test_cases...');
            await prodClient.query('TRUNCATE TABLE test_cases CASCADE');

            console.log('🚀 Inserting...');
            const batchSize = 100;
            let inserted = 0;

            for (let i = 0; i < toInsert.length; i += batchSize) {
                const batch = toInsert.slice(i, i + batchSize);
                const values = [];
                const placeholders = [];
                let idx = 1;

                batch.forEach(item => {
                    placeholders.push(`($${idx}, $${idx + 1}, $${idx + 2}, $${idx + 3})`);
                    values.push(item.problem_id, item.input, item.output, item.is_sample);
                    idx += 4;
                });

                await prodClient.query(`
                    INSERT INTO test_cases (problem_id, input, expected_output, is_sample)
                    VALUES ${placeholders.join(', ')}
                `, values);

                inserted += batch.length;
                process.stdout.write(`\r   Progress: ${inserted}/${toInsert.length}`);
            }
            console.log('\n✅ Sync Complete!');
        } else {
            console.log('⚠️ Nothing to insert.');
        }

    } catch (err) {
        console.error('❌ Error:', err.message);
        console.error(err.stack);
    } finally {
        if (localClient) localClient.release();
        if (prodClient) prodClient.release();
        localPool.end();
        prodPool.end();
    }
}

syncRemainingTestCases();
