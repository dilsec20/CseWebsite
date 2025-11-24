const pool = require('../db');

async function addExtraPracticeTopics() {
    const client = await pool.connect();
    try {
        console.log('🚀 Adding Extra Practice Topics to All Modules...\n');

        // Get all modules
        const modules = await client.query("SELECT module_id, title FROM dsa_modules ORDER BY order_index");

        // Get next order index for each module
        const getNextOrder = async (moduleId) => {
            const res = await client.query(
                "SELECT COALESCE(MAX(order_index), 0) + 1 as next_order FROM dsa_topics WHERE module_id = $1",
                [moduleId]
            );
            return res.rows[0].next_order;
        };

        // Extra practice content for each module
        const extraPracticeContent = {
            '1. Introduction & C++ Basics': `
# Extra Practice - C++ Basics

Master the fundamentals with these carefully selected problems:

## 🎯 Beginner Level
| Platform | Problem | Difficulty | Link |
|----------|---------|------------|------|
| LeetCode | Two Sum | Easy | [LC #1](https://leetcode.com/problems/two-sum/) |
| LeetCode | Palindrome Number | Easy | [LC #9](https://leetcode.com/problems/palindrome-number/) |
| LeetCode | Roman to Integer | Easy | [LC #13](https://leetcode.com/problems/roman-to-integer/) |
| GFG | Sum of Array Elements | Easy | [GFG Link](https://www.geeksforgeeks.org/problems/sum-of-array2326/1) |
| CodeForces | Way Too Long Words | 800 | [CF #71A](https://codeforces.com/problemset/problem/71/A) |

## 🚀 Next Steps
| Platform | Problem | Difficulty | Link |
|----------|---------|------------|------|
| LeetCode | Reverse Integer | Medium | [LC #7](https://leetcode.com/problems/reverse-integer/) |
| LeetCode | Valid Parentheses | Easy | [LC #20](https://leetcode.com/problems/valid-parentheses/) |
| CodeForces | Watermelon | 800 | [CF #4A](https://codeforces.com/problemset/problem/4/A) |
| GFG | Print 1 To N Without Loop | Easy | [GFG Link](https://www.geeksforgeeks.org/problems/print-1-to-n-without-using-loops-1587115620/1) |

## 💡 Tips
- Focus on understanding input/output handling
- Practice STL basics: vector, string, pair
- Master basic loops and conditionals
            `,
            '2. Time & Space Complexity': `
# Extra Practice - Complexity Analysis

Strengthen your algorithmic analysis skills:

## 🎯 Analysis Problems
| Platform | Problem | Difficulty | Link |
|----------|---------|------------|------|
| LeetCode | Find Pivot Index | Easy | [LC #724](https://leetcode.com/problems/find-pivot-index/) |
| LeetCode | Running Sum of 1d Array | Easy | [LC #1480](https://leetcode.com/problems/running-sum-of-1d-array/) |
| GFG | Count Inversions | Medium | [GFG Link](https://www.geeksforgeeks.org/problems/inversion-of-array-1587115620/1) |
| LeetCode | Time Based Key-Value Store | Medium | [LC #981](https://leetcode.com/problems/time-based-key-value-store/) |

## 🚀 Optimization Challenges
| Platform | Problem | Difficulty | Link |
|----------|---------|------------|------|
| LeetCode | Contains Duplicate | Easy | [LC #217](https://leetcode.com/problems/contains-duplicate/) |
| LeetCode | Valid Anagram | Easy | [LC #242](https://leetcode.com/problems/valid-anagram/) |
| GFG | Count pairs with given sum | Medium | [GFG Link](https://www.geeksforgeeks.org/problems/count-pairs-with-given-sum5022/1) |

## 💡 Tips
- Analyze time complexity before coding
- Compare brute force vs. optimized solutions
- Practice identifying O(n²) → O(n) optimizations
            `,
            '3. Arrays & Vectors': `
# Extra Practice - Arrays & Vectors

Master array manipulation with these essential problems:

## 🎯 Fundamental Problems
| Platform | Problem | Difficulty | Link |
|----------|---------|------------|------|
| LeetCode | Best Time to Buy and Sell Stock | Easy | [LC #121](https://leetcode.com/problems/best-time-to-buy-and-sell-stock/) |
| LeetCode | Product of Array Except Self | Medium | [LC #238](https://leetcode.com/problems/product-of-array-except-self/) |
| LeetCode | Container With Most Water | Medium | [LC #11](https://leetcode.com/problems/container-with-most-water/) |
| GFG | Kadane's Algorithm | Medium | [GFG Link](https://www.geeksforgeeks.org/problems/kadanes-algorithm-1587115620/1) |
| GFG | Leaders in an array | Easy | [GFG Link](https://www.geeksforgeeks.org/problems/leaders-in-an-array-1587115620/1) |

## 🚀 Advanced Challenges
| Platform | Problem | Difficulty | Link |
|----------|---------|------------|------|
| LeetCode | Subarray Sum Equals K | Medium | [LC #560](https://leetcode.com/problems/subarray-sum-equals-k/) |
| LeetCode | 3Sum | Medium | [LC #15](https://leetcode.com/problems/3sum/) |
| LeetCode | Trapping Rain Water | Hard | [LC #42](https://leetcode.com/problems/trapping-rain-water/) |
| CodeForces | Array Manipulation | 1200 | [CF #1154A](https://codeforces.com/problemset/problem/1154/A) |

## 💡 Key Patterns
- Two Pointers
- Prefix Sum
- Sliding Window
- Hash Maps for O(1) lookup
            `,
            '4. Common Array Techniques': `
# Extra Practice - Array Techniques

Apply advanced array techniques:

## 🎯 Two Pointers
| Platform | Problem | Difficulty | Link |
|----------|---------|------------|------|
| LeetCode | Remove Duplicates from Sorted Array | Easy | [LC #26](https://leetcode.com/problems/remove-duplicates-from-sorted-array/) |
| LeetCode | Move Zeroes | Easy | [LC #283](https://leetcode.com/problems/move-zeroes/) |
| LeetCode | Sort Colors | Medium | [LC #75](https://leetcode.com/problems/sort-colors/) |
| GFG | Rearrange Array Alternately | Medium | [GFG Link](https://www.geeksforgeeks.org/problems/-rearrange-array-alternately-1587115620/1) |

## 🚀 Sliding Window
| Platform | Problem | Difficulty | Link |
|----------|---------|------------|------|
| LeetCode | Maximum Average Subarray I | Easy | [LC #643](https://leetcode.com/problems/maximum-average-subarray-i/) |
| LeetCode | Longest Substring Without Repeating Characters | Medium | [LC #3](https://leetcode.com/problems/longest-substring-without-repeating-characters/) |
| LeetCode | Minimum Window Substring | Hard | [LC #76](https://leetcode.com/problems/minimum-window-substring/) |
| GFG | First negative in every window | Easy | [GFG Link](https://www.geeksforgeeks.org/problems/first-negative-integer-in-every-window-of-size-k3345/1) |

## 💡 Pattern Recognition
- Fixed vs Variable window size
- Maintain window invariants
- Expand-Contract technique
            `,
            '5. Strings': `
# Extra Practice - Strings

Build string manipulation expertise:

## 🎯 String Basics
| Platform | Problem | Difficulty | Link |
|----------|---------|------------|------|
| LeetCode | Valid Palindrome | Easy | [LC #125](https://leetcode.com/problems/valid-palindrome/) |
| LeetCode | Reverse String | Easy | [LC #344](https://leetcode.com/problems/reverse-string/) |
| LeetCode | Longest Common Prefix | Easy | [LC #14](https://leetcode.com/problems/longest-common-prefix/) |
| GFG | Anagram | Easy | [GFG Link](https://www.geeksforgeeks.org/problems/anagram-1587115620/1) |

## 🚀 Advanced String Problems
| Platform | Problem | Difficulty | Link |
|----------|---------|------------|------|
| LeetCode | Group Anagrams | Medium | [LC #49](https://leetcode.com/problems/group-anagrams/) |
| LeetCode | Longest Palindromic Substring | Medium | [LC #5](https://leetcode.com/problems/longest-palindromic-substring/) |
| LeetCode | Implement strStr() | Medium | [LC #28](https://leetcode.com/problems/find-the-index-of-the-first-occurrence-in-a-string/) |
| GFG | Smallest window in a string | Hard | [GFG Link](https://www.geeksforgeeks.org/problems/smallest-window-in-a-string-containing-all-the-characters-of-another-string-1587115621/1) |
| CodeForces | String Task | 1000 | [CF #118A](https://codeforces.com/problemset/problem/118/A) |

## 💡 Important Concepts
- KMP Algorithm
- Rabin-Karp
- Manacher's Algorithm (palindromes)
            `,
            '6. Searching & Sorting': `
# Extra Practice - Searching & Sorting

Master search and sort algorithms:

## 🎯 Binary Search
| Platform | Problem | Difficulty | Link |
|----------|---------|------------|------|
| LeetCode | Binary Search | Easy | [LC #704](https://leetcode.com/problems/binary-search/) |
| LeetCode | Search in Rotated Sorted Array | Medium | [LC #33](https://leetcode.com/problems/search-in-rotated-sorted-array/) |
| LeetCode | Find First and Last Position | Medium | [LC #34](https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/) |
| LeetCode | Koko Eating Bananas | Medium | [LC #875](https://leetcode.com/problems/koko-eating-bananas/) |
| GFG | Square root of a number | Medium | [GFG Link](https://www.geeksforgeeks.org/problems/square-root/1) |

## 🚀 Sorting Challenges
| Platform | Problem | Difficulty | Link |
|----------|---------|------------|------|
| LeetCode | Merge Intervals | Medium | [LC #56](https://leetcode.com/problems/merge-intervals/) |
| LeetCode | Largest Number | Medium | [LC #179](https://leetcode.com/problems/largest-number/) |
| GFG | Merge Sort | Medium | [GFG Link](https://www.geeksforgeeks.org/problems/merge-sort/1) |
| CodeForces | Towers | 1100 | [CF #37A](https://codeforces.com/problemset/problem/37/A) |

## 💡 Binary Search on Answer
- Aggressive Cows
- Book Allocation
- Painter's Partition
            `,
            '7. Recursion & Backtracking': `
# Extra Practice - Recursion & Backtracking

Develop recursive thinking:

## 🎯 Recursion Fundamentals
| Platform | Problem | Difficulty | Link |
|----------|---------|------------|------|
| LeetCode | Fibonacci Number | Easy | [LC #509](https://leetcode.com/problems/fibonacci-number/) |
| LeetCode | Power of Two | Easy | [LC #231](https://leetcode.com/problems/power-of-two/) |
| LeetCode | Reverse Linked List | Easy | [LC #206](https://leetcode.com/problems/reverse-linked-list/) |
| GFG | Tower of Hanoi | Medium | [GFG Link](https://www.geeksforgeeks.org/problems/tower-of-hanoi-1587115621/1) |

## 🚀 Backtracking Classics
| Platform | Problem | Difficulty | Link |
|----------|---------|------------|------|
| LeetCode | Permutations | Medium | [LC #46](https://leetcode.com/problems/permutations/) |
| LeetCode | Subsets | Medium | [LC #78](https://leetcode.com/problems/subsets/) |
| LeetCode | Combination Sum | Medium | [LC #39](https://leetcode.com/problems/combination-sum/) |
| LeetCode | N-Queens | Hard | [LC #51](https://leetcode.com/problems/n-queens/) |
| LeetCode | Sudoku Solver | Hard | [LC #37](https://leetcode.com/problems/sudoku-solver/) |
| GFG | Rat in a Maze | Medium | [GFG Link](https://www.geeksforgeeks.org/problems/rat-in-a-maze-problem/1) |

## 💡 Backtracking Template
- Choose → Explore → Unchoose
- Base case + recursive case
- Pruning for optimization
            `,
            '8. Linked Lists': `
# Extra Practice - Linked Lists

Master pointer manipulation:

## 🎯 Basic Operations
| Platform | Problem | Difficulty | Link |
|----------|---------|------------|------|
| LeetCode | Middle of the Linked List | Easy | [LC #876](https://leetcode.com/problems/middle-of-the-linked-list/) |
| LeetCode | Merge Two Sorted Lists | Easy | [LC #21](https://leetcode.com/problems/merge-two-sorted-lists/) |
| LeetCode | Remove Nth Node From End | Medium | [LC #19](https://leetcode.com/problems/remove-nth-node-from-end-of-list/) |
| GFG | Delete without head pointer | Easy | [GFG Link](https://www.geeksforgeeks.org/problems/delete-without-head-pointer/1) |

## 🚀 Advanced Problems
| Platform | Problem | Difficulty | Link |
|----------|---------|------------|------|
| LeetCode | Linked List Cycle | Easy | [LC #141](https://leetcode.com/problems/linked-list-cycle/) |
| LeetCode | Linked List Cycle II | Medium | [LC #142](https://leetcode.com/problems/linked-list-cycle-ii/) |
| LeetCode | Intersection of Two Linked Lists | Easy | [LC #160](https://leetcode.com/problems/intersection-of-two-linked-lists/) |
| LeetCode | Reverse Nodes in k-Group | Hard | [LC #25](https://leetcode.com/problems/reverse-nodes-in-k-group/) |
| GFG | Flatten a Linked List | Hard | [GFG Link](https://www.geeksforgeeks.org/problems/flattening-a-linked-list/1) |

## 💡 Key Techniques
- Fast & Slow Pointers (Floyd's Cycle)
- Dummy Node technique
- In-place reversal
            `,
            '9. Stacks & Queues': `
# Extra Practice - Stacks & Queues

Master LIFO and FIFO structures:

## 🎯 Stack Problems
| Platform | Problem | Difficulty | Link |
|----------|---------|------------|------|
| LeetCode | Valid Parentheses | Easy | [LC #20](https://leetcode.com/problems/valid-parentheses/) |
| LeetCode | Min Stack | Medium | [LC #155](https://leetcode.com/problems/min-stack/) |
| LeetCode | Daily Temperatures | Medium | [LC #739](https://leetcode.com/problems/daily-temperatures/) |
| LeetCode | Largest Rectangle in Histogram | Hard | [LC #84](https://leetcode.com/problems/largest-rectangle-in-histogram/) |
| GFG | Next Greater Element | Medium | [GFG Link](https://www.geeksforgeeks.org/problems/next-larger-element-1587115620/1) |

## 🚀 Queue & Deque
| Platform | Problem | Difficulty | Link |
|----------|---------|------------|------|
| LeetCode | Implement Queue using Stacks | Easy | [LC #232](https://leetcode.com/problems/implement-queue-using-stacks/) |
| LeetCode | Sliding Window Maximum | Hard | [LC #239](https://leetcode.com/problems/sliding-window-maximum/) |
| GFG | First non-repeating character | Medium | [GFG Link](https://www.geeksforgeeks.org/problems/first-non-repeating-character-in-a-stream1216/1) |
| CodeForces | Queue at the School | 800 | [CF #266B](https://codeforces.com/problemset/problem/266/B) |

## 💡 Monotonic Stack/Queue
- Useful for next/previous greater/smaller
- Maintains specific order property
            `,
            '10. Binary Trees & BST': `
# Extra Practice - Trees

Build tree traversal mastery:

## 🎯 Tree Traversals
| Platform | Problem | Difficulty | Link |
|----------|---------|------------|------|
| LeetCode | Binary Tree Inorder Traversal | Easy | [LC #94](https://leetcode.com/problems/binary-tree-inorder-traversal/) |
| LeetCode | Maximum Depth of Binary Tree | Easy | [LC #104](https://leetcode.com/problems/maximum-depth-of-binary-tree/) |
| LeetCode | Symmetric Tree | Easy | [LC #101](https://leetcode.com/problems/symmetric-tree/) |
| LeetCode | Binary Tree Level Order Traversal | Medium | [LC #102](https://leetcode.com/problems/binary-tree-level-order-traversal/) |

## 🚀 BST & Advanced
| Platform | Problem | Difficulty | Link |
|----------|---------|------------|------|
| LeetCode | Validate Binary Search Tree | Medium | [LC #98](https://leetcode.com/problems/validate-binary-search-tree/) |
| LeetCode | Lowest Common Ancestor of BST | Medium | [LC #235](https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/) |
| LeetCode | Kth Smallest Element in BST | Medium | [LC #230](https://leetcode.com/problems/kth-smallest-element-in-a-bst/) |
| LeetCode | Serialize and Deserialize Tree | Hard | [LC #297](https://leetcode.com/problems/serialize-and-deserialize-binary-tree/) |
| GFG | Top View of Binary Tree | Medium | [GFG Link](https://www.geeksforgeeks.org/problems/top-view-of-binary-tree/1) |

## 💡 Tree Patterns
- Recursion (DFS)
- Level Order (BFS)
- Morris Traversal (O(1) space)
            `,
            '11. Heaps & Priority Queues': `
# Extra Practice - Heaps

Master priority queue applications:

## 🎯 Heap Basics
| Platform | Problem | Difficulty | Link |
|----------|---------|------------|------|
| LeetCode | Kth Largest Element in Array | Medium | [LC #215](https://leetcode.com/problems/kth-largest-element-in-an-array/) |
| LeetCode | Last Stone Weight | Easy | [LC #1046](https://leetcode.com/problems/last-stone-weight/) |
| LeetCode | K Closest Points to Origin | Medium | [LC #973](https://leetcode.com/problems/k-closest-points-to-origin/) |
| GFG | Kth smallest element | Medium | [GFG Link](https://www.geeksforgeeks.org/problems/kth-smallest-element5635/1) |

## 🚀 Advanced Heap Problems
| Platform | Problem | Difficulty | Link |
|----------|---------|------------|------|
| LeetCode | Top K Frequent Elements | Medium | [LC #347](https://leetcode.com/problems/top-k-frequent-elements/) |
| LeetCode | Merge k Sorted Lists | Hard | [LC #23](https://leetcode.com/problems/merge-k-sorted-lists/) |
| LeetCode | Find Median from Data Stream | Hard | [LC #295](https://leetcode.com/problems/find-median-from-data-stream/) |
| GFG | Minimum Cost of ropes | Easy | [GFG Link](https://www.geeksforgeeks.org/problems/minimum-cost-of-ropes-1587115620/1) |

## 💡 Heap Applications
- Top K problems
- Running median
- Task scheduling
            `,
            '12. Graphs': `
# Extra Practice - Graphs

Conquer graph algorithms:

## 🎯 Graph Traversals
| Platform | Problem | Difficulty | Link |
|----------|---------|------------|------|
| LeetCode | Number of Islands | Medium | [LC #200](https://leetcode.com/problems/number-of-islands/) |
| LeetCode | Clone Graph | Medium | [LC #133](https://leetcode.com/problems/clone-graph/) |
| LeetCode | Course Schedule | Medium | [LC #207](https://leetcode.com/problems/course-schedule/) |
| GFG | BFS of graph | Easy | [GFG Link](https://www.geeksforgeeks.org/problems/bfs-traversal-of-graph/1) |
| GFG | DFS of Graph | Easy | [GFG Link](https://www.geeksforgeeks.org/problems/depth-first-traversal-for-a-graph/1) |

## 🚀 Shortest Path & Advanced
| Platform | Problem | Difficulty | Link |
|----------|---------|------------|------|
| LeetCode | Network Delay Time | Medium | [LC #743](https://leetcode.com/problems/network-delay-time/) |
| LeetCode | Cheapest Flights Within K Stops | Medium | [LC #787](https://leetcode.com/problems/cheapest-flights-within-k-stops/) |
| LeetCode | Word Ladder | Hard | [LC #127](https://leetcode.com/problems/word-ladder/) |
| LeetCode | Alien Dictionary | Hard | [LC #269](https://leetcode.com/problems/alien-dictionary/) (Premium) |
| GFG | Dijkstra Algorithm | Medium | [GFG Link](https://www.geeksforgeeks.org/problems/implementing-dijkstra-set-1-adjacency-matrix/1) |
| GFG | Detect cycle in undirected graph | Medium | [GFG Link](https://www.geeksforgeeks.org/problems/detect-cycle-in-an-undirected-graph/1) |

## 💡 Graph Algorithms
- BFS/DFS
- Dijkstra's Algorithm
- Topological Sort
- Union-Find (DSU)
            `,
            '13. Dynamic Programming': `
# Extra Practice - Dynamic Programming

Master the art of DP:

## 🎯 1D DP Classics
| Platform | Problem | Difficulty | Link |
|----------|---------|------------|------|
| LeetCode | Climbing Stairs | Easy | [LC #70](https://leetcode.com/problems/climbing-stairs/) |
| LeetCode | House Robber | Medium | [LC #198](https://leetcode.com/problems/house-robber/) |
| LeetCode | Coin Change | Medium | [LC #322](https://leetcode.com/problems/coin-change/) |
| LeetCode | Longest Increasing Subsequence | Medium | [LC #300](https://leetcode.com/problems/longest-increasing-subsequence/) |
| GFG | 0 - 1 Knapsack Problem | Medium | [GFG Link](https://www.geeksforgeeks.org/problems/0-1-knapsack-problem0945/1) |

## 🚀 2D DP & Hard Problems
| Platform | Problem | Difficulty | Link |
|----------|---------|------------|------|
| LeetCode | Unique Paths | Medium | [LC #62](https://leetcode.com/problems/unique-paths/) |
| LeetCode | Longest Common Subsequence | Medium | [LC #1143](https://leetcode.com/problems/longest-common-subsequence/) |
| LeetCode | Edit Distance | Hard | [LC #72](https://leetcode.com/problems/edit-distance/) |
| LeetCode | Regular Expression Matching | Hard | [LC #10](https://leetcode.com/problems/regular-expression-matching/) |
| GFG | Matrix Chain Multiplication | Hard | [GFG Link](https://www.geeksforgeeks.org/problems/matrix-chain-multiplication0303/1) |
| CodeForces | Frog 1 (AtCoder DP) | - | [AtCoder DP-A](https://atcoder.jp/contests/dp/tasks/dp_a) |

## 💡 DP Patterns
- Fibonacci-like
- Knapsack
- LIS/LCS
- DP on grids
- DP on trees
            `,
            '14. Bit Manipulation': `
# Extra Practice - Bit Manipulation

Unlock bitwise operation mastery:

## 🎯 Basic Bit Operations
| Platform | Problem | Difficulty | Link |
|----------|---------|------------|------|
| LeetCode | Number of 1 Bits | Easy | [LC #191](https://leetcode.com/problems/number-of-1-bits/) |
| LeetCode | Reverse Bits | Easy | [LC #190](https://leetcode.com/problems/reverse-bits/) |
| LeetCode | Single Number | Easy | [LC #136](https://leetcode.com/problems/single-number/) |
| LeetCode | Power of Two | Easy | [LC #231](https://leetcode.com/problems/power-of-two/) |
| GFG | Bit Difference | Easy | [GFG Link](https://www.geeksforgeeks.org/problems/bit-difference-1587115620/1) |

## 🚀 Advanced Bit Tricks
| Platform | Problem | Difficulty | Link |
|----------|---------|------------|------|
| LeetCode | Single Number II | Medium | [LC #137](https://leetcode.com/problems/single-number-ii/) |
| LeetCode | Subsets | Medium | [LC #78](https://leetcode.com/problems/subsets/) |
| LeetCode | Counting Bits | Easy | [LC #338](https://leetcode.com/problems/counting-bits/) |
| LeetCode | Maximum XOR of Two Numbers | Medium | [LC #421](https://leetcode.com/problems/maximum-xor-of-two-numbers-in-an-array/) |
| CodeForces | Petr and a Combination Lock | 1200 | [CF #1097B](https://codeforces.com/problemset/problem/1097/B) |

## 💡 Bit Hacks
- Check if power of 2: \`n & (n-1) == 0\`
- Set bit: \`n | (1 << i)\`
- Clear bit: \`n & ~(1 << i)\`
- Toggle bit: \`n ^ (1 << i)\`
            `,
            '15. Number Theory & Math': `
# Extra Practice - Number Theory

Strengthen mathematical problem-solving:

## 🎯 Prime Numbers & GCD
| Platform | Problem | Difficulty | Link |
|----------|---------|------------|------|
| LeetCode | Count Primes | Medium | [LC #204](https://leetcode.com/problems/count-primes/) |
| LeetCode | Happy Number | Easy | [LC #202](https://leetcode.com/problems/happy-number/) |
| GFG | GCD of two numbers | Easy | [GFG Link](https://www.geeksforgeeks.org/problems/gcd-of-two-numbers3459/1) |
| GFG | Sieve of Eratosthenes | Medium | [GFG Link](https://www.geeksforgeeks.org/problems/sieve-of-eratosthenes5242/1) |
| CodeForces | Prime Subtraction | 1000 | [CF #1238A](https://codeforces.com/problemset/problem/1238/A) |

## 🚀 Modular Arithmetic
| Platform | Problem | Difficulty | Link |
|----------|---------|------------|------|
| LeetCode | Pow(x, n) | Medium | [LC #50](https://leetcode.com/problems/powx-n/) |
| LeetCode | Super Pow | Medium | [LC #372](https://leetcode.com/problems/super-pow/) |
| GFG | Modular Multiplicative Inverse | Medium | [GFG Link](https://www.geeksforgeeks.org/problems/modular-multiplicative-inverse-1587115620/1) |
| CodeForces | Vanya and Lanterns | 1200 | [CF #492B](https://codeforces.com/problemset/problem/492/B) |

## 💡 Important Theorems
- Fermat's Little Theorem
- Chinese Remainder Theorem
- Euler's Totient Function
- Fast Exponentiation
            `
        };

        let topicsAdded = 0;

        for (const module of modules.rows) {
            const moduleTitle = module.title;
            const content = extraPracticeContent[moduleTitle];

            if (content) {
                const nextOrder = await getNextOrder(module.module_id);

                await client.query(
                    "INSERT INTO dsa_topics (module_id, title, content, problem_id, order_index) VALUES ($1, $2, $3, $4, $5)",
                    [module.module_id, '📝 Extra Practice', content, null, nextOrder]
                );

                console.log(`✅ Added Extra Practice to: ${moduleTitle}`);
                topicsAdded++;
            }
        }

        console.log(`\n🎉 Successfully added ${topicsAdded} Extra Practice topics!`);
        console.log('💡 Students can now practice curated problems from LeetCode, GFG, and Codeforces');

    } catch (err) {
        console.error('❌ Error:', err.message);
    } finally {
        client.release();
        await pool.end();
    }
}

addExtraPracticeTopics();
