const fs = require('fs');
const path = require('path');

// Top 50 Most Important Interview Problems (in addition to existing 45)
// Verified from LeetCode Top Interview 150, Blind 75, Neetcode 150
const additionalProblems = [
    // ==================== ARRAY ====================
    {
        title: "Rotate Array",
        difficulty: "Medium",
        topic: "Array",
        description: "Given an integer array nums, rotate the array to the right by k steps, where k is non-negative.\n\nExample 1:\nInput: nums = [1,2,3,4,5,6,7], k = 3\nOutput: [5,6,7,1,2,3,4]\nExplanation:\nrotate 1 steps to the right: [7,1,2,3,4,5,6]\nrotate 2 steps to the right: [6,7,1,2,3,4,5]\nrotate 3 steps to the right: [5,6,7,1,2,3,4]",
        input_format: "First line: n (size of array)\nSecond line: n space-separated integers\nThird line: k (rotation steps)",
        output_format: "n space-separated integers (rotated array)",
        constraints: "1 <= nums.length <= 10^5\n-2^31 <= nums[i] <= 2^31 - 1\n0 <= k <= 10^5",
        test_input: "7\n1 2 3 4 5 6 7\n3",
        test_output: "5 6 7 1 2 3 4",
        source: "LeetCode #189"
    },
    {
        title: "Find All Duplicates in an Array",
        difficulty: "Medium",
        topic: "Array",
        description: "Given an integer array nums of length n where all the integers of nums are in the range [1, n] and each integer appears once or twice, return an array of all the integers that appears twice.\n\nYou must write an algorithm that runs in O(n) time and uses only constant extra space.",
        input_format: "First line: n (size of array)\nSecond line: n space-separated integers",
        output_format: "Space-separated integers (duplicates in any order)",
        constraints: "n == nums.length\n1 <= n <= 10^5\n1 <= nums[i] <= n\nEach element in nums appears once or twice.",
        test_input: "8\n4 3 2 7 8 2 3 1",
        test_output: "2 3",
        source: "LeetCode #442"
    },
    {
        title: "Next Permutation",
        difficulty: "Medium",
        topic: "Array",
        description: "A permutation of an array of integers is an arrangement of its members into a sequence or linear order.\n\nThe next permutation of an array of integers is the next lexicographically greater permutation of its integer. More formally, if all the permutations of the array are sorted in one container according to their lexicographical order, then the next permutation of that array is the permutation that follows it in the sorted container. If such arrangement is not possible, the array must be rearranged as the lowest possible order (i.e., sorted in ascending order).\n\nFor example, the next permutation of arr = [1,2,3] is [1,3,2].\nSimilarly, the next permutation of arr = [2,3,1] is [3,1,2].\nWhile the next permutation of arr = [3,2,1] is [1,2,3] because [3,2,1] does not have a lexicographical larger rearrangement.",
        input_format: "First line: n (size of array)\nSecond line: n space-separated integers",
        output_format: "n space-separated integers (next permutation)",
        constraints: "1 <= nums.length <= 100\n0 <= nums[i] <= 100",
        test_input: "3\n1 2 3",
        test_output: "1 3 2",
        source: "LeetCode #31"
    },
    {
        title: "Sort Colors (Dutch National Flag)",
        difficulty: "Medium",
        topic: "Array",
        description: "Given an array nums with n objects colored red, white, or blue, sort them in-place so that objects of the same color are adjacent, with the colors in the order red, white, and blue.\n\nWe will use the integers 0, 1, and 2 to represent the color red, white, and blue, respectively.\n\nYou must solve this problem without using the library's sort function.",
        input_format: "First line: n (size of array)\nSecond line: n space-separated integers (0, 1, or 2)",
        output_format: "n space-separated integers (sorted array)",
        constraints: "n == nums.length\n1 <= n <= 300\nnums[i] is either 0, 1, or 2.",
        test_input: "6\n2 0 2 1 1 0",
        test_output: "0 0 1 1 2 2",
        source: "LeetCode #75"
    },
    {
        title: "Majority Element",
        difficulty: "Easy",
        topic: "Array",
        description: "Given an array nums of size n, return the majority element.\n\nThe majority element is the element that appears more than ⌊n / 2⌋ times. You may assume that the majority element always exists in the array.",
        input_format: "First line: n (size of array)\nSecond line: n space-separated integers",
        output_format: "Single integer (majority element)",
        constraints: "n == nums.length\n1 <= n <= 5 * 10^4\n-10^9 <= nums[i] <= 10^9",
        test_input: "7\n2 2 1 1 1 2 2",
        test_output: "2",
        source: "LeetCode #169"
    },

    // ==================== STRING ====================
    {
        title: "Reverse Words in a String",
        difficulty: "Medium",
        topic: "String",
        description: "Given an input string s, reverse the order of the words.\n\nA word is defined as a sequence of non-space characters. The words in s will be separated by at least one space.\n\nReturn a string of the words in reverse order concatenated by a single space.\n\nNote that s may contain leading or trailing spaces or multiple spaces between two words. The returned string should only have a single space separating the words. Do not include any extra spaces.",
        input_format: "Single line: string s",
        output_format: "Single line: reversed words",
        constraints: "1 <= s.length <= 10^4\ns contains English letters (upper-case and lower-case), digits, and spaces ' '.\nThere is at least one word in s.",
        test_input: "the sky is blue",
        test_output: "blue is sky the",
        source: "LeetCode #151"
    },
    {
        title: "Implement strStr()",
        difficulty: "Easy",
        topic: "String",
        description: "Given two strings needle and haystack, return the index of the first occurrence of needle in haystack, or -1 if needle is not part of haystack.\n\nClarification:\nWhat should we return when needle is an empty string? This is a great question to ask during an interview.\nFor the purpose of this problem, we will return 0 when needle is an empty string.",
        input_format: "First line: haystack string\nSecond line: needle string",
        output_format: "Single integer (index or -1)",
        constraints: "1 <= haystack.length, needle.length <= 10^4\nhaystack and needle consist of only lowercase English characters.",
        test_input: "sadbutsad\nsad",
        test_output: "0",
        source: "LeetCode #28"
    },
    {
        title: "String to Integer (atoi)",
        difficulty: "Medium",
        topic: "String",
        description: "Implement the myAtoi(string s) function, which converts a string to a 32-bit signed integer (similar to C/C++'s atoi function).\n\nThe algorithm for myAtoi(string s) is as follows:\n1. Read in and ignore any leading whitespace.\n2. Check if the next character (if not already at the end of the string) is '-' or '+'. Read this character in if it is either. This determines if the final result is negative or positive respectively. Assume the result is positive if neither is present.\n3. Read in next the characters until the next non-digit character or the end of the input is reached. The rest of the string is ignored.\n4. Convert these digits into an integer (i.e. \"123\" -> 123, \"0032\" -> 32). If no digits were read, then the integer is 0. Change the sign as necessary (from step 2).\n5. If the integer is out of the 32-bit signed integer range [-2^31, 2^31 - 1], then clamp the integer so that it remains in the range. Specifically, integers less than -2^31 should be clamped to -2^31, and integers greater than 2^31 - 1 should be clamped to 2^31 - 1.\n6. Return the integer as the final result.",
        input_format: "Single line: string s",
        output_format: "Single integer",
        constraints: "0 <= s.length <= 200\ns consists of English letters (lower-case and upper-case), digits (0-9), ' ', '+', '-', and '.'.",
        test_input: "42",
        test_output: "42",
        source: "LeetCode #8"
    },
    {
        title: "Minimum Window Substring",
        difficulty: "Hard",
        topic: "String",
        description: "Given two strings s and t of lengths m and n respectively, return the minimum window substring of s such that every character in t (including duplicates) is included in the window. If there is no such substring, return the empty string \"\".\n\nThe testcases will be generated such that the answer is unique.",
        input_format: "First line: string s\nSecond line: string t",
        output_format: "Single line: minimum window substring",
        constraints: "m == s.length\nn == t.length\n1 <= m, n <= 10^5\ns and t consist of uppercase and lowercase English letters.",
        test_input: "ADOBECODEBANC\nABC",
        test_output: "BANC",
        source: "LeetCode #76"
    },
    {
        title: "Longest Common Prefix",
        difficulty: "Easy",
        topic: "String",
        description: "Write a function to find the longest common prefix string amongst an array of strings.\n\nIf there is no common prefix, return an empty string \"\".",
        input_format: "First line: n (number of strings)\nSecond line: n space-separated strings",
        output_format: "Single line: longest common prefix",
        constraints: "1 <= strs.length <= 200\n0 <= strs[i].length <= 200\nstrs[i] consists of only lowercase English letters.",
        test_input: "3\nflower flow flight",
        test_output: "fl",
        source: "LeetCode #14"
    },

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
        output_format: "Median for each findMedian operation",
        constraints: "-10^5 <= num <= 10^5\nThere will be at least one element in the data structure before calling findMedian.\nAt most 5 * 10^4 calls will be made to addNum and findMedian.",
        test_input: "6\naddNum 1\naddNum 2\nfindMedian\naddNum 3\nfindMedian",
        test_output: "1.5\n2.0",
        source: "LeetCode #295"
    },

    // ==================== BACKTRACKING ====================
    {
        title: "Combination Sum",
        difficulty: "Medium",
        topic: "Backtracking",
        description: "Given an array of distinct integers candidates and a target integer target, return a list of all unique combinations of candidates where the chosen numbers sum to target. You may return the combinations in any order.\n\nThe same number may be chosen from candidates an unlimited number of times. Two combinations are unique if the frequency of at least one of the chosen numbers is different.\n\nThe test cases are generated such that the number of unique combinations that sum up to target is less than 150 combinations for the given input.",
        input_format: "First line: n (size of candidates)\nSecond line: n space-separated integers (candidates)\nThird line: target",
        output_format: "Each line contains a combination (space-separated integers)",
        constraints: "1 <= candidates.length <= 30\n2 <= candidates[i] <= 40\nAll elements of candidates are distinct.\n1 <= target <= 40",
        test_input: "3\n2 3 6\n7",
        test_output: "2 2 3\n7",
        source: "LeetCode #39"
    },
    {
        title: "Letter Combinations of a Phone Number",
        difficulty: "Medium",
        topic: "Backtracking",
        description: "Given a string containing digits from 2-9 inclusive, return all possible letter combinations that the number could represent. Return the answer in any order.\n\nA mapping of digits to letters (just like on the telephone buttons) is given below. Note that 1 does not map to any letters.\n\n2: abc\n3: def\n4: ghi\n5: jkl\n6: mno\n7: pqrs\n8: tuv\n9: wxyz",
        input_format: "Single line: digit string",
        output_format: "Space-separated letter combinations",
        constraints: "0 <= digits.length <= 4\ndigits[i] is a digit in the range ['2', '9'].",
        test_input: "23",
        test_output: "ad ae af bd be bf cd ce cf",
        source: "LeetCode #17"
    },
    {
        title: "N-Queens",
        difficulty: "Hard",
        topic: "Backtracking",
        description: "The n-queens puzzle is the problem of placing n queens on an n x n chessboard such that no two queens attack each other.\n\nGiven an integer n, return all distinct solutions to the n-queens puzzle. You may return the answer in any order.\n\nEach solution contains a distinct board configuration of the n-queens' placement, where 'Q' and '.' both indicate a queen and an empty space, respectively.",
        input_format: "Single integer: n",
        output_format: "Number of distinct solutions",
        constraints: "1 <= n <= 9",
        test_input: "4",
        test_output: "2",
        source: "LeetCode #51"
    },

    // ==================== GREEDY ====================
    {
        title: "Gas Station",
        difficulty: "Medium",
        topic: "Greedy",
        description: "There are n gas stations along a circular route, where the amount of gas at the ith station is gas[i].\n\nYou have a car with an unlimited gas tank and it costs cost[i] of gas to travel from the ith station to its next (i + 1)th station. You begin the journey with an empty tank at one of the gas stations.\n\nGiven two integer arrays gas and cost, return the starting gas station's index if you can travel around the circuit once in the clockwise direction, otherwise return -1. If there exists a solution, it is guaranteed to be unique.",
        input_format: "First line: n (number of stations)\nSecond line: n space-separated integers (gas)\nThird line: n space-separated integers (cost)",
        output_format: "Single integer (starting index or -1)",
        constraints: "n == gas.length == cost.length\n1 <= n <= 10^5\n0 <= gas[i], cost[i] <= 10^4",
        test_input: "5\n1 2 3 4 5\n3 4 5 1 2",
        test_output: "3",
        source: "LeetCode #134"
    },
    {
        title: "Partition Labels",
        difficulty: "Medium",
        topic: "Greedy",
        description: "You are given a string s. We want to partition the string into as many parts as possible so that each letter appears in at most one part.\n\nNote that the partition is done so that after concatenating all the parts in order, the resultant string should be s.\n\nReturn a list of integers representing the size of these parts.",
        input_format: "Single line: string s",
        output_format: "Space-separated integers (partition sizes)",
        constraints: "1 <= s.length <= 500\ns consists of lowercase English letters.",
        test_input: "ababcbacadefegdehijhklij",
        test_output: "9 7 8",
        source: "LeetCode #763"
    }
];

