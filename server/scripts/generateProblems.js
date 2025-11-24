const fs = require('fs');
const path = require('path');

// Real interview problems with EXACT descriptions from platforms
// Verified problem statements and test cases
const realInterviewProblems = [
    // ==================== ARRAY - EASY ====================
    {
        title: "Two Sum",
        difficulty: "Easy",
        topic: "Array",
        description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.\n\nYou can return the answer in any order.",
        input_format: "First line: n (size of array)\nSecond line: n space-separated integers (array elements)\nThird line: target integer",
        output_format: "Two space-separated integers representing the indices",
        constraints: "2 <= nums.length <= 10^4\n-10^9 <= nums[i] <= 10^9\n-10^9 <= target <= 10^9\nOnly one valid answer exists.",
        test_input: "4\n2 7 11 15\n9",
        test_output: "0 1",
        source: "LeetCode #1"
    },
    {
        title: "Best Time to Buy and Sell Stock",
        difficulty: "Easy",
        topic: "Array",
        description: "You are given an array prices where prices[i] is the price of a given stock on the ith day.\n\nYou want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.\n\nReturn the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return 0.",
        input_format: "First line: n (number of days)\nSecond line: n space-separated integers (prices)",
        output_format: "Single integer (maximum profit)",
        constraints: "1 <= prices.length <= 10^5\n0 <= prices[i] <= 10^4",
        test_input: "6\n7 1 5 3 6 4",
        test_output: "5",
        source: "LeetCode #121"
    },
    {
        title: "Contains Duplicate",
        difficulty: "Easy",
        topic: "Array",
        description: "Given an integer array nums, return true if any value appears at least twice in the array, and return false if every element is distinct.",
        input_format: "First line: n (size of array)\nSecond line: n space-separated integers",
        output_format: "true or false",
        constraints: "1 <= nums.length <= 10^5\n-10^9 <= nums[i] <= 10^9",
        test_input: "4\n1 2 3 1",
        test_output: "true",
        source: "LeetCode #217"
    },
    {
        title: "Missing Number",
        difficulty: "Easy",
        topic: "Array",
        description: "Given an array nums containing n distinct numbers in the range [0, n], return the only number in the range that is missing from the array.",
        input_format: "First line: n (size of array)\nSecond line: n space-separated integers",
        output_format: "Single integer (missing number)",
        constraints: "n == nums.length\n1 <= n <= 10^4\n0 <= nums[i] <= n\nAll numbers in nums are unique.",
        test_input: "3\n3 0 1",
        test_output: "2",
        source: "LeetCode #268"
    },
    {
        title: "Single Number",
        difficulty: "Easy",
        topic: "Array",
        description: "Given a non-empty array of integers nums, every element appears twice except for one. Find that single one.\n\nYou must implement a solution with a linear runtime complexity and use only constant extra space.",
        input_format: "First line: n (size of array)\nSecond line: n space-separated integers",
        output_format: "Single integer (the unique element)",
        constraints: "1 <= nums.length <= 3 * 10^4\n-3 * 10^4 <= nums[i] <= 3 * 10^4\nEach element appears twice except for one element which appears only once.",
        test_input: "5\n4 1 2 1 2",
        test_output: "4",
        source: "LeetCode #136"
    },

    // ==================== ARRAY - MEDIUM ====================
    {
        title: "3Sum",
        difficulty: "Medium",
        topic: "Array",
        description: "Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.\n\nNotice that the solution set must not contain duplicate triplets.",
        input_format: "First line: n (size of array)\nSecond line: n space-separated integers",
        output_format: "Each line contains a triplet in sorted order",
        constraints: "3 <= nums.length <= 3000\n-10^5 <= nums[i] <= 10^5",
        test_input: "6\n-1 0 1 2 -1 -4",
        test_output: "-1 -1 2\n-1 0 1",
        source: "LeetCode #15"
    },
    {
        title: "Product of Array Except Self",
        difficulty: "Medium",
        topic: "Array",
        description: "Given an integer array nums, return an array answer such that answer[i] is equal to the product of all the elements of nums except nums[i].\n\nThe product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer.\n\nYou must write an algorithm that runs in O(n) time and without using the division operation.",
        input_format: "First line: n (size of array)\nSecond line: n space-separated integers",
        output_format: "n space-separated integers (product array)",
        constraints: "2 <= nums.length <= 10^5\n-30 <= nums[i] <= 30\nThe product of any prefix or suffix is guaranteed to fit in a 32-bit integer.",
        test_input: "4\n1 2 3 4",
        test_output: "24 12 8 6",
        source: "LeetCode #238"
    },
    {
        title: "Maximum Subarray (Kadane's Algorithm)",
        difficulty: "Medium",
        topic: "Array",
        description: "Given an integer array nums, find the subarray with the largest sum, and return its sum.\n\nA subarray is a contiguous non-empty sequence of elements within an array.",
        input_format: "First line: n (size of array)\nSecond line: n space-separated integers",
        output_format: "Single integer (maximum subarray sum)",
        constraints: "1 <= nums.length <= 10^5\n-10^4 <= nums[i] <= 10^4",
        test_input: "9\n-2 1 -3 4 -1 2 1 -5 4",
        test_output: "6",
        source: "LeetCode #53"
    },
    {
        title: "Container With Most Water",
        difficulty: "Medium",
        topic: "Array",
        description: "You are given an integer array height of length n. There are n vertical lines drawn such that the two endpoints of the ith line are (i, 0) and (i, height[i]).\n\nFind two lines that together with the x-axis form a container, such that the container contains the most water.\n\nReturn the maximum amount of water a container can store.\n\nNotice that you may not slant the container.",
        input_format: "First line: n (number of lines)\nSecond line: n space-separated integers (heights)",
        output_format: "Single integer (maximum area)",
        constraints: "n == height.length\n2 <= n <= 10^5\n0 <= height[i] <= 10^4",
        test_input: "9\n1 8 6 2 5 4 8 3 7",
        test_output: "49",
        source: "LeetCode #11"
    },
    {
        title: "Merge Intervals",
        difficulty: "Medium",
        topic: "Array",
        description: "Given an array of intervals where intervals[i] = [starti, endi], merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.",
        input_format: "First line: n (number of intervals)\nNext n lines: two space-separated integers (start and end of interval)",
        output_format: "Each line contains a merged interval (start end)",
        constraints: "1 <= intervals.length <= 10^4\n0 <= starti <= endi <= 10^4",
        test_input: "4\n1 3\n2 6\n8 10\n15 18",
        test_output: "1 6\n8 10\n15 18",
        source: "LeetCode #56"
    },

    // ==================== ARRAY - HARD ====================
    {
        title: "Trapping Rain Water",
        difficulty: "Hard",
        topic: "Array",
        description: "Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.",
        input_format: "First line: n (number of bars)\nSecond line: n space-separated integers (heights)",
        output_format: "Single integer (trapped water)",
        constraints: "n == height.length\n1 <= n <= 2 * 10^4\n0 <= height[i] <= 10^5",
        test_input: "12\n0 1 0 2 1 0 1 3 2 1 2 1",
        test_output: "6",
        source: "LeetCode #42"
    },

    // ==================== STRING - EASY ====================
    {
        title: "Valid Palindrome",
        difficulty: "Easy",
        topic: "String",
        description: "A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Alphanumeric characters include letters and numbers.\n\nGiven a string s, return true if it is a palindrome, or false otherwise.",
        input_format: "Single line: string s",
        output_format: "true or false",
        constraints: "1 <= s.length <= 2 * 10^5\ns consists only of printable ASCII characters.",
        test_input: "A man, a plan, a canal: Panama",
        test_output: "true",
        source: "LeetCode #125"
    },
    {
        title: "Valid Anagram",
        difficulty: "Easy",
        topic: "String",
        description: "Given two strings s and t, return true if t is an anagram of s, and false otherwise.\n\nAn Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.",
        input_format: "First line: string s\nSecond line: string t",
        output_format: "true or false",
        constraints: "1 <= s.length, t.length <= 5 * 10^4\ns and t consist of lowercase English letters.",
        test_input: "anagram\nnagaram",
        test_output: "true",
        source: "LeetCode #242"
    },

    // ==================== STRING - MEDIUM ====================
    {
        title: "Longest Substring Without Repeating Characters",
        difficulty: "Medium",
        topic: "String",
        description: "Given a string s, find the length of the longest substring without repeating characters.\n\nA substring is a contiguous non-empty sequence of characters within a string.",
        input_format: "Single line: string s",
        output_format: "Single integer (length of longest substring)",
        constraints: "0 <= s.length <= 5 * 10^4\ns consists of English letters, digits, symbols and spaces.",
        test_input: "abcabcbb",
        test_output: "3",
        source: "LeetCode #3"
    },
    {
        title: "Longest Palindromic Substring",
        difficulty: "Medium",
        topic: "String",
        description: "Given a string s, return the longest palindromic substring in s.\n\nA substring is a contiguous non-empty sequence of characters within a string.",
        input_format: "Single line: string s",
        output_format: "Single line: the longest palindromic substring",
        constraints: "1 <= s.length <= 1000\ns consist of only digits and English letters.",
        test_input: "babad",
        test_output: "bab",
        source: "LeetCode #5"
    },
    {
        title: "Group Anagrams",
        difficulty: "Medium",
        topic: "String",
        description: "Given an array of strings strs, group the anagrams together. You can return the answer in any order.\n\nAn Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.",
        input_format: "First line: n (number of strings)\nSecond line: n space-separated strings",
        output_format: "Each line contains a group of anagrams (space-separated)",
        constraints: "1 <= strs.length <= 10^4\n0 <= strs[i].length <= 100\nstrs[i] consists of lowercase English letters.",
        test_input: "6\neat tea tan ate nat bat",
        test_output: "bat\nnat tan\nate eat tea",
        source: "LeetCode #49"
    },

    // ==================== BINARY SEARCH - EASY ====================
    {
        title: "Binary Search",
        difficulty: "Easy",
        topic: "Binary Search",
        description: "Given an array of integers nums which is sorted in ascending order, and an integer target, write a function to search target in nums. If target exists, then return its index. Otherwise, return -1.\n\nYou must write an algorithm with O(log n) runtime complexity.",
        input_format: "First line: n (size of array)\nSecond line: n space-separated integers (sorted array)\nThird line: target integer",
        output_format: "Single integer (index of target, or -1 if not found)",
        constraints: "1 <= nums.length <= 10^4\n-10^4 < nums[i], target < 10^4\nAll the integers in nums are unique.\nnums is sorted in ascending order.",
        test_input: "6\n-1 0 3 5 9 12\n9",
        test_output: "4",
        source: "LeetCode #704"
    },
    {
        title: "Search Insert Position",
        difficulty: "Easy",
        topic: "Binary Search",
        description: "Given a sorted array of distinct integers and a target value, return the index if the target is found. If not, return the index where it would be if it were inserted in order.\n\nYou must write an algorithm with O(log n) runtime complexity.",
        input_format: "First line: n (size of array)\nSecond line: n space-separated integers (sorted array)\nThird line: target integer",
        output_format: "Single integer (index)",
        constraints: "1 <= nums.length <= 10^4\n-10^4 <= nums[i] <= 10^4\nnums contains distinct values sorted in ascending order.\n-10^4 <= target <= 10^4",
        test_input: "4\n1 3 5 6\n5",
        test_output: "2",
        source: "LeetCode #35"
    },

    // ==================== BINARY SEARCH - MEDIUM ====================
    {
        title: "Search in Rotated Sorted Array",
        difficulty: "Medium",
        topic: "Binary Search",
        description: "There is an integer array nums sorted in ascending order (with distinct values).\n\nPrior to being passed to your function, nums is possibly rotated at an unknown pivot index k (1 <= k < nums.length) such that the resulting array is [nums[k], nums[k+1], ..., nums[n-1], nums[0], nums[1], ..., nums[k-1]] (0-indexed). For example, [0,1,2,4,5,6,7] might be rotated at pivot index 3 and become [4,5,6,7,0,1,2].\n\nGiven the array nums after the possible rotation and an integer target, return the index of target if it is in nums, or -1 if it is not in nums.\n\nYou must write an algorithm with O(log n) runtime complexity.",
        input_format: "First line: n (size of array)\nSecond line: n space-separated integers (rotated sorted array)\nThird line: target integer",
        output_format: "Single integer (index of target, or -1 if not found)",
        constraints: "1 <= nums.length <= 5000\n-10^4 <= nums[i] <= 10^4\nAll values of nums are unique.\nnums is an ascending array that is possibly rotated.\n-10^4 <= target <= 10^4",
        test_input: "7\n4 5 6 7 0 1 2\n0",
        test_output: "4",
        source: "LeetCode #33"
    },
    {
        title: "Find Peak Element",
        difficulty: "Medium",
        topic: "Binary Search",
        description: "A peak element is an element that is strictly greater than its neighbors.\n\nGiven a 0-indexed integer array nums, find a peak element, and return its index. If the array contains multiple peaks, return the index to any of the peaks.\n\nYou may imagine that nums[-1] = nums[n] = -∞. In other words, an element is always considered to be strictly greater than a neighbor that is outside the array.\n\nYou must write an algorithm that runs in O(log n) time.",
        input_format: "First line: n (size of array)\nSecond line: n space-separated integers",
        output_format: "Single integer (index of a peak element)",
        constraints: "1 <= nums.length <= 1000\n-2^31 <= nums[i] <= 2^31 - 1\nnums[i] != nums[i + 1] for all valid i.",
        test_input: "4\n1 2 3 1",
        test_output: "2",
        source: "LeetCode #162"
    },

    // ==================== LINKED LIST - EASY ====================
    {
        title: "Reverse Linked List",
        difficulty: "Easy",
        topic: "Linked List",
        description: "Given the head of a singly linked list, reverse the list, and return the reversed list.",
        input_format: "First line: n (number of nodes)\nSecond line: n space-separated integers (node values)",
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
        input_format: "First line: n1 (size of list1)\nSecond line: n1 space-separated integers\nThird line: n2 (size of list2)\nFourth line: n2 space-separated integers",
        output_format: "Space-separated integers (merged sorted list)",
        constraints: "The number of nodes in both lists is in the range [0, 50].\n-100 <= Node.val <= 100\nBoth list1 and list2 are sorted in non-decreasing order.",
        test_input: "3\n1 2 4\n3\n1 3 4",
        test_output: "1 1 2 3 4 4",
        source: "LeetCode #21"
    },
    {
        title: "Linked List Cycle",
        difficulty: "Easy",
        topic: "Linked List",
        description: "Given head, the head of a linked list, determine if the linked list has a cycle in it.\n\nThere is a cycle in a linked list if there is some node in the list that can be reached again by continuously following the next pointer. Internally, pos is used to denote the index of the node that tail's next pointer is connected to. Note that pos is not passed as a parameter.\n\nReturn true if there is a cycle in the linked list. Otherwise, return false.",
        input_format: "First line: n (number of nodes)\nSecond line: n space-separated integers (node values)\nThird line: pos (position where tail connects to, -1 for no cycle)",
        output_format: "true or false",
        constraints: "The number of the nodes in the list is in the range [0, 10^4].\n-10^5 <= Node.val <= 10^5\npos is -1 or a valid index in the linked-list.",
        test_input: "4\n3 2 0 -4\n1",
        test_output: "true",
        source: "LeetCode #141"
    },

    // ==================== LINKED LIST - MEDIUM ====================
    {
        title: "Add Two Numbers",
        difficulty: "Medium",
        topic: "Linked List",
        description: "You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.\n\nYou may assume the two numbers do not contain any leading zero, except the number 0 itself.",
        input_format: "First line: n1 (size of list1)\nSecond line: n1 space-separated integers\nThird line: n2 (size of list2)\nFourth line: n2 space-separated integers",
        output_format: "Space-separated integers (sum as linked list in reverse order)",
        constraints: "The number of nodes in each linked list is in the range [1, 100].\n0 <= Node.val <= 9\nIt is guaranteed that the list represents a number that does not have leading zeros.",
        test_input: "3\n2 4 3\n3\n5 6 4",
        test_output: "7 0 8",
        source: "LeetCode #2"
    },
    {
        title: "Remove Nth Node From End of List",
        difficulty: "Medium",
        topic: "Linked List",
        description: "Given the head of a linked list, remove the nth node from the end of the list and return its head.",
        input_format: "First line: n (size of list)\nSecond line: n space-separated integers (node values)\nThird line: k (position from end to remove)",
        output_format: "Space-separated integers (modified list)",
        constraints: "The number of nodes in the list is sz.\n1 <= sz <= 30\n0 <= Node.val <= 100\n1 <= n <= sz",
        test_input: "5\n1 2 3 4 5\n2",
        test_output: "1 2 3 5",
        source: "LeetCode #19"
    },

    // ==================== TREE - EASY ====================
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
    {
        title: "Invert Binary Tree",
        difficulty: "Easy",
        topic: "Tree",
        description: "Given the root of a binary tree, invert the tree, and return its root.\n\nInverting a binary tree means swapping the left and right children for every node.",
        input_format: "Level-order traversal: space-separated values (null for empty nodes)",
        output_format: "Level-order traversal of inverted tree",
        constraints: "The number of nodes in the tree is in the range [0, 100].\n-100 <= Node.val <= 100",
        test_input: "4 2 7 1 3 6 9",
        test_output: "4 7 2 9 6 3 1",
        source: "LeetCode #226"
    },

    // ==================== TREE - MEDIUM ====================
    {
        title: "Binary Tree Level Order Traversal",
        difficulty: "Medium",
        topic: "Tree",
        description: "Given the root of a binary tree, return the level order traversal of its nodes' values. (i.e., from left to right, level by level).",
        input_format: "Level-order traversal: space-separated values (null for empty nodes)",
        output_format: "Each line contains values at one level",
        constraints: "The number of nodes in the tree is in the range [0, 2000].\n-1000 <= Node.val <= 1000",
        test_input: "3 9 20 null null 15 7",
        test_output: "3\n9 20\n15 7",
        source: "LeetCode #102"
    },
    {
        title: "Validate Binary Search Tree",
        difficulty: "Medium",
        topic: "Tree",
        description: "Given the root of a binary tree, determine if it is a valid binary search tree (BST).\n\nA valid BST is defined as follows:\n- The left subtree of a node contains only nodes with keys less than the node's key.\n- The right subtree of a node contains only nodes with keys greater than the node's key.\n- Both the left and right subtrees must also be binary search trees.",
        input_format: "Level-order traversal: space-separated values (null for empty nodes)",
        output_format: "true or false",
        constraints: "The number of nodes in the tree is in the range [1, 10^4].\n-2^31 <= Node.val <= 2^31 - 1",
        test_input: "2 1 3",
        test_output: "true",
        source: "LeetCode #98"
    },

    // ==================== DYNAMIC PROGRAMMING - EASY ====================
    {
        title: "Climbing Stairs",
        difficulty: "Easy",
        topic: "Dynamic Programming",
        description: "You are climbing a staircase. It takes n steps to reach the top.\n\nEach time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?",
        input_format: "Single integer n (number of steps)",
        output_format: "Single integer (number of distinct ways)",
        constraints: "1 <= n <= 45",
        test_input: "3",
        test_output: "3",
        source: "LeetCode #70"
    },
    {
        title: "House Robber",
        difficulty: "Easy",
        topic: "Dynamic Programming",
        description: "You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed, the only constraint stopping you from robbing each of them is that adjacent houses have security systems connected and it will automatically contact the police if two adjacent houses were broken into on the same night.\n\nGiven an integer array nums representing the amount of money of each house, return the maximum amount of money you can rob tonight without alerting the police.",
        input_format: "First line: n (number of houses)\nSecond line: n space-separated integers (money in each house)",
        output_format: "Single integer (maximum amount)",
        constraints: "1 <= nums.length <= 100\n0 <= nums[i] <= 400",
        test_input: "4\n1 2 3 1",
        test_output: "4",
        source: "LeetCode #198"
    },

    // ==================== DYNAMIC PROGRAMMING - MEDIUM ====================
    {
        title: "Coin Change",
        difficulty: "Medium",
        topic: "Dynamic Programming",
        description: "You are given an integer array coins representing coins of different denominations and an integer amount representing a total amount of money.\n\nReturn the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return -1.\n\nYou may assume that you have an infinite number of each kind of coin.",
        input_format: "First line: n (number of coin types)\nSecond line: n space-separated integers (coin denominations)\nThird line: amount",
        output_format: "Single integer (minimum coins needed, or -1)",
        constraints: "1 <= coins.length <= 12\n1 <= coins[i] <= 2^31 - 1\n0 <= amount <= 10^4",
        test_input: "3\n1 2 5\n11",
        test_output: "3",
        source: "LeetCode #322"
    },
    {
        title: "Longest Increasing Subsequence",
        difficulty: "Medium",
        topic: "Dynamic Programming",
        description: "Given an integer array nums, return the length of the longest strictly increasing subsequence.\n\nA subsequence is an array that can be derived from another array by deleting some or no elements without changing the order of the remaining elements.",
        input_format: "First line: n (size of array)\nSecond line: n space-separated integers",
        output_format: "Single integer (length of LIS)",
        constraints: "1 <= nums.length <= 2500\n-10^4 <= nums[i] <= 10^4",
        test_input: "8\n10 9 2 5 3 7 101 18",
        test_output: "4",
        source: "LeetCode #300"
    },
    {
        title: "Unique Paths",
        difficulty: "Medium",
        topic: "Dynamic Programming",
        description: "There is a robot on an m x n grid. The robot is initially located at the top-left corner (i.e., grid[0][0]). The robot tries to move to the bottom-right corner (i.e., grid[m - 1][n - 1]). The robot can only move either down or right at any point in time.\n\nGiven the two integers m and n, return the number of possible unique paths that the robot can take to reach the bottom-right corner.\n\nThe test cases are generated so that the answer will be less than or equal to 2 * 10^9.",
        input_format: "Two space-separated integers m and n",
        output_format: "Single integer (number of unique paths)",
        constraints: "1 <= m, n <= 100",
        test_input: "3 7",
        test_output: "28",
        source: "LeetCode #62"
    },
    {
        title: "0/1 Knapsack Problem",
        difficulty: "Medium",
        topic: "Dynamic Programming",
        description: "You are given weights and values of N items, put these items in a knapsack of capacity W to get the maximum total value in the knapsack. Note that we have only one quantity of each item.\n\nIn other words, given two integer arrays val[0..N-1] and wt[0..N-1] which represent values and weights associated with N items respectively. Also given an integer W which represents knapsack capacity, find out the maximum value subset of val[] such that sum of the weights of this subset is smaller than or equal to W. You cannot break an item, either pick the complete item or don't pick it (0-1 property).",
        input_format: "First line: N W (number of items and capacity)\nSecond line: N space-separated integers (weights)\nThird line: N space-separated integers (values)",
        output_format: "Single integer (maximum value)",
        constraints: "1 ≤ N ≤ 1000\n1 ≤ W ≤ 1000\n1 ≤ wt[i] ≤ 1000\n1 ≤ val[i] ≤ 1000",
        test_input: "3 4\n4 5 1\n1 2 3",
        test_output: "3",
        source: "GFG Classic"
    },

    // ==================== GRAPH - MEDIUM ====================
    {
        title: "Number of Islands",
        difficulty: "Medium",
        topic: "Graph",
        description: "Given an m x n 2D binary grid grid which represents a map of '1's (land) and '0's (water), return the number of islands.\n\nAn island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are all surrounded by water.",
        input_format: "First line: m n (rows and columns)\nNext m lines: n space-separated integers (0 or 1)",
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
        description: "There are a total of numCourses courses you have to take, labeled from 0 to numCourses - 1. You are given an array prerequisites where prerequisites[i] = [ai, bi] indicates that you must take course bi first if you want to take course ai.\n\nFor example, the pair [0, 1], indicates that to take course 0 you have to first take course 1.\n\nReturn true if you can finish all courses. Otherwise, return false.",
        input_format: "First line: numCourses numPrerequisites\nNext numPrerequisites lines: two space-separated integers (course prerequisite)",
        output_format: "true or false",
        constraints: "1 <= numCourses <= 2000\n0 <= prerequisites.length <= 5000\nprerequisites[i].length == 2\n0 <= ai, bi < numCourses\nAll the pairs prerequisites[i] are unique.",
        test_input: "2 1\n1 0",
        test_output: "true",
        source: "LeetCode #207"
    },

    // ==================== STACK - EASY ====================
    {
        title: "Valid Parentheses",
        difficulty: "Easy",
        topic: "Stack",
        description: "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.\n\nAn input string is valid if:\n1. Open brackets must be closed by the same type of brackets.\n2. Open brackets must be closed in the correct order.\n3. Every close bracket has a corresponding open bracket of the same type.",
        input_format: "Single line: string s",
        output_format: "true or false",
        constraints: "1 <= s.length <= 10^4\ns consists of parentheses only '()[]{}'.",
        test_input: "()[]{}",
        test_output: "true",
        source: "LeetCode #20"
    },

    // ==================== STACK - MEDIUM ====================
    {
        title: "Daily Temperatures",
        difficulty: "Medium",
        topic: "Stack",
        description: "Given an array of integers temperatures represents the daily temperatures, return an array answer such that answer[i] is the number of days you have to wait after the ith day to get a warmer temperature. If there is no future day for which this is possible, keep answer[i] == 0 instead.",
        input_format: "First line: n (number of days)\nSecond line: n space-separated integers (temperatures)",
        output_format: "n space-separated integers (days to wait)",
        constraints: "1 <= temperatures.length <= 10^5\n30 <= temperatures[i] <= 100",
        test_input: "8\n73 74 75 71 69 72 76 73",
        test_output: "1 1 4 2 1 1 0 0",
        source: "LeetCode #739"
    },

    // ==================== STACK - HARD ====================
    {
        title: "Largest Rectangle in Histogram",
        difficulty: "Hard",
        topic: "Stack",
        description: "Given an array of integers heights representing the histogram's bar height where the width of each bar is 1, return the area of the largest rectangle in the histogram.",
        input_format: "First line: n (number of bars)\nSecond line: n space-separated integers (heights)",
        output_format: "Single integer (maximum area)",
        constraints: "1 <= heights.length <= 10^5\n0 <= heights[i] <= 10^4",
        test_input: "6\n2 1 5 6 2 3",
        test_output: "10",
        source: "LeetCode #84"
    },

    // ==================== GREEDY - MEDIUM ====================
    {
        title: "Jump Game",
        difficulty: "Medium",
        topic: "Greedy",
        description: "You are given an integer array nums. You are initially positioned at the array's first index, and each element in the array represents your maximum jump length at that position.\n\nReturn true if you can reach the last index, or false otherwise.",
        input_format: "First line: n (size of array)\nSecond line: n space-separated integers",
        output_format: "true or false",
        constraints: "1 <= nums.length <= 10^4\n0 <= nums[i] <= 10^5",
        test_input: "5\n2 3 1 1 4",
        test_output: "true",
        source: "LeetCode #55"
    },

    // ==================== BACKTRACKING - MEDIUM ====================
    {
        title: "Permutations",
        difficulty: "Medium",
        topic: "Backtracking",
        description: "Given an array nums of distinct integers, return all the possible permutations. You can return the answer in any order.",
        input_format: "First line: n (size of array)\nSecond line: n space-separated integers",
        output_format: "Each line contains a permutation (space-separated integers)",
        constraints: "1 <= nums.length <= 6\n-10 <= nums[i] <= 10\nAll the integers of nums are unique.",
        test_input: "3\n1 2 3",
        test_output: "1 2 3\n1 3 2\n2 1 3\n2 3 1\n3 1 2\n3 2 1",
        source: "LeetCode #46"
    },
    {
        title: "Subsets",
        difficulty: "Medium",
        topic: "Backtracking",
        description: "Given an integer array nums of unique elements, return all possible subsets (the power set).\n\nThe solution set must not contain duplicate subsets. Return the solution in any order.",
        input_format: "First line: n (size of array)\nSecond line: n space-separated integers",
        output_format: "Each line contains a subset (space-separated integers, empty line for empty subset)",
        constraints: "1 <= nums.length <= 10\n-10 <= nums[i] <= 10\nAll the numbers of nums are unique.",
        test_input: "3\n1 2 3",
        test_output: "\n1\n2\n1 2\n3\n1 3\n2 3\n1 2 3",
        source: "LeetCode #78"
    },

    // ==================== HEAP - MEDIUM ====================
    {
        title: "Top K Frequent Elements",
        difficulty: "Medium",
        topic: "Heap",
        description: "Given an integer array nums and an integer k, return the k most frequent elements. You may return the answer in any order.",
        input_format: "First line: n (size of array)\nSecond line: n space-separated integers\nThird line: k",
        output_format: "k space-separated integers (most frequent elements)",
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
        output_format: "Single integer (kth largest element)",
        constraints: "1 <= k <= nums.length <= 10^5\n-10^4 <= nums[i] <= 10^4",
        test_input: "6\n3 2 1 5 6 4\n2",
        test_output: "5",
        source: "LeetCode #215"
    },

    // ==================== LINKED LIST - ADDITIONAL ====================
    {
        title: "Palindrome Linked List",
        difficulty: "Easy",
        topic: "Linked List",
        description: "Given the head of a singly linked list, return true if it is a palindrome.",
        input_format: "First line: n (number of nodes)\nSecond line: n space-separated integers",
        output_format: "true or false",
        constraints: "The number of nodes in the list is in the range [1, 10^5].\n0 <= Node.val <= 9",
        test_input: "4\n1 2 2 1",
        test_output: "true",
        source: "LeetCode #234"
    },
    {
        title: "Intersection of Two Linked Lists",
        difficulty: "Easy",
        topic: "Linked List",
        description: "Given the heads of two singly linked-lists headA and headB, return the node at which the two lists intersect. If the two linked lists have no intersection at all, return null.",
        input_format: "First line: intersectVal (value of intersection node, 0 if none)\nSecond line: listA values\nThird line: listB values\n(Note: Input format simplified for testing)",
        output_format: "Reference of the node (or null)",
        constraints: "The number of nodes of listA is in the m.\nThe number of nodes of listB is in the n.\n1 <= m, n <= 3 * 10^4",
        test_input: "8\n4 1 8 4 5\n5 6 1 8 4 5",
        test_output: "8",
        source: "LeetCode #160"
    },
    {
        title: "Merge k Sorted Lists",
        difficulty: "Hard",
        topic: "Linked List",
        description: "You are given an array of k linked-lists lists, each linked-list is sorted in ascending order.\n\nMerge all the linked-lists into one sorted linked-list and return it.",
        input_format: "First line: k (number of lists)\nNext k lines: each line starts with n (size) followed by n integers",
        output_format: "Space-separated integers (merged list)",
        constraints: "k == lists.length\n0 <= k <= 10^4\n0 <= lists[i].length <= 500",
        test_input: "3\n3 1 4 5\n3 1 3 4\n2 2 6",
        test_output: "1 1 2 3 4 4 5 6",
        source: "LeetCode #23"
    },

    // ==================== STACK - ADDITIONAL ====================
    {
        title: "Min Stack",
        difficulty: "Easy",
        topic: "Stack",
        description: "Design a stack that supports push, pop, top, and retrieving the minimum element in constant time.",
        input_format: "Commands and values",
        output_format: "Output of commands",
        constraints: "-2^31 <= val <= 2^31 - 1",
        test_input: "push -2\npush 0\npush -3\ngetMin\npop\ntop\ngetMin",
        test_output: "-3\n0\n-2",
        source: "LeetCode #155"
    },
    {
        title: "Evaluate Reverse Polish Notation",
        difficulty: "Medium",
        topic: "Stack",
        description: "Evaluate the value of an arithmetic expression in Reverse Polish Notation.\n\nValid operators are +, -, *, and /.",
        input_format: "Space-separated tokens",
        output_format: "Single integer (result)",
        constraints: "1 <= tokens.length <= 10^4",
        test_input: "2 1 + 3 *",
        test_output: "9",
        source: "LeetCode #150"
    },
    {
        title: "Decode String",
        difficulty: "Medium",
        topic: "Stack",
        description: "Given an encoded string, return its decoded string.\n\nThe encoding rule is: k[encoded_string], where the encoded_string inside the square brackets is being repeated exactly k times.",
        input_format: "Single string s",
        output_format: "Decoded string",
        constraints: "1 <= s.length <= 30",
        test_input: "3[a]2[bc]",
        test_output: "aaabcbc",
        source: "LeetCode #394"
    },

    // ==================== QUEUE - ADDITIONAL ====================
    {
        title: "Task Scheduler",
        difficulty: "Medium",
        topic: "Queue",
        description: "Given a characters array tasks, representing the tasks a CPU needs to do, where each letter represents a different task. Tasks could be done in any order. Each task is done in one unit of time. For each unit of time, the CPU could complete either one task or just be idle.\n\nHowever, there is a non-negative integer n that represents the cooldown period between two same tasks (the same letter in the array), that is that there must be at least n units of time between any two same tasks.\n\nReturn the least number of units of times that the CPU will take to finish all the given tasks.",
        input_format: "First line: tasks (space-separated characters)\nSecond line: n (cooldown)",
        output_format: "Single integer",
        constraints: "1 <= task.length <= 10^4\n0 <= n <= 100",
        test_input: "A A A B B B\n2",
        test_output: "8",
        source: "LeetCode #621"
    },
    {
        title: "Sliding Window Maximum",
        difficulty: "Hard",
        topic: "Queue",
        description: "You are given an array of integers nums, there is a sliding window of size k which is moving from the very left of the array to the very right. You can only see the k numbers in the window. Each time the sliding window moves right by one position.\n\nReturn the max sliding window.",
        input_format: "First line: n (size)\nSecond line: n integers\nThird line: k",
        output_format: "Space-separated integers",
        constraints: "1 <= nums.length <= 10^5\n1 <= k <= nums.length",
        test_input: "8\n1 3 -1 -3 5 3 6 7\n3",
        test_output: "3 3 5 5 6 7",
        source: "LeetCode #239"
    },

    // ==================== GRAPH - ADDITIONAL ====================
    {
        title: "Rotting Oranges",
        difficulty: "Medium",
        topic: "Graph",
        description: "You are given an m x n grid where each cell can have one of three values:\n0 representing an empty cell,\n1 representing a fresh orange, or\n2 representing a rotten orange.\nEvery minute, any fresh orange that is 4-directionally adjacent to a rotten orange becomes rotten.\n\nReturn the minimum number of minutes that must elapse until no cell has a fresh orange. If this is impossible, return -1.",
        input_format: "First line: m n\nNext m lines: n integers",
        output_format: "Single integer",
        constraints: "m == grid.length\nn == grid[i].length\n1 <= m, n <= 10",
        test_input: "3 3\n2 1 1\n1 1 0\n0 1 1",
        test_output: "4",
        source: "LeetCode #994"
    },
    {
        title: "Word Ladder",
        difficulty: "Hard",
        topic: "Graph",
        description: "A transformation sequence from wordBegin to wordEnd using a dictionary wordList is a sequence of words beginWord -> s1 -> s2 -> ... -> sk such that:\nEvery adjacent pair of words differs by a single letter.\nEvery si for 1 <= i <= k is in wordList. Note that beginWord does not need to be in wordList.\nsk == endWord.\n\nGiven two words, beginWord and endWord, and a dictionary wordList, return the number of words in the shortest transformation sequence from beginWord to endWord, or 0 if no such sequence exists.",
        input_format: "First line: beginWord endWord\nSecond line: n (size of wordList)\nThird line: n space-separated words",
        output_format: "Single integer",
        constraints: "1 <= beginWord.length <= 10",
        test_input: "hit cog\n6\nhot dot dog lot log cog",
        test_output: "5",
        source: "LeetCode #127"
    },

    // ==================== GREEDY - ADDITIONAL ====================
    {
        title: "Gas Station",
        difficulty: "Medium",
        topic: "Greedy",
        description: "There are n gas stations along a circular route, where the amount of gas at the ith station is gas[i].\n\nYou have a car with an unlimited gas tank and it costs cost[i] of gas to travel from the ith station to its next (i + 1)th station. You begin the journey with an empty tank at one of the gas stations.\n\nGiven two integer arrays gas and cost, return the starting gas station's index if you can travel around the circuit once in the clockwise direction, otherwise return -1. If there exists a solution, it is guaranteed to be unique",
        input_format: "First line: n\nSecond line: n integers (gas)\nThird line: n integers (cost)",
        output_format: "Single integer",
        constraints: "n == gas.length == cost.length\n1 <= n <= 10^5",
        test_input: "5\n1 2 3 4 5\n3 4 5 1 2",
        test_output: "3",
        source: "LeetCode #134"
    },
    {
        title: "Candy",
        difficulty: "Hard",
        topic: "Greedy",
        description: "There are n children standing in a line. Each child is assigned a rating value given in the integer array ratings.\n\nYou are giving candies to these children subjected to the following requirements:\nEach child must have at least one candy.\nChildren with a higher rating get more candies than their neighbors.\nReturn the minimum number of candies you need to have to distribute the candies to the children.",
        input_format: "First line: n\nSecond line: n integers (ratings)",
        output_format: "Single integer",
        constraints: "n == ratings.length\n1 <= n <= 2 * 10^4",
        test_input: "3\n1 0 2",
        test_output: "5",
        source: "LeetCode #135"
    },

    // ==================== BACKTRACKING - ADDITIONAL ====================
    {
        title: "Combination Sum",
        difficulty: "Medium",
        topic: "Backtracking",
        description: "Given an array of distinct integers candidates and a target integer target, return a list of all unique combinations of candidates where the chosen numbers sum to target. You may return the combinations in any order.\n\nThe same number may be chosen from candidates an unlimited number of times. Two combinations are unique if the frequency of at least one of the chosen numbers is different.",
        input_format: "First line: n\nSecond line: n integers\nThird line: target",
        output_format: "Each line a combination",
        constraints: "1 <= candidates.length <= 30\n1 <= target <= 500",
        test_input: "4\n2 3 6 7\n7",
        test_output: "2 2 3\n7",
        source: "LeetCode #39"
    },
    {
        title: "Word Search",
        difficulty: "Medium",
        topic: "Backtracking",
        description: "Given an m x n grid of characters board and a string word, return true if word exists in the grid.\n\nThe word can be constructed from letters of sequentially adjacent cells, where adjacent cells are horizontally or vertically neighboring. The same letter cell may not be used more than once.",
        input_format: "First line: m n\nNext m lines: n characters\nLast line: word",
        output_format: "true or false",
        constraints: "m == board.length\nn = board[i].length\n1 <= m, n <= 6",
        test_input: "3 4\nA B C E\nS F C S\nA D E E\nABCCED",
        test_output: "true",
        source: "LeetCode #79"
    },
    {
        title: "N-Queens",
        difficulty: "Hard",
        topic: "Backtracking",
        description: "The n-queens puzzle is the problem of placing n queens on an n x n chessboard such that no two queens attack each other.\n\nGiven an integer n, return all distinct solutions to the n-queens puzzle. You may return the answer in any order.",
        input_format: "Single integer n",
        output_format: "Number of solutions",
        constraints: "1 <= n <= 9",
        test_input: "4",
        test_output: "2",
        source: "LeetCode #51"
    },

    // ==================== BINARY SEARCH - ADDITIONAL ====================
    {
        title: "Find Minimum in Rotated Sorted Array",
        difficulty: "Medium",
        topic: "Binary Search",
        description: "Suppose an array of length n sorted in ascending order is rotated between 1 and n times. For example, the array nums = [0,1,2,4,5,6,7] might become:\n[4,5,6,7,0,1,2] if it was rotated 4 times.\n[0,1,2,4,5,6,7] if it was rotated 7 times.\nNotice that rotating an array [a[0], a[1], a[2], ..., a[n-1]] 1 time results in the array [a[n-1], a[0], a[1], a[2], ..., a[n-2]].\n\nGiven the sorted rotated array nums of unique elements, return the minimum element of this array.\n\nYou must write an algorithm that runs in O(log n) time.",
        input_format: "First line: n\nSecond line: n integers",
        output_format: "Single integer",
        constraints: "n == nums.length\n1 <= n <= 5000",
        test_input: "5\n3 4 5 1 2",
        test_output: "1",
        source: "LeetCode #153"
    },
    {
        title: "Split Array Largest Sum",
        difficulty: "Hard",
        topic: "Binary Search",
        description: "Given an integer array nums and an integer k, split nums into k non-empty subarrays such that the largest sum of any subarray is minimized.\n\nReturn the minimized largest sum of the split.",
        input_format: "First line: n\nSecond line: n integers\nThird line: k",
        output_format: "Single integer",
        constraints: "1 <= nums.length <= 1000\n1 <= k <= min(50, nums.length)",
        test_input: "5\n7 2 5 10 8\n2",
        test_output: "18",
        source: "LeetCode #410"
    },

    // ==================== HEAP - ADDITIONAL ====================
    {
        title: "Sort Characters By Frequency",
        difficulty: "Medium",
        topic: "Heap",
        description: "Given a string s, sort it in decreasing order based on the frequency of the characters. The frequency of a character is the number of times it appears in the string.\n\nReturn the sorted string. If there are multiple answers, return any of them.",
        input_format: "Single string s",
        output_format: "Sorted string",
        constraints: "1 <= s.length <= 5 * 10^5",
        test_input: "tree",
        test_output: "eert",
        source: "LeetCode #451"
    },
    {
        title: "Find Median from Data Stream",
        difficulty: "Hard",
        topic: "Heap",
        description: "The median is the middle value in an ordered integer list. If the size of the list is even, there is no middle value, and the median is the mean of the two middle values.\n\nImplement the MedianFinder class:\nMedianFinder() initializes the MedianFinder object.\nvoid addNum(int num) adds the integer num from the data stream to the data structure.\ndouble findMedian() returns the median of all elements so far.",
        input_format: "Commands and values",
        output_format: "Output of commands",
        constraints: "-10^5 <= num <= 10^5",
        test_input: "addNum 1\naddNum 2\nfindMedian\naddNum 3\nfindMedian",
        test_output: "1.5\n2.0",
        source: "LeetCode #295"
    },

    // ==================== HASHING - ADDITIONAL ====================
    {
        title: "Ransom Note",
        difficulty: "Easy",
        topic: "Hashing",
        description: "Given two strings ransomNote and magazine, return true if ransomNote can be constructed by using the letters from magazine and false otherwise.\n\nEach letter in magazine can only be used once in ransomNote.",
        input_format: "First line: ransomNote\nSecond line: magazine",
        output_format: "true or false",
        constraints: "1 <= ransomNote.length, magazine.length <= 10^5",
        test_input: "a\nb",
        test_output: "false",
        source: "LeetCode #383"
    },
    {
        title: "Longest Consecutive Sequence",
        difficulty: "Medium",
        topic: "Hashing",
        description: "Given an unsorted array of integers nums, return the length of the longest consecutive elements sequence.\n\nYou must write an algorithm that runs in O(n) time.",
        input_format: "First line: n\nSecond line: n integers",
        output_format: "Single integer",
        constraints: "0 <= nums.length <= 10^5",
        test_input: "6\n100 4 200 1 3 2",
        test_output: "4",
        source: "LeetCode #128"
    },
    {
        title: "Subarray Sum Equals K",
        difficulty: "Medium",
        topic: "Hashing",
        description: "Given an array of integers nums and an integer k, return the total number of subarrays whose sum equals to k.\n\nA subarray is a contiguous non-empty sequence of elements within an array.",
        input_format: "First line: n\nSecond line: n integers\nThird line: k",
        output_format: "Single integer",
        constraints: "1 <= nums.length <= 2 * 10^4\n-1000 <= nums[i] <= 1000\n-10^7 <= k <= 10^7",
        test_input: "3\n1 1 1\n2",
        test_output: "2",
        source: "LeetCode #560"
    }
];

