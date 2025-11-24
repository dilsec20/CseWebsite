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
    // ==================== DYNAMIC PROGRAMMING ====================
    {
        title: "Word Break",
        difficulty: "Medium",
        topic: "Dynamic Programming",
        description: "Given a string s and a dictionary of strings wordDict, return true if s can be segmented into a space-separated sequence of one or more dictionary words.\n\nNote that the same word in the dictionary may be reused multiple times in the segmentation.",
        input_format: "First line: string s\nSecond line: n (number of words)\nThird line: n space-separated words",
        output_format: "true or false",
        constraints: "1 <= s.length <= 300\n1 <= wordDict.length <= 1000\n1 <= wordDict[i].length <= 20\ns and wordDict[i] consist of only lowercase English letters.\nAll the strings of wordDict are unique.",
        test_input: "leetcode\n2\nleet code",
        test_output: "true",
        source: "LeetCode #139"
    },
    {
        title: "Partition Equal Subset Sum",
        difficulty: "Medium",
        topic: "Dynamic Programming",
        description: "Given an integer array nums, return true if you can partition the array into two subsets such that the sum of the elements in both subsets is equal or false otherwise.",
        input_format: "First line: n (size of array)\nSecond line: n space-separated integers",
        output_format: "true or false",
        constraints: "1 <= nums.length <= 200\n1 <= nums[i] <= 100",
        test_input: "4\n1 5 11 5",
        test_output: "true",
        source: "LeetCode #416"
    },
    {
        title: "Edit Distance",
        difficulty: "Medium",
        topic: "Dynamic Programming",
        description: "Given two strings word1 and word2, return the minimum number of operations required to convert word1 to word2.\n\nYou have the following three operations permitted on a word:\n- Insert a character\n- Delete a character\n- Replace a character",
        input_format: "First line: word1\nSecond line: word2",
        output_format: "Single integer (minimum operations)",
        constraints: "0 <= word1.length, word2.length <= 500\nword1 and word2 consist of lowercase English letters.",
        test_input: "horse\nros",
        test_output: "3",
        source: "LeetCode #72"
    },
    {
        title: "Decode Ways",
        difficulty: "Medium",
        topic: "Dynamic Programming",
        description: "A message containing letters from A-Z can be encoded into numbers using the following mapping:\n'A' -> \"1\"\n'B' -> \"2\"\n...\n'Z' -> \"26\"\n\nTo decode an encoded message, all the digits must be grouped then mapped back into letters using the reverse of the mapping above (there may be multiple ways). For example, \"11106\" can be mapped into:\n- \"AAJF\" with the grouping (1 1 10 6)\n- \"KJF\" with the grouping (11 10 6)\n\nNote that the grouping (1 11 06) is invalid because \"06\" cannot be mapped into 'F' since \"6\" is different from \"06\".\n\nGiven a string s containing only digits, return the number of ways to decode it.",
        input_format: "Single line: string s",
        output_format: "Single integer (number of ways)",
        constraints: "1 <= s.length <= 100\ns contains only digits and may contain leading zero(s).",
        test_input: "12",
        test_output: "2",
        source: "LeetCode #91"
    },
    {
        title: "Maximum Product Subarray",
        difficulty: "Medium",
        topic: "Dynamic Programming",
        description: "Given an integer array nums, find a subarray that has the largest product, and return the product.\n\nThe test cases are generated so that the answer will fit in a 32-bit integer.",
        input_format: "First line: n (size of array)\nSecond line: n space-separated integers",
        output_format: "Single integer (maximum product)",
        constraints: "1 <= nums.length <= 2 * 10^4\n-10 <= nums[i] <= 10\nThe product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer.",
        test_input: "4\n2 3 -2 4",
        test_output: "6",
        source: "LeetCode #152"
    },

    // ==================== STACK/QUEUE ====================
    {
        title: "Min Stack",
        difficulty: "Medium",
        topic: "Stack",
        description: "Design a stack that supports push, pop, top, and retrieving the minimum element in constant time.\n\nImplement the MinStack class:\n- MinStack() initializes the stack object.\n- void push(int val) pushes the element val onto the stack.\n- void pop() removes the element on the top of the stack.\n- int top() gets the top element of the stack.\n- int getMin() retrieves the minimum element in the stack.\n\nYou must implement a solution with O(1) time complexity for each function.",
        input_format: "First line: n (number of operations)\nNext n lines: operation val (push/pop/top/getMin)",
        output_format: "Output for each top/getMin operation",
        constraints: "-2^31 <= val <= 2^31 - 1\nMethods pop, top and getMin operations will always be called on non-empty stacks.\nAt most 3 * 10^4 calls will be made to push, pop, top, and getMin.",
        test_input: "7\npush -2\npush 0\npush -3\ngetMin\npop\ntop\ngetMin",
        test_output: "-3\n0\n-2",
        source: "LeetCode #155"
    },
    {
        title: "Evaluate Reverse Polish Notation",
        difficulty: "Medium",
        topic: "Stack",
        description: "You are given an array of strings tokens that represents an arithmetic expression in a Reverse Polish Notation.\n\nEvaluate the expression. Return an integer that represents the value of the expression.\n\nNote that:\n- The valid operators are '+', '-', '*', and '/'.\n- Each operand may be an integer or another expression.\n- The division between two integers always truncates toward zero.\n- There will not be any division by zero.\n- The input represents a valid arithmetic expression in a reverse polish notation.\n- The answer and all the intermediate calculations can be represented in a 32-bit integer.",
        input_format: "First line: n (number of tokens)\nSecond line: n space-separated tokens",
        output_format: "Single integer (result)",
        constraints: "1 <= tokens.length <= 10^4\ntokens[i] is either an operator: \"+\", \"-\", \"*\", or \"/\", or an integer in the range [-200, 200].",
        test_input: "5\n2 1 + 3 *",
        test_output: "9",
        source: "LeetCode #150"
    },

    // ==================== BINARY SEARCH ====================
    {
        title: "Find Minimum in Rotated Sorted Array",
        difficulty: "Medium",
        topic: "Binary Search",
        description: "Suppose an array of length n sorted in ascending order is rotated between 1 and n times. For example, the array nums = [0,1,2,4,5,6,7] might become:\n\n[4,5,6,7,0,1,2] if it was rotated 4 times.\n[0,1,2,4,5,6,7] if it was rotated 7 times.\n\nNotice that rotating an array [a[0], a[1], a[2], ..., a[n-1]] 1 time results in the array [a[n-1], a[0], a[1], a[2], ..., a[n-2]].\n\nGiven the sorted rotated array nums of unique elements, return the minimum element of this array.\n\nYou must write an algorithm that runs in O(log n) time.",
        input_format: "First line: n (size of array)\nSecond line: n space-separated integers (rotated sorted array)",
        output_format: "Single integer (minimum element)",
        constraints: "n == nums.length\n1 <= n <= 5000\n-5000 <= nums[i] <= 5000\nAll the integers of nums are unique.\nnums is sorted and rotated between 1 and n times.",
        test_input: "7\n4 5 6 7 0 1 2",
        test_output: "0",
        source: "LeetCode #153"
    },
    {
        title: "Search a 2D Matrix II",
        difficulty: "Medium",
        topic: "Binary Search",
        description: "Write an efficient algorithm that searches for a value target in an m x n integer matrix matrix. This matrix has the following properties:\n\n- Integers in each row are sorted in ascending from left to right.\n- Integers in each column are sorted in ascending from top to bottom.",
        input_format: "First line: m n (rows and columns)\nNext m lines: n space-separated integers\nLast line: target",
        output_format: "true or false",
        constraints: "m == matrix.length\nn == matrix[i].length\n1 <= n, m <= 300\n-10^9 <= matrix[i][j] <= 10^9\nAll the integers in each row are sorted in ascending order.\nAll the integers in each column are sorted in ascending order.\n-10^9 <= target <= 10^9",
        test_input: "5 5\n1 4 7 11 15\n2 5 8 12 19\n3 6 9 16 22\n10 13 14 17 24\n18 21 23 26 30\n5",
        test_output: "true",
        source: "LeetCode #240"
    },

    // ==================== HEAP ====================
    {
        title: "Find Median from Data Stream",
        difficulty: "Hard",
        topic: "Heap",
        description: "The median is the middle value in an ordered integer list. If the size of the list is even, there is no middle value, and the median is the mean of the two middle values.\n\nImplement the MedianFinder class:\n- MedianFinder() initializes the MedianFinder object.\n- void addNum(int num) adds the integer num from the data stream to the data structure.\n- double findMedian() returns the median of all elements so far.",
        input_format: "First line: n (number of operations)\nNext n lines: addNum val or findMedian",
        output_format: "Output for each findMedian operation",
        constraints: "-10^5 <= num <= 10^5\nThere will be at least one element in the data structure before calling findMedian.\nAt most 5 * 10^4 calls will be made to addNum and findMedian.",
        test_input: "3\naddNum 1\naddNum 2\nfindMedian",
        test_output: "1.5",
        source: "LeetCode #295"
    },
    {
        title: "Merge k Sorted Lists",
        difficulty: "Hard",
        topic: "Heap",
        description: "You are given an array of k linked-lists lists, each linked-list is sorted in ascending order.\n\nMerge all the linked-lists into one sorted linked-list and return it.",
        input_format: "First line: k (number of lists)\nNext k lines: n (size) followed by n space-separated integers",
        output_format: "Space-separated integers (merged list)",
        constraints: "k == lists.length\n0 <= k <= 10^4\n0 <= lists[i].length <= 500\n-10^4 <= lists[i][j] <= 10^4\nlists[i] is sorted in ascending order.\nThe sum of lists[i].length will not exceed 10^4.",
        test_input: "3\n3 1 4 5\n3 1 3 4\n2 2 6",
        test_output: "1 1 2 3 4 4 5 6",
        source: "LeetCode #23"
    },
    {
        title: "Top K Frequent Elements",
        difficulty: "Medium",
        topic: "Heap",
        description: "Given an integer array nums and an integer k, return the k most frequent elements. You may return the answer in any order.",
        input_format: "First line: n (size of array)\nSecond line: n space-separated integers\nThird line: k",
        output_format: "k space-separated integers",
        constraints: "1 <= nums.length <= 10^5\n-10^4 <= nums[i] <= 10^4\nk is in the range [1, the number of unique elements in the array].\nIt is guaranteed that the answer is unique.",
        test_input: "6\n1 1 1 2 2 3\n2",
        test_output: "1 2",
        source: "LeetCode #347"
    },
    {
        title: "Kth Largest Element in an Array",
        difficulty: "Medium",
        topic: "Heap",
        description: "Given an integer array nums and an integer k, return the kth largest element in the array.\n\nNote that it is the kth largest element in the sorted order, not the kth distinct element.\n\nCan you solve it without sorting?",
        input_format: "First line: n (size of array)\nSecond line: n space-separated integers\nThird line: k",
        output_format: "Single integer",
        constraints: "1 <= k <= nums.length <= 10^5\n-10^4 <= nums[i] <= 10^4",
        test_input: "6\n3 2 1 5 6 4\n2",
        test_output: "5",
        source: "LeetCode #215"
    },

    // ==================== BACKTRACKING ====================
    {
        title: "Letter Combinations of a Phone Number",
        difficulty: "Medium",
        topic: "Backtracking",
        description: "Given a string containing digits from 2-9 inclusive, return all possible letter combinations that the number could represent. Return the answer in any order.\n\nA mapping of digits to letters (just like on the telephone buttons) is given below. Note that 1 does not map to any letters.",
        input_format: "Single line: string digits",
        output_format: "Space-separated strings (combinations)",
        constraints: "0 <= digits.length <= 4\ndigits[i] is a digit in the range ['2', '9'].",
        test_input: "23",
        test_output: "ad ae af bd be bf cd ce cf",
        source: "LeetCode #17"
    },
    {
        title: "Generate Parentheses",
        difficulty: "Medium",
        topic: "Backtracking",
        description: "Given n pairs of parentheses, write a function to generate all combinations of well-formed parentheses.",
        input_format: "Single integer n",
        output_format: "Space-separated strings (combinations)",
        constraints: "1 <= n <= 8",
        test_input: "3",
        test_output: "((())) (()()) (())() ()(()) ()()()",
        source: "LeetCode #22"
    }
];

async function seedProblems() {
    const client = await pool.connect();
    try {
        console.log(`Seeding ${problems.length} DP, Stack & Heap problems...`);

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
