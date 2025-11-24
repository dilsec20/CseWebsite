const pool = require('../db');

async function enhanceAllTopics() {
    const client = await pool.connect();
    try {
        console.log('🚀 Enhancing ALL Topics with Complete Structure...\n');

        const topics = await client.query(`
            SELECT t.topic_id, t.title, t.content, t.problem_id, m.title as module_title
            FROM dsa_topics t
            JOIN dsa_modules m ON t.module_id = m.module_id
            ORDER BY t.topic_id
        `);

        const getProbId = async (titlePart) => {
            const res = await client.query("SELECT problem_id FROM problems WHERE title ILIKE $1 LIMIT 1", [`%${titlePart}%`]);
            return res.rows[0]?.problem_id || null;
        };

        let enhancedCount = 0;

        for (const topic of topics.rows) {
            let content = topic.content;
            let modified = false;

            if (!content.includes('## Tips') && !content.includes('## Common Mistakes')) {
                const tipsSection = generateTips(topic.title);
                if (tipsSection) {
                    content += `\n\n${tipsSection}`;
                    modified = true;
                }
            }

            if (!content.includes('## Related Problems')) {
                const problemsSection = await generateRelatedProblems(topic.title, topic.problem_id, getProbId);
                if (problemsSection) {
                    content += `\n\n${problemsSection}`;
                    modified = true;
                }
            }

            if (modified) {
                await client.query(
                    "UPDATE dsa_topics SET content = $1 WHERE topic_id = $2",
                    [content, topic.topic_id]
                );
                enhancedCount++;
                console.log(`✅ Enhanced: ${topic.title}`);
            }
        }

        console.log(`\n🎉 Enhancement Complete!`);
        console.log(`   Topics Enhanced: ${enhancedCount}/${topics.rows.length}`);

    } catch (err) {
        console.error('Error:', err);
    } finally {
        client.release();
        await pool.end();
    }
}

function generateTips(topicTitle) {
    const tipsMap = {
        'Introduction to Programming': `## Tips & Tricks
- Start with simple programs and gradually increase complexity
- Always add comments to explain your logic
- Practice debugging step-by-step using print statements
- Learn keyboard shortcuts for your IDE`,

        'Variables & Data Types': `## Common Mistakes
- Using int when result exceeds 2×10^9 → Use long long
- Forgetting to initialize variables → Garbage values!
- Integer division: 5/2 = 2 (not 2.5) → Use double for decimals
- Overflow: int a = INT_MAX + 1 → Results in negative number`,

        'Loops & Conditionals': `## Tips & Tricks
- Use for loops when you know iteration count
- Use while loops for condition-based termination
- Avoid infinite loops: Always ensure loop variable changes
- Break complex conditions into separate if statements for readability`,

        'Functions in C++': `## Tips & Tricks
- Keep functions small and focused (single responsibility)
- Use descriptive function names (calculateSum not calc)
- Pass large objects by reference to avoid copying
- Use const for parameters you don't want to modify`,

        'Big O Notation Fundamentals': `## Tips & Tricks
- Drop constants: O(2n) → O(n)
- Drop lower terms: O(n² + n) → O(n²)
- Nested loops often indicate O(n²) or worse
- Binary search/divide patterns usually O(log n)`,

        'Space Complexity': `## Tips & Tricks
- Creating new arrays = O(n) space
- Recursion depth = Space complexity
- In-place algorithms = O(1) space advantage
- Hash maps trade space for time`,
    };

    return tipsMap[topicTitle] || `## Tips & Tricks
- Practice this concept with multiple problems
- Understand the why, not just the how
- Draw diagrams to visualize the concept
- Start with simple examples before complex ones`;
}

async function generateRelatedProblems(topicTitle, existingProbId, getProbId) {
    if (topicTitle === 'STL Containers') {
        const twoSumId = await getProbId('Two Sum');
        return `## Related Problems
- [Two Sum](/problems/${twoSumId}) - Use unordered_map
- Practice using different containers for different problem types`;
    }

    if (topicTitle === 'STL Algorithms') {
        const binarySearchId = await getProbId('Binary Search');
        return `## Related Problems
- [Binary Search](/problems/${binarySearchId}) - Use built-in binary_search
- Practice sorting and searching problems`;
    }

    if (existingProbId) {
        return `## Related Problems
- Practice this concept by solving the linked problem above`;
    }

    return null;
}

enhanceAllTopics();
