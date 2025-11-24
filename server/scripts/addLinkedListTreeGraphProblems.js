const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'dilip',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    database: process.env.DB_NAME || 'placement_prep',
});

const problems = [
    // ==================== LINKED LIST ====================
    {
        title: "Palindrome Linked List",
        difficulty: "Easy",
        topic: "Linked List",
        description: "Given the head of a singly linked list, return true if it is a palindrome or false otherwise.",
        input_format: "First line: n (number of nodes)\nSecond line: n space-separated integers (node values)",
        output_format: "true or false",
        constraints: "The number of nodes in the list is in the range [1, 10^5].\n0 <= Node.val <= 9",
        test_input: "4\n1 2 2 1",
        test_output: "true",
        source: "LeetCode #234"
    },
    {
        title: "Reorder List",
        difficulty: "Medium",
        topic: "Linked List",
        description: "You are given the head of a singly linked-list. The list can be represented as:\nL0 → L1 → … → Ln - 1 → Ln\n\nReorder the list to be on the following form:\nL0 → Ln → L1 → Ln - 1 → L2 → Ln - 2 → …\n\nYou may not modify the values in the list's nodes. Only nodes themselves may be changed.",
        input_format: "First line: n (number of nodes)\nSecond line: n space-separated integers",
        output_format: "n space-separated integers (reordered list)",
        constraints: "The number of nodes in the list is in the range [1, 5 * 10^4].\n1 <= Node.val <= 1000",
        test_input: "5\n1 2 3 4 5",
        test_output: "1 5 2 4 3",
        source: "LeetCode #143"
    },
    {
        title: "Intersection of Two Linked Lists",
        difficulty: "Easy",
        topic: "Linked List",
        description: "Given the heads of two singly linked-lists headA and headB, return the node at which the two lists intersect. If the two linked lists have no intersection at all, return null.",
        input_format: "First line: n1 (size of list A)\nSecond line: n1 space-separated integers\nThird line: n2 (size of list B)\nFourth line: n2 space-separated integers\nFifth line: intersection value (-1 for no intersection)",
        output_format: "Single integer (intersection value or -1)",
        constraints: "The number of nodes of listA is in the m.\nThe number of nodes of listB is in the n.\n1 <= m, n <= 3 * 10^4\n1 <= Node.val <= 10^5",
        test_input: "5\n4 1 8 4 5\n6\n5 6 1 8 4 5\n8",
        test_output: "8",
        source: "LeetCode #160"
    },
    {
        title: "Reverse Linked List",
        difficulty: "Easy",
        topic: "Linked List",
        description: "Given the head of a singly linked list, reverse the list, and return the reversed list.",
        input_format: "First line: n (number of nodes)\nSecond line: n space-separated integers",
        output_format: "n space-separated integers (reversed list)",
        constraints: "The number of nodes in the list is the range [0, 5000].\n-5000 <= Node.val <= 5000",
        test_input: "5\n1 2 3 4 5",
        test_output: "5 4 3 2 1",
        source: "LeetCode #206"
    },
    {
        title: "Merge Two Sorted Lists",
        difficulty: "Easy",
        topic: "Linked List",
        description: "You are given the heads of two sorted linked lists list1 and list2.\n\nMerge the two lists into one sorted list. The list should be made by splicing together the nodes of the first two lists.\n\nReturn the head of the merged linked list.",
        input_format: "First line: n1 (size of list 1)\nSecond line: n1 space-separated integers\nThird line: n2 (size of list 2)\nFourth line: n2 space-separated integers",
        output_format: "Space-separated integers (merged sorted list)",
        constraints: "The number of nodes in both lists is in the range [0, 50].\n-100 <= Node.val <= 100\nBoth list1 and list2 are sorted in non-decreasing order.",
        test_input: "3\n1 2 4\n3\n1 3 4",
        test_output: "1 1 2 3 4 4",
        source: "LeetCode #21"
    },

    // ==================== TREE ====================
    {
        title: "Lowest Common Ancestor of a Binary Tree",
        difficulty: "Medium",
        topic: "Tree",
        description: "Given a binary tree, find the lowest common ancestor (LCA) of two given nodes in the tree.\n\nAccording to the definition of LCA on Wikipedia: \"The lowest common ancestor is defined between two nodes p and q as the lowest node in T that has both p and q as descendants (where we allow a node to be a descendant of itself).\"",
        input_format: "Line 1: Level-order traversal (null for empty nodes)\nLine 2: p value\nLine 3: q value",
        output_format: "Single integer (LCA value)",
        constraints: "The number of nodes in the tree is in the range [2, 10^5].\n-10^9 <= Node.val <= 10^9\nAll Node.val are unique.\np != q\np and q will exist in the tree.",
        test_input: "3 5 1 6 2 0 8 null null 7 4\n5\n1",
        test_output: "3",
        source: "LeetCode #236"
    },
    {
        title: "Binary Tree Right Side View",
        difficulty: "Medium",
        topic: "Tree",
        description: "Given the root of a binary tree, imagine yourself standing on the right side of it, return the values of the nodes you can see ordered from top to bottom.",
        input_format: "Level-order traversal: space-separated values (null for empty nodes)",
        output_format: "Space-separated integers (right side view)",
        constraints: "The number of nodes in the tree is in the range [0, 100].\n-100 <= Node.val <= 100",
        test_input: "1 2 3 null 5 null 4",
        test_output: "1 3 4",
        source: "LeetCode #199"
    },
    {
        title: "Serialize and Deserialize Binary Tree",
        difficulty: "Hard",
        topic: "Tree",
        description: "Serialization is the process of converting a data structure or object into a sequence of bits so that it can be stored in a file or memory buffer, or transmitted across a network connection link to be reconstructed later in the same or another computer environment.\n\nDesign an algorithm to serialize and deserialize a binary tree. There is no restriction on how your serialization/deserialization algorithm should work. You just need to ensure that a binary tree can be serialized to a string and this string can be deserialized to the original tree structure.",
        input_format: "Level-order traversal: space-separated values (null for empty nodes)",
        output_format: "Same as input (serialized then deserialized)",
        constraints: "The number of nodes in the tree is in the range [0, 10^4].\n-1000 <= Node.val <= 1000",
        test_input: "1 2 3 null null 4 5",
        test_output: "1 2 3 null null 4 5",
        source: "LeetCode #297"
    },
    {
        title: "Kth Smallest Element in a BST",
        difficulty: "Medium",
        topic: "Tree",
        description: "Given the root of a binary search tree, and an integer k, return the kth smallest value (1-indexed) of all the values of the nodes in the tree.",
        input_format: "Line 1: Level-order traversal\nLine 2: k",
        output_format: "Single integer (kth smallest)",
        constraints: "The number of nodes in the tree is n.\n1 <= k <= n <= 10^4\n0 <= Node.val <= 10^4",
        test_input: "5 3 6 2 4 null null 1\n3",
        test_output: "3",
        source: "LeetCode #230"
    },
    {
        title: "Maximum Depth of Binary Tree",
        difficulty: "Easy",
        topic: "Tree",
        description: "Given the root of a binary tree, return its maximum depth.\n\nA binary tree's maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.",
        input_format: "Level-order traversal: space-separated values (null for empty nodes)",
        output_format: "Single integer (maximum depth)",
        constraints: "The number of nodes in the tree is in the range [0, 10^4].\n-100 <= Node.val <= 100",
        test_input: "3 9 20 null null 15 7",
        test_output: "3",
        source: "LeetCode #104"
    },

    // ==================== GRAPH ====================
    {
        title: "Clone Graph",
        difficulty: "Medium",
        topic: "Graph",
        description: "Given a reference of a node in a connected undirected graph.\n\nReturn a deep copy (clone) of the graph.\n\nEach node in the graph contains a value (int) and a list (List[Node]) of its neighbors.",
        input_format: "First line: n (number of nodes)\nNext n lines: node_value space-separated neighbor values",
        output_format: "Same as input (cloned graph)",
        constraints: "The number of nodes in the graph is in the range [0, 100].\n1 <= Node.val <= 100\nNode.val is unique for each node.\nThere are no repeated edges and no self-loops in the graph.\nThe Graph is connected and all nodes can be visited starting from the given node.",
        test_input: "4\n1 2 4\n2 1 3\n3 2 4\n4 1 3",
        test_output: "4\n1 2 4\n2 1 3\n3 2 4\n4 1 3",
        source: "LeetCode #133"
    },
    {
        title: "Pacific Atlantic Water Flow",
        difficulty: "Medium",
        topic: "Graph",
        description: "There is an m x n rectangular island that borders both the Pacific Ocean and Atlantic Ocean. The Pacific Ocean touches the island's left and top edges, and the Atlantic Ocean touches the island's right and bottom edges.\n\nThe island is partitioned into a grid of square cells. You are given an m x n integer matrix heights where heights[r][c] represents the height above sea level of the cell at coordinate (r, c).\n\nThe island receives a lot of rain, and the rain water can flow to neighboring cells directly north, south, east, and west if the neighboring cell's height is less than or equal to the current cell's height. Water can flow from any cell adjacent to an ocean into the ocean.\n\nReturn a 2D list of grid coordinates result where result[i] = [ri, ci] denotes that rain water can flow from cell (ri, ci) to both the Pacific and Atlantic oceans.",
        input_format: "First line: m n (rows and columns)\nNext m lines: n space-separated integers (heights)",
        output_format: "Each line: row col (cells that can flow to both oceans)",
        constraints: "m == heights.length\nn == heights[r].length\n1 <= m, n <= 200\n0 <= heights[r][c] <= 10^5",
        test_input: "5 5\n1 2 2 3 5\n3 2 3 4 4\n2 4 5 3 1\n6 7 1 4 5\n5 1 1 2 4",
        test_output: "0 4\n1 3\n1 4\n2 2\n3 0\n3 1\n4 0",
        source: "LeetCode #417"
    },
    {
        title: "Word Ladder",
        difficulty: "Hard",
        topic: "Graph",
        description: "A transformation sequence from word beginWord to word endWord using a dictionary wordList is a sequence of words beginWord -> s1 -> s2 -> ... -> sk such that:\n\n- Every adjacent pair of words differs by a single letter.\n- Every si for 1 <= i <= k is in wordList. Note that beginWord does not need to be in wordList.\n- sk == endWord\n\nGiven two words, beginWord and endWord, and a dictionary wordList, return the number of words in the shortest transformation sequence from beginWord to endWord, or 0 if no such sequence exists.",
        input_format: "First line: beginWord\nSecond line: endWord\nThird line: n (dictionary size)\nFourth line: n space-separated words",
        output_format: "Single integer (shortest length or 0)",
        constraints: "1 <= beginWord.length <= 10\nendWord.length == beginWord.length\n1 <= wordList.length <= 5000\nwordList[i].length == beginWord.length\nbeginWord, endWord, and wordList[i] consist of lowercase English letters.\nbeginWord != endWord\nAll the words in wordList are unique.",
        test_input: "hit\ncog\n6\nhot dot dog lot log cog",
        test_output: "5",
        source: "LeetCode #127"
    },
    {
        title: "Number of Islands",
        difficulty: "Medium",
        topic: "Graph",
        description: "Given an m x n 2D binary grid grid which represents a map of '1's (land) and '0's (water), return the number of islands.\n\nAn island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are all surrounded by water.",
        input_format: "First line: m n (rows and cols)\nNext m lines: n space-separated characters ('1' or '0')",
        output_format: "Single integer (number of islands)",
        constraints: "m == grid.length\nn == grid[i].length\n1 <= m, n <= 300\ngrid[i][j] is '0' or '1'.",
        test_input: "4 5\n1 1 1 1 0\n1 1 0 1 0\n1 1 0 0 0\n0 0 0 0 0",
        test_output: "1",
        source: "LeetCode #200"
    },
    {
        title: "Course Schedule",
        difficulty: "Medium",
        topic: "Graph",
        description: "There are a total of numCourses courses you have to take, labeled from 0 to numCourses - 1. You are given an array prerequisites where prerequisites[i] = [ai, bi] indicates that you must take course bi first if you want to take course ai.\n\nReturn true if you can finish all courses. Otherwise, return false.",
        input_format: "First line: numCourses\nSecond line: p (number of prerequisites)\nNext p lines: a b (course a depends on b)",
        output_format: "true or false",
        constraints: "1 <= numCourses <= 2000\n0 <= prerequisites.length <= 5000\nprerequisites[i].length == 2\n0 <= ai, bi < numCourses\nAll the pairs prerequisites[i] are unique.",
        test_input: "2\n1\n1 0",
        test_output: "true",
        source: "LeetCode #207"
    }
];

