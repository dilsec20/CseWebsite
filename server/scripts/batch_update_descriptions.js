const pool = require('../db');

const updates = [
    {
        title: "Contains Duplicate",
        description: `Given an integer array nums, return true if any value appears at least twice in the array, and return false if every element is distinct.

**Example 1:**
Input: nums = [1,2,3,1]
Output: true

**Example 2:**
Input: nums = [1,2,3,4]
Output: false

**Example 3:**
Input: nums = [1,1,1,3,3,4,3,2,4,2]
Output: true

**Input Format:**
- A single line containing space-separated integers representing the array nums.

**Output Format:**
- Print "true" if duplicates exist, otherwise "false".

**Constraints:**
- 1 <= nums.length <= 10^5
- -10^9 <= nums[i] <= 10^9`
    },
    {
        title: "Product of Array Except Self",
        description: `Given an integer array nums, return an array answer such that answer[i] is equal to the product of all the elements of nums except nums[i].

The product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer.

You must write an algorithm that runs in O(n) time and without using the division operation.

**Example 1:**
Input: nums = [1,2,3,4]
Output: [24,12,8,6]

**Example 2:**
Input: nums = [-1,1,0,-3,3]
Output: [0,0,9,0,0]

**Input Format:**
- A single line containing space-separated integers representing the array nums.

**Output Format:**
- Print the result array elements separated by spaces.

**Constraints:**
- 2 <= nums.length <= 10^5
- -30 <= nums[i] <= 30`
    },
    {
        title: "Valid Palindrome",
        description: `A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Alphanumeric characters include letters and numbers.

Given a string s, return true if it is a palindrome, or false otherwise.

**Example 1:**
Input: s = "A man, a plan, a canal: Panama"
Output: true
Explanation: "amanaplanacanalpanama" is a palindrome.

**Example 2:**
Input: s = "race a car"
Output: false
Explanation: "raceacar" is not a palindrome.

**Input Format:**
- A single line containing the string s.

**Output Format:**
- Print "true" if it is a palindrome, otherwise "false".

**Constraints:**
- 1 <= s.length <= 2 * 10^5
- s consists only of printable ASCII characters.`
    },
    {
        title: "Maximum Depth of Binary Tree",
        description: `Given the root of a binary tree, return its maximum depth.

A binary tree's maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.

**Example 1:**
Input: root = [3,9,20,null,null,15,7]
Output: 3

**Example 2:**
Input: root = [1,null,2]
Output: 2

**Input Format:**
- The input is given as a level-order traversal of the tree (space-separated). 'null' represents a missing node.

**Output Format:**
- Print the integer depth.

**Constraints:**
- The number of nodes in the tree is in the range [0, 10^4].
- -100 <= Node.val <= 100`
    },
    {
        title: "Reverse Linked List",
        description: `Given the head of a singly linked list, reverse the list, and return the reversed list.

**Example 1:**
Input: head = [1,2,3,4,5]
Output: [5,4,3,2,1]

**Example 2:**
Input: head = [1,2]
Output: [2,1]

**Input Format:**
- A single line containing space-separated integers representing the linked list nodes.

**Output Format:**
- Print the reversed list elements separated by spaces.

**Constraints:**
- The number of nodes in the list is the range [0, 5000].
- -5000 <= Node.val <= 5000`
    },
    {
        title: "Merge Two Sorted Lists",
        description: `You are given the heads of two sorted linked lists list1 and list2.

Merge the two lists into one sorted list. The list should be made by splicing together the nodes of the first two lists.

Return the head of the merged linked list.

**Example 1:**
Input: list1 = [1,2,4], list2 = [1,3,4]
Output: [1,1,2,3,4,4]

**Example 2:**
Input: list1 = [], list2 = []
Output: []

**Input Format:**
- First line: Elements of list1 (space-separated)
- Second line: Elements of list2 (space-separated)

**Output Format:**
- Print the merged list elements separated by spaces.

**Constraints:**
- The number of nodes in both lists is in the range [0, 50].
- -100 <= Node.val <= 100
- Both list1 and list2 are sorted in non-decreasing order.`
    },
    {
        title: "Number of Islands",
        description: `Given an m x n 2D binary grid grid which represents a map of '1's (land) and '0's (water), return the number of islands.

An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are all surrounded by water.

**Example 1:**
Input: grid = [
  ["1","1","1","1","0"],
  ["1","1","0","1","0"],
  ["1","1","0","0","0"],
  ["0","0","0","0","0"]
]
Output: 1

**Input Format:**
- First line: m and n (rows and columns)
- Next m lines: Each line contains n space-separated characters ('0' or '1').

**Output Format:**
- Print the integer number of islands.

**Constraints:**
- 1 <= m, n <= 300
- grid[i][j] is '0' or '1'.`
    },
    {
        title: "Valid Anagram",
        description: `Given two strings s and t, return true if t is an anagram of s, and false otherwise.

An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.

**Example 1:**
Input: s = "anagram", t = "nagaram"
Output: true

**Example 2:**
Input: s = "rat", t = "car"
Output: false

**Input Format:**
- First line: string s
- Second line: string t

**Output Format:**
- Print "true" or "false".

**Constraints:**
- 1 <= s.length, t.length <= 5 * 10^4
- s and t consist of lowercase English letters.`
    },
    {
        title: "Climbing Stairs",
        description: `You are climbing a staircase. It takes n steps to reach the top.

Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?

**Example 1:**
Input: n = 2
Output: 2
Explanation: There are two ways to climb to the top.
1. 1 step + 1 step
2. 2 steps

**Example 2:**
Input: n = 3
Output: 3
Explanation: There are three ways to climb to the top.
1. 1 step + 1 step + 1 step
2. 1 step + 2 steps
3. 2 steps + 1 step

**Input Format:**
- A single integer n.

**Output Format:**
- Print the number of distinct ways.

**Constraints:**
- 1 <= n <= 45`
    }
];

async function batchUpdateDescriptions() {
    const client = await pool.connect();
    try {
        console.log('🚀 Batch Updating Descriptions...\n');

        for (const update of updates) {
            const res = await client.query(
                "UPDATE problems SET description = $1 WHERE title = $2 RETURNING problem_id",
                [update.description, update.title]
            );

            if (res.rows.length > 0) {
                console.log(`✅ Updated "${update.title}" (ID: ${res.rows[0].problem_id})`);
            } else {
                console.log(`⚠️ Problem "${update.title}" not found.`);
            }
        }

    } catch (err) {
        console.error('Error:', err);
    } finally {
        client.release();
        await pool.end();
    }
}

batchUpdateDescriptions();
