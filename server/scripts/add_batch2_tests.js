const pool = require('../db');

const batch2 = {
    "Missing Number": {
        sample: { input: "3\n3 0 1", output: "2" },
        hidden: [
            { input: "2\n0 1", output: "2" },
            { input: "1\n1", output: "0" },
            { input: "9\n9 6 4 2 3 5 7 0 1", output: "8" },
            { input: "1\n0", output: "1" },
            { input: "5\n0 1 2 3 4", output: "5" }
        ]
    },
    "Single Number": {
        sample: { input: "3\n2 2 1", output: "1" },
        hidden: [
            { input: "1\n1", output: "1" },
            { input: "5\n4 1 2 1 2", output: "4" },
            { input: "7\n1 2 3 4 5 1 2", output: "3" },
            { input: "3\n7 7 8", output: "8" },
            { input: "9\n1 2 3 4 5 3 2 1 5", output: "4" }
        ]
    },
    "Longest Substring Without Repeating Characters": {
        sample: { input: "abcabcbb", output: "3" },
        hidden: [
            { input: "bbbbb", output: "1" },
            { input: "pwwkew", output: "3" },
            { input: "", output: "0" },
            { input: "a", output: "1" },
            { input: "abcdefg", output: "7" }
        ]
    },
    "Longest Palindromic Substring": {
        sample: { input: "babad", output: "bab" },
        hidden: [
            { input: "cbbd", output: "bb" },
            { input: "a", output: "a" },
            { input: "ac", output: "a" },
            { input: "racecar", output: "racecar" },
            { input: "noon", output: "noon" }
        ]
    },
    "Group Anagrams": {
        sample: { input: "6\neat tea tan ate nat bat", output: "bat\neat tea ate nat tan" },
        hidden: [
            { input: "1\na", output: "a" },
            { input: "2\nabc cba", output: "abc cba" },
            { input: "3\ndog god cat", output: "cat\ndog god" },
            { input: "0", output: "" },
            { input: "4\nlisten silent hello world", output: "hello\nworld\nlisten silent" }
        ]
    },
    "Best Time to Buy and Sell Stock": {
        sample: { input: "6\n7 1 5 3 6 4", output: "5" },
        hidden: [
            { input: "5\n7 6 4 3 1", output: "0" },
            { input: "1\n1", output: "0" },
            { input: "2\n1 2", output: "1" },
            { input: "5\n2 4 1 7 3", output: "6" },
            { input: "7\n3 3 5 0 0 3 1  7", output: "4" }
        ]
    },
    "Longest Consecutive Sequence": {
        sample: { input: "6\n100 4 200 1 3 2", output: "4" },
        hidden: [
            { input: "10\n0 3 7 2 5 8 4 6 0 1", output: "9" },
            { input: "1\n1", output: "1" },
            { input: "0", output: "0" },
            { input: "4\n1 2 0 1", output: "3" },
            { input: "5\n9 1 -3 2 4", output: "2" }
        ]
    },
    "Rotate Array": {
        sample: { input: "7\n1 2 3 4 5 6 7\n3", output: "5 6 7 1 2 3 4" },
        hidden: [
            { input: "2\n-1 -100\n2", output: "-1 -100" },
            { input: "1\n1\n0", output: "1" },
            { input: "4\n1 2 3 4\n1", output: "4 1 2 3" },
            { input: "5\n1 2 3 4 5\n5", output: "1 2 3 4 5" },
            { input: "3\n1 2 3\n4", output: "3 1 2" }
        ]
    },
    "Subarray Sum Equals K": {
        sample: { input: "3\n1 1 1\n2", output: "2" },
        hidden: [
            { input: "4\n1 2 3 4\n3", output: "2" },
            { input: "1\n1\n1", output: "1" },
            { input: "5\n1 -1 0 1 -1\n0", output: "5" },
            { input: "2\n1 2\n3", output: "1" },
            { input: "6\n0 0 0 0 0 1\n0", output: "15" }
        ]
    },
    "Next Permutation": {
        sample: { input: "3\n1 2 3", output: "1 3 2" },
        hidden: [
            { input: "3\n3 2 1", output: "1 2 3" },
            { input: "2\n1 1", output: "1 1" },
            { input: "1\n1", output: "1" },
            { input: "4\n1 3 2 1", output: "2 1 1 3" },
            { input: "5\n1 5 8 4 7", output: "1 5 8 7 4" }
        ]
    },
    "Sort Colors (Dutch National Flag)": {
        sample: { input: "6\n2 0 2 1 1 0", output: "0 0 1 1 2 2" },
        hidden: [
            { input: "1\n0", output: "0" },
            { input: "3\n2 1 0", output: "0 1 2" },
            { input: "5\n1 1 1 1 1", output: "1 1 1 1 1" },
            { input: "4\n2 2 0 0", output: "0 0 2 2" },
            { input: "7\n0 1 2 0 1 2 1", output: "0 0 1 1 1 2 2" }
        ]
    },
    "Find All Duplicates in an Array": {
        sample: { input: "8\n4 3 2 7 8 2 3 1", output: "2 3" },
        hidden: [
            { input: "1\n1", output: "" },
            { input: "5\n1 1 2 3 4", output: "1" },
            { input: "6\n10 2 5 10 9 1", output: "" },
            { input: "4\n1 1 1 1", output: "1" },
            { input: "7\n2 3 4 5 2 3 4", output: "2 3 4" }
        ]
    },
    "Majority Element": {
        sample: { input: "3\n3 2 3", output: "3" },
        hidden: [
            { input: "7\n2 2 1 1 1 2 2", output: "2" },
            { input: "1\n1", output: "1" },
            { input: "5\n1 1 1 2 2", output: "1" },
            { input: "3\n6 5 5", output: "5" },
            { input: "9\n1 1 1 1 2 2 2 3 3", output: "1" }
        ]
    },
    "Kth Largest Element in an Array": {
        sample: { input: "6\n3 2 1 5 6 4\n2", output: "5" },
        hidden: [
            { input: "9\n3 2 3 1 2 4 5 5 6\n4", output: "4" },
            { input: "1\n1\n1", output: "1" },
            { input: "5\n5 4 3 2 1\n1", output: "5" },
            { input: "4\n1 1 1 1\n2", output: "1" },
            { input: "7\n7 6 5 4 3 2 1\n3", output: "5" }
        ]
    },
    "Top K Frequent Elements": {
        sample: { input: "6\n1 1 1 2 2 3\n2", output: "1 2" },
        hidden: [
            { input: "1\n1\n1", output: "1" },
            { input: "7\n4 1 -1 2 -1 2 3\n2", output: "-1 2" },
            { input: "5\n1 2 3 4 5\n1", output: "1" },
            { input: "4\n1 1 2 2\n2", output: "1 2" },
            { input: "8\n5 5 5 3 3 1 1 1\n2", output: "5 1" }
        ]
    }
};

