const pool = require('../db');

async function fixRemoveElementsDesc() {
    const client = await pool.connect();
    try {
        console.log('📝 Updating Remove Linked List Elements Description...\n');

        const description = `Given the head of a linked list and an integer val, remove all the nodes of the linked list that has Node.val == val, and return the new head.

**Example 1:**
Input: head = [1,2,6,3,4,5,6], val = 6
Output: [1,2,3,4,5]

**Example 2:**
Input: head = [], val = 1
Output: []

**Example 3:**
Input: head = [7,7,7,7], val = 7
Output: []

**Input Format:**
- The first line contains the elements of the linked list separated by spaces.
- The second line contains the integer val.

**Output Format:**
- Print the elements of the modified linked list separated by spaces.

**Constraints:**
- The number of nodes in the list is in the range [0, 10^4].
- 1 <= Node.val <= 50
- 0 <= val <= 50`;

        // Update based on the title found in previous step or partial match
        const result = await client.query(
            "UPDATE problems SET description = $1 WHERE description = 'Remove all elements from linked list with value val.' RETURNING problem_id, title",
            [description]
        );

        if (result.rows.length > 0) {
            console.log(`✅ Updated ${result.rows.length} problem(s):`);
            result.rows.forEach(r => console.log(`- [${r.problem_id}] ${r.title}`));
        } else {
            console.log('❌ Problem not found or description already updated!');
        }

    } catch (err) {
        console.error('Error:', err);
    } finally {
        client.release();
        await pool.end();
    }
}

fixRemoveElementsDesc();
