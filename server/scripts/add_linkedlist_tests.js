const pool = require('../db');

const linkedListTests = {
    "Reverse Linked List": {
        sample: { input: "1 2 3 4 5", output: "5 4 3 2 1" },
        hidden: [
            { input: "1 2", output: "2 1" },
            { input: "1", output: "1" },
            { input: "", output: "" },
            { input: "1 2 3", output: "3 2 1" },
            { input: "5 4 3 2 1", output: "1 2 3 4 5" }
        ]
    },
    "Merge Two Sorted Lists": {
        sample: { input: "1 2 4\n1 3 4", output: "1 1 2 3 4 4" },
        hidden: [
            { input: "\n", output: "" },
            { input: "1\n2", output: "1 2" },
            { input: "5\n1 2 3 4", output: "1 2 3 4 5" },
            { input: "1 3 5\n2 4 6", output: "1 2 3 4 5 6" },
            { input: "1 1 1\n2 2 2", output: "1 1 1 2 2 2" }
        ]
    },
    "Linked List Cycle": {
        sample: { input: "3 2 0 -4\n1", output: "true" },
        hidden: [
            { input: "1\n-1", output: "false" },
            { input: "1 2\n0", output: "true" },
            { input: "1\n0", output: "true" },
            { input: "1 2 3 4\n-1", output: "false" },
            { input: "1 2 3\n2", output: "true" }
        ]
    },
    "Palindrome Linked List": {
        sample: { input: "1 2 2 1", output: "true" },
        hidden: [
            { input: "1 2", output: "false" },
            { input: "1", output: "true" },
            { input: "1 2 3 2 1", output: "true" },
            { input: "1 2 3 4 5", output: "false" },
            { input: "1 1", output: "true" }
        ]
    },
    "Add Two Numbers": {
        sample: { input: "2 4 3\n5 6 4", output: "7 0 8" },
        hidden: [
            { input: "0\n0", output: "0" },
            { input: "9 9 9\n9 9 9 9", output: "8 9 9 0 1" },
            { input: "5\n5", output: "0 1" },
            { input: "1 8\n0", output: "1 8" },
            { input: "9 9\n1", output: "0 0 1" }
        ]
    },
    "Remove Nth Node From End of List": {
        sample: { input: "1 2 3 4 5\n2", output: "1 2 3 5" },
        hidden: [
            { input: "1\n1", output: "" },
            { input: "1 2\n1", output: "1" },
            { input: "1 2\n2", output: "2" },
            { input: "1 2 3 4\n4", output: "2 3 4" },
            { input: "1 2 3\n1", output: "1 2" }
        ]
    },
    "Reorder List": {
        sample: { input: "1 2 3 4", output: "1 4 2 3" },
        hidden: [
            { input: "1 2 3 4 5", output: "1 5 2 4 3" },
            { input: "1", output: "1" },
            { input: "1 2", output: "1 2" },
            { input: "1 2 3", output: "1 3 2" },
            { input: "1 2 3 4 5 6", output: "1 6 2 5 3 4" }
        ]
    },
    "Intersection of Two Linked Lists": {
        sample: { input: "4 1 8 4 5\n5 6 1 8 4 5\n8", output: "8" },
        hidden: [
            { input: "1 9 1 2 4\n3 2 4\n2", output: "2" },
            { input: "2 6 4\n1 5\n-1", output: "null" },
            { input: "1\n1\n1", output: "1" },
            { input: "1 2 3\n4 5 6\n-1", output: "null" },
            { input: "1 2\n1 2\n1", output: "1" }
        ]
    },
    "Merge k Sorted Lists": {
        sample: { input: "3\n1 4 5\n1 3 4\n2 6", output: "1 1 2 3 4 4 5 6" },
        hidden: [
            { input: "0", output: "" },
            { input: "1\n", output: "" },
            { input: "2\n1\n2", output: "1 2" },
            { input: "1\n1 2 3", output: "1 2 3" },
            { input: "4\n1\n2\n3\n4", output: "1 2 3 4" }
        ]
    },
    "Copy List with Random Pointer": {
        sample: { input: "7 1 -1\n13 2 0\n11 3 2\n10 4 1\n1 -1 -1", output: "7 1 -1\n13 2 0\n11 3 2\n10 4 1\n1 -1 -1" },
        hidden: [
            { input: "1 -1 -1", output: "1 -1 -1" },
            { input: "", output: "" },
            { input: "1 1 1\n2 -1 0", output: "1 1 1\n2 -1 0" },
            { input: "3 1 -1\n3 2 0\n3 -1 1", output: "3 1 -1\n3 2 0\n3 -1 1" },
            { input: "1 1 0\n2 -1 0", output: "1 1 0\n2 -1 0" }
        ]
    }
};

async function addLinkedListTests() {
    const client = await pool.connect();
    try {
        console.log('Adding Linked List test cases...\n');
        let problemsUpdated = 0;
        let testsAdded = 0;

        for (const [title, tests] of Object.entries(linkedListTests)) {
            const problem = await client.query(
                'SELECT problem_id FROM problems WHERE title = $1',
                [title]
            );

            if (problem.rows.length === 0) {
                console.log(`⚠️  ${title}`);
                continue;
            }

            const problemId = problem.rows[0].problem_id;

            // Check existing
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

            for (let i = 0; i < tests.hidden.length; i++) {
                await client.query(
                    `INSERT INTO test_cases (problem_id, input, expected_output, is_sample, test_case_order)
                     VALUES ($1, $2, $3, false, $4)`,
                    [problemId, tests.hidden[i].input, tests.hidden[i].output, i + 10]
                );
                testsAdded++;
            }

            problemsUpdated++;
            console.log(`✅ ${title}`);
        }

        console.log(`\n🎉 Linked List Complete: ${problemsUpdated} problems, ${testsAdded} tests`);

    } catch (err) {
        console.error('Error:', err);
    } finally {
        client.release();
        await pool.end();
    }
}

addLinkedListTests();
