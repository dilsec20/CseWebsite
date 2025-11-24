const pool = require('../db');

async function fixTestCase7() {
    const client = await pool.connect();
    try {
        console.log('Fixing Test Case #7 for Two Sum...\n');

        // Find Two Sum problem
        const prob = await client.query("SELECT problem_id FROM problems WHERE title = 'Two Sum'");
        if (prob.rows.length === 0) {
            console.log('Problem not found');
            return;
        }

        const problemId = prob.rows[0].problem_id;

        // Delete old test case #7
        await client.query(`
            DELETE FROM test_cases 
            WHERE problem_id = $1 AND test_case_order = 7
        `, [problemId]);

        console.log('✓ Deleted old test case #7');

        // Add new test case #7 with ONLY ONE solution
        // Array: [15, 7, 11, 2, 9, 1] with target=13
        // Only valid solution: indices 0 and 5 (15 - 2 = 13? No, wait 15 + (-2) = 13? No)
        // Let me use: [15, 7, 11, 2] with target=13
        // 15 + 2? No = 17
        // 7 + 11? No = 18  
        // 11 + 2 = 13 ✓ indices 2,3
        // Better: [100, 50, 25, 13, 87] target=113
        // 100 + 13 = 113 ✓ indices 0,3 (only solution)

        const newTest = {
            input: "5\n100 50 25 13 87\n113",
            output: "0 3",
            order: 7
        };

        await client.query(`
            INSERT INTO test_cases (problem_id, input, expected_output, is_sample, test_case_order)
            VALUES ($1, $2, $3, false, $4)
        `, [problemId, newTest.input, newTest.output, newTest.order]);

        console.log('✓ Added new test case #7');
        console.log(`  Input: ${newTest.input.replace(/\n/g, ' | ')}`);
        console.log(`  Expected output: ${newTest.output}`);
        console.log(`  Verification: nums[0]=100 + nums[3]=13 = 113 ✓`);

        // Verify it has only one solution
        const nums = [100, 50, 25, 13, 87];
        const target = 113;
        let solutionCount = 0;
        for (let i = 0; i < nums.length; i++) {
            for (let j = i + 1; j < nums.length; j++) {
                if (nums[i] + nums[j] === target) {
                    solutionCount++;
                    console.log(`    Solution found: ${i} ${j} (${nums[i]} + ${nums[j]} = ${target})`);
                }
            }
        }

        if (solutionCount === 1) {
            console.log('\n✅ Perfect! Exactly ONE solution exists.');
        } else {
            console.log(`\n⚠️  WARNING: Found ${solutionCount} solutions!`);
        }

    } catch (err) {
        console.error('Error:', err);
    } finally {
        client.release();
        await pool.end();
    }
}

fixTestCase7();
