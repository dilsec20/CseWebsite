const pool = require('../db');

async function auditContentStructure() {
    const client = await pool.connect();
    try {
        console.log('🔍 Auditing DSA Content Structure...\n');

        const topics = await client.query(`
            SELECT t.topic_id, t.title, m.title as module_title, t.content, t.problem_id
            FROM dsa_topics t
            JOIN dsa_modules m ON t.module_id = m.module_id
            ORDER BY m.order_index, t.order_index
        `);

        const criteria = {
            'Concept Explanation': ['# ', 'What is', 'Why'],
            'From Scratch': ['Declaration', 'Initialization', 'Syntax', 'Structure'],
            'Key Operations': ['```cpp', 'Function'],
            'Tips & Tricks': ['Tips', 'Common Mistakes', 'Edge', 'Pattern'],
            'Problem-Solving': ['Algorithm', 'Steps', 'Approach', 'How to', 'Template'],
            'Code Templates': ['```cpp'],
            'Related Problems': ['Related Problems', '[', '](/problems/']
        };

        let missingCount = 0;
        const gaps = [];

        topics.rows.forEach(topic => {
            const missing = [];

            if (!topic.content.includes('# ')) missing.push('No Header');
            if (!topic.content.includes('```cpp')) missing.push('No Code Examples');
            if (!topic.content.includes('Tips') && !topic.content.includes('Common')) missing.push('No Tips/Tricks');
            if (!topic.content.includes('Related Problems') && !topic.content.includes('](/problems/')) {
                missing.push('No Related Problems Links');
            }

            if (missing.length > 0) {
                missingCount++;
                gaps.push({
                    id: topic.topic_id,
                    module: topic.module_title,
                    title: topic.title,
                    missing: missing
                });
            }
        });

        console.log(`📊 Audit Results:`);
        console.log(`   Total Topics: ${topics.rows.length}`);
        console.log(`   Topics with Gaps: ${missingCount}`);
        console.log(`   Complete Topics: ${topics.rows.length - missingCount}\n`);

        if (gaps.length > 0) {
            console.log('⚠️  Topics Needing Enhancement:\n');
            gaps.forEach(g => {
                console.log(`   [${g.id}] ${g.title}`);
                console.log(`       Module: ${g.module}`);
                console.log(`       Missing: ${g.missing.join(', ')}\n`);
            });
        }

    } catch (err) {
        console.error('Error:', err);
    } finally {
        client.release();
        await pool.end();
    }
}

auditContentStructure();