async function seedProblems() {
    const client = await pool.connect();
    try {
        console.log(`Seeding ${problems.length} Linked List, Tree & Graph problems...`);

        for (const problem of problems) {
            // Check if problem exists
            const checkRes = await client.query('SELECT problem_id FROM problems WHERE title = $1', [problem.title]);

            let problemId;
            if (checkRes.rows.length > 0) {
                console.log(`Updating: ${problem.title}`);
                problemId = checkRes.rows[0].problem_id;
                await client.query(`
                    UPDATE problems 
                    SET description = $1, difficulty = $2, topic = $3, 
                        input_format = $4, output_format = $5, constraints = $6, source = $7
                    WHERE problem_id = $8
                `, [problem.description, problem.difficulty, problem.topic,
                problem.input_format, problem.output_format, problem.constraints, problem.source,
                    problemId]);
            } else {
                console.log(`Creating: ${problem.title}`);
                const insertRes = await client.query(`
                    INSERT INTO problems (title, description, difficulty, topic, input_format, output_format, constraints, source)
                    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
                    RETURNING problem_id
                `, [problem.title, problem.description, problem.difficulty, problem.topic,
                problem.input_format, problem.output_format, problem.constraints, problem.source]);
                problemId = insertRes.rows[0].problem_id;
            }

            // Add sample test case
            await client.query('DELETE FROM test_cases WHERE problem_id = $1 AND is_sample = true', [problemId]);
            await client.query(`
                INSERT INTO test_cases (problem_id, input, expected_output, is_sample, test_case_order)
                VALUES ($1, $2, $3, true, 1)
            `, [problemId, problem.test_input, problem.test_output]);
        }

        console.log('Done!');
    } catch (err) {
        console.error('Error:', err);
    } finally {
        client.release();
        pool.end();
    }
}

seedProblems();
