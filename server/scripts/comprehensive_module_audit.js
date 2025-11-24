const pool = require('../db');

async function comprehensiveAudit() {
    const client = await pool.connect();
    try {
        console.log('🔍 COMPREHENSIVE DSA CURRICULUM AUDIT\n');
        console.log('='.repeat(70));

        const modules = await client.query(`
            SELECT m.module_id, m.title, m.order_index
            FROM dsa_modules m
            ORDER BY m.order_index
        `);

        // Expected topics for each module
        const expectedTopics = {
            '1. Introduction & C++ Basics': [
                'Introduction to Programming',
                'Variables & Data Types',
                'Loops & Conditionals',
                'Functions',
                'STL Containers',
                'STL Algorithms',
                'Iterators',
                'Input/Output Techniques'  // MISSING?
            ],
            '2. Time & Space Complexity': [
                'Big O Notation',
                'Space Complexity',
                'Amortized Analysis'  // MISSING?
            ],
            '3. Arrays & Vectors': [
                'Introduction to Arrays',
                'Vectors',
                '2D Arrays',  // MISSING?
                'Matrix Operations'  // MISSING?
            ],
            '4. Common Array Techniques': [
                'Two Pointers',
                'Sliding Window',
                'Prefix Sum',  // MISSING?
                'Kadane\'s Algorithm'
            ],
            '5. Strings': [
                'Introduction to Strings',
                'String Manipulation',
                'Anagram and Substring',
                'KMP Algorithm',
                'Rabin-Karp',  // MISSING?
                'Trie'  // MISSING?
            ],
            '6. Searching & Sorting': [
                'Binary Search',
                'Sorting Algorithms',
                'Lower/Upper Bound',  // MISSING?
                'Counting Sort',  // MISSING?
                'Quick Select'  // MISSING?
            ],
            '7. Recursion & Backtracking': [
                'Understanding Recursion',
                'Backtracking Framework',
                'Subset Generation',  // MISSING?
                'Combination Sum'  // MISSING?
            ],
            '8. Linked Lists': [
                'Introduction to Linked Lists',
                'Reversing a Linked List',
                'Fast & Slow Pointers',  // MISSING?
                'Merge Two Lists'  // MISSING?
            ],
            '9. Stacks & Queues': [
                'Stack Fundamentals',
                'Queue Fundamentals',
                'Monotonic Stack',  // MISSING?
                'Next Greater Element'  // MISSING?
            ],
            '10. Binary Trees & BST': [
                'Tree Fundamentals',
                'Binary Search Trees',
                'Level Order Traversal',
                'Lowest Common Ancestor',  // MISSING?
                'Serialize/Deserialize'  // MISSING?
            ],
            '11. Heaps & Priority Queues': [
                'Heap Fundamentals',
                'Top K Elements',  // MISSING?
                'Merge K Sorted Lists'  // MISSING?
            ],
            '12. Graphs': [
                'Graph Representation',
                'BFS and DFS',
                'Dijkstra\'s Algorithm',
                'Minimum Spanning Tree',
                'Topological Sort',
                'DSU',
                'Cycle Detection',  // MISSING?
                'Strongly Connected Components'  // MISSING?
            ],
            '13. Dynamic Programming': [
                'Introduction to DP',
                'Classic DP Problems',
                'Knapsack Problems',  // MISSING?
                'Longest Common Subsequence',  // MISSING?
                'Edit Distance',  // MISSING?
                'Matrix Chain Multiplication'  // MISSING?
            ],
            '14. Bit Manipulation': [
                'Bit Manipulation Fundamentals',
                'Bit Masking',
                'Character & Number Conversion'
            ],
            '15. Number Theory & Math': [
                'GCD & LCM',
                'Prime Numbers',
                'Modular Arithmetic',
                'Fast Exponentiation',  // MISSING?
                'Combinatorics'  // MISSING?
            ]
        };

        let totalMissing = 0;
        const missingByModule = [];

        for (const mod of modules.rows) {
            const topics = await client.query(
                "SELECT title FROM dsa_topics WHERE module_id = $1 ORDER BY order_index",
                [mod.module_id]
            );

            const existingTopics = topics.rows.map(t => t.title);
            const expected = expectedTopics[mod.title] || [];

            console.log(`\n${mod.title}`);
            console.log(`  Current Topics (${existingTopics.length}):`);
            existingTopics.forEach(t => console.log(`    ✓ ${t}`));

            // Find missing topics
            const missing = expected.filter(exp =>
                !existingTopics.some(existing =>
                    existing.toLowerCase().includes(exp.toLowerCase()) ||
                    exp.toLowerCase().includes(existing.toLowerCase())
                )
            );

            if (missing.length > 0) {
                console.log(`  Missing Topics (${missing.length}):`);
                missing.forEach(m => console.log(`    ✗ ${m}`));
                totalMissing += missing.length;
                missingByModule.push({ module: mod.title, missing });
            }
        }

        console.log('\n' + '='.repeat(70));
        console.log(`\n📊 SUMMARY:`);
        console.log(`   Total Modules: ${modules.rows.length}`);
        console.log(`   Modules with Missing Topics: ${missingByModule.length}`);
        console.log(`   Total Missing Topics: ${totalMissing}\n`);

        if (missingByModule.length > 0) {
            console.log('⚠️  CRITICAL MISSING TOPICS:\n');
            missingByModule.forEach(m => {
                console.log(`${m.module}:`);
                m.missing.forEach(t => console.log(`  - ${t}`));
                console.log('');
            });
        }

    } catch (err) {
        console.error('Error:', err);
    } finally {
        client.release();
        await pool.end();
    }
}

comprehensiveAudit();
