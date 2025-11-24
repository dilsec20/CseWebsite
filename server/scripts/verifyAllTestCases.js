const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'dilip',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    database: process.env.DB_NAME || 'placement_prep',
});

async function verifyAllTestCases() {
    const client = await pool.connect();
    try {
        console.log('🔍 Starting comprehensive test case verification...\n');

        // Get all problems
        const problems = await client.query(`
            SELECT problem_id, title, difficulty, topic
            FROM problems
            ORDER BY problem_id
        `);

        console.log(`Total problems: ${problems.rows.length}\n`);

        let issuesFound = [];

        for (const problem of problems.rows) {
            // Get test cases for this problem
            const testCases = await client.query(`
                SELECT test_case_id, input, expected_output, is_sample, test_case_order
                FROM test_cases
                WHERE problem_id = $1
                ORDER BY is_sample DESC, test_case_order
            `, [problem.problem_id]);

            // Check 1: Does problem have test cases?
            if (testCases.rows.length === 0) {
                issuesFound.push({
                    problem: problem.title,
                    issue: 'NO TEST CASES',
                    severity: 'CRITICAL'
                });
                continue;
            }

            // Check 2: Does problem have at least one sample test case?
            const sampleTests = testCases.rows.filter(tc => tc.is_sample);
            if (sampleTests.length === 0) {
                issuesFound.push({
                    problem: problem.title,
                    issue: 'NO SAMPLE TEST CASE',
                    severity: 'HIGH'
                });
            }

            // Check 3: Check for empty inputs or outputs
            for (let i = 0; i < testCases.rows.length; i++) {
                const tc = testCases.rows[i];
                if (!tc.input || tc.input.trim() === '') {
                    issuesFound.push({
                        problem: problem.title,
                        issue: `Test case #${i + 1}: Empty input`,
                        severity: 'HIGH',
                        testCase: i + 1
                    });
                }
                if (!tc.expected_output || tc.expected_output.trim() === '') {
                    issuesFound.push({
                        problem: problem.title,
                        issue: `Test case #${i + 1}: Empty expected output`,
                        severity: 'HIGH',
                        testCase: i + 1
                    });
                }
            }

            // Check 4: Format consistency
            for (let i = 0; i < testCases.rows.length; i++) {
                const tc = testCases.rows[i];
                const inputLines = tc.input.split('\n');

                // Check if first line is a number (common pattern)
                if (inputLines.length > 0) {
                    const firstLine = inputLines[0].trim();
                    if (firstLine && !isNaN(firstLine)) {
                        const n = parseInt(firstLine);
                        // Check if second line has the right number of elements
                        if (inputLines.length > 1) {
                            const secondLine = inputLines[1].trim();
                            const elements = secondLine.split(/\s+/).filter(e => e.length > 0);
                            if (elements.length !== n && elements.length > 0) {
                                issuesFound.push({
                                    problem: problem.title,
                                    issue: `Test case #${i + 1}: First line says ${n} elements, but found ${elements.length}`,
                                    severity: 'MEDIUM',
                                    testCase: i + 1,
                                    input: tc.input
                                });
                            }
                        }
                    }
                }
            }
        }

        // Print results
        console.log('\n' + '='.repeat(80));
        console.log('VERIFICATION RESULTS');
        console.log('='.repeat(80) + '\n');

        if (issuesFound.length === 0) {
            console.log('✅ ALL TEST CASES VERIFIED SUCCESSFULLY!');
            console.log('No issues found across all problems.\n');
        } else {
            console.log(`❌ Found ${issuesFound.length} issues:\n`);

            // Group by severity
            const critical = issuesFound.filter(i => i.severity === 'CRITICAL');
            const high = issuesFound.filter(i => i.severity === 'HIGH');
            const medium = issuesFound.filter(i => i.severity === 'MEDIUM');

            if (critical.length > 0) {
                console.log(`🔴 CRITICAL (${critical.length}):`);
                critical.forEach(issue => {
                    console.log(`   - ${issue.problem}: ${issue.issue}`);
                });
                console.log('');
            }

            if (high.length > 0) {
                console.log(`🟠 HIGH (${high.length}):`);
                high.forEach(issue => {
                    console.log(`   - ${issue.problem}: ${issue.issue}`);
                });
                console.log('');
            }

            if (medium.length > 0) {
                console.log(`🟡 MEDIUM (${medium.length}):`);
                medium.forEach(issue => {
                    console.log(`   - ${issue.problem}: ${issue.issue}`);
                    if (issue.input) {
                        console.log(`     Input: ${issue.input.substring(0, 50)}...`);
                    }
                });
                console.log('');
            }
        }

        // Summary statistics
        console.log('='.repeat(80));
        console.log('STATISTICS');
        console.log('='.repeat(80));
        console.log(`Total problems: ${problems.rows.length}`);

        const totalTestCases = await client.query('SELECT COUNT(*) FROM test_cases');
        console.log(`Total test cases: ${totalTestCases.rows[0].count}`);

        const sampleCount = await client.query('SELECT COUNT(*) FROM test_cases WHERE is_sample = true');
        console.log(`Sample test cases: ${sampleCount.rows[0].count}`);

        const hiddenCount = await client.query('SELECT COUNT(*) FROM test_cases WHERE is_sample = false');
        console.log(`Hidden test cases: ${hiddenCount.rows[0].count}`);

        console.log('\n');

    } catch (err) {
        console.error('❌ Error during verification:', err.message);
        console.error(err.stack);
    } finally {
        client.release();
        pool.end();
    }
}

verifyAllTestCases();
