/**
 * COMPREHENSIVE DSA CURRICULUM - COMPLETE TOPIC BREAKDOWN
 * Each major algorithm should have variations and applications as separate topics
 */

const COMPLETE_CURRICULUM = {
    "Graphs": {
        "BFS & Variations": [
            "BFS Fundamentals",
            "BFS Applications (Shortest Path, Level Order)",
            "Multi-Source BFS",
            "0-1 BFS (Deque)",
            "BFS on Grid/Matrix"
        ],
        "DFS & Variations": [
            "DFS Fundamentals",
            "DFS Applications (Cycle, Connected Components, Paths)",
            "DFS on Grid (Flood Fill, Islands)",
            "Backtracking with DFS"
        ],
        "Shortest Paths": [
            "Dijkstra's Algorithm",
            "Dijkstra Variations (Grid, K-Stops)",
            "Bellman-Ford (Negative Weights)",
            "Floyd-Warshall (All Pairs)",
            "A* Algorithm"
        ],
        "MST": [
            "Prim's Algorithm",
            "Kruskal's Algorithm + DSU"
        ],
        "Advanced": [
            "Topological Sort (DFS & Kahn's)",
            "Strongly Connected Components (Kosaraju/Tarjan)",
            "Bridges and Articulation Points",
            "Bipartite Graph Detection",
            "Eulerian Path/Circuit"
        ]
    },

    "Dynamic Programming": {
        "1D DP": [
            "Introduction to DP",
            "Fibonacci Variations",
            "House Robber Pattern",
            "Climbing Stairs Variations",
            "Decode Ways"
        ],
        "2D DP": [
            "Grid Path Problems",
            "Longest Common Subsequence (LCS)",
            "Edit Distance",
            "Distinct Subsequences"
        ],
        "Knapsack": [
            "0/1 Knapsack",
            "Unbounded Knapsack",
            "Subset Sum",
            "Partition Equal Subset"
        ],
        "String DP": [
            "Longest Palindromic Subsequence",
            "Palindrome Partitioning"
        ],
        "Advanced DP": [
            "Matrix Chain Multiplication",
            "Longest Increasing Subsequence (LIS)",
            "DP on Trees",
            "Bitmask DP"
        ]
    },

    "Trees": {
        "Traversals": [
            "Inorder, Preorder, Postorder",
            "Level Order (BFS)",
            "Zigzag Level Order",
            "Vertical Order Traversal"
        ],
        "BST": [
            "BST Operations",
            "BST Validation",
            "BST Iterator",
            "Kth Smallest in BST"
        ],
        "Common Patterns": [
            "Lowest Common Ancestor (LCA)",
            "Path Sum Problems",
            "Diameter & Height",
            "Serialize/Deserialize",
            "Flatten Tree to Linked List"
        ]
    },

    "Strings": {
        "Pattern Matching": [
            "KMP Algorithm",
            "Rabin-Karp",
            "Z-Algorithm"
        ],
        "Advanced Structures": [
            "Trie (Prefix Tree)",
            "Suffix Array",
            "Aho-Corasick"
        ]
    },

    "Arrays": {
        "Techniques": [
            "Two Pointers (all variations)",
            "Sliding Window (Fixed & Variable)",
            "Prefix Sum & Difference Array",
            "Kadane's Algorithm"
        ],
        "2D Arrays": [
            "Matrix Traversal",
            "Matrix Rotation",
            "Spiral Matrix",
            "Search in 2D Matrix"
        ]
    },

    "Linked Lists": {
        "Patterns": [
            "Fast & Slow Pointers (Cycle Detection)",
            "Reversal (Iterative & Recursive)",
            "Merge Lists",
            "Palindrome Check"
        ]
    },

    "Stacks & Queues": {
        "Stack Patterns": [
            "Monotonic Stack",
            "Next Greater/Smaller Element",
            "Stock Span Problem",
            "Valid Parentheses Variations"
        ]
    },

    "Heaps": [
        "Heap Fundamentals",
        "Top K Elements Pattern",
        "Merge K Sorted Lists/Arrays",
        "Sliding Window Maximum"
    ],

    "Searching & Sorting": [
        "Binary Search on Answer",
        "Lower/Upper Bound",
        "Search in Rotated Array",
        "Quick Select (Kth element)"
    ]
};

// Total estimated topics: ~100+
console.log("Complete curriculum exported");
module.exports = COMPLETE_CURRICULUM;
