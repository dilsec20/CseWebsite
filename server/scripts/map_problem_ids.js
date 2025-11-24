const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

// Local Pool
const localPool = new Pool({
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'dilip',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    database: process.env.DB_NAME || 'placement_prep',
});

// Production Pool
const prodPool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

async function mapIds() {
    const localClient = await localPool.connect();
    const prodClient = await prodPool.connect();

    try {
        console.log('🗺️  Mapping Problem IDs (Local -> Production)...');

        // 1. Fetch Local Problems
        const localRes = await localClient.query('SELECT problem_id, title FROM problems');
        const localProblems = localRes.rows;
        console.log(`Fetched ${localProblems.length} local problems.`);

        // 2. Fetch Production Problems
        const prodRes = await prodClient.query('SELECT problem_id, title FROM problems');
        const prodProblems = prodRes.rows;
        console.log(`Fetched ${prodProblems.length} production problems.`);

        // 3. Create Mapping
        const titleToProdId = {};
        prodProblems.forEach(p => {
            titleToProdId[p.title] = p.problem_id;
        });

        const localIdToProdId = {};
        let matched = 0;
        let unmatched = 0;

        localProblems.forEach(p => {
            const prodId = titleToProdId[p.title];
            if (prodId) {
                localIdToProdId[p.problem_id] = prodId;
                matched++;
            } else {
                // console.log(`⚠️  No match for "${p.title}" (Local ID: ${p.problem_id})`);
                unmatched++;
            }
        });

        console.log(`Matched: ${matched}`);
        console.log(`Unmatched: ${unmatched}`);

        // 4. Update Dump File
        const dumpPath = path.join(__dirname, 'test_cases_dump.json');
        const data = JSON.parse(fs.readFileSync(dumpPath, 'utf8'));

        const mappedData = [];
        let skipped = 0;

        data.forEach(tc => {
            const newProbId = localIdToProdId[tc.problem_id];
            if (newProbId) {
                mappedData.push({
                    ...tc,
                    problem_id: newProbId
                });
            } else {
                skipped++;
            }
        });

        console.log(`Mapped ${mappedData.length} test cases.`);
        console.log(`Skipped ${skipped} test cases (problem not found in prod).`);

        const outPath = path.join(__dirname, 'test_cases_dump_mapped.json');
        console.log(`Writing ${mappedData.length} items to ${outPath}...`);
        fs.writeFileSync(outPath, JSON.stringify(mappedData, null, 2));
        console.log(`✅ Saved mapped dump to ${outPath}`);

    } catch (err) {
        console.error('❌ Error:', err.message);
    } finally {
        localClient.release();
        prodClient.release();
        localPool.end();
        prodPool.end();
    }
}

mapIds();
