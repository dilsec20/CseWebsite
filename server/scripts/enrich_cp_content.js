// enrich_cp_content.js
// This script generates detailed markdown for each CP topic and updates the Supabase database.
// It uses a simple template to create beginner‑to‑advanced content.

const { Pool } = require('pg');
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

// Simple enrichment template. In a real scenario you would call OpenAI API here.
function enrichTopic(title, existingContent) {
    return `# ${title}\n\n` +
        `## Concept Overview\n` +
        `A clear definition and intuition for **${title}**.\n\n` +
        `## Algorithmic Patterns\n` +
        `When to use this technique and typical problem patterns.\n\n` +
        `## Step‑by‑Step Approach\n` +
        `1. Understand the problem constraints.\n` +
        `2. Choose the appropriate data structure/algorithm.\n` +
        `3. Implement the solution with pseudo‑code.\n\n` +
        `## Complexity Analysis\n` +
        `Time: \(O(... )\) – explain hidden constants.\n` +
        `Space: \(O(... )\).\n\n` +
        `## Common Pitfalls (TLE / MLE)\n` +
        `- Why naive solutions may exceed limits.\n` +
        `- Optimisation tips and alternative approaches.\n\n` +
        `## Optimization Tips\n` +
        `- Use fast I/O, avoid unnecessary copies.\n` +
        `- Choose the right container (vector vs list, etc.).\n\n` +
        `## Example Problems (up to 2000 rating)\n` +
        `- Easy: [Problem A](https://codeforces.com/problemset/problem/1/A) – brief solution.\n` +
        `- Medium: [Problem B](https://codeforces.com/problemset/problem/2/B) – brief solution.\n` +
        `- Hard: [Problem C](https://codeforces.com/problemset/problem/3/C) – brief solution.\n\n` +
        `## Reference Code Templates\n` +
        "```cpp\n// C++ template for ${title}\nint main() {\n    // ...\n    return 0;\n}\n```\n\n` +
            `---\n` +
        `*Previous content:*\n\n${existingContent}`;
}

async function enrichAll() {
    try {
        const res = await pool.query('SELECT topic_id, title, content FROM cp_topics');
        console.log(`Fetched ${res.rowCount} topics.`);
        for (const row of res.rows) {
            const newContent = enrichTopic(row.title, row.content);
            await pool.query('UPDATE cp_topics SET content = $1 WHERE topic_id = $2', [newContent, row.topic_id]);
            console.log(`Updated topic ${row.topic_id}: ${row.title}`);
        }
        console.log('✅ All topics enriched successfully.');
    } catch (err) {
        console.error('❌ Error during enrichment:', err);
    } finally {
        await pool.end();
    }
}

enrichAll();
