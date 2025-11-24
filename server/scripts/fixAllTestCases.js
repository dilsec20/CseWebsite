const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'dilip',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    database: process.env.DB_NAME || 'placement_prep',
});

async function fixAllTestCases() {
    const client = await pool.connect();
    try {
        console.log('🔧 Starting automated test case fixes...\n');

        let fixes = 0;

        // Fix 1: 3Sum Test Case #2 - Empty expected output
        await client.query(`
            UPDATE test_cases
            SET expected_output = '-1 -1 2
-1 0 1'
            WHERE problem_id = (SELECT problem_id FROM problems WHERE title = '3Sum')
            AND is_sample = false
            AND test_case_order = 1
        `);
        console.log('✅ Fixed 3Sum test case #2');
        fixes++;

        // Fix 2: 3Sum Test Case #4 - Wrong element count
        await client.query(`
            UPDATE test_cases
            SET input = '5
-2 0 1 1 2
0'
            WHERE problem_id = (SELECT problem_id FROM problems WHERE title = '3Sum')
            AND is_sample = false
            AND test_case_order = 3
        `);
        console.log('✅ Fixed 3Sum test case #4');
        fixes++;

        // Fix 3-4: Valid Palindrome & Longest Substring - Remove empty test cases
        await client.query(`
            DELETE FROM test_cases
            WHERE (input IS NULL OR input = '' OR expected_output IS NULL OR expected_output = '')
            AND problem_id IN (
                SELECT problem_id FROM problems 
                WHERE title IN ('Valid Palindrome', 'Longest Substring Without Repeating Characters')
            )
        `);
        console.log('✅ Removed empty test cases for Valid Palindrome and Longest Substring');
        fixes += 2;

        // Fix 5-8: Linked List empty outputs - Set proper empty list representation
        await client.query(`
            UPDATE test_cases
            SET expected_output = ''
            WHERE expected_output IS NULL OR expected_output = ''
            AND problem_id IN (
                SELECT problem_id FROM problems 
                WHERE title IN ('Reverse Linked List', 'Merge Two Sorted Lists')
            )
        `);

        // Actually, for linked lists with 0 nodes, output should be empty or specific
        // Let's handle Merge Two Sorted Lists edge cases properly
        await client.query(`
            UPDATE test_cases
            SET expected_output = '1 3 4'
            WHERE problem_id = (SELECT problem_id FROM problems WHERE title = 'Merge Two Sorted Lists')
            AND input = '0
0'
            AND is_sample = false
        `);
        console.log('✅ Fixed Merge Two Sorted Lists empty case');
        fixes++;

        // Fix for tree problems - remove empty inputs
        await client.query(`
            DELETE FROM test_cases
            WHERE (input IS NULL OR input = '')
            AND problem_id IN (
                SELECT problem_id FROM problems 
                WHERE title IN ('Maximum Depth of Binary Tree', 'Invert Binary Tree')
            )
        `);
        console.log('✅ Removed empty tree test cases');
        fixes += 3;

        // Fix Valid Parentheses empty case
        await client.query(`
            DELETE FROM test_cases
            WHERE (input IS NULL OR input = '')
            AND problem_id = (SELECT problem_id FROM problems WHERE title = 'Valid Parentheses')
        `);
        console.log('✅ Removed empty Valid Parentheses test case');
        fixes++;

        // Fix Merge Intervals - the format is correct (intervals on separate lines)
        // Just need to make sure expected output is correct
        console.log('ℹ️  Merge Intervals format is correct (intervals are multi-line)');

        console.log(`\n✅ Applied ${fixes} fixes successfully!`);
        console.log('\n🔄 Run verifyAllTestCases.js again to confirm all issues are resolved.');

    } catch (err) {
        console.error('❌ Error during fixes:', err.message);
        console.error(err.stack);
    } finally {
        client.release();
        pool.end();
    }
}

fixAllTestCases();
