const pool = require('../db');

// Complete sample test cases for all missing problems
const sampleTestCases = {
    "Rotate Array": {
        input: "7\n1 2 3 4 5 6 7\n3",
        output: "5 6 7 1 2 3 4"
    },
    "Find All Duplicates in an Array": {
        input: "8\n4 3 2 7 8 2 3 1",
        output: "2 3"
    },
    "Next Permutation": {
        input: "3\n1 2 3",
        output: "1 3 2"
    },
    "Sort Colors (Dutch National Flag)": {
        input: "6\n2 0 2 1 1 0",
        output: "0 0 1 1 2 2"
    },
    "Majority Element": {
        input: "7\n2 2 1 1 1 2 2",
        output: "2"
    },
    "Subarray Sum Equals K": {
        input: "3\n1 1 1\n2",
        output: "2"
    },
    "Reverse Words in a String": {
        input: "the sky is blue",
        output: "blue is sky the"
    },
    "Implement strStr()": {
        input: "sadbutsad\nsad",
        output: "0"
    },
    "String to Integer (atoi)": {
        input: "42",
        output: "42"
    },
    "Minimum Window Substring": {
        input: "ADOBECODEBANC\nABC",
        output: "BANC"
    },
    "Longest Common Prefix": {
        input: "3\nflower flow flight",
        output: "fl"
    },
    "Palindrome Linked List": {
        input: "4\n1 2 2 1",
        output: "true"
    },
    "Reorder List": {
        input: "5\n1 2 3 4 5",
        output: "1 5 2 4 3"
    },
    "Intersection of Two Linked Lists": {
        input: "5\n4 1 8 4 5\n3\n5 6 1\n2\n3",
        output: "8"
    },
    "Lowest Common Ancestor of a Binary Tree": {
        input: "9\n3 5 1 6 2 0 8 -1 -1 7 4\n5\n1",
        output: "3"
    },
    "Binary Tree Right Side View": {
        input: "5\n1 2 3 -1 5 -1 4",
        output: "1 3 4"
    },
    "Serialize and Deserialize Binary Tree": {
        input: "5\n1 2 3 -1 -1 4 5",
        output: "1 2 3 -1 -1 4 5"
    },
    "Kth Smallest Element in a BST": {
        input: "9\n3 1 4 -1 2 -1 -1 -1 -1\n1",
        output: "1"
    },
    "Clone Graph": {
        input: "4\n1 2\n2 1 3\n3 2 4\n4 3",
        output: "1 2\n2 1 3\n3 2 4\n4 3"
    },
    "Pacific Atlantic Water Flow": {
        input: "5 5\n1 2 2 3 5\n3 2 3 4 4\n2 4 5 3 1\n6 7 1 4 5\n5 1 1 2 4",
        output: "0 4\n1 3\n1 4\n2 2\n3 0\n3 1\n4 0"
    },
    "Word Ladder": {
        input: "hit\ncog\n6\nhot dot dog lot log cog",
        output: "5"
    },
    "Word Break": {
        input: "leetcode\n2\nleet code",
        output: "true"
    },
    "Partition Equal Subset Sum": {
        input: "4\n1 5 11 5",
        output: "true"
    },
    "Edit Distance": {
        input: "horse\nros",
        output: "3"
    },
    "Decode Ways": {
        input: "12",
        output: "2"
    },
    "Maximum Product Subarray": {
        input: "4\n2 3 -2 4",
        output: "6"
    },
    "Min Stack": {
        input: "MinStack\npush -2\npush 0\npush -3\ngetMin\npop\ntop\ngetMin",
        output: "-3\n0\n-2"
    },
    "Evaluate Reverse Polish Notation": {
        input: "5\n2 1 + 3 *",
        output: "9"
    },
    "Find Minimum in Rotated Sorted Array": {
        input: "5\n3 4 5 1 2",
        output: "1"
    },
    "Search a 2D Matrix II": {
        input: "5 5\n1 4 7 11 15\n2 5 8 12 19\n3 6 9 16 22\n10 13 14 17 24\n18 21 23 26 30\n5",
        output: "true"
    },
    "Find Median from Data Stream": {
        input: "MedianFinder\naddNum 1\naddNum 2\nfindMedian\naddNum 3\nfindMedian",
        output: "1.5\n2"
    },
    "Merge k Sorted Lists": {
        input: "3\n3\n1 4 5\n3\n1 3 4\n2\n2 6",
        output: "1 1 2 3 4 4 5 6"
    },
    "Letter Combinations of a Phone Number": {
        input: "23",
        output: "ad ae af bd be bf cd ce cf"
    },
    "Generate Parentheses": {
        input: "3",
        output: "((())), (()()), (())(), ()(()), ()()()"
    }
};

async function addAllSampleTestCases() {
    const client = await pool.connect();
    try {
        console.log('Adding sample test cases to all problems...\n');

        let updated = 0;
        let skipped = 0;

        for (const [title, testCase] of Object.entries(sampleTestCases)) {
            // Check if problem exists
            const problemRes = await client.query(
                'SELECT problem_id, test_case_input FROM problems WHERE title = $1',
                [title]
            );

            if (problemRes.rows.length === 0) {
                console.log(`❌ Problem not found: ${title}`);
                skipped++;
                continue;
            }

            const problemId = problemRes.rows[0].problem_id;
            const currentInput = problemRes.rows[0].test_case_input;

            // Only update if currently NULL or empty
            if (!currentInput || currentInput.trim() === '') {
                await client.query(
                    `UPDATE problems 
                     SET test_case_input = $1, test_case_output = $2 
                     WHERE problem_id = $3`,
                    [testCase.input, testCase.output, problemId]
                );

                // Also ensure it's in test_cases table
                await client.query(
                    'DELETE FROM test_cases WHERE problem_id = $1 AND is_sample = true',
                    [problemId]
                );

                await client.query(
                    `INSERT INTO test_cases (problem_id, input, expected_output, is_sample, test_case_order)
                     VALUES ($1, $2, $3, true, 1)`,
                    [problemId, testCase.input, testCase.output]
                );

                console.log(`✅ Updated: ${title}`);
                updated++;
            } else {
                console.log(`⏭️  Skipped (already has data): ${title}`);
                skipped++;
            }
        }

        console.log(`\n✅ Complete! Updated: ${updated}, Skipped: ${skipped}`);

    } catch (err) {
        console.error('Error:', err);
    } finally {
        client.release();
        pool.end();
    }
}

addAllSampleTestCases();
