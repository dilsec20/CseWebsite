const pool = require('../db');

async function addFAANGProblems() {
    const client = await pool.connect();
    try {
        console.log('🚀 Adding FAANG/MAANG Favorite Problems...\n');

        // Get all Extra Practice topics
        const topics = await client.query(`
            SELECT t.topic_id, t.content, m.title as module_title
            FROM dsa_topics t
            JOIN dsa_modules m ON t.module_id = m.module_id
            WHERE t.title LIKE '%Extra Practice%'
            ORDER BY m.order_index
        `);

        const faangAdditions = {
            '1. Introduction & C++ Basics': `

## 🏆 FAANG/MAANG Favorites

- **[FizzBuzz](https://leetcode.com/problems/fizz-buzz/)** - Microsoft, Amazon
- **[Happy Number](https://leetcode.com/problems/happy-number/)** - Google, LinkedIn
- **[Excel Sheet Column Number](https://leetcode.com/problems/excel-sheet-column-number/)** - Microsoft, Amazon
- **[Missing Number](https://leetcode.com/problems/missing-number/)** - Amazon, Bloomberg`,

            '2. Time & Space Complexity': `

## 🏆 FAANG/MAANG Favorites

- **[Product of Array Except Self](https://leetcode.com/problems/product-of-array-except-self/)** - Amazon, Microsoft, Facebook
- **[First Bad Version](https://leetcode.com/problems/first-bad-version/)** - Facebook, Google
- **[Peak Index in Mountain Array](https://leetcode.com/problems/peak-index-in-a-mountain-array/)** - Google, Amazon`,

            '3. Arrays & Vectors': `

## 🏆 FAANG/MAANG Favorites

- **[Two Sum](https://leetcode.com/problems/two-sum/)** - Amazon ⭐ #1 Most Asked
- **[Best Time to Buy Sell Stock](https://leetcode.com/problems/best-time-to-buy-and-sell-stock/)** - Amazon, Microsoft, Facebook
- **[Contains Duplicate](https://leetcode.com/problems/contains-duplicate/)** - Amazon, Apple
- **[Maximum Subarray](https://leetcode.com/problems/maximum-subarray/)** - Amazon, Microsoft, LinkedIn
- **[Merge Sorted Array](https://leetcode.com/problems/merge-sorted-array/)** - Facebook, Microsoft, Apple
- **[Move Zeroes](https://leetcode.com/problems/move-zeroes/)** - Facebook, Amazon
- **[Spiral Matrix](https://leetcode.com/problems/spiral-matrix/)** - Amazon, Microsoft, Google
- **[Rotate Array](https://leetcode.com/problems/rotate-array/)** - Microsoft, Amazon`,

            '4. Common Array Techniques': `

## 🏆 FAANG/MAANG Favorites

- **[3Sum](https://leetcode.com/problems/3sum/)** - Amazon, Facebook, Google
- **[4Sum](https://leetcode.com/problems/4sum/)** - Google, Facebook
- **[Container With Most Water](https://leetcode.com/problems/container-with-most-water/)** - Amazon, Facebook, Bloomberg
- **[Longest Consecutive Sequence](https://leetcode.com/problems/longest-consecutive-sequence/)** - Google, Amazon
- **[Subarray Sum Equals K](https://leetcode.com/problems/subarray-sum-equals-k/)** - Facebook, Google
- **[Maximum Product Subarray](https://leetcode.com/problems/maximum-product-subarray/)** - Amazon, LinkedIn`,

            '5. Strings': `

## 🏆 FAANG/MAANG Favorites

- **[Valid Anagram](https://leetcode.com/problems/valid-anagram/)** - Amazon, Facebook, Bloomberg
- **[Longest Substring Without Repeating](https://leetcode.com/problems/longest-substring-without-repeating-characters/)** - Amazon ⭐ Top Interview
- **[Longest Palindromic Substring](https://leetcode.com/problems/longest-palindromic-substring/)** - Amazon, Microsoft, Apple
- **[Group Anagrams](https://leetcode.com/problems/group-anagrams/)** - Amazon, Uber, Facebook
- **[Valid Palindrome](https://leetcode.com/problems/valid-palindrome/)** - Facebook, Microsoft
- **[String to Integer (atoi)](https://leetcode.com/problems/string-to-integer-atoi/)** - Amazon, Microsoft, Bloomberg
- **[Longest Common Prefix](https://leetcode.com/problems/longest-common-prefix/)** - Amazon, Google
- **[Decode String](https://leetcode.com/problems/decode-string/)** - Google, Microsoft`,

            '6. Searching & Sorting': `

## 🏆 FAANG/MAANG Favorites

- **[Search in Rotated Sorted Array](https://leetcode.com/problems/search-in-rotated-sorted-array/)** - Amazon ⭐ Very Popular
- **[Find First and Last Position](https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/)** - Facebook, Google
- **[Merge Intervals](https://leetcode.com/problems/merge-intervals/)** - Facebook, Google, Amazon
- **[Sort Colors](https://leetcode.com/problems/sort-colors/)** - Microsoft, Amazon
- **[Search a 2D Matrix](https://leetcode.com/problems/search-a-2d-matrix/)** - Amazon, Microsoft
- **[Find Peak Element](https://leetcode.com/problems/find-peak-element/)** - Google, Facebook
- **[Kth Largest Element](https://leetcode.com/problems/kth-largest-element-in-an-array/)** - Facebook, Amazon, LinkedIn`,

            '7. Recursion & Backtracking': `

## 🏆 FAANG/MAANG Favorites

- **[Letter Combinations Phone Number](https://leetcode.com/problems/letter-combinations-of-a-phone-number/)** - Amazon, Google, Uber
- **[Generate Parentheses](https://leetcode.com/problems/generate-parentheses/)** - Amazon, Google, Facebook
- **[Permutations](https://leetcode.com/problems/permutations/)** - Amazon, Microsoft, LinkedIn
- **[Subsets](https://leetcode.com/problems/subsets/)** - Amazon, Facebook, Bloomberg
- **[Combination Sum](https://leetcode.com/problems/combination-sum/)** - Amazon, Airbnb
- **[Word Search](https://leetcode.com/problems/word-search/)** - Amazon, Microsoft, Facebook
- **[Palindrome Partitioning](https://leetcode.com/problems/palindrome-partitioning/)** - Google, Amazon`,

            '8. Linked Lists': `

## 🏆 FAANG/MAANG Favorites

- **[Reverse Linked List](https://leetcode.com/problems/reverse-linked-list/)** - Amazon ⭐ Most Asked LL Problem
- **[Merge Two Sorted Lists](https://leetcode.com/problems/merge-two-sorted-lists/)** - Amazon, Microsoft, Apple
- **[Linked List Cycle](https://leetcode.com/problems/linked-list-cycle/)** - Amazon, Microsoft, Bloomberg
- **[Remove Nth Node From End](https://leetcode.com/problems/remove-nth-node-from-end-of-list/)** - Amazon, Google, Facebook
- **[Add Two Numbers](https://leetcode.com/problems/add-two-numbers/)** - Amazon, Microsoft, Facebook
- **[Intersection of Two Linked Lists](https://leetcode.com/problems/intersection-of-two-linked-lists/)** - Amazon, Microsoft
- **[Palindrome Linked List](https://leetcode.com/problems/palindrome-linked-list/)** - Amazon, Facebook
- **[Copy List with Random Pointer](https://leetcode.com/problems/copy-list-with-random-pointer/)** - Amazon, Microsoft, Bloomberg`,

            '9. Stacks & Queues': `

## 🏆 FAANG/MAANG Favorites

- **[Valid Parentheses](https://leetcode.com/problems/valid-parentheses/)** - Amazon ⭐ Very Frequent
- **[Min Stack](https://leetcode.com/problems/min-stack/)** - Amazon, Bloomberg, Google
- **[Implement Queue using Stacks](https://leetcode.com/problems/implement-queue-using-stacks/)** - Microsoft, Bloomberg
- **[Daily Temperatures](https://leetcode.com/problems/daily-temperatures/)** - Amazon, Google
- **[Largest Rectangle in Histogram](https://leetcode.com/problems/largest-rectangle-in-histogram/)** - Amazon, Google, Facebook
- **[Trapping Rain Water](https://leetcode.com/problems/trapping-rain-water/)** - Amazon, Google, Facebook ⭐
- **[Decode String](https://leetcode.com/problems/decode-string/)** - Google, Microsoft`,

            '10. Binary Trees & BST': `

## 🏆 FAANG/MAANG Favorites

- **[Maximum Depth of Binary Tree](https://leetcode.com/problems/maximum-depth-of-binary-tree/)** - LinkedIn, Amazon
- **[Same Tree](https://leetcode.com/problems/same-tree/)** - Bloomberg, Amazon
- **[Invert Binary Tree](https://leetcode.com/problems/invert-binary-tree/)** - Google ⭐ Famous
- **[Symmetric Tree](https://leetcode.com/problems/symmetric-tree/)** - Microsoft, LinkedIn
- **[Binary Tree Level Order Traversal](https://leetcode.com/problems/binary-tree-level-order-traversal/)** - Amazon, Facebook, Microsoft
- **[Validate Binary Search Tree](https://leetcode.com/problems/validate-binary-search-tree/)** - Amazon, Facebook, Microsoft ⭐
- **[Lowest Common Ancestor of BST](https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/)** - Amazon, Facebook, Microsoft
- **[Binary Tree Right Side View](https://leetcode.com/problems/binary-tree-right-side-view/)** - Amazon, Facebook
- **[Diameter of Binary Tree](https://leetcode.com/problems/diameter-of-binary-tree/)** - Google, Facebook`,

            '11. Heaps & Priority Queues': `

## 🏆 FAANG/MAANG Favorites

- **[Kth Largest Element in Array](https://leetcode.com/problems/kth-largest-element-in-an-array/)** - Facebook, Amazon, LinkedIn ⭐
- **[Top K Frequent Elements](https://leetcode.com/problems/top-k-frequent-elements/)** - Amazon, Yelp
- **[Merge k Sorted Lists](https://leetcode.com/problems/merge-k-sorted-lists/)** - Amazon, Google, Facebook ⭐
- **[Find Median from Data Stream](https://leetcode.com/problems/find-median-from-data-stream/)** - Google, Amazon, Facebook
- **[K Closest Points to Origin](https://leetcode.com/problems/k-closest-points-to-origin/)** - Amazon, Facebook
- **[Meeting Rooms II](https://leetcode.com/problems/meeting-rooms-ii/)** - Google, Amazon, Facebook (Premium)
- **[Task Scheduler](https://leetcode.com/problems/task-scheduler/)** - Facebook, Amazon`,

            '12. Graphs': `

## 🏆 FAANG/MAANG Favorites

- **[Number of Islands](https://leetcode.com/problems/number-of-islands/)** - Amazon ⭐ #1 Graph Problem
- **[Clone Graph](https://leetcode.com/problems/clone-graph/)** - Amazon, Facebook, Google
- **[Course Schedule](https://leetcode.com/problems/course-schedule/)** - Amazon, Google, Facebook
- **[Pacific Atlantic Water Flow](https://leetcode.com/problems/pacific-atlantic-water-flow/)** - Google, Amazon
- **[Network Delay Time](https://leetcode.com/problems/network-delay-time/)** - Google, Amazon
- **[Word Ladder](https://leetcode.com/problems/word-ladder/)** - Amazon, Facebook, Google ⭐
- **[Shortest Path in Binary Matrix](https://leetcode.com/problems/shortest-path-in-binary-matrix/)** - Amazon, Google
- **[Graph Valid Tree](https://leetcode.com/problems/graph-valid-tree/)** - Google, Facebook (Premium)
- **[Alien Dictionary](https://leetcode.com/problems/alien-dictionary/)** - Google, Facebook, Airbnb (Premium)`,

            '13. Dynamic Programming': `

## 🏆 FAANG/MAANG Favorites

- **[Climbing Stairs](https://leetcode.com/problems/climbing-stairs/)** - Adobe, Amazon, Google
- **[House Robber](https://leetcode.com/problems/house-robber/)** - Amazon, LinkedIn, Airbnb
- **[Coin Change](https://leetcode.com/problems/coin-change/)** - Amazon, Google, Facebook ⭐
- **[Longest Increasing Subsequence](https://leetcode.com/problems/longest-increasing-subsequence/)** - Microsoft, Amazon, Google
- **[Unique Paths](https://leetcode.com/problems/unique-paths/)** - Google, Bloomberg
- **[Jump Game](https://leetcode.com/problems/jump-game/)** - Amazon, Microsoft
- **[Word Break](https://leetcode.com/problems/word-break/)** - Amazon, Google, Facebook ⭐
- **[Longest Common Subsequence](https://leetcode.com/problems/longest-common-subsequence/)** - Amazon, Google
- **[Edit Distance](https://leetcode.com/problems/edit-distance/)** - Amazon, Google, Facebook
- **[Decode Ways](https://leetcode.com/problems/decode-ways/)** - Facebook, Google, Uber`,

            '14. Bit Manipulation': `

## 🏆 FAANG/MAANG Favorites

- **[Single Number](https://leetcode.com/problems/single-number/)** - Amazon, Google, Apple
- **[Number of 1 Bits](https://leetcode.com/problems/number-of-1-bits/)** - Apple, Microsoft
- **[Counting Bits](https://leetcode.com/problems/counting-bits/)** - Amazon, Google
- **[Reverse Bits](https://leetcode.com/problems/reverse-bits/)** - Apple, Airbnb
- **[Missing Number](https://leetcode.com/problems/missing-number/)** - Amazon, Bloomberg, Microsoft
- **[Sum of Two Integers](https://leetcode.com/problems/sum-of-two-integers/)** - Apple, Amazon`,

            '15. Number Theory & Math': `

## 🏆 FAANG/MAANG Favorites

- **[Pow(x, n)](https://leetcode.com/problems/powx-n/)** - Facebook, Amazon, Google
- **[Sqrt(x)](https://leetcode.com/problems/sqrtx/)** - Bloomberg, Facebook
- **[Happy Number](https://leetcode.com/problems/happy-number/)** - Google, LinkedIn, Airbnb
- **[Count Primes](https://leetcode.com/problems/count-primes/)** - Amazon, Microsoft
- **[Factorial Trailing Zeroes](https://leetcode.com/problems/factorial-trailing-zeroes/)** - Amazon, Bloomberg
- **[Excel Sheet Column Number](https://leetcode.com/problems/excel-sheet-column-number/)** - Microsoft, Amazon, Facebook`
        };

        let updated = 0;
        for (const topic of topics.rows) {
            const addition = faangAdditions[topic.module_title];
            if (addition) {
                // Append FAANG section to existing content
                const newContent = topic.content + addition;

                await client.query(
                    'UPDATE dsa_topics SET content = $1 WHERE topic_id = $2',
                    [newContent, topic.topic_id]
                );
                console.log(`✅ Added FAANG problems to: ${topic.module_title}`);
                updated++;
            }
        }

        console.log(`\n🎉 Successfully added FAANG/MAANG favorites to ${updated} modules!`);
        console.log('\n📊 Summary:');
        console.log('   - Each module now has a "🏆 FAANG/MAANG Favorites" section');
        console.log('   - Includes most frequently asked interview problems');
        console.log('   - Company names shown for each problem');
        console.log('   - ⭐ marks indicate extremely popular problems');

    } catch (err) {
        console.error('❌ Error:', err.message);
    } finally {
        client.release();
        await pool.end();
    }
}

addFAANGProblems();
