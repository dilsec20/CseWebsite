const pool = require('../db');
const fs = require('fs');
const path = require('path');

async function verifySystem() {
    console.log('🔍 Starting System Verification...\n');

    try {
        // 1. Verify Problems
        console.log('--- 1. Verifying Problems ---');
        try {
            const problemsRes = await pool.query('SELECT count(*) FROM problems');
            const problemCount = parseInt(problemsRes.rows[0].count);
            console.log(`✅ Total Problems: ${problemCount} (Expected: ~254)`);

            const fangRes = await pool.query("SELECT title, difficulty FROM problems WHERE title ILIKE '%sum%' OR title ILIKE '%list%' LIMIT 5");
            console.log('   Sample Problems (FANG/MANG check):');
            fangRes.rows.forEach(p => console.log(`   - ${p.title} (${p.difficulty})`));
        } catch (e) { console.error('❌ Error verifying problems:', e.message); }

        // 2. Verify Test Cases
        console.log('\n--- 2. Verifying Test Cases ---');
        try {
            const testCasesRes = await pool.query('SELECT count(*) FROM test_cases');
            const testCaseCount = parseInt(testCasesRes.rows[0].count);
            console.log(`✅ Total Test Cases: ${testCaseCount}`);

            const hiddenRes = await pool.query('SELECT count(*) FROM test_cases WHERE is_hidden = true');
            const publicRes = await pool.query('SELECT count(*) FROM test_cases WHERE is_hidden = false');
            console.log(`   - Hidden Test Cases: ${hiddenRes.rows[0].count}`);
            console.log(`   - Public/Sample Test Cases: ${publicRes.rows[0].count}`);

            // Check for problems with NO test cases
            const noTestCasesRes = await pool.query(`
          SELECT p.problem_id, p.title 
          FROM problems p 
          LEFT JOIN test_cases tc ON p.problem_id = tc.problem_id 
          WHERE tc.test_case_id IS NULL
        `);
            if (noTestCasesRes.rows.length > 0) {
                console.log(`⚠️  WARNING: ${noTestCasesRes.rows.length} problems have NO test cases!`);
            } else {
                console.log('✅ All problems have at least one test case.');
            }
        } catch (e) { console.error('❌ Error verifying test cases:', e.message); }

        // 3. Verify DSA Path
        console.log('\n--- 3. Verifying DSA Path ---');
        try {
            const modulesRes = await pool.query('SELECT count(*) FROM dsa_modules');
            const topicsRes = await pool.query('SELECT count(*) FROM dsa_topics');
            console.log(`✅ DSA Modules: ${modulesRes.rows[0].count}`);
            console.log(`✅ DSA Topics: ${topicsRes.rows[0].count}`);
        } catch (e) { console.error('❌ Error verifying DSA path:', e.message); }

        // 4. Verify Codebase Integrity (Basic File Check)
        console.log('\n--- 4. Verifying Codebase Integrity ---');
        try {
            const clientPath = path.join(__dirname, '../../client/src');
            const serverPath = path.join(__dirname, '../../server');

            if (fs.existsSync(clientPath)) {
                // Recursive file count is tricky with readdirSync without options in older node, 
                // but let's just check existence of key folders
                console.log(`✅ Client Source: client/src exists`);
            } else {
                console.error('❌ Client source directory not found!');
            }

            if (fs.existsSync(path.join(serverPath, 'index.js'))) {
                console.log('✅ Server Entry: index.js exists');
            }
        } catch (e) { console.error('❌ Error verifying codebase:', e.message); }

        // 5. Check Rating Calculation Logic
        console.log('\n--- 5. Checking Rating Calculation Logic ---');
        try {
            const serverPath = path.join(__dirname, '../../server');
            const contestRoutePath = path.join(serverPath, 'routes/contests.js');
            if (fs.existsSync(contestRoutePath)) {
                const content = fs.readFileSync(contestRoutePath, 'utf8');
                if (content.includes('updateRating') || content.includes('rating')) {
                    console.log('✅ Rating logic found in routes/contests.js');
                } else {
                    console.log('⚠️  Rating logic NOT explicitly found in routes/contests.js (might be in a util)');
                }
            }
        } catch (e) { console.error('❌ Error checking rating logic:', e.message); }

    } catch (err) {
        console.error('❌ Verification Failed:', err);
    } finally {
        pool.end();
    }
}

verifySystem();
