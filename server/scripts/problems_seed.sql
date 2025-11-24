-- Real Interview Problems from LeetCode, GFG, InterviewBit, CodeStudio, CSES
-- Total: 67 problems
-- Last updated: 2025-11-21T13:46:56.359Z

INSERT INTO problems (title, description, difficulty, topic, test_case_input, test_case_output) VALUES
('Two Sum', 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.

**Input Format:**
First line: n (size of array)
Second line: n space-separated integers (array elements)
Third line: target integer

**Output Format:**
Two space-separated integers representing the indices

**Constraints:**
2 <= nums.length <= 10^4
-10^9 <= nums[i] <= 10^9
-10^9 <= target <= 10^9
Only one valid answer exists.

**Source:** LeetCode #1', 'Easy', 'Array', '4
2 7 11 15
9', '0 1'),
('Best Time to Buy and Sell Stock', 'You are given an array prices where prices[i] is the price of a given stock on the ith day.

You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.

Return the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return 0.

**Input Format:**
First line: n (number of days)
Second line: n space-separated integers (prices)

**Output Format:**
Single integer (maximum profit)

**Constraints:**
1 <= prices.length <= 10^5
0 <= prices[i] <= 10^4

**Source:** LeetCode #121', 'Easy', 'Array', '6
7 1 5 3 6 4', '5'),
('Contains Duplicate', 'Given an integer array nums, return true if any value appears at least twice in the array, and return false if every element is distinct.

**Input Format:**
First line: n (size of array)
Second line: n space-separated integers

**Output Format:**
true or false

**Constraints:**
1 <= nums.length <= 10^5
-10^9 <= nums[i] <= 10^9

**Source:** LeetCode #217', 'Easy', 'Array', '4
1 2 3 1', 'true'),
('Missing Number', 'Given an array nums containing n distinct numbers in the range [0, n], return the only number in the range that is missing from the array.

**Input Format:**
First line: n (size of array)
Second line: n space-separated integers

**Output Format:**
Single integer (missing number)

**Constraints:**
n == nums.length
1 <= n <= 10^4
0 <= nums[i] <= n
All numbers in nums are unique.

**Source:** LeetCode #268', 'Easy', 'Array', '3
3 0 1', '2'),
('Single Number', 'Given a non-empty array of integers nums, every element appears twice except for one. Find that single one.

You must implement a solution with a linear runtime complexity and use only constant extra space.

**Input Format:**
First line: n (size of array)
Second line: n space-separated integers

**Output Format:**
Single integer (the unique element)

**Constraints:**
1 <= nums.length <= 3 * 10^4
-3 * 10^4 <= nums[i] <= 3 * 10^4
Each element appears twice except for one element which appears only once.

**Source:** LeetCode #136', 'Easy', 'Array', '5
4 1 2 1 2', '4'),
('3Sum', 'Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.

Notice that the solution set must not contain duplicate triplets.

**Input Format:**
First line: n (size of array)
Second line: n space-separated integers

**Output Format:**
Each line contains a triplet in sorted order

**Constraints:**
3 <= nums.length <= 3000
-10^5 <= nums[i] <= 10^5

**Source:** LeetCode #15', 'Medium', 'Array', '6
-1 0 1 2 -1 -4', '-1 -1 2
-1 0 1'),
('Product of Array Except Self', 'Given an integer array nums, return an array answer such that answer[i] is equal to the product of all the elements of nums except nums[i].

The product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer.

You must write an algorithm that runs in O(n) time and without using the division operation.

**Input Format:**
First line: n (size of array)
Second line: n space-separated integers

**Output Format:**
n space-separated integers (product array)

**Constraints:**
2 <= nums.length <= 10^5
-30 <= nums[i] <= 30
The product of any prefix or suffix is guaranteed to fit in a 32-bit integer.

**Source:** LeetCode #238', 'Medium', 'Array', '4
1 2 3 4', '24 12 8 6'),
('Maximum Subarray (Kadane''s Algorithm)', 'Given an integer array nums, find the subarray with the largest sum, and return its sum.

A subarray is a contiguous non-empty sequence of elements within an array.

**Input Format:**
First line: n (size of array)
Second line: n space-separated integers

**Output Format:**
Single integer (maximum subarray sum)

**Constraints:**
1 <= nums.length <= 10^5
-10^4 <= nums[i] <= 10^4

**Source:** LeetCode #53', 'Medium', 'Array', '9
-2 1 -3 4 -1 2 1 -5 4', '6'),
('Container With Most Water', 'You are given an integer array height of length n. There are n vertical lines drawn such that the two endpoints of the ith line are (i, 0) and (i, height[i]).

Find two lines that together with the x-axis form a container, such that the container contains the most water.

Return the maximum amount of water a container can store.

Notice that you may not slant the container.

**Input Format:**
First line: n (number of lines)
Second line: n space-separated integers (heights)

**Output Format:**
Single integer (maximum area)

**Constraints:**
n == height.length
2 <= n <= 10^5
0 <= height[i] <= 10^4

**Source:** LeetCode #11', 'Medium', 'Array', '9
1 8 6 2 5 4 8 3 7', '49'),
('Merge Intervals', 'Given an array of intervals where intervals[i] = [starti, endi], merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.

**Input Format:**
First line: n (number of intervals)
Next n lines: two space-separated integers (start and end of interval)

**Output Format:**
Each line contains a merged interval (start end)

**Constraints:**
1 <= intervals.length <= 10^4
0 <= starti <= endi <= 10^4

**Source:** LeetCode #56', 'Medium', 'Array', '4
1 3
2 6
8 10
15 18', '1 6
8 10
15 18'),
('Trapping Rain Water', 'Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.

**Input Format:**
First line: n (number of bars)
Second line: n space-separated integers (heights)

**Output Format:**
Single integer (trapped water)

**Constraints:**
n == height.length
1 <= n <= 2 * 10^4
0 <= height[i] <= 10^5

**Source:** LeetCode #42', 'Hard', 'Array', '12
0 1 0 2 1 0 1 3 2 1 2 1', '6'),
('Valid Palindrome', 'A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Alphanumeric characters include letters and numbers.

Given a string s, return true if it is a palindrome, or false otherwise.

**Input Format:**
Single line: string s

**Output Format:**
true or false

**Constraints:**
1 <= s.length <= 2 * 10^5
s consists only of printable ASCII characters.

**Source:** LeetCode #125', 'Easy', 'String', 'A man, a plan, a canal: Panama', 'true'),
('Valid Anagram', 'Given two strings s and t, return true if t is an anagram of s, and false otherwise.

An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.

**Input Format:**
First line: string s
Second line: string t

**Output Format:**
true or false

**Constraints:**
1 <= s.length, t.length <= 5 * 10^4
s and t consist of lowercase English letters.

**Source:** LeetCode #242', 'Easy', 'String', 'anagram
nagaram', 'true'),
('Longest Substring Without Repeating Characters', 'Given a string s, find the length of the longest substring without repeating characters.

A substring is a contiguous non-empty sequence of characters within a string.

**Input Format:**
Single line: string s

**Output Format:**
Single integer (length of longest substring)

**Constraints:**
0 <= s.length <= 5 * 10^4
s consists of English letters, digits, symbols and spaces.

**Source:** LeetCode #3', 'Medium', 'String', 'abcabcbb', '3'),
('Longest Palindromic Substring', 'Given a string s, return the longest palindromic substring in s.

A substring is a contiguous non-empty sequence of characters within a string.

**Input Format:**
Single line: string s

**Output Format:**
Single line: the longest palindromic substring

**Constraints:**
1 <= s.length <= 1000
s consist of only digits and English letters.

**Source:** LeetCode #5', 'Medium', 'String', 'babad', 'bab'),
('Group Anagrams', 'Given an array of strings strs, group the anagrams together. You can return the answer in any order.

An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.

**Input Format:**
First line: n (number of strings)
Second line: n space-separated strings

**Output Format:**
Each line contains a group of anagrams (space-separated)

**Constraints:**
1 <= strs.length <= 10^4
0 <= strs[i].length <= 100
strs[i] consists of lowercase English letters.

**Source:** LeetCode #49', 'Medium', 'String', '6
eat tea tan ate nat bat', 'bat
nat tan
ate eat tea'),
('Binary Search', 'Given an array of integers nums which is sorted in ascending order, and an integer target, write a function to search target in nums. If target exists, then return its index. Otherwise, return -1.

You must write an algorithm with O(log n) runtime complexity.

**Input Format:**
First line: n (size of array)
Second line: n space-separated integers (sorted array)
Third line: target integer

**Output Format:**
Single integer (index of target, or -1 if not found)

**Constraints:**
1 <= nums.length <= 10^4
-10^4 < nums[i], target < 10^4
All the integers in nums are unique.
nums is sorted in ascending order.

**Source:** LeetCode #704', 'Easy', 'Binary Search', '6
-1 0 3 5 9 12
9', '4'),
('Search Insert Position', 'Given a sorted array of distinct integers and a target value, return the index if the target is found. If not, return the index where it would be if it were inserted in order.

You must write an algorithm with O(log n) runtime complexity.

**Input Format:**
First line: n (size of array)
Second line: n space-separated integers (sorted array)
Third line: target integer

**Output Format:**
Single integer (index)

**Constraints:**
1 <= nums.length <= 10^4
-10^4 <= nums[i] <= 10^4
nums contains distinct values sorted in ascending order.
-10^4 <= target <= 10^4

**Source:** LeetCode #35', 'Easy', 'Binary Search', '4
1 3 5 6
5', '2'),
('Search in Rotated Sorted Array', 'There is an integer array nums sorted in ascending order (with distinct values).

Prior to being passed to your function, nums is possibly rotated at an unknown pivot index k (1 <= k < nums.length) such that the resulting array is [nums[k], nums[k+1], ..., nums[n-1], nums[0], nums[1], ..., nums[k-1]] (0-indexed). For example, [0,1,2,4,5,6,7] might be rotated at pivot index 3 and become [4,5,6,7,0,1,2].

Given the array nums after the possible rotation and an integer target, return the index of target if it is in nums, or -1 if it is not in nums.

You must write an algorithm with O(log n) runtime complexity.

**Input Format:**
First line: n (size of array)
Second line: n space-separated integers (rotated sorted array)
Third line: target integer

**Output Format:**
Single integer (index of target, or -1 if not found)

**Constraints:**
1 <= nums.length <= 5000
-10^4 <= nums[i] <= 10^4
All values of nums are unique.
nums is an ascending array that is possibly rotated.
-10^4 <= target <= 10^4

**Source:** LeetCode #33', 'Medium', 'Binary Search', '7
4 5 6 7 0 1 2
0', '4'),
('Find Peak Element', 'A peak element is an element that is strictly greater than its neighbors.

Given a 0-indexed integer array nums, find a peak element, and return its index. If the array contains multiple peaks, return the index to any of the peaks.

You may imagine that nums[-1] = nums[n] = -∞. In other words, an element is always considered to be strictly greater than a neighbor that is outside the array.

You must write an algorithm that runs in O(log n) time.

**Input Format:**
First line: n (size of array)
Second line: n space-separated integers

**Output Format:**
Single integer (index of a peak element)

**Constraints:**
1 <= nums.length <= 1000
-2^31 <= nums[i] <= 2^31 - 1
nums[i] != nums[i + 1] for all valid i.

**Source:** LeetCode #162', 'Medium', 'Binary Search', '4
1 2 3 1', '2'),
('Reverse Linked List', 'Given the head of a singly linked list, reverse the list, and return the reversed list.

**Input Format:**
First line: n (number of nodes)
Second line: n space-separated integers (node values)

**Output Format:**
n space-separated integers (reversed list)

**Constraints:**
The number of nodes in the list is the range [0, 5000].
-5000 <= Node.val <= 5000

**Source:** LeetCode #206', 'Easy', 'Linked List', '5
1 2 3 4 5', '5 4 3 2 1'),
('Merge Two Sorted Lists', 'You are given the heads of two sorted linked lists list1 and list2.

Merge the two lists into one sorted list. The list should be made by splicing together the nodes of the first two lists.

Return the head of the merged linked list.

**Input Format:**
First line: n1 (size of list1)
Second line: n1 space-separated integers
Third line: n2 (size of list2)
Fourth line: n2 space-separated integers

**Output Format:**
Space-separated integers (merged sorted list)

**Constraints:**
The number of nodes in both lists is in the range [0, 50].
-100 <= Node.val <= 100
Both list1 and list2 are sorted in non-decreasing order.

**Source:** LeetCode #21', 'Easy', 'Linked List', '3
1 2 4
3
1 3 4', '1 1 2 3 4 4'),
('Linked List Cycle', 'Given head, the head of a linked list, determine if the linked list has a cycle in it.

There is a cycle in a linked list if there is some node in the list that can be reached again by continuously following the next pointer. Internally, pos is used to denote the index of the node that tail''s next pointer is connected to. Note that pos is not passed as a parameter.

Return true if there is a cycle in the linked list. Otherwise, return false.

**Input Format:**
First line: n (number of nodes)
Second line: n space-separated integers (node values)
Third line: pos (position where tail connects to, -1 for no cycle)

**Output Format:**
true or false

**Constraints:**
The number of the nodes in the list is in the range [0, 10^4].
-10^5 <= Node.val <= 10^5
pos is -1 or a valid index in the linked-list.

**Source:** LeetCode #141', 'Easy', 'Linked List', '4
3 2 0 -4
1', 'true'),
('Add Two Numbers', 'You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.

You may assume the two numbers do not contain any leading zero, except the number 0 itself.

**Input Format:**
First line: n1 (size of list1)
Second line: n1 space-separated integers
Third line: n2 (size of list2)
Fourth line: n2 space-separated integers

**Output Format:**
Space-separated integers (sum as linked list in reverse order)

**Constraints:**
The number of nodes in each linked list is in the range [1, 100].
0 <= Node.val <= 9
It is guaranteed that the list represents a number that does not have leading zeros.

**Source:** LeetCode #2', 'Medium', 'Linked List', '3
2 4 3
3
5 6 4', '7 0 8'),
('Remove Nth Node From End of List', 'Given the head of a linked list, remove the nth node from the end of the list and return its head.

**Input Format:**
First line: n (size of list)
Second line: n space-separated integers (node values)
Third line: k (position from end to remove)

**Output Format:**
Space-separated integers (modified list)

**Constraints:**
The number of nodes in the list is sz.
1 <= sz <= 30
0 <= Node.val <= 100
1 <= n <= sz

**Source:** LeetCode #19', 'Medium', 'Linked List', '5
1 2 3 4 5
2', '1 2 3 5'),
('Maximum Depth of Binary Tree', 'Given the root of a binary tree, return its maximum depth.

A binary tree''s maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.

**Input Format:**
Level-order traversal: space-separated values (null for empty nodes)

**Output Format:**
Single integer (maximum depth)

**Constraints:**
The number of nodes in the tree is in the range [0, 10^4].
-100 <= Node.val <= 100

**Source:** LeetCode #104', 'Easy', 'Tree', '3 9 20 null null 15 7', '3'),
('Invert Binary Tree', 'Given the root of a binary tree, invert the tree, and return its root.

Inverting a binary tree means swapping the left and right children for every node.

**Input Format:**
Level-order traversal: space-separated values (null for empty nodes)

**Output Format:**
Level-order traversal of inverted tree

**Constraints:**
The number of nodes in the tree is in the range [0, 100].
-100 <= Node.val <= 100

**Source:** LeetCode #226', 'Easy', 'Tree', '4 2 7 1 3 6 9', '4 7 2 9 6 3 1'),
('Binary Tree Level Order Traversal', 'Given the root of a binary tree, return the level order traversal of its nodes'' values. (i.e., from left to right, level by level).

**Input Format:**
Level-order traversal: space-separated values (null for empty nodes)

**Output Format:**
Each line contains values at one level

**Constraints:**
The number of nodes in the tree is in the range [0, 2000].
-1000 <= Node.val <= 1000

**Source:** LeetCode #102', 'Medium', 'Tree', '3 9 20 null null 15 7', '3
9 20
15 7'),
('Validate Binary Search Tree', 'Given the root of a binary tree, determine if it is a valid binary search tree (BST).

A valid BST is defined as follows:
- The left subtree of a node contains only nodes with keys less than the node''s key.
- The right subtree of a node contains only nodes with keys greater than the node''s key.
- Both the left and right subtrees must also be binary search trees.

**Input Format:**
Level-order traversal: space-separated values (null for empty nodes)

**Output Format:**
true or false

**Constraints:**
The number of nodes in the tree is in the range [1, 10^4].
-2^31 <= Node.val <= 2^31 - 1

**Source:** LeetCode #98', 'Medium', 'Tree', '2 1 3', 'true'),
('Climbing Stairs', 'You are climbing a staircase. It takes n steps to reach the top.

Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?

**Input Format:**
Single integer n (number of steps)

**Output Format:**
Single integer (number of distinct ways)

**Constraints:**
1 <= n <= 45

**Source:** LeetCode #70', 'Easy', 'Dynamic Programming', '3', '3'),
('House Robber', 'You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed, the only constraint stopping you from robbing each of them is that adjacent houses have security systems connected and it will automatically contact the police if two adjacent houses were broken into on the same night.

Given an integer array nums representing the amount of money of each house, return the maximum amount of money you can rob tonight without alerting the police.

**Input Format:**
First line: n (number of houses)
Second line: n space-separated integers (money in each house)

**Output Format:**
Single integer (maximum amount)

**Constraints:**
1 <= nums.length <= 100
0 <= nums[i] <= 400

**Source:** LeetCode #198', 'Easy', 'Dynamic Programming', '4
1 2 3 1', '4'),
('Coin Change', 'You are given an integer array coins representing coins of different denominations and an integer amount representing a total amount of money.

Return the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return -1.

You may assume that you have an infinite number of each kind of coin.

**Input Format:**
First line: n (number of coin types)
Second line: n space-separated integers (coin denominations)
Third line: amount

**Output Format:**
Single integer (minimum coins needed, or -1)

**Constraints:**
1 <= coins.length <= 12
1 <= coins[i] <= 2^31 - 1
0 <= amount <= 10^4

**Source:** LeetCode #322', 'Medium', 'Dynamic Programming', '3
1 2 5
11', '3'),
('Longest Increasing Subsequence', 'Given an integer array nums, return the length of the longest strictly increasing subsequence.

A subsequence is an array that can be derived from another array by deleting some or no elements without changing the order of the remaining elements.

**Input Format:**
First line: n (size of array)
Second line: n space-separated integers

**Output Format:**
Single integer (length of LIS)

**Constraints:**
1 <= nums.length <= 2500
-10^4 <= nums[i] <= 10^4

**Source:** LeetCode #300', 'Medium', 'Dynamic Programming', '8
10 9 2 5 3 7 101 18', '4'),
('Unique Paths', 'There is a robot on an m x n grid. The robot is initially located at the top-left corner (i.e., grid[0][0]). The robot tries to move to the bottom-right corner (i.e., grid[m - 1][n - 1]). The robot can only move either down or right at any point in time.

Given the two integers m and n, return the number of possible unique paths that the robot can take to reach the bottom-right corner.

The test cases are generated so that the answer will be less than or equal to 2 * 10^9.

**Input Format:**
Two space-separated integers m and n

**Output Format:**
Single integer (number of unique paths)

**Constraints:**
1 <= m, n <= 100

**Source:** LeetCode #62', 'Medium', 'Dynamic Programming', '3 7', '28'),
('0/1 Knapsack Problem', 'You are given weights and values of N items, put these items in a knapsack of capacity W to get the maximum total value in the knapsack. Note that we have only one quantity of each item.

In other words, given two integer arrays val[0..N-1] and wt[0..N-1] which represent values and weights associated with N items respectively. Also given an integer W which represents knapsack capacity, find out the maximum value subset of val[] such that sum of the weights of this subset is smaller than or equal to W. You cannot break an item, either pick the complete item or don''t pick it (0-1 property).

**Input Format:**
First line: N W (number of items and capacity)
Second line: N space-separated integers (weights)
Third line: N space-separated integers (values)

**Output Format:**
Single integer (maximum value)

**Constraints:**
1 ≤ N ≤ 1000
1 ≤ W ≤ 1000
1 ≤ wt[i] ≤ 1000
1 ≤ val[i] ≤ 1000

**Source:** GFG Classic', 'Medium', 'Dynamic Programming', '3 4
4 5 1
1 2 3', '3'),
('Number of Islands', 'Given an m x n 2D binary grid grid which represents a map of ''1''s (land) and ''0''s (water), return the number of islands.

An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are all surrounded by water.

**Input Format:**
First line: m n (rows and columns)
Next m lines: n space-separated integers (0 or 1)

**Output Format:**
Single integer (number of islands)

**Constraints:**
m == grid.length
n == grid[i].length
1 <= m, n <= 300
grid[i][j] is ''0'' or ''1''.

**Source:** LeetCode #200', 'Medium', 'Graph', '4 5
1 1 1 1 0
1 1 0 1 0
1 1 0 0 0
0 0 0 0 0', '1'),
('Course Schedule', 'There are a total of numCourses courses you have to take, labeled from 0 to numCourses - 1. You are given an array prerequisites where prerequisites[i] = [ai, bi] indicates that you must take course bi first if you want to take course ai.

For example, the pair [0, 1], indicates that to take course 0 you have to first take course 1.

Return true if you can finish all courses. Otherwise, return false.

**Input Format:**
First line: numCourses numPrerequisites
Next numPrerequisites lines: two space-separated integers (course prerequisite)

**Output Format:**
true or false

**Constraints:**
1 <= numCourses <= 2000
0 <= prerequisites.length <= 5000
prerequisites[i].length == 2
0 <= ai, bi < numCourses
All the pairs prerequisites[i] are unique.

**Source:** LeetCode #207', 'Medium', 'Graph', '2 1
1 0', 'true'),
('Valid Parentheses', 'Given a string s containing just the characters ''('', '')'', ''{'', ''}'', ''['' and '']'', determine if the input string is valid.

An input string is valid if:
1. Open brackets must be closed by the same type of brackets.
2. Open brackets must be closed in the correct order.
3. Every close bracket has a corresponding open bracket of the same type.

**Input Format:**
Single line: string s

**Output Format:**
true or false

**Constraints:**
1 <= s.length <= 10^4
s consists of parentheses only ''()[]{}''.

**Source:** LeetCode #20', 'Easy', 'Stack', '()[]{}', 'true'),
('Daily Temperatures', 'Given an array of integers temperatures represents the daily temperatures, return an array answer such that answer[i] is the number of days you have to wait after the ith day to get a warmer temperature. If there is no future day for which this is possible, keep answer[i] == 0 instead.

**Input Format:**
First line: n (number of days)
Second line: n space-separated integers (temperatures)

**Output Format:**
n space-separated integers (days to wait)

**Constraints:**
1 <= temperatures.length <= 10^5
30 <= temperatures[i] <= 100

**Source:** LeetCode #739', 'Medium', 'Stack', '8
73 74 75 71 69 72 76 73', '1 1 4 2 1 1 0 0'),
('Largest Rectangle in Histogram', 'Given an array of integers heights representing the histogram''s bar height where the width of each bar is 1, return the area of the largest rectangle in the histogram.

**Input Format:**
First line: n (number of bars)
Second line: n space-separated integers (heights)

**Output Format:**
Single integer (maximum area)

**Constraints:**
1 <= heights.length <= 10^5
0 <= heights[i] <= 10^4

**Source:** LeetCode #84', 'Hard', 'Stack', '6
2 1 5 6 2 3', '10'),
('Jump Game', 'You are given an integer array nums. You are initially positioned at the array''s first index, and each element in the array represents your maximum jump length at that position.

Return true if you can reach the last index, or false otherwise.

**Input Format:**
First line: n (size of array)
Second line: n space-separated integers

**Output Format:**
true or false

**Constraints:**
1 <= nums.length <= 10^4
0 <= nums[i] <= 10^5

**Source:** LeetCode #55', 'Medium', 'Greedy', '5
2 3 1 1 4', 'true'),
('Permutations', 'Given an array nums of distinct integers, return all the possible permutations. You can return the answer in any order.

**Input Format:**
First line: n (size of array)
Second line: n space-separated integers

**Output Format:**
Each line contains a permutation (space-separated integers)

**Constraints:**
1 <= nums.length <= 6
-10 <= nums[i] <= 10
All the integers of nums are unique.

**Source:** LeetCode #46', 'Medium', 'Backtracking', '3
1 2 3', '1 2 3
1 3 2
2 1 3
2 3 1
3 1 2
3 2 1'),
('Subsets', 'Given an integer array nums of unique elements, return all possible subsets (the power set).

The solution set must not contain duplicate subsets. Return the solution in any order.

**Input Format:**
First line: n (size of array)
Second line: n space-separated integers

**Output Format:**
Each line contains a subset (space-separated integers, empty line for empty subset)

**Constraints:**
1 <= nums.length <= 10
-10 <= nums[i] <= 10
All the numbers of nums are unique.

**Source:** LeetCode #78', 'Medium', 'Backtracking', '3
1 2 3', '
1
2
1 2
3
1 3
2 3
1 2 3'),
('Top K Frequent Elements', 'Given an integer array nums and an integer k, return the k most frequent elements. You may return the answer in any order.

**Input Format:**
First line: n (size of array)
Second line: n space-separated integers
Third line: k

**Output Format:**
k space-separated integers (most frequent elements)

**Constraints:**
1 <= nums.length <= 10^5
-10^4 <= nums[i] <= 10^4
k is in the range [1, the number of unique elements in the array].
It is guaranteed that the answer is unique.

**Source:** LeetCode #347', 'Medium', 'Heap', '6
1 1 1 2 2 3
2', '1 2'),
('Kth Largest Element in an Array', 'Given an integer array nums and an integer k, return the kth largest element in the array.

Note that it is the kth largest element in the sorted order, not the kth distinct element.

Can you solve it without sorting?

**Input Format:**
First line: n (size of array)
Second line: n space-separated integers
Third line: k

**Output Format:**
Single integer (kth largest element)

**Constraints:**
1 <= k <= nums.length <= 10^5
-10^4 <= nums[i] <= 10^4

**Source:** LeetCode #215', 'Medium', 'Heap', '6
3 2 1 5 6 4
2', '5'),
('Palindrome Linked List', 'Given the head of a singly linked list, return true if it is a palindrome.

**Input Format:**
First line: n (number of nodes)
Second line: n space-separated integers

**Output Format:**
true or false

**Constraints:**
The number of nodes in the list is in the range [1, 10^5].
0 <= Node.val <= 9

**Source:** LeetCode #234', 'Easy', 'Linked List', '4
1 2 2 1', 'true'),
('Intersection of Two Linked Lists', 'Given the heads of two singly linked-lists headA and headB, return the node at which the two lists intersect. If the two linked lists have no intersection at all, return null.

**Input Format:**
First line: intersectVal (value of intersection node, 0 if none)
Second line: listA values
Third line: listB values
(Note: Input format simplified for testing)

**Output Format:**
Reference of the node (or null)

**Constraints:**
The number of nodes of listA is in the m.
The number of nodes of listB is in the n.
1 <= m, n <= 3 * 10^4

**Source:** LeetCode #160', 'Easy', 'Linked List', '8
4 1 8 4 5
5 6 1 8 4 5', '8'),
('Merge k Sorted Lists', 'You are given an array of k linked-lists lists, each linked-list is sorted in ascending order.

Merge all the linked-lists into one sorted linked-list and return it.

**Input Format:**
First line: k (number of lists)
Next k lines: each line starts with n (size) followed by n integers

**Output Format:**
Space-separated integers (merged list)

**Constraints:**
k == lists.length
0 <= k <= 10^4
0 <= lists[i].length <= 500

**Source:** LeetCode #23', 'Hard', 'Linked List', '3
3 1 4 5
3 1 3 4
2 2 6', '1 1 2 3 4 4 5 6'),
('Min Stack', 'Design a stack that supports push, pop, top, and retrieving the minimum element in constant time.

**Input Format:**
Commands and values

**Output Format:**
Output of commands

**Constraints:**
-2^31 <= val <= 2^31 - 1

**Source:** LeetCode #155', 'Easy', 'Stack', 'push -2
push 0
push -3
getMin
pop
top
getMin', '-3
0
-2'),
('Evaluate Reverse Polish Notation', 'Evaluate the value of an arithmetic expression in Reverse Polish Notation.

Valid operators are +, -, *, and /.

**Input Format:**
Space-separated tokens

**Output Format:**
Single integer (result)

**Constraints:**
1 <= tokens.length <= 10^4

**Source:** LeetCode #150', 'Medium', 'Stack', '2 1 + 3 *', '9'),
('Decode String', 'Given an encoded string, return its decoded string.

The encoding rule is: k[encoded_string], where the encoded_string inside the square brackets is being repeated exactly k times.

**Input Format:**
Single string s

**Output Format:**
Decoded string

**Constraints:**
1 <= s.length <= 30

**Source:** LeetCode #394', 'Medium', 'Stack', '3[a]2[bc]', 'aaabcbc'),
('Task Scheduler', 'Given a characters array tasks, representing the tasks a CPU needs to do, where each letter represents a different task. Tasks could be done in any order. Each task is done in one unit of time. For each unit of time, the CPU could complete either one task or just be idle.

However, there is a non-negative integer n that represents the cooldown period between two same tasks (the same letter in the array), that is that there must be at least n units of time between any two same tasks.

Return the least number of units of times that the CPU will take to finish all the given tasks.

**Input Format:**
First line: tasks (space-separated characters)
Second line: n (cooldown)

**Output Format:**
Single integer

**Constraints:**
1 <= task.length <= 10^4
0 <= n <= 100

**Source:** LeetCode #621', 'Medium', 'Queue', 'A A A B B B
2', '8'),
('Sliding Window Maximum', 'You are given an array of integers nums, there is a sliding window of size k which is moving from the very left of the array to the very right. You can only see the k numbers in the window. Each time the sliding window moves right by one position.

Return the max sliding window.

**Input Format:**
First line: n (size)
Second line: n integers
Third line: k

**Output Format:**
Space-separated integers

**Constraints:**
1 <= nums.length <= 10^5
1 <= k <= nums.length

**Source:** LeetCode #239', 'Hard', 'Queue', '8
1 3 -1 -3 5 3 6 7
3', '3 3 5 5 6 7'),
('Rotting Oranges', 'You are given an m x n grid where each cell can have one of three values:
0 representing an empty cell,
1 representing a fresh orange, or
2 representing a rotten orange.
Every minute, any fresh orange that is 4-directionally adjacent to a rotten orange becomes rotten.

Return the minimum number of minutes that must elapse until no cell has a fresh orange. If this is impossible, return -1.

**Input Format:**
First line: m n
Next m lines: n integers

**Output Format:**
Single integer

**Constraints:**
m == grid.length
n == grid[i].length
1 <= m, n <= 10

**Source:** LeetCode #994', 'Medium', 'Graph', '3 3
2 1 1
1 1 0
0 1 1', '4'),
('Word Ladder', 'A transformation sequence from wordBegin to wordEnd using a dictionary wordList is a sequence of words beginWord -> s1 -> s2 -> ... -> sk such that:
Every adjacent pair of words differs by a single letter.
Every si for 1 <= i <= k is in wordList. Note that beginWord does not need to be in wordList.
sk == endWord.

Given two words, beginWord and endWord, and a dictionary wordList, return the number of words in the shortest transformation sequence from beginWord to endWord, or 0 if no such sequence exists.

**Input Format:**
First line: beginWord endWord
Second line: n (size of wordList)
Third line: n space-separated words

**Output Format:**
Single integer

**Constraints:**
1 <= beginWord.length <= 10

**Source:** LeetCode #127', 'Hard', 'Graph', 'hit cog
6
hot dot dog lot log cog', '5'),
('Gas Station', 'There are n gas stations along a circular route, where the amount of gas at the ith station is gas[i].

You have a car with an unlimited gas tank and it costs cost[i] of gas to travel from the ith station to its next (i + 1)th station. You begin the journey with an empty tank at one of the gas stations.

Given two integer arrays gas and cost, return the starting gas station''s index if you can travel around the circuit once in the clockwise direction, otherwise return -1. If there exists a solution, it is guaranteed to be unique

**Input Format:**
First line: n
Second line: n integers (gas)
Third line: n integers (cost)

**Output Format:**
Single integer

**Constraints:**
n == gas.length == cost.length
1 <= n <= 10^5

**Source:** LeetCode #134', 'Medium', 'Greedy', '5
1 2 3 4 5
3 4 5 1 2', '3'),
('Candy', 'There are n children standing in a line. Each child is assigned a rating value given in the integer array ratings.

You are giving candies to these children subjected to the following requirements:
Each child must have at least one candy.
Children with a higher rating get more candies than their neighbors.
Return the minimum number of candies you need to have to distribute the candies to the children.

**Input Format:**
First line: n
Second line: n integers (ratings)

**Output Format:**
Single integer

**Constraints:**
n == ratings.length
1 <= n <= 2 * 10^4

**Source:** LeetCode #135', 'Hard', 'Greedy', '3
1 0 2', '5'),
('Combination Sum', 'Given an array of distinct integers candidates and a target integer target, return a list of all unique combinations of candidates where the chosen numbers sum to target. You may return the combinations in any order.

The same number may be chosen from candidates an unlimited number of times. Two combinations are unique if the frequency of at least one of the chosen numbers is different.

**Input Format:**
First line: n
Second line: n integers
Third line: target

**Output Format:**
Each line a combination

**Constraints:**
1 <= candidates.length <= 30
1 <= target <= 500

**Source:** LeetCode #39', 'Medium', 'Backtracking', '4
2 3 6 7
7', '2 2 3
7'),
('Word Search', 'Given an m x n grid of characters board and a string word, return true if word exists in the grid.

The word can be constructed from letters of sequentially adjacent cells, where adjacent cells are horizontally or vertically neighboring. The same letter cell may not be used more than once.

**Input Format:**
First line: m n
Next m lines: n characters
Last line: word

**Output Format:**
true or false

**Constraints:**
m == board.length
n = board[i].length
1 <= m, n <= 6

**Source:** LeetCode #79', 'Medium', 'Backtracking', '3 4
A B C E
S F C S
A D E E
ABCCED', 'true'),
('N-Queens', 'The n-queens puzzle is the problem of placing n queens on an n x n chessboard such that no two queens attack each other.

Given an integer n, return all distinct solutions to the n-queens puzzle. You may return the answer in any order.

**Input Format:**
Single integer n

**Output Format:**
Number of solutions

**Constraints:**
1 <= n <= 9

**Source:** LeetCode #51', 'Hard', 'Backtracking', '4', '2'),
('Find Minimum in Rotated Sorted Array', 'Suppose an array of length n sorted in ascending order is rotated between 1 and n times. For example, the array nums = [0,1,2,4,5,6,7] might become:
[4,5,6,7,0,1,2] if it was rotated 4 times.
[0,1,2,4,5,6,7] if it was rotated 7 times.
Notice that rotating an array [a[0], a[1], a[2], ..., a[n-1]] 1 time results in the array [a[n-1], a[0], a[1], a[2], ..., a[n-2]].

Given the sorted rotated array nums of unique elements, return the minimum element of this array.

You must write an algorithm that runs in O(log n) time.

**Input Format:**
First line: n
Second line: n integers

**Output Format:**
Single integer

**Constraints:**
n == nums.length
1 <= n <= 5000

**Source:** LeetCode #153', 'Medium', 'Binary Search', '5
3 4 5 1 2', '1'),
('Split Array Largest Sum', 'Given an integer array nums and an integer k, split nums into k non-empty subarrays such that the largest sum of any subarray is minimized.

Return the minimized largest sum of the split.

**Input Format:**
First line: n
Second line: n integers
Third line: k

**Output Format:**
Single integer

**Constraints:**
1 <= nums.length <= 1000
1 <= k <= min(50, nums.length)

**Source:** LeetCode #410', 'Hard', 'Binary Search', '5
7 2 5 10 8
2', '18'),
('Sort Characters By Frequency', 'Given a string s, sort it in decreasing order based on the frequency of the characters. The frequency of a character is the number of times it appears in the string.

Return the sorted string. If there are multiple answers, return any of them.

**Input Format:**
Single string s

**Output Format:**
Sorted string

**Constraints:**
1 <= s.length <= 5 * 10^5

**Source:** LeetCode #451', 'Medium', 'Heap', 'tree', 'eert'),
('Find Median from Data Stream', 'The median is the middle value in an ordered integer list. If the size of the list is even, there is no middle value, and the median is the mean of the two middle values.

Implement the MedianFinder class:
MedianFinder() initializes the MedianFinder object.
void addNum(int num) adds the integer num from the data stream to the data structure.
double findMedian() returns the median of all elements so far.

**Input Format:**
Commands and values

**Output Format:**
Output of commands

**Constraints:**
-10^5 <= num <= 10^5

**Source:** LeetCode #295', 'Hard', 'Heap', 'addNum 1
addNum 2
findMedian
addNum 3
findMedian', '1.5
2.0'),
('Ransom Note', 'Given two strings ransomNote and magazine, return true if ransomNote can be constructed by using the letters from magazine and false otherwise.

Each letter in magazine can only be used once in ransomNote.

**Input Format:**
First line: ransomNote
Second line: magazine

**Output Format:**
true or false

**Constraints:**
1 <= ransomNote.length, magazine.length <= 10^5

**Source:** LeetCode #383', 'Easy', 'Hashing', 'a
b', 'false'),
('Longest Consecutive Sequence', 'Given an unsorted array of integers nums, return the length of the longest consecutive elements sequence.

You must write an algorithm that runs in O(n) time.

**Input Format:**
First line: n
Second line: n integers

**Output Format:**
Single integer

**Constraints:**
0 <= nums.length <= 10^5

**Source:** LeetCode #128', 'Medium', 'Hashing', '6
100 4 200 1 3 2', '4'),
('Subarray Sum Equals K', 'Given an array of integers nums and an integer k, return the total number of subarrays whose sum equals to k.

A subarray is a contiguous non-empty sequence of elements within an array.

**Input Format:**
First line: n
Second line: n integers
Third line: k

**Output Format:**
Single integer

**Constraints:**
1 <= nums.length <= 2 * 10^4
-1000 <= nums[i] <= 1000
-10^7 <= k <= 10^7

**Source:** LeetCode #560', 'Medium', 'Hashing', '3
1 1 1
2', '2');
