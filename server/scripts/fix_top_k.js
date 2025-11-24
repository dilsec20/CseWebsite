const pool = require('../db');

async function fixTopK() {
    const client = await pool.connect();
    try {
        console.log('🔧 Fixing Top K Frequent Words...\n');

        const prob = await client.query("SELECT problem_id FROM problems WHERE title ILIKE '%Top K Frequent Words%'");
        const problemId = prob.rows[0].problem_id;

        // 1. Update Description to be clearer
        const description = `Given an array of strings words and an integer k, return the k most frequent strings.

Return the answer sorted by the frequency from highest to lowest. Sort the words with the same frequency by their lexicographical order.

**Input Format:**
- First line: N (number of words) and K (number of top words to find)
- Next N lines: The words (one per line)

**Output Format:**
- Print the k most frequent words, one per line.

**Constraints:**
- 1 <= N <= 10^5
- 1 <= k <= N
- words[i] consists of lowercase English letters.`;

        await client.query("UPDATE problems SET description = $1 WHERE problem_id = $2", [description, problemId]);
        console.log('✅ Updated Description');

        // 2. Update Sample Test Case
        // Input:
        // 7 2
        // i
        // love
        // leetcode
        // i
        // love
        // coding
        // leetcode

        // Counts: i=2, love=2, leetcode=2, coding=1
        // Sorted: i, leetcode, love, coding
        // Top 2: i, leetcode

        const correctOutput = "i\nleetcode";

        await client.query(
            "UPDATE test_cases SET expected_output = $1 WHERE problem_id = $2 AND is_sample = true",
            [correctOutput, problemId]
        );
        console.log('✅ Updated Sample Output to:');
        console.log(correctOutput);

    } catch (err) {
        console.error('Error:', err);
    } finally {
        client.release();
        await pool.end();
    }
}

fixTopK();
