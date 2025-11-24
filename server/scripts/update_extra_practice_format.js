const pool = require('../db');

async function updateExtraPracticeFormat() {
    const client = await pool.connect();
    try {
        console.log('🔄 Updating Extra Practice format with clickable links...\n');

        // Get all Extra Practice topics
        const topics = await client.query(`
            SELECT t.topic_id, m.title as module_title
            FROM dsa_topics t
            JOIN dsa_modules m ON t.module_id = m.module_id
            WHERE t.title LIKE '%Extra Practice%'
            ORDER BY m.order_index
        `);

        // New format with clickable links
        const updatedContent = {
            '1. Introduction & C++ Basics': `
# 📝 Extra Practice - C++ Basics

## 🎯 Beginner Level

- **[Two Sum](https://leetcode.com/problems/two-sum/)** - LeetCode Easy
- **[Palindrome Number](https://leetcode.com/problems/palindrome-number/)** - LeetCode Easy
- **[Roman to Integer](https://leetcode.com/problems/roman-to-integer/)** - LeetCode Easy
- **[Sum of Array Elements](https://www.geeksforgeeks.org/problems/sum-of-array2326/1)** - GFG Easy
- **[Way Too Long Words](https://codeforces.com/problemset/problem/71/A)** - CodeForces 800

## 🚀 Next Steps

- **[Reverse Integer](https://leetcode.com/problems/reverse-integer/)** - LeetCode Medium
- **[Valid Parentheses](https://leetcode.com/problems/valid-parentheses/)** - LeetCode Easy
- **[Watermelon](https://codeforces.com/problemset/problem/4/A)** - CodeForces 800
- **[Print 1 To N Without Loop](https://www.geeksforgeeks.org/problems/print-1-to-n-without-using-loops-1587115620/1)** - GFG Easy

## 💡 Tips
Practice basic I/O, loops, conditionals, and STL basics (vector, string, pair)
            `,
            '2. Time & Space Complexity': `
# 📝 Extra Practice - Complexity Analysis

## 🎯 Analysis Problems

- **[Find Pivot Index](https://leetcode.com/problems/find-pivot-index/)** - LeetCode Easy
- **[Running Sum of 1d Array](https://leetcode.com/problems/running-sum-of-1d-array/)** - LeetCode Easy
- **[Count Inversions](https://www.geeksforgeeks.org/problems/inversion-of-array-1587115620/1)** - GFG Medium
- **[Time Based Key-Value Store](https://leetcode.com/problems/time-based-key-value-store/)** - LeetCode Medium

## 🚀 Optimization Challenges

- **[Contains Duplicate](https://leetcode.com/problems/contains-duplicate/)** - LeetCode Easy
- **[Valid Anagram](https://leetcode.com/problems/valid-anagram/)** - LeetCode Easy
- **[Count pairs with given sum](https://www.geeksforgeeks.org/problems/count-pairs-with-given-sum5022/1)** - GFG Medium

## 💡 Tips
Always analyze time complexity before coding. Practice O(n²) → O(n) optimizations
            `,
            '3. Arrays & Vectors': `
# 📝 Extra Practice - Arrays & Vectors

## 🎯 Fundamental Problems

- **[Best Time to Buy and Sell Stock](https://leetcode.com/problems/best-time-to-buy-and-sell-stock/)** - LeetCode Easy
- **[Product of Array Except Self](https://leetcode.com/problems/product-of-array-except-self/)** - LeetCode Medium
- **[Container With Most Water](https://leetcode.com/problems/container-with-most-water/)** - LeetCode Medium
- **[Kadane's Algorithm](https://www.geeksforgeeks.org/problems/kadanes-algorithm-1587115620/1)** - GFG Medium
- **[Leaders in an array](https://www.geeksforgeeks.org/problems/leaders-in-an-array-1587115620/1)** - GFG Easy

## 🚀 Advanced Challenges

- **[Subarray Sum Equals K](https://leetcode.com/problems/subarray-sum-equals-k/)** - LeetCode Medium
- **[3Sum](https://leetcode.com/problems/3sum/)** - LeetCode Medium
- **[Trapping Rain Water](https://leetcode.com/problems/trapping-rain-water/)** - LeetCode Hard
- **[Array Manipulation](https://codeforces.com/problemset/problem/1154/A)** - CodeForces 1200

## 💡 Key Patterns
Two Pointers, Prefix Sum, Sliding Window, Hash Maps for O(1) lookup
            `,
            '4. Common Array Techniques': `
# 📝 Extra Practice - Array Techniques

## 🎯 Two Pointers

- **[Remove Duplicates from Sorted Array](https://leetcode.com/problems/remove-duplicates-from-sorted-array/)** - LeetCode Easy
- **[Move Zeroes](https://leetcode.com/problems/move-zeroes/)** - LeetCode Easy
- **[Sort Colors](https://leetcode.com/problems/sort-colors/)** - LeetCode Medium
- **[Rearrange Array Alternately](https://www.geeksforgeeks.org/problems/-rearrange-array-alternately-1587115620/1)** - GFG Medium

## 🚀 Sliding Window

- **[Maximum Average Subarray I](https://leetcode.com/problems/maximum-average-subarray-i/)** - LeetCode Easy
- **[Longest Substring Without Repeating Characters](https://leetcode.com/problems/longest-substring-without-repeating-characters/)** - LeetCode Medium
- **[Minimum Window Substring](https://leetcode.com/problems/minimum-window-substring/)** - LeetCode Hard
- **[First negative in every window](https://www.geeksforgeeks.org/problems/first-negative-integer-in-every-window-of-size-k3345/1)** - GFG Easy

## 💡 Pattern Recognition
Fixed vs Variable window size. Master expand-contract technique
            `,
            '5. Strings': `
# 📝 Extra Practice - Strings

## 🎯 String Basics

- **[Valid Palindrome](https://leetcode.com/problems/valid-palindrome/)** - LeetCode Easy
- **[Reverse String](https://leetcode.com/problems/reverse-string/)** - LeetCode Easy
- **[Longest Common Prefix](https://leetcode.com/problems/longest-common-prefix/)** - LeetCode Easy
- **[Anagram](https://www.geeksforgeeks.org/problems/anagram-1587115620/1)** - GFG Easy

## 🚀 Advanced String Problems

- **[Group Anagrams](https://leetcode.com/problems/group-anagrams/)** - LeetCode Medium
- **[Longest Palindromic Substring](https://leetcode.com/problems/longest-palindromic-substring/)** - LeetCode Medium
- **[Implement strStr()](https://leetcode.com/problems/find-the-index-of-the-first-occurrence-in-a-string/)** - LeetCode Medium
- **[Smallest window in a string](https://www.geeksforgeeks.org/problems/smallest-window-in-a-string-containing-all-the-characters-of-another-string-1587115621/1)** - GFG Hard
- **[String Task](https://codeforces.com/problemset/problem/118/A)** - CodeForces 1000

## 💡 Important Concepts
KMP Algorithm, Rabin-Karp, Manacher's Algorithm for palindromes
            `,
            '6. Searching & Sorting': `
# 📝 Extra Practice - Searching & Sorting

## 🎯 Binary Search

- **[Binary Search](https://leetcode.com/problems/binary-search/)** - LeetCode Easy
- **[Search in Rotated Sorted Array](https://leetcode.com/problems/search-in-rotated-sorted-array/)** - LeetCode Medium
- **[Find First and Last Position](https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/)** - LeetCode Medium
- **[Koko Eating Bananas](https://leetcode.com/problems/koko-eating-bananas/)** - LeetCode Medium
- **[Square root of a number](https://www.geeksforgeeks.org/problems/square-root/1)** - GFG Medium

## 🚀 Sorting Challenges

- **[Merge Intervals](https://leetcode.com/problems/merge-intervals/)** - LeetCode Medium
- **[Largest Number](https://leetcode.com/problems/largest-number/)** - LeetCode Medium
- **[Merge Sort](https://www.geeksforgeeks.org/problems/merge-sort/1)** - GFG Medium
- **[Towers](https://codeforces.com/problemset/problem/37/A)** - CodeForces 1100

## 💡 Binary Search on Answer
Practice: Aggressive Cows, Book Allocation, Painter's Partition
            `,
            '7. Recursion & Backtracking': `
# 📝 Extra Practice - Recursion & Backtracking

## 🎯 Recursion Fundamentals

- **[Fibonacci Number](https://leetcode.com/problems/fibonacci-number/)** - LeetCode Easy
- **[Power of Two](https://leetcode.com/problems/power-of-two/)** - LeetCode Easy
- **[Reverse Linked List](https://leetcode.com/problems/reverse-linked-list/)** - LeetCode Easy
- **[Tower of Hanoi](https://www.geeksforgeeks.org/problems/tower-of-hanoi-1587115621/1)** - GFG Medium

## 🚀 Backtracking Classics

- **[Permutations](https://leetcode.com/problems/permutations/)** - LeetCode Medium
- **[Subsets](https://leetcode.com/problems/subsets/)** - LeetCode Medium
- **[Combination Sum](https://leetcode.com/problems/combination-sum/)** - LeetCode Medium
- **[N-Queens](https://leetcode.com/problems/n-queens/)** - LeetCode Hard
- **[Sudoku Solver](https://leetcode.com/problems/sudoku-solver/)** - LeetCode Hard
- **[Rat in a Maze](https://www.geeksforgeeks.org/problems/rat-in-a-maze-problem/1)** - GFG Medium

## 💡 Backtracking Template
Choose → Explore → Unchoose. Add pruning for optimization
            `,
            '8. Linked Lists': `
# 📝 Extra Practice - Linked Lists

## 🎯 Basic Operations

- **[Middle of the Linked List](https://leetcode.com/problems/middle-of-the-linked-list/)** - LeetCode Easy
- **[Merge Two Sorted Lists](https://leetcode.com/problems/merge-two-sorted-lists/)** - LeetCode Easy
- **[Remove Nth Node From End](https://leetcode.com/problems/remove-nth-node-from-end-of-list/)** - LeetCode Medium
- **[Delete without head pointer](https://www.geeksforgeeks.org/problems/delete-without-head-pointer/1)** - GFG Easy

## 🚀 Advanced Problems

- **[Linked List Cycle](https://leetcode.com/problems/linked-list-cycle/)** - LeetCode Easy
- **[Linked List Cycle II](https://leetcode.com/problems/linked-list-cycle-ii/)** - LeetCode Medium
- **[Intersection of Two Linked Lists](https://leetcode.com/problems/intersection-of-two-linked-lists/)** - LeetCode Easy
- **[Reverse Nodes in k-Group](https://leetcode.com/problems/reverse-nodes-in-k-group/)** - LeetCode Hard
- **[Flatten a Linked List](https://www.geeksforgeeks.org/problems/flattening-a-linked-list/1)** - GFG Hard

## 💡 Key Techniques
Fast & Slow Pointers (Floyd's Cycle), Dummy Node technique, In-place reversal
            `,
            '9. Stacks & Queues': `
# 📝 Extra Practice - Stacks & Queues

## 🎯 Stack Problems

- **[Valid Parentheses](https://leetcode.com/problems/valid-parentheses/)** - LeetCode Easy
- **[Min Stack](https://leetcode.com/problems/min-stack/)** - LeetCode Medium
- **[Daily Temperatures](https://leetcode.com/problems/daily-temperatures/)** - LeetCode Medium
- **[Largest Rectangle in Histogram](https://leetcode.com/problems/largest-rectangle-in-histogram/)** - LeetCode Hard
- **[Next Greater Element](https://www.geeksforgeeks.org/problems/next-larger-element-1587115620/1)** - GFG Medium

## 🚀 Queue & Deque

- **[Implement Queue using Stacks](https://leetcode.com/problems/implement-queue-using-stacks/)** - LeetCode Easy
- **[Sliding Window Maximum](https://leetcode.com/problems/sliding-window-maximum/)** - LeetCode Hard
- **[First non-repeating character](https://www.geeksforgeeks.org/problems/first-non-repeating-character-in-a-stream1216/1)** - GFG Medium
- **[Queue at the School](https://codeforces.com/problemset/problem/266/B)** - CodeForces 800

## 💡 Monotonic Stack/Queue
Useful for next/previous greater/smaller problems. Maintains order property
            `,
            '10. Binary Trees & BST': `
# 📝 Extra Practice - Trees

## 🎯 Tree Traversals

- **[Binary Tree Inorder Traversal](https://leetcode.com/problems/binary-tree-inorder-traversal/)** - LeetCode Easy
- **[Maximum Depth of Binary Tree](https://leetcode.com/problems/maximum-depth-of-binary-tree/)** - LeetCode Easy
- **[Symmetric Tree](https://leetcode.com/problems/symmetric-tree/)** - LeetCode Easy
- **[Binary Tree Level Order Traversal](https://leetcode.com/problems/binary-tree-level-order-traversal/)** - LeetCode Medium

## 🚀 BST & Advanced

- **[Validate Binary Search Tree](https://leetcode.com/problems/validate-binary-search-tree/)** - LeetCode Medium
- **[Lowest Common Ancestor of BST](https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/)** - LeetCode Medium
- **[Kth Smallest Element in BST](https://leetcode.com/problems/kth-smallest-element-in-a-bst/)** - LeetCode Medium
- **[Serialize and Deserialize Tree](https://leetcode.com/problems/serialize-and-deserialize-binary-tree/)** - LeetCode Hard
- **[Top View of Binary Tree](https://www.geeksforgeeks.org/problems/top-view-of-binary-tree/1)** - GFG Medium

## 💡 Tree Patterns
DFS (Recursion), BFS (Level Order), Morris Traversal for O(1) space
            `,
            '11. Heaps & Priority Queues': `
# 📝 Extra Practice - Heaps

## 🎯 Heap Basics

- **[Kth Largest Element in Array](https://leetcode.com/problems/kth-largest-element-in-an-array/)** - LeetCode Medium
- **[Last Stone Weight](https://leetcode.com/problems/last-stone-weight/)** - LeetCode Easy
- **[K Closest Points to Origin](https://leetcode.com/problems/k-closest-points-to-origin/)** - LeetCode Medium
- **[Kth smallest element](https://www.geeksforgeeks.org/problems/kth-smallest-element5635/1)** - GFG Medium

## 🚀 Advanced Heap Problems

- **[Top K Frequent Elements](https://leetcode.com/problems/top-k-frequent-elements/)** - LeetCode Medium
- **[Merge k Sorted Lists](https://leetcode.com/problems/merge-k-sorted-lists/)** - LeetCode Hard
- **[Find Median from Data Stream](https://leetcode.com/problems/find-median-from-data-stream/)** - LeetCode Hard
- **[Minimum Cost of ropes](https://www.geeksforgeeks.org/problems/minimum-cost-of-ropes-1587115620/1)** - GFG Easy

## 💡 Heap Applications
Top K problems, Running median, Task scheduling
            `,
            '12. Graphs': `
# 📝 Extra Practice - Graphs

## 🎯 Graph Traversals

- **[Number of Islands](https://leetcode.com/problems/number-of-islands/)** - LeetCode Medium
- **[Clone Graph](https://leetcode.com/problems/clone-graph/)** - LeetCode Medium
- **[Course Schedule](https://leetcode.com/problems/course-schedule/)** - LeetCode Medium
- **[BFS of graph](https://www.geeksforgeeks.org/problems/bfs-traversal-of-graph/1)** - GFG Easy
- **[DFS of Graph](https://www.geeksforgeeks.org/problems/depth-first-traversal-for-a-graph/1)** - GFG Easy

## 🚀 Shortest Path & Advanced

- **[Network Delay Time](https://leetcode.com/problems/network-delay-time/)** - LeetCode Medium
- **[Cheapest Flights Within K Stops](https://leetcode.com/problems/cheapest-flights-within-k-stops/)** - LeetCode Medium
- **[Word Ladder](https://leetcode.com/problems/word-ladder/)** - LeetCode Hard
- **[Dijkstra Algorithm](https://www.geeksforgeeks.org/problems/implementing-dijkstra-set-1-adjacency-matrix/1)** - GFG Medium
- **[Detect cycle in undirected graph](https://www.geeksforgeeks.org/problems/detect-cycle-in-an-undirected-graph/1)** - GFG Medium

## 💡 Graph Algorithms
BFS/DFS, Dijkstra's, Topological Sort, Union-Find (DSU)
            `,
            '13. Dynamic Programming': `
# 📝 Extra Practice - Dynamic Programming

## 🎯 1D DP Classics

- **[Climbing Stairs](https://leetcode.com/problems/climbing-stairs/)** - LeetCode Easy
- **[House Robber](https://leetcode.com/problems/house-robber/)** - LeetCode Medium
- **[Coin Change](https://leetcode.com/problems/coin-change/)** - LeetCode Medium
- **[Longest Increasing Subsequence](https://leetcode.com/problems/longest-increasing-subsequence/)** - LeetCode Medium
- **[0-1 Knapsack Problem](https://www.geeksforgeeks.org/problems/0-1-knapsack-problem0945/1)** - GFG Medium

## 🚀 2D DP & Hard Problems

- **[Unique Paths](https://leetcode.com/problems/unique-paths/)** - LeetCode Medium
- **[Longest Common Subsequence](https://leetcode.com/problems/longest-common-subsequence/)** - LeetCode Medium
- **[Edit Distance](https://leetcode.com/problems/edit-distance/)** - LeetCode Hard
- **[Regular Expression Matching](https://leetcode.com/problems/regular-expression-matching/)** - LeetCode Hard
- **[Matrix Chain Multiplication](https://www.geeksforgeeks.org/problems/matrix-chain-multiplication0303/1)** - GFG Hard
- **[Frog 1](https://atcoder.jp/contests/dp/tasks/dp_a)** - AtCoder DP

## 💡 DP Patterns
Fibonacci-like, Knapsack, LIS/LCS, DP on grids, DP on trees
            `,
            '14. Bit Manipulation': `
# 📝 Extra Practice - Bit Manipulation

## 🎯 Basic Bit Operations

- **[Number of 1 Bits](https://leetcode.com/problems/number-of-1-bits/)** - LeetCode Easy
- **[Reverse Bits](https://leetcode.com/problems/reverse-bits/)** - LeetCode Easy
- **[Single Number](https://leetcode.com/problems/single-number/)** - LeetCode Easy
- **[Power of Two](https://leetcode.com/problems/power-of-two/)** - LeetCode Easy
- **[Bit Difference](https://www.geeksforgeeks.org/problems/bit-difference-1587115620/1)** - GFG Easy

## 🚀 Advanced Bit Tricks

- **[Single Number II](https://leetcode.com/problems/single-number-ii/)** - LeetCode Medium
- **[Subsets](https://leetcode.com/problems/subsets/)** - LeetCode Medium
- **[Counting Bits](https://leetcode.com/problems/counting-bits/)** - LeetCode Easy
- **[Maximum XOR of Two Numbers](https://leetcode.com/problems/maximum-xor-of-two-numbers-in-an-array/)** - LeetCode Medium
- **[Petr and a Combination Lock](https://codeforces.com/problemset/problem/1097/B)** - CodeForces 1200

## 💡 Bit Hacks
Check power of 2: n & (n-1) == 0, Set bit: n | (1 << i), Clear bit: n & ~(1 << i)
            `,
            '15. Number Theory & Math': `
# 📝 Extra Practice - Number Theory

## 🎯 Prime Numbers & GCD

- **[Count Primes](https://leetcode.com/problems/count-primes/)** - LeetCode Medium
- **[Happy Number](https://leetcode.com/problems/happy-number/)** - LeetCode Easy
- **[GCD of two numbers](https://www.geeksforgeeks.org/problems/gcd-of-two-numbers3459/1)** - GFG Easy
- **[Sieve of Eratosthenes](https://www.geeksforgeeks.org/problems/sieve-of-eratosthenes5242/1)** - GFG Medium
- **[Prime Subtraction](https://codeforces.com/problemset/problem/1238/A)** - CodeForces 1000

## 🚀 Modular Arithmetic

- **[Pow(x, n)](https://leetcode.com/problems/powx-n/)** - LeetCode Medium
- **[Super Pow](https://leetcode.com/problems/super-pow/)** - LeetCode Medium
- **[Modular Multiplicative Inverse](https://www.geeksforgeeks.org/problems/modular-multiplicative-inverse-1587115620/1)** - GFG Medium
- **[Vanya and Lanterns](https://codeforces.com/problemset/problem/492/B)** - CodeForces 1200

## 💡 Important Theorems
Fermat's Little Theorem, Chinese Remainder Theorem, Euler's Totient, Fast Exponentiation
            `
        };

        let updated = 0;
        for (const topic of topics.rows) {
            const content = updatedContent[topic.module_title];
            if (content) {
                await client.query(
                    'UPDATE dsa_topics SET content = $1 WHERE topic_id = $2',
                    [content, topic.topic_id]
                );
                console.log(`✅ Updated: ${topic.module_title}`);
                updated++;
            }
        }

        console.log(`\n🎉 Successfully updated ${updated} Extra Practice topics with clickable links!`);

    } catch (err) {
        console.error('❌ Error:', err.message);
    } finally {
        client.release();
        await pool.end();
    }
}

updateExtraPracticeFormat();
