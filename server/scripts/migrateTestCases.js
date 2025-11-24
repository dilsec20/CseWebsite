const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'dilip',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    database: process.env.DB_NAME || 'placement_prep',
});

// Generate comprehensive test cases based on problem title
function generateTestCases(problem) {
    const testCases = [];
    const title = problem.title.toLowerCase();

    // First test case: sample from problem (mark as visible)
    testCases.push({
        input: problem.test_case_input,
        output: problem.test_case_output,
        is_sample: true,
        order: 0
    });

    // Generate hidden test cases based on problem type
    if (title.includes('two sum')) {
        testCases.push(
            { input: '3\n3 2 4\n6', output: '1 2', is_sample: false, order: 1 },
            { input: '2\n3 3\n6', output: '0 1', is_sample: false, order: 2 },
            { input: '5\n1 5 3 7 9\n12', output: '2 4', is_sample: false, order: 3 },
            { input: '5\n-1 -2 -3 -4 -5\n-8', output: '2 4', is_sample: false, order: 4 },
            { input: '4\n0 4 3 0\n0', output: '0 3', is_sample: false, order: 5 }
        );
    } else if (title.includes('best time to buy') || title.includes('best time')) {
        testCases.push(
            { input: '5\n7 6 4 3 1', output: '0', is_sample: false, order: 1 },
            { input: '3\n2 4 1', output: '2', is_sample: false, order: 2 },
            { input: '6\n3 2 6 5 0 3', output: '4', is_sample: false, order: 3 },
            { input: '5\n1 2 3 4 5', output: '4', is_sample: false, order: 4 }
        );
    } else if (title.includes('binary search')) {
        testCases.push(
            { input: '6\n-1 0 3 5 9 12\n2', output: '-1', is_sample: false, order: 1 },
            { input: '1\n5\n5', output: '0', is_sample: false, order: 2 },
            { input: '2\n2 5\n0', output: '-1', is_sample: false, order: 3 },
            { input: '5\n1 2 3 4 5\n3', output: '2', is_sample: false, order: 4 },
            { input: '7\n-10 -5 0 1 3 7 10\n7', output: '5', is_sample: false, order: 5 }
        );
    } else if (title.includes('maximum subarray') || title.includes('kadane')) {
        testCases.push(
            { input: '1\n-2', output: '-2', is_sample: false, order: 1 },
            { input: '1\n5', output: '5', is_sample: false, order: 2 },
            { input: '3\n5 -3 5', output: '7', is_sample: false, order: 3 },
            { input: '8\n-2 -3 4 -1 -2 1 5 -3', output: '7', is_sample: false, order: 4 }
        );
    } else if (title.includes('valid palindrome')) {
        testCases.push(
            { input: 'race a car', output: 'false', is_sample: false, order: 1 },
            { input: ' ', output: 'true', is_sample: false, order: 2 },
            { input: 'a.', output: 'true', is_sample: false, order: 3 }
        );
    } else if (title.includes('valid anagram')) {
        testCases.push(
            { input: 'rat\ncar', output: 'false', is_sample: false, order: 1 },
            { input: 'a\nab', output: 'false', is_sample: false, order: 2 },
            { input: 'listen\nsilent', output: 'true', is_sample: false, order: 3 }
        );
    } else if (title.includes('climbing')) {
        testCases.push(
            { input: '1', output: '1', is_sample: false, order: 1 },
            { input: '2', output: '2', is_sample: false, order: 2 },
            { input: '4', output: '5', is_sample: false, order: 3 },
            { input: '5', output: '8', is_sample: false, order: 4 }
        );
    } else if (title.includes('coin change')) {
        testCases.push(
            { input: '1\n2\n3', output: '-1', is_sample: false, order: 1 },
            { input: '1\n1\n0', output: '0', is_sample: false, order: 2 },
            { input: '3\n1 3 4\n6', output: '2', is_sample: false, order: 3 },
            { input: '4\n1 2 5 10\n27', output: '4', is_sample: false, order: 4 }
        );
    } else if (title.includes('valid parentheses') || title.includes('valid brackets')) {
        testCases.push(
            { input: '(]', output: 'false', is_sample: false, order: 1 },
            { input: '([)]', output: 'false', is_sample: false, order: 2 },
            { input: '{[]}', output: 'true', is_sample: false, order: 3 },
            { input: '', output: 'true', is_sample: false, order: 4 }
        );
    } else if (title.includes('reverse linked list')) {
        testCases.push(
            { input: '2\n1 2', output: '2 1', is_sample: false, order: 1 },
            { input: '1\n1', output: '1', is_sample: false, order: 2 },
            { input: '0', output: '', is_sample: false, order: 3 }
        );
    } else if (title.includes('merge two sorted')) {
        testCases.push(
            { input: '0\n0', output: '', is_sample: false, order: 1 },
            { input: '0\n1\n1', output: '1', is_sample: false, order: 2 },
            { input: '3\n1 2 4\n0', output: '1 2 4', is_sample: false, order: 3 }
        );
    } else if (title.includes('3sum')) {
        testCases.push(
            { input: '1\n0', output: '', is_sample: false, order: 1 },
            { input: '3\n0 0 0', output: '0 0 0', is_sample: false, order: 2 },
            { input: '6\n-2 0 1 1 2\n0', output: '-2 0 2\n-1 0 1', is_sample: false, order: 3 }
        );
    } else if (title.includes('longest substring') && title.includes('without repeating')) {
        testCases.push(
            { input: 'bbbbb', output: '1', is_sample: false, order: 1 },
            { input: 'pwwkew', output: '3', is_sample: false, order: 2 },
            { input: '', output: '0', is_sample: false, order: 3 },
            { input: 'dvdf', output: '3', is_sample: false, order: 4 }
        );
    } else if (title.includes('house robber')) {
        testCases.push(
            { input: '2\n2 7', output: '7', is_sample: false, order: 1 },
            { input: '1\n5', output: '5', is_sample: false, order: 2 },
            { input: '3\n2 1 1', output: '2', is_sample: false, order: 3 }
        );
    } else if (title.includes('contains duplicate')) {
        testCases.push(
            { input: '4\n1 2 3 4', output: 'false', is_sample: false, order: 1 },
            { input: '10\n1 1 1 3 3 4 3 2 4 2', output: 'true', is_sample: false, order: 2 }
        );
    } else if (title.includes('missing number')) {
        testCases.push(
            { input: '2\n0 1', output: '2', is_sample: false, order: 1 },
            { input: '9\n9 6 4 2 3 5 7 0 1', output: '8', is_sample: false, order: 2 },
            { input: '1\n1', output: '0', is_sample: false, order: 3 }
        );
    } else if (title.includes('product of array except self') || title.includes('product except')) {
        testCases.push(
            { input: '5\n-1 1 0 -3 3', output: '0 0 9 0 0', is_sample: false, order: 1 },
            { input: '2\n1 2', output: '2 1', is_sample: false, order: 2 }
        );
    } else if (title.includes('container with most water') || title.includes('container')) {
        testCases.push(
            { input: '2\n1 1', output: '1', is_sample: false, order: 1 },
            { input: '2\n1 2', output: '1', is_sample: false, order: 2 }
        );
    } else if (title.includes('number of islands')) {
        testCases.push(
            { input: '4 4\n1 1 0 0\n1 1 0 0\n0 0 1 0\n0 0 0 1', output: '3', is_sample: false, order: 1 },
            { input: '1 1\n1', output: '1', is_sample: false, order: 2 }
        );
    } else if (title.includes('course schedule')) {
        testCases.push(
            { input: '1 0', output: 'true', is_sample: false, order: 1 },
            { input: '2 2\n1 0\n0 1', output: 'false', is_sample: false, order: 2 }
        );
    } else if (title.includes('invert') && title.includes('tree')) {
        testCases.push(
            { input: '2 1 3', output: '2 3 1', is_sample: false, order: 1 },
            { input: '', output: '', is_sample: false, order: 2 },
            { input: '1', output: '1', is_sample: false, order: 3 }
        );
    } else if (title.includes('maximum depth') || title.includes('max depth')) {
        testCases.push(
            { input: '', output: '0', is_sample: false, order: 1 },
            { input: '1', output: '1', is_sample: false, order: 2 },
            { input: '1 2', output: '2', is_sample: false, order: 3 }
        );
    } else {
        // Generic test cases for other problems
        testCases.push(
            { input: problem.test_case_input, output: problem.test_case_output, is_sample: false, order: 1 },
            { input: problem.test_case_input, output: problem.test_case_output, is_sample: false, order: 2 },
            { input: problem.test_case_input, output: problem.test_case_output, is_sample: false, order: 3 }
        );
    }

    return testCases;
}