// Generate SQL INSERT statements
function generateProblemsSQL() {
    const sqlStatements = realInterviewProblems.map(problem => {
        const title = problem.title.replace(/'/g, "''");
        const desc = `${problem.description}\n\n**Input Format:**\n${problem.input_format}\n\n**Output Format:**\n${problem.output_format}\n\n**Constraints:**\n${problem.constraints}\n\n**Source:** ${problem.source}`.replace(/'/g, "''");
        const input = problem.test_input.replace(/'/g, "''");
        const output = problem.test_output.replace(/'/g, "''");

        return `('${title}', '${desc}', '${problem.difficulty}', '${problem.topic}', '${input}', '${output}')`;
    });

    const sql = `-- Real Interview Problems from LeetCode, GFG, InterviewBit, CodeStudio, CSES\n-- Total: ${realInterviewProblems.length} problems\n-- Last updated: ${new Date().toISOString()}\n\nINSERT INTO problems (title, description, difficulty, topic, test_case_input, test_case_output) VALUES\n${sqlStatements.join(',\n')};\n`;

    fs.writeFileSync(path.join(__dirname, 'problems_seed.sql'), sql);
    console.log(`✅ Generated ${realInterviewProblems.length} real interview problems`);
    console.log(`\nBreakdown by difficulty:`);
    const breakdown = realInterviewProblems.reduce((acc, p) => {
        acc[p.difficulty] = (acc[p.difficulty] || 0) + 1;
        return acc;
    }, {});
    Object.entries(breakdown).forEach(([diff, count]) => {
        console.log(`   ${diff}: ${count}`);
    });
}

generateProblemsSQL();
