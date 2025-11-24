const pool = require('../db');

async function fixFinalSamples() {
    const client = await pool.connect();
    try {
        console.log('🚀 Fixing Final 5 Missing Samples...\n');

        const fixes = [
            {
                id: 1340,
                title: 'Serialize and Deserialize Binary Tree',
                input: '1 2 3 null null 4 5',
                output: '1 2 3 null null 4 5'
            },
            {
                id: 1407,
                title: 'Construct from Preorder Inorder',
                input: '5\n3 9 20 15 7\n9 3 15 20 7',
                output: '3 9 20 null null 15 7'
            },
            {
                id: 1408,
                title: 'Serialize Deserialize Tree',
                input: '1 2 3 null null 4 5',
                output: '1 2 3 null null 4 5'
            },
            {
                id: 1440,
                title: 'Flatten Tree to Linked List',
                input: '1 2 5 3 4 null 6',
                output: '1 null 2 null 3 null 4 null 5 null 6'
            },
            {
                id: 1501,
                title: 'Convert Sorted List to BST',
                input: '5\n-10 -3 0 5 9',
                output: '0 -3 9 -10 null 5'
            }
        ];

        for (const fix of fixes) {
            // Delete existing sample if any (to be safe)
            await client.query(
                "DELETE FROM test_cases WHERE problem_id = $1 AND is_sample = true",
                [fix.id]
            );

            // Insert new sample
            await client.query(
                "INSERT INTO test_cases (problem_id, input, expected_output, is_sample) VALUES ($1, $2, $3, true)",
                [fix.id, fix.input, fix.output]
            );

            console.log(`✅ [${fix.id}] ${fix.title} - Sample Added`);
        }

        console.log('\n✨ All missing samples fixed!\n');

    } catch (err) {
        console.error('Error:', err);
    } finally {
        client.release();
        await pool.end();
    }
}

fixFinalSamples();
