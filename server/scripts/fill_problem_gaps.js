const pool = require('../db');

// Comprehensive problem templates to fill gaps
const problemTemplates = {
    'Array': {
        'Easy': [
            {
                title: 'Find Missing Number',
                description: 'Given an array containing n distinct numbers from 0 to n, find the one number that is missing from the array.',
                input_format: 'First line contains integer n. Second line contains n space-separated integers.',
                output_format: 'Single integer - the missing number.',
                constraints: '1 ≤ n ≤ 10^4',
                sample_input: '3\n3 0 1',
                sample_output: '2',
                hidden_tests: [
                    { input: '5\n5 4 0 3 1', output: '2' },
                    { input: '9\n9 6 4 2 3 5 7 0 1', output: '8' },
                    { input: '1\n1', output: '0' }
                ]
            },
            {
                title: 'Rotate Array',
                description: 'Given an array, rotate it to the right by k steps.',
                input_format: 'First line contains n and k. Second line contains n space-separated integers.',
                output_format: 'Array after k rotations, space-separated.',
                constraints: '1 ≤ n ≤ 10^5, 0 ≤ k ≤ n',
                sample_input: '7 3\n1 2 3 4 5 6 7',
                sample_output: '5 6 7 1 2 3 4',
                hidden_tests: [
                    { input: '4 2\n1 2 3 4', output: '3 4 1 2' },
                    { input: '5 0\n1 2 3 4 5', output: '1 2 3 4 5' },
                    { input: '3 3\n1 2 3', output: '1 2 3' }
                ]
            },
            {
                title: 'Remove Duplicates from Sorted Array',
                description: 'Remove duplicates from a sorted array in-place and return the count of unique elements.',
                input_format: 'First line contains n. Second line contains n space-separated sorted integers.',
                output_format: 'First line: count of unique elements. Second line: unique elements space-separated.',
                constraints: '1 ≤ n ≤ 10^5',
                sample_input: '5\n1 1 2 2 3',
                sample_output: '3\n1 2 3',
                hidden_tests: [
                    { input: '3\n1 1 1', output: '1\n1' },
                    { input: '6\n0 0 1 1 1 2', output: '3\n0 1 2' },
                    { input: '1\n5', output: '1\n5' }
                ]
            },
            {
                title: 'Best Time to Buy and Sell Stock',
                description: 'Find the maximum profit from buying and selling a stock once.',
                input_format: 'First line contains n. Second line contains n space-separated integers (prices).',
                output_format: 'Maximum profit possible.',
                constraints: '1 ≤ n ≤ 10^5, 0 ≤ price ≤ 10^4',
                sample_input: '6\n7 1 5 3 6 4',
                sample_output: '5',
                hidden_tests: [
                    { input: '5\n7 6 4 3 1', output: '0' },
                    { input: '3\n1 2 3', output: '2' },
                    { input: '1\n5', output: '0' }
                ]
            },
            {
                title: 'Contains Duplicate',
                description: 'Check if an array contains any duplicate elements.',
                input_format: 'First line contains n. Second line contains n space-separated integers.',
                output_format: '"true" if duplicates exist, "false" otherwise.',
                constraints: '1 ≤ n ≤ 10^5',
                sample_input: '4\n1 2 3 1',
                sample_output: 'true',
                hidden_tests: [
                    { input: '4\n1 2 3 4', output: 'false' },
                    { input: '3\n1 1 1', output: 'true' },
                    { input: '1\n5', output: 'false' }
                ]
            }
        ],
        'Medium': [
            {
                title: '3Sum Problem',
                description: 'Find all unique triplets that sum to zero.',
                input_format: 'First line contains n. Second line contains n space-separated integers.',
                output_format: 'Each line contains a triplet sorted in ascending order. Output all triplets sorted lexicographically.',
                constraints: '3 ≤ n ≤ 1000',
                sample_input: '6\n-1 0 1 2 -1 -4',
                sample_output: '-1 -1 2\n-1 0 1',
                hidden_tests: [
                    { input: '3\n0 0 0', output: '0 0 0' },
                    { input: '5\n1 2 3 4 5', output: '' },
                    { input: '4\n-2 0 1 1', output: '-2 1 1' }
                ]
            },
            {
                title: 'Product of Array Except Self',
                description: 'Return an array where each element is the product of all elements except itself (without division).',
                input_format: 'First line contains n. Second line contains n space-separated integers.',
                output_format: 'n space-separated integers.',
                constraints: '2 ≤ n ≤ 10^5',
                sample_input: '4\n1 2 3 4',
                sample_output: '24 12 8 6',
                hidden_tests: [
                    { input: '2\n5 2', output: '2 5' },
                    { input: '3\n-1 1 0', output: '0 0 -1' },
                    { input: '5\n1 2 3 4 5', output: '120 60 40 30 24' }
                ]
            },
            {
                title: 'Container With Most Water',
                description: 'Find two lines that together with the x-axis form a container that holds the most water.',
                input_format: 'First line contains n. Second line contains n space-separated integers (heights).',
                output_format: 'Maximum area possible.',
                constraints: '2 ≤ n ≤ 10^5, 0 ≤ height ≤ 10^4',
                sample_input: '9\n1 8 6 2 5 4 8 3 7',
                sample_output: '49',
                hidden_tests: [
                    { input: '2\n1 1', output: '1' },
                    { input: '3\n4 3 2', output: '4' },
                    { input: '6\n1 2 4 3 2 1', output: '6' }
                ]
            }
        ],
        'Hard': [
            {
                title: 'Median of Two Sorted Arrays',
                description: 'Find the median of two sorted arrays.',
                input_format: 'First line: m n. Second line: m integers. Third line: n integers.',
                output_format: 'Median as a decimal with 1 decimal place.',
                constraints: '0 ≤ m, n ≤ 1000',
                sample_input: '2 2\n1 3\n2 4',
                sample_output: '2.5',
                hidden_tests: [
                    { input: '1 1\n1\n2', output: '1.5' },
                    { input: '2 1\n1 2\n3', output: '2.0' },
                    { input: '0 1\n\n1', output: '1.0' }
                ]
            }
        ]
    },
    'String': {
        'Easy': [
            {
                title: 'Valid Anagram',
                description: 'Check if two strings are anagrams of each other.',
                input_format: 'Two strings on separate lines.',
                output_format: '"true" or "false".',
                constraints: '1 ≤ length ≤ 10^5',
                sample_input: 'anagram\nnagaram',
                sample_output: 'true',
                hidden_tests: [
                    { input: 'rat\ncar', output: 'false' },
                    { input: 'listen\nsilent', output: 'true' },
                    { input: 'a\na', output: 'true' }
                ]
            },
            {
                title: 'Reverse String',
                description: 'Reverse a given string.',
                input_format: 'Single string.',
                output_format: 'Reversed string.',
                constraints: '1 ≤ length ≤ 10^5',
                sample_input: 'hello',
                sample_output: 'olleh',
                hidden_tests: [
                    { input: 'a', output: 'a' },
                    { input: 'Hannah', output: 'hannaH' },
                    { input: 'racecar', output: 'racecar' }
                ]
            },
            {
                title: 'First Unique Character',
                description: 'Find the index of the first non-repeating character.',
                input_format: 'Single string.',
                output_format: 'Index (0-based) or -1 if none exists.',
                constraints: '1 ≤ length ≤ 10^5',
                sample_input: 'leetcode',
                sample_output: '0',
                hidden_tests: [
                    { input: 'loveleetcode', output: '2' },
                    { input: 'aabb', output: '-1' },
                    { input: 'z', output: '0' }
                ]
            },
            {
                title: 'Valid Palindrome',
                description: 'Check if a string is a palindrome (ignoring non-alphanumeric characters and case).',
                input_format: 'Single string.',
                output_format: '"true" or "false".',
                constraints: '1 ≤ length ≤ 10^5',
                sample_input: 'A man, a plan, a canal: Panama',
                sample_output: 'true',
                hidden_tests: [
                    { input: 'race a car', output: 'false' },
                    { input: 'a', output: 'true' },
                    { input: '.,', output: 'true' }
                ]
            },
            {
                title: 'Longest Common Prefix',
                description: 'Find the longest common prefix among an array of strings.',
                input_format: 'First line: n. Next n lines: strings.',
                output_format: 'Longest common prefix or empty string.',
                constraints: '1 ≤ n ≤ 200',
                sample_input: '3\nflower\nflow\nflight',
                sample_output: 'fl',
                hidden_tests: [
                    { input: '3\ndog\nracecar\ncar', output: '' },
                    { input: '1\nabc', output: 'abc' },
                    { input: '2\nab\nabc', output: 'ab' }
                ]
            }
        ],
        'Medium': [
            {
                title: 'Longest Substring Without Repeating Characters',
                description: 'Find the length of the longest substring without repeating characters.',
                input_format: 'Single string.',
                output_format: 'Length of longest substring.',
                constraints: '0 ≤ length ≤ 5×10^4',
                sample_input: 'abcabcbb',
                sample_output: '3',
                hidden_tests: [
                    { input: 'bbbbb', output: '1' },
                    { input: 'pwwkew', output: '3' },
                    { input: '', output: '0' }
                ]
            },
            {
                title: 'Group Anagrams',
                description: 'Group strings that are anagrams of each other.',
                input_format: 'First line: n. Next n lines: strings.',
                output_format: 'Each line contains space-separated anagrams (groups in any order).',
                constraints: '1 ≤ n ≤ 10^4',
                sample_input: '6\neat\ntea\ntan\nate\nnat\nbat',
                sample_output: 'bat\nnat tan\nate eat tea',
                hidden_tests: [
                    { input: '1\na', output: 'a' },
                    { input: '2\nab\nba', output: 'ab ba' },
                    { input: '3\nabc\nbca\ncab', output: 'abc bca cab' }
                ]
            }
        ],
        'Hard': [
            {
                title: 'Minimum Window Substring',
                description: 'Find the minimum window in string s that contains all characters of string t.',
                input_format: 'Two strings on separate lines.',
                output_format: 'Minimum window substring or empty string.',
                constraints: '1 ≤ length ≤ 10^5',
                sample_input: 'ADOBECODEBANC\nABC',
                sample_output: 'BANC',
                hidden_tests: [
                    { input: 'a\na', output: 'a' },
                    { input: 'a\naa', output: '' },
                    { input: 'ab\nb', output: 'b' }
                ]
            }
        ]
    },
    'Heap': {
        'Easy': [
            {
                title: 'Kth Largest Element in Array',
                description: 'Find the kth largest element in an unsorted array.',
                input_format: 'First line: n k. Second line: n space-separated integers.',
                output_format: 'Kth largest element.',
                constraints: '1 ≤ k ≤ n ≤ 10^5',
                sample_input: '6 2\n3 2 1 5 6 4',
                sample_output: '5',
                hidden_tests: [
                    { input: '1 1\n5', output: '5' },
                    { input: '9 4\n3 2 3 1 2 4 5 5 6', output: '4' },
                    { input: '4 1\n10 5 20 15', output: '20' }
                ]
            },
            {
                title: 'Last Stone Weight',
                description: 'Simulate smashing stones until one or none remain.',
                input_format: 'First line: n. Second line: n space-separated integers (stone weights).',
                output_format: 'Weight of last remaining stone or 0.',
                constraints: '1 ≤ n ≤ 30',
                sample_input: '4\n2 7 4 1',
                sample_output: '1',
                hidden_tests: [
                    { input: '2\n1 1', output: '0' },
                    { input: '1\n5', output: '5' },
                    { input: '3\n3 7 2', output: '2' }
                ]
            },
            {
                title: 'K Closest Points to Origin',
                description: 'Find k closest points to the origin (0,0).',
                input_format: 'First line: n k. Next n lines: x y coordinates.',
                output_format: 'k lines with x y coordinates of closest points.',
                constraints: '1 ≤ k ≤ n ≤ 10^4',
                sample_input: '3 1\n1 3\n-2 2\n5 8',
                sample_output: '-2 2',
                hidden_tests: [
                    { input: '2 2\n3 3\n5 -1', output: '3 3\n5 -1' },
                    { input: '1 1\n0 1', output: '0 1' },
                    { input: '3 2\n0 1\n1 0\n3 3', output: '0 1\n1 0' }
                ]
            },
            {
                title: 'Find Kth Smallest Element',
                description: 'Find the kth smallest element in an array.',
                input_format: 'First line: n k. Second line: n space-separated integers.',
                output_format: 'Kth smallest element.',
                constraints: '1 ≤ k ≤ n ≤ 10^5',
                sample_input: '7 3\n7 10 4 3 20 15 8',
                sample_output: '7',
                hidden_tests: [
                    { input: '5 1\n5 4 3 2 1', output: '1' },
                    { input: '3 2\n10 5 12', output: '10' },
                    { input: '1 1\n42', output: '42' }
                ]
            },
            {
                title: 'Top K Frequent Elements',
                description: 'Find the k most frequent elements in an array.',
                input_format: 'First line: n k. Second line: n space-separated integers.',
                output_format: 'k space-separated integers (most frequent).',
                constraints: '1 ≤ k ≤ n ≤ 10^5',
                sample_input: '7 2\n1 1 1 2 2 3 4',
                sample_output: '1 2',
                hidden_tests: [
                    { input: '1 1\n5', output: '5' },
                    { input: '6 2\n4 1 -1 2 -1 2', output: '-1 2' },
                    { input: '5 3\n1 2 3 4 5', output: '1 2 3' }
                ]
            }
        ],
        'Medium': [
            {
                title: 'Merge K Sorted Lists',
                description: 'Merge k sorted linked lists into one sorted list.',
                input_format: 'First line: k. Next k lines: space-separated sorted integers.',
                output_format: 'Space-separated merged sorted list.',
                constraints: '0 ≤ k ≤ 10^4',
                sample_input: '3\n1 4 5\n1 3 4\n2 6',
                sample_output: '1 1 2 3 4 4 5 6',
                hidden_tests: [
                    { input: '0', output: '' },
                    { input: '1\n1', output: '1' },
                    { input: '2\n\n1', output: '1' }
                ]
            },
            {
                title: 'Task Scheduler',
                description: 'Schedule tasks with cool down period n.',
                input_format: 'First line: tasks string. Second line: n.',
                output_format: 'Minimum time units needed.',
                constraints: '1 ≤ tasks ≤ 10^4, 0 ≤ n ≤ 100',
                sample_input: 'AAABBB\n2',
                sample_output: '8',
                hidden_tests: [
                    { input: 'AAAA\n2', output: '10' },
                    { input: 'AB\n0', output: '2' },
                    { input: 'AAA\n0', output: '3' }
                ]
            },
            {
                title: 'Find Median from Data Stream',
                description: 'Design a data structure that supports adding numbers and finding median.',
                input_format: 'First line: n (operations). Next n lines: "add x" or "find".',
                output_format: 'For each "find", output median.',
                constraints: '1 ≤ n ≤ 10^5',
                sample_input: '5\nadd 1\nadd 2\nfind\nadd 3\nfind',
                sample_output: '1.5\n2.0',
                hidden_tests: [
                    { input: '2\nadd 5\nfind', output: '5.0' },
                    { input: '4\nadd 1\nadd 3\nadd 5\nfind', output: '3.0' },
                    { input: '1\nfind', output: '0.0' }
                ]
            },
            {
                title: 'Kth Largest in Stream',
                description: 'Design a class to find kth largest element in a stream.',
                input_format: 'First line: k. Second line: initial array. Third line: m (adds). Next m lines: values to add.',
                output_format: 'm lines with kth largest after each add.',
                constraints: '1 ≤ k ≤ 10^4',
                sample_input: '3\n4 5 8 2\n3\n3\n5\n10',
                sample_output: '4\n5\n5',
                hidden_tests: [
                    { input: '1\n\n2\n5\n3', output: '5\n5' },
                    { input: '2\n1 2\n1\n3', output: '2' },
                    { input: '1\n5\n2\n10\n12', output: '10\n12' }
                ]
            },
            {
                title: 'Reorganize String',
                description: 'Reorganize string so no two adjacent characters are same.',
                input_format: 'Single string.',
                output_format: 'Reorganized string or empty if impossible.',
                constraints: '1 ≤ length ≤ 500',
                sample_input: 'aab',
                sample_output: 'aba',
                hidden_tests: [
                    { input: 'aaab', output: '' },
                    { input: 'abc', output: 'abc' },
                    { input: 'vvvlo', output: 'vovlv' }
                ]
            }
        ],
        'Hard': [
            {
                title: 'Sliding Window Maximum',
                description: 'Find maximum in each sliding window of size k.',
                input_format: 'First line: n k. Second line: n space-separated integers.',
                output_format: 'Space-separated maximum values.',
                constraints: '1 ≤ k ≤ n ≤ 10^5',
                sample_input: '8 3\n1 3 -1 -3 5 3 6 7',
                sample_output: '3 3 5 5 6 7',
                hidden_tests: [
                    { input: '1 1\n5', output: '5' },
                    { input: '4 2\n1 2 3 4', output: '2 3 4' },
                    { input: '5 3\n9 10 9 -7 -4', output: '10 10 9' }
                ]
            },
            {
                title: 'IPO Problem',
                description: 'Maximize capital by choosing at most k projects.',
                input_format: 'First line: k w. Second line: n. Next n lines: profit capital.',
                output_format: 'Maximum capital achievable.',
                constraints: '0 ≤ k ≤ 10^5, 0 ≤ w ≤ 10^9',
                sample_input: '2 0\n3\n1 0\n2 1\n3 1',
                sample_output: '4',
                hidden_tests: [
                    { input: '1 0\n1\n1 0', output: '1' },
                    { input: '3 0\n2\n1 1\n2 2', output: '0' },
                    { input: '1 10\n2\n5 10\n10 20', output: '15' }
                ]
            }
        ]
    },
    'Hashing': {
        'Easy': [
            {
                title: 'Two Sum',
                description: 'Find two numbers that add up to target.',
                input_format: 'First line: n target. Second line: n space-separated integers.',
                output_format: 'Two indices (0-based) space-separated.',
                constraints: '2 ≤ n ≤ 10^4',
                sample_input: '4 9\n2 7 11 15',
                sample_output: '0 1',
                hidden_tests: [
                    { input: '3 6\n3 2 4', output: '1 2' },
                    { input: '2 6\n3 3', output: '0 1' },
                    { input: '5 10\n1 2 3 4 6', output: '3 4' }
                ]
            },
            {
                title: 'Ransom Note',
                description: 'Check if ransom note can be constructed from magazine characters.',
                input_format: 'Two strings on separate lines.',
                output_format: '"true" or "false".',
                constraints: '1 ≤ length ≤ 10^5',
                sample_input: 'a\nb',
                sample_output: 'false',
                hidden_tests: [
                    { input: 'aa\nab', output: 'false' },
                    { input: 'aa\naab', output: 'true' },
                    { input: 'abc\naabbcc', output: 'true' }
                ]
            },
            {
                title: 'Isomorphic Strings',
                description: 'Check if two strings are isomorphic.',
                input_format: 'Two strings on separate lines.',
                output_format: '"true" or "false".',
                constraints: '1 ≤ length ≤ 5×10^4',
                sample_input: 'egg\nadd',
                sample_output: 'true',
                hidden_tests: [
                    { input: 'foo\nbar', output: 'false' },
                    { input: 'paper\ntitle', output: 'true' },
                    { input: 'ab\naa', output: 'false' }
                ]
            },
            {
                title: 'Happy Number',
                description: 'Determine if a number is happy (eventually reaches 1).',
                input_format: 'Single integer n.',
                output_format: '"true" or "false".',
                constraints: '1 ≤ n ≤ 2^31-1',
                sample_input: '19',
                sample_output: 'true',
                hidden_tests: [
                    { input: '2', output: 'false' },
                    { input: '1', output: 'true' },
                    { input: '7', output: 'true' }
                ]
            },
            {
                title: 'Word Pattern',
                description: 'Check if pattern matches string (bijection).',
                input_format: 'Two lines: pattern and string.',
                output_format: '"true" or "false".',
                constraints: '1 ≤ length ≤ 300',
                sample_input: 'abba\ndog cat cat dog',
                sample_output: 'true',
                hidden_tests: [
                    { input: 'abba\ndog cat cat fish', output: 'false' },
                    { input: 'aaaa\ndog cat cat dog', output: 'false' },
                    { input: 'abc\nb c a', output: 'true' }
                ]
            }
        ],
        'Medium': [
            {
                title: 'Subarray Sum Equals K',
                description: 'Count subarrays with sum equal to k.',
                input_format: 'First line: n k. Second line: n space-separated integers.',
                output_format: 'Count of valid subarrays.',
                constraints: '1 ≤ n ≤ 2×10^4',
                sample_input: '3 3\n1 1 1',
                sample_output: '2',
                hidden_tests: [
                    { input: '4 2\n1 2 3 4', output: '1' },
                    { input: '7 3\n1 2 3 4 5 0 0', output: '4' },
                    { input: '1 0\n0', output: '1' }
                ]
            },
            {
                title: 'Longest Consecutive Sequence',
                description: 'Find length of longest consecutive elements sequence.',
                input_format: 'First line: n. Second line: n space-separated integers.',
                output_format: 'Length of longest sequence.',
                constraints: '0 ≤ n ≤ 10^5',
                sample_input: '6\n100 4 200 1 3 2',
                sample_output: '4',
                hidden_tests: [
                    { input: '9\n0 3 7 2 5 8 4 6 0', output: '9' },
                    { input: '0', output: '0' },
                    { input: '3\n9 1 -3', output: '1' }
                ]
            },
            {
                title: 'Find All Anagrams',
                description: 'Find all start indices of anagrams of p in s.',
                input_format: 'Two strings on separate lines.',
                output_format: 'Space-separated indices.',
                constraints: '1 ≤ length ≤ 3×10^4',
                sample_input: 'cbaebabacd\nabc',
                sample_output: '0 6',
                hidden_tests: [
                    { input: 'abab\nab', output: '0 1 2' },
                    { input: 'baa\naa', output: '1' },
                    { input: 'a\na', output: '0' }
                ]
            },
            {
                title: 'Top K Frequent Words',
                description: 'Find k most frequent words sorted by frequency then lexicographically.',
                input_format: 'First line: n k. Next n lines: words.',
                output_format: 'k lines with words.',
                constraints: '1 ≤ k ≤ n ≤ 500',
                sample_input: '7 2\ni\nlove\nleetcode\ni\nlove\ncoding\nleetcode',
                sample_output: 'i\nlove',
                hidden_tests: [
                    { input: '2 2\na\na', output: 'a' },
                    { input: '4 1\nthe\nday\nis\nsunny', output: 'day' },
                    { input: '1 1\nhello', output: 'hello' }
                ]
            }
        ],
        'Hard': [
            {
                title: 'Contains Duplicate III',
                description: 'Check if there are two indices with abs(nums[i]-nums[j]) ≤ t and abs(i-j) ≤ k.',
                input_format: 'First line: n k t. Second line: n space-separated integers.',
                output_format: '"true" or "false".',
                constraints: '0 ≤ n ≤ 2×10^4',
                sample_input: '4 3 0\n1 2 3 1',
                sample_output: 'true',
                hidden_tests: [
                    { input: '6 2 1\n1 5 9 1 5 9', output: 'false' },
                    { input: '2 1 1\n1 3', output: 'true' },
                    { input: '0 0 0', output: 'false' }
                ]
            },
            {
                title: 'Substring with Concatenation',
                description: 'Find all starting indices where concatenation of all words exists.',
                input_format: 'First line: string s. Second line: n. Next n lines: words.',
                output_format: 'Space-separated indices.',
                constraints: '1 ≤ n ≤ 5000',
                sample_input: 'barfoothefoobarman\n2\nfoo\nbar',
                sample_output: '0 9',
                hidden_tests: [
                    { input: 'wordgoodgoodgoodbestword\n4\nword\ngood\nbest\nword', output: '' },
                    { input: 'barfoofoobarthefoobarman\n2\nbar\nfoo', output: '0 3 9 12' },
                    { input: 'a\n1\na', output: '0' }
                ]
            },
            {
                title: 'Longest Duplicate Substring',
                description: 'Find any longest duplicate substring.',
                input_format: 'Single string.',
                output_format: 'Longest duplicate substring or empty.',
                constraints: '2 ≤ length ≤ 3×10^4',
                sample_input: 'banana',
                sample_output: 'ana',
                hidden_tests: [
                    { input: 'abcd', output: '' },
                    { input: 'aaaa', output: 'aaa' },
                    { input: 'abcabcabc', output: 'abcabc' }
                ]
            },
            {
                title: 'Count Unique Characters',
                description: 'Sum of unique characters across all substrings.',
                input_format: 'Single string.',
                output_format: 'Total count.',
                constraints: '1 ≤ length ≤ 10^5',
                sample_input: 'ABC',
                sample_output: '10',
                hidden_tests: [
                    { input: 'ABA', output: '8' },
                    { input: 'LEETCODE', output: '92' },
                    { input: 'A', output: '1' }
                ]
            },
            {
                title: 'Palindrome Pairs',
                description: 'Find all pairs of distinct indices forming palindromes.',
                input_format: 'First line: n. Next n lines: words.',
                output_format: 'Each line: two indices forming palindrome.',
                constraints: '1 ≤ n ≤ 5000',
                sample_input: '4\nabcd\ndcba\nlls\ns',
                sample_output: '0 1\n1 0\n2 3\n3 2',
                hidden_tests: [
                    { input: '2\nbat\ntab', output: '0 1\n1 0' },
                    { input: '2\na\n', output: '0 1\n1 0' },
                    { input: '1\nabc', output: '' }
                ]
            }
        ]
    }
};

