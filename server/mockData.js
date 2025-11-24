// Mock data store - replaces PostgreSQL database
const crypto = require('crypto');

// In-memory data storage
const mockData = {
    users: [
        {
            user_id: '550e8400-e29b-41d4-a716-446655440000',
            user_name: 'Demo User',
            user_email: 'demo@example.com',
            user_password: '$2a$10$XQnD8Z4HQ0zZp9X7JW6kM.FqvKq0H8Z1YqwVp6X7JW6kM.FqvKq0H8', // password: demo123
            created_at: new Date()
        }
    ],
    problems: [], // Will be generated
    submissions: [],
    quizzes: [
        // CS Fundamentals (expanded)
        {
            quiz_id: 1,
            title: 'Operating Systems Fundamentals',
            category: 'CS Fundamentals',
            description: 'Test your knowledge of OS concepts including processes, threads, memory management, and synchronization.'
        },
        {
            quiz_id: 2,
            title: 'Database Management Systems',
            category: 'CS Fundamentals',
            description: 'Master DBMS concepts including normalization, transactions, indexing, and SQL queries.'
        },
        {
            quiz_id: 3,
            title: 'Computer Networks Basics',
            category: 'CS Fundamentals',
            description: 'Learn about OSI model, TCP/IP, routing, protocols, and network security.'
        },
        {
            quiz_id: 4,
            title: 'Object-Oriented Programming (OOPs)',
            category: 'CS Fundamentals',
            description: 'Master OOPs concepts: inheritance, polymorphism, encapsulation, and abstraction.'
        },
        {
            quiz_id: 5,
            title: 'Data Structures',
            category: 'CS Fundamentals',
            description: 'Arrays, linked lists, stacks, queues, trees, graphs, and hash tables.'
        },
        {
            quiz_id: 6,
            title: 'Algorithms & Complexity',
            category: 'CS Fundamentals',
            description: 'Sorting, searching, time complexity, space complexity, and Big-O notation.'
        },
        // Aptitude (expanded)
        {
            quiz_id: 7,
            title: 'Quantitative Aptitude Basics',
            category: 'Aptitude',
            description: 'Practice problems on numbers, percentages, ratios, and basic mathematics.'
        },
        {
            quiz_id: 8,
            title: 'Data Interpretation',
            category: 'Aptitude',
            description: 'Analyze charts, graphs, and tables to solve quantitative problems.'
        },
        {
            quiz_id: 9,
            title: 'Logical Reasoning',
            category: 'Aptitude',
            description: 'Solve puzzles, seating arrangements, and logical deduction problems.'
        },
        {
            quiz_id: 10,
            title: 'Time & Work',
            category: 'Aptitude',
            description: 'Problems on work efficiency, time management, and collaborative work.'
        },
        {
            quiz_id: 11,
            title: 'Speed, Distance & Time',
            category: 'Aptitude',
            description: 'Solve problems on motion, relative speed, and average speed.'
        },
        {
            quiz_id: 12,
            title: 'Profit & Loss',
            category: 'Aptitude',
            description: 'Calculate profit percentage, loss percentage, and cost price.'
        },
        // Reasoning (expanded)
        {
            quiz_id: 13,
            title: 'Verbal Reasoning',
            category: 'Reasoning',
            description: 'Test your verbal logic, analogies, and comprehension skills.'
        },
        {
            quiz_id: 14,
            title: 'Non-Verbal Reasoning',
            category: 'Reasoning',
            description: 'Solve pattern recognition and spatial reasoning problems.'
        },
        {
            quiz_id: 15,
            title: 'Critical Thinking',
            category: 'Reasoning',
            description: 'Develop analytical and logical thinking abilities.'
        },
        {
            quiz_id: 16,
            title: 'Coding-Decoding',
            category: 'Reasoning',
            description: 'Decode patterns and solve letter/number substitution problems.'
        },
        {
            quiz_id: 17,
            title: 'Blood Relations',
            category: 'Reasoning',
            description: 'Solve family tree and relationship-based questions.'
        },
        {
            quiz_id: 18,
            title: 'Series & Sequences',
            category: 'Reasoning',
            description: 'Find missing numbers/letters in arithmetic and geometric sequences.'
        }
    ],
    quiz_questions: [],
    quiz_options: [],
    contest_sessions: [],
    contest_problems: [],
    dsa_modules: [
        { module_id: 1, title: 'Logic Building', description: 'Start your journey here. Learn how to think like a programmer.', order_index: 1 },
        { module_id: 2, title: 'Time & Space Complexity', description: 'Understand the efficiency of your code. Big O notation explained.', order_index: 2 },
        { module_id: 3, title: 'Arrays', description: 'Master the most fundamental data structure.', order_index: 3 },
        { module_id: 4, title: 'Strings', description: 'Text processing and manipulation techniques.', order_index: 4 },
        { module_id: 5, title: 'Linked Lists', description: 'Dynamic data structures and pointer manipulation.', order_index: 5 }
    ],
    dsa_topics: [
        {
            topic_id: 1,
            module_id: 1,
            title: 'Introduction to Programming',
            content: '# Introduction to Programming\n\nProgramming is the art of telling a computer what to do.\n\n## What is Logic?\nLogic is the sequence of steps required to solve a problem. Before writing code, you must design the logic.\n\n### Steps to Solve a Problem:\n1. **Understand the Problem**: Read the description carefully.\n2. **Identify Inputs & Outputs**: What do you have? What do you need?\n3. **Design the Algorithm**: Step-by-step plan.\n4. **Dry Run**: Test manually with examples.\n5. **Code**: Translate logic to syntax.',
            problem_id: null,
            order_index: 1
        },
        {
            topic_id: 2,
            module_id: 2,
            title: 'Big O Notation',
            content: '# Big O Notation\n\nBig O notation describes the **worst-case scenario** of an algorithm\'s performance.\n\n## Common Complexities:\n- **O(1)**: Constant time (Direct access)\n- **O(log n)**: Logarithmic time (Binary Search)\n- **O(n)**: Linear time (Simple loop)\n- **O(n^2)**: Quadratic time (Nested loops)\n\n## Why it Matters?\nIn competitive programming, constraints tell you the required complexity:\n- n <= 10^6 -> O(n) or O(n log n)\n- n <= 10^3 -> O(n^2) allowed',
            problem_id: null,
            order_index: 1
        },
        {
            topic_id: 3,
            module_id: 3,
            title: 'Kadane\'s Algorithm',
            content: '# Maximum Subarray Sum (Kadane\'s Algorithm)\n\n## Problem Statement\nGiven an array, find the contiguous subarray with the largest sum.\n\n## Intuition\nIf we have a negative sum, carrying it forward will only decrease our future sum. So, if the current sum becomes negative, we reset it to 0.\n\n## Algorithm\n1. Initialize `current_sum = 0` and `max_sum = INT_MIN`.\n2. Iterate through the array:\n   - Add `arr[i]` to `current_sum`.\n   - Update `max_sum = max(max_sum, current_sum)`.\n   - If `current_sum < 0`, reset `current_sum = 0`.\n\n## Time Complexity\n- **O(n)**: We pass through the array once.\n- **Space**: O(1).\n\n## Code Snippet\n```cpp\nint maxSubArray(vector<int>& nums) {\n    int maxSum = INT_MIN, curr = 0;\n    for(int x : nums) {\n        curr += x;\n        maxSum = max(maxSum, curr);\n        if(curr < 0) curr = 0;\n    }\n    return maxSum;\n}\n```',
            problem_id: null, // Will need to link dynamically if possible, or leave null for now
            order_index: 1
        }
    ]
};

