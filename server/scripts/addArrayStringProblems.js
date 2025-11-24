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
    {
        title: "Merge Intervals",
        difficulty: "Medium",
        topic: "Array",
        description: "Given an array of intervals where intervals[i] = [starti, endi], merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.",
        input_format: "First line: n (number of intervals)\nNext n lines: start end",
        output_format: "Each line: start end (merged intervals)",
        constraints: "1 <= intervals.length <= 10^4\nintervals[i].length == 2\n0 <= starti <= endi <= 10^4",
        test_input: "4\n1 3\n2 6\n8 10\n15 18",
        test_output: "1 6\n8 10\n15 18",
        source: "LeetCode #56"
    },
    {
        title: "Product of Array Except Self",
        difficulty: "Medium",
        topic: "Array",
        description: "Given an integer array nums, return an array answer such that answer[i] is equal to the product of all the elements of nums except nums[i].\n\nThe product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer.\n\nYou must write an algorithm that runs in O(n) time and without using the division operation.",
        input_format: "First line: n (size of array)\nSecond line: n space-separated integers",
        output_format: "n space-separated integers",
        constraints: "2 <= nums.length <= 10^5\n-30 <= nums[i] <= 30\nThe product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer.",
        test_input: "4\n1 2 3 4",
        test_output: "24 12 8 6",
        source: "LeetCode #238"
    },
    {
        title: "Subarray Sum Equals K",
        difficulty: "Medium",
        topic: "Array",
        description: "Given an array of integers nums and an integer k, return the total number of subarrays whose sum equals to k.\n\nA subarray is a contiguous non-empty sequence of elements within an array.",
        input_format: "First line: n (size of array)\nSecond line: n space-separated integers\nThird line: k",
        output_format: "Single integer (count)",
        constraints: "1 <= nums.length <= 2 * 10^4\n-1000 <= nums[i] <= 1000\n-10^7 <= k <= 10^7",
        test_input: "3\n1 1 1\n2",
        test_output: "2",
        source: "LeetCode #560"
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
    {
        title: "Group Anagrams",
        difficulty: "Medium",
        topic: "String",
        description: "Given an array of strings strs, group the anagrams together. You can return the answer in any order.\n\nAn Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.",
        input_format: "First line: n (number of strings)\nSecond line: n space-separated strings",
        output_format: "Each line: space-separated strings (one group per line, sorted within group)",
        constraints: "1 <= strs.length <= 10^4\n0 <= strs[i].length <= 100\nstrs[i] consists of lowercase English letters.",
        test_input: "6\neat tea tan ate nat bat",
        test_output: "ate eat tea\nbat\nnat tan",
        source: "LeetCode #49"
    },
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
    }
];

async function seedProblems() {
    const client = await pool.connect();
    try {
        console.log(`Seeding ${problems.length} Array & String problems...`);

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
