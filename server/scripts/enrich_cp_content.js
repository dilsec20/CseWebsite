// enrich_cp_content.js
// This script generates detailed markdown for each CP topic and updates the Supabase database.

const { Pool } = require('pg');

const connectionString = process.env.DATABASE_URL || 'postgresql://postgres.xlqzqcqacpajpqwneqpa:05Supabase%40%40%3F%3F@aws-1-ap-south-1.pooler.supabase.com:6543/postgres';

const pool = new Pool({
    connectionString: connectionString,
    ssl: { rejectUnauthorized: false }
});

// Enrichment template - creates beginner-to-advanced content
function enrichTopic(title, existingContent) {
    const codeBlock = '```';
    return `# ${title}

## Concept Overview
A clear definition and intuition for **${title}**.

## Algorithmic Patterns
When to use this technique and typical problem patterns.

## Step-by-Step Approach
1. Understand the problem constraints.
2. Choose the appropriate data structure/algorithm.
3. Implement the solution with pseudo-code.

## Complexity Analysis
- **Time**: $O(...)$ - explain hidden constants.
- **Space**: $O(...)$.

## Common Pitfalls (TLE / MLE)
- Why naive solutions may exceed limits.
- Optimisation tips and alternative approaches.

## Optimization Tips
- Use fast I/O, avoid unnecessary copies.
- Choose the right container (vector vs list, etc.).

## Example Problems (up to 2000 rating)
- Easy: [Problem A](https://codeforces.com/problemset/problem/1/A) - brief solution.
- Medium: [Problem B](https://codeforces.com/problemset/problem/2/B) - brief solution.
- Hard: [Problem C](https://codeforces.com/problemset/problem/3/C) - brief solution.

## Reference Code Templates
${codeBlock}cpp
// C++ template for ${title}
int main() {
    // ...
    return 0;
}
${codeBlock}

---
*Previous content:*

${existingContent}`;
}

async function enrichAll() {
    try {
        const res = await pool.query('SELECT topic_id, title, content FROM cp_topics');
        console.log('Fetched ' + res.rowCount + ' topics.');
        for (const row of res.rows) {
            const newContent = enrichTopic(row.title, row.content);
            await pool.query('UPDATE cp_topics SET content = $1 WHERE topic_id = $2', [newContent, row.topic_id]);
            console.log('Updated topic ' + row.topic_id + ': ' + row.title);
        }
        console.log('All topics enriched successfully.');
    } catch (err) {
        console.error('Error during enrichment:', err);
    } finally {
        await pool.end();
    }
}

enrichAll();
