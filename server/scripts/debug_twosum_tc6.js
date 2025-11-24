const pool = require('../db');

async function debugTwoSumTestCase6() {
    const client = await pool.connect();
    try {
        // Get test case 6
        const result = await client.query(`
            SELECT tc.* 
            FROM test_cases tc 
            JOIN problems p ON tc.problem_id = p.problem_id 
            WHERE p.title = 'Two Sum' AND tc.test_case_order = 6
        `);

        if (result.rows.length === 0) {
            console.log('Test case 6 not found!');
            return;
        }

        const testCase = result.rows[0];
        console.log('Test Case #6 Details:');
        console.log('====================');
        console.log('Input (raw):');
        console.log(testCase.input);
        console.log('\nInput (escaped):');
        console.log(JSON.stringify(testCase.input));
        console.log('\nExpected Output (raw):');
        console.log(testCase.expected_output);
        console.log('\nExpected Output (escaped):');
        console.log(JSON.stringify(testCase.expected_output));
        console.log('\nIs Sample:', testCase.is_sample);
        console.log('\n====================');
        console.log('\nAnalysis:');
        const lines = testCase.input.split('\n');
        console.log(`Lines in input: ${lines.length}`);
        lines.forEach((line, i) => {
            console.log(`Line ${i}: "${line}" (length: ${line.length})`);
        });

        // Parse the test
        const n = parseInt(lines[0]);
        const nums = lines[1].split(' ').map(x => parseInt(x));
        const target = parseInt(lines[2]);

        console.log('\nParsed values:');
        console.log(`n = ${n}`);
        console.log(`nums = [${nums.join(', ')}]`);
        console.log(`target = ${target}`);

        // Run the algorithm
        console.log('\nRunning Two Sum algorithm:');
        const mp = new Map();
        let found = false;
        for (let i = 0; i < n; i++) {
            const need = target - nums[i];
            console.log(`  i=${i}, nums[i]=${nums[i]}, need=${need}`);
            if (mp.has(need)) {
                console.log(`    ✓ Found! Output: ${mp.get(need)} ${i}`);
                found = true;
                break;
            }
            mp.set(nums[i], i);
            console.log(`    Added to map: ${nums[i]} -> ${i}`);
        }

        if (!found) {
            console.log('  ❌ No solution found!');
        }

    } catch (err) {
        console.error('Error:', err);
    } finally {
        client.release();
        await pool.end();
    }
}

debugTwoSumTestCase6();