async function migrateTestCases() {
    const client = await pool.connect();

    try {
        console.log('🔗 Connected to PostgreSQL...\n');

        // Check if test_cases table exists
        const tableCheck = await client.query(`
            SELECT EXISTS (
                SELECT FROM information_schema.tables 
                WHERE table_name = 'test_cases'
            );
        `);

        if (!tableCheck.rows[0].exists) {
            console.log('❌ test_cases table does not exist. Please run createTestCasesTable.js first.');
            return;
        }

        console.log('🗑️  Truncating existing test cases...');
        await client.query('TRUNCATE TABLE test_cases RESTART IDENTITY');
        console.log('✅ Table truncated.\n');

        console.log('📝 Generating test cases for curated problems...\n');

        // Get all problems
        const problems = await client.query(`
            SELECT problem_id, title, topic, difficulty, test_case_input, test_case_output
            FROM problems
            ORDER BY problem_id
        `);

        console.log(`Found ${problems.rows.length} problems\n`);

        let totalTestCases = 0;
        let problemsProcessed = 0;

        for (const problem of problems.rows) {
            const testCases = generateTestCases(problem);

            // Insert all test cases for this problem
            for (const tc of testCases) {
                await client.query(
                    `INSERT INTO test_cases (problem_id, input, expected_output, is_sample, test_case_order)
                     VALUES ($1, $2, $3, $4, $5)`,
                    [problem.problem_id, tc.input, tc.output, tc.is_sample, tc.order]
                );
                totalTestCases++;
            }

            problemsProcessed++;
            if (problemsProcessed % 25 === 0) {
                console.log(`   Processed ${problemsProcessed} problems...`);
            }
        }

        console.log(`\n✅ Migration complete!`);
        console.log(`📊 Statistics:`);
        console.log(`   Problems processed: ${problemsProcessed}`);
        console.log(`   Total test cases created: ${totalTestCases}`);
        console.log(`   Average test cases per problem: ${(totalTestCases / problemsProcessed).toFixed(1)}`);

        // Show sample vs hidden breakdown
        const breakdown = await client.query(`
            SELECT 
                COUNT(*) FILTER (WHERE is_sample = true) as sample,
                COUNT(*) FILTER (WHERE is_sample = false) as hidden
            FROM test_cases
        `);

        console.log(`\n📈 Test case breakdown:`);
        console.log(`   Sample test cases: ${breakdown.rows[0].sample}`);
        console.log(`   Hidden test cases: ${breakdown.rows[0].hidden}`);

    } catch (error) {
        console.error('❌ Migration failed:', error.message);
        throw error;
    } finally {
        client.release();
        await pool.end();
    }
}

// Run migration
migrateTestCases()
    .then(() => {
        console.log('\n🎉 Test cases migration successful!');
        process.exit(0);
    })
    .catch(error => {
        console.error('\nMigration failed:', error);
        process.exit(1);
    });
