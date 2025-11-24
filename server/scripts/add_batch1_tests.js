const pool = require('../db');

// First batch: Add sample + hidden tests to problems that have NO tests at all
const testCases = {
    // Format: problem_title: { sample: {input, output}, hidden: [{input, output}, ...] }
    "Two Sum": {
        sample: { input: "4\n2 7 11 15\n9", output: "0 1" },
        hidden: [
            { input: "2\n3 3\n6", output: "0 1" },
            { input: "3\n3 2 4\n6", output: "1 2" },
            { input: "1\n5\n10", output: "-1 -1" },
            { input: "5\n1 2 3 4 5\n9", output: "3 4" },
            { input: "6\n-1 -2 -3 -4 -5 -6\n-8", output: "2 4" }
        ]
    },
    "Contains Duplicate": {
        sample: { input: "4\n1 2 3 1", output: "true" },
        hidden: [
            { input: "4\n1 2 3 4", output: "false" },
            { input: "1\n1", output: "false" },
            { input: "10\n1 1 1 3 3 4 3 2 4 2", output: "true" },
            { input: "0", output: "false" },
            { input: "5\n1 2 3 4 5", output: "false" }
        ]
    },
    "Product of Array Except Self": {
        sample: { input: "4\n1 2 3 4", output: "24 12 8 6" },
        hidden: [
            { input: "5\n-1 1 0 -3 3", output: "0 0 9 0 0" },
            { input: "2\n1 2", output: "2 1" },
            { input: "3\n2 3 4", output: "12 8 6" },
            { input: "1\n5", output: "1" },
            { input: "4\n0 0 0 1", output: "0 0 0 0" }
        ]
    },
    "Maximum Subarray (Kadane's Algorithm)": {
        sample: { input: "-2 1 -3 4 -1 2 1 -5 4", output: "6" },
        hidden: [
            { input: "1", output: "1" },
            { input: "-1", output: "-1" },
            { input: "5 4 -1 7 8", output: "23" },
            { input: "-2 -1", output: "-1" },
            { input: "1 2 3 4 5", output: "15" }
        ]
    },
    "Container With Most Water": {
        sample: { input: "9\n1 8 6 2 5 4 8 3 7", output: "49" },
        hidden: [
            { input: "2\n1 1", output: "1" },
            { input: "2\n4 3", output: "3" },
            { input: "6\n1 2 4 3 1 5", output: "10" },
            { input: "3\n3 1 3", output: "6" },
            { input: "10\n1 2 3 4 5 6 7 8 9 10", output: "25" }
        ]
    },
    "3Sum": {
        sample: { input: "6\n-1 0 1 2 -1 -4", output: "-1 -1 2\n-1 0 1" },
        hidden: [
            { input: "0", output: "" },
            { input: "1\n0", output: "" },
            { input: "3\n0 0 0", output: "0 0 0" },
            { input: "4\n-2 0 1 1", output: "-2 1 1" },
            { input: "5\n1 2 -2 -1 0", output: "-2 0 2\n-1 0 1" }
        ]
    },
    "Trapping Rain Water": {
        sample: { input: "12\n0 1 0 2 1 0 1 3 2 1 2 1", output: "6" },
        hidden: [
            { input: "6\n4 2 0 3 2 5", output: "9" },
            { input: "1\n5", output: "0" },
            { input: "3\n1 2 1", output: "0" },
            { input: "5\n3 0 2 0 4", output: "7" },
            { input: "4\n2 1 2 1", output: "1" }
        ]
    },
    "Merge Intervals": {
        sample: { input: "4\n1 3\n2 6\n8 10\n15 18", output: "1 6\n8 10\n15 18" },
        hidden: [
            { input: "2\n1 4\n4 5", output: "1 5" },
            { input: "1\n1 4", output: "1 4" },
            { input: "2\n1 4\n5 6", output: "1 4\n5 6" },
            { input: "3\n1 10\n2 6\n3 5", output: "1 10" },
            { input: "5\n1 2\n3 4\n5 6\n7 8\n9 10", output: "1 2\n3 4\n5 6\n7 8\n9 10" }
        ]
    },
    "Valid Palindrome": {
        sample: { input: "A man, a plan, a canal: Panama", output: "true" },
        hidden: [
            { input: "race a car", output: "false" },
            { input: " ", output: "true" },
            { input: "a", output: "true" },
            { input: "ab", output: "false" },
            { input: "racecar", output: "true" }
        ]
    },
    "Valid Anagram": {
        sample: { input: "anagram\nnagaram", output: "true" },
        hidden: [
            { input: "rat\ncar", output: "false" },
            { input: "a\na", output: "true" },
            { input: "ab\nba", output: "true" },
            { input: "abc\ncba", output: "true" },
            { input: "hello\nworld", output: "false" }
        ]
    }
};

async function addBatch1Tests() {
    const client = await pool.connect();
    try {
        console.log('Adding test cases to Batch 1 problems...\n');
        let problemsUpdated = 0;
        let testsAdded = 0;

        for (const [title, tests] of Object.entries(testCases)) {
            // Find problem by title
            const problem = await client.query(
                'SELECT problem_id FROM problems WHERE title = $1',
                [title]
            );

            if (problem.rows.length === 0) {
                console.log(`⚠️  Problem not found: ${title}`);
                continue;
            }

            const problemId = problem.rows[0].problem_id;

            // Add sample test case
            await client.query(
                `INSERT INTO test_cases (problem_id, input, expected_output, is_sample, test_case_order)
                 VALUES ($1, $2, $3, true, 1)`,
                [problemId, tests.sample.input, tests.sample.output]
            );
            testsAdded++;

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
            console.log(`✅ ${title}: Added 1 sample + ${tests.hidden.length} hidden tests`);
        }

        console.log(`\n🎉 Batch 1 Complete!`);
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

addBatch1Tests();