async function addBatch2Tests() {
    const client = await pool.connect();
    try {
        console.log('Adding test cases to Batch 2 problems...\n');
        let problemsUpdated = 0;
        let testsAdded = 0;

        for (const [title, tests] of Object.entries(batch2)) {
            const problem = await client.query(
                'SELECT problem_id FROM problems WHERE title = $1',
                [title]
            );

            if (problem.rows.length === 0) {
                console.log(`⚠️  Problem not found: ${title}`);
                continue;
            }

            const problemId = problem.rows[0].problem_id;

            // Check if sample test already exists
            const existing = await client.query(
                'SELECT COUNT(*) as count FROM test_cases WHERE problem_id = $1 AND is_sample = true',
                [problemId]
            );

            if (existing.rows[0].count === '0') {
                await client.query(
                    `INSERT INTO test_cases (problem_id, input, expected_output, is_sample, test_case_order)
                     VALUES ($1, $2, $3, true, 1)`,
                    [problemId, tests.sample.input, tests.sample.output]
                );
                testsAdded++;
            }

            // Add hidden test cases
            for (let i = 0; i < tests.hidden.length; i++) {
                await client.query(
                    `INSERT INTO test_cases (problem_id, input, expected_output, is_sample, test_case_order)
                     VALUES ($1, $2, $3, false, $4)`,
                    [problemId, tests.hidden[i].input, tests.hidden[i].output, i + 2]
                );
                testsAdded++;
            }

            problemsUpdated++;
            console.log(`✅ ${title}: Added ${existing.rows[0].count === '0' ? '1 sample + ' : ''}${tests.hidden.length} hidden tests`);
        }

        console.log(`\n🎉 Batch 2 Complete!`);
        console.log(`   Problems updated: ${problemsUpdated}`);
        console.log(`   Total tests added: ${testsAdded}`);

    } catch (err) {
        console.error('Error:', err);
        throw err;
    } finally {
        client.release();
        await pool.end();
    }
}

addBatch2Tests();