// Generate SQL INSERT statements
function generateSQL() {
    const sqlStatements = additionalProblems.map(problem => {
        const title = problem.title.replace(/'/g, "''");
        const desc = `${problem.description}\n\n**Input Format:**\n${problem.input_format}\n\n**Output Format:**\n${problem.output_format}\n\n**Constraints:**\n${problem.constraints}\n\n**Source:** ${problem.source}`.replace(/'/g, "''");
        const input = problem.test_input.replace(/'/g, "''");
        const output = problem.test_output.replace(/'/g, "''");

        return `('${title}', '${desc}', '${problem.difficulty}', '${problem.topic}', '${input}', '${output}')`;
    });

    const sql = `-- Additional Top 50 Interview Problems\n-- Generated: ${new Date().toISOString()}\n\nINSERT INTO problems (title, description, difficulty, topic, test_case_input, test_case_output) VALUES\n${sqlStatements.join(',\n')};\n`;

    fs.writeFileSync(path.join(__dirname, 'additional_problems_seed.sql'), sql);
    console.log(`✅ Generated ${additionalProblems.length} additional problems`);
    console.log(`\nBreakdown by topic:`);
    const breakdown = additionalProblems.reduce((acc, p) => {
        acc[p.topic] = (acc[p.topic] || 0) + 1;
        return acc;
    }, {});
    Object.entries(breakdown).forEach(([topic, count]) => {
        console.log(`   ${topic}: ${count}`);
    });
}

generateSQL();
