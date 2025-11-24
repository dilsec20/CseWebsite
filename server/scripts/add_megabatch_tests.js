const pool = require('../db');

// Comprehensive test cases for Stack, Queue,  Binary Search, DP, Greedy problems
// Format optimized for bulk insertion
const megaBatch = [
    // Stack Problems
    ["Valid Parentheses", "()[]{}", "true", ["(]", "false"], ["([)]", "false"], ["{[]}", "true"], ["((", "false"], ["", "true"]],
    ["Min Stack", "push -2\npush 0\npush -3\ngetMin\npop\ntop\ngetMin", "-3\n0\n-2", ["push 1\ngetMin", "1"], ["push 5\npush 1\npop\ngetMin", "5"], ["push 0\npush 1\npush 0\ngetMin", "0"], ["push -1\npush 2\ngetMin", "-1"], ["push 10\npush 10\ngetMin", "10"]],
    ["Daily Temperatures", "73 74 75 71 69 72 76 73", "1 1 4 2 1 1 0 0", ["30 40 50 60", "1 1 1 0"], ["30 60 90", "1 1 0"], ["89 62 70 58 47 47 46 76 100 70", "8 1 5 4 3 2 1 1 0 0"], ["100", "0"], ["30 30 30", "0 0 0"]],
    ["Decode String", "3[a]2[bc]", "aaabcbc", ["3[a2[c]]", "accaccacc"], ["2[abc]3[cd]ef", "abcabccdcdcdef"], ["abc", "abc"], ["10[a]", "aaaaaaaaaa"], ["2[2[y]p]", "yypyyp"]],

    // Queue Problems
    ["Implement Queue using Stacks", "push 1\npush 2\npeek\npop\nempty", "1\n1\nfalse", ["push 1\npop\nempty", "1\ntrue"], ["push 5\npeek", "5"], ["empty", "true"], ["push 1\npush 2\npop\npop\nempty", "1\n2\ntrue"], ["push 10\npeek\npeek", "10\n10"]],
    ["Design Circular Queue", "3\nenqueue 1\nenqueue 2\ndequeue\nenqueue 3", "true\ntrue\ntrue\ntrue", ["2\nenqueue 1\nenqueue 2\nenqueue 3", "true\ntrue\nfalse"], ["1\nenqueue 1\ndequeue", "true\ntrue"], ["5\nisEmpty", "true"], ["4\nenqueue 1\nisFull", "true\nfalse"], ["2\nenqueue 1\nenqueue 2\nisFull", "true\ntrue\ntrue"]],

    // Binary Search Problems
    ["Binary Search", "6 0\n-1 0 3 5 9 12", "1", ["6 9\n-1 0 3 5 9 12", "4"], ["6 2\n-1 0 3 5 9 12", "-1"], ["1 5\n5", "0"], ["10 100\n1 2 3 4 5 6 7 8 9 10", "-1"], ["5 3\n1 2 3 4 5", "2"]],
    ["Search Insert Position", "4 5\n1 3 5 6", "2", ["4 2\n1 3 5 6", "1"], ["4 7\n1 3 5 6", "4"], ["1 1\n2", "0"], ["3 0\n1 2 3", "0"], ["4 10\n1 3 5 6", "4"]],
    ["Find Peak Element", "1 2 3 1", "2", ["1 2 1 3 5 6 4", "5"], ["1", "0"], ["1 2", "1"], ["3 2 1", "0"], ["1 3 2 4 3", "3"]],
    ["Search in Rotated Sorted Array", "7 0\n4 5 6 7 0 1 2", "4", ["7 3\n4 5 6 7 0 1 2", "-1"], ["1 5\n5", "0"], ["3 1\n3 1 2", "1"], ["5 4\n4 5 6 7 0", "0"], ["7 7\n4 5 6 7 0 1 2", "3"]],

    // Dynamic Programming Problems
    ["Climbing Stairs", "3", "3", ["2", "2"], ["1", "1"], ["5", "8"], ["10", "89"], ["20", "10946"]],
    ["House Robber", "1 2 3 1", "4", ["2 7 9 3 1", "12"], ["1", "1"], ["2 1 1 2", "4"], ["5 3 4 11 2", "16"], ["9 1 1 9", "18"]],
    ["Unique Paths", "3 7", "28", ["3 2", "3"], ["1 1", "1"], ["2 2", "2"], ["5 5", "70"], ["10 10", "48620"]],
    ["Coin Change", "11\n1 2 5", "3", ["3\n2", "-1"], ["0\n1", "0"], ["1\n1", "1"], ["5\n1 2 5", "1"], ["100\n1 5 10 25", "4"]],
    ["Longest Increasing Subsequence", "10 9 2 5 3 7 101 18", "4", ["0 1 0 3 2 3", "4"], ["7 7 7 7", "1"], ["1 2 3", "3"], ["1", "1"], ["10 9 8 7 6 5 4 3 2 1", "1"]],
    ["Word Break", "leetcode\nleet code", "true", ["applepenapple\napple pen", "true"], ["catsandog\ncats dog sand and cat", "false"], ["a\na", "true"], ["cars\ncar ca rs", "true"], ["aaaaaaa\naaaa aaa", "true"]],

    // Greedy Problems
    ["Assign Cookies", "1 2 3\n1 1", "1", ["1 2\n1 2 3", "2"], ["10 9 8 7\n5 6 7 8", "2"], ["1 1 1\n1 1 1", "3"], ["5 2\n1 1", "0"], ["1 2 3\n3 3 3", "3"]],
    ["Best Time Buy Sell II", "7 1 5 3 6 4", "7", ["1 2 3 4 5", "4"], ["7 6 4 3 1", "0"], ["2 1 2 0 1", "2"], ["1 2 1 2 1 2", "3"], ["5 5 5 5", "0"]],
    ["Jump Game", "2 3 1 1 4", "true", ["3 2 1 0 4", "false"], ["0", "true"], ["2 0 0", "false"], ["2 5 0 0", "true"], ["1 1 1 1", "true"]],
    ["Majority Element", "3 2 3", "3", ["2 2 1 1 1 2 2", "2"], ["1", "1"], ["6 5 5", "5"], ["1 1 1 2 2", "1"], ["7 7 7 7", "7"]],

    // Tree Problems
    ["Maximum Depth of Binary Tree", "3 9 20 null null 15 7", "3", ["1 2 3 4 5", "3"], ["", "0"], ["1", "1"], ["1 null 2", "2"], ["1 2 null 3", "3"]],
    ["Invert Binary Tree", "4 2 7 1 3 6 9", "4 7 2 9 6 3 1", ["2 1 3", "2 3 1"], ["", ""], ["1", "1"], ["1 2", "1 null 2"], ["1 null 2 null null 3", "1 2 null null 3"]],
    ["Validate Binary Search Tree", "2 1 3", "true", ["5 1 4 null null 3 6", "false"], ["1", "true"], ["0", "true"], ["5 4 6 null null 3 7", "false"], ["10 5 15 null null 6 20", "false"]],
    ["Diameter of Binary Tree", "1 2 3 4 5", "3", ["1 2", "1"], ["1", "0"], ["1 2 3 4 5 null null 6", "4"], ["1 null 2", "1"], ["4 -7 -3 null null null -9 -3 9 -7 -4", "8"]],

    // Graph Problems  
    ["Number of Islands", "4 5\n11110\n11010\n11000\n00000", "1", ["4 5\n11000\n11000\n00100\n00011", "3"], ["1 1\n1", "1"], ["2 2\n10\n01", "2"], ["3 3\n111\n010\n111", "1"], ["2 3\n000\n000", "0"]],
    ["Clone Graph", "1 2\n1 3\n2 4\n3\n", "1 2\n1 3\n2 4\n3\n", ["", ""], ["1\n", "1\n"], ["1 2\n2\n", "1 2\n2\n"], ["1 2 3\n2 3\n3\n", "1 2 3\n2 3\n3\n"], ["1 2\n1\n", "1 2\n1\n"]],
    ["Course Schedule", "2\n1 0", "true", ["2\n1 0\n0 1", "false"], ["1\n", "true"], ["3\n1 0\n2 1", "true"], ["4\n1 0\n2 0\n3 1\n3 2", "true"], ["3\n0 1\n0 2\n1 2", "true"]],
];

