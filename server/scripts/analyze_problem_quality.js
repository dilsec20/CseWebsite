const pool = require('../db');

async function analyzeProblemQuality() {
    const client = await pool.connect();
    try {
        console.log('🔍 Analyzing Problem Quality...\n');

        // Check for missing descriptions
        const noDescription = await client.query(`
            SELECT problem_id, title, topic 
            FROM problems 
            WHERE description IS NULL OR description = '' OR LENGTH(description) < 10
        `);

        console.log(`problems with missing/short descriptions: ${noDescription.rows.length}`);
        if (noDescription.rows.length > 0) {
            noDescription.rows.forEach(p => console.log(`  - [${p.problem_id}] ${p.title} (${p.topic})`));
        }

        // Check for test case coverage
        const testCoverage = await client.query(`
            SELECT p.problem_id, p.title, p.topic,
                   COUNT(tc.test_case_id) as total_tests,
                   COUNT(CASE WHEN tc.is_sample = true THEN 1 END) as sample_tests,
                   COUNT(CASE WHEN tc.is_sample = false THEN 1 END) as hidden_tests
            FROM problems p
            LEFT JOIN test_cases tc ON p.problem_id = tc.problem_id
            GROUP BY p.problem_id, p.title, p.topic
            ORDER BY total_tests ASC, sample_tests ASC
        `);

        const noTests = testCoverage.rows.filter(p => parseInt(p.total_tests) === 0);
        const noSample = testCoverage.rows.filter(p => parseInt(p.total_tests) > 0 && parseInt(p.sample_tests) === 0);
        const noHidden = testCoverage.rows.filter(p => parseInt(p.total_tests) > 0 && parseInt(p.hidden_tests) === 0);
        const insufficientTests = testCoverage.rows.filter(p => parseInt(p.total_tests) > 0 && parseInt(p.total_tests) < 3);

        console.log(`\nProblems with NO test cases: ${noTests.length}`);
        if (noTests.length > 0) {
            noTests.forEach(p => console.log(`  - [${p.problem_id}] ${p.title} (${p.topic})`));
        }

        console.log(`\nProblems with NO SAMPLE test cases: ${noSample.length}`);
        if (noSample.length > 0) {
            noSample.forEach(p => console.log(`  - [${p.problem_id}] ${p.title} (${p.topic})`));
        }

        console.log(`\nProblems with NO HIDDEN test cases: ${noHidden.length}`);
        if (noHidden.length > 0) {
            noHidden.forEach(p => console.log(`  - [${p.problem_id}] ${p.title} (${p.topic})`));
        }

        console.log(`\nProblems with insufficient tests (< 3): ${insufficientTests.length}`);
        if (insufficientTests.length > 0) {
            insufficientTests.slice(0, 10).forEach(p => console.log(`  - [${p.problem_id}] ${p.title}: ${p.total_tests} total`));
            if (insufficientTests.length > 10) console.log(`  ...and ${insufficientTests.length - 10} more`);
        }

    } catch (err) {
        console.error('Error:', err);
    } finally {
        client.release();
        await pool.end();
    }
}

analyzeProblemQuality();
