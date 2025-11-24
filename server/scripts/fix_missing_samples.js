const pool = require('../db');

async function fixMissingSamples() {
    const client = await pool.connect();
    try {
        console.log('🔧 Fixing Missing Sample Test Cases...\n');

        // List of problems and their sample tests
        const samples = [
            { title: 'Subsets', input: '3\n1 2 3', output: '[] [1] [2] [1 2] [3] [1 3] [2 3] [1 2 3]' },
            { title: 'Find Minimum in Rotated Sorted Array', input: '5\n3 4 5 1 2', output: '1' },
            { title: 'Find Median from Data Stream', input: '3\n1 2 3', output: '2.0' }, // Simplified input for this problem type
            { title: 'Min Stack', input: 'push 2\npush 0\npush 3\ngetMin\npop\ntop\ngetMin', output: '0 0 2' }, // Custom format for design problems
            { title: 'Sort Characters By Frequency', input: 'tree', output: 'eert' },
            { title: 'N-Queens', input: '4', output: '.Q..\n...Q\nQ...\n..Q.\n\n..Q.\nQ...\n...Q\n.Q..' },
            { title: '0/1 Knapsack Problem', input: '3\n60 100 120\n10 20 30\n50', output: '220' },
            { title: 'Rotting Oranges', input: '3 3\n2 1 1\n1 1 0\n0 1 1', output: '4' },
            { title: 'Evaluate Reverse Polish Notation', input: '5\n2 1 + 3 *', output: '9' },
            { title: 'Candy', input: '3\n1 0 2', output: '5' },
            { title: 'Palindrome Linked List', input: '4\n1 2 2 1', output: 'true' },
            { title: 'Partition Labels', input: 'ababcbacadefegdehijhklij', output: '9 7 8' },
            { title: 'Word Search', input: '3 4\nA B C E\nS F C S\nA D E E\nABCCED', output: 'true' },
            { title: 'Split Array Largest Sum', input: '5\n7 2 5 10 8\n2', output: '18' },
            { title: 'Sliding Window Maximum', input: '8\n1 3 -1 -3 5 3 6 7\n3', output: '3 3 5 5 6 7' },
            { title: 'Word Ladder', input: 'hit\ncog\nhot dot dog lot log cog', output: '5' },
            { title: 'Largest Rectangle in Histogram', input: '6\n2 1 5 6 2 3', output: '10' },
            { title: 'Task Scheduler', input: '6\nA A A B B B\n2', output: '8' },
            { title: 'Permutations', input: '3\n1 2 3', output: '1 2 3\n1 3 2\n2 1 3\n2 3 1\n3 1 2\n3 2 1' },
            { title: 'Gas Station', input: '5\n1 2 3 4 5\n3 4 5 1 2', output: '3' },
            { title: 'Combination Sum', input: '4\n2 3 6 7\n7', output: '2 2 3\n7' },
            { title: 'Binary Tree Level Order Traversal', input: '3 9 20 null null 15 7', output: '3\n9 20\n15 7' },
            { title: 'Ransom Note', input: 'a\nb', output: 'false' },
            { title: 'Median of Two Sorted Arrays', input: '2\n1 3\n1\n2', output: '2.00000' }
        ];

        let fixedCount = 0;

        for (const sample of samples) {
            // Find problem ID
            const prob = await client.query("SELECT problem_id FROM problems WHERE title = $1", [sample.title]);

            if (prob.rows.length > 0) {
                for (const p of prob.rows) {
                    const problemId = p.problem_id;

                    // Check if sample already exists
                    const exists = await client.query(
                        "SELECT 1 FROM test_cases WHERE problem_id = $1 AND is_sample = true",
                        [problemId]
                    );

                    if (exists.rows.length === 0) {
                        await client.query(
                            `INSERT INTO test_cases (problem_id, input, expected_output, is_sample, test_case_order)
                             VALUES ($1, $2, $3, true, 1)`,
                            [problemId, sample.input, sample.output]
                        );
                        console.log(`✅ Added sample for: ${sample.title}`);
                        fixedCount++;
                    }
                }
            } else {
                console.log(`⚠️  Problem not found: ${sample.title}`);
            }
        }

        console.log(`\nTotal sample test cases added: ${fixedCount}`);

    } catch (err) {
        console.error('Error:', err);
    } finally {
        client.release();
        await pool.end();
    }
}

fixMissingSamples();