async function addMegaBatch() {
    const client = await pool.connect();
    try {
        console.log('Processing mega-batch of test cases...\n');
        let added = 0;
        let problems = 0;

        for (const testData of megaBatch) {
            const [title, sampleIn, sampleOut, ...hiddenPairs] = testData;

            const prob = await client.query('SELECT problem_id FROM problems WHERE title = $1', [title]);
            if (prob.rows.length === 0) {
                console.log(`⚠️  ${title}`);
                continue;
            }

            const pid = prob.rows[0].problem_id;

            // Check if sample exists
            const existing = await client.query(
                'SELECT COUNT(*) FROM test_cases WHERE problem_id = $1 AND is_sample = true',
                [pid]
            );

            if (existing.rows[0].count === '0') {
                await client.query(
                    'INSERT INTO test_cases (problem_id, input, expected_output, is_sample, test_case_order) VALUES ($1, $2, $3, true, 1)',
                    [pid, sampleIn, sampleOut]
                );
                added++;
            }

            // Add hidden tests (pairs of input/output)
            for (let i = 0; i < hiddenPairs.length; i += 2) {
                if (i + 1 < hiddenPairs.length) {
                    await client.query(
                        'INSERT INTO test_cases (problem_id, input, expected_output, is_sample, test_case_order) VALUES ($1, $2, $3, false, $4)',
                        [pid, hiddenPairs[i], hiddenPairs[i + 1], Math.floor(i / 2) + 10]
                    );
                    added++;
                }
            }

            problems++;
            console.log(`✅ ${title}`);
        }

        console.log(`\n🎉 Mega-batch Complete: ${problems} problems, ${added} tests`);

    } catch (err) {
        console.error('Error:', err);
    } finally {
        client.release();
        await pool.end();
    }
}

addMegaBatch();
