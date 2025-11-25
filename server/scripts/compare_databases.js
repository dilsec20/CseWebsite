const { Pool } = require('pg');
require('dotenv').config();

// Local database connection
const localPool = new Pool({
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'dilip',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    database: process.env.DB_NAME || 'placement_prep',
});

// Production database connection
const prodPool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

async function compareDatabase() {
    const localClient = await localPool.connect();
    const prodClient = await prodPool.connect();

    try {
        console.log('📊 Comparing Local vs Production Database\n');
        console.log('='.repeat(60));

        // Compare tables
        const tables = [
            'users',
            'problems',
            'test_cases',
            'submissions',
            'quizzes',
            'quiz_questions',
            'quiz_options',
            'quiz_attempts',
            'contests',
            'contest_problems',
            'contest_submissions',
            'dsa_modules',
            'dsa_topics',
            'user_progress',
            'contest_sessions'
        ];

        const comparison = {};

        for (const table of tables) {
            try {
                const localCount = await localClient.query(`SELECT COUNT(*) FROM ${table}`);
                const prodCount = await prodClient.query(`SELECT COUNT(*) FROM ${table}`);

                const local = parseInt(localCount.rows[0].count);
                const prod = parseInt(prodCount.rows[0].count);
                const diff = local - prod;

                comparison[table] = { local, prod, diff };

                const status = diff === 0 ? '✅' : '⚠️';
                console.log(`${status} ${table.padEnd(25)} Local: ${local.toString().padStart(4)}  Prod: ${prod.toString().padStart(4)}  Diff: ${diff > 0 ? '+' : ''}${diff}`);
            } catch (err) {
                console.log(`❌ ${table.padEnd(25)} Error: ${err.message}`);
            }
        }

        console.log('='.repeat(60));
        console.log('\n📋 DETAILED ANALYSIS\n');

        // Check problems with detailed info
        if (comparison.problems && comparison.problems.diff !== 0) {
            console.log('🔍 Problems Analysis:');
            const localProbs = await localClient.query('SELECT COUNT(*), difficulty FROM problems GROUP BY difficulty ORDER BY difficulty');
            const prodProbs = await prodClient.query('SELECT COUNT(*), difficulty FROM problems GROUP BY difficulty ORDER BY difficulty');

            console.log('\n  Local Problems by Difficulty:');
            localProbs.rows.forEach(r => console.log(`    ${r.difficulty}: ${r.count}`));

            console.log('\n  Production Problems by Difficulty:');
            prodProbs.rows.forEach(r => console.log(`    ${r.difficulty}: ${r.count}`));
        }

        // Check test cases
        if (comparison.test_cases && comparison.test_cases.diff !== 0) {
            console.log('\n🔍 Test Cases Analysis:');
            const localTC = await localClient.query('SELECT is_sample, COUNT(*) FROM test_cases GROUP BY is_sample');
            const prodTC = await prodClient.query('SELECT is_sample, COUNT(*) FROM test_cases GROUP BY is_sample');

            console.log('\n  Local Test Cases:');
            localTC.rows.forEach(r => console.log(`    ${r.is_sample ? 'Sample' : 'Hidden'}: ${r.count}`));

            console.log('\n  Production Test Cases:');
            prodTC.rows.forEach(r => console.log(`    ${r.is_sample ? 'Sample' : 'Hidden'}: ${r.count}`));
        }

        // Check DSA content
        if (comparison.dsa_modules) {
            console.log('\n🔍 DSA Modules:');
            const localMods = await localClient.query('SELECT module_id, title FROM dsa_modules ORDER BY order_index');
            const prodMods = await prodClient.query('SELECT module_id, title FROM dsa_modules ORDER BY order_index');

            console.log(`\n  Local: ${localMods.rows.length} modules`);
            console.log(`  Production: ${prodMods.rows.length} modules`);

            if (localMods.rows.length !== prodMods.rows.length) {
                console.log('\n  Missing in Production:');
                const prodTitles = new Set(prodMods.rows.map(r => r.title));
                localMods.rows.forEach(r => {
                    if (!prodTitles.has(r.title)) {
                        console.log(`    - ${r.title}`);
                    }
                });
            }
        }

        // Summary
        console.log('\n' + '='.repeat(60));
        console.log('📊 SUMMARY\n');

        const missingData = Object.entries(comparison).filter(([table, data]) => data.diff > 0);
        if (missingData.length > 0) {
            console.log('⚠️  TABLES WITH MISSING DATA IN PRODUCTION:');
            missingData.forEach(([table, data]) => {
                console.log(`   ${table}: ${data.diff} records missing`);
            });
        } else {
            console.log('✅ ALL DATA SYNCED! Production matches localhost.');
        }

    } catch (err) {
        console.error('❌ Error:', err.message);
        console.error(err.stack);
    } finally {
        localClient.release();
        prodClient.release();
        localPool.end();
        prodPool.end();
    }
}

compareDatabase();
