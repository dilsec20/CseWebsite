const pool = require('../db');

async function populateDSA() {
    const client = await pool.connect();
    try {
        console.log('🚀 Populating Comprehensive DSA Curriculum...\n');

        // 1. Clear existing data
        await client.query('TRUNCATE TABLE dsa_topics, dsa_modules RESTART IDENTITY CASCADE');
        console.log('🧹 Cleared existing DSA data');

        // 2. Define Modules
        const modules = [
            { title: '1. Introduction & C++ Basics', desc: 'Start from zero. Variables, loops, functions, and logic building.', order: 1 },
            { title: '2. Time & Space Complexity', desc: 'Analyze algorithm efficiency. Big O notation, best/worst cases.', order: 2 },
            { title: '3. Arrays & Vectors', desc: 'Memory layout, operations, 2D arrays.', order: 3 },
            { title: '4. Common Array Techniques', desc: 'Master Two Pointers, Sliding Window, and Prefix Sum.', order: 4 },
            { title: '5. Strings', desc: 'ASCII, char arrays, string manipulation, and pattern matching.', order: 5 },
            { title: '6. Searching & Sorting', desc: 'Binary Search, Merge Sort, Quick Sort, and custom comparators.', order: 6 },
            { title: '7. Recursion & Backtracking', desc: 'Thinking recursively, base cases, and state space trees.', order: 7 },
            { title: '8. Linked Lists', desc: 'Singly, Doubly, Circular lists. Pointer manipulation mastery.', order: 8 },
            { title: '9. Stacks & Queues', desc: 'LIFO/FIFO principles, monotonic stacks, and BFS foundations.', order: 9 },
            { title: '10. Binary Trees & BST', desc: 'Tree traversals, height, depth, and search properties.', order: 10 },
            { title: '11. Heaps & Priority Queues', desc: 'Min-heap, Max-heap, and efficient scheduling.', order: 11 },
            { title: '12. Graphs', desc: 'Adjacency lists, BFS, DFS, Shortest Paths (Dijkstra), and MST.', order: 12 },
            { title: '13. Dynamic Programming', desc: 'Memoization, Tabulation, 1D/2D DP, and Knapsack patterns.', order: 13 }
        ];

        const moduleMap = {}; // title -> id

        for (const m of modules) {
            const res = await client.query(
                "INSERT INTO dsa_modules (title, description, order_index) VALUES ($1, $2, $3) RETURNING module_id",
                [m.title, m.desc, m.order]
            );
            moduleMap[m.title] = res.rows[0].module_id;
            console.log(`✅ Module Created: ${m.title}`);
        }

        // 3. Helper to find problem ID
        const getProbId = async (titlePart) => {
            const res = await client.query("SELECT problem_id FROM problems WHERE title ILIKE $1 LIMIT 1", [`%${titlePart}%`]);
            return res.rows[0]?.problem_id || null;
        };

        // 4. Insert Topics

        // --- Module 1: Introduction ---
        await insertTopic(client, moduleMap['1. Introduction & C++ Basics'], 'What is Programming?', `
# What is Programming?

Programming is simply the act of giving instructions to a computer to perform a specific task. Computers are dumb; they only understand 0s and 1s. We use high-level languages like C++ to write human-readable instructions, which are then compiled into machine code.

## Why C++ for DSA?
- **Speed**: C++ is extremely fast, making it ideal for competitive programming.
- **STL (Standard Template Library)**: Provides ready-to-use data structures like Vectors, Maps, and Sets.
- **Control**: Gives you direct control over memory.

## Your First Program
\`\`\`cpp
#include <iostream> // Header file for Input/Output
using namespace std; // Standard namespace

int main() {
    // This is where execution begins
    cout << "Hello, World!"; // Print to screen
    return 0; // Signal that program ended successfully
}
\`\`\`
        `, null, 1);

        await insertTopic(client, moduleMap['1. Introduction & C++ Basics'], 'Variables & Data Types', `
# Variables & Data Types

A variable is a container to store data.

## Primitive Data Types
1. **int**: Integers (e.g., \`5\`, \`-10\`). Size: 4 bytes.
2. **float/double**: Decimals (e.g., \`3.14\`). Size: 4/8 bytes.
3. **char**: Single character (e.g., \`'a'\`). Size: 1 byte.
4. **bool**: Boolean (e.g., \`true\`, \`false\`). Size: 1 byte.
5. **long long**: Large integers. Size: 8 bytes.

## Declaration & Initialization
\`\`\`cpp
int age = 25;          // Declaration + Initialization
double price = 19.99;
char grade = 'A';
bool isPassed = true;

// Input from user
int x;
cin >> x; // Takes input
\`\`\`
        `, null, 2);

        // --- Module 3: Arrays ---
        const twoSumId = await getProbId('Two Sum');
        const maxSubId = await getProbId('Maximum Subarray');

        await insertTopic(client, moduleMap['3. Arrays & Vectors'], 'Introduction to Arrays', `
# Introduction to Arrays

An array is a collection of elements of the **same type** stored in **contiguous memory locations**.

## Why Arrays?
Imagine you want to store the marks of 100 students. Creating 100 variables (\`m1, m2, ... m100\`) is tedious. An array lets you store them as \`marks[100]\`.

## Declaration & Initialization
\`\`\`cpp
// Syntax: type name[size];
int arr[5]; // Declares an array of size 5 containing garbage values

// Initialization
int nums[5] = {1, 2, 3, 4, 5}; 
int zeros[10] = {0}; // All elements 0

// Accessing Elements (0-based indexing)
cout << nums[0]; // Prints 1
cout << nums[4]; // Prints 5
\`\`\`

## Memory Layout
If \`arr[0]\` is at address \`100\`, and integers take 4 bytes:
- \`arr[1]\` is at \`104\`
- \`arr[2]\` is at \`108\`
This contiguous nature allows **O(1)** access time.
        `, null, 1);

        await insertTopic(client, moduleMap['3. Arrays & Vectors'], 'Vectors (Dynamic Arrays)', `
# Vectors (STL)

Standard arrays have a fixed size. Vectors are **dynamic arrays** that can resize themselves.

## Key Functions
\`\`\`cpp
#include <vector>

vector<int> v; 

v.push_back(10); // Adds 10 to end
v.push_back(20); // Adds 20 -> {10, 20}
v.pop_back();    // Removes last element -> {10}

cout << v.size(); // Size of vector
\`\`\`

## Iterating
\`\`\`cpp
for(int i=0; i<v.size(); i++) {
    cout << v[i] << " ";
}
// Or using for-each loop
for(int x : v) {
    cout << x << " ";
}
\`\`\`
        `, null, 2);

        // --- Module 4: Common Array Techniques ---

        // Two Pointers
        const containerId = await getProbId('Container With Most Water');
        const threeSumId = await getProbId('3Sum');

        await insertTopic(client, moduleMap['4. Common Array Techniques'], 'Two Pointers Technique', `
# Two Pointers Technique

The Two Pointers technique is an essential pattern for solving array and string problems efficiently. It typically involves using two integer variables to traverse the data structure.

## When to use?
- The array is **sorted**.
- You need to find a pair/triplet satisfying a condition.
- You need to reverse or swap elements.

## Global Template
\`\`\`cpp
int left = 0;
int right = n - 1;

while (left < right) {
    // Check condition
    if (condition(arr[left], arr[right])) {
        return true;
    } else if (too_small) {
        left++;
    } else {
        right--;
    }
}
\`\`\`

## Example: Two Sum (Sorted Array)
If the array is sorted, we can find two numbers summing to target in O(n).
1. Start \`left\` at 0, \`right\` at \`n-1\`.
2. Calculate \`sum = arr[left] + arr[right]\`.
3. If \`sum == target\`, found!
4. If \`sum < target\`, we need a larger sum -> \`left++\`.
5. If \`sum > target\`, we need a smaller sum -> \`right--\`.

## Related Problems
- [Two Sum](/problems/${twoSumId})
- [Container With Most Water](/problems/${containerId})
- [3Sum](/problems/${threeSumId})
        `, twoSumId, 1);

        // Sliding Window
        const lengthOfLongestSubstringId = await getProbId('Longest Substring Without Repeating Characters');
        const minSubArrayLenId = await getProbId('Minimum Size Subarray Sum');

        await insertTopic(client, moduleMap['4. Common Array Techniques'], 'Sliding Window Technique', `
# Sliding Window Technique

The Sliding Window technique is used to perform operations on a specific window size of an array or string. It converts nested loops (O(n^2)) into a single loop (O(n)).

## Types
1. **Fixed Size**: Window size \`k\` is constant.
2. **Variable Size**: Window grows/shrinks based on conditions.

## Global Template (Variable Size)
\`\`\`cpp
int left = 0, right = 0;
int ans = 0; // or INT_MAX/MIN

while (right < n) {
    // 1. Add current element to window
    add(arr[right]);
    
    // 2. Shrink window if condition is violated
    while (invalid()) {
        remove(arr[left]);
        left++;
    }
    
    // 3. Update answer
    ans = max(ans, right - left + 1);
    
    // 4. Move right
    right++;
}
\`\`\`

## Example: Max Sum Subarray of Size K
Instead of recalculating sum for every subarray, we:
1. Add the next element.
2. Remove the previous element (sliding the window).

## Related Problems
- [Longest Substring Without Repeating Characters](/problems/${lengthOfLongestSubstringId})
- [Minimum Size Subarray Sum](/problems/${minSubArrayLenId})
        `, lengthOfLongestSubstringId, 2);

        // Kadane's (moved here)
        await insertTopic(client, moduleMap['4. Common Array Techniques'], 'Kadane\'s Algorithm', `
# Maximum Subarray Sum (Kadane's Algorithm)

Find the contiguous subarray with the largest sum.

## Intuition
Don't carry negative baggage. If your current sum becomes negative, reset it to 0 because it will only pull down the sum of future elements.

## Algorithm
1. \`currSum = 0\`, \`maxSum = INT_MIN\`
2. Loop through array:
   - \`currSum += arr[i]\`
   - \`maxSum = max(maxSum, currSum)\`
   - \`if (currSum < 0) currSum = 0\`

## Complexity
- Time: **O(n)**
- Space: **O(1)**

## Related Problems
- [Maximum Subarray](/problems/${maxSubId})
        `, maxSubId, 3);


        // --- Module 8: Linked Lists ---
        const reverseListId = await getProbId('Reverse Linked List');
        const cycleId = await getProbId('Linked List Cycle');

        await insertTopic(client, moduleMap['8. Linked Lists'], 'What is a Linked List?', `
# What is a Linked List?

A Linked List is a linear data structure where elements are stored in **nodes**. Unlike arrays, nodes are **not contiguous** in memory. Each node contains:
1. **Data**: The value.
2. **Next**: A pointer to the next node.

## Structure
\`\`\`cpp
struct Node {
    int data;
    Node* next;
    
    Node(int val) {
        data = val;
        next = NULL;
    }
};
\`\`\`

## Array vs Linked List
| Feature | Array | Linked List |
|---------|-------|-------------|
| Size | Fixed | Dynamic |
| Access | O(1) | O(n) |
| Insertion | O(n) | O(1) (at start) |
| Memory | Contiguous | Scattered |
        `, null, 1);

        await insertTopic(client, moduleMap['8. Linked Lists'], 'Reversing a Linked List', `
# Reversing a Linked List

## Iterative Approach
We need 3 pointers: \`prev\`, \`curr\`, and \`next\`.

1. Initialize \`prev = NULL\`, \`curr = head\`.
2. Loop while \`curr != NULL\`:
   - Save next node: \`next = curr->next\`
   - Reverse link: \`curr->next = prev\`
   - Move forward: \`prev = curr\`, \`curr = next\`
3. Return \`prev\` (new head).

## Code
\`\`\`cpp
Node* reverseList(Node* head) {
    Node *prev = NULL, *curr = head;
    while(curr) {
        Node* next = curr->next;
        curr->next = prev;
        prev = curr;
        curr = next;
    }
    return prev;
}
\`\`\`

## Related Problems
- [Reverse Linked List](/problems/${reverseListId})
        `, reverseListId, 2);

        // --- Module 13: DP ---
        const climbStairsId = await getProbId('Climbing Stairs');

        await insertTopic(client, moduleMap['13. Dynamic Programming'], 'Introduction to DP', `
# Dynamic Programming (DP)

DP is basically **Recursion + Caching**. It is used to solve optimization problems where the problem can be broken down into overlapping subproblems.

## Core Concepts
1. **Optimal Substructure**: Solution to a big problem can be built from solutions to small problems.
2. **Overlapping Subproblems**: The same small problems are solved multiple times.

## Approaches
1. **Memoization (Top-Down)**: Recursive. Store result of function calls.
2. **Tabulation (Bottom-Up)**: Iterative. Fill a table from base cases up to the answer.
         `, null, 1);

        await insertTopic(client, moduleMap['13. Dynamic Programming'], 'Problem: Climbing Stairs', `
# Problem: Climbing Stairs

You are climbing a staircase. It takes n steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?

## Recurrence Relation
To reach step \`i\`, you could have come from:
- Step \`i-1\` (took 1 step)
- Step \`i-2\` (took 2 steps)

So, \`ways(i) = ways(i-1) + ways(i-2)\`.
Base cases: \`ways(1) = 1\`, \`ways(2) = 2\`.

This is exactly the **Fibonacci Sequence**!

## Code (Space Optimized)
\`\`\`cpp
int climbStairs(int n) {
    if (n <= 2) return n;
    int a = 1, b = 2;
    for (int i = 3; i <= n; i++) {
        int c = a + b;
        a = b;
        b = c;
    }
    return b;
}
\`\`\`

## Related Problems
- [Climbing Stairs](/problems/${climbStairsId})
         `, climbStairsId, 2);


        console.log('\n✨ Comprehensive DSA Curriculum Populated!');

    } catch (err) {
        console.error('Error:', err);
    } finally {
        client.release();
        await pool.end();
    }
}

async function insertTopic(client, moduleId, title, content, problemId, order) {
    await client.query(
        "INSERT INTO dsa_topics (module_id, title, content, problem_id, order_index) VALUES ($1, $2, $3, $4, $5)",
        [moduleId, title, content, problemId, order]
    );
}

populateDSA();