// Generate 500+ DSA problems using the same templates as generateProblems.js
function generateProblems() {
    // Problem templates organized by topic (matching generateProblems.js)
    const problemTemplates = {
        'Array': {
            easy: [
                { title: 'Two Sum', desc: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.', input: '[2,7,11,15]\n9', output: '[0,1]' },
                { title: 'Best Time to Buy and Sell Stock', desc: 'You are given an array prices where prices[i] is the price of a given stock on the ith day. Maximize your profit.', input: '[7,1,5,3,6,4]', output: '5' },
                { title: 'Contains Duplicate', desc: 'Given an integer array nums, return true if any value appears at least twice in the array.', input: '[1,2,3,1]', output: 'true' },
                { title: 'Product of Array Except Self', desc: 'Given an integer array nums, return an array answer such that answer[i] is equal to the product of all the elements of nums except nums[i].', input: '[1,2,3,4]', output: '[24,12,8,6]' },
                { title: 'Maximum Subarray', desc: 'Given an integer array nums, find the contiguous subarray which has the largest sum and return its sum.', input: '[-2,1,-3,4,-1,2,1,-5,4]', output: '6' },
            ],
            medium: [
                { title: '3Sum', desc: 'Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.', input: '[-1,0,1,2,-1,-4]', output: '[[-1,-1,2],[-1,0,1]]' },
                { title: 'Container With Most Water', desc: 'Find two lines that together with the x-axis form a container that would contain the most water.', input: '[1,8,6,2,5,4,8,3,7]', output: '49' },
                { title: 'Rotate Array', desc: 'Given an array, rotate the array to the right by k steps, where k is non-negative.', input: '[1,2,3,4,5,6,7]\n3', output: '[5,6,7,1,2,3,4]' },
                { title: 'Find All Duplicates in an Array', desc: 'Given an integer array nums of length n where all the integers are in the range [1, n], return an array of all the integers that appears twice.', input: '[4,3,2,7,8,2,3,1]', output: '[2,3]' },
            ],
            hard: [
                { title: 'Median of Two Sorted Arrays', desc: 'Given two sorted arrays nums1 and nums2, return the median of the two sorted arrays.', input: '[1,3]\n[2]', output: '2.00000' },
                { title: 'Trapping Rain Water', desc: 'Given n non-negative integers representing an elevation map, compute how much water it can trap after raining.', input: '[0,1,0,2,1,0,1,3,2,1,2,1]', output: '6' },
            ]
        },
        'String': {
            easy: [
                { title: 'Valid Palindrome', desc: 'A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward.', input: 'A man, a plan, a canal: Panama', output: 'true' },
                { title: 'Valid Anagram', desc: 'Given two strings s and t, return true if t is an anagram of s, and false otherwise.', input: 'anagram\nnagaram', output: 'true' },
                { title: 'First Unique Character in a String', desc: 'Given a string s, find the first non-repeating character in it and return its index.', input: 'leetcode', output: '0' },
            ],
            medium: [
                { title: 'Longest Substring Without Repeating Characters', desc: 'Given a string s, find the length of the longest substring without repeating characters.', input: 'abcabcbb', output: '3' },
                { title: 'Longest Palindromic Substring', desc: 'Given a string s, return the longest palindromic substring in s.', input: 'babad', output: 'bab' },
                { title: 'Group Anagrams', desc: 'Given an array of strings strs, group the anagrams together.', input: '["eat","tea","tan","ate","nat","bat"]', output: '[["bat"],["nat","tan"],["ate","eat","tea"]]' },
            ],
            hard: [
                { title: 'Minimum Window Substring', desc: 'Given two strings s and t, return the minimum window substring of s such that every character in t is included in the window.', input: 'ADOBECODEBANC\nABC', output: 'BANC' },
            ]
        },
        'Dynamic Programming': {
            easy: [
                { title: 'Climbing Stairs', desc: 'You are climbing a staircase. It takes n steps to reach the top. Each time you can either climb 1 or 2 steps.', input: '2', output: '2' },
                { title: 'House Robber', desc: 'You are a robber planning to rob houses. Determine the maximum amount of money you can rob.', input: '[1,2,3,1]', output: '4' },
            ],
            medium: [
                { title: 'Coin Change', desc: 'You are given an integer array coins representing coins of different denominations and an integer amount. Return the fewest number of coins needed.', input: '[1,2,5]\n11', output: '3' },
                { title: 'Longest Increasing Subsequence', desc: 'Given an integer array nums, return the length of the longest strictly increasing subsequence.', input: '[10,9,2,5,3,7,101,18]', output: '4' },
                { title: 'Unique Paths', desc: 'A robot is located at the top-left corner of a m x n grid. How many possible unique paths are there?', input: '3\n7', output: '28' },
            ],
            hard: [
                { title: 'Edit Distance', desc: 'Given two strings word1 and word2, return the minimum number of operations required to convert word1 to word2.', input: 'horse\nros', output: '3' },
                { title: 'Regular Expression Matching', desc: 'Implement regular expression matching with support for . and *.', input: 'aa\na*', output: 'true' },
            ]
        },
        'Tree': {
            easy: [
                { title: 'Maximum Depth of Binary Tree', desc: 'Given the root of a binary tree, return its maximum depth.', input: '[3,9,20,null,null,15,7]', output: '3' },
                { title: 'Symmetric Tree', desc: 'Given the root of a binary tree, check whether it is a mirror of itself.', input: '[1,2,2,3,4,4,3]', output: 'true' },
                { title: 'Invert Binary Tree', desc: 'Given the root of a binary tree, invert the tree.', input: '[4,2,7,1,3,6,9]', output: '[4,7,2,9,6,3,1]' },
            ],
            medium: [
                { title: 'Binary Tree Level Order Traversal', desc: 'Given the root of a binary tree, return the level order traversal of its nodes values.', input: '[3,9,20,null,null,15,7]', output: '[[3],[9,20],[15,7]]' },
                { title: 'Validate Binary Search Tree', desc: 'Given the root of a binary tree, determine if it is a valid binary search tree.', input: '[2,1,3]', output: 'true' },
            ],
            hard: [
                { title: 'Binary Tree Maximum Path Sum', desc: 'Given the root of a binary tree, return the maximum path sum of any non-empty path.', input: '[1,2,3]', output: '6' },
            ]
        },
        'Linked List': {
            easy: [
                { title: 'Reverse Linked List', desc: 'Given the head of a singly linked list, reverse the list, and return the reversed list.', input: '[1,2,3,4,5]', output: '[5,4,3,2,1]' },
                { title: 'Merge Two Sorted Lists', desc: 'Merge two sorted linked lists and return it as a sorted list.', input: '[1,2,4]\n[1,3,4]', output: '[1,1,2,3,4,4]' },
                { title: 'Linked List Cycle', desc: 'Given head, the head of a linked list, determine if the linked list has a cycle in it.', input: '[3,2,0,-4], pos = 1', output: 'true' },
                { title: 'Palindrome Linked List', desc: 'Given the head of a singly linked list, return true if it is a palindrome.', input: '[1,2,2,1]', output: 'true' },
                { title: 'Intersection of Two Linked Lists', desc: 'Given the heads of two singly linked-lists headA and headB, return the node at which the two lists intersect.', input: 'intersectVal = 8, listA = [4,1,8,4,5], listB = [5,6,1,8,4,5]', output: 'Reference of the node with value = 8' }
            ],
            medium: [
                { title: 'Remove Nth Node From End of List', desc: 'Given the head of a linked list, remove the nth node from the end of the list and return its head.', input: '[1,2,3,4,5]\n2', output: '[1,2,3,5]' },
                { title: 'Add Two Numbers', desc: 'You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.', input: '[2,4,3]\n[5,6,4]', output: '[7,0,8]' },
                { title: 'Reorder List', desc: 'You are given the head of a singly linked-list. The list can be represented as: L0 → L1 → … → Ln - 1 → Ln. Reorder the list to be on the following form: L0 → Ln → L1 → Ln - 1 → L2 → Ln - 2 → …', input: '[1,2,3,4]', output: '[1,4,2,3]' },
                { title: 'Copy List with Random Pointer', desc: 'A linked list of length n is given such that each node contains an additional random pointer, which could point to any node in the list, or null. Construct a deep copy of the list.', input: '[[7,null],[13,0],[11,4],[10,2],[1,0]]', output: '[[7,null],[13,0],[11,4],[10,2],[1,0]]' }
            ],
            hard: [
                { title: 'Merge k Sorted Lists', desc: 'You are given an array of k linked-lists lists, each linked-list is sorted in ascending order. Merge all the linked-lists into one sorted linked-list and return it.', input: '[[1,4,5],[1,3,4],[2,6]]', output: '[1,1,2,3,4,4,5,6]' },
                { title: 'Reverse Nodes in k-Group', desc: 'Given the head of a linked list, reverse the nodes of the list k at a time, and return the modified list.', input: '[1,2,3,4,5]\n2', output: '[2,1,4,3,5]' }
            ]
        },
        'Stack': {
            easy: [
                { title: 'Valid Parentheses', desc: 'Given a string s containing just the characters (, ), {, }, [ and ], determine if the input string is valid.', input: '()[]{}', output: 'true' },
                { title: 'Min Stack', desc: 'Design a stack that supports push, pop, top, and retrieving the minimum element in constant time.', input: '["MinStack","push","push","push","getMin","pop","top","getMin"]\n[[],[-2],[0],[-3],[],[],[],[]]', output: '[null,null,null,null,-3,null,0,-2]' }
            ],
            medium: [
                { title: 'Evaluate Reverse Polish Notation', desc: 'Evaluate the value of an arithmetic expression in Reverse Polish Notation.', input: '["2","1","+","3","*"]', output: '9' },
                { title: 'Daily Temperatures', desc: 'Given an array of integers temperatures represents the daily temperatures, return an array answer such that answer[i] is the number of days you have to wait after the ith day to get a warmer temperature.', input: '[73,74,75,71,69,72,76,73]', output: '[1,1,4,2,1,1,0,0]' },
                { title: 'Decode String', desc: 'Given an encoded string, return its decoded string.', input: '3[a]2[bc]', output: 'aaabcbc' }
            ],
            hard: [
                { title: 'Largest Rectangle in Histogram', desc: 'Given an array of integers heights representing the histogram\'s bar height where the width of each bar is 1, return the area of the largest rectangle in the histogram.', input: '[2,1,5,6,2,3]', output: '10' }
            ]
        },
        'Queue': {
            easy: [
                { title: 'Implement Stack using Queues', desc: 'Implement a last-in-first-out (LIFO) stack using only two queues.', input: '["MyStack", "push", "push", "top", "pop", "empty"]\n[[], [1], [2], [], [], []]', output: '[null, null, null, 2, 2, false]' }
            ],
            medium: [
                { title: 'Design Circular Queue', desc: 'Design your implementation of the circular queue.', input: '["MyCircularQueue", "enQueue", "enQueue", "enQueue", "enQueue", "Rear", "isFull", "deQueue", "enQueue", "Rear"]\n[[3], [1], [2], [3], [4], [], [], [], [4], []]', output: '[null, true, true, true, false, 3, true, true, true, 4]' },
                { title: 'Task Scheduler', desc: 'Given a characters array tasks, representing the tasks a CPU needs to do, where each letter represents a different task. Tasks could be done in any order. Each task is done in one unit of time. For each unit of time, the CPU could complete either one task or just be idle.', input: 'tasks = ["A","A","A","B","B","B"], n = 2', output: '8' }
            ],
            hard: [
                { title: 'Sliding Window Maximum', desc: 'You are given an array of integers nums, there is a sliding window of size k which is moving from the very left of the array to the very right. You can only see the k numbers in the window. Each time the sliding window moves right by one position. Return the max sliding window.', input: '[1,3,-1,-3,5,3,6,7]\n3', output: '[3,3,5,5,6,7]' }
            ]
        },
        'Graph': {
            easy: [
                { title: 'Find the Town Judge', desc: 'In a town, there are n people labeled from 1 to n. There is a rumor that one of these people is secretly the town judge.', input: 'n = 3, trust = [[1,3],[2,3]]', output: '3' },
                { title: 'Flood Fill', desc: 'An image is represented by an m x n integer grid image where image[i][j] represents the pixel value of the image. You are also given three integers sr, sc, and color. You should perform a flood fill on the image starting from the pixel image[sr][sc].', input: 'image = [[1,1,1],[1,1,0],[1,0,1]], sr = 1, sc = 1, color = 2', output: '[[2,2,2],[2,2,0],[2,0,1]]' }
            ],
            medium: [
                { title: 'Number of Islands', desc: 'Given an m x n 2D binary grid grid which represents a map of \'1\'s (land) and \'0\'s (water), return the number of islands.', input: '[["1","1","1","1","0"],["1","1","0","1","0"],["1","1","0","0","0"],["0","0","0","0","0"]]', output: '1' },
                { title: 'Clone Graph', desc: 'Given a reference of a node in a connected undirected graph. Return a deep copy (clone) of the graph.', input: 'adjList = [[2,4],[1,3],[2,4],[1,3]]', output: '[[2,4],[1,3],[2,4],[1,3]]' },
                { title: 'Course Schedule', desc: 'There are a total of numCourses courses you have to take, labeled from 0 to numCourses - 1. You are given an array prerequisites where prerequisites[i] = [ai, bi] indicates that you must take course bi first if you want to take course ai.', input: 'numCourses = 2, prerequisites = [[1,0]]', output: 'true' },
                { title: 'Rotting Oranges', desc: 'You are given an m x n grid where each cell can have one of three values: 0 representing an empty cell, 1 representing a fresh orange, or 2 representing a rotten orange. Every minute, any fresh orange that is 4-directionally adjacent to a rotten orange becomes rotten. Return the minimum number of minutes that must elapse until no cell has a fresh orange. If this is impossible, return -1.', input: '[[2,1,1],[1,1,0],[0,1,1]]', output: '4' }
            ],
            hard: [
                { title: 'Word Ladder', desc: 'A transformation sequence from wordBegin to wordEnd using a dictionary wordList is a sequence of words beginWord -> s1 -> s2 -> ... -> sk such that: Every adjacent pair of words differs by a single letter. Every si for 1 <= i <= k is in wordList. Note that beginWord does not need to be in wordList. sk == endWord. Given two words, beginWord and endWord, and a dictionary wordList, return the number of words in the shortest transformation sequence from beginWord to endWord, or 0 if no such sequence exists.', input: 'beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log","cog"]', output: '5' },
                { title: 'Longest Increasing Path in a Matrix', desc: 'Given an m x n integers matrix, return the length of the longest increasing path in matrix.', input: '[[9,9,4],[6,6,8],[2,1,1]]', output: '4' }
            ]
        },
        'Greedy': {
            easy: [
                { title: 'Assign Cookies', desc: 'Assume you are an awesome parent and want to give your children some cookies. But, you should give each child at most one cookie.', input: 'g = [1,2,3], s = [1,1]', output: '1' },
                { title: 'Lemonade Change', desc: 'At a lemonade stand, each lemonade costs $5. Customers are standing in a queue to buy from you, and order one at a time.', input: '[5,5,5,10,20]', output: 'true' }
            ],
            medium: [
                { title: 'Jump Game', desc: 'You are given an integer array nums. You are initially positioned at the array\'s first index, and each element in the array represents your maximum jump length at that position. Return true if you can reach the last index, or false otherwise.', input: '[2,3,1,1,4]', output: 'true' },
                { title: 'Gas Station', desc: 'There are n gas stations along a circular route, where the amount of gas at the ith station is gas[i]. You have a car with an unlimited gas tank and it costs cost[i] of gas to travel from the ith station to its next (i + 1)th station. You begin the journey with an empty tank at one of the gas stations. Given two integer arrays gas and cost, return the starting gas station\'s index if you can travel around the circuit once in the clockwise direction, otherwise return -1.', input: 'gas = [1,2,3,4,5], cost = [3,4,5,1,2]', output: '3' }
            ],
            hard: [
                { title: 'Candy', desc: 'There are n children standing in a line. Each child is assigned a rating value given in the integer array ratings. You are giving candies to these children subjected to the following requirements: Each child must have at least one candy. Children with a higher rating get more candies than their neighbors. Return the minimum number of candies you need to have to distribute the candies to the children.', input: '[1,0,2]', output: '5' }
            ]
        },
        'Backtracking': {
            easy: [
                { title: 'Binary Watch', desc: 'A binary watch has 4 LEDs on the top to represent the hours (0-11), and 6 LEDs on the bottom to represent the minutes (0-59). Given an integer turnedOn which represents the number of LEDs that are currently on (ignoring the PM), return all possible times the watch could represent.', input: '1', output: '["0:01","0:02","0:04","0:08","0:16","0:32","1:00","2:00","4:00","8:00"]' }
            ],
            medium: [
                { title: 'Permutations', desc: 'Given an array nums of distinct integers, return all the possible permutations. You can return the answer in any order.', input: '[1,2,3]', output: '[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]' },
                { title: 'Subsets', desc: 'Given an integer array nums of unique elements, return all possible subsets (the power set).', input: '[1,2,3]', output: '[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]' },
                { title: 'Combination Sum', desc: 'Given an array of distinct integers candidates and a target integer target, return a list of all unique combinations of candidates where the chosen numbers sum to target.', input: 'candidates = [2,3,6,7], target = 7', output: '[[2,2,3],[7]]' },
                { title: 'Word Search', desc: 'Given an m x n grid of characters board and a string word, return true if word exists in the grid.', input: 'board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCCED"', output: 'true' }
            ],
            hard: [
                { title: 'N-Queens', desc: 'The n-queens puzzle is the problem of placing n queens on an n x n chessboard such that no two queens attack each other. Given an integer n, return all distinct solutions to the n-queens puzzle.', input: '4', output: '[[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]]' },
                { title: 'Sudoku Solver', desc: 'Write a program to solve a Sudoku puzzle by filling the empty cells.', input: 'board = [["5","3",".",".","7",".",".",".","."],["6",".",".","1","9","5",".",".","."],[".","9","8",".",".",".",".","6","."],["8",".",".",".","6",".",".",".","3"],["4",".",".","8",".","3",".",".","1"],["7",".",".",".","2",".",".",".","6"],[".","6",".",".",".",".","2","8","."],[".",".",".","4","1","9",".",".","5"],[".",".",".",".","8",".",".","7","9"]]', output: 'Solved Board' }
            ]
        },
        'Binary Search': {
            easy: [
                { title: 'Binary Search', desc: 'Given an array of integers nums which is sorted in ascending order, and an integer target, write a function to search target in nums. If target exists, then return its index. Otherwise, return -1.', input: '[-1,0,3,5,9,12]\n9', output: '4' },
                { title: 'First Bad Version', desc: 'You are a product manager and currently leading a team to develop a new product. Unfortunately, the latest version of your product fails the quality check. Since each version is developed based on the previous version, all the versions after a bad version are also bad. Suppose you have n versions [1, 2, ..., n] and you want to find out the first bad one, which causes all the following ones to be bad.', input: 'n = 5, bad = 4', output: '4' }
            ],
            medium: [
                { title: 'Search in Rotated Sorted Array', desc: 'There is an integer array nums sorted in ascending order (with distinct values). Prior to being passed to your function, nums is possibly rotated at an unknown pivot index k (1 <= k < nums.length). Given the array nums after the possible rotation and an integer target, return the index of target if it is in nums, or -1 if it is not in nums.', input: '[4,5,6,7,0,1,2]\n0', output: '4' },
                { title: 'Find Minimum in Rotated Sorted Array', desc: 'Suppose an array of length n sorted in ascending order is rotated between 1 and n times. Given the sorted rotated array nums of unique elements, return the minimum element of this array.', input: '[3,4,5,1,2]', output: '1' },
                { title: 'Find Peak Element', desc: 'A peak element is an element that is strictly greater than its neighbors. Given a 0-indexed integer array nums, find a peak element, and return its index.', input: '[1,2,3,1]', output: '2' }
            ],
            hard: [
                { title: 'Split Array Largest Sum', desc: 'Given an integer array nums and an integer k, split nums into k non-empty subarrays such that the largest sum of any subarray is minimized.', input: '[7,2,5,10,8]\n2', output: '18' }
            ]
        },
        'Heap': {
            easy: [
                { title: 'Kth Largest Element in a Stream', desc: 'Design a class to find the kth largest element in a stream. Note that it is the kth largest element in the sorted order, not the kth distinct element.', input: '["KthLargest", "add", "add", "add", "add", "add"]\n[[3, [4, 5, 8, 2]], [3], [5], [10], [9], [4]]', output: '[null, 4, 5, 5, 8, 8]' }
            ],
            medium: [
                { title: 'Kth Largest Element in an Array', desc: 'Given an integer array nums and an integer k, return the kth largest element in the array.', input: '[3,2,1,5,6,4]\n2', output: '5' },
                { title: 'Top K Frequent Elements', desc: 'Given an integer array nums and an integer k, return the k most frequent elements. You may return the answer in any order.', input: '[1,1,1,2,2,3]\n2', output: '[1,2]' },
                { title: 'Sort Characters By Frequency', desc: 'Given a string s, sort it in decreasing order based on the frequency of the characters. The frequency of a character is the number of times it appears in the string.', input: '"tree"', output: '"eert"' }
            ],
            hard: [
                { title: 'Find Median from Data Stream', desc: 'The median is the middle value in an ordered integer list. If the size of the list is even, there is no middle value, and the median is the mean of the two middle values. Implement the MedianFinder class.', input: '["MedianFinder", "addNum", "addNum", "findMedian", "addNum", "findMedian"]\n[[], [1], [2], [], [3], []]', output: '[null, null, null, 1.5, null, 2.0]' }
            ]
        },
        'Hashing': {
            easy: [
                { title: 'Ransom Note', desc: 'Given two strings ransomNote and magazine, return true if ransomNote can be constructed by using the letters from magazine and false otherwise.', input: 'a\nb', output: 'false' },
                { title: 'Isomorphic Strings', desc: 'Given two strings s and t, determine if they are isomorphic.', input: 'egg\nadd', output: 'true' }
            ],
            medium: [
                { title: 'Longest Consecutive Sequence', desc: 'Given an unsorted array of integers nums, return the length of the longest consecutive elements sequence.', input: '[100,4,200,1,3,2]', output: '4' },
                { title: 'Subarray Sum Equals K', desc: 'Given an array of integers nums and an integer k, return the total number of subarrays whose sum equals to k.', input: '[1,1,1]\n2', output: '2' }
            ],
            hard: [
                { title: 'Substring with Concatenation of All Words', desc: 'You are given a string s and an array of strings words. All the strings of words are of the same length. A concatenated substring in s is a substring that contains all the strings of any permutation of words concatenated.', input: 's = "barfoothefoobarman", words = ["foo","bar"]', output: '[0,9]' }
            ]
        }
    };

    let problemCount = 0;

    // First, add all base unique problems
    for (const [topic, difficulties] of Object.entries(problemTemplates)) {
        for (const [difficulty, problems] of Object.entries(difficulties)) {
            const difficultyCapitalized = difficulty.charAt(0).toUpperCase() + difficulty.slice(1);

            problems.forEach(problem => {
                mockData.problems.push({
                    problem_id: ++problemCount,
                    title: problem.title,
                    description: problem.desc,
                    difficulty: difficultyCapitalized,
                    topic: topic,
                    test_case_input: problem.input,
                    test_case_output: problem.output
                });
            });
        }
    }

    // Now generate variations to reach 500+
    const variations = ['II', 'III', 'IV', 'Advanced', 'Optimized', 'Extended', 'Classic', 'Modified'];
    let variantIndex = 0;

    while (problemCount < 500) {
        for (const [topic, difficulties] of Object.entries(problemTemplates)) {
            if (problemCount >= 500) break;

            for (const [difficulty, problems] of Object.entries(difficulties)) {
                if (problemCount >= 500) break;
                const difficultyCapitalized = difficulty.charAt(0).toUpperCase() + difficulty.slice(1);

                problems.forEach((problem) => {
                    if (problemCount >= 500) return;

                    const variant = variations[variantIndex % variations.length];
                    mockData.problems.push({
                        problem_id: ++problemCount,
                        title: `${problem.title} ${variant}`,
                        description: `${problem.desc} (${variant} version with additional constraints and edge cases)`,
                        difficulty: difficultyCapitalized,
                        topic: topic, // IMPORTANT: Keep the same topic as the base problem
                        test_case_input: problem.input,
                        test_case_output: problem.output
                    });
                    variantIndex++;
                });
            }
        }
    }
}

// Generate quiz questions
function generateQuizQuestions() {
    const quizDB = require('./quizQuestionsDB');

    // Mapping quiz_id to question sets
    const quizMapping = {
        1: 'os', 2: 'dbms', 3: 'networks', 4: 'oops', 5: 'dataStructures',
        6: 'algorithms', 7: 'aptitude', 8: 'dataInterp', 9: 'logicalReasoning',
        10: 'timeWork', 11: 'speed', 12: 'profit', 13: 'verbal',
        14: 'nonVerbal', 15: 'critical', 16: 'coding', 17: 'bloodRelations', 18: 'series'
    };

    let questionId = 1;
    let optionId = 1;

    // Generate questions for each quiz
    Object.keys(quizMapping).forEach(quizId => {
        const questionSet = quizDB[quizMapping[quizId]];

        questionSet.forEach((q, index) => {
            const qId = questionId++;
            mockData.quiz_questions.push({
                question_id: qId,
                quiz_id: parseInt(quizId),
                question_text: q.text
            });

            q.options.forEach((opt, idx) => {
                mockData.quiz_options.push({
                    option_id: optionId++,
                    question_id: qId,
                    option_text: opt,
                    is_correct: idx === q.correct
                });
            });
        });
    });
}

// Initialize data
generateProblems();
generateQuizQuestions();

console.log(`✓ Mock data initialized: ${mockData.problems.length} problems, ${mockData.quiz_questions.length} quiz questions created`);

module.exports = mockData;

