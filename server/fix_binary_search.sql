UPDATE problems 
SET description = 'Given an array of integers nums which is sorted in ascending order, and an integer target, write a function to search target in nums. If target exists, then return its index. Otherwise, return -1.

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

**Source:** LeetCode #704

**Sample Test Case**
Input:
6
-1 0 3 5 9 12
9

Output:
4',
test_case_input = '6
-1 0 3 5 9 12
9',
test_case_output = '4'
WHERE title ILIKE '%Binary Search%';
