-- Additional Top 50 Interview Problems
-- Generated: 2025-11-21T13:46:56.622Z

INSERT INTO problems (title, description, difficulty, topic, test_case_input, test_case_output) VALUES
('Rotate Array', 'Given an integer array nums, rotate the array to the right by k steps, where k is non-negative.

Example 1:
Input: nums = [1,2,3,4,5,6,7], k = 3
Output: [5,6,7,1,2,3,4]
Explanation:
rotate 1 steps to the right: [7,1,2,3,4,5,6]
rotate 2 steps to the right: [6,7,1,2,3,4,5]
rotate 3 steps to the right: [5,6,7,1,2,3,4]

**Input Format:**
First line: n (size of array)
Second line: n space-separated integers
Third line: k (rotation steps)

**Output Format:**
n space-separated integers (rotated array)

**Constraints:**
1 <= nums.length <= 10^5
-2^31 <= nums[i] <= 2^31 - 1
0 <= k <= 10^5

**Source:** LeetCode #189', 'Medium', 'Array', '7
1 2 3 4 5 6 7
3', '5 6 7 1 2 3 4'),
('Find All Duplicates in an Array', 'Given an integer array nums of length n where all the integers of nums are in the range [1, n] and each integer appears once or twice, return an array of all the integers that appears twice.

You must write an algorithm that runs in O(n) time and uses only constant extra space.

**Input Format:**
First line: n (size of array)
Second line: n space-separated integers

**Output Format:**
Space-separated integers (duplicates in any order)

**Constraints:**
n == nums.length
1 <= n <= 10^5
1 <= nums[i] <= n
Each element in nums appears once or twice.

**Source:** LeetCode #442', 'Medium', 'Array', '8
4 3 2 7 8 2 3 1', '2 3'),
('Next Permutation', 'A permutation of an array of integers is an arrangement of its members into a sequence or linear order.

The next permutation of an array of integers is the next lexicographically greater permutation of its integer. More formally, if all the permutations of the array are sorted in one container according to their lexicographical order, then the next permutation of that array is the permutation that follows it in the sorted container. If such arrangement is not possible, the array must be rearranged as the lowest possible order (i.e., sorted in ascending order).

For example, the next permutation of arr = [1,2,3] is [1,3,2].
Similarly, the next permutation of arr = [2,3,1] is [3,1,2].
While the next permutation of arr = [3,2,1] is [1,2,3] because [3,2,1] does not have a lexicographical larger rearrangement.

**Input Format:**
First line: n (size of array)
Second line: n space-separated integers

**Output Format:**
n space-separated integers (next permutation)

**Constraints:**
1 <= nums.length <= 100
0 <= nums[i] <= 100

**Source:** LeetCode #31', 'Medium', 'Array', '3
1 2 3', '1 3 2'),
('Sort Colors (Dutch National Flag)', 'Given an array nums with n objects colored red, white, or blue, sort them in-place so that objects of the same color are adjacent, with the colors in the order red, white, and blue.

We will use the integers 0, 1, and 2 to represent the color red, white, and blue, respectively.

You must solve this problem without using the library''s sort function.

**Input Format:**
First line: n (size of array)
Second line: n space-separated integers (0, 1, or 2)

**Output Format:**
n space-separated integers (sorted array)

**Constraints:**
n == nums.length
1 <= n <= 300
nums[i] is either 0, 1, or 2.

**Source:** LeetCode #75', 'Medium', 'Array', '6
2 0 2 1 1 0', '0 0 1 1 2 2'),
('Majority Element', 'Given an array nums of size n, return the majority element.

The majority element is the element that appears more than ⌊n / 2⌋ times. You may assume that the majority element always exists in the array.

**Input Format:**
First line: n (size of array)
Second line: n space-separated integers

**Output Format:**
Single integer (majority element)

**Constraints:**
n == nums.length
1 <= n <= 5 * 10^4
-10^9 <= nums[i] <= 10^9

**Source:** LeetCode #169', 'Easy', 'Array', '7
2 2 1 1 1 2 2', '2'),
('Reverse Words in a String', 'Given an input string s, reverse the order of the words.

A word is defined as a sequence of non-space characters. The words in s will be separated by at least one space.

Return a string of the words in reverse order concatenated by a single space.

Note that s may contain leading or trailing spaces or multiple spaces between two words. The returned string should only have a single space separating the words. Do not include any extra spaces.

**Input Format:**
Single line: string s

**Output Format:**
Single line: reversed words

**Constraints:**
1 <= s.length <= 10^4
s contains English letters (upper-case and lower-case), digits, and spaces '' ''.
There is at least one word in s.

**Source:** LeetCode #151', 'Medium', 'String', 'the sky is blue', 'blue is sky the'),
('Implement strStr()', 'Given two strings needle and haystack, return the index of the first occurrence of needle in haystack, or -1 if needle is not part of haystack.

Clarification:
What should we return when needle is an empty string? This is a great question to ask during an interview.
For the purpose of this problem, we will return 0 when needle is an empty string.

**Input Format:**
First line: haystack string
Second line: needle string

**Output Format:**
Single integer (index or -1)

**Constraints:**
1 <= haystack.length, needle.length <= 10^4
haystack and needle consist of only lowercase English characters.

**Source:** LeetCode #28', 'Easy', 'String', 'sadbutsad
sad', '0'),
('String to Integer (atoi)', 'Implement the myAtoi(string s) function, which converts a string to a 32-bit signed integer (similar to C/C++''s atoi function).

The algorithm for myAtoi(string s) is as follows:
1. Read in and ignore any leading whitespace.
2. Check if the next character (if not already at the end of the string) is ''-'' or ''+''. Read this character in if it is either. This determines if the final result is negative or positive respectively. Assume the result is positive if neither is present.
3. Read in next the characters until the next non-digit character or the end of the input is reached. The rest of the string is ignored.
4. Convert these digits into an integer (i.e. "123" -> 123, "0032" -> 32). If no digits were read, then the integer is 0. Change the sign as necessary (from step 2).
5. If the integer is out of the 32-bit signed integer range [-2^31, 2^31 - 1], then clamp the integer so that it remains in the range. Specifically, integers less than -2^31 should be clamped to -2^31, and integers greater than 2^31 - 1 should be clamped to 2^31 - 1.
6. Return the integer as the final result.

**Input Format:**
Single line: string s

**Output Format:**
Single integer

**Constraints:**
0 <= s.length <= 200
s consists of English letters (lower-case and upper-case), digits (0-9), '' '', ''+'', ''-'', and ''.''.

**Source:** LeetCode #8', 'Medium', 'String', '42', '42'),
('Minimum Window Substring', 'Given two strings s and t of lengths m and n respectively, return the minimum window substring of s such that every character in t (including duplicates) is included in the window. If there is no such substring, return the empty string "".

The testcases will be generated such that the answer is unique.

**Input Format:**
First line: string s
Second line: string t

**Output Format:**
Single line: minimum window substring

**Constraints:**
m == s.length
n == t.length
1 <= m, n <= 10^5
s and t consist of uppercase and lowercase English letters.

**Source:** LeetCode #76', 'Hard', 'String', 'ADOBECODEBANC
ABC', 'BANC'),
('Longest Common Prefix', 'Write a function to find the longest common prefix string amongst an array of strings.

If there is no common prefix, return an empty string "".

**Input Format:**
First line: n (number of strings)
Second line: n space-separated strings

**Output Format:**
Single line: longest common prefix

**Constraints:**
1 <= strs.length <= 200
0 <= strs[i].length <= 200
strs[i] consists of only lowercase English letters.

**Source:** LeetCode #14', 'Easy', 'String', '3
flower flow flight', 'fl'),
('Palindrome Linked List', 'Given the head of a singly linked list, return true if it is a palindrome or false otherwise.

**Input Format:**
First line: n (number of nodes)
Second line: n space-separated integers (node values)

**Output Format:**
true or false

**Constraints:**
The number of nodes in the list is in the range [1, 10^5].
0 <= Node.val <= 9

**Source:** LeetCode #234', 'Easy', 'Linked List', '4
1 2 2 1', 'true'),
('Reorder List', 'You are given the head of a singly linked-list. The list can be represented as:
L0 → L1 → … → Ln - 1 → Ln

Reorder the list to be on the following form:
L0 → Ln → L1 → Ln - 1 → L2 → Ln - 2 → …

You may not modify the values in the list''s nodes. Only nodes themselves may be changed.

**Input Format:**
First line: n (number of nodes)
Second line: n space-separated integers

**Output Format:**
n space-separated integers (reordered list)

**Constraints:**
The number of nodes in the list is in the range [1, 5 * 10^4].
1 <= Node.val <= 1000

**Source:** LeetCode #143', 'Medium', 'Linked List', '5
1 2 3 4 5', '1 5 2 4 3'),
('Intersection of Two Linked Lists', 'Given a string s and a dictionary of strings wordDict, return true if s can be segmented into a space-separated sequence of one or more dictionary words.

Note that the same word in the dictionary may be reused multiple times in the segmentation.

**Input Format:**
First line: string s
Second line: n (number of words)
Third line: n space-separated words

**Output Format:**
true or false

**Constraints:**
1 <= s.length <= 300
1 <= wordDict.length <= 1000
1 <= wordDict[i].length <= 20
s and wordDict[i] consist of only lowercase English letters.
All the strings of wordDict are unique.

**Source:** LeetCode #139', 'Easy', 'Dynamic Programming', 'leetcode
2
leet code', 'true'),
('Partition Equal Subset Sum', 'Given an integer array nums, return true if you can partition the array into two subsets such that the sum of the elements in both subsets is equal or false otherwise.

**Input Format:**
First line: n (size of array)
Second line: n space-separated integers

**Output Format:**
true or false

**Constraints:**
1 <= nums.length <= 200
1 <= nums[i] <= 100

**Source:** LeetCode #416', 'Medium', 'Dynamic Programming', '4
1 5 11 5', 'true'),
('Edit Distance', 'Given two strings word1 and word2, return the minimum number of operations required to convert word1 to word2.

You have the following three operations permitted on a word:
- Insert a character
- Delete a character
- Replace a character

**Input Format:**
First line: word1
Second line: word2

**Output Format:**
Single integer (minimum operations)

**Constraints:**
0 <= word1.length, word2.length <= 500
word1 and word2 consist of lowercase English letters.

**Source:** LeetCode #72', 'Medium', 'Dynamic Programming', 'horse
ros', '3'),
('Decode Ways', 'A message containing letters from A-Z can be encoded into numbers using the following mapping:
''A'' -> "1"
''B'' -> "2"
...
''Z'' -> "26"

To decode an encoded message, all the digits must be grouped then mapped back into letters using the reverse of the mapping above (there may be multiple ways). For example, "11106" can be mapped into:
- "AAJF" with the grouping (1 1 10 6)
- "KJF" with the grouping (11 10 6)

Note that the grouping (1 11 06) is invalid because "06" cannot be mapped into ''F'' since "6" is different from "06".

Given a string s containing only digits, return the number of ways to decode it.

**Input Format:**
Single line: string s

**Output Format:**
Single integer (number of ways)

**Constraints:**
1 <= s.length <= 100
s contains only digits and may contain leading zero(s).

**Source:** LeetCode #91', 'Medium', 'Dynamic Programming', '12', '2'),
('Maximum Product Subarray', 'Given an integer array nums, find a subarray that has the largest product, and return the product.

The test cases are generated so that the answer will fit in a 32-bit integer.

**Input Format:**
First line: n (size of array)
Second line: n space-separated integers

**Output Format:**
Single integer (maximum product)

**Constraints:**
1 <= nums.length <= 2 * 10^4
-10 <= nums[i] <= 10
The product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer.

**Source:** LeetCode #152', 'Medium', 'Dynamic Programming', '4
2 3 -2 4', '6'),
('Clone Graph', 'Given a reference of a node in a connected undirected graph.

Return a deep copy (clone) of the graph.

Each node in the graph contains a value (int) and a list (List[Node]) of its neighbors.

**Input Format:**
First line: n (number of nodes)
Next n lines: node_value space-separated neighbor values

**Output Format:**
Same as input (cloned graph)

**Constraints:**
The number of nodes in the graph is in the range [0, 100].
1 <= Node.val <= 100
Node.val is unique for each node.
There are no repeated edges and no self-loops in the graph.
The Graph is connected and all nodes can be visited starting from the given node.

**Source:** LeetCode #133', 'Medium', 'Graph', '4
1 2 4
2 1 3
3 2 4
4 1 3', '4
1 2 4
2 1 3
3 2 4
4 1 3'),
('Pacific Atlantic Water Flow', 'There is an m x n rectangular island that borders both the Pacific Ocean and Atlantic Ocean. The Pacific Ocean touches the island''s left and top edges, and the Atlantic Ocean touches the island''s right and bottom edges.

The island is partitioned into a grid of square cells. You are given an m x n integer matrix heights where heights[r][c] represents the height above sea level of the cell at coordinate (r, c).

The island receives a lot of rain, and the rain water can flow to neighboring cells directly north, south, east, and west if the neighboring cell''s height is less than or equal to the current cell''s height. Water can flow from any cell adjacent to an ocean into the ocean.

Return a 2D list of grid coordinates result where result[i] = [ri, ci] denotes that rain water can flow from cell (ri, ci) to both the Pacific and Atlantic oceans.

**Input Format:**
First line: m n (rows and columns)
Next m lines: n space-separated integers (heights)

**Output Format:**
Each line: row col (cells that can flow to both oceans)

**Constraints:**
m == heights.length
n == heights[r].length
1 <= m, n <= 200
0 <= heights[r][c] <= 10^5

**Source:** LeetCode #417', 'Medium', 'Graph', '5 5
1 2 2 3 5
3 2 3 4 4
2 4 5 3 1
6 7 1 4 5
5 1 1 2 4', '0 4
1 3
1 4
2 2
3 0
3 1
4 0'),
('Word Ladder', 'A transformation sequence from word beginWord to word endWord using a dictionary wordList is a sequence of words beginWord -> s1 -> s2 -> ... -> sk such that:

- Every adjacent pair of words differs by a single letter.
- Every si for 1 <= i <= k is in wordList. Note that beginWord does not need to be in wordList.
- sk == endWord

Given two words, beginWord and endWord, and a dictionary wordList, return the number of words in the shortest transformation sequence from beginWord to endWord, or 0 if no such sequence exists.

**Input Format:**
First line: beginWord
Second line: endWord
Third line: n (dictionary size)
Fourth line: n space-separated words

**Output Format:**
Single integer (shortest length or 0)

**Constraints:**
1 <= beginWord.length <= 10
endWord.length == beginWord.length
1 <= wordList.length <= 5000
wordList[i].length == beginWord.length
beginWord, endWord, and wordList[i] consist of lowercase English letters.
beginWord != endWord
All the words in wordList are unique.

**Source:** LeetCode #127', 'Hard', 'Graph', 'hit
cog
6
hot dot dog lot log cog', '5'),
('Min Stack', 'Design a stack that supports push, pop, top, and retrieving the minimum element in constant time.

Implement the MinStack class:
- MinStack() initializes the stack object.
- void push(int val) pushes the element val onto the stack.
- void pop() removes the element on the top of the stack.
- int top() gets the top element of the stack.
- int getMin() retrieves the minimum element in the stack.

You must implement a solution with O(1) time complexity for each function.

**Input Format:**
First line: n (number of operations)
Next n lines: operation val (push/pop/top/getMin)

**Output Format:**
Output for each top/getMin operation

**Constraints:**
-2^31 <= val <= 2^31 - 1
Methods pop, top and getMin operations will always be called on non-empty stacks.
At most 3 * 10^4 calls will be made to push, pop, top, and getMin.

**Source:** LeetCode #155', 'Medium', 'Stack', '7
push -2
push 0
push -3
getMin
pop
top
getMin', '-3
0
-2'),
('Evaluate Reverse Polish Notation', 'You are given an array of strings tokens that represents an arithmetic expression in a Reverse Polish Notation.

Evaluate the expression. Return an integer that represents the value of the expression.

Note that:
- The valid operators are ''+'', ''-'', ''*'', and ''/''.
- Each operand may be an integer or another expression.
- The division between two integers always truncates toward zero.
- There will not be any division by zero.
- The input represents a valid arithmetic expression in a reverse polish notation.
- The answer and all the intermediate calculations can be represented in a 32-bit integer.

**Input Format:**
First line: n (number of tokens)
Second line: n space-separated tokens

**Output Format:**
Single integer (result)

**Constraints:**
1 <= tokens.length <= 10^4
tokens[i] is either an operator: "+", "-", "*", or "/", or an integer in the range [-200, 200].

**Source:** LeetCode #150', 'Medium', 'Stack', '5
2 1 + 3 *', '9'),
('Find Minimum in Rotated Sorted Array', 'Suppose an array of length n sorted in ascending order is rotated between 1 and n times. For example, the array nums = [0,1,2,4,5,6,7] might become:

[4,5,6,7,0,1,2] if it was rotated 4 times.
[0,1,2,4,5,6,7] if it was rotated 7 times.

Notice that rotating an array [a[0], a[1], a[2], ..., a[n-1]] 1 time results in the array [a[n-1], a[0], a[1], a[2], ..., a[n-2]].

Given the sorted rotated array nums of unique elements, return the minimum element of this array.

You must write an algorithm that runs in O(log n) time.

**Input Format:**
First line: n (size of array)
Second line: n space-separated integers (rotated sorted array)

**Output Format:**
Single integer (minimum element)

**Constraints:**
n == nums.length
1 <= n <= 5000
-5000 <= nums[i] <= 5000
All the integers of nums are unique.
nums is sorted and rotated between 1 and n times.

**Source:** LeetCode #153', 'Medium', 'Binary Search', '7
4 5 6 7 0 1 2', '0'),
('Search a 2D Matrix II', 'Write an efficient algorithm that searches for a value target in an m x n integer matrix matrix. This matrix has the following properties:

- Integers in each row are sorted in ascending from left to right.
- Integers in each column are sorted in ascending from top to bottom.

**Input Format:**
First line: m n (rows and columns)
Next m lines: n space-separated integers
Last line: target

**Output Format:**
true or false

**Constraints:**
m == matrix.length
n == matrix[i].length
1 <= n, m <= 300
-10^9 <= matrix[i][j] <= 10^9
All the integers in each row are sorted in ascending order.
All the integers in each column are sorted in ascending order.
-10^9 <= target <= 10^9

**Source:** LeetCode #240', 'Medium', 'Binary Search', '5 5
1 4 7 11 15
2 5 8 12 19
3 6 9 16 22
10 13 14 17 24
18 21 23 26 30
5', 'true'),
('Find Median from Data Stream', 'The median is the middle value in an ordered integer list. If the size of the list is even, there is no middle value, and the median is the mean of the two middle values.

Implement the MedianFinder class:
- MedianFinder() initializes the MedianFinder object.
- void addNum(int num) adds the integer num from the data stream to the data structure.
- double findMedian() returns the median of all elements so far.

**Input Format:**
First line: n (number of operations)
Next n lines: addNum val or findMedian

**Output Format:**
Median for each findMedian operation

**Constraints:**
-10^5 <= num <= 10^5
There will be at least one element in the data structure before calling findMedian.
At most 5 * 10^4 calls will be made to addNum and findMedian.

**Source:** LeetCode #295', 'Hard', 'Heap', '6
addNum 1
addNum 2
findMedian
addNum 3
findMedian', '1.5
2.0'),
('Combination Sum', 'Given an array of distinct integers candidates and a target integer target, return a list of all unique combinations of candidates where the chosen numbers sum to target. You may return the combinations in any order.

The same number may be chosen from candidates an unlimited number of times. Two combinations are unique if the frequency of at least one of the chosen numbers is different.

The test cases are generated such that the number of unique combinations that sum up to target is less than 150 combinations for the given input.

**Input Format:**
First line: n (size of candidates)
Second line: n space-separated integers (candidates)
Third line: target

**Output Format:**
Each line contains a combination (space-separated integers)

**Constraints:**
1 <= candidates.length <= 30
2 <= candidates[i] <= 40
All elements of candidates are distinct.
1 <= target <= 40

**Source:** LeetCode #39', 'Medium', 'Backtracking', '3
2 3 6
7', '2 2 3
7'),
('Letter Combinations of a Phone Number', 'Given a string containing digits from 2-9 inclusive, return all possible letter combinations that the number could represent. Return the answer in any order.

A mapping of digits to letters (just like on the telephone buttons) is given below. Note that 1 does not map to any letters.

2: abc
3: def
4: ghi
5: jkl
6: mno
7: pqrs
8: tuv
9: wxyz

**Input Format:**
Single line: digit string

**Output Format:**
Space-separated letter combinations

**Constraints:**
0 <= digits.length <= 4
digits[i] is a digit in the range [''2'', ''9''].

**Source:** LeetCode #17', 'Medium', 'Backtracking', '23', 'ad ae af bd be bf cd ce cf'),
('N-Queens', 'The n-queens puzzle is the problem of placing n queens on an n x n chessboard such that no two queens attack each other.

Given an integer n, return all distinct solutions to the n-queens puzzle. You may return the answer in any order.

Each solution contains a distinct board configuration of the n-queens'' placement, where ''Q'' and ''.'' both indicate a queen and an empty space, respectively.

**Input Format:**
Single integer: n

**Output Format:**
Number of distinct solutions

**Constraints:**
1 <= n <= 9

**Source:** LeetCode #51', 'Hard', 'Backtracking', '4', '2'),
('Gas Station', 'There are n gas stations along a circular route, where the amount of gas at the ith station is gas[i].

You have a car with an unlimited gas tank and it costs cost[i] of gas to travel from the ith station to its next (i + 1)th station. You begin the journey with an empty tank at one of the gas stations.

Given two integer arrays gas and cost, return the starting gas station''s index if you can travel around the circuit once in the clockwise direction, otherwise return -1. If there exists a solution, it is guaranteed to be unique.

**Input Format:**
First line: n (number of stations)
Second line: n space-separated integers (gas)
Third line: n space-separated integers (cost)

**Output Format:**
Single integer (starting index or -1)

**Constraints:**
n == gas.length == cost.length
1 <= n <= 10^5
0 <= gas[i], cost[i] <= 10^4

**Source:** LeetCode #134', 'Medium', 'Greedy', '5
1 2 3 4 5
3 4 5 1 2', '3'),
('Partition Labels', 'You are given a string s. We want to partition the string into as many parts as possible so that each letter appears in at most one part.

Note that the partition is done so that after concatenating all the parts in order, the resultant string should be s.

Return a list of integers representing the size of these parts.

**Input Format:**
Single line: string s

**Output Format:**
Space-separated integers (partition sizes)

**Constraints:**
1 <= s.length <= 500
s consists of lowercase English letters.

**Source:** LeetCode #763', 'Medium', 'Greedy', 'ababcbacadefegdehijhklij', '9 7 8');
