const pool = require('../db');

async function verifyAndFixTestCases() {
    const client = await pool.connect();

    try {
        console.log('Verifying test cases for all problems...\n');

        const problems = await client.query(`
            SELECT p.problem_id, p.title, p.topic, p.constraints,
                   COUNT(tc.test_case_id) as test_count
            FROM problems p
            LEFT JOIN test_cases tc ON p.problem_id = tc.problem_id
            GROUP BY p.problem_id, p.title, p.topic, p.constraints
            ORDER BY p.title
        `);

        let issuesFound = 0;
        const problemsToFix = [];

        for (const prob of problems.rows) {
            // Get all test cases for this problem
            const tests = await client.query(
                `SELECT test_case_id, input, expected_output, is_sample 
                 FROM test_cases 
                 WHERE problem_id = $1 
                 ORDER BY is_sample DESC, test_case_order`,
                [prob.problem_id]
            );

            // Check for common issues
            let hasIssue = false;
            const issues = [];

            // Issue 1: Generic placeholder tests that don't match problem
            for (const test of tests.rows) {
                // Check for obviously wrong generic tests
                if (test.input === '0' && test.expected_output === '0' && !prob.title.includes('0')) {
                    issues.push(`Generic test: input='0' output='0'`);
                    hasIssue = true;
                }
                if (test.input === '1' && test.expected_output === '1' && prob.topic !== 'Dynamic Programming') {
                    issues.push(`Generic test: input='1' output='1'`);
                    hasIssue = true;
                }
            }

            // Issue 2: Two Sum specific - check for n=1 test case
            if (prob.title === 'Two Sum') {
                for (const test of tests.rows) {
                    if (test.input.startsWith('1\n')) {
                        issues.push(`Invalid Two Sum test: n=1 violates constraint (2 <= n)`);
                        hasIssue = true;
                        // Delete this bad test case
                        await client.query('DELETE FROM test_cases WHERE test_case_id = $1', [test.test_case_id]);
                        console.log(`  🔧 Fixed: Deleted invalid test case`);
                    }
                }
            }

            // Issue 3: Tests with "-1 -1" or "error" outputs that don't make sense
            if (prob.constraints && prob.constraints.includes('valid answer exists')) {
                for (const test of tests.rows) {
                    if (test.expected_output === '-1 -1' || test.expected_output === 'error') {
                        issues.push(`Invalid output for problem with guaranteed solution`);
                        hasIssue = true;
                    }
                }
            }

            if (hasIssue) {
                issuesFound++;
                console.log(`❌ ${prob.title} (${prob.topic})`);
                issues.forEach(issue => console.log(`   - ${issue}`));
                problemsToFix.push({
                    id: prob.problem_id,
                    title: prob.title,
                    issues: issues
                });
            }
        }

        console.log('\n' + '='.repeat(60));
        console.log(`Total problems checked: ${problems.rows.length}`);
        console.log(`Problems with issues: ${issuesFound}`);

        if (issuesFound > 0) {
            console.log('\n⚠️  Some test cases may need manual review and fixing');
            console.log('   Generic placeholder tests work but may not be ideal');
        }

    } catch (err) {
        console.error('Error:', err);
    } finally {
        client.release();
        await pool.end();
    }
}

verifyAndFixTestCases();
