const pool = require('../db');

async function fixDescriptions() {
    const client = await pool.connect();
    try {
        console.log('📝 Updating Problem Descriptions...\n');

        const updates = [
            {
                title: 'Sqrt(x)',
                description: `Given a non-negative integer x, return the square root of x rounded down to the nearest integer. The returned integer should be non-negative as well.

You must not use any built-in exponent function or operator.
- For example, do not use pow(x, 0.5) or x ** 0.5.

**Input Format:**
- A single integer x.

**Output Format:**
- A single integer representing the square root of x rounded down.

**Constraints:**
- 0 <= x <= 2^31 - 1`
            },
            {
                title: 'Subsets',
                description: `Given an integer array nums of unique elements, return all possible subsets (the power set).

The solution set must not contain duplicate subsets. Return the solution in any order.

**Input Format:**
- First line: n (size of array)
- Second line: n space-separated integers (unique elements)

**Output Format:**
- Print each subset on a new line.
- Elements within a subset should be space-separated.
- Empty subset can be printed as "[]" or empty line.

**Constraints:**
- 1 <= nums.length <= 10
- -10 <= nums[i] <= 10
- All the numbers of nums are unique.`
            },
            {
                title: 'Find Minimum in Rotated Sorted Array',
                description: `Suppose an array of length n sorted in ascending order is rotated between 1 and n times. For example, the array nums = [0,1,2,4,5,6,7] might become:
- [4,5,6,7,0,1,2] if it was rotated 4 times.
- [0,1,2,4,5,6,7] if it was rotated 7 times.

Notice that rotating an array [a[0], a[1], a[2], ..., a[n-1]] 1 time results in the array [a[n-1], a[0], a[1], a[2], ..., a[n-2]].

Given the sorted rotated array nums of unique elements, return the minimum element of this array.

You must write an algorithm that runs in O(log n) time.

**Input Format:**
- First line: n (size of array)
- Second line: n space-separated integers

**Output Format:**
- A single integer representing the minimum element.

**Constraints:**
- n == nums.length
- 1 <= n <= 5000
- -5000 <= nums[i] <= 5000
- All the integers of nums are unique.
- nums is sorted and rotated between 1 and n times.`
            },
            {
                title: 'Find Median from Data Stream',
                description: `The median is the middle value in an ordered integer list. If the size of the list is even, there is no middle value, and the median is the mean of the two middle values.

- For example, for arr = [2,3,4], the median is 3.
- For example, for arr = [2,3], the median is (2 + 3) / 2 = 2.5.

Implement the MedianFinder class:
- MedianFinder() initializes the MedianFinder object.
- void addNum(int num) adds the integer num from the data stream to the data structure.
- double findMedian() returns the median of all elements so far. Answers within 10^-5 of the actual answer will be accepted.

**Input Format:**
- First line: n (number of operations)
- Following n lines: operations (addNum <val> or findMedian)

**Output Format:**
- For each findMedian operation, print the result on a new line.

**Constraints:**
- -10^5 <= num <= 10^5
- There will be at least one element in the data structure before calling findMedian.
- At most 5 * 10^4 calls will be made to addNum and findMedian.`
            },
            {
                title: 'Min Stack',
                description: `Design a stack that supports push, pop, top, and retrieving the minimum element in constant time.

Implement the MinStack class:
- MinStack() initializes the stack object.
- void push(int val) pushes the element val onto the stack.
- void pop() removes the element on the top of the stack.
- int top() gets the top element of the stack.
- int getMin() retrieves the minimum element in the stack.

You must implement a solution with O(1) time complexity for each function.

**Input Format:**
- Operations are provided as commands on separate lines.

**Output Format:**
- For top() and getMin() operations, print the result on a new line.

**Constraints:**
- -2^31 <= val <= 2^31 - 1
- Methods pop, top and getMin operations will always be called on non-empty stacks.
- At most 3 * 10^4 calls will be made to push, pop, top, and getMin.`
            },
            {
                title: 'Sort Characters By Frequency',
                description: `Given a string s, sort it in decreasing order based on the frequency of the characters. The frequency of a character is the number of times it appears in the string.

Return the sorted string. If there are multiple answers, return any of them.

**Input Format:**
- A single string s.

**Output Format:**
- The sorted string.

**Constraints:**
- 1 <= s.length <= 5 * 10^5
- s consists of uppercase and lowercase English letters and digits.`
            },
            {
                title: 'N-Queens',
                description: `The n-queens puzzle is the problem of placing n queens on an n x n chessboard such that no two queens attack each other.

Given an integer n, return all distinct solutions to the n-queens puzzle. You may return the answer in any order.

Each solution contains a distinct board configuration of the n-queens' placement, where 'Q' and '.' both indicate a queen and an empty space, respectively.

**Input Format:**
- A single integer n.

**Output Format:**
- Print each solution board. Separate solutions with an empty line.

**Constraints:**
- 1 <= n <= 9`
            },
            {
                title: '0/1 Knapsack Problem',
                description: `Given N items where each item has some weight and profit associated with it and also given a bag with capacity W, [i.e., the bag can hold at most W weight in it]. The task is to put the items into the bag such that the sum of profits associated with them is the maximum possible. 

Note: The constraint here is we can either put an item completely into the bag or cannot put it at all [It is not possible to put a part of an item into the bag].

**Input Format:**
- First line: N (number of items)
- Second line: N space-separated integers (profits)
- Third line: N space-separated integers (weights)
- Fourth line: W (capacity)

**Output Format:**
- A single integer representing the maximum profit.

**Constraints:**
- 1 <= N <= 1000
- 1 <= W <= 1000
- 1 <= weights[i] <= 1000
- 1 <= profits[i] <= 1000`
            },
            {
                title: 'Rotting Oranges',
                description: `You are given an m x n grid where each cell can have one of three values:
- 0 representing an empty cell,
- 1 representing a fresh orange, or
- 2 representing a rotten orange.

Every minute, any fresh orange that is 4-directionally adjacent to a rotten orange becomes rotten.

Return the minimum number of minutes that must elapse until no cell has a fresh orange. If this is impossible, return -1.

**Input Format:**
- First line: m n (rows and columns)
- Next m lines: n space-separated integers representing the grid

**Output Format:**
- A single integer representing the minimum minutes or -1.

**Constraints:**
- m == grid.length
- n == grid[i].length
- 1 <= m, n <= 10
- grid[i][j] is 0, 1, or 2.`
            },
            {
                title: 'Evaluate Reverse Polish Notation',
                description: `You are given an array of strings tokens that represents an arithmetic expression in a Reverse Polish Notation.

Evaluate the expression. Return an integer that represents the value of the expression.

Note that:
- The valid operators are '+', '-', '*', and '/'.
- Each operand may be an integer or another expression.
- The division between two integers always truncates toward zero.
- There will not be any division by zero.
- The input represents a valid arithmetic expression in a reverse polish notation.
- The answer and all the intermediate calculations can be represented in a 32-bit integer.

**Input Format:**
- First line: n (number of tokens)
- Second line: n space-separated tokens

**Output Format:**
- A single integer representing the result.

**Constraints:**
- 1 <= tokens.length <= 10^4
- tokens[i] is either an operator: "+", "-", "*", or "/", or an integer in the range [-200, 200].`
            },
            {
                title: 'Candy',
                description: `There are n children standing in a line. Each child is assigned a rating value given in the integer array ratings.

You are giving candies to these children subjected to the following requirements:
- Each child must have at least one candy.
- Children with a higher rating get more candies than their neighbors.

Return the minimum number of candies you need to have to distribute the candies to the children.

**Input Format:**
- First line: n (number of children)
- Second line: n space-separated integers (ratings)

**Output Format:**
- A single integer representing the minimum candies.

**Constraints:**
- n == ratings.length
- 1 <= n <= 2 * 10^4
- 0 <= ratings[i] <= 2 * 10^4`
            },
            {
                title: 'Palindrome Linked List',
                description: `Given the head of a singly linked list, return true if it is a palindrome or false otherwise.

**Input Format:**
- First line: n (size of linked list)
- Second line: n space-separated integers representing the list nodes

**Output Format:**
- "true" or "false"

**Constraints:**
- The number of nodes in the list is in the range [1, 10^5].
- 0 <= Node.val <= 9`
            },
            {
                title: 'Partition Labels',
                description: `You are given a string s. We want to partition the string into as many parts as possible so that each letter appears in at most one part.

Note that the partition is done so that after concatenating all the parts in order, the resultant string should be s.

Return a list of integers representing the size of these parts.

**Input Format:**
- A single string s.

**Output Format:**
- Space-separated integers representing the sizes of the parts.

**Constraints:**
- 1 <= s.length <= 500
- s consists of lowercase English letters.`
            },
            {
                title: 'Word Search',
                description: `Given an m x n grid of characters board and a string word, return true if word exists in the grid.

The word can be constructed from letters of sequentially adjacent cells, where adjacent cells are horizontally or vertically neighboring. The same letter cell may not be used more than once.

**Input Format:**
- First line: m n (rows and columns)
- Next m lines: n space-separated characters
- Last line: word string

**Output Format:**
- "true" or "false"

**Constraints:**
- m == board.length
- n = board[i].length
- 1 <= m, n <= 6
- 1 <= word.length <= 15
- board and word consists of only lowercase and uppercase English letters.`
            },
            {
                title: 'Split Array Largest Sum',
                description: `Given an integer array nums and an integer k, split nums into k non-empty subarrays such that the largest sum of any subarray is minimized.

Return the minimized largest sum of the split.

A subarray is a contiguous part of the array.

**Input Format:**
- First line: n (size of array)
- Second line: n space-separated integers
- Third line: k

**Output Format:**
- A single integer representing the minimized largest sum.

**Constraints:**
- 1 <= nums.length <= 1000
- 1 <= k <= min(50, nums.length)
- 0 <= nums[i] <= 10^6`
            },
            {
                title: 'Sliding Window Maximum',
                description: `You are given an array of integers nums, there is a sliding window of size k which is moving from the very left of the array to the very right. You can only see the k numbers in the window. Each time the sliding window moves right by one position.

Return the max sliding window.

**Input Format:**
- First line: n (size of array)
- Second line: n space-separated integers
- Third line: k

**Output Format:**
- Space-separated integers representing the maximums.

**Constraints:**
- 1 <= nums.length <= 10^5
- -10^4 <= nums[i] <= 10^4
- 1 <= k <= nums.length`
            },
            {
                title: 'Word Ladder',
                description: `A transformation sequence from word beginWord to word endWord using a dictionary wordList is a sequence of words beginWord -> s1 -> s2 -> ... -> sk such that:

- Every adjacent pair of words differs by a single letter.
- Every si for 1 <= i <= k is in wordList. Note that beginWord does not need to be in wordList.
- sk == endWord

Given two words, beginWord and endWord, and a dictionary wordList, return the number of words in the shortest transformation sequence from beginWord to endWord, or 0 if no such sequence exists.

**Input Format:**
- First line: beginWord
- Second line: endWord
- Third line: space-separated words in wordList

**Output Format:**
- A single integer representing the length of the sequence.

**Constraints:**
- 1 <= beginWord.length <= 10
- endWord.length == beginWord.length
- 1 <= wordList.length <= 5000
- wordList[i].length == beginWord.length
- beginWord, endWord, and wordList[i] consist of lowercase English letters.
- beginWord != endWord
- All the words in wordList are unique.`
            },
            {
                title: 'Largest Rectangle in Histogram',
                description: `Given an array of integers heights representing the histogram's bar height where the width of each bar is 1, return the area of the largest rectangle in the histogram.

**Input Format:**
- First line: n (number of bars)
- Second line: n space-separated integers (heights)

**Output Format:**
- A single integer representing the max area.

**Constraints:**
- 1 <= heights.length <= 10^5
- 0 <= heights[i] <= 10^4`
            },
            {
                title: 'Task Scheduler',
                description: `You are given an array of CPU tasks, each represented by letters A to Z, and a cooling time n. Each cycle or interval allows the completion of one task. Tasks can be completed in any order, but there's a constraint: identical tasks must be separated by at least n intervals due to cooling time.

Return the minimum number of intervals required to complete all tasks.

**Input Format:**
- First line: n (number of tasks)
- Second line: n space-separated characters (tasks)
- Third line: cooling time n

**Output Format:**
- A single integer representing the minimum intervals.

**Constraints:**
- 1 <= tasks.length <= 10^4
- tasks[i] is upper-case English letter.
- The integer n is in the range [0, 100].`
            },
            {
                title: 'Permutations',
                description: `Given an array nums of distinct integers, return all the possible permutations. You can return the answer in any order.

**Input Format:**
- First line: n (size of array)
- Second line: n space-separated integers

**Output Format:**
- Print each permutation on a new line. Elements space-separated.

**Constraints:**
- 1 <= nums.length <= 6
- -10 <= nums[i] <= 10
- All the integers of nums are unique.`
            },
            {
                title: 'Gas Station',
                description: `There are n gas stations along a circular route, where the amount of gas at the ith station is gas[i].

You have a car with an unlimited gas tank and it costs cost[i] of gas to travel from the ith station to its next (i + 1)th station. You begin the journey with an empty tank at one of the gas stations.

Given two integer arrays gas and cost, return the starting gas station's index if you can travel around the circuit once in the clockwise direction, otherwise return -1. If there exists a solution, it is guaranteed to be unique.

**Input Format:**
- First line: n (number of stations)
- Second line: n space-separated integers (gas)
- Third line: n space-separated integers (cost)

**Output Format:**
- A single integer representing the starting index or -1.

**Constraints:**
- n == gas.length == cost.length
- 1 <= n <= 10^5
- 0 <= gas[i], cost[i] <= 10^4`
            },
            {
                title: 'Combination Sum',
                description: `Given an array of distinct integers candidates and a target integer target, return a list of all unique combinations of candidates where the chosen numbers sum to target. You may return the combinations in any order.

The same number may be chosen from candidates an unlimited number of times. Two combinations are unique if the frequency of at least one of the chosen numbers is different.

**Input Format:**
- First line: n (size of array)
- Second line: n space-separated integers
- Third line: target

**Output Format:**
- Print each combination on a new line. Elements space-separated.

**Constraints:**
- 1 <= candidates.length <= 30
- 2 <= candidates[i] <= 40
- All elements of candidates are distinct.
- 1 <= target <= 40`
            },
            {
                title: 'Binary Tree Level Order Traversal',
                description: `Given the root of a binary tree, return the level order traversal of its nodes' values. (i.e., from left to right, level by level).

**Input Format:**
- Level order traversal of the tree as space-separated values. 'null' represents empty nodes.

**Output Format:**
- Print each level on a new line.

**Constraints:**
- The number of nodes in the tree is in the range [0, 2000].
- -1000 <= Node.val <= 1000`
            },
            {
                title: 'Ransom Note',
                description: `Given two strings ransomNote and magazine, return true if ransomNote can be constructed by using the letters from magazine and false otherwise.

Each letter in magazine can only be used once in ransomNote.

**Input Format:**
- First line: ransomNote
- Second line: magazine

**Output Format:**
- "true" or "false"

**Constraints:**
- 1 <= ransomNote.length, magazine.length <= 10^5
- ransomNote and magazine consist of lowercase English letters.`
            },
            {
                title: 'Median of Two Sorted Arrays',
                description: `Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.

The overall run time complexity should be O(log (m+n)).

**Input Format:**
- First line: m (size of nums1)
- Second line: m space-separated integers
- Third line: n (size of nums2)
- Fourth line: n space-separated integers

**Output Format:**
- A single float representing the median.

**Constraints:**
- nums1.length == m
- nums2.length == n
- 0 <= m <= 1000
- 0 <= n <= 1000
- 1 <= m + n <= 2000
- -10^6 <= nums1[i], nums2[i] <= 10^6`
            }
        ];

        let updatedCount = 0;

        for (const update of updates) {
            const result = await client.query(
                "UPDATE problems SET description = $1 WHERE title = $2 RETURNING problem_id",
                [update.description, update.title]
            );

            if (result.rows.length > 0) {
                console.log(`✅ Updated description for: ${update.title}`);
                updatedCount++;
            } else {
                console.log(`⚠️  Problem not found: ${update.title}`);
            }
        }

        console.log(`\nTotal descriptions updated: ${updatedCount}`);

    } catch (err) {
        console.error('Error:', err);
    } finally {
        client.release();
        await pool.end();
    }
}

fixDescriptions();