async function fillGaps() {
    const client = await pool.connect();

    try {
        console.log('Starting to fill problem gaps...\n');

        let totalAdded = 0;

        for (const [topic, difficulties] of Object.entries(problemTemplates)) {
            for (const [difficulty, problems] of Object.entries(difficulties)) {
                console.log(`\nProcessing ${topic} - ${difficulty}...`);

                for (const problem of problems) {
                    // Check if problem exists
                    const existing = await client.query(
                        'SELECT problem_id FROM problems WHERE title = $1',
                        [problem.title]
                    );

                    if (existing.rows.length > 0) {
                        console.log(`  ⏭️  Skipping "${problem.title}" (already exists)`);
                        continue;
                    }

                    // Insert problem
                    const insertResult = await client.query(
                        `INSERT INTO problems (title, description, difficulty, topic, input_format, output_format, constraints)
                         VALUES ($1, $2, $3, $4, $5, $6, $7)
                         RETURNING problem_id`,
                        [
                            problem.title,
                            problem.description,
                            difficulty,
                            topic,
                            problem.input_format,
                            problem.output_format,
                            problem.constraints
                        ]
                    );

                    const problemId = insertResult.rows[0].problem_id;

                    // Insert sample test case
                    await client.query(
                        `INSERT INTO test_cases (problem_id, input, expected_output, is_sample)
                         VALUES ($1, $2, $3, true)`,
                        [problemId, problem.sample_input, problem.sample_output]
                    );

                    // Insert hidden test cases
                    for (const test of problem.hidden_tests) {
                        await client.query(
                            `INSERT INTO test_cases (problem_id, input, expected_output, is_sample)
                             VALUES ($1, $2, $3, false)`,
                            [problemId, test.input, test.output]
                        );
                    }

                    totalAdded++;
                    console.log(`  ✅ Added "${problem.title}" with ${problem.hidden_tests.length + 1} test cases`);
                }
            }
        }

        console.log(`\n✨ Successfully added ${totalAdded} new problems!`);

    } catch (err) {
        console.error('Error filling gaps:', err);
        throw err;
    } finally {
        client.release();
        await pool.end();
    }
}

fillGaps();
