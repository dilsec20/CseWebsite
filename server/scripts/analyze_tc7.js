const pool = require('../db');

async function analyzeTestCase7() {
    const client = await pool.connect();
    try {
        const result = await client.query(`
            SELECT tc.input, tc.expected_output
            FROM test_cases tc 
            JOIN problems p ON tc.problem_id = p.problem_id 
            WHERE p.title = 'Two Sum' AND tc.test_case_order = 7
        `);

        if (result.rows.length === 0) {
            console.log('Test case 7 not found');
            return;
        }

        const tc = result.rows[0];
        console.log('Test Case #7:');
        console.log('Input:', tc.input);
        console.log('Expected output:', tc.expected_output);
        console.log('\nParsing...');

        const lines = tc.input.split('\n');
        const n = parseInt(lines[0]);
        const nums = lines[1].split(' ').map(x => parseInt(x));
        const target = parseInt(lines[2]);

        console.log(`n = ${n}`);
        console.log(`nums = [${nums.join(', ')}]`);
        console.log(`target = ${target}`);

        // Find ALL valid solutions
        console.log('\nFinding ALL valid solutions:');
        const solutions = [];
        for (let i = 0; i < n; i++) {
            for (let j = i + 1; j < n; j++) {
                if (nums[i] + nums[j] === target) {
                    solutions.push(`${i} ${j}`);
                    console.log(`  ${i} ${j} → nums[${i}]=${nums[i]} + nums[${j}]=${nums[j]} = ${target}`);
                }
            }
        }

        console.log(`\nTotal valid solutions: ${solutions.length}`);
        if (solutions.length > 1) {
            console.log('⚠️  PROBLEM: Multiple solutions exist!');
            console.log('   Problem states "exactly one solution" but this test has multiple!');
        }

    } catch (err) {
        console.error('Error:', err);
    } finally {
        client.release();
        await pool.end();
    }
}

analyzeTestCase7();
