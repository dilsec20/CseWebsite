const pool = require('../db');

async function analyzeTestCases() {
    const client = await pool.connect();
    try {
        console.log('Analyzing test case coverage...\n');

        // Get all problems with their test case counts
        const result = await client.query(`
            SELECT 
                p.problem_id,
                p.title,
                p.topic,
                p.difficulty,
                COUNT(tc.test_case_id) as total_tests,
                COUNT(CASE WHEN tc.is_sample = true THEN 1 END) as sample_tests,
                COUNT(CASE WHEN tc.is_sample = false THEN 1 END) as hidden_tests
            FROM problems p
            LEFT JOIN test_cases tc ON p.problem_id = tc.problem_id
            GROUP BY p.problem_id, p.title, p.topic, p.difficulty
            ORDER BY total_tests ASC, p.title
        `);

        console.log(`Total problems: ${result.rows.length}\n`);

        // Categorize problems
        const noSampleTests = [];
        const insufficientHidden = [];
        const needsMoreTests = [];
        const goodCoverage = [];

        result.rows.forEach(p => {
            if (p.sample_tests === '0') {
                noSampleTests.push(p);
            } else if (parseInt(p.hidden_tests) < 5) {
                insufficientHidden.push(p);
            } else if (parseInt(p.total_tests) < 6) {
                needsMoreTests.push(p);
            } else {
                goodCoverage.push(p);
            }
        });

        console.log('=== PROBLEMS WITHOUT SAMPLE TEST CASES ===');
        console.log(`Count: ${noSampleTests.length}\n`);
        if (noSampleTests.length > 0) {
            noSampleTests.forEach(p => {
                console.log(`  ${p.problem_id}. ${p.title} (${p.topic} - ${p.difficulty})`);
                console.log(`     Total: ${p.total_tests}, Sample: ${p.sample_tests}, Hidden: ${p.hidden_tests}\n`);
            });
        }

        console.log('\n=== PROBLEMS WITH INSUFFICIENT HIDDEN TESTS (<5) ===');
        console.log(`Count: ${insufficientHidden.length}\n`);
        if (insufficientHidden.length > 0) {
            insufficientHidden.slice(0, 20).forEach(p => {
                console.log(`  ${p.problem_id}. ${p.title} (${p.topic} - ${p.difficulty})`);
                console.log(`     Total: ${p.total_tests}, Sample: ${p.sample_tests}, Hidden: ${p.hidden_tests}`);
            });
            if (insufficientHidden.length > 20) {
                console.log(`  ... and ${insufficientHidden.length - 20} more`);
            }
        }

        console.log('\n=== SUMMARY ===');
        console.log(`✅ Good coverage (≥6 tests): ${goodCoverage.length}`);
        console.log(`⚠️  Needs more tests (<6 total): ${needsMoreTests.length}`);
        console.log(`❌ Insufficient hidden (<5): ${insufficientHidden.length}`);
        console.log(`❌ No sample tests: ${noSampleTests.length}`);

        console.log('\n=== ACTION NEEDED ===');
        const totalNeedingWork = noSampleTests.length + insufficientHidden.length;
        console.log(`Total problems needing test cases: ${totalNeedingWork}`);

        // Export problem IDs for processing
        const problemsNeedingWork = [
            ...noSampleTests.map(p => ({ id: p.problem_id, title: p.title, reason: 'no_sample' })),
            ...insufficientHidden.map(p => ({ id: p.problem_id, title: p.title, reason: 'insufficient_hidden', current: p.hidden_tests }))
        ];

        // Save to file for reference
        const fs = require('fs');
        fs.writeFileSync(
            './scripts/problems_needing_tests.json',
            JSON.stringify(problemsNeedingWork, null, 2)
        );
        console.log('\n📄 Detailed list saved to: scripts/problems_needing_tests.json');

    } catch (err) {
        console.error('Error:', err);
    } finally {
        client.release();
        await pool.end();
    }
}

analyzeTestCases();
