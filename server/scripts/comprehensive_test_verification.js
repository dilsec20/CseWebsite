const pool = require('../db');

async function comprehensiveTestVerification() {
    const client = await pool.connect();

    try {
        console.log('🔍 Running Comprehensive Test Case Verification...\n');
        console.log('='.repeat(70));

        const problems = await client.query(`
            SELECT p.problem_id, p.title, p.topic, p.difficulty, p.constraints
            FROM problems p
            ORDER BY p.title
        `);

        let totalIssues = 0;
        let fixedCount = 0;
        const issuesByType = {
            constraintViolation: 0,
            genericPlaceholder: 0,
            invalidOutput: 0,
            insufficientTests: 0
        };

        for (const prob of problems.rows) {
            const tests = await client.query(
                `SELECT test_case_id, input, expected_output, is_sample 
                 FROM test_cases 
                 WHERE problem_id = $1 
                 ORDER BY is_sample DESC, test_case_order`,
                [prob.problem_id]
            );

            let problemIssues = [];

            // Check 1: Insufficient test count
            if (tests.rows.length < 5) {
                problemIssues.push(`Only ${tests.rows.length} test cases (need ≥5)`);
                issuesByType.insufficientTests++;
            }

            // Check 2: Array problems with invalid sizes
            if (prob.topic === 'Array' || prob.title.includes('Array')) {
                for (const test of tests.rows) {
                    const lines = test.input.trim().split('\n');
                    if (lines.length > 0) {
                        const n = parseInt(lines[0]);

                        // Check if n=0 or n=1 when problem needs multiple elements
                        if ((n === 0 || n === 1) &&
                            (prob.title.includes('Two') ||
                                prob.title.includes('Pair') ||
                                prob.constraints?.includes('2 <='))) {
                            problemIssues.push(`Invalid array size: n=${n}`);
                            issuesByType.constraintViolation++;
                            // Delete this test
                            await client.query('DELETE FROM test_cases WHERE test_case_id = $1', [test.test_case_id]);
                            fixedCount++;
                        }
                    }
                }
            }

            // Check 3: String problems with constraints
            if (prob.topic === 'String') {
                for (const test of tests.rows) {
                    // Check for empty strings when min length > 0
                    if (test.input.trim() === '' && prob.constraints?.includes('1 <=')) {
                        problemIssues.push('Empty string violates min length constraint');
                        issuesByType.constraintViolation++;
                        await client.query('DELETE FROM test_cases WHERE test_case_id = $1', [test.test_case_id]);
                        fixedCount++;
                    }
                }
            }

            // Check 4: Problems with "guaranteed solution" having invalid outputs
            if (prob.constraints?.includes('valid answer exists') ||
                prob.constraints?.includes('exactly one solution')) {
                for (const test of tests.rows) {
                    if (test.expected_output.includes('-1') ||
                        test.expected_output === 'error' ||
                        test.expected_output === 'false') {
                        problemIssues.push('Invalid output for guaranteed solution problem');
                        issuesByType.invalidOutput++;
                        await client.query('DELETE FROM test_cases WHERE test_case_id = $1', [test.test_case_id]);
                        fixedCount++;
                    }
                }
            }

            // Check 5: Overly generic tests that don't make sense
            let genericCount = 0;
            for (const test of tests.rows) {
                if (!test.is_sample &&
                    ((test.input === '1' && test.expected_output === '1') ||
                        (test.input === '0' && test.expected_output === '0') ||
                        (test.input === '5' && test.expected_output === '5'))) {
                    genericCount++;
                }
            }

            if (genericCount >= 3) {
                problemIssues.push(`${genericCount} overly generic placeholder tests`);
                issuesByType.genericPlaceholder++;
            }

            if (problemIssues.length > 0) {
                totalIssues++;
                console.log(`\n⚠️  ${prob.title} (${prob.topic} - ${prob.difficulty})`);
                problemIssues.forEach(issue => console.log(`    - ${issue}`));
            }
        }

        console.log('\n' + '='.repeat(70));
        console.log('📊 VERIFICATION SUMMARY');
        console.log('='.repeat(70));
        console.log(`Total problems checked: ${problems.rows.length}`);
        console.log(`Problems with issues: ${totalIssues}`);
        console.log(`Test cases fixed/removed: ${fixedCount}`);
        console.log('\nIssues by type:');
        console.log(`  - Constraint violations: ${issuesByType.constraintViolation}`);
        console.log(`  - Invalid outputs: ${issuesByType.invalidOutput}`);
        console.log(`  - Generic placeholders: ${issuesByType.genericPlaceholder}`);
        console.log(`  - Insufficient tests: ${issuesByType.insufficientTests}`);
        console.log('='.repeat(70));

        if (fixedCount > 0) {
            console.log(`\n✅ Auto-fixed ${fixedCount} invalid test cases`);
        }

        if (issuesByType.genericPlaceholder > 0) {
            console.log('\n💡 Note: Generic placeholder tests work but could be improved');
            console.log('   They provide basic coverage but may not test edge cases thoroughly');
        }

    } catch (err) {
        console.error('Error:', err);
    } finally {
        client.release();
        await pool.end();
    }
}

comprehensiveTestVerification();
