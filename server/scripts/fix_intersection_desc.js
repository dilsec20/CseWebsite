const pool = require('../db');

async function fixIntersectionDesc() {
    const client = await pool.connect();
    try {
        console.log('📝 Updating Intersection of Two Lists Description...\n');

        const description = `Given the heads of two singly linked-lists headA and headB, return the node at which the two lists intersect. If the two linked lists have no intersection at all, return null.

For example, the following two linked lists begin to intersect at node c1:
A:       a1 -> a2
                   ↘
                     c1 -> c2 -> c3
                   ↗
B: b1 -> b2 -> b3

The test cases are generated such that there are no cycles anywhere in the entire linked structure.

Note that the linked lists must retain their original structure after the function returns.

**Input Format:**
- First line: intersectVal (value of intersection node, 0 if none)
- Second line: listA (space-separated values)
- Third line: listB (space-separated values)
- Fourth line: skipA (number of nodes to skip in A before intersection)
- Fifth line: skipB (number of nodes to skip in B before intersection)

**Output Format:**
- The value of the intersected node, or "null" if no intersection.

**Constraints:**
- The number of nodes of listA is in the m.
- The number of nodes of listB is in the n.
- 1 <= m, n <= 3 * 10^4
- 1 <= Node.val <= 10^5
- 0 <= skipA < m
- 0 <= skipB < n
- intersectVal is 0 if listA and listB do not intersect.
- intersectVal == listA[skipA] == listB[skipB] if listA and listB intersect.`;

        const result = await client.query(
            "UPDATE problems SET description = $1 WHERE title = 'Intersection of Two Lists' RETURNING problem_id",
            [description]
        );

        if (result.rows.length > 0) {
            console.log('✅ Updated description successfully.');
        } else {
            console.log('❌ Problem not found!');
        }

    } catch (err) {
        console.error('Error:', err);
    } finally {
        client.release();
        await pool.end();
    }
}

fixIntersectionDesc();
