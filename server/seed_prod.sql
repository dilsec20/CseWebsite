-- Production Seed File
BEGIN;

INSERT INTO users (user_id, username, email, password, full_name, role, created_at) VALUES ('736c54e2-cdf4-4d9b-a802-82b6cce2e125', 'rohitkumar', NULL, NULL, NULL, NULL, '"2025-11-20T17:51:35.800Z"') ON CONFLICT (user_id) DO NOTHING;
INSERT INTO users (user_id, username, email, password, full_name, role, created_at) VALUES ('cd769881-83fe-4557-837c-e43f83a20390', 'testuser', NULL, NULL, NULL, NULL, '"2025-11-20T14:29:44.230Z"') ON CONFLICT (user_id) DO NOTHING;
INSERT INTO users (user_id, username, email, password, full_name, role, created_at) VALUES ('5c16f4db-32c4-4dd5-9df1-c193a76638d8', 'dilipkumar', NULL, NULL, NULL, NULL, '"2025-11-20T12:38:12.910Z"') ON CONFLICT (user_id) DO NOTHING;
INSERT INTO users (user_id, username, email, password, full_name, role, created_at) VALUES ('e5bae32d-4b1f-41fd-8d79-4d37efd326ec', 'testuser1', NULL, NULL, NULL, NULL, '"2025-11-20T20:07:04.198Z"') ON CONFLICT (user_id) DO NOTHING;
INSERT INTO users (user_id, username, email, password, full_name, role, created_at) VALUES ('fd612e50-f06a-4337-95ca-2d7c5e1e97df', 'testuser2', NULL, NULL, NULL, NULL, '"2025-11-20T20:09:08.726Z"') ON CONFLICT (user_id) DO NOTHING;
INSERT INTO users (user_id, username, email, password, full_name, role, created_at) VALUES ('124fcc41-0385-4fcb-85e3-6ed2d3bd780c', 'testuser3', NULL, NULL, NULL, NULL, '"2025-11-20T20:11:10.206Z"') ON CONFLICT (user_id) DO NOTHING;
INSERT INTO users (user_id, username, email, password, full_name, role, created_at) VALUES ('20734b97-b329-43ff-ac29-47ed829f63f2', 'testuser4', NULL, NULL, NULL, NULL, '"2025-11-20T20:16:49.246Z"') ON CONFLICT (user_id) DO NOTHING;
INSERT INTO users (user_id, username, email, password, full_name, role, created_at) VALUES ('9e356db7-c22e-4fb5-86f8-8aff44d875b6', 'testuser5', NULL, NULL, NULL, NULL, '"2025-11-20T20:17:55.020Z"') ON CONFLICT (user_id) DO NOTHING;
INSERT INTO users (user_id, username, email, password, full_name, role, created_at) VALUES ('9a5dbda3-3e6a-4b5f-8a0a-37fc72d3e3ce', 'testuser6', NULL, NULL, NULL, NULL, '"2025-11-20T20:19:38.734Z"') ON CONFLICT (user_id) DO NOTHING;
INSERT INTO users (user_id, username, email, password, full_name, role, created_at) VALUES ('35c89d4e-3d4f-4b74-b3d0-3c28c15f662a', 'nehakumar', NULL, NULL, NULL, NULL, '"2025-11-20T17:45:47.322Z"') ON CONFLICT (user_id) DO NOTHING;
INSERT INTO dsa_modules (module_id, title, description, order_index, created_at) VALUES (1, 'Introduction & C++ Basics', 'Start your journey here! Learn the fundamentals of programming with C++, including variables, loops, functions, and basic logic building. Perfect for absolute beginners.', 1, NULL) ON CONFLICT (module_id) DO NOTHING;
INSERT INTO dsa_modules (module_id, title, description, order_index, created_at) VALUES (2, 'Time & Space Complexity', 'Understand how to measure code efficiency. Learn Big O notation to distinguish between good and bad algorithms—a critical skill for coding interviews.', 2, NULL) ON CONFLICT (module_id) DO NOTHING;
INSERT INTO dsa_modules (module_id, title, description, order_index, created_at) VALUES (3, 'Arrays & Vectors', 'Master the most fundamental data structure. Learn how to store, access, and manipulate collections of data efficiently using arrays and dynamic vectors.', 3, NULL) ON CONFLICT (module_id) DO NOTHING;
INSERT INTO dsa_modules (module_id, title, description, order_index, created_at) VALUES (4, 'Common Array Techniques', 'Level up your problem-solving! Learn essential patterns like Two Pointers and Sliding Window that are frequently asked in technical interviews.', 4, NULL) ON CONFLICT (module_id) DO NOTHING;
INSERT INTO dsa_modules (module_id, title, description, order_index, created_at) VALUES (5, 'Strings', 'Dive into text processing. Learn how to manipulate strings, check for palindromes, and solve common pattern matching problems used in real-world apps.', 5, NULL) ON CONFLICT (module_id) DO NOTHING;
INSERT INTO dsa_modules (module_id, title, description, order_index, created_at) VALUES (6, 'Searching & Sorting', 'Learn how to find and organize data. Master Binary Search for lightning-fast lookups and understand sorting algorithms like Merge Sort and Quick Sort.', 6, NULL) ON CONFLICT (module_id) DO NOTHING;
INSERT INTO dsa_modules (module_id, title, description, order_index, created_at) VALUES (7, 'Recursion & Backtracking', 'Unlock the power of self-referential functions. Learn to solve complex problems like mazes and puzzles by breaking them down into smaller steps.', 7, NULL) ON CONFLICT (module_id) DO NOTHING;
INSERT INTO dsa_modules (module_id, title, description, order_index, created_at) VALUES (8, 'Linked Lists', 'Understand dynamic data structures. Learn how to build chains of data nodes, a foundational concept for more complex structures like trees and graphs.', 8, NULL) ON CONFLICT (module_id) DO NOTHING;
INSERT INTO dsa_modules (module_id, title, description, order_index, created_at) VALUES (9, 'Stacks & Queues', 'Master LIFO and FIFO data structures. Learn how to manage data flow, implement undo features, and process tasks in order.', 9, NULL) ON CONFLICT (module_id) DO NOTHING;
INSERT INTO dsa_modules (module_id, title, description, order_index, created_at) VALUES (10, 'Binary Trees & BST', 'Enter the world of hierarchical data. Learn how to organize data in tree structures for efficient searching, insertion, and deletion.', 10, NULL) ON CONFLICT (module_id) DO NOTHING;
INSERT INTO dsa_modules (module_id, title, description, order_index, created_at) VALUES (11, 'Heaps & Priority Queues', 'Learn to manage priorities. Master Heaps to efficiently find the largest or smallest elements, crucial for scheduling and graph algorithms.', 11, NULL) ON CONFLICT (module_id) DO NOTHING;
INSERT INTO dsa_modules (module_id, title, description, order_index, created_at) VALUES (12, 'Graphs', 'Model real-world connections. Learn to represent networks like social media or maps, and traverse them using BFS and DFS algorithms.', 12, NULL) ON CONFLICT (module_id) DO NOTHING;
INSERT INTO dsa_modules (module_id, title, description, order_index, created_at) VALUES (13, 'Dynamic Programming', 'Solve the hardest problems! Learn to optimize complex recursive solutions by storing results—the key to cracking top-tier interview questions.', 13, NULL) ON CONFLICT (module_id) DO NOTHING;
INSERT INTO dsa_modules (module_id, title, description, order_index, created_at) VALUES (14, 'Bit Manipulation', 'Get closer to the hardware. Learn to manipulate individual bits for high-performance optimization and solving unique mathematical problems.', 14, NULL) ON CONFLICT (module_id) DO NOTHING;
INSERT INTO dsa_modules (module_id, title, description, order_index, created_at) VALUES (15, 'Number Theory & Math', 'Sharpen your mathematical edge. Learn prime sieves, modular arithmetic, and other math concepts frequently tested in competitive programming.', 15, NULL) ON CONFLICT (module_id) DO NOTHING;
INSERT INTO dsa_topics (topic_id, module_id, title, content, order_index, created_at) VALUES (6, 3, 'Introduction to Arrays', '
# Arrays in C++

An array stores multiple values of the **same type** in **contiguous memory**.

## Why Arrays?
Instead of:
```cpp
int mark1 = 85, mark2 = 90, mark3 = 78; // Tedious!
```
Use:
```cpp
int marks[3] = {85, 90, 78}; // Clean!
```

## Declaration & Initialization
```cpp
int arr[5];                    // Garbage values
int nums[5] = {1, 2, 3, 4, 5}; // Initialize
int zeros[100] = {0};          // All zeros
```

## Accessing Elements (0-indexed)
```cpp
cout << nums[0];  // First element: 1
cout << nums[4];  // Last element: 5
// nums[5] = ERROR! Out of bounds
```

## Memory Layout
If `arr[0]` is at address 1000:
- `arr[1]` at 1004 (1000 + 4 bytes)
- `arr[2]` at 1008
This allows **O(1) access** via pointer arithmetic!

## Common Operations
```cpp
// Input
int n;
cin >> n;
int arr[n];
for (int i = 0; i < n; i++) {
    cin >> arr[i];
}

// Output
for (int i = 0; i < n; i++) {
    cout << arr[i] << " ";
}
```
        

## Tips & Tricks
- Practice this concept with multiple problems
- Understand the why, not just the how
- Draw diagrams to visualize the concept
- Start with simple examples before complex ones', 1, NULL) ON CONFLICT (topic_id) DO NOTHING;
INSERT INTO dsa_topics (topic_id, module_id, title, content, order_index, created_at) VALUES (25, 12, 'Graph Representation', '
# Graphs

A graph is a collection of nodes (vertices) connected by edges.

## Types
- **Directed**: Edges have direction (A → B)
- **Undirected**: Edges are bidirectional (A ↔ B)
- **Weighted**: Edges have weights/costs
- **Unweighted**: All edges equal

## Adjacency List (Recommended)
```cpp
vector<vector<int>> adj(n);  // n vertices

// Add edge A-B (undirected)
adj[A].push_back(B);
adj[B].push_back(A);

// For directed: only add adj[A].push_back(B)
```

## Adjacency Matrix
```cpp
vector<vector<int>> adj(n, vector<int>(n, 0));
adj[A][B] = 1;  // Edge from A to B
```

| Representation | Space | Check Edge |
|----------------|-------|------------|
| Adjacency List | O(V + E) | O(degree) |
| Adjacency Matrix | O(V²) | O(1) |

## When to Use?
- **List**: Sparse graphs (few edges)
- **Matrix**: Dense graphs, need quick edge lookup
        

## Tips & Tricks
- Practice this concept with multiple problems
- Understand the why, not just the how
- Draw diagrams to visualize the concept
- Start with simple examples before complex ones', 1, NULL) ON CONFLICT (topic_id) DO NOTHING;
INSERT INTO dsa_topics (topic_id, module_id, title, content, order_index, created_at) VALUES (8, 4, 'Two Pointers Technique', '
# Two Pointers Technique

Use two variables (left, right) to traverse an array efficiently.

## When to Use?
✅ Array is sorted  
✅ Finding pairs/triplets  
✅ Removing duplicates  
✅ Reversing

## Global Template
```cpp
int left = 0, right = n - 1;

while (left < right) {
    if (condition_met) {
        // Process and return/save
    } else if (need_larger_value) {
        left++;
    } else {
        right--;
    }
}
```

## Example: Pair Sum in Sorted Array
```cpp
bool twoSum(vector<int>& arr, int target) {
    int left = 0, right = arr.size() - 1;
    
    while (left < right) {
        int sum = arr[left] + arr[right];
        if (sum == target) return true;
        else if (sum < target) left++;
        else right--;
    }
    return false;
}
```

## Related Problems
- [Two Sum](/problems/1241)
- [Container With Most Water](/problems/1249)
- [3Sum](/problems/1246)
        

## Tips & Tricks
- Practice this concept with multiple problems
- Understand the why, not just the how
- Draw diagrams to visualize the concept
- Start with simple examples before complex ones', 1, NULL) ON CONFLICT (topic_id) DO NOTHING;
INSERT INTO dsa_topics (topic_id, module_id, title, content, order_index, created_at) VALUES (22, 10, 'Tree Fundamentals', '
# Binary Trees

A tree is a hierarchical data structure with nodes connected by edges.

## Binary Tree Node
```cpp
struct TreeNode {
    int val;
    TreeNode* left;
    TreeNode* right;
    
    TreeNode(int x) : val(x), left(NULL), right(NULL) {}
};
```

## Terminology
- **Root**: Top node
- **Leaf**: Node with no children
- **Height**: Longest path from root to leaf
- **Depth**: Distance from root to node
- **Binary Tree**: Each node has ≤ 2 children

## Tree Traversals
### 1. Inorder (Left, Root, Right)
```cpp
void inorder(TreeNode* root) {
    if (root == NULL) return;
    inorder(root->left);
    cout << root->val << " ";
    inorder(root->right);
}
```

### 2. Preorder (Root, Left, Right)
```cpp
void preorder(TreeNode* root) {
    if (root == NULL) return;
    cout << root->val << " ";
    preorder(root->left);
    preorder(root->right);
}
```

### 3. Postorder (Left, Right, Root)
```cpp
void postorder(TreeNode* root) {
    if (root == NULL) return;
    postorder(root->left);
    postorder(root->right);
    cout << root->val << " ";
}
```

## Height of Tree
```cpp
int height(TreeNode* root) {
    if (root == NULL) return 0;
    return 1 + max(height(root->left), height(root->right));
}
```

## Related Problems
- [Maximum Depth of Binary Tree](/problems/1266)
        

## Tips & Tricks
- Practice this concept with multiple problems
- Understand the why, not just the how
- Draw diagrams to visualize the concept
- Start with simple examples before complex ones', 1, NULL) ON CONFLICT (topic_id) DO NOTHING;
INSERT INTO dsa_topics (topic_id, module_id, title, content, order_index, created_at) VALUES (18, 8, 'Introduction to Linked Lists', '
# Linked Lists

A linked list is a linear data structure where elements (nodes) are connected via pointers.

## Node Structure
```cpp
struct Node {
    int data;
    Node* next;
    
    Node(int val) : data(val), next(NULL) {}
};
```

## Creating a Linked List
```cpp
Node* head = new Node(10);
head->next = new Node(20);
head->next->next = new Node(30);
// List: 10 -> 20 -> 30 -> NULL
```

## Traversal
```cpp
void printList(Node* head) {
    while (head != NULL) {
        cout << head->data << " ";
        head = head->next;
    }
}
```

## Array vs Linked List
| Operation | Array | Linked List |
|-----------|-------|-------------|
| Access i-th element | O(1) | O(n) |
| Insert at beginning | O(n) | O(1) |
| Insert at end | O(1) | O(n) |
| Delete from beginning | O(n) | O(1) |
| Memory | Contiguous | Scattered |

## When to Use?
- Frequent insertions/deletions at beginning
- Size unknown beforehand
- No random access needed
        

## Tips & Tricks
- Practice this concept with multiple problems
- Understand the why, not just the how
- Draw diagrams to visualize the concept
- Start with simple examples before complex ones', 1, NULL) ON CONFLICT (topic_id) DO NOTHING;
INSERT INTO dsa_topics (topic_id, module_id, title, content, order_index, created_at) VALUES (14, 6, 'Binary Search Fundamentals', '
# Binary Search

Binary search finds an element in a **sorted array** in O(log n) time.

## How It Works
Repeatedly divide the search space in half.
1. Find middle element
2. If target == middle, found!
3. If target < middle, search left half
4. If target > middle, search right half

## Template
```cpp
int binarySearch(vector<int>& arr, int target) {
    int left = 0, right = arr.size() - 1;
    
    while (left <= right) {
        int mid = left + (right - left) / 2;  // Avoids overflow
        
        if (arr[mid] == target) {
            return mid;
        } else if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    return -1;  // Not found
}
```

## Why `left + (right - left) / 2`?
- `(left + right) / 2` can overflow if left+right > INT_MAX
- `left + (right - left) / 2` is safe

## Lower Bound & Upper Bound
```cpp
// Lower Bound: First element >= target
int lowerBound(vector<int>& arr, int target) {
    int left = 0, right = arr.size();
    while (left < right) {
        int mid = left + (right - left) / 2;
        if (arr[mid] < target) left = mid + 1;
        else right = mid;
    }
    return left;
}
```

## Related Problems
- [Binary Search](/problems/1257)
        

## Tips & Tricks
- Practice this concept with multiple problems
- Understand the why, not just the how
- Draw diagrams to visualize the concept
- Start with simple examples before complex ones', 1, NULL) ON CONFLICT (topic_id) DO NOTHING;
INSERT INTO dsa_topics (topic_id, module_id, title, content, order_index, created_at) VALUES (11, 5, 'Introduction to Strings', '
# Strings in C++

A string is a sequence of characters. In C++, we have:
1. **C-style strings**: `char arr[]`
2. **C++ strings**: `string` (from STL)

## C++ String Basics
```cpp
#include <string>

string s = "Hello";
cout << s.length();    // 5
cout << s[0];          // ''H''
s += " World";         // Concatenation
```

## Essential Functions
```cpp
string s = "Programming";

s.size() / s.length()      // Length: 11
s.empty()                  // Is empty? false
s.clear()                  // Empty the string
s.substr(0, 4)             // "Prog" (start, length)
s.find("gram")             // Index: 3 (or string::npos if not found)
s.push_back(''!'')           // Add char to end
s.pop_back()               // Remove last char
```

## Character Functions (from <cctype>)
```cpp
#include <cctype>

isalpha(''a'')     // Is alphabetic?
isdigit(''5'')     // Is digit?
isupper(''A'')     // Is uppercase?
islower(''b'')     // Is lowercase?
toupper(''a'')     // Returns ''A''
tolower(''B'')     // Returns ''b''
```

## Input
```cpp
string s;
cin >> s;              // Reads until space
getline(cin, s);       // Reads entire line
```

## Iteration
```cpp
for (int i = 0; i < s.size(); i++) {
    cout << s[i];
}
// Or
for (char c : s) {
    cout << c;
}
```

## Common Mistakes
- Comparing with ==: `if (s == "hello")` ✅
- Using `s.length()` as unsigned int in loops with subtraction
        ', 1, NULL) ON CONFLICT (topic_id) DO NOTHING;
INSERT INTO dsa_topics (topic_id, module_id, title, content, order_index, created_at) VALUES (1, 1, 'Introduction to Programming', '
# Introduction to Programming

Programming is the art of telling a computer exactly what to do, step by step. Think of it like writing a recipe, but for a computer.

## Why C++ for Competitive Programming?
- **Speed**: C++ is one of the fastest languages, crucial for time-limited contests
- **STL (Standard Template Library)**: Pre-built data structures (vector, map, set)
- **Control**: Direct memory management capabilities

## Your First Program
```cpp
#include <iostream>
using namespace std;

int main() {
    cout << "Hello, World!" << endl;
    return 0;
}
```

**Line-by-line explanation:**
- `#include <iostream>`: Import Input/Output library
- `using namespace std;`: Avoid writing std::cout every time
- `int main()`: Entry point of program
- `cout << "text"`: Print to console
- `return 0;`: Exit successfully
        

## Tips & Tricks
- Start with simple programs and gradually increase complexity
- Always add comments to explain your logic
- Practice debugging step-by-step using print statements
- Learn keyboard shortcuts for your IDE', 1, NULL) ON CONFLICT (topic_id) DO NOTHING;
INSERT INTO dsa_topics (topic_id, module_id, title, content, order_index, created_at) VALUES (4, 2, 'Big O Notation Fundamentals', '
# Big O Notation

Big O describes **how runtime grows** as input size increases. It ignores constants and focuses on growth rate.

## Common Complexities (Fastest to Slowest)
1. **O(1)** - Constant: Array access `arr[5]`
2. **O(log n)** - Logarithmic: Binary search
3. **O(n)** - Linear: Single loop through array
4. **O(n log n)** - Linearithmic: Merge sort, heap sort
5. **O(n²)** - Quadratic: Nested loops
6. **O(2^n)** - Exponential: Recursive Fibonacci (naive)

## Visualizing Growth
For n = 1000:
- O(1) = 1 operation
- O(log n) ≈ 10 operations
- O(n) = 1,000 operations
- O(n²) = 1,000,000 operations
- O(2^n) = Unimaginably large!

## Constraint → Complexity Mapping
| Constraint | Max Complexity | Algorithm |
|------------|----------------|-----------|
| n ≤ 10 | O(n!) | Permutations |
| n ≤ 20 | O(2^n) | Backtracking |
| n ≤ 500 | O(n³) | 3 nested loops |
| n ≤ 5000 | O(n²) | 2 nested loops |
| n ≤ 10^6 | O(n log n) | Sorting |
| n ≤ 10^8 | O(n) | Single pass |

## How to Calculate
```cpp
for (int i = 0; i < n; i++) {        // O(n)
    for (int j = 0; j < n; j++) {    // O(n)
        cout << i + j;                // O(1)
    }
}
// Total: O(n) * O(n) * O(1) = O(n²)
```
        

## Tips & Tricks
- Drop constants: O(2n) → O(n)
- Drop lower terms: O(n² + n) → O(n²)
- Nested loops often indicate O(n²) or worse
- Binary search/divide patterns usually O(log n)', 1, NULL) ON CONFLICT (topic_id) DO NOTHING;
INSERT INTO dsa_topics (topic_id, module_id, title, content, order_index, created_at) VALUES (27, 13, 'Introduction to DP', '
# Dynamic Programming

DP = **Recursion + Memoization** (caching results).

## When to Use DP?
1. **Optimal Substructure**: Solution built from subproblem solutions
2. **Overlapping Subproblems**: Same subproblems solved multiple times

## Approaches
### 1. Memoization (Top-Down)
Recursive + cache results.
```cpp
int fib(int n, vector<int>& dp) {
    if (n <= 1) return n;
    if (dp[n] != -1) return dp[n];  // Already computed
    
    dp[n] = fib(n-1, dp) + fib(n-2, dp);
    return dp[n];
}
// Call: vector<int> dp(n+1, -1); fib(n, dp);
```

### 2. Tabulation (Bottom-Up)
Iterative, fill table.
```cpp
int fib(int n) {
    if (n <= 1) return n;
    vector<int> dp(n + 1);
    dp[0] = 0;
    dp[1] = 1;
    
    for (int i = 2; i <= n; i++) {
        dp[i] = dp[i-1] + dp[i-2];
    }
    return dp[n];
}
```

## Steps to Solve DP
1. Define state/dp array
2. Find recurrence relation
3. Determine base cases
4. Decide iteration order (for tabulation)
5. Optimize space if possible
        

## Tips & Tricks
- Practice this concept with multiple problems
- Understand the why, not just the how
- Draw diagrams to visualize the concept
- Start with simple examples before complex ones', 1, NULL) ON CONFLICT (topic_id) DO NOTHING;
INSERT INTO dsa_topics (topic_id, module_id, title, content, order_index, created_at) VALUES (24, 11, 'Heap Fundamentals', '
# Heaps & Priority Queues

A heap is a complete binary tree where:
- **Max Heap**: Parent ≥ children
- **Min Heap**: Parent ≤ children

## STL Priority Queue (Max Heap by default)
```cpp
#include <queue>

priority_queue<int> maxHeap;
maxHeap.push(10);
maxHeap.push(30);
maxHeap.push(20);

cout << maxHeap.top();  // 30 (max)
maxHeap.pop();          // Remove 30
```

## Min Heap
```cpp
priority_queue<int, vector<int>, greater<int>> minHeap;
minHeap.push(10);
minHeap.push(30);
minHeap.push(20);

cout << minHeap.top();  // 10 (min)
```

## Time Complexity
- Insert: O(log n)
- Get min/max: O(1)
- Remove min/max: O(log n)

## Common Use Cases
- Find K largest/smallest elements
- Merge K sorted arrays
- Median in stream
- Task scheduling (priority)

## Example: Kth Largest Element
```cpp
int findKthLargest(vector<int>& nums, int k) {
    priority_queue<int, vector<int>, greater<int>> minHeap;
    
    for (int num : nums) {
        minHeap.push(num);
        if (minHeap.size() > k) {
            minHeap.pop();
        }
    }
    return minHeap.top();
}
```

## Related Problems
- [Kth Largest Element](/problems/1351)
        

## Tips & Tricks
- Practice this concept with multiple problems
- Understand the why, not just the how
- Draw diagrams to visualize the concept
- Start with simple examples before complex ones', 1, NULL) ON CONFLICT (topic_id) DO NOTHING;
INSERT INTO dsa_topics (topic_id, module_id, title, content, order_index, created_at) VALUES (16, 7, 'Understanding Recursion', '
# Recursion Fundamentals

Recursion is when a function calls itself to solve smaller instances of the same problem.

## Anatomy of Recursion
1. **Base Case**: When to stop
2. **Recursive Case**: Break problem into smaller pieces
3. **Return**: Combine results

## Example: Factorial
```cpp
int factorial(int n) {
    // Base case
    if (n <= 1) return 1;
    
    // Recursive case
    return n * factorial(n - 1);
}
```

**How it works**: 
- `factorial(4)` = 4 × `factorial(3)`
- `factorial(3)` = 3 × `factorial(2)`
- `factorial(2)` = 2 × `factorial(1)`
- `factorial(1)` = 1 (base case)
- Unwind: 2×1 = 2, 3×2 = 6, 4×6 = 24

## Fibonacci
```cpp
int fib(int n) {
    if (n <= 1) return n;
    return fib(n - 1) + fib(n - 2);
}
```

## Tips
- Always define base case FIRST
- Ensure recursion moves toward base case
- Visualize call stack
- Space complexity = recursion depth

## Common Mistakes
- Forgetting base case → Stack overflow!
- Infinite recursion
        ', 1, NULL) ON CONFLICT (topic_id) DO NOTHING;
INSERT INTO dsa_topics (topic_id, module_id, title, content, order_index, created_at) VALUES (36, 15, 'GCD & LCM', '
# GCD & LCM (Greatest Common Divisor & Least Common Multiple)

## GCD (Greatest Common Divisor)
The largest number that divides both a and b.

### Euclidean Algorithm
```cpp
int gcd(int a, int b) {
    if (b == 0) return a;
    return gcd(b, a % b);
}

// Iterative version
int gcd(int a, int b) {
    while (b) {
        int temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}

// C++17 built-in
#include <numeric>
int g = __gcd(a, b);  // Or gcd(a, b) in C++17
```

**Time Complexity**: O(log(min(a, b)))

### Example
```cpp
gcd(48, 18)
= gcd(18, 12)  // 48 % 18 = 12
= gcd(12, 6)   // 18 % 12 = 6
= gcd(6, 0)    // 12 % 6 = 0
= 6
```

## LCM (Least Common Multiple)
The smallest number divisible by both a and b.

### Formula
```
LCM(a, b) = (a × b) / GCD(a, b)
```

### Implementation
```cpp
long long lcm(int a, int b) {
    return (long long)a * b / gcd(a, b);
}
// Note: Multiply first, then divide to avoid overflow
```

## Extended Euclidean Algorithm
Finds x and y such that: `ax + by = gcd(a, b)`

```cpp
int extendedGCD(int a, int b, int& x, int& y) {
    if (b == 0) {
        x = 1;
        y = 0;
        return a;
    }
    int x1, y1;
    int g = extendedGCD(b, a % b, x1, y1);
    x = y1;
    y = x1 - (a / b) * y1;
    return g;
}
```

## Tips & Tricks
- GCD is commutative: `gcd(a, b) = gcd(b, a)`
- `gcd(a, 0) = a`
- For multiple numbers: `gcd(a, b, c) = gcd(gcd(a, b), c)`
- Always use `long long` for LCM to avoid overflow
- GCD of array: iterate and compute pairwise

## Common Applications
- Simplifying fractions: `a/b → (a/gcd)/(b/gcd)`
- Finding coprime numbers: `gcd(a, b) = 1`
- Modular inverse calculation
            ', 1, NULL) ON CONFLICT (topic_id) DO NOTHING;
INSERT INTO dsa_topics (topic_id, module_id, title, content, order_index, created_at) VALUES (33, 14, 'Bit Manipulation Fundamentals', '
# Bit Manipulation Fundamentals

Bit manipulation involves directly operating on bits (0s and 1s) - the most fundamental representation of data.

## Binary Number System
Decimal to Binary:
- 5 = 101₂ (4 + 0 + 1)
- 13 = 1101₂ (8 + 4 + 0 + 1)

## Bitwise Operators

### 1. AND (&)
Returns 1 only if both bits are 1.
```cpp
5 & 3
  101  (5)
& 011  (3)
-----
  001  (1)
```

### 2. OR (|)
Returns 1 if at least one bit is 1.
```cpp
5 | 3
  101  (5)
| 011  (3)
-----
  111  (7)
```

### 3. XOR (^)
Returns 1 if bits are different.
```cpp
5 ^ 3
  101  (5)
^ 011  (3)
-----
  110  (6)
```

**XOR Properties (Very Important!)**
- `a ^ a = 0` (Same numbers cancel out)
- `a ^ 0 = a` (XOR with 0 = unchanged)
- `a ^ b ^ a = b` (Commutative)

### 4. NOT (~)
Flips all bits (0→1, 1→0).
```cpp
~5 = -6  // In 32-bit: flips all 32 bits
```

### 5. Left Shift (<<)
Shifts bits left, fills with 0. **Multiplies by 2^n**.
```cpp
5 << 1   // 101 → 1010 = 10 (5 * 2)
5 << 2   // 101 → 10100 = 20 (5 * 4)
```

### 6. Right Shift (>>)
Shifts bits right. **Divides by 2^n**.
```cpp
20 >> 1  // 10100 → 1010 = 10 (20 / 2)
20 >> 2  // 10100 → 101 = 5 (20 / 4)
```

## Essential Bit Operations

### Check if i-th bit is set
```cpp
bool isSet(int num, int i) {
    return (num & (1 << i)) != 0;
}
// Example: isSet(5, 0) = true (101, bit 0 is 1)
```

### Set i-th bit
```cpp
int setBit(int num, int i) {
    return num | (1 << i);
}
// Example: setBit(5, 1) = 7 (101 → 111)
```

### Clear i-th bit
```cpp
int clearBit(int num, int i) {
    return num & ~(1 << i);
}
// Example: clearBit(5, 2) = 1 (101 → 001)
```

### Toggle i-th bit
```cpp
int toggleBit(int num, int i) {
    return num ^ (1 << i);
}
// Example: toggleBit(5, 1) = 7 (101 → 111)
```

### Count set bits (Popcount)
```cpp
int countSetBits(int n) {
    int count = 0;
    while (n) {
        count += n & 1;
        n >>= 1;
    }
    return count;
}
// Brian Kernighan''s Algorithm (Better!)
int countSetBits(int n) {
    int count = 0;
    while (n) {
        n = n & (n - 1);  // Removes rightmost set bit
        count++;
    }
    return count;
}
```

## Tips & Tricks
- XOR is self-inverse: `a ^ b ^ b = a`
- Use left shift for powers of 2: `1 << n = 2^n`
- Check even/odd: `n & 1` (1 = odd, 0 = even)
- Check power of 2: `n & (n-1) == 0` (and `n != 0`)
- Multiply/divide by 2: Use `<< 1` and `>> 1` (faster than * and /)

## Related Problems
- [Single Number](/problems/1245) - Classic XOR problem
            ', 1, NULL) ON CONFLICT (topic_id) DO NOTHING;
INSERT INTO dsa_topics (topic_id, module_id, title, content, order_index, created_at) VALUES (20, 9, 'Stack Fundamentals', '
# Stacks (LIFO - Last In First Out)

Think of a stack of plates: you add/remove from the top only.

## STL Stack
```cpp
#include <stack>

stack<int> st;
st.push(10);      // Add to top: [10]
st.push(20);      // [10, 20]
st.push(30);      // [10, 20, 30]

cout << st.top(); // Peek top: 30
st.pop();         // Remove top: [10, 20]
st.empty();       // Is empty? false
st.size();        // Size: 2
```

## Common Applications
1. **Function call stack**: Recursion
2. **Undo/Redo**: Text editors
3. **Balanced parentheses**: Compilers
4. **Expression evaluation**: Postfix/prefix

## Example: Valid Parentheses
```cpp
bool isValid(string s) {
    stack<char> st;
    for (char c : s) {
        if (c == ''('' || c == ''{'' || c == ''['') {
            st.push(c);
        } else {
            if (st.empty()) return false;
            char top = st.top();
            if ((c == '')'' && top == ''('') ||
                (c == ''}'' && top == ''{'') ||
                (c == '']'' && top == ''['')) {
                st.pop();
            } else {
                return false;
            }
        }
    }
    return st.empty();
}
```

## Related Problems
- [Valid Parentheses](/problems/1278)
        

## Tips & Tricks
- Practice this concept with multiple problems
- Understand the why, not just the how
- Draw diagrams to visualize the concept
- Start with simple examples before complex ones', 1, NULL) ON CONFLICT (topic_id) DO NOTHING;
INSERT INTO dsa_topics (topic_id, module_id, title, content, order_index, created_at) VALUES (34, 14, 'Bit Masking Techniques', '
# Bit Masking

Bit masking uses integers to represent sets of elements. Each bit position represents whether an element is present (1) or absent (0).

## Why Bit Masking?
- **Space Efficient**: Store 32 boolean values in one integer
- **Fast Operations**: Set operations (union, intersection) in O(1)
- **Dynamic Programming**: Represent states compactly

## Basic Bit Mask Operations

### Representing a Set
```cpp
// Set of {0, 2, 4} represented as 10101₂ = 21
int mask = (1 << 0) | (1 << 2) | (1 << 4);  // 21
```

### Check if element i is in set
```cpp
bool contains(int mask, int i) {
    return (mask & (1 << i)) != 0;
}
```

### Add element i to set
```cpp
int add(int mask, int i) {
    return mask | (1 << i);
}
```

### Remove element i from set
```cpp
int remove(int mask, int i) {
    return mask & ~(1 << i);
}
```

### Toggle element i
```cpp
int toggle(int mask, int i) {
    return mask ^ (1 << i);
}
```

## Set Operations Using Masks

### Union (Set A OR Set B)
```cpp
int unionSet(int maskA, int maskB) {
    return maskA | maskB;
}
```

### Intersection (Set A AND Set B)
```cpp
int intersection(int maskA, int maskB) {
    return maskA & maskB;
}
```

### Difference (Set A - Set B)
```cpp
int difference(int maskA, int maskB) {
    return maskA & ~maskB;
}
```

## Iterating Through All Subsets
```cpp
int n = 3;  // Elements {0, 1, 2}
for (int mask = 0; mask < (1 << n); mask++) {
    // mask represents a subset
    cout << "Subset: ";
    for (int i = 0; i < n; i++) {
        if (mask & (1 << i)) {
            cout << i << " ";
        }
    }
    cout << endl;
}
// Prints all 2^3 = 8 subsets
```

## Iterating Through All Subsets of a Mask
```cpp
int fullMask = 13;  // 1101₂ = {0, 2, 3}
for (int submask = fullMask; submask; submask = (submask - 1) & fullMask) {
    // Iterate through all subsets of fullMask
    cout << submask << endl;
}
// Prints: 13, 12, 9, 8, 5, 4, 1
```

## DP with Bitmask Example: Traveling Salesman
```cpp
// dp[mask][i] = minimum cost to visit cities in ''mask'' and end at city i
int n = 4;  // 4 cities
vector<vector<int>> dp(1 << n, vector<int>(n, INT_MAX));

dp[1][0] = 0;  // Start at city 0

for (int mask = 0; mask < (1 << n); mask++) {
    for (int u = 0; u < n; u++) {
        if (!(mask & (1 << u))) continue;  // u not in mask
        
        for (int v = 0; v < n; v++) {
            if (mask & (1 << v)) continue;  // v already visited
            
            int newMask = mask | (1 << v);
            dp[newMask][v] = min(dp[newMask][v], dp[mask][u] + dist[u][v]);
        }
    }
}
```

## Advanced Tricks

### Get rightmost set bit
```cpp
int rightmost = n & -n;
// Example: n = 12 (1100₂) → rightmost = 4 (0100₂)
```

### Turn off rightmost set bit
```cpp
int turnOff = n & (n - 1);
// Example: n = 12 (1100₂) → turnOff = 8 (1000₂)
```

### Check if subset
```cpp
bool isSubset(int maskA, int maskB) {
    return (maskA & maskB) == maskA;
}
```

## Tips & Tricks
- Maximum mask size: 32 bits (int) or 64 bits (long long)
- For n elements: Total subsets = 2^n
- Use `__builtin_popcount(mask)` for counting set bits (GCC)
- Bitmask DP: O(2^n × n²) typically, use for n ≤ 20
- Always check bounds: `i < 32` before `1 << i`

## Common Applications
- Subset generation
- DP state compression (TSP, Assignment problems)
- Representing visited/unvisited states
- Fast set operations
            ', 2, NULL) ON CONFLICT (topic_id) DO NOTHING;
INSERT INTO dsa_topics (topic_id, module_id, title, content, order_index, created_at) VALUES (49, 11, 'Top K Elements Pattern', '
# Top K Elements

## Kth Largest Element
```cpp
int findKthLargest(vector<int>& nums, int k) {
    priority_queue<int, vector<int>, greater<int>> minHeap;
    
    for (int num : nums) {
        minHeap.push(num);
        if (minHeap.size() > k) minHeap.pop();
    }
    return minHeap.top();
}
```

## Top K Frequent Elements
```cpp
vector<int> topKFrequent(vector<int>& nums, int k) {
    unordered_map<int, int> freq;
    for (int num : nums) freq[num]++;
    
    auto cmp = [](pair<int,int> a, pair<int,int> b) { return a.second > b.second; };
    priority_queue<pair<int,int>, vector<pair<int,int>>, decltype(cmp)> pq(cmp);
    
    for (auto& p : freq) {
        pq.push(p);
        if (pq.size() > k) pq.pop();
    }
    
    vector<int> result;
    while (!pq.empty()) {
        result.push_back(pq.top().first);
        pq.pop();
    }
    return result;
}
```
', 2, NULL) ON CONFLICT (topic_id) DO NOTHING;
INSERT INTO dsa_topics (topic_id, module_id, title, content, order_index, created_at) VALUES (12, 5, 'String Manipulation Techniques', '
# String Manipulation Patterns

## 1. Reversing a String
```cpp
// Method 1: STL
reverse(s.begin(), s.end());

// Method 2: Two Pointers
int left = 0, right = s.size() - 1;
while (left < right) {
    swap(s[left], s[right]);
    left++;
    right--;
}
```

## 2. Checking Palindrome
```cpp
bool isPalindrome(string s) {
    int left = 0, right = s.size() - 1;
    while (left < right) {
        if (s[left] != s[right]) return false;
        left++;
        right--;
    }
    return true;
}
```

## 3. Frequency Counting
```cpp
// Method 1: Array (for lowercase only)
int freq[26] = {0};
for (char c : s) {
    freq[c - ''a'']++;
}

// Method 2: Map (any characters)
unordered_map<char, int> freq;
for (char c : s) {
    freq[c]++;
}
```

## 4. Removing Spaces
```cpp
string removeSpaces(string s) {
    string result = "";
    for (char c : s) {
        if (c != '' '') result += c;
    }
    return result;
}
```

## Tips & Tricks
- ASCII values: ''A'' = 65, ''a'' = 97, ''0'' = 48
- Convert char to int: `c - ''0''` (''5'' → 5)
- Convert lowercase ↔ uppercase: Toggle 5th bit or use `toupper()/tolower()`

## Related Problems
- [Valid Palindrome](/problems/1252)
        ', 2, NULL) ON CONFLICT (topic_id) DO NOTHING;
INSERT INTO dsa_topics (topic_id, module_id, title, content, order_index, created_at) VALUES (17, 7, 'Backtracking Framework', '
# Backtracking

Backtracking is "trying all possibilities" by making choices, exploring, and undoing if they don''t work.

## Global Template
```cpp
void backtrack(state, result) {
    // Base case
    if (isComplete(state)) {
        result.add(state);
        return;
    }
    
    // Make choices
    for (choice in possibleChoices) {
        // 1. Make choice
        makeChoice(state, choice);
        
        // 2. Recurse
        backtrack(state, result);
        
        // 3. Undo choice (backtrack)
        undoChoice(state, choice);
    }
}
```

## Example: Generate All Permutations
```cpp
void permute(vector<int>& nums, int start, vector<vector<int>>& result) {
    if (start == nums.size()) {
        result.push_back(nums);
        return;
    }
    
    for (int i = start; i < nums.size(); i++) {
        swap(nums[start], nums[i]);      // Make choice
        permute(nums, start + 1, result); // Recurse
        swap(nums[start], nums[i]);      // Undo choice
    }
}
```

## When to Use Backtracking?
- Generate all combinations/permutations
- Sudoku solver
- N-Queens
- Subset sum

## Related Problems
- [Permutations](/problems/1282)
        

## Tips & Tricks
- Practice this concept with multiple problems
- Understand the why, not just the how
- Draw diagrams to visualize the concept
- Start with simple examples before complex ones', 2, NULL) ON CONFLICT (topic_id) DO NOTHING;
INSERT INTO dsa_topics (topic_id, module_id, title, content, order_index, created_at) VALUES (19, 8, 'Reversing a Linked List', '
# Reversing a Linked List

## Iterative Approach - O(n) Time, O(1) Space
```cpp
Node* reverseList(Node* head) {
    Node* prev = NULL;
    Node* curr = head;
    
    while (curr != NULL) {
        Node* next = curr->next;  // Save next
        curr->next = prev;        // Reverse link
        prev = curr;              // Move prev
        curr = next;              // Move curr
    }
    return prev;  // New head
}
```

**Visualization**:
- Before: 1 → 2 → 3 → NULL
- After:  NULL ← 1 ← 2 ← 3

## Recursive Approach
```cpp
Node* reverseList(Node* head) {
    if (head == NULL || head->next == NULL) return head;
    
    Node* newHead = reverseList(head->next);
    head->next->next = head;
    head->next = NULL;
    return newHead;
}
```

## Related Problems
- [Reverse Linked List](/problems/1261)
- [Linked List Cycle](/problems/1263)
        

## Tips & Tricks
- Practice this concept with multiple problems
- Understand the why, not just the how
- Draw diagrams to visualize the concept
- Start with simple examples before complex ones', 2, NULL) ON CONFLICT (topic_id) DO NOTHING;
INSERT INTO dsa_topics (topic_id, module_id, title, content, order_index, created_at) VALUES (23, 10, 'Binary Search Trees', '
# Binary Search Trees (BST)

A BST is a binary tree where:
- Left subtree values < root value
- Right subtree values > root value
- Both subtrees are BSTs

## Search in BST - O(log n)
```cpp
TreeNode* search(TreeNode* root, int target) {
    if (root == NULL || root->val == target) {
        return root;
    }
    
    if (target < root->val) {
        return search(root->left, target);
    } else {
        return search(root->right, target);
    }
}
```

## Insert in BST
```cpp
TreeNode* insert(TreeNode* root, int val) {
    if (root == NULL) return new TreeNode(val);
    
    if (val < root->val) {
        root->left = insert(root->left, val);
    } else {
        root->right = insert(root->right, val);
    }
    return root;
}
```

## Important Property
**Inorder traversal of BST gives sorted order!**

## Validate BST
```cpp
bool isValidBST(TreeNode* root, long min, long max) {
    if (root == NULL) return true;
    if (root->val <= min || root->val >= max) return false;
    
    return isValidBST(root->left, min, root->val) &&
           isValidBST(root->right, root->val, max);
}
```
        

## Tips & Tricks
- Practice this concept with multiple problems
- Understand the why, not just the how
- Draw diagrams to visualize the concept
- Start with simple examples before complex ones', 2, NULL) ON CONFLICT (topic_id) DO NOTHING;
INSERT INTO dsa_topics (topic_id, module_id, title, content, order_index, created_at) VALUES (26, 12, 'BFS and DFS', '
# Graph Traversals

## BFS (Breadth-First Search)
Visit level by level using a queue.

```cpp
void bfs(int start, vector<vector<int>>& adj) {
    vector<bool> visited(adj.size(), false);
    queue<int> q;
    
    q.push(start);
    visited[start] = true;
    
    while (!q.empty()) {
        int node = q.front();
        q.pop();
        cout << node << " ";
        
        for (int neighbor : adj[node]) {
            if (!visited[neighbor]) {
                visited[neighbor] = true;
                q.push(neighbor);
            }
        }
    }
}
```

**When to use**: Shortest path (unweighted), level-order

## DFS (Depth-First Search)
Explore as deep as possible, then backtrack.

```cpp
void dfs(int node, vector<vector<int>>& adj, vector<bool>& visited) {
    visited[node] = true;
    cout << node << " ";
    
    for (int neighbor : adj[node]) {
        if (!visited[neighbor]) {
            dfs(neighbor, adj, visited);
        }
    }
}
```

**When to use**: Cycle detection, connected components, topological sort

## Related Problems
- [Number of Islands](/problems/1276)
        

## Tips & Tricks
- Practice this concept with multiple problems
- Understand the why, not just the how
- Draw diagrams to visualize the concept
- Start with simple examples before complex ones', 2, NULL) ON CONFLICT (topic_id) DO NOTHING;
INSERT INTO dsa_topics (topic_id, module_id, title, content, order_index, created_at) VALUES (2, 1, 'Variables & Data Types', '
# Variables & Data Types

A variable is like a labeled box that stores a value in memory.

## Data Types
| Type | Size | Range Example |
|------|------|---------------|
| `int` | 4 bytes | -2 billion to +2 billion |
| `long long` | 8 bytes | Very large numbers |
| `double` | 8 bytes | Decimals (3.14159) |
| `char` | 1 byte | Single character (''A'') |
| `bool` | 1 byte | true or false |

## Code Example
```cpp
int age = 25;
double price = 99.99;
char grade = ''A'';
bool isPassed = true;

// Input
int x;
cin >> x;
cout << "You entered: " << x;
```

## Common Mistakes
- Using `int` when answer exceeds 10^9 → Use `long long`
- Forgetting to initialize variables → Garbage values!
        ', 2, NULL) ON CONFLICT (topic_id) DO NOTHING;
INSERT INTO dsa_topics (topic_id, module_id, title, content, order_index, created_at) VALUES (9, 4, 'Sliding Window Technique', '
# Sliding Window

Maintain a "window" that slides through the array to optimize subarray problems.

## Types
1. **Fixed Size**: Window of constant size k
2. **Variable Size**: Window grows/shrinks based on condition

## Variable Window Template
```cpp
int left = 0, maxLen = 0;

for (int right = 0; right < n; right++) {
    // 1. Add right element to window
    add(arr[right]);
    
    // 2. Shrink window while invalid
    while (windowInvalid()) {
        remove(arr[left]);
        left++;
    }
    
    // 3. Update answer
    maxLen = max(maxLen, right - left + 1);
}
```

## Example: Max Sum Subarray of Size K
```cpp
int maxSum(vector<int>& arr, int k) {
    int sum = 0, maxSum = 0;
    
    // Initial window
    for (int i = 0; i < k; i++) {
        sum += arr[i];
    }
    maxSum = sum;
    
    // Slide window
    for (int i = k; i < arr.size(); i++) {
        sum += arr[i] - arr[i - k];  // Add right, remove left
        maxSum = max(maxSum, sum);
    }
    return maxSum;
}
```

## Related Problems
- [Longest Substring Without Repeating Characters](/problems/1254)
        

## Tips & Tricks
- Practice this concept with multiple problems
- Understand the why, not just the how
- Draw diagrams to visualize the concept
- Start with simple examples before complex ones', 2, NULL) ON CONFLICT (topic_id) DO NOTHING;
INSERT INTO dsa_topics (topic_id, module_id, title, content, order_index, created_at) VALUES (15, 6, 'Sorting Algorithms', '
# Sorting Algorithms

## 1. Bubble Sort - O(n²)
Repeatedly swap adjacent elements if they''re in wrong order.
```cpp
void bubbleSort(vector<int>& arr) {
    int n = arr.size();
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                swap(arr[j], arr[j + 1]);
            }
        }
    }
}
```

## 2. Selection Sort - O(n²)
Find minimum element and place it at beginning.
```cpp
void selectionSort(vector<int>& arr) {
    int n = arr.size();
    for (int i = 0; i < n - 1; i++) {
        int minIdx = i;
        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIdx]) {
                minIdx = j;
            }
        }
        swap(arr[i], arr[minIdx]);
    }
}
```

## 3. Merge Sort - O(n log n)
Divide array in halves, sort recursively, then merge.
```cpp
void merge(vector<int>& arr, int left, int mid, int right) {
    vector<int> temp;
    int i = left, j = mid + 1;
    
    while (i <= mid && j <= right) {
        if (arr[i] <= arr[j]) temp.push_back(arr[i++]);
        else temp.push_back(arr[j++]);
    }
    while (i <= mid) temp.push_back(arr[i++]);
    while (j <= right) temp.push_back(arr[j++]);
    
    for (int i = 0; i < temp.size(); i++) {
        arr[left + i] = temp[i];
    }
}

void mergeSort(vector<int>& arr, int left, int right) {
    if (left < right) {
        int mid = left + (right - left) / 2;
        mergeSort(arr, left, mid);
        mergeSort(arr, mid + 1, right);
        merge(arr, left, mid, right);
    }
}
```

## STL Sort (Use This!)
```cpp
#include <algorithm>
sort(arr.begin(), arr.end());              // Ascending
sort(arr.begin(), arr.end(), greater<int>()); // Descending
```
        

## Tips & Tricks
- Practice this concept with multiple problems
- Understand the why, not just the how
- Draw diagrams to visualize the concept
- Start with simple examples before complex ones', 2, NULL) ON CONFLICT (topic_id) DO NOTHING;
INSERT INTO dsa_topics (topic_id, module_id, title, content, order_index, created_at) VALUES (21, 9, 'Queue Fundamentals', '
# Queues (FIFO - First In First Out)

Think of a line at a ticket counter: first person in line gets served first.

## STL Queue
```cpp
#include <queue>

queue<int> q;
q.push(10);        // Add to back: [10]
q.push(20);        // [10, 20]
q.push(30);        // [10, 20, 30]

cout << q.front(); // Peek front: 10
cout << q.back();  // Peek back: 30
q.pop();           // Remove front: [20, 30]
q.size();          // Size: 2
q.empty();         // Is empty? false
```

## Applications
1. **BFS (Breadth-First Search)**
2. **Task scheduling**
3. **Print queue**
4. **Level-order traversal in trees**

## Deque (Double-Ended Queue)
Add/remove from both ends!
```cpp
#include <deque>

deque<int> dq;
dq.push_front(10);  // Add to front
dq.push_back(20);   // Add to back
dq.pop_front();     // Remove from front
dq.pop_back();      // Remove from back
```
        

## Tips & Tricks
- Practice this concept with multiple problems
- Understand the why, not just the how
- Draw diagrams to visualize the concept
- Start with simple examples before complex ones', 2, NULL) ON CONFLICT (topic_id) DO NOTHING;
INSERT INTO dsa_topics (topic_id, module_id, title, content, order_index, created_at) VALUES (28, 13, 'Classic DP Problems', '
# Classic DP Patterns

## 1. Climbing Stairs
You can climb 1 or 2 steps. Ways to reach step n?

**Recurrence**: `dp[i] = dp[i-1] + dp[i-2]`

```cpp
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
```

## 2. Coin Change (Minimum Coins)
Minimum coins needed to make amount.

```cpp
int coinChange(vector<int>& coins, int amount) {
    vector<int> dp(amount + 1, INT_MAX);
    dp[0] = 0;
    
    for (int i = 1; i <= amount; i++) {
        for (int coin : coins) {
            if (i >= coin && dp[i - coin] != INT_MAX) {
                dp[i] = min(dp[i], dp[i - coin] + 1);
            }
        }
    }
    return dp[amount] == INT_MAX ? -1 : dp[amount];
}
```

## 3. House Robber
Rob houses to maximize money, can''t rob adjacent.

**Recurrence**: `dp[i] = max(dp[i-1], dp[i-2] + arr[i])`

## Related Problems
- [Climbing Stairs](/problems/1270)
- [Coin Change](/problems/1272)
        

## Tips & Tricks
- Practice this concept with multiple problems
- Understand the why, not just the how
- Draw diagrams to visualize the concept
- Start with simple examples before complex ones', 2, NULL) ON CONFLICT (topic_id) DO NOTHING;
INSERT INTO dsa_topics (topic_id, module_id, title, content, order_index, created_at) VALUES (37, 15, 'Prime Numbers & Sieve', '
# Prime Numbers

A prime number is divisible only by 1 and itself (greater than 1).

## Check if Prime
```cpp
bool isPrime(int n) {
    if (n <= 1) return false;
    if (n <= 3) return true;
    if (n % 2 == 0 || n % 3 == 0) return false;
    
    for (int i = 5; i * i <= n; i += 6) {
        if (n % i == 0 || n % (i + 2) == 0) {
            return false;
        }
    }
    return true;
}
```

**Time Complexity**: O(√n)

## Sieve of Eratosthenes
Find all primes up to n efficiently.

```cpp
vector<bool> sieve(int n) {
    vector<bool> isPrime(n + 1, true);
    isPrime[0] = isPrime[1] = false;
    
    for (int i = 2; i * i <= n; i++) {
        if (isPrime[i]) {
            for (int j = i * i; j <= n; j += i) {
                isPrime[j] = false;
            }
        }
    }
    return isPrime;
}

// Usage: Get all primes
vector<int> getPrimes(int n) {
    vector<bool> is = sieve(n);
    vector<int> primes;
    for (int i = 2; i <= n; i++) {
        if (is[i]) primes.push_back(i);
    }
    return primes;
}
```

**Time Complexity**: O(n log log n)  
**Space Complexity**: O(n)

## Prime Factorization
```cpp
vector<int> primeFactors(int n) {
    vector<int> factors;
    
    for (int i = 2; i * i <= n; i++) {
        while (n % i == 0) {
            factors.push_back(i);
            n /= i;
        }
    }
    if (n > 1) factors.push_back(n);
    
    return factors;
}
// Example: primeFactors(12) = [2, 2, 3]
```

## Count Divisors
```cpp
int countDivisors(int n) {
    int count = 0;
    for (int i = 1; i * i <= n; i++) {
        if (n % i == 0) {
            count++;
            if (i != n / i) count++;  // Count both i and n/i
        }
    }
    return count;
}
```

## Tips & Tricks
- Only check divisors up to √n
- Every composite number has a prime factor ≤ √n
- Primes > 3 are of form `6k ± 1`
- Use sieve for multiple queries
- Number of primes ≤ n ≈ n / ln(n)

## Common Applications
- Cryptography (RSA)
- Hash table sizing (use prime numbers)
- Finding GCD using prime factorization
            ', 2, NULL) ON CONFLICT (topic_id) DO NOTHING;
INSERT INTO dsa_topics (topic_id, module_id, title, content, order_index, created_at) VALUES (5, 2, 'Space Complexity', '
# Space Complexity

Space complexity measures **extra memory** used by an algorithm (excluding input).

## Examples
### O(1) - Constant Space
```cpp
int sum = 0;
for (int i = 0; i < n; i++) {
    sum += arr[i];  // Only ''sum'' variable used
}
```

### O(n) - Linear Space
```cpp
vector<int> copy(n);
for (int i = 0; i < n; i++) {
    copy[i] = arr[i];  // New array of size n
}
```

### O(n) - Recursion Stack
```cpp
int factorial(int n) {
    if (n <= 1) return 1;
    return n * factorial(n-1);  // n recursive calls on stack
}
```

## Tips
- Recursion depth = Space complexity
- Creating new arrays/vectors = O(n) space
- In-place algorithms use O(1) space
        ', 2, NULL) ON CONFLICT (topic_id) DO NOTHING;
INSERT INTO dsa_topics (topic_id, module_id, title, content, order_index, created_at) VALUES (7, 3, 'Vectors - Dynamic Arrays', '
# Vectors (STL)

Vectors are **dynamic arrays** that can grow/shrink automatically.

## Why Vectors > Arrays?
- Size can change
- Built-in functions (sort, reverse, etc.)
- STL algorithms work seamlessly

## Essential Operations
```cpp
#include <vector>
vector<int> v;              // Empty vector

v.push_back(10);            // Add to end: {10}
v.push_back(20);            // {10, 20}
v.pop_back();               // Remove last: {10}

cout << v.size();           // Length: 1
cout << v[0];               // Access: 10
v.clear();                  // Empty vector
```

## Initialization
```cpp
vector<int> v1(5);          // {0, 0, 0, 0, 0}
vector<int> v2(5, 10);      // {10, 10, 10, 10, 10}
vector<int> v3 = {1, 2, 3}; // {1, 2, 3}
```

## Iteration
```cpp
// Method 1: Index
for (int i = 0; i < v.size(); i++) {
    cout << v[i] << " ";
}

// Method 2: Range-based (C++11)
for (int x : v) {
    cout << x << " ";
}
```

## Tips & Tricks
- Use `v.reserve(n)` if you know final size → Avoids reallocations
- `v.empty()` is faster than `v.size() == 0`
- 2D vectors: `vector<vector<int>> matrix(n, vector<int>(m));`
        ', 2, NULL) ON CONFLICT (topic_id) DO NOTHING;
INSERT INTO dsa_topics (topic_id, module_id, title, content, order_index, created_at) VALUES (13, 5, 'Anagram and Substring Problems', '
# Anagrams & Substrings

## What is an Anagram?
Two strings are anagrams if they have the same characters with same frequencies.

**Example**: "listen" and "silent"

## Checking Anagrams
```cpp
bool isAnagram(string s1, string s2) {
    if (s1.size() != s2.size()) return false;
    
    // Method 1: Sort
    sort(s1.begin(), s1.end());
    sort(s2.begin(), s2.end());
    return s1 == s2;
    
    // Method 2: Frequency count (faster)
    int freq[26] = {0};
    for (char c : s1) freq[c - ''a'']++;
    for (char c : s2) freq[c - ''a'']--;
    
    for (int i = 0; i < 26; i++) {
        if (freq[i] != 0) return false;
    }
    return true;
}
```

## Longest Substring Without Repeating Characters
Use **sliding window + set**:
```cpp
int lengthOfLongestSubstring(string s) {
    unordered_set<char> seen;
    int left = 0, maxLen = 0;
    
    for (int right = 0; right < s.size(); right++) {
        while (seen.count(s[right])) {
            seen.erase(s[left]);
            left++;
        }
        seen.insert(s[right]);
        maxLen = max(maxLen, right - left + 1);
    }
    return maxLen;
}
```

## Tips
- Use `unordered_map` for character frequency
- Sliding window for substring problems
- Sorting can simplify comparisons

## Related Problems
- [Valid Anagram](/problems/1253)
        ', 3, NULL) ON CONFLICT (topic_id) DO NOTHING;
INSERT INTO dsa_topics (topic_id, module_id, title, content, order_index, created_at) VALUES (57, 6, 'Binary Search Advanced (Lower/Upper Bound, Rotated Array)', '
# Advanced Binary Search

## Search in Rotated Sorted Array
```cpp
int search(vector<int>& nums, int target) {
    int left = 0, right = nums.size() - 1;
    
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (nums[mid] == target) return mid;
        
        if (nums[left] <= nums[mid]) {  // Left half sorted
            if (target >= nums[left] && target < nums[mid])
                right = mid - 1;
            else
                left = mid + 1;
        } else {  // Right half sorted
            if (target > nums[mid] && target <= nums[right])
                left = mid + 1;
            else
                right = mid - 1;
        }
    }
    return -1;
}
```

## Binary Search on Answer
```cpp
// Find minimum capacity to ship packages within D days
int shipWithinDays(vector<int>& weights, int days) {
    int left = *max_element(weights.begin(), weights.end());
    int right = accumulate(weights.begin(), weights.end(), 0);
    
    auto canShip = [&](int capacity) {
        int daysNeeded = 1, currentLoad = 0;
        for (int w : weights) {
            if (currentLoad + w > capacity) {
                daysNeeded++;
                currentLoad = w;
            } else {
                currentLoad += w;
            }
        }
        return daysNeeded <= days;
    };
    
    while (left < right) {
        int mid = left + (right - left) / 2;
        if (canShip(mid)) {
            right = mid;
        } else {
            left = mid + 1;
        }
    }
    return left;
}
```
', 3, NULL) ON CONFLICT (topic_id) DO NOTHING;
INSERT INTO dsa_topics (topic_id, module_id, title, content, order_index, created_at) VALUES (39, 12, 'Dijkstra''s Algorithm', '
# Dijkstra''s Algorithm (Shortest Path)

Dijkstra''s algorithm finds the shortest path from a source vertex to all other vertices in a weighted graph with **non-negative** edge weights.

## Algorithm Overview
1. Initialize distances: dist[source] = 0, all others = ∞
2. Use a min-heap (priority queue) to always process the nearest unvisited vertex
3. Relax edges: If a shorter path is found, update distance
4. Repeat until all vertices are processed

## Implementation
```cpp
vector<int> dijkstra(int n, int source, vector<vector<pair<int, int>>>& adj) {
    // adj[u] = {(v, weight), ...}
    vector<int> dist(n, INT_MAX);
    priority_queue<pair<int, int>, vector<pair<int, int>>, greater<>> pq;
    
    dist[source] = 0;
    pq.push({0, source});  // {distance, vertex}
    
    while (!pq.empty()) {
        auto [d, u] = pq.top();
        pq.pop();
        
        if (d > dist[u]) continue;  // Already processed with shorter path
        
        for (auto [v, weight] : adj[u]) {
            if (dist[u] + weight < dist[v]) {
                dist[v] = dist[u] + weight;
                pq.push({dist[v], v});
            }
        }
    }
    return dist;
}
```

## Time Complexity
- **O((V + E) log V)** using min-heap (priority queue)
- **O(V²)** using simple array

## Space Complexity
- **O(V + E)** for adjacency list and priority queue

## Key Points
- **Greedy algorithm**: Always picks the closest unvisited vertex
- **Doesn''t work with negative weights**: Use Bellman-Ford instead
- Can reconstruct path by keeping parent array

## Path Reconstruction
```cpp
vector<int> getPath(int source, int target, vector<int>& parent) {
    vector<int> path;
    for (int v = target; v != -1; v = parent[v]) {
        path.push_back(v);
    }
    reverse(path.begin(), path.end());
    return path;
}
```

## Tips & Tricks
- Use `pair<int, int>` as {distance, vertex} in priority queue
- Check `if (d > dist[u]) continue` to skip outdated entries
- For path reconstruction, maintain `parent[v]` array
- Works on both directed and undirected graphs
            ', 3, NULL) ON CONFLICT (topic_id) DO NOTHING;
INSERT INTO dsa_topics (topic_id, module_id, title, content, order_index, created_at) VALUES (51, 13, 'Longest Common Subsequence (LCS)', '
# Longest Common Subsequence

```cpp
int longestCommonSubsequence(string s1, string s2) {
    int m = s1.size(), n = s2.size();
    vector<vector<int>> dp(m + 1, vector<int>(n + 1, 0));
    
    for (int i = 1; i <= m; i++) {
        for (int j = 1; j <= n; j++) {
            if (s1[i-1] == s2[j-1]) {
                dp[i][j] = 1 + dp[i-1][j-1];
            } else {
                dp[i][j] = max(dp[i-1][j], dp[i][j-1]);
            }
        }
    }
    return dp[m][n];
}
```

## Print LCS
```cpp
string printLCS(string s1, string s2) {
    int m = s1.size(), n = s2.size();
    vector<vector<int>> dp(m + 1, vector<int>(n + 1, 0));
    
    for (int i = 1; i <= m; i++) {
        for (int j = 1; j <= n; j++) {
            if (s1[i-1] == s2[j-1]) {
                dp[i][j] = 1 + dp[i-1][j-1];
            } else {
                dp[i][j] = max(dp[i-1][j], dp[i][j-1]);
            }
        }
    }
    
    string lcs;
    int i = m, j = n;
    while (i > 0 && j > 0) {
        if (s1[i-1] == s2[j-1]) {
            lcs = s1[i-1] + lcs;
            i--; j--;
        } else if (dp[i-1][j] > dp[i][j-1]) {
            i--;
        } else {
            j--;
        }
    }
    return lcs;
}
```
', 3, NULL) ON CONFLICT (topic_id) DO NOTHING;
INSERT INTO dsa_topics (topic_id, module_id, title, content, order_index, created_at) VALUES (46, 8, 'Fast & Slow Pointers (Cycle Detection)', '
# Fast & Slow Pointers (Floyd''s Algorithm)

## Detect Cycle
```cpp
bool hasCycle(ListNode* head) {
    ListNode *slow = head, *fast = head;
    
    while (fast && fast->next) {
        slow = slow->next;
        fast = fast->next->next;
        if (slow == fast) return true;
    }
    return false;
}
```

## Find Cycle Start
```cpp
ListNode* detectCycle(ListNode* head) {
    ListNode *slow = head, *fast = head;
    
    while (fast && fast->next) {
        slow = slow->next;
        fast = fast->next->next;
        if (slow == fast) {
            slow = head;
            while (slow != fast) {
                slow = slow->next;
                fast = fast->next;
            }
            return slow;
        }
    }
    return nullptr;
}
```

## Find Middle Element
```cpp
ListNode* findMiddle(ListNode* head) {
    ListNode *slow = head, *fast = head;
    while (fast && fast->next) {
        slow = slow->next;
        fast = fast->next->next;
    }
    return slow;
}
```
', 3, NULL) ON CONFLICT (topic_id) DO NOTHING;
INSERT INTO dsa_topics (topic_id, module_id, title, content, order_index, created_at) VALUES (35, 14, 'Character & Number Conversion Tricks', '
# Character & Number Conversion Tricks

Master the art of converting between characters, numbers, and their ASCII representations.

## ASCII Basics
- `''A''` to `''Z''`: 65 to 90
- `''a''` to `''z''`: 97 to 122
- `''0''` to `''9''`: 48 to 57
- Difference: `''a'' - ''A'' = 32`

## Essential Conversions

### 1. Character to Integer (Digit)
```cpp
char c = ''7'';
int digit = c - ''0'';  // 7
```

### 2. Integer to Character
```cpp
int num = 5;
char c = ''0'' + num;  // ''5''
```

### 3. Uppercase to Lowercase
```cpp
char upper = ''A'';
char lower = upper + 32;  // ''a''
// Or use library:
char lower = tolower(upper);
```

### 4. Lowercase to Uppercase
```cpp
char lower = ''g'';
char upper = lower - 32;  // ''G''
// Or use library:
char upper = toupper(lower);
```

### 5. Toggle Case
```cpp
char c = ''A'';
c = c ^ 32;  // ''a'' (XOR with 32 flips case!)

// Toggle back
c = c ^ 32;  // ''A''
```

## Bit Manipulation for Characters

### Check if Lowercase
```cpp
bool isLowercase(char c) {
    return c >= ''a'' && c <= ''z'';
}
// Using bits (check 6th bit):
bool isLowercase(char c) {
    return (c & 32) != 0;  // Lowercase has 6th bit = 1
}
```

### Convert to Lowercase (Force 6th bit to 1)
```cpp
char toLower(char c) {
    return c | 32;
}
// ''A'' (01000001) | 32 (00100000) = ''a'' (01100001)
```

### Convert to Uppercase (Force 6th bit to 0)
```cpp
char toUpper(char c) {
    return c & ~32;  // Same as c & 223
}
// ''a'' (01100001) & ~32 (11011111) = ''A'' (01000001)
```

## Character Array (Index) to Bit Position

### Map character to index (0-25)
```cpp
// For ''a'' to ''z''
int index = c - ''a'';  // ''a''→0, ''b''→1, ..., ''z''→25

// For ''A'' to ''Z''
int index = c - ''A'';  // ''A''→0, ''B''→1, ..., ''Z''→25
```

### Use in frequency arrays
```cpp
string s = "hello";
int freq[26] = {0};

for (char c : s) {
    freq[c - ''a'']++;
}
// freq[7] = 1 (''h''), freq[4] = 1 (''e''), etc.
```

### Use in bitmask (for set of characters)
```cpp
// Check if all characters in string are unique
bool hasUniqueChars(string s) {
    int mask = 0;
    for (char c : s) {
        int bit = c - ''a'';
        if (mask & (1 << bit)) {
            return false;  // Already seen
        }
        mask |= (1 << bit);
    }
    return true;
}
```

## Number to String & String to Number

### Integer to String
```cpp
int num = 123;
string s = to_string(num);  // "123"
```

### String to Integer
```cpp
string s = "456";
int num = stoi(s);  // 456

// For long long:
long long num = stoll(s);
```

### Manual String to Integer
```cpp
string s = "789";
int num = 0;
for (char c : s) {
    num = num * 10 + (c - ''0'');
}
// num = 789
```

### Manual Integer to String
```cpp
int num = 321;
string s = "";
while (num) {
    s = char(''0'' + num % 10) + s;
    num /= 10;
}
// s = "321"
```

## Advanced Tricks

### Check if character is alphanumeric
```cpp
bool isAlphaNum(char c) {
    return (c >= ''0'' && c <= ''9'') ||
           (c >= ''A'' && c <= ''Z'') ||
           (c >= ''a'' && c <= ''z'');
}
```

### Remove case sensitivity in comparison
```cpp
bool equalIgnoreCase(char a, char b) {
    return (a | 32) == (b | 32);
}
// ''A'' | 32 = ''a'', so ''A'' and ''a'' become same
```

### Count vowels using bitmask
```cpp
bool isVowel(char c) {
    c = c | 32;  // Make lowercase
    return (1 << (c - ''a'')) & ((1 << 0) | (1 << 4) | (1 << 8) | (1 << 14) | (1 << 20));
}
```

## Tips & Tricks
- **XOR 32** to toggle case (works for both upper ↔ lower)
- **OR 32** to force lowercase
- **AND ~32** to force uppercase
- **Character distance**: `c - ''a''` gives 0-25 for alphabet
- **Digit value**: `c - ''0''` gives 0-9 for digits
- Use bitmask to track character sets (26 letters fit in int)
- `isalpha(c)`, `isdigit(c)`, `isalnum(c)` from `<cctype>`

## Common Patterns
```cpp
// Case-insensitive string comparison
bool equalIgnoreCase(string s1, string s2) {
    if (s1.size() != s2.size()) return false;
    for (int i = 0; i < s1.size(); i++) {
        if ((s1[i] | 32) != (s2[i] | 32)) return false;
    }
    return true;
}

// Count distinct characters (using bitmask)
int countDistinct(string s) {
    int mask = 0;
    for (char c : s) {
        mask |= (1 << (c - ''a''));
    }
    return __builtin_popcount(mask);
}
```
            ', 3, NULL) ON CONFLICT (topic_id) DO NOTHING;
INSERT INTO dsa_topics (topic_id, module_id, title, content, order_index, created_at) VALUES (47, 9, 'Monotonic Stack Pattern', '
# Monotonic Stack

## Next Greater Element
```cpp
vector<int> nextGreaterElement(vector<int>& nums) {
    int n = nums.size();
    vector<int> result(n, -1);
    stack<int> st;
    
    for (int i = 0; i < n; i++) {
        while (!st.empty() && nums[st.top()] < nums[i]) {
            result[st.top()] = nums[i];
            st.pop();
        }
        st.push(i);
    }
    return result;
}
```

## Next Smaller Element
Use same logic with > instead of <

## Applications
- Stock span problem
- Largest rectangle in histogram
- Trapping rain water
', 3, NULL) ON CONFLICT (topic_id) DO NOTHING;
INSERT INTO dsa_topics (topic_id, module_id, title, content, order_index, created_at) VALUES (43, 10, 'Level Order Traversal (BFS)', '
# Level Order Traversal

Traverse tree level by level from left to right.

## Implementation
```cpp
vector<vector<int>> levelOrder(TreeNode* root) {
    vector<vector<int>> result;
    if (!root) return result;
    
    queue<TreeNode*> q;
    q.push(root);
    
    while (!q.empty()) {
        int levelSize = q.size();
        vector<int> currentLevel;
        
        for (int i = 0; i < levelSize; i++) {
            TreeNode* node = q.front();
            q.pop();
            currentLevel.push_back(node->val);
            
            if (node->left) q.push(node->left);
            if (node->right) q.push(node->right);
        }
        result.push_back(currentLevel);
    }
    return result;
}
```

## Applications
- Print tree by levels
- Find minimum depth
- Binary tree right side view
- Zigzag level order

## Time Complexity: O(n)
## Space Complexity: O(w) where w is max width
            ', 3, NULL) ON CONFLICT (topic_id) DO NOTHING;
INSERT INTO dsa_topics (topic_id, module_id, title, content, order_index, created_at) VALUES (38, 15, 'Modular Arithmetic', '
# Modular Arithmetic

Modular arithmetic is essential in competitive programming to avoid overflow and work with large numbers.

## Basics
```
a ≡ b (mod m)  means  a % m = b % m
```

## Properties
1. **(a + b) % m = ((a % m) + (b % m)) % m**
2. **(a - b) % m = ((a % m) - (b % m) + m) % m**
3. **(a × b) % m = ((a % m) × (b % m)) % m**
4. **a^b % m ≠ (a % m)^b % m** (Use modular exponentiation!)

## Modular Addition/Subtraction
```cpp
const int MOD = 1e9 + 7;

int add(int a, int b) {
    return ((a % MOD) + (b % MOD)) % MOD;
}

int subtract(int a, int b) {
    return ((a % MOD) - (b % MOD) + MOD) % MOD;
}

int multiply(long long a, long long b) {
    return ((a % MOD) * (b % MOD)) % MOD;
}
```

## Modular Exponentiation (Power)
Calculate `a^b % m` efficiently.

```cpp
long long power(long long a, long long b, long long m) {
    long long result = 1;
    a %= m;
    
    while (b > 0) {
        if (b & 1) {
            result = (result * a) % m;
        }
        a = (a * a) % m;
        b >>= 1;
    }
    return result;
}
```

**Time Complexity**: O(log b)

## Modular Inverse
Find x such that `(a × x) % m = 1`.

### Method 1: Fermat''s Little Theorem (for prime m)
```
a^(-1) ≡ a^(m-2) (mod m)
```

```cpp
long long modInverse(long long a, long long m) {
    return power(a, m - 2, m);
}
```

### Method 2: Extended Euclidean
```cpp
long long modInverse(long long a, long long m) {
    long long x, y;
    long long g = extendedGCD(a, m, x, y);
    if (g != 1) return -1;  // Inverse doesn''t exist
    return (x % m + m) % m;
}
```

## Modular Division
```cpp
// (a / b) % m = (a * b^(-1)) % m
lon long divide(long long a, long long b, long long m) {
    return (a * modInverse(b, m)) % m;
}
```

## Common Modulo Values
- **10^9 + 7** (1000000007) - Most common, prime
- **998244353** - Prime, has nice properties for FFT
- **10^9 + 9** (1000000009) - Another prime

## Factorial Modulo (Precomputation)
```cpp
const int MAXN = 1e6;
const int MOD = 1e9 + 7;
long long fact[MAXN + 1];

void precomputeFactorial() {
    fact[0] = 1;
    for (int i = 1; i <= MAXN; i++) {
        fact[i] = (fact[i-1] * i) % MOD;
    }
}

// nCr = n! / (r! × (n-r)!)
long long nCr(int n, int r) {
    if (r > n) return 0;
    long long num = fact[n];
    long long den = (fact[r] * fact[n - r]) % MOD;
    return (num * modInverse(den, MOD)) % MOD;
}
```

## Tips & Tricks
- Always take mod at each step to avoid overflow
- For subtraction, add MOD before taking mod: `(a - b + MOD) % MOD`
- Use `long long` for intermediate calculations
- Precompute factorials if computing many C(n, r)
- Division by 2: Multiply by `modInverse(2, MOD)` or `(MOD + 1) / 2`

## Common Mistakes
- **Not taking mod**: `a * b` can overflow!
- **Negative results**: `(a - b) % MOD` can be negative
- **Using `a^(-1)`**: No direct division, use modular inverse
- **Forgetting `long long`**: Even with mod, intermediate can overflow

## Applications
- Computing large combinatorics modulo
- Hashing with modulo
- Avoiding overflow in DP
- Cryptography
            ', 3, NULL) ON CONFLICT (topic_id) DO NOTHING;
INSERT INTO dsa_topics (topic_id, module_id, title, content, order_index, created_at) VALUES (67, 7, 'Subset Generation & Combination Sum', '
# Generating All Subsets

## Using Backtracking
```cpp
void backtrack(vector<int>& nums, int start, vector<int>& current, vector<vector<int>>& result) {
    result.push_back(current);
    
    for (int i = start; i < nums.size(); i++) {
        current.push_back(nums[i]);
        backtrack(nums, i + 1, current, result);
        current.pop_back();
    }
}

vector<vector<int>> subsets(vector<int>& nums) {
    vector<vector<int>> result;
    vector<int> current;
    backtrack(nums, 0, current, result);
    return result;
}
```

## Using Bit Manipulation
```cpp
vector<vector<int>> subsets(vector<int>& nums) {
    int n = nums.size();
    vector<vector<int>> result;
    
    for (int mask = 0; mask < (1 << n); mask++) {
        vector<int> subset;
        for (int i = 0; i < n; i++) {
            if (mask & (1 << i)) {
                subset.push_back(nums[i]);
            }
        }
        result.push_back(subset);
    }
    return result;
}
```

## Combination Sum
```cpp
void backtrack(vector<int>& candidates, int target, int start, vector<int>& current, vector<vector<int>>& result) {
    if (target == 0) {
        result.push_back(current);
        return;
    }
    
    for (int i = start; i < candidates.size(); i++) {
        if (candidates[i] > target) continue;
        current.push_back(candidates[i]);
        backtrack(candidates, target - candidates[i], i, current, result);
        current.pop_back();
    }
}
```
', 3, NULL) ON CONFLICT (topic_id) DO NOTHING;
INSERT INTO dsa_topics (topic_id, module_id, title, content, order_index, created_at) VALUES (45, 3, 'Prefix Sum & Difference Array', '
# Prefix Sum Technique

## What is Prefix Sum?
Store cumulative sums to answer range sum queries in O(1).

```cpp
vector<int> arr = {2, 4, 1, 5, 3};
vector<int> prefix(arr.size() + 1, 0);

for (int i = 0; i < arr.size(); i++) {
    prefix[i + 1] = prefix[i] + arr[i];
}

// Sum from index L to R
int rangeSum(int L, int R) {
    return prefix[R + 1] - prefix[L];
}
```

## 2D Prefix Sum
```cpp
vector<vector<int>> prefix(n + 1, vector<int>(m + 1, 0));
for (int i = 1; i <= n; i++) {
    for (int j = 1; j <= m; j++) {
        prefix[i][j] = matrix[i-1][j-1] 
                     + prefix[i-1][j] 
                     + prefix[i][j-1] 
                     - prefix[i-1][j-1];
    }
}
```
', 3, NULL) ON CONFLICT (topic_id) DO NOTHING;
INSERT INTO dsa_topics (topic_id, module_id, title, content, order_index, created_at) VALUES (90, 2, '📝 Extra Practice', '
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

## 🏆 FAANG/MAANG Favorites

- **[Product of Array Except Self](https://leetcode.com/problems/product-of-array-except-self/)** - Amazon, Microsoft, Facebook
- **[First Bad Version](https://leetcode.com/problems/first-bad-version/)** - Facebook, Google
- **[Peak Index in Mountain Array](https://leetcode.com/problems/peak-index-in-a-mountain-array/)** - Google, Amazon
            

## 💡 Pro Tips & Shortcuts
- **Constraints Check**: Always check input size (N).
  - N ≤ 10-20 → O(2^N) or O(N!)
  - N ≤ 10^4 → O(N²)
  - N ≤ 10^6 → O(N log N) or O(N)
  - N > 10^8 → O(1) or O(log N)
- **Space**: Be careful with recursion depth (stack space).', 3, NULL) ON CONFLICT (topic_id) DO NOTHING;
INSERT INTO dsa_topics (topic_id, module_id, title, content, order_index, created_at) VALUES (63, 11, 'Merge K Sorted Lists/Arrays', '
# Merge K Sorted Lists

```cpp
ListNode* mergeKLists(vector<ListNode*>& lists) {
    auto cmp = [](ListNode* a, ListNode* b) { return a->val > b->val; };
    priority_queue<ListNode*, vector<ListNode*>, decltype(cmp)> pq(cmp);
    
    for (ListNode* list : lists) {
        if (list) pq.push(list);
    }
    
    ListNode dummy(0);
    ListNode* tail = &dummy;
    
    while (!pq.empty()) {
        ListNode* node = pq.top();
        pq.pop();
        
        tail->next = node;
        tail = tail->next;
        
        if (node->next) {
            pq.push(node->next);
        }
    }
    return dummy.next;
}
```

## Merge K Sorted Arrays
```cpp
vector<int> mergeKArrays(vector<vector<int>>& arrays) {
    auto cmp = [](tuple<int,int,int> a, tuple<int,int,int> b) {
        return get<0>(a) > get<0>(b);
    };
    priority_queue<tuple<int,int,int>, vector<tuple<int,int,int>>, decltype(cmp)> pq(cmp);
    
    for (int i = 0; i < arrays.size(); i++) {
        if (!arrays[i].empty()) {
            pq.push({arrays[i][0], i, 0});
        }
    }
    
    vector<int> result;
    while (!pq.empty()) {
        auto [val, arrIdx, elemIdx] = pq.top();
        pq.pop();
        result.push_back(val);
        
        if (elemIdx + 1 < arrays[arrIdx].size()) {
            pq.push({arrays[arrIdx][elemIdx + 1], arrIdx, elemIdx + 1});
        }
    }
    return result;
}
```

**Time**: O(N log K) where N = total elements, K = number of lists/arrays
', 3, NULL) ON CONFLICT (topic_id) DO NOTHING;
INSERT INTO dsa_topics (topic_id, module_id, title, content, order_index, created_at) VALUES (3, 1, 'Loops & Conditionals', '
# Loops & Conditionals

## If-Else Statement
```cpp
if (score >= 90) {
    cout << "Grade: A";
} else if (score >= 75) {
    cout << "Grade: B";
} else {
    cout << "Grade: C";
}
```

## For Loop
```cpp
for (int i = 0; i < 5; i++) {
    cout << i << " ";  // Prints: 0 1 2 3 4
}
```

## While Loop
```cpp
int i = 0;
while (i < 5) {
    cout << i << " ";
    i++;
}
```

## Tips
- **For loops**: When you know iteration count
- **While loops**: When condition-based termination
- **Do-While**: When you want at least one execution
        ', 3, NULL) ON CONFLICT (topic_id) DO NOTHING;
INSERT INTO dsa_topics (topic_id, module_id, title, content, order_index, created_at) VALUES (10, 4, 'Kadane''s Algorithm', '
# Kadane''s Algorithm (Maximum Subarray Sum)

Find the contiguous subarray with maximum sum.

## Intuition
**Key Insight**: If current sum becomes negative, it will only decrease future sums. Reset it!

## Algorithm
```cpp
int kadane(vector<int>& arr) {
    int maxSum = INT_MIN;
    int currSum = 0;
    
    for (int num : arr) {
        currSum += num;
        maxSum = max(maxSum, currSum);
        if (currSum < 0) currSum = 0;  // Reset
    }
    return maxSum;
}
```

## Why It Works
- We keep adding elements to current sum
- Update max whenever we see a better sum
- If sum goes negative, starting fresh is better

## Edge Case: All Negative
Return the maximum element (least negative).

## Related Problems
- [Maximum Subarray](/problems/1248)
        

## Tips & Tricks
- Practice this concept with multiple problems
- Understand the why, not just the how
- Draw diagrams to visualize the concept
- Start with simple examples before complex ones', 3, NULL) ON CONFLICT (topic_id) DO NOTHING;
INSERT INTO dsa_topics (topic_id, module_id, title, content, order_index, created_at) VALUES (66, 6, 'Quick Select (Kth Element)', '
# Quick Select Algorithm

Find Kth smallest/largest element in O(n) average time.

```cpp
int partition(vector<int>& arr, int left, int right) {
    int pivot = arr[right];
    int i = left;
    
    for (int j = left; j < right; j++) {
        if (arr[j] <= pivot) {
            swap(arr[i], arr[j]);
            i++;
        }
    }
    swap(arr[i], arr[right]);
    return i;
}

int quickSelect(vector<int>& arr, int left, int right, int k) {
    if (left == right) return arr[left];
    
    int pivotIndex = partition(arr, left, right);
    
    if (k == pivotIndex) {
        return arr[k];
    } else if (k < pivotIndex) {
        return quickSelect(arr, left, pivotIndex - 1, k);
    } else {
        return quickSelect(arr, pivotIndex + 1, right, k);
    }
}

int findKthSmallest(vector<int>& nums, int k) {
    return quickSelect(nums, 0, nums.size() - 1, k - 1);
}
```

**Time**: O(n) average, O(n²) worst case  
**Use for**: Finding median, Kth largest element
', 4, NULL) ON CONFLICT (topic_id) DO NOTHING;
INSERT INTO dsa_topics (topic_id, module_id, title, content, order_index, created_at) VALUES (29, 1, 'Functions in C++', '
# Functions in C++

A function is a reusable block of code that performs a specific task.

## Why Functions?
- **Code Reusability**: Write once, use many times
- **Modularity**: Break complex problems into smaller pieces
- **Readability**: Makes code easier to understand

## Function Syntax
```cpp
return_type function_name(parameters) {
    // Function body
    return value;
}
```

## Example: Simple Function
```cpp
// Function to add two numbers
int add(int a, int b) {
    return a + b;
}

int main() {
    int result = add(5, 3);
    cout << result;  // Output: 8
}
```

## Function with No Return (void)
```cpp
void greet(string name) {
    cout << "Hello, " << name << "!" << endl;
}

int main() {
    greet("Alice");  // Output: Hello, Alice!
}
```

## Pass by Value vs Pass by Reference
```cpp
// Pass by Value (creates copy)
void increment(int x) {
    x++;  // Original not affected
}

// Pass by Reference (modifies original)
void increment(int& x) {
    x++;  // Original IS affected
}

int main() {
    int num = 5;
    increment(num);
    cout << num;  // 5 (if pass by value) or 6 (if pass by reference)
}
```

## Function Overloading
C++ allows multiple functions with the same name but different parameters.
```cpp
int add(int a, int b) {
    return a + b;
}

double add(double a, double b) {
    return a + b;
}

int add(int a, int b, int c) {
    return a + b + c;
}
```

## Default Parameters
```cpp
void printMessage(string msg = "Hello") {
    cout << msg << endl;
}

int main() {
    printMessage();           // Output: Hello
    printMessage("Hi there"); // Output: Hi there
}
```

## Recursive Functions
A function that calls itself.
```cpp
int factorial(int n) {
    if (n <= 1) return 1;        // Base case
    return n * factorial(n - 1); // Recursive case
}
```

## Tips
- Keep functions small and focused (single responsibility)
- Use meaningful function names
- Pass large objects by reference to avoid copying
            ', 4, NULL) ON CONFLICT (topic_id) DO NOTHING;
INSERT INTO dsa_topics (topic_id, module_id, title, content, order_index, created_at) VALUES (40, 12, 'Minimum Spanning Tree (MST)', '
# Minimum Spanning Tree (MST)

An MST is a subset of edges that connects all vertices with minimum total weight and no cycles.

## Prim''s Algorithm (Similar to Dijkstra)

### Approach
Start from any vertex and greedily add the minimum weight edge that connects the tree to a new vertex.

```cpp
int primMST(int n, vector<vector<pair<int, int>>>& adj) {
    // adj[u] = {(v, weight), ...}
    vector<bool> inMST(n, false);
    priority_queue<pair<int, int>, vector<pair<int, int>>, greater<>> pq;
    
    int mstWeight = 0;
    pq.push({0, 0});  // {weight, vertex}
    
    while (!pq.empty()) {
        auto [weight, u] = pq.top();
        pq.pop();
        
        if (inMST[u]) continue;
        
        inMST[u] = true;
        mstWeight += weight;
        
        for (auto [v, w] : adj[u]) {
            if (!inMST[v]) {
                pq.push({w, v});
            }
        }
    }
    return mstWeight;
}
```

**Time Complexity**: O((V + E) log V)

## Kruskal''s Algorithm (Uses DSU)

### Approach
Sort all edges by weight. Add edges one by one if they don''t form a cycle (use DSU).

```cpp
struct Edge {
    int u, v, weight;
    bool operator<(const Edge& other) const {
        return weight < other.weight;
    }
};

class DSU {
    vector<int> parent, rank;
public:
    DSU(int n) : parent(n), rank(n, 0) {
        iota(parent.begin(), parent.end(), 0);
    }
    
    int find(int x) {
        if (parent[x] != x) parent[x] = find(parent[x]);
        return parent[x];
    }
    
    bool unite(int x, int y) {
        int px = find(x), py = find(y);
        if (px == py) return false;
        
        if (rank[px] < rank[py]) swap(px, py);
        parent[py] = px;
        if (rank[px] == rank[py]) rank[px]++;
        return true;
    }
};

int kruskalMST(int n, vector<Edge>& edges) {
    sort(edges.begin(), edges.end());
    DSU dsu(n);
    
    int mstWeight = 0;
    for (auto& e : edges) {
        if (dsu.unite(e.u, e.v)) {
            mstWeight += e.weight;
        }
    }
    return mstWeight;
}
```

**Time Complexity**: O(E log E) due to sorting

## When to Use Which?
- **Prim''s**: Dense graphs (many edges), adjacency matrix
- **Kruskal''s**: Sparse graphs (few edges), edge list

## Tips & Tricks
- MST has exactly V-1 edges
- Total MST edges picked = n - 1
- Both algorithms work on undirected weighted graphs
- For Kruskal''s, sort edges first
            ', 4, NULL) ON CONFLICT (topic_id) DO NOTHING;
INSERT INTO dsa_topics (topic_id, module_id, title, content, order_index, created_at) VALUES (44, 5, 'Pattern Matching - KMP Algorithm', '
# KMP (Knuth-Morris-Pratt) Algorithm

Efficiently find pattern in text in O(n + m) time.

## Preprocessing: Build LPS Array
LPS[i] = Longest Proper Prefix which is also Suffix

```cpp
vector<int> computeLPS(string pattern) {
    int m = pattern.size();
    vector<int> lps(m, 0);
    int len = 0;
    
    for (int i = 1; i < m; i++) {
        while (len > 0 && pattern[i] != pattern[len]) {
            len = lps[len - 1];
        }
        if (pattern[i] == pattern[len]) {
            len++;
        }
        lps[i] = len;
    }
    return lps;
}
```

## KMP Search
```cpp
vector<int> KMP(string text, string pattern) {
    vector<int> lps = computeLPS(pattern);
    vector<int> matches;
    
    int n = text.size(), m = pattern.size();
    int i = 0, j = 0;
    
    while (i < n) {
        if (text[i] == pattern[j]) {
            i++;
            j++;
        }
        
        if (j == m) {
            matches.push_back(i - j);
            j = lps[j - 1];
        } else if (i < n && text[i] != pattern[j]) {
            if (j != 0) {
                j = lps[j - 1];
            } else {
                i++;
            }
        }
    }
    return matches;
}
```

## Time Complexity
- Preprocessing: O(m)
- Search: O(n)
- **Total: O(n + m)**

## Use Cases
- Pattern matching
- DNA sequence analysis
- Text editors (find feature)
            ', 4, NULL) ON CONFLICT (topic_id) DO NOTHING;
INSERT INTO dsa_topics (topic_id, module_id, title, content, order_index, created_at) VALUES (48, 10, 'Lowest Common Ancestor (LCA)', '
# Lowest Common Ancestor

```cpp
TreeNode* lowestCommonAncestor(TreeNode* root, TreeNode* p, TreeNode* q) {
    if (!root || root == p || root == q) return root;
    
    TreeNode* left = lowestCommonAncestor(root->left, p, q);
    TreeNode* right = lowestCommonAncestor(root->right, p, q);
    
    if (left && right) return root;
    return left ? left : right;
}
```

## For BST (Optimized)
```cpp
TreeNode* lowestCommonAncestor(TreeNode* root, TreeNode* p, TreeNode* q) {
    if (p->val < root->val && q->val < root->val)
        return lowestCommonAncestor(root->left, p, q);
    if (p->val > root->val && q->val > root->val)
        return lowestCommonAncestor(root->right, p, q);
    return root;
}
```
', 4, NULL) ON CONFLICT (topic_id) DO NOTHING;
INSERT INTO dsa_topics (topic_id, module_id, title, content, order_index, created_at) VALUES (52, 13, 'Edit Distance', '
# Edit Distance (Levenshtein Distance)

Minimum operations (insert, delete, replace) to convert s1 to s2.

```cpp
int minDistance(string s1, string s2) {
    int m = s1.size(), n = s2.size();
    vector<vector<int>> dp(m + 1, vector<int>(n + 1));
    
    for (int i = 0; i <= m; i++) dp[i][0] = i;
    for (int j = 0; j <= n; j++) dp[0][j] = j;
    
    for (int i = 1; i <= m; i++) {
        for (int j = 1; j <= n; j++) {
            if (s1[i-1] == s2[j-1]) {
                dp[i][j] = dp[i-1][j-1];
            } else {
                dp[i][j] = 1 + min({
                    dp[i-1][j],      // delete
                    dp[i][j-1],      // insert
                    dp[i-1][j-1]     // replace
                });
            }
        }
    }
    return dp[m][n];
}
```
', 4, NULL) ON CONFLICT (topic_id) DO NOTHING;
INSERT INTO dsa_topics (topic_id, module_id, title, content, order_index, created_at) VALUES (56, 15, 'Fast Exponentiation & Binary Exponentiation', '
# Fast Exponentiation (Binary Exponentiation)

Compute a^n in O(log n) instead of O(n).

```cpp
long long power(long long a, long long n) {
    long long result = 1;
    while (n > 0) {
        if (n & 1) result *= a;
        a *= a;
        n >>= 1;
    }
    return result;
}
```

## With Modulo
```cpp
long long powerMod(long long a, long long n, long long mod) {
    long long result = 1;
    a %= mod;
    while (n > 0) {
        if (n & 1) result = (result * a) % mod;
        a = (a * a) % mod;
        n >>= 1;
    }
    return result;
}
```

## Matrix Exponentiation (for Fibonacci)
```cpp
typedef vector<vector<long long>> Matrix;

Matrix multiply(Matrix& A, Matrix& B) {
    int n = A.size();
    Matrix C(n, vector<long long>(n, 0));
    for (int i = 0; i < n; i++)
        for (int j = 0; j < n; j++)
            for (int k = 0; k < n; k++)
                C[i][j] += A[i][k] * B[k][j];
    return C;
}

long long fib(int n) {
    Matrix F = {{1, 1}, {1, 0}};
    Matrix result = {{1, 0}, {0, 1}};
    while (n > 0) {
        if (n & 1) result = multiply(result, F);
        F = multiply(F, F);
        n >>= 1;
    }
    return result[0][1];
}
```
', 4, NULL) ON CONFLICT (topic_id) DO NOTHING;
INSERT INTO dsa_topics (topic_id, module_id, title, content, order_index, created_at) VALUES (62, 3, '2D Arrays & Matrix Operations', '
# 2D Arrays (Matrices)

## Declaration & Initialization
```cpp
// Static 2D array
int arr[3][4];

// Using vector
vector<vector<int>> matrix(n, vector<int>(m, 0));

// Input
for (int i = 0; i < n; i++) {
    for (int j = 0; j < m; j++) {
        cin >> matrix[i][j];
    }
}
```

## Matrix Rotation (90° clockwise)
```cpp
void rotate(vector<vector<int>>& matrix) {
    int n = matrix.size();
    
    // Transpose
    for (int i = 0; i < n; i++) {
        for (int j = i + 1; j < n; j++) {
            swap(matrix[i][j], matrix[j][i]);
        }
    }
    
    // Reverse each row
    for (int i = 0; i < n; i++) {
        reverse(matrix[i].begin(), matrix[i].end());
    }
}
```

## Spiral Matrix Traversal
```cpp
vector<int> spiralOrder(vector<vector<int>>& matrix) {
    vector<int> result;
    if (matrix.empty()) return result;
    
    int top = 0, bottom = matrix.size() - 1;
    int left = 0, right = matrix[0].size() - 1;
    
    while (top <= bottom && left <= right) {
        for (int i = left; i <= right; i++) result.push_back(matrix[top][i]);
        top++;
        
        for (int i = top; i <= bottom; i++) result.push_back(matrix[i][right]);
        right--;
        
        if (top <= bottom) {
            for (int i = right; i >= left; i--) result.push_back(matrix[bottom][i]);
            bottom--;
        }
        
        if (left <= right) {
            for (int i = bottom; i >= top; i--) result.push_back(matrix[i][left]);
            left++;
        }
    }
    return result;
}
```

## Search in Row & Column Sorted Matrix
```cpp
bool searchMatrix(vector<vector<int>>& matrix, int target) {
    int n = matrix.size(), m = matrix[0].size();
    int row = 0, col = m - 1;
    
    while (row < n && col >= 0) {
        if (matrix[row][col] == target) return true;
        else if (matrix[row][col] > target) col--;
        else row++;
    }
    return false;
}
```
', 4, NULL) ON CONFLICT (topic_id) DO NOTHING;
INSERT INTO dsa_topics (topic_id, module_id, title, content, order_index, created_at) VALUES (68, 9, 'Next Greater Element Problems', '
# Next Greater Element

## Basic Next Greater Element
```cpp
vector<int> nextGreaterElement(vector<int>& nums) {
    int n = nums.size();
    vector<int> result(n, -1);
    stack<int> st;
    
    for (int i = 0; i < n; i++) {
        while (!st.empty() && nums[st.top()] < nums[i]) {
            result[st.top()] = nums[i];
            st.pop();
        }
        st.push(i);
    }
    return result;
}
```

## Next Greater Element in Circular Array
```cpp
vector<int> nextGreaterElements(vector<int>& nums) {
    int n = nums.size();
    vector<int> result(n, -1);
    stack<int> st;
    
    for (int i = 0; i < 2 * n; i++) {
        while (!st.empty() && nums[st.top()] < nums[i % n]) {
            result[st.top()] = nums[i % n];
            st.pop();
        }
        if (i < n) st.push(i);
    }
    return result;
}
```

## Stock Span Problem
```cpp
class StockSpanner {
    stack<pair<int, int>> st; // {price, span}
public:
    int next(int price) {
        int span = 1;
        while (!st.empty() && st.top().first <= price) {
            span += st.top().second;
            st.pop();
        }
        st.push({price, span});
        return span;
    }
};
```
', 4, NULL) ON CONFLICT (topic_id) DO NOTHING;
INSERT INTO dsa_topics (topic_id, module_id, title, content, order_index, created_at) VALUES (92, 4, '📝 Extra Practice', '
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

## 🏆 FAANG/MAANG Favorites

- **[3Sum](https://leetcode.com/problems/3sum/)** - Amazon, Facebook, Google
- **[4Sum](https://leetcode.com/problems/4sum/)** - Google, Facebook
- **[Container With Most Water](https://leetcode.com/problems/container-with-most-water/)** - Amazon, Facebook, Bloomberg
- **[Longest Consecutive Sequence](https://leetcode.com/problems/longest-consecutive-sequence/)** - Google, Amazon
- **[Subarray Sum Equals K](https://leetcode.com/problems/subarray-sum-equals-k/)** - Facebook, Google
- **[Maximum Product Subarray](https://leetcode.com/problems/maximum-product-subarray/)** - Amazon, LinkedIn
            

## 💡 Pro Tips & Shortcuts
- **Memset**: `memset(arr, 0, sizeof(arr))` quickly initializes arrays to 0 or -1. (Don''t use for other values!).
- **Two Pointers**: Great for sorted arrays (e.g., Two Sum, Remove Duplicates).
- **Sliding Window**: Use for subarray problems (e.g., Max Sum Subarray of size K).', 4, NULL) ON CONFLICT (topic_id) DO NOTHING;
INSERT INTO dsa_topics (topic_id, module_id, title, content, order_index, created_at) VALUES (102, 14, '📝 Extra Practice', '
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

## 🏆 FAANG/MAANG Favorites

- **[Missing Number](https://leetcode.com/problems/missing-number/)** - Amazon, Bloomberg, Microsoft
- **[Sum of Two Integers](https://leetcode.com/problems/sum-of-two-integers/)** - Apple, Amazon
- **[Bitwise AND of Numbers Range](https://leetcode.com/problems/bitwise-and-of-numbers-range/)** - Google, Amazon
            

## 💡 Pro Tips & Shortcuts
- **Set Bit Check**: `if (n & (1 << i))` checks if ith bit is set.
- **Toggle Bit**: `n ^= (1 << i)`.
- **Clear Bit**: `n &= ~(1 << i)`.
- **Count Set Bits**: `__builtin_popcount(n)` (GCC builtin) or `bitset<32>(n).count()`.
- **Power of 2**: `n > 0 && (n & (n - 1)) == 0`.
- **LSB**: `n & -n` extracts the lowest set bit.', 4, NULL) ON CONFLICT (topic_id) DO NOTHING;
INSERT INTO dsa_topics (topic_id, module_id, title, content, order_index, created_at) VALUES (95, 7, '📝 Extra Practice', '
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

## 🏆 FAANG/MAANG Favorites

- **[Letter Combinations Phone Number](https://leetcode.com/problems/letter-combinations-of-a-phone-number/)** - Amazon, Google, Uber
- **[Generate Parentheses](https://leetcode.com/problems/generate-parentheses/)** - Amazon, Google, Facebook
- **[Word Search](https://leetcode.com/problems/word-search/)** - Amazon, Microsoft, Facebook
- **[Palindrome Partitioning](https://leetcode.com/problems/palindrome-partitioning/)** - Google, Amazon
- **[Combination Sum II](https://leetcode.com/problems/combination-sum-ii/)** - Amazon, Facebook
            

## 💡 Pro Tips & Shortcuts
- **Base Case**: Always define the exit condition first!
- **Pruning**: Stop exploring paths early if they violate constraints (saves huge time).
- **Memoization**: If parameters repeat, store results to convert recursion to DP.', 4, NULL) ON CONFLICT (topic_id) DO NOTHING;
INSERT INTO dsa_topics (topic_id, module_id, title, content, order_index, created_at) VALUES (96, 8, '📝 Extra Practice', '
# 📝 Extra Practice - Linked Lists

## 🎯 Basic Operations

- **[Middle of the Linked List](https://leetcode.com/problems/middle-of-the-linked-list/)** - LeetCode Easy
- **[Merge Two Sorted Lists](https://leetcode.com/problems/merge-two-sorted-lists/)** - LeetCode Easy
- **[Remove Nth Node From End](https://leetcode.com/problems/remove-nth-node-from-end-of-list/)** - LeetCode Medium
- **[Delete without head pointer](https://www.geeksforgeeks.org/problems/delete-without-head-pointer/1)** - GFG Easy
- **[Remove Duplicates from Sorted List](https://leetcode.com/problems/remove-duplicates-from-sorted-list/)** - LeetCode Easy

## 🚀 Advanced Problems

- **[Linked List Cycle](https://leetcode.com/problems/linked-list-cycle/)** - LeetCode Easy
- **[Linked List Cycle II](https://leetcode.com/problems/linked-list-cycle-ii/)** - LeetCode Medium
- **[Intersection of Two Linked Lists](https://leetcode.com/problems/intersection-of-two-linked-lists/)** - LeetCode Easy
- **[Reverse Nodes in k-Group](https://leetcode.com/problems/reverse-nodes-in-k-group/)** - LeetCode Hard
- **[Flatten a Linked List](https://www.geeksforgeeks.org/problems/flattening-a-linked-list/1)** - GFG Hard
- **[Sort List](https://leetcode.com/problems/sort-list/)** - LeetCode Medium

## 💡 Key Techniques
Fast & Slow Pointers (Floyd''s Cycle), Dummy Node technique, In-place reversal

## 🏆 FAANG/MAANG Favorites

- **[Reverse Linked List](https://leetcode.com/problems/reverse-linked-list/)** - Amazon ⭐ Most Asked LL Problem
- **[Add Two Numbers](https://leetcode.com/problems/add-two-numbers/)** - Amazon, Microsoft, Facebook
- **[Palindrome Linked List](https://leetcode.com/problems/palindrome-linked-list/)** - Amazon, Facebook
- **[Copy List with Random Pointer](https://leetcode.com/problems/copy-list-with-random-pointer/)** - Amazon, Microsoft, Bloomberg
- **[Odd Even Linked List](https://leetcode.com/problems/odd-even-linked-list/)** - Amazon, Microsoft
- **[Rotate List](https://leetcode.com/problems/rotate-list/)** - Microsoft, Amazon
- **[Reorder List](https://leetcode.com/problems/reorder-list/)** - Amazon, Facebook
            

## 💡 Pro Tips & Shortcuts
- **Dummy Node**: Use a dummy head node to simplify edge cases (inserting/deleting at head).
- **Fast & Slow**: Use two pointers (slow moves 1 step, fast moves 2) to find middle or detect cycles.
- **Reverse**: Master the 3-pointer approach (prev, curr, next) for reversing.', 4, NULL) ON CONFLICT (topic_id) DO NOTHING;
INSERT INTO dsa_topics (topic_id, module_id, title, content, order_index, created_at) VALUES (99, 11, '📝 Extra Practice', '
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

## 🏆 FAANG/MAANG Favorites

- **[Meeting Rooms II](https://leetcode.com/problems/meeting-rooms-ii/)** - Google, Amazon, Facebook (Premium)
- **[Task Scheduler](https://leetcode.com/problems/task-scheduler/)** - Facebook, Amazon
- **[Ugly Number II](https://leetcode.com/problems/ugly-number-ii/)** - Amazon, Google
- **[Reorganize String](https://leetcode.com/problems/reorganize-string/)** - Google, Amazon
            

## 💡 Pro Tips & Shortcuts
- **Kth Elements**:
  - Find Kth Largest → Use Min Heap of size K.
  - Find Kth Smallest → Use Max Heap of size K.
- **Complexity**: Push/Pop is O(log N), Top is O(1).
- **Make Heap**: `make_heap(v.begin(), v.end())` converts vector to heap in O(N).', 4, NULL) ON CONFLICT (topic_id) DO NOTHING;
INSERT INTO dsa_topics (topic_id, module_id, title, content, order_index, created_at) VALUES (97, 9, '📝 Extra Practice', '
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

## 🏆 FAANG/MAANG Favorites

- **[Trapping Rain Water](https://leetcode.com/problems/trapping-rain-water/)** - Amazon, Google, Facebook ⭐
- **[Decode String](https://leetcode.com/problems/decode-string/)** - Google, Microsoft
- **[Asteroid Collision](https://leetcode.com/problems/asteroid-collision/)** - Amazon, Google
- **[Online Stock Span](https://leetcode.com/problems/online-stock-span/)** - Google, Amazon
- **[Evaluate Reverse Polish Notation](https://leetcode.com/problems/evaluate-reverse-polish-notation/)** - Amazon, LinkedIn
            

## 💡 Pro Tips & Shortcuts
- **Stack**: LIFO (Last In, First Out). Use for parsing, backtracking, and "next greater" problems.
- **Queue**: FIFO (First In, First Out). Use for BFS.
- **Deque**: Double-ended queue. Useful for sliding window maximum.
- **Priority Queue**: `priority_queue<int>` (Max Heap) by default. Use `priority_queue<int, vector<int>, greater<int>>` for Min Heap.', 5, NULL) ON CONFLICT (topic_id) DO NOTHING;
INSERT INTO dsa_topics (topic_id, module_id, title, content, order_index, created_at) VALUES (50, 5, 'Trie (Prefix Tree)', '
# Trie Data Structure

```cpp
class TrieNode {
public:
    unordered_map<char, TrieNode*> children;
    bool isEnd;
    TrieNode() : isEnd(false) {}
};

class Trie {
    TrieNode* root;
public:
    Trie() { root = new TrieNode(); }
    
    void insert(string word) {
        TrieNode* node = root;
        for (char c : word) {
            if (!node->children[c]) {
                node->children[c] = new TrieNode();
            }
            node = node->children[c];
        }
        node->isEnd = true;
    }
    
    bool search(string word) {
        TrieNode* node = root;
        for (char c : word) {
            if (!node->children[c]) return false;
            node = node->children[c];
        }
        return node->isEnd;
    }
    
    bool startsWith(string prefix) {
        TrieNode* node = root;
        for (char c : prefix) {
            if (!node->children[c]) return false;
            node = node->children[c];
        }
        return true;
    }
};
```

## Applications
- Autocomplete
- Spell checker
- IP routing
- Word search
', 5, NULL) ON CONFLICT (topic_id) DO NOTHING;
INSERT INTO dsa_topics (topic_id, module_id, title, content, order_index, created_at) VALUES (30, 1, 'STL Containers', '
# STL Containers

STL (Standard Template Library) provides ready-to-use containers to store data.

## 1. Vector (Dynamic Array)
```cpp
#include <vector>

vector<int> v = {1, 2, 3};
v.push_back(4);    // Add to end: {1,2,3,4}
v.pop_back();      // Remove last: {1,2,3}
v.size();          // Length: 3
v[0];              // Access: 1
v.clear();         // Empty vector
```

## 2. Set (Unique, Sorted Elements)
```cpp
#include <set>

set<int> s;
s.insert(5);       // {5}
s.insert(2);       // {2, 5} (sorted)
s.insert(2);       // {2, 5} (no duplicates)
s.erase(2);        // {5}
s.count(5);        // 1 (exists)
s.size();          // 1
```

## 3. Map (Key-Value Pairs)
```cpp
#include <map>

map<string, int> age;
age["Alice"] = 25;
age["Bob"] = 30;

cout << age["Alice"];  // 25
age.count("Alice");    // 1 (exists)
age.erase("Bob");      // Remove Bob

// Iterate
for (auto pair : age) {
    cout << pair.first << ": " << pair.second;
}
```

## 4. Unordered_map (Hash Map - Faster)
```cpp
#include <unordered_map>

unordered_map<int, string> m;
m[1] = "One";
m[2] = "Two";

// O(1) average lookup vs O(log n) in map
```

## 5. Stack (LIFO)
```cpp
#include <stack>

stack<int> st;
st.push(10);
st.push(20);
st.top();      // 20 (peek)
st.pop();      // Remove top
st.empty();    // Is empty?
```

## 6. Queue (FIFO)
```cpp
#include <queue>

queue<int> q;
q.push(10);
q.push(20);
q.front();     // 10
q.back();      // 20
q.pop();       // Remove front
```

## 7. Priority Queue (Heap)
```cpp
#include <queue>

priority_queue<int> pq;  // Max heap by default
pq.push(10);
pq.push(30);
pq.push(20);
pq.top();      // 30 (max)
pq.pop();      // Remove max
```

## Container Comparison
| Container | Ordered? | Unique? | Access | Insert/Delete |
|-----------|----------|---------|--------|---------------|
| Vector | No | No | O(1) | O(n) |
| Set | Yes | Yes | O(log n) | O(log n) |
| Map | Yes | N/A | O(log n) | O(log n) |
| Unordered_map | No | N/A | O(1) avg | O(1) avg |
| Stack | No | No | O(1) top | O(1) |
| Queue | No | No | O(1) front/back | O(1) |

## When to Use What?
- **Vector**: Default choice for lists
- **Set**: Unique elements, need sorted order
- **Map**: Store key-value pairs, need sorted keys
- **Unordered_map**: Fast lookups, don''t care about order
- **Stack**: LIFO operations (undo, parentheses matching)
- **Queue**: FIFO operations (BFS, task scheduling)
- **Priority Queue**: Always need min/max element
            

## Tips & Tricks
- Practice this concept with multiple problems
- Understand the why, not just the how
- Draw diagrams to visualize the concept
- Start with simple examples before complex ones

## Related Problems
- [Two Sum](/problems/1241) - Use unordered_map
- Practice using different containers for different problem types', 5, NULL) ON CONFLICT (topic_id) DO NOTHING;
INSERT INTO dsa_topics (topic_id, module_id, title, content, order_index, created_at) VALUES (94, 6, '📝 Extra Practice', '
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
Practice: Aggressive Cows, Book Allocation, Painter''s Partition

## 🏆 FAANG/MAANG Favorites

- **[Sort Colors](https://leetcode.com/problems/sort-colors/)** - Microsoft, Amazon
- **[Search a 2D Matrix](https://leetcode.com/problems/search-a-2d-matrix/)** - Amazon, Microsoft
- **[Find Peak Element](https://leetcode.com/problems/find-peak-element/)** - Google, Facebook
- **[Kth Largest Element](https://leetcode.com/problems/kth-largest-element-in-an-array/)** - Facebook, Amazon, LinkedIn
- **[Insert Interval](https://leetcode.com/problems/insert-interval/)** - Google, Facebook
            

## 💡 Pro Tips & Shortcuts
- **Binary Search**: `binary_search(v.begin(), v.end(), key)` returns true/false.
- **Lower Bound**: `lower_bound(v.begin(), v.end(), key)` returns iterator to first element ≥ key.
- **Upper Bound**: `upper_bound(v.begin(), v.end(), key)` returns iterator to first element > key.
- **Custom Sort**: Use lambda functions: `sort(v.begin(), v.end(), [](int a, int b) { return a > b; });` for descending.', 5, NULL) ON CONFLICT (topic_id) DO NOTHING;
INSERT INTO dsa_topics (topic_id, module_id, title, content, order_index, created_at) VALUES (61, 10, 'Serialize and Deserialize Binary Tree', '
# Serialize and Deserialize

## Using Preorder Traversal
```cpp
class Codec {
public:
    string serialize(TreeNode* root) {
        if (!root) return "null,";
        return to_string(root->val) + "," + 
               serialize(root->left) + 
               serialize(root->right);
    }
    
    TreeNode* deserialize(string data) {
        queue<string> q;
        stringstream ss(data);
        string item;
        while (getline(ss, item, '','')) {
            q.push(item);
        }
        return helper(q);
    }
    
private:
    TreeNode* helper(queue<string>& q) {
        string val = q.front();
        q.pop();
        if (val == "null") return nullptr;
        
        TreeNode* root = new TreeNode(stoi(val));
        root->left = helper(q);
        root->right = helper(q);
        return root;
    }
};
```

## Using Level Order
```cpp
string serialize(TreeNode* root) {
    if (!root) return "";
    string result;
    queue<TreeNode*> q;
    q.push(root);
    
    while (!q.empty()) {
        TreeNode* node = q.front();
        q.pop();
        
        if (node) {
            result += to_string(node->val) + ",";
            q.push(node->left);
            q.push(node->right);
        } else {
            result += "null,";
        }
    }
    return result;
}
```
', 5, NULL) ON CONFLICT (topic_id) DO NOTHING;
INSERT INTO dsa_topics (topic_id, module_id, title, content, order_index, created_at) VALUES (71, 15, 'Combinatorics (nCr, nPr, Catalan)', '
# Combinatorics

## nCr (n Choose r)
```cpp
const int MOD = 1e9 + 7;
const int MAXN = 1e6;
long long fact[MAXN + 1];
long long invFact[MAXN + 1];

long long power(long long a, long long b, long long mod) {
    long long result = 1;
    while (b > 0) {
        if (b & 1) result = (result * a) % mod;
        a = (a * a) % mod;
        b >>= 1;
    }
    return result;
}

void precompute() {
    fact[0] = 1;
    for (int i = 1; i <= MAXN; i++) {
        fact[i] = (fact[i-1] * i) % MOD;
    }
    invFact[MAXN] = power(fact[MAXN], MOD - 2, MOD);
    for (int i = MAXN - 1; i >= 0; i--) {
        invFact[i] = (invFact[i+1] * (i+1)) % MOD;
    }
}

long long nCr(int n, int r) {
    if (r > n || r < 0) return 0;
    return (fact[n] * invFact[r] % MOD) * invFact[n-r] % MOD;
}

long long nPr(int n, int r) {
    if (r > n || r < 0) return 0;
    return (fact[n] * invFact[n-r]) % MOD;
}
```

## Catalan Numbers
```cpp
long long catalan(int n) {
    return nCr(2*n, n) * power(n+1, MOD-2, MOD) % MOD;
}
// Catalan: 1, 1, 2, 5, 14, 42, ...
// Applications: BST count, parentheses combinations
```

## Pascal''s Triangle
```cpp
vector<vector<int>> pascalTriangle(int n) {
    vector<vector<int>> triangle(n);
    for (int i = 0; i < n; i++) {
        triangle[i].resize(i + 1, 1);
        for (int j = 1; j < i; j++) {
            triangle[i][j] = triangle[i-1][j-1] + triangle[i-1][j];
        }
    }
    return triangle;
}
```
', 5, NULL) ON CONFLICT (topic_id) DO NOTHING;
INSERT INTO dsa_topics (topic_id, module_id, title, content, order_index, created_at) VALUES (91, 3, '📝 Extra Practice', '
# 📝 Extra Practice - Arrays & Vectors

## 🎯 Fundamental Problems

- **[Best Time to Buy and Sell Stock](https://leetcode.com/problems/best-time-to-buy-and-sell-stock/)** - LeetCode Easy
- **[Product of Array Except Self](https://leetcode.com/problems/product-of-array-except-self/)** - LeetCode Medium
- **[Container With Most Water](https://leetcode.com/problems/container-with-most-water/)** - LeetCode Medium
- **[Kadane''s Algorithm](https://www.geeksforgeeks.org/problems/kadanes-algorithm-1587115620/1)** - GFG Medium
- **[Leaders in an array](https://www.geeksforgeeks.org/problems/leaders-in-an-array-1587115620/1)** - GFG Easy
- **[Next Permutation](https://leetcode.com/problems/next-permutation/)** - LeetCode Medium

## 🚀 Advanced Challenges

- **[Subarray Sum Equals K](https://leetcode.com/problems/subarray-sum-equals-k/)** - LeetCode Medium
- **[3Sum](https://leetcode.com/problems/3sum/)** - LeetCode Medium
- **[Trapping Rain Water](https://leetcode.com/problems/trapping-rain-water/)** - LeetCode Hard
- **[Array Manipulation](https://codeforces.com/problemset/problem/1154/A)** - CodeForces 1200
- **[Longest Consecutive Sequence](https://leetcode.com/problems/longest-consecutive-sequence/)** - LeetCode Medium

## 💡 Key Patterns
Two Pointers, Prefix Sum, Sliding Window, Hash Maps for O(1) lookup

## 🏆 FAANG/MAANG Favorites

- **[Two Sum](https://leetcode.com/problems/two-sum/)** - Amazon ⭐ #1 Most Asked
- **[Contains Duplicate](https://leetcode.com/problems/contains-duplicate/)** - Amazon, Apple
- **[Maximum Subarray](https://leetcode.com/problems/maximum-subarray/)** - Amazon, Microsoft, LinkedIn
- **[Merge Sorted Array](https://leetcode.com/problems/merge-sorted-array/)** - Facebook, Microsoft, Apple
- **[Move Zeroes](https://leetcode.com/problems/move-zeroes/)** - Facebook, Amazon
- **[Spiral Matrix](https://leetcode.com/problems/spiral-matrix/)** - Amazon, Microsoft, Google
- **[Rotate Array](https://leetcode.com/problems/rotate-array/)** - Microsoft, Amazon
- **[Set Matrix Zeroes](https://leetcode.com/problems/set-matrix-zeroes/)** - Amazon, Microsoft
            

## 💡 Pro Tips & Shortcuts
- **Fill**: `fill(v.begin(), v.end(), val)` sets all elements to `val`.
- **Sort**: `sort(v.begin(), v.end())` sorts in ascending order (O(N log N)).
- **Reverse**: `reverse(v.begin(), v.end())` reverses the vector.
- **Accumulate**: `accumulate(v.begin(), v.end(), 0)` sums up elements (requires `<numeric>`).', 5, NULL) ON CONFLICT (topic_id) DO NOTHING;
INSERT INTO dsa_topics (topic_id, module_id, title, content, order_index, created_at) VALUES (53, 13, '0/1 Knapsack & Variations', '
# 0/1 Knapsack

```cpp
int knapsack(vector<int>& wt, vector<int>& val, int W) {
    int n = wt.size();
    vector<vector<int>> dp(n + 1, vector<int>(W + 1, 0));
    
    for (int i = 1; i <= n; i++) {
        for (int w = 0; w <= W; w++) {
            if (wt[i-1] <= w) {
                dp[i][w] = max(dp[i-1][w], val[i-1] + dp[i-1][w - wt[i-1]]);
            } else {
                dp[i][w] = dp[i-1][w];
            }
        }
    }
    return dp[n][W];
}
```

## Space Optimized
```cpp
int knapsack(vector<int>& wt, vector<int>& val, int W) {
    vector<int> dp(W + 1, 0);
    for (int i = 0; i < wt.size(); i++) {
        for (int w = W; w >= wt[i]; w--) {
            dp[w] = max(dp[w], val[i] + dp[w - wt[i]]);
        }
    }
    return dp[W];
}
```

## Subset Sum
```cpp
bool subsetSum(vector<int>& nums, int target) {
    vector<bool> dp(target + 1, false);
    dp[0] = true;
    for (int num : nums) {
        for (int i = target; i >= num; i--) {
            dp[i] = dp[i] || dp[i - num];
        }
    }
    return dp[target];
}
```
', 5, NULL) ON CONFLICT (topic_id) DO NOTHING;
INSERT INTO dsa_topics (topic_id, module_id, title, content, order_index, created_at) VALUES (41, 12, 'Topological Sort', '
# Topological Sort

A linear ordering of vertices in a Directed Acyclic Graph (DAG) such that for every edge u → v, u comes before v.

## Use Cases
- Course prerequisites
- Task scheduling
- Build systems (dependencies)

## Method 1: DFS-based
```cpp
void dfs(int u, vector<vector<int>>& adj, vector<bool>& visited, stack<int>& st) {
    visited[u] = true;
    
    for (int v : adj[u]) {
        if (!visited[v]) {
            dfs(v, adj, visited, st);
        }
    }
    st.push(u);  // Add to stack AFTER visiting all neighbors
}

vector<int> topologicalSort(int n, vector<vector<int>>& adj) {
    vector<bool> visited(n, false);
    stack<int> st;
    
    for (int i = 0; i < n; i++) {
        if (!visited[i]) {
            dfs(i, adj, visited, st);
        }
    }
    
    vector<int> result;
    while (!st.empty()) {
        result.push_back(st.top());
        st.pop();
    }
    return result;
}
```

## Method 2: Kahn''s Algorithm (BFS-based)
```cpp
vector<int> topologicalSort(int n, vector<vector<int>>& adj) {
    vector<int> indegree(n, 0);
    
    // Calculate indegrees
    for (int u = 0; u < n; u++) {
        for (int v : adj[u]) {
            indegree[v]++;
        }
    }
    
    queue<int> q;
    for (int i = 0; i < n; i++) {
        if (indegree[i] == 0) {
            q.push(i);
        }
    }
    
    vector<int> result;
    while (!q.empty()) {
        int u = q.front();
        q.pop();
        result.push_back(u);
        
        for (int v : adj[u]) {
            indegree[v]--;
            if (indegree[v] == 0) {
                q.push(v);
            }
        }
    }
    
    // Check for cycle
    if (result.size() != n) {
        return {};  // Graph has cycle, topological sort not possible
    }
    return result;
}
```

## Cycle Detection
If topological sort result has fewer than n vertices, graph contains a cycle.

## Time Complexity
- **O(V + E)** for both methods

## Tips & Tricks
- Only works on **DAGs** (Directed Acyclic Graphs)
- Multiple valid topological orderings possible
- Kahn''s can detect cycles (if queue empties before processing all nodes)
- Use for dependency resolution problems
            ', 5, NULL) ON CONFLICT (topic_id) DO NOTHING;
INSERT INTO dsa_topics (topic_id, module_id, title, content, order_index, created_at) VALUES (98, 10, '📝 Extra Practice', '
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

## 🏆 FAANG/MAANG Favorites

- **[Same Tree](https://leetcode.com/problems/same-tree/)** - Bloomberg, Amazon
- **[Invert Binary Tree](https://leetcode.com/problems/invert-binary-tree/)** - Google ⭐ Famous
- **[Binary Tree Right Side View](https://leetcode.com/problems/binary-tree-right-side-view/)** - Amazon, Facebook
- **[Diameter of Binary Tree](https://leetcode.com/problems/diameter-of-binary-tree/)** - Google, Facebook
- **[Path Sum II](https://leetcode.com/problems/path-sum-ii/)** - Amazon, Facebook
- **[Construct Binary Tree from Preorder Inorder](https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/)** - Amazon, Microsoft
            

## 💡 Pro Tips & Shortcuts
- **Inorder Traversal**: In a BST, inorder traversal gives sorted values.
- **Height**: `height = 1 + max(left_height, right_height)`.
- **BFS**: Use a queue for level-order traversal.
- **DFS**: Use recursion (or stack) for preorder/inorder/postorder.', 6, NULL) ON CONFLICT (topic_id) DO NOTHING;
INSERT INTO dsa_topics (topic_id, module_id, title, content, order_index, created_at) VALUES (103, 15, '📝 Extra Practice', '
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
Fermat''s Little Theorem, Chinese Remainder Theorem, Euler''s Totient, Fast Exponentiation

## 🏆 FAANG/MAANG Favorites

- **[Sqrt(x)](https://leetcode.com/problems/sqrtx/)** - Bloomberg, Facebook
- **[Factorial Trailing Zeroes](https://leetcode.com/problems/factorial-trailing-zeroes/)** - Amazon, Bloomberg
- **[Excel Sheet Column Number](https://leetcode.com/problems/excel-sheet-column-number/)** - Microsoft, Amazon, Facebook
- **[Reverse Integer](https://leetcode.com/problems/reverse-integer/)** - Amazon, Bloomberg
            

## 💡 Pro Tips & Shortcuts
- **GCD/LCM**: `__gcd(a, b)` and `lcm = (a * b) / gcd(a, b)`.
- **Modulo Arithmetic**: `(a + b) % m`, `(a * b) % m`. For subtraction: `(a - b + m) % m`.
- **Even/Odd**: `if (n & 1)` is faster than `if (n % 2 != 0)`.
- **Sieve**: Precompute primes up to N using Sieve of Eratosthenes for O(1) prime checks.', 6, NULL) ON CONFLICT (topic_id) DO NOTHING;
INSERT INTO dsa_topics (topic_id, module_id, title, content, order_index, created_at) VALUES (42, 12, 'Disjoint Set Union (DSU/Union-Find)', '
# Disjoint Set Union (Union-Find)

DSU is a data structure that efficiently handles:
1. **Find**: Which set does an element belong to?
2. **Union**: Merge two sets

## Implementation
```cpp
class DSU {
    vector<int> parent;
    vector<int> rank;
    
public:
    DSU(int n) {
        parent.resize(n);
        rank.resize(n, 0);
        iota(parent.begin(), parent.end(), 0);  // parent[i] = i
    }
    
    // Find with path compression
    int find(int x) {
        if (parent[x] != x) {
            parent[x] = find(parent[x]);  // Path compression
        }
        return parent[x];
    }
    
    // Union by rank
    bool unite(int x, int y) {
        int px = find(x);
        int py = find(y);
        
        if (px == py) return false;  // Already in same set
        
        // Union by rank
        if (rank[px] < rank[py]) {
            parent[px] = py;
        } else if (rank[px] > rank[py]) {
            parent[py] = px;
        } else {
            parent[py] = px;
            rank[px]++;
        }
        return true;
    }
    
    bool connected(int x, int y) {
        return find(x) == find(y);
    }
};
```

## Key Optimizations

### 1. Path Compression
Flatten the tree during find operations.
```cpp
int find(int x) {
    if (parent[x] != x) {
        parent[x] = find(parent[x]);  // Compress path
    }
    return parent[x];
}
```

### 2. Union by Rank
Attach smaller tree under larger tree.

## Time Complexity
- **Find**: O(α(n)) ≈ O(1) amortized (inverse Ackermann function)
- **Union**: O(α(n)) ≈ O(1) amortized

## Applications

### Check if Graph is Connected
```cpp
bool isConnected(int n, vector<pair<int, int>>& edges) {
    DSU dsu(n);
    for (auto [u, v] : edges) {
        dsu.unite(u, v);
    }
    
    int root = dsu.find(0);
    for (int i = 1; i < n; i++) {
        if (dsu.find(i) != root) return false;
    }
    return true;
}
```

### Count Connected Components
```cpp
int countComponents(int n, vector<pair<int, int>>& edges) {
    DSU dsu(n);
    for (auto [u, v] : edges) {
        dsu.unite(u, v);
    }
    
    unordered_set<int> roots;
    for (int i = 0; i < n; i++) {
        roots.insert(dsu.find(i));
    }
    return roots.size();
}
```

### Detect Cycle in Undirected Graph
```cpp
bool hasCycle(int n, vector<pair<int, int>>& edges) {
    DSU dsu(n);
    for (auto [u, v] : edges) {
        if (!dsu.unite(u, v)) {
            return true;  // u and v already connected → cycle!
        }
    }
    return false;
}
```

## Advanced: Size Tracking
```cpp
class DSU {
    vector<int> parent, size;
public:
    DSU(int n) : parent(n), size(n, 1) {
        iota(parent.begin(), parent.end(), 0);
    }
    
    int find(int x) {
        if (parent[x] != x) parent[x] = find(parent[x]);
        return parent[x];
    }
    
    bool unite(int x, int y) {
        int px = find(x), py = find(y);
        if (px == py) return false;
        
        if (size[px] < size[py]) swap(px, py);
        parent[py] = px;
        size[px] += size[py];
        return true;
    }
    
    int getSize(int x) {
        return size[find(x)];
    }
};
```

## Tips & Tricks
- Always use path compression + union by rank
- For Kruskal''s MST, DSU is essential
- Can track component sizes
- Almost constant time operations (α(n) ≈ 4 for practical sizes)
- Remember: parent[i] = i for isolated nodes

## Common Use Cases
- Kruskal''s MST algorithm
- Cycle detection in undirected graphs
- Dynamic connectivity queries
- Network connectivity
- Image segmentation (finding connected pixels)
            ', 6, NULL) ON CONFLICT (topic_id) DO NOTHING;
INSERT INTO dsa_topics (topic_id, module_id, title, content, order_index, created_at) VALUES (65, 5, 'Rabin-Karp Algorithm (Rolling Hash)', '
# Rabin-Karp Algorithm

Pattern matching using rolling hash.

```cpp
const int MOD = 1e9 + 7;
const int BASE = 31;

long long computeHash(string s) {
    long long hash = 0;
    long long pow = 1;
    for (char c : s) {
        hash = (hash + (c - ''a'' + 1) * pow) % MOD;
        pow = (pow * BASE) % MOD;
    }
    return hash;
}

vector<int> rabinKarp(string text, string pattern) {
    int n = text.size(), m = pattern.size();
    if (m > n) return {};
    
    long long patternHash = computeHash(pattern);
    long long textHash = computeHash(text.substr(0, m));
    
    vector<int> matches;
    if (textHash == patternHash && text.substr(0, m) == pattern) {
        matches.push_back(0);
    }
    
    long long pow = 1;
    for (int i = 0; i < m - 1; i++) pow = (pow * BASE) % MOD;
    
    for (int i = 1; i <= n - m; i++) {
        textHash = (textHash - (text[i-1] - ''a'' + 1) + MOD) % MOD;
        textHash = (textHash * BASE) % MOD;
        textHash = (textHash + (text[i+m-1] - ''a'' + 1)) % MOD;
        
        if (textHash == patternHash && text.substr(i, m) == pattern) {
            matches.push_back(i);
        }
    }
    return matches;
}
```

**Time**: O(n + m) average case
', 6, NULL) ON CONFLICT (topic_id) DO NOTHING;
INSERT INTO dsa_topics (topic_id, module_id, title, content, order_index, created_at) VALUES (31, 1, 'STL Algorithms', '
# STL Algorithms

STL provides powerful algorithms that work on containers.

## 1. Sorting
```cpp
#include <algorithm>

vector<int> v = {5, 2, 8, 1, 9};

// Sort in ascending order
sort(v.begin(), v.end());
// Result: {1, 2, 5, 8, 9}

// Sort in descending order
sort(v.begin(), v.end(), greater<int>());
// Result: {9, 8, 5, 2, 1}

// Custom comparator
bool cmp(int a, int b) {
    return a > b;  // Descending
}
sort(v.begin(), v.end(), cmp);
```

## 2. Binary Search (on sorted array)
```cpp
vector<int> v = {1, 2, 5, 8, 9};

// Check if element exists
bool found = binary_search(v.begin(), v.end(), 5);  // true

// Find position (lower_bound)
auto it = lower_bound(v.begin(), v.end(), 5);
int index = it - v.begin();  // 2 (index of 5)

// Upper bound (first element > x)
auto it2 = upper_bound(v.begin(), v.end(), 5);
```

## 3. Min/Max Element
```cpp
vector<int> v = {5, 2, 8, 1, 9};

auto minIt = min_element(v.begin(), v.end());
cout << *minIt;  // 1

auto maxIt = max_element(v.begin(), v.end());
cout << *maxIt;  // 9

// Get both
auto [minIt, maxIt] = minmax_element(v.begin(), v.end());
```

## 4. Reverse
```cpp
vector<int> v = {1, 2, 3, 4, 5};
reverse(v.begin(), v.end());
// Result: {5, 4, 3, 2, 1}
```

## 5. Count
```cpp
vector<int> v = {1, 2, 2, 3, 2, 4};
int cnt = count(v.begin(), v.end(), 2);  // 3
```

## 6. Fill
```cpp
vector<int> v(5);
fill(v.begin(), v.end(), 10);
// Result: {10, 10, 10, 10, 10}
```

## 7. Unique (Remove Duplicates)
**Note**: Array must be sorted first!
```cpp
vector<int> v = {1, 1, 2, 2, 3, 3};
sort(v.begin(), v.end());
auto it = unique(v.begin(), v.end());
v.erase(it, v.end());
// Result: {1, 2, 3}
```

## 8. Accumulate (Sum)
```cpp
#include <numeric>

vector<int> v = {1, 2, 3, 4, 5};
int sum = accumulate(v.begin(), v.end(), 0);  // 15
```

## 9. Next Permutation
```cpp
vector<int> v = {1, 2, 3};
next_permutation(v.begin(), v.end());
// Result: {1, 3, 2}
```

## Tips
- Always include `<algorithm>` header
- Use `begin()` and `end()` for range
- STL algorithms are highly optimized
- Learn these to save time in contests!
            

## Related Problems
- [Binary Search](/problems/1257) - Use built-in binary_search
- Practice sorting and searching problems', 6, NULL) ON CONFLICT (topic_id) DO NOTHING;
INSERT INTO dsa_topics (topic_id, module_id, title, content, order_index, created_at) VALUES (60, 13, 'Longest Increasing Subsequence (LIS)', '
# Longest Increasing Subsequence

## O(n²) DP Solution
```cpp
int lengthOfLIS(vector<int>& nums) {
    int n = nums.size();
    vector<int> dp(n, 1);
    int maxLen = 1;
    
    for (int i = 1; i < n; i++) {
        for (int j = 0; j < i; j++) {
            if (nums[j] < nums[i]) {
                dp[i] = max(dp[i], dp[j] + 1);
            }
        }
        maxLen = max(maxLen, dp[i]);
    }
    return maxLen;
}
```

## O(n log n) Binary Search Solution
```cpp
int lengthOfLIS(vector<int>& nums) {
    vector<int> tail;
    
    for (int num : nums) {
        auto it = lower_bound(tail.begin(), tail.end(), num);
        if (it == tail.end()) {
            tail.push_back(num);
        } else {
            *it = num;
        }
    }
    return tail.size();
}
```

**Variations**: Longest Bitonic Subsequence, Russian Doll Envelopes
', 6, NULL) ON CONFLICT (topic_id) DO NOTHING;
INSERT INTO dsa_topics (topic_id, module_id, title, content, order_index, created_at) VALUES (32, 1, 'Iterators in C++', '
# Iterators in C++

Iterators are objects that point to elements in containers. Think of them as smart pointers.

## Why Iterators?
- **Uniform Access**: Work with any container (vector, set, map)
- **STL Compatibility**: Required for many STL algorithms
- **Flexibility**: Can traverse, modify, and query containers

## Basic Iterator Usage
```cpp
vector<int> v = {1, 2, 3, 4, 5};

// Create iterator
vector<int>::iterator it;

// Or use ''auto'' (C++11)
auto it = v.begin();

// Dereference to get value
cout << *it;  // 1

// Move to next element
it++;
cout << *it;  // 2
```

## Iterating Through Container
```cpp
vector<int> v = {1, 2, 3, 4, 5};

// Method 1: Iterator loop
for (auto it = v.begin(); it != v.end(); it++) {
    cout << *it << " ";
}

// Method 2: Range-based for (C++11) - Preferred
for (int x : v) {
    cout << x << " ";
}
```

## Iterator Types
### 1. begin() and end()
```cpp
v.begin()  // Points to first element
v.end()    // Points PAST last element (not valid to dereference!)
```

### 2. rbegin() and rend() (Reverse)
```cpp
for (auto it = v.rbegin(); it != v.rend(); it++) {
    cout << *it << " ";  // Prints in reverse
}
```

## Iterator Operations
```cpp
vector<int> v = {10, 20, 30, 40, 50};
auto it = v.begin();

*it;        // 10 (value)
it++;       // Move to next
it--;       // Move to previous
it + 2;     // Jump forward 2 positions
it - 2;     // Jump backward 2 positions

// Distance between iterators
int dist = distance(v.begin(), v.end());  // 5
```

## Iterators with Different Containers
### Vector
```cpp
vector<int> v = {1, 2, 3};
for (auto it = v.begin(); it != v.end(); it++) {
    *it = *it * 2;  // Modify elements
}
```

### Set
```cpp
set<int> s = {3, 1, 2};
for (auto it = s.begin(); it != s.end(); it++) {
    cout << *it << " ";  // Prints: 1 2 3 (sorted)
}
```

### Map
```cpp
map<string, int> m = {{"Alice", 25}, {"Bob", 30}};
for (auto it = m.begin(); it != m.end(); it++) {
    cout << it->first << ": " << it->second << endl;
    // Alice: 25
    // Bob: 30
}
```

## Advanced: Insert and Erase with Iterators
```cpp
vector<int> v = {1, 2, 3, 4, 5};

// Erase element at position 2 (value 3)
v.erase(v.begin() + 2);  // {1, 2, 4, 5}

// Insert 10 at position 1
v.insert(v.begin() + 1, 10);  // {1, 10, 2, 4, 5}
```

## Common Patterns
### Find an Element
```cpp
#include <algorithm>

vector<int> v = {1, 2, 3, 4, 5};
auto it = find(v.begin(), v.end(), 3);

if (it != v.end()) {
    cout << "Found at index: " << (it - v.begin());
} else {
    cout << "Not found";
}
```

### Erase All Occurrences
```cpp
v.erase(remove(v.begin(), v.end(), 2), v.end());
// Removes all 2''s from vector
```

## Tips
- Use `auto` to avoid long iterator type names
- Always check `it != container.end()` before dereferencing
- Prefer range-based for loops when you don''t need iterator operations
- Never use invalidated iterators (after insert/erase operations)
            ', 7, NULL) ON CONFLICT (topic_id) DO NOTHING;
INSERT INTO dsa_topics (topic_id, module_id, title, content, order_index, created_at) VALUES (70, 13, 'Matrix Chain Multiplication', '
# Matrix Chain Multiplication

Find minimum number of operations to multiply a chain of matrices.

```cpp
int matrixChainMultiplication(vector<int>& dims) {
    int n = dims.size() - 1;
    vector<vector<int>> dp(n, vector<int>(n, 0));
    
    for (int len = 2; len <= n; len++) {
        for (int i = 0; i < n - len + 1; i++) {
            int j = i + len - 1;
            dp[i][j] = INT_MAX;
            
            for (int k = i; k < j; k++) {
                int cost = dp[i][k] + dp[k+1][j] + dims[i] * dims[k+1] * dims[j+1];
                dp[i][j] = min(dp[i][j], cost);
            }
        }
    }
    return dp[0][n-1];
}
```

**Example**: Matrices A(10×20), B(20×30), C(30×40)  
dims = [10, 20, 30, 40]  
Result: Minimum operations needed

**Time**: O(n³)
', 7, NULL) ON CONFLICT (topic_id) DO NOTHING;
INSERT INTO dsa_topics (topic_id, module_id, title, content, order_index, created_at) VALUES (93, 5, '📝 Extra Practice', '
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
KMP Algorithm, Rabin-Karp, Manacher''s Algorithm for palindromes

## 🏆 FAANG/MAANG Favorites

- **[Valid Anagram](https://leetcode.com/problems/valid-anagram/)** - Amazon, Facebook, Bloomberg
- **[Longest Substring Without Repeating](https://leetcode.com/problems/longest-substring-without-repeating-characters/)** - Amazon ⭐ Top Interview
- **[String to Integer (atoi)](https://leetcode.com/problems/string-to-integer-atoi/)** - Amazon, Microsoft, Bloomberg
- **[Decode String](https://leetcode.com/problems/decode-string/)** - Google, Microsoft
- **[Palindrome Partitioning](https://leetcode.com/problems/palindrome-partitioning/)** - Amazon, Google
- **[Minimum Window Substring](https://leetcode.com/problems/minimum-window-substring/)** - Amazon, Facebook
            

## 💡 Pro Tips & Shortcuts
- **Character Checks**:
  - `isalpha(c)`: Checks if alphabet.
  - `isdigit(c)`: Checks if digit.
  - `isalnum(c)`: Checks if alphanumeric.
  - `islower(c)` / `isupper(c)`: Checks case.
- **Conversions**:
  - `tolower(c)` / `toupper(c)`: Converts case.
  - `stoi(s)`: String to Integer.
  - `to_string(n)`: Integer to String.
- **Substrings**: `s.substr(start_index, length)`.
- **Find**: `s.find("sub")` returns index or `string::npos` if not found.', 7, NULL) ON CONFLICT (topic_id) DO NOTHING;
INSERT INTO dsa_topics (topic_id, module_id, title, content, order_index, created_at) VALUES (54, 12, 'BFS Applications & Variations', '
# BFS Applications

## Multi-Source BFS
```cpp
int shortestPath(vector<vector<int>>& grid) {
    queue<pair<int,int>> q;
    // Add all sources
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < m; j++) {
            if (grid[i][j] == SOURCE) {
                q.push({i, j});
            }
        }
    }
    
    int level = 0;
    while (!q.empty()) {
        int size = q.size();
        for (int i = 0; i < size; i++) {
            auto [x, y] = q.front();
            q.pop();
            // Process neighbors
        }
        level++;
    }
}
```

## 0-1 BFS (Using Deque)
```cpp
int shortestPath01(vector<vector<pair<int,int>>>& adj, int n) {
    vector<int> dist(n, INT_MAX);
    deque<int> dq;
    dist[0] = 0;
    dq.push_front(0);
    
    while (!dq.empty()) {
        int u = dq.front();
        dq.pop_front();
        
        for (auto [v, weight] : adj[u]) {
            if (dist[u] + weight < dist[v]) {
                dist[v] = dist[u] + weight;
                if (weight == 0) dq.push_front(v);
                else dq.push_back(v);
            }
        }
    }
    return dist[n-1];
}
```
', 7, NULL) ON CONFLICT (topic_id) DO NOTHING;
INSERT INTO dsa_topics (topic_id, module_id, title, content, order_index, created_at) VALUES (101, 13, '📝 Extra Practice', '
# 📝 Extra Practice - Dynamic Programming

## 🎯 1D DP Classics

- **[Climbing Stairs](https://leetcode.com/problems/climbing-stairs/)** - LeetCode Easy
- **[House Robber](https://leetcode.com/problems/house-robber/)** - LeetCode Medium
- **[Coin Change](https://leetcode.com/problems/coin-change/)** - LeetCode Medium
- **[Longest Increasing Subsequence](https://leetcode.com/problems/longest-increasing-subsequence/)** - LeetCode Medium
- **[0-1 Knapsack Problem](https://www.geeksforgeeks.org/problems/0-1-knapsack-problem0945/1)** - GFG Medium
- **[Min Cost Climbing Stairs](https://leetcode.com/problems/min-cost-climbing-stairs/)** - LeetCode Easy
- **[Maximum Product Subarray](https://leetcode.com/problems/maximum-product-subarray/)** - LeetCode Medium

## 🚀 2D DP & Hard Problems

- **[Unique Paths](https://leetcode.com/problems/unique-paths/)** - LeetCode Medium
- **[Longest Common Subsequence](https://leetcode.com/problems/longest-common-subsequence/)** - LeetCode Medium
- **[Edit Distance](https://leetcode.com/problems/edit-distance/)** - LeetCode Hard
- **[Regular Expression Matching](https://leetcode.com/problems/regular-expression-matching/)** - LeetCode Hard
- **[Matrix Chain Multiplication](https://www.geeksforgeeks.org/problems/matrix-chain-multiplication0303/1)** - GFG Hard
- **[Frog 1](https://atcoder.jp/contests/dp/tasks/dp_a)** - AtCoder DP
- **[Minimum Path Sum](https://leetcode.com/problems/minimum-path-sum/)** - LeetCode Medium

## 💡 DP Patterns
Fibonacci-like, Knapsack, LIS/LCS, DP on grids, DP on trees

## 🏆 FAANG/MAANG Favorites

- **[Jump Game](https://leetcode.com/problems/jump-game/)** - Amazon, Microsoft
- **[Word Break](https://leetcode.com/problems/word-break/)** - Amazon, Google, Facebook ⭐
- **[Decode Ways](https://leetcode.com/problems/decode-ways/)** - Facebook, Google, Uber
- **[Longest Palindromic Substring](https://leetcode.com/problems/longest-palindromic-substring/)** - Amazon, Microsoft
- **[Maximal Square](https://leetcode.com/problems/maximal-square/)** - Google, Facebook
- **[Partition Equal Subset Sum](https://leetcode.com/problems/partition-equal-subset-sum/)** - Amazon, Google
- **[Best Time to Buy Sell Stock with Cooldown](https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-cooldown/)** - Google
- **[Burst Balloons](https://leetcode.com/problems/burst-balloons/)** - Amazon, Google
            

## 💡 Pro Tips & Shortcuts
- **Initialization**: `memset(dp, -1, sizeof(dp))` is standard for top-down memoization.
- **State Definition**: Clearly define what `dp[i]` represents (e.g., "min cost to reach step i").
- **Space Optimization**: If `dp[i]` only depends on `dp[i-1]` and `dp[i-2]`, you only need 2 variables, not an array.', 8, NULL) ON CONFLICT (topic_id) DO NOTHING;
INSERT INTO dsa_topics (topic_id, module_id, title, content, order_index, created_at) VALUES (55, 12, 'DFS Applications (Cycle, Components, Paths)', '
# DFS Applications

## Detect Cycle in Directed Graph
```cpp
bool hasCycleDFS(int u, vector<vector<int>>& adj, vector<int>& color) {
    color[u] = 1; // Gray (visiting)
    
    for (int v : adj[u]) {
        if (color[v] == 1) return true; // Back edge
        if (color[v] == 0 && hasCycleDFS(v, adj, color)) return true;
    }
    
    color[u] = 2; // Black (visited)
    return false;
}
```

## Count Connected Components
```cpp
void dfs(int u, vector<vector<int>>& adj, vector<bool>& visited) {
    visited[u] = true;
    for (int v : adj[u]) {
        if (!visited[v]) dfs(v, adj, visited);
    }
}

int countComponents(int n, vector<vector<int>>& adj) {
    vector<bool> visited(n, false);
    int count = 0;
    for (int i = 0; i < n; i++) {
        if (!visited[i]) {
            dfs(i, adj, visited);
            count++;
        }
    }
    return count;
}
```

## All Paths from Source to Target
```cpp
void dfs(int u, int target, vector<vector<int>>& adj, vector<int>& path, vector<vector<int>>& result) {
    path.push_back(u);
    if (u == target) {
        result.push_back(path);
    } else {
        for (int v : adj[u]) {
            dfs(v, target, adj, path, result);
        }
    }
    path.pop_back();
}
```
', 8, NULL) ON CONFLICT (topic_id) DO NOTHING;
INSERT INTO dsa_topics (topic_id, module_id, title, content, order_index, created_at) VALUES (64, 1, 'Fast Input/Output Techniques', '
# Fast I/O Techniques for Competitive Programming

## Speed Up cin/cout
```cpp
int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    
    int n;
    cin >> n;
    // Fast I/O now
}
```

## Reading Until EOF
```cpp
int n;
while (cin >> n) {
    // Process n
}
```

## Reading Entire Line
```cpp
string line;
getline(cin, line);
```

## Multiple Test Cases
```cpp
int t;
cin >> t;
while (t--) {
    // Solve test case
}
```
', 8, NULL) ON CONFLICT (topic_id) DO NOTHING;
INSERT INTO dsa_topics (topic_id, module_id, title, content, order_index, created_at) VALUES (89, 1, '📝 Extra Practice', '
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

## 🏆 FAANG/MAANG Favorites

- **[FizzBuzz](https://leetcode.com/problems/fizz-buzz/)** - Microsoft, Amazon
- **[Happy Number](https://leetcode.com/problems/happy-number/)** - Google, LinkedIn
- **[Excel Sheet Column Number](https://leetcode.com/problems/excel-sheet-column-number/)** - Microsoft, Amazon
- **[Missing Number](https://leetcode.com/problems/missing-number/)** - Amazon, Bloomberg
            

## 💡 Pro Tips & Shortcuts
- **Built-in Min/Max**: Use `min(a, b)` and `max(a, b)` instead of if-else.
- **Swap**: `swap(a, b)` swaps values instantly.
- **Fast I/O**: Use `ios_base::sync_with_stdio(false); cin.tie(NULL);` for faster execution in competitive programming.
- **GCD**: `__gcd(a, b)` finds the greatest common divisor (requires `<algorithm>`).', 9, NULL) ON CONFLICT (topic_id) DO NOTHING;
INSERT INTO dsa_topics (topic_id, module_id, title, content, order_index, created_at) VALUES (58, 12, 'Bellman-Ford Algorithm (Negative Weights)', '
# Bellman-Ford Algorithm

Handles negative edge weights, detects negative cycles.

```cpp
struct Edge {
    int u, v, weight;
};

vector<int> bellmanFord(int n, int source, vector<Edge>& edges) {
    vector<int> dist(n, INT_MAX);
    dist[source] = 0;
    
    // Relax all edges n-1 times
    for (int i = 0; i < n - 1; i++) {
        for (auto& e : edges) {
            if (dist[e.u] != INT_MAX && dist[e.u] + e.weight < dist[e.v]) {
                dist[e.v] = dist[e.u] + e.weight;
            }
        }
    }
    
    // Check for negative cycles
    for (auto& e : edges) {
        if (dist[e.u] != INT_MAX && dist[e.u] + e.weight < dist[e.v]) {
            cout << "Negative cycle detected!" << endl;
            return {};
        }
    }
    
    return dist;
}
```

**Time**: O(VE)  
**Use when**: Graph has negative weights or need to detect negative cycles
', 9, NULL) ON CONFLICT (topic_id) DO NOTHING;
INSERT INTO dsa_topics (topic_id, module_id, title, content, order_index, created_at) VALUES (59, 12, 'Bipartite Graph Detection', '
# Bipartite Graph

A graph whose vertices can be divided into two disjoint sets such that no two vertices within the same set are adjacent.

## Using BFS (2-Coloring)
```cpp
bool isBipartite(vector<vector<int>>& adj) {
    int n = adj.size();
    vector<int> color(n, -1);
    
    for (int i = 0; i < n; i++) {
        if (color[i] == -1) {
            queue<int> q;
            q.push(i);
            color[i] = 0;
            
            while (!q.empty()) {
                int u = q.front();
                q.pop();
                
                for (int v : adj[u]) {
                    if (color[v] == -1) {
                        color[v] = 1 - color[u];
                        q.push(v);
                    } else if (color[v] == color[u]) {
                        return false;
                    }
                }
            }
        }
    }
    return true;
}
```

**Applications**: Job matching, scheduling problems
', 10, NULL) ON CONFLICT (topic_id) DO NOTHING;
INSERT INTO dsa_topics (topic_id, module_id, title, content, order_index, created_at) VALUES (69, 12, 'Strongly Connected Components (Kosaraju)', '
# Strongly Connected Components (SCC)

## Kosaraju''s Algorithm

```cpp
void dfs1(int u, vector<vector<int>>& adj, vector<bool>& visited, stack<int>& finishStack) {
    visited[u] = true;
    for (int v : adj[u]) {
        if (!visited[v]) dfs1(v, adj, visited, finishStack);
    }
    finishStack.push(u);
}

void dfs2(int u, vector<vector<int>>& revAdj, vector<bool>& visited, vector<int>& component) {
    visited[u] = true;
    component.push_back(u);
    for (int v : revAdj[u]) {
        if (!visited[v]) dfs2(v, revAdj, visited, component);
    }
}

vector<vector<int>> findSCCs(int n, vector<vector<int>>& adj) {
    // Step 1: Fill order of vertices by finish time
    vector<bool> visited(n, false);
    stack<int> finishStack;
    
    for (int i = 0; i < n; i++) {
        if (!visited[i]) dfs1(i, adj, visited, finishStack);
    }
    
    // Step 2: Create reverse graph
    vector<vector<int>> revAdj(n);
    for (int u = 0; u < n; u++) {
        for (int v : adj[u]) {
            revAdj[v].push_back(u);
        }
    }
    
    // Step 3: DFS in reverse graph
    fill(visited.begin(), visited.end(), false);
    vector<vector<int>> sccs;
    
    while (!finishStack.empty()) {
        int u = finishStack.top();
        finishStack.pop();
        
        if (!visited[u]) {
            vector<int> component;
            dfs2(u, revAdj, visited, component);
            sccs.push_back(component);
        }
    }
    
    return sccs;
}
```

**Time**: O(V + E)  
**Applications**: Finding cycles in directed graphs, condensation graph
', 11, NULL) ON CONFLICT (topic_id) DO NOTHING;
INSERT INTO dsa_topics (topic_id, module_id, title, content, order_index, created_at) VALUES (100, 12, '📝 Extra Practice', '
# 📝 Extra Practice - Graphs

## 🎯 Graph Traversals

- **[Number of Islands](https://leetcode.com/problems/number-of-islands/)** - LeetCode Medium
- **[Clone Graph](https://leetcode.com/problems/clone-graph/)** - LeetCode Medium
- **[Course Schedule](https://leetcode.com/problems/course-schedule/)** - LeetCode Medium
- **[BFS of graph](https://www.geeksforgeeks.org/problems/bfs-traversal-of-graph/1)** - GFG Easy
- **[DFS of Graph](https://www.geeksforgeeks.org/problems/depth-first-traversal-for-a-graph/1)** - GFG Easy
- **[All Paths From Source to Target](https://leetcode.com/problems/all-paths-from-source-to-target/)** - LeetCode Medium
- **[Keys and Rooms](https://leetcode.com/problems/keys-and-rooms/)** - LeetCode Medium

## 🚀 Shortest Path & Advanced

- **[Network Delay Time](https://leetcode.com/problems/network-delay-time/)** - LeetCode Medium
- **[Cheapest Flights Within K Stops](https://leetcode.com/problems/cheapest-flights-within-k-stops/)** - LeetCode Medium
- **[Dijkstra Algorithm](https://www.geeksforgeeks.org/problems/implementing-dijkstra-set-1-adjacency-matrix/1)** - GFG Medium
- **[Detect cycle in undirected graph](https://www.geeksforgeeks.org/problems/detect-cycle-in-an-undirected-graph/1)** - GFG Medium
- **[Bellman Ford Algorithm](https://www.geeksforgeeks.org/problems/distance-from-the-source-bellman-ford-algorithm/1)** - GFG Medium
- **[Floyd Warshall](https://www.geeksforgeeks.org/problems/implementing-floyd-warshall2042/1)** - GFG Medium

## 💡 Graph Algorithms
BFS/DFS, Dijkstra''s, Topological Sort, Union-Find (DSU)

## 🏆 FAANG/MAANG Favorites

- **[Pacific Atlantic Water Flow](https://leetcode.com/problems/pacific-atlantic-water-flow/)** - Google, Amazon
- **[Word Ladder](https://leetcode.com/problems/word-ladder/)** - Amazon, Facebook, Google ⭐
- **[Shortest Path in Binary Matrix](https://leetcode.com/problems/shortest-path-in-binary-matrix/)** - Amazon, Google
- **[Graph Valid Tree](https://leetcode.com/problems/graph-valid-tree/)** - Google, Facebook (Premium)
- **[Alien Dictionary](https://leetcode.com/problems/alien-dictionary/)** - Google, Facebook, Airbnb (Premium)
- **[Reconstruct Itinerary](https://leetcode.com/problems/reconstruct-itinerary/)** - Google, Facebook
- **[Minimum Height Trees](https://leetcode.com/problems/minimum-height-trees/)** - Google, Amazon
- **[Evaluate Division](https://leetcode.com/problems/evaluate-division/)** - Google, Amazon
- **[Redundant Connection](https://leetcode.com/problems/redundant-connection/)** - Google, Amazon
            

## 💡 Pro Tips & Shortcuts
- **Adjacency List**: Use `vector<vector<int>> adj` for most problems (saves space).
- **Visited Array**: Always use `vector<bool> visited` to prevent cycles in BFS/DFS.
- **BFS**: Finds shortest path in unweighted graphs.
- **DFS**: Good for connectivity and detecting cycles.', 12, NULL) ON CONFLICT (topic_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1241, 'Two Sum', 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

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
9', '0 1', NULL, NULL, NULL, NULL, '"2025-11-21T13:46:56.561Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1242, 'Best Time to Buy and Sell Stock', 'You are given an array prices where prices[i] is the price of a given stock on the ith day.

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
7 1 5 3 6 4', '5', NULL, NULL, NULL, NULL, '"2025-11-21T13:46:56.561Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1244, 'Missing Number', 'Given an array nums containing n distinct numbers in the range [0, n], return the only number in the range that is missing from the array.

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
3 0 1', '2', NULL, NULL, NULL, NULL, '"2025-11-21T13:46:56.561Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1245, 'Single Number', 'Given a non-empty array of integers nums, every element appears twice except for one. Find that single one.

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
4 1 2 1 2', '4', NULL, NULL, NULL, NULL, '"2025-11-21T13:46:56.561Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1246, '3Sum', 'Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.

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
-1 0 1', NULL, NULL, NULL, NULL, '"2025-11-21T13:46:56.561Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1248, 'Maximum Subarray (Kadane''s Algorithm)', 'Given an integer array nums, find the subarray with the largest sum, and return its sum.

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
-2 1 -3 4 -1 2 1 -5 4', '6', NULL, NULL, NULL, NULL, '"2025-11-21T13:46:56.561Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1249, 'Container With Most Water', 'You are given an integer array height of length n. There are n vertical lines drawn such that the two endpoints of the ith line are (i, 0) and (i, height[i]).

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
1 8 6 2 5 4 8 3 7', '49', NULL, NULL, NULL, NULL, '"2025-11-21T13:46:56.561Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1251, 'Trapping Rain Water', 'Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.

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
0 1 0 2 1 0 1 3 2 1 2 1', '6', NULL, NULL, NULL, NULL, '"2025-11-21T13:46:56.561Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1252, 'Valid Palindrome', 'A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Alphanumeric characters include letters and numbers.

Given a string s, return true if it is a palindrome, or false otherwise.

**Example 1:**
Input: s = "A man, a plan, a canal: Panama"
Output: true
Explanation: "amanaplanacanalpanama" is a palindrome.

**Example 2:**
Input: s = "race a car"
Output: false
Explanation: "raceacar" is not a palindrome.

**Input Format:**
- A single line containing the string s.

**Output Format:**
- Print "true" if it is a palindrome, otherwise "false".

**Constraints:**
- 1 <= s.length <= 2 * 10^5
- s consists only of printable ASCII characters.', 'Easy', 'String', 'A man, a plan, a canal: Panama', 'true', 'Single line: string s', 'true or false', '1 <= s.length <= 2 * 10^5
s consists only of printable ASCII characters.', 'LeetCode #125', '"2025-11-21T13:46:56.561Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1345, 'Find Missing Number', 'Given an array containing n distinct numbers from 0 to n, find the one number that is missing from the array.

**Input Format:**
- First line: Size or parameter
- Second line: Space-separated values

**Output Format:**
- Print the result as specified in the problem statement

**Constraints:**
- 1 <= n <= 10^3
- Values fit in standard integer range', 'Easy', 'Array', NULL, NULL, 'First line contains integer n. Second line contains n space-separated integers.', 'Single integer - the missing number.', '1 ≤ n ≤ 10^4', NULL, '"2025-11-21T14:02:28.315Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1346, 'Remove Duplicates from Sorted Array', 'Remove duplicates from a sorted array in-place and return the count of unique elements.

**Input Format:**
- First line: Size or parameter
- Second line: Space-separated values

**Output Format:**
- Print the result as specified in the problem statement

**Constraints:**
- 1 <= n <= 10^3
- Values fit in standard integer range', 'Easy', 'Array', NULL, NULL, 'First line contains n. Second line contains n space-separated sorted integers.', 'First line: count of unique elements. Second line: unique elements space-separated.', '1 ≤ n ≤ 10^5', NULL, '"2025-11-21T14:02:28.330Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1347, '3Sum Problem', 'Find all unique triplets that sum to zero.

**Input Format:**
- First line: Size/Count
- Second line: Values

**Output Format:**
- Print the result as specified

**Constraints:**
- 1 <= n <= 10^5
- -10^4 <= values <= 10^4

**Note:**
- Ensure that your solution handles all edge cases and constraints effectively.
- Optimized time and space complexity is expected for this problem.', 'Medium', 'Array', NULL, NULL, 'First line contains n. Second line contains n space-separated integers.', 'Each line contains a triplet sorted in ascending order. Output all triplets sorted lexicographically.', '3 ≤ n ≤ 1000', NULL, '"2025-11-21T14:02:28.336Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1254, 'Longest Substring Without Repeating Characters', 'Given a string s, find the length of the longest substring without repeating characters.

A substring is a contiguous non-empty sequence of characters within a string.

**Input Format:**
Single line: string s

**Output Format:**
Single integer (length of longest substring)

**Constraints:**
0 <= s.length <= 5 * 10^4
s consists of English letters, digits, symbols and spaces.

**Source:** LeetCode #3', 'Medium', 'String', 'abcabcbb', '3', NULL, NULL, NULL, NULL, '"2025-11-21T13:46:56.561Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1255, 'Longest Palindromic Substring', 'Given a string s, return the longest palindromic substring in s.

A substring is a contiguous non-empty sequence of characters within a string.

**Input Format:**
Single line: string s

**Output Format:**
Single line: the longest palindromic substring

**Constraints:**
1 <= s.length <= 1000
s consist of only digits and English letters.

**Source:** LeetCode #5', 'Medium', 'String', 'babad', 'bab', NULL, NULL, NULL, NULL, '"2025-11-21T13:46:56.561Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1257, 'Binary Search', 'Given an array of integers nums which is sorted in ascending order, and an integer target, write a function to search target in nums. If target exists, then return its index. Otherwise, return -1.

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
9', '4', NULL, NULL, NULL, NULL, '"2025-11-21T13:46:56.561Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1258, 'Search Insert Position', 'Given a sorted array of distinct integers and a target value, return the index if the target is found. If not, return the index where it would be if it were inserted in order.

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
5', '2', NULL, NULL, NULL, NULL, '"2025-11-21T13:46:56.561Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1259, 'Search in Rotated Sorted Array', 'There is an integer array nums sorted in ascending order (with distinct values).

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
0', '4', NULL, NULL, NULL, NULL, '"2025-11-21T13:46:56.561Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1260, 'Find Peak Element', 'A peak element is an element that is strictly greater than its neighbors.

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
1 2 3 1', '2', NULL, NULL, NULL, NULL, '"2025-11-21T13:46:56.561Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1263, 'Linked List Cycle', 'Given head, the head of a linked list, determine if the linked list has a cycle in it.

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
1', 'true', NULL, NULL, NULL, NULL, '"2025-11-21T13:46:56.561Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1334, 'Letter Combinations of a Phone Number', 'Given a string containing digits from 2-9 inclusive, return all possible letter combinations that the number could represent. Return the answer in any order.

A mapping of digits to letters (just like on the telephone buttons) is given below. Note that 1 does not map to any letters.

**Input Format:**
- A single value

**Output Format:**
- Print the result as specified in the problem statement

**Constraints:**
- 1 <= n <= 10^5
- -10^4 <= values <= 10^4', 'Medium', 'Backtracking', '23', 'ad ae af bd be bf cd ce cf', 'Single line: string digits', 'Space-separated strings (combinations)', '0 <= digits.length <= 4
digits[i] is a digit in the range [''2'', ''9''].', 'LeetCode #17', '"2025-11-21T13:46:56.684Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1350, 'First Unique Character', 'Find the index of the first non-repeating character.

**Input Format:**
- A single value

**Output Format:**
- Print the result as specified in the problem statement

**Constraints:**
- 1 <= n <= 10^3
- Values fit in standard integer range', 'Easy', 'String', NULL, NULL, 'Single string.', 'Index (0-based) or -1 if none exists.', '1 ≤ length ≤ 10^5', NULL, '"2025-11-21T14:02:28.350Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1349, 'Reverse String', 'Reverse a given string.

**Input Format:**
- A single value

**Output Format:**
- Print the result as specified

**Constraints:**
- 1 <= n <= 10^3
- Values fit in integer range

**Note:**
- Ensure that your solution handles all edge cases and constraints effectively.
- Optimized time and space complexity is expected for this problem.', 'Easy', 'String', NULL, NULL, 'Single string.', 'Reversed string.', '1 ≤ length ≤ 10^5', NULL, '"2025-11-21T14:02:28.346Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1351, 'Kth Largest Element in Array', 'Find the kth largest element in an unsorted array.

**Input Format:**
- First line: Size/Count
- Second line: Values

**Output Format:**
- Print the result as specified

**Constraints:**
- 1 <= n <= 10^3
- Values fit in integer range

**Note:**
- Ensure that your solution handles all edge cases and constraints effectively.
- Optimized time and space complexity is expected for this problem.', 'Easy', 'Heap', NULL, NULL, 'First line: n k. Second line: n space-separated integers.', 'Kth largest element.', '1 ≤ k ≤ n ≤ 10^5', NULL, '"2025-11-21T14:02:28.358Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1264, 'Add Two Numbers', 'You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.

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
5 6 4', '7 0 8', NULL, NULL, NULL, NULL, '"2025-11-21T13:46:56.561Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1265, 'Remove Nth Node From End of List', 'Given the head of a linked list, remove the nth node from the end of the list and return its head.

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
2', '1 2 3 5', NULL, NULL, NULL, NULL, '"2025-11-21T13:46:56.561Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1267, 'Invert Binary Tree', 'Given the root of a binary tree, invert the tree, and return its root.

Inverting a binary tree means swapping the left and right children for every node.

**Input Format:**
Level-order traversal: space-separated values (null for empty nodes)

**Output Format:**
Level-order traversal of inverted tree

**Constraints:**
The number of nodes in the tree is in the range [0, 100].
-100 <= Node.val <= 100

**Source:** LeetCode #226', 'Easy', 'Tree', '4 2 7 1 3 6 9', '4 7 2 9 6 3 1', NULL, NULL, NULL, NULL, '"2025-11-21T13:46:56.561Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1269, 'Validate Binary Search Tree', 'Given the root of a binary tree, determine if it is a valid binary search tree (BST).

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

**Source:** LeetCode #98', 'Medium', 'Tree', '2 1 3', 'true', NULL, NULL, NULL, NULL, '"2025-11-21T13:46:56.561Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1271, 'House Robber', 'You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed, the only constraint stopping you from robbing each of them is that adjacent houses have security systems connected and it will automatically contact the police if two adjacent houses were broken into on the same night.

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
1 2 3 1', '4', NULL, NULL, NULL, NULL, '"2025-11-21T13:46:56.561Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1272, 'Coin Change', 'You are given an integer array coins representing coins of different denominations and an integer amount representing a total amount of money.

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
11', '3', NULL, NULL, NULL, NULL, '"2025-11-21T13:46:56.561Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1273, 'Longest Increasing Subsequence', 'Given an integer array nums, return the length of the longest strictly increasing subsequence.

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
10 9 2 5 3 7 101 18', '4', NULL, NULL, NULL, NULL, '"2025-11-21T13:46:56.561Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1274, 'Unique Paths', 'There is a robot on an m x n grid. The robot is initially located at the top-left corner (i.e., grid[0][0]). The robot tries to move to the bottom-right corner (i.e., grid[m - 1][n - 1]). The robot can only move either down or right at any point in time.

Given the two integers m and n, return the number of possible unique paths that the robot can take to reach the bottom-right corner.

The test cases are generated so that the answer will be less than or equal to 2 * 10^9.

**Input Format:**
Two space-separated integers m and n

**Output Format:**
Single integer (number of unique paths)

**Constraints:**
1 <= m, n <= 100

**Source:** LeetCode #62', 'Medium', 'Dynamic Programming', '3 7', '28', NULL, NULL, NULL, NULL, '"2025-11-21T13:46:56.561Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1268, 'Binary Tree Level Order Traversal', 'Given the root of a binary tree, return the level order traversal of its nodes'' values. (i.e., from left to right, level by level).

**Input Format:**
- Level order traversal of the tree as space-separated values. ''null'' represents empty nodes.

**Output Format:**
- Print each level on a new line.

**Constraints:**
- The number of nodes in the tree is in the range [0, 2000].
- -1000 <= Node.val <= 1000', 'Medium', 'Tree', '3 9 20 null null 15 7', '3
9 20
15 7', NULL, NULL, NULL, NULL, '"2025-11-21T13:46:56.561Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1270, 'Climbing Stairs', 'You are climbing a staircase. It takes n steps to reach the top.

Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?

**Example 1:**
Input: n = 2
Output: 2
Explanation: There are two ways to climb to the top.
1. 1 step + 1 step
2. 2 steps

**Example 2:**
Input: n = 3
Output: 3
Explanation: There are three ways to climb to the top.
1. 1 step + 1 step + 1 step
2. 1 step + 2 steps
3. 2 steps + 1 step

**Input Format:**
- A single integer n.

**Output Format:**
- Print the number of distinct ways.

**Constraints:**
- 1 <= n <= 45', 'Easy', 'Dynamic Programming', '3', '3', NULL, NULL, NULL, NULL, '"2025-11-21T13:46:56.561Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1353, 'K Closest Points to Origin', 'Find k closest points to the origin (0,0).

**Input Format:**
- First line: Size/Count
- Second line: Values

**Output Format:**
- Print the result as specified

**Constraints:**
- 1 <= n <= 10^3
- Values fit in integer range

**Note:**
- Ensure that your solution handles all edge cases and constraints effectively.
- Optimized time and space complexity is expected for this problem.', 'Easy', 'Heap', NULL, NULL, 'First line: n k. Next n lines: x y coordinates.', 'k lines with x y coordinates of closest points.', '1 ≤ k ≤ n ≤ 10^4', NULL, '"2025-11-21T14:02:28.366Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1278, 'Valid Parentheses', 'Given a string s containing just the characters ''('', '')'', ''{'', ''}'', ''['' and '']'', determine if the input string is valid.

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

**Source:** LeetCode #20', 'Easy', 'Stack', '()[]{}', 'true', NULL, NULL, NULL, NULL, '"2025-11-21T13:46:56.561Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1279, 'Daily Temperatures', 'Given an array of integers temperatures represents the daily temperatures, return an array answer such that answer[i] is the number of days you have to wait after the ith day to get a warmer temperature. If there is no future day for which this is possible, keep answer[i] == 0 instead.

**Input Format:**
First line: n (number of days)
Second line: n space-separated integers (temperatures)

**Output Format:**
n space-separated integers (days to wait)

**Constraints:**
1 <= temperatures.length <= 10^5
30 <= temperatures[i] <= 100

**Source:** LeetCode #739', 'Medium', 'Stack', '8
73 74 75 71 69 72 76 73', '1 1 4 2 1 1 0 0', NULL, NULL, NULL, NULL, '"2025-11-21T13:46:56.561Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1277, 'Course Schedule', 'There are a total of numCourses courses you have to take, labeled from 0 to numCourses - 1. You are given an array prerequisites where prerequisites[i] = [ai, bi] indicates that you must take course bi first if you want to take course ai.

Return true if you can finish all courses. Otherwise, return false.

**Input Format:**
- 3 lines of input

**Output Format:**
- Print the result as specified in the problem statement

**Constraints:**
- 1 <= n <= 10^5
- -10^4 <= values <= 10^4', 'Medium', 'Graph', '2 1
1 0', 'true', 'First line: numCourses
Second line: p (number of prerequisites)
Next p lines: a b (course a depends on b)', 'true or false', '1 <= numCourses <= 2000
0 <= prerequisites.length <= 5000
prerequisites[i].length == 2
0 <= ai, bi < numCourses
All the pairs prerequisites[i] are unique.', 'LeetCode #207', '"2025-11-21T13:46:56.561Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1281, 'Jump Game', 'You are given an integer array nums. You are initially positioned at the array''s first index, and each element in the array represents your maximum jump length at that position.

Return true if you can reach the last index, or false otherwise.

**Input Format:**
- First line: Size or parameter
- Second line: Space-separated values

**Output Format:**
- Print the result as specified in the problem statement

**Constraints:**
- 1 <= n <= 10^5
- -10^4 <= values <= 10^4', 'Medium', 'Greedy', '5
2 3 1 1 4', 'true', 'First line: n (size of array)
Second line: n space-separated integers', 'true or false', '1 <= nums.length <= 10^4
0 <= nums[i] <= 10^5', 'LeetCode #55', '"2025-11-21T13:46:56.561Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1285, 'Kth Largest Element in an Array', 'Given an integer array nums and an integer k, return the kth largest element in the array.

Note that it is the kth largest element in the sorted order, not the kth distinct element.

Can you solve it without sorting?

**Input Format:**
- 3 lines of input

**Output Format:**
- Print the result as specified in the problem statement

**Constraints:**
- 1 <= n <= 10^5
- -10^4 <= values <= 10^4', 'Medium', 'Heap', '6
3 2 1 5 6 4
2', '5', 'First line: n (size of array)
Second line: n space-separated integers
Third line: k', 'Single integer', '1 <= k <= nums.length <= 10^5
-10^4 <= nums[i] <= 10^4', 'LeetCode #215', '"2025-11-21T13:46:56.561Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1284, 'Top K Frequent Elements', 'Given an integer array nums and an integer k, return the k most frequent elements. You may return the answer in any order.

**Input Format:**
- 3 lines of input

**Output Format:**
- Print the result as specified in the problem statement

**Constraints:**
- 1 <= n <= 10^5
- -10^4 <= values <= 10^4', 'Medium', 'Heap', '6
1 1 1 2 2 3
2', '1 2', 'First line: n (size of array)
Second line: n space-separated integers
Third line: k', 'k space-separated integers', '1 <= nums.length <= 10^5
-10^4 <= nums[i] <= 10^4
k is in the range [1, the number of unique elements in the array].
It is guaranteed that the answer is unique.', 'LeetCode #347', '"2025-11-21T13:46:56.561Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1356, 'Kth Largest in Stream', 'Design a class to find kth largest element in a stream.

**Input Format:**
- 6 lines of input

**Output Format:**
- Print the result as specified in the problem statement

**Constraints:**
- 1 <= n <= 10^5
- -10^4 <= values <= 10^4', 'Medium', 'Heap', NULL, NULL, 'First line: k. Second line: initial array. Third line: m (adds). Next m lines: values to add.', 'm lines with kth largest after each add.', '1 ≤ k ≤ 10^4', NULL, '"2025-11-21T14:02:28.380Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1280, 'Largest Rectangle in Histogram', 'Given an array of integers heights representing the histogram''s bar height where the width of each bar is 1, return the area of the largest rectangle in the histogram.

**Input Format:**
- First line: n (number of bars)
- Second line: n space-separated integers (heights)

**Output Format:**
- A single integer representing the max area.

**Constraints:**
- 1 <= heights.length <= 10^5
- 0 <= heights[i] <= 10^4', 'Hard', 'Stack', '6
2 1 5 6 2 3', '10', NULL, NULL, NULL, NULL, '"2025-11-21T13:46:56.561Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1282, 'Permutations', 'Given an array nums of distinct integers, return all the possible permutations. You can return the answer in any order.

**Input Format:**
- First line: n (size of array)
- Second line: n space-separated integers

**Output Format:**
- Print each permutation on a new line. Elements space-separated.

**Constraints:**
- 1 <= nums.length <= 6
- -10 <= nums[i] <= 10
- All the integers of nums are unique.', 'Medium', 'Backtracking', '3
1 2 3', '1 2 3
1 3 2
2 1 3
2 3 1
3 1 2
3 2 1', NULL, NULL, NULL, NULL, '"2025-11-21T13:46:56.561Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1276, 'Number of Islands', 'Given an m x n 2D binary grid grid which represents a map of ''1''s (land) and ''0''s (water), return the number of islands.

An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are all surrounded by water.

**Example 1:**
Input: grid = [
  ["1","1","1","1","0"],
  ["1","1","0","1","0"],
  ["1","1","0","0","0"],
  ["0","0","0","0","0"]
]
Output: 1

**Input Format:**
- First line: m and n (rows and columns)
- Next m lines: Each line contains n space-separated characters (''0'' or ''1'').

**Output Format:**
- Print the integer number of islands.

**Constraints:**
- 1 <= m, n <= 300
- grid[i][j] is ''0'' or ''1''.', 'Medium', 'Graph', '4 5
1 1 1 1 0
1 1 0 1 0
1 1 0 0 0
0 0 0 0 0', '1', 'First line: m n (rows and cols)
Next m lines: n space-separated characters (''1'' or ''0'')', 'Single integer (number of islands)', 'm == grid.length
n == grid[i].length
1 <= m, n <= 300
grid[i][j] is ''0'' or ''1''.', 'LeetCode #200', '"2025-11-21T13:46:56.561Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1358, 'IPO Problem', 'Maximize capital by choosing at most k projects.

**Input Format:**
- First line: Size/Count
- Second line: Values

**Output Format:**
- Print the result as specified

**Constraints:**
- 1 <= n <= 10^6
- Values fit in 64-bit integer range

**Note:**
- Ensure that your solution handles all edge cases and constraints effectively.
- Optimized time and space complexity is expected for this problem.', 'Hard', 'Heap', NULL, NULL, 'First line: k w. Second line: n. Next n lines: profit capital.', 'Maximum capital achievable.', '0 ≤ k ≤ 10^5, 0 ≤ w ≤ 10^9', NULL, '"2025-11-21T14:02:28.390Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1291, 'Decode String', 'Given an encoded string, return its decoded string.

The encoding rule is: k[encoded_string], where the encoded_string inside the square brackets is being repeated exactly k times.

**Input Format:**
Single string s

**Output Format:**
Decoded string

**Constraints:**
1 <= s.length <= 30

**Source:** LeetCode #394', 'Medium', 'Stack', '3[a]2[bc]', 'aaabcbc', NULL, NULL, NULL, NULL, '"2025-11-21T13:46:56.561Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1297, 'Candy', 'There are n children standing in a line. Each child is assigned a rating value given in the integer array ratings.

You are giving candies to these children subjected to the following requirements:
- Each child must have at least one candy.
- Children with a higher rating get more candies than their neighbors.

Return the minimum number of candies you need to have to distribute the candies to the children.

**Input Format:**
- First line: n (number of children)
- Second line: n space-separated integers (ratings)

**Output Format:**
- A single integer representing the minimum candies.

**Constraints:**
- n == ratings.length
- 1 <= n <= 2 * 10^4
- 0 <= ratings[i] <= 2 * 10^4', 'Hard', 'Greedy', '3
1 0 2', '5', NULL, NULL, NULL, NULL, '"2025-11-21T13:46:56.561Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1298, 'Combination Sum', 'Given an array of distinct integers candidates and a target integer target, return a list of all unique combinations of candidates where the chosen numbers sum to target. You may return the combinations in any order.

The same number may be chosen from candidates an unlimited number of times. Two combinations are unique if the frequency of at least one of the chosen numbers is different.

**Input Format:**
- First line: n (size of array)
- Second line: n space-separated integers
- Third line: target

**Output Format:**
- Print each combination on a new line. Elements space-separated.

**Constraints:**
- 1 <= candidates.length <= 30
- 2 <= candidates[i] <= 40
- All elements of candidates are distinct.
- 1 <= target <= 40', 'Medium', 'Backtracking', '4
2 3 6 7
7', '2 2 3
7', NULL, NULL, NULL, NULL, '"2025-11-21T13:46:56.561Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1294, 'Rotting Oranges', 'You are given an m x n grid where each cell can have one of three values:
- 0 representing an empty cell,
- 1 representing a fresh orange, or
- 2 representing a rotten orange.

Every minute, any fresh orange that is 4-directionally adjacent to a rotten orange becomes rotten.

Return the minimum number of minutes that must elapse until no cell has a fresh orange. If this is impossible, return -1.

**Input Format:**
- First line: m n (rows and columns)
- Next m lines: n space-separated integers representing the grid

**Output Format:**
- A single integer representing the minimum minutes or -1.

**Constraints:**
- m == grid.length
- n == grid[i].length
- 1 <= m, n <= 10
- grid[i][j] is 0, 1, or 2.', 'Medium', 'Graph', '3 3
2 1 1
1 1 0
0 1 1', '4', NULL, NULL, NULL, NULL, '"2025-11-21T13:46:56.561Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1286, 'Palindrome Linked List', 'Given the head of a singly linked list, return true if it is a palindrome or false otherwise.

**Input Format:**
- First line: n (size of linked list)
- Second line: n space-separated integers representing the list nodes

**Output Format:**
- "true" or "false"

**Constraints:**
- The number of nodes in the list is in the range [1, 10^5].
- 0 <= Node.val <= 9', 'Easy', 'Linked List', '4
1 2 2 1', 'true', 'First line: n (number of nodes)
Second line: n space-separated integers (node values)', 'true or false', 'The number of nodes in the list is in the range [1, 10^5].
0 <= Node.val <= 9', 'LeetCode #234', '"2025-11-21T13:46:56.561Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1293, 'Sliding Window Maximum', 'You are given an array of integers nums, there is a sliding window of size k which is moving from the very left of the array to the very right. You can only see the k numbers in the window. Each time the sliding window moves right by one position.

Return the max sliding window.

**Input Format:**
- First line: n (size of array)
- Second line: n space-separated integers
- Third line: k

**Output Format:**
- Space-separated integers representing the maximums.

**Constraints:**
- 1 <= nums.length <= 10^5
- -10^4 <= nums[i] <= 10^4
- 1 <= k <= nums.length', 'Hard', 'Queue', '8
1 3 -1 -3 5 3 6 7
3', '3 3 5 5 6 7', NULL, NULL, NULL, NULL, '"2025-11-21T13:46:56.561Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1292, 'Task Scheduler', 'You are given an array of CPU tasks, each represented by letters A to Z, and a cooling time n. Each cycle or interval allows the completion of one task. Tasks can be completed in any order, but there''s a constraint: identical tasks must be separated by at least n intervals due to cooling time.

Return the minimum number of intervals required to complete all tasks.

**Input Format:**
- First line: n (number of tasks)
- Second line: n space-separated characters (tasks)
- Third line: cooling time n

**Output Format:**
- A single integer representing the minimum intervals.

**Constraints:**
- 1 <= tasks.length <= 10^4
- tasks[i] is upper-case English letter.
- The integer n is in the range [0, 100].', 'Medium', 'Queue', 'A A A B B B
2', '8', NULL, NULL, NULL, NULL, '"2025-11-21T13:46:56.561Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1296, 'Gas Station', 'There are n gas stations along a circular route, where the amount of gas at the ith station is gas[i].

You have a car with an unlimited gas tank and it costs cost[i] of gas to travel from the ith station to its next (i + 1)th station. You begin the journey with an empty tank at one of the gas stations.

Given two integer arrays gas and cost, return the starting gas station''s index if you can travel around the circuit once in the clockwise direction, otherwise return -1. If there exists a solution, it is guaranteed to be unique.

**Input Format:**
- First line: n (number of stations)
- Second line: n space-separated integers (gas)
- Third line: n space-separated integers (cost)

**Output Format:**
- A single integer representing the starting index or -1.

**Constraints:**
- n == gas.length == cost.length
- 1 <= n <= 10^5
- 0 <= gas[i], cost[i] <= 10^4', 'Medium', 'Greedy', '5
1 2 3 4 5
3 4 5 1 2', '3', 'First line: n (number of stations)
Second line: n space-separated integers (gas)
Third line: n space-separated integers (cost)', 'Single integer (starting index or -1)', 'n == gas.length == cost.length
1 <= n <= 10^5
0 <= gas[i], cost[i] <= 10^4', 'LeetCode #134', '"2025-11-21T13:46:56.561Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1363, 'Top K Frequent Words', 'Given an array of strings words and an integer k, return the k most frequent strings.

Return the answer sorted by the frequency from highest to lowest. Sort the words with the same frequency by their lexicographical order.

**Input Format:**
- First line: N (number of words) and K (number of top words to find)
- Next N lines: The words (one per line)

**Output Format:**
- Print the k most frequent words, one per line.

**Constraints:**
- 1 <= N <= 10^5
- 1 <= k <= N
- words[i] consists of lowercase English letters.', 'Medium', 'Hashing', NULL, NULL, 'First line: n k. Next n lines: words.', 'k lines with words.', '1 ≤ k ≤ n ≤ 500', NULL, '"2025-11-21T14:02:28.415Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1360, 'Happy Number', 'Determine if a number is happy (eventually reaches 1).

**Input Format:**
- A single value

**Output Format:**
- Print the result as specified in the problem statement

**Constraints:**
- 1 <= n <= 10^3
- Values fit in standard integer range', 'Easy', 'Hashing', NULL, NULL, 'Single integer n.', '"true" or "false".', '1 ≤ n ≤ 2^31-1', NULL, '"2025-11-21T14:02:28.400Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1432, 'Phone Letter Combos', 'Letter combinations.

**Input Format:**
- A single value

**Output Format:**
- Print the result as specified

**Constraints:**
- 1 <= n <= 10^5
- -10^4 <= values <= 10^4

**Note:**
- Ensure that your solution handles all edge cases and constraints effectively.
- Optimized time and space complexity is expected for this problem.', 'Medium', 'Backtracking', NULL, NULL, 'Digits.', 'Combos.', '0≤digits≤4', NULL, '"2025-11-21T14:11:16.083Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1365, 'Substring with Concatenation', 'Find all starting indices where concatenation of all words exists.

**Input Format:**
- 4 lines of input

**Output Format:**
- Print the result as specified in the problem statement

**Constraints:**
- 1 <= n <= 10^6
- Values fit in 64-bit integer range', 'Hard', 'Hashing', NULL, NULL, 'First line: string s. Second line: n. Next n lines: words.', 'Space-separated indices.', '1 ≤ n ≤ 5000', NULL, '"2025-11-21T14:02:28.422Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1303, 'Sort Characters By Frequency', 'Given a string s, sort it in decreasing order based on the frequency of the characters. The frequency of a character is the number of times it appears in the string.

Return the sorted string. If there are multiple answers, return any of them.

**Input Format:**
- A single string s.

**Output Format:**
- The sorted string.

**Constraints:**
- 1 <= s.length <= 5 * 10^5
- s consists of uppercase and lowercase English letters and digits.', 'Medium', 'Heap', 'tree', 'eert', NULL, NULL, NULL, NULL, '"2025-11-21T13:46:56.561Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1331, 'Search a 2D Matrix II', 'Write an efficient algorithm that searches for a value target in an m x n integer matrix matrix. This matrix has the following properties:

- Integers in each row are sorted in ascending from left to right.
- Integers in each column are sorted in ascending from top to bottom.

**Input Format:**
- 7 lines of input

**Output Format:**
- Print the result as specified in the problem statement

**Constraints:**
- 1 <= n <= 10^5
- -10^4 <= values <= 10^4', 'Medium', 'Binary Search', '5 5
1 4 7 11 15
2 5 8 12 19
3 6 9 16 22
10 13 14 17 24
18 21 23 26 30
5', 'true', 'First line: m n (rows and columns)
Next m lines: n space-separated integers
Last line: target', 'true or false', 'm == matrix.length
n == matrix[i].length
1 <= n, m <= 300
-10^9 <= matrix[i][j] <= 10^9
All the integers in each row are sorted in ascending order.
All the integers in each column are sorted in ascending order.
-10^9 <= target <= 10^9', 'LeetCode #240', '"2025-11-21T13:46:56.684Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1300, 'N-Queens', 'The n-queens puzzle is the problem of placing n queens on an n x n chessboard such that no two queens attack each other.

Given an integer n, return all distinct solutions to the n-queens puzzle. You may return the answer in any order.

Each solution contains a distinct board configuration of the n-queens'' placement, where ''Q'' and ''.'' both indicate a queen and an empty space, respectively.

**Input Format:**
- A single integer n.

**Output Format:**
- Print each solution board. Separate solutions with an empty line.

**Constraints:**
- 1 <= n <= 9', 'Hard', 'Backtracking', '4', '2', NULL, NULL, NULL, NULL, '"2025-11-21T13:46:56.561Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1299, 'Word Search', 'Given an m x n grid of characters board and a string word, return true if word exists in the grid.

The word can be constructed from letters of sequentially adjacent cells, where adjacent cells are horizontally or vertically neighboring. The same letter cell may not be used more than once.

**Input Format:**
- First line: m n (rows and columns)
- Next m lines: n space-separated characters
- Last line: word string

**Output Format:**
- "true" or "false"

**Constraints:**
- m == board.length
- n = board[i].length
- 1 <= m, n <= 6
- 1 <= word.length <= 15
- board and word consists of only lowercase and uppercase English letters.', 'Medium', 'Backtracking', '3 4
A B C E
S F C S
A D E E
ABCCED', 'true', NULL, NULL, NULL, NULL, '"2025-11-21T13:46:56.561Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1302, 'Split Array Largest Sum', 'Given an integer array nums and an integer k, split nums into k non-empty subarrays such that the largest sum of any subarray is minimized.

Return the minimized largest sum of the split.

A subarray is a contiguous part of the array.

**Input Format:**
- First line: n (size of array)
- Second line: n space-separated integers
- Third line: k

**Output Format:**
- A single integer representing the minimized largest sum.

**Constraints:**
- 1 <= nums.length <= 1000
- 1 <= k <= min(50, nums.length)
- 0 <= nums[i] <= 10^6', 'Hard', 'Binary Search', '5
7 2 5 10 8
2', '18', NULL, NULL, NULL, NULL, '"2025-11-21T13:46:56.561Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1364, 'Contains Duplicate III', 'Check if there are two indices with abs(nums[i]-nums[j]) ≤ t and abs(i-j) ≤ k.

**Input Format:**
- First line: Size or parameter
- Second line: Space-separated values

**Output Format:**
- Print the result as specified in the problem statement

**Constraints:**
- 1 <= n <= 10^6
- Values fit in 64-bit integer range', 'Hard', 'Hashing', NULL, NULL, 'First line: n k t. Second line: n space-separated integers.', '"true" or "false".', '0 ≤ n ≤ 2×10^4', NULL, '"2025-11-21T14:02:28.418Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1305, 'Ransom Note', 'Given two strings ransomNote and magazine, return true if ransomNote can be constructed by using the letters from magazine and false otherwise.

Each letter in magazine can only be used once in ransomNote.

**Input Format:**
- First line: ransomNote
- Second line: magazine

**Output Format:**
- "true" or "false"

**Constraints:**
- 1 <= ransomNote.length, magazine.length <= 10^5
- ransomNote and magazine consist of lowercase English letters.', 'Easy', 'Hashing', 'a
b', 'false', NULL, NULL, NULL, NULL, '"2025-11-21T13:46:56.561Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1306, 'Longest Consecutive Sequence', 'Given an unsorted array of integers nums, return the length of the longest consecutive elements sequence.

You must write an algorithm that runs in O(n) time.

**Input Format:**
- First line: Size or parameter
- Second line: Space-separated values

**Output Format:**
- Print the result as specified in the problem statement

**Constraints:**
- 1 <= n <= 10^5
- -10^4 <= values <= 10^4', 'Medium', 'Hashing', '6
100 4 200 1 3 2', '4', 'First line: n (size of array)
Second line: n space-separated integers', 'Single integer (length)', '0 <= nums.length <= 10^5
-10^9 <= nums[i] <= 10^9', 'LeetCode #128', '"2025-11-21T13:46:56.561Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1368, 'Palindrome Pairs', 'Find all pairs of distinct indices forming palindromes.

**Input Format:**
- 5 lines of input

**Output Format:**
- Print the result as specified in the problem statement

**Constraints:**
- 1 <= n <= 10^6
- Values fit in 64-bit integer range', 'Hard', 'Hashing', NULL, NULL, 'First line: n. Next n lines: words.', 'Each line: two indices forming palindrome.', '1 ≤ n ≤ 5000', NULL, '"2025-11-21T14:02:28.431Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1366, 'Longest Duplicate Substring', 'Find any longest duplicate substring.

**Input Format:**
- A single value

**Output Format:**
- Print the result as specified

**Constraints:**
- 1 <= n <= 10^6
- Values fit in 64-bit integer range

**Note:**
- Ensure that your solution handles all edge cases and constraints effectively.
- Optimized time and space complexity is expected for this problem.', 'Hard', 'Hashing', NULL, NULL, 'Single string.', 'Longest duplicate substring or empty.', '2 ≤ length ≤ 3×10^4', NULL, '"2025-11-21T14:02:28.425Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1367, 'Count Unique Characters', 'Sum of unique characters across all substrings.

**Input Format:**
- A single value

**Output Format:**
- Print the result as specified

**Constraints:**
- 1 <= n <= 10^6
- Values fit in 64-bit integer range

**Note:**
- Ensure that your solution handles all edge cases and constraints effectively.
- Optimized time and space complexity is expected for this problem.', 'Hard', 'Hashing', NULL, NULL, 'Single string.', 'Total count.', '1 ≤ length ≤ 10^5', NULL, '"2025-11-21T14:02:28.428Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1496, 'Text Justification', 'Justify text to max width.

**Input Format:**
- First line: Size/Count
- Second line: Values

**Output Format:**
- Print the result as specified

**Constraints:**
- 1 <= n <= 10^6
- Values fit in 64-bit integer range

**Note:**
- Ensure that your solution handles all edge cases and constraints effectively.
- Optimized time and space complexity is expected for this problem.', 'Hard', 'String', NULL, NULL, 'Words. Max width.', 'Justified lines.', '1≤words≤300', NULL, '"2025-11-21T14:17:59.743Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1312, 'Majority Element', 'Given an array nums of size n, return the majority element.

The majority element is the element that appears more than ⌊n / 2⌋ times. You may assume that the majority element always exists in the array.

**Input Format:**
- First line: Size or parameter
- Second line: Space-separated values

**Output Format:**
- Print the result as specified in the problem statement

**Constraints:**
- 1 <= n <= 10^3
- Values fit in standard integer range', 'Easy', 'Array', '7
2 2 1 1 1 2 2', '2', 'First line: n (size of array)
Second line: n space-separated integers', 'Single integer (majority element)', 'n == nums.length
1 <= n <= 5 * 10^4
-10^9 <= nums[i] <= 10^9', 'LeetCode #169', '"2025-11-21T13:46:56.684Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1313, 'Reverse Words in a String', 'Given an input string s, reverse the order of the words.

A word is defined as a sequence of non-space characters. The words in s will be separated by at least one space.

Return a string of the words in reverse order concatenated by a single space.

Note that s may contain leading or trailing spaces or multiple spaces between two words. The returned string should only have a single space separating the words. Do not include any extra spaces.

**Input Format:**
- Space-separated values

**Output Format:**
- Print the result as specified in the problem statement

**Constraints:**
- 1 <= n <= 10^5
- -10^4 <= values <= 10^4', 'Medium', 'String', 'the sky is blue', 'blue is sky the', 'Single line: string s', 'Single line: reversed words', '1 <= s.length <= 10^4
s contains English letters (upper-case and lower-case), digits, and spaces '' ''.
There is at least one word in s.', 'LeetCode #151', '"2025-11-21T13:46:56.684Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1314, 'Implement strStr()', 'Given two strings needle and haystack, return the index of the first occurrence of needle in haystack, or -1 if needle is not part of haystack.

Clarification:
What should we return when needle is an empty string? This is a great question to ask during an interview.
For the purpose of this problem, we will return 0 when needle is an empty string.

**Input Format:**
- First line: Size or parameter
- Second line: Space-separated values

**Output Format:**
- Print the result as specified in the problem statement

**Constraints:**
- 1 <= n <= 10^3
- Values fit in standard integer range', 'Easy', 'String', 'sadbutsad
sad', '0', 'First line: haystack string
Second line: needle string', 'Single integer (index or -1)', '1 <= haystack.length, needle.length <= 10^4
haystack and needle consist of only lowercase English characters.', 'LeetCode #28', '"2025-11-21T13:46:56.684Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1316, 'Minimum Window Substring', 'Given two strings s and t of lengths m and n respectively, return the minimum window substring of s such that every character in t (including duplicates) is included in the window. If there is no such substring, return the empty string "".

The testcases will be generated such that the answer is unique.

**Input Format:**
- First line: Size or parameter
- Second line: Space-separated values

**Output Format:**
- Print the result as specified in the problem statement

**Constraints:**
- 1 <= n <= 10^6
- Values fit in 64-bit integer range', 'Hard', 'String', 'ADOBECODEBANC
ABC', 'BANC', 'First line: string s
Second line: string t', 'Single line: minimum window substring', 'm == s.length
n == t.length
1 <= m, n <= 10^5
s and t consist of uppercase and lowercase English letters.', 'LeetCode #76', '"2025-11-21T13:46:56.684Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1317, 'Longest Common Prefix', 'Write a function to find the longest common prefix string amongst an array of strings.

If there is no common prefix, return an empty string "".

**Input Format:**
- First line: Size or parameter
- Second line: Space-separated values

**Output Format:**
- Print the result as specified in the problem statement

**Constraints:**
- 1 <= n <= 10^3
- Values fit in standard integer range', 'Easy', 'String', '3
flower flow flight', 'fl', 'First line: n (number of strings)
Second line: n space-separated strings', 'Single line: longest common prefix', '1 <= strs.length <= 200
0 <= strs[i].length <= 200
strs[i] consists of only lowercase English letters.', 'LeetCode #14', '"2025-11-21T13:46:56.684Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1377, 'Remove Outer Parentheses', 'Remove outermost parentheses from primitive decompositions.

**Input Format:**
- A single value

**Output Format:**
- Print the result as specified in the problem statement

**Constraints:**
- 1 <= n <= 10^3
- Values fit in standard integer range', 'Easy', 'Stack', NULL, NULL, 'String of parentheses.', 'Result string.', '1 ≤ length ≤ 10^5', NULL, '"2025-11-21T14:07:27.833Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1370, 'Remove Nth Node From End', 'Remove nth node from end of list.

**Input Format:**
- First line: Size/Count
- Second line: Values

**Output Format:**
- Print the result as specified

**Constraints:**
- 1 <= n <= 10^5
- -10^4 <= values <= 10^4

**Note:**
- Ensure that your solution handles all edge cases and constraints effectively.
- Optimized time and space complexity is expected for this problem.', 'Medium', 'Linked List', NULL, NULL, 'First line: list. Second line: n.', 'Modified list.', '1 ≤ n ≤ size', NULL, '"2025-11-21T14:07:27.809Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1371, 'Swap Nodes in Pairs', 'Swap every two adjacent nodes.

**Input Format:**
- Space-separated values

**Output Format:**
- Print the result as specified

**Constraints:**
- 1 <= n <= 10^5
- -10^4 <= values <= 10^4

**Note:**
- Ensure that your solution handles all edge cases and constraints effectively.
- Optimized time and space complexity is expected for this problem.', 'Medium', 'Linked List', NULL, NULL, 'Space-separated values.', 'Swapped list.', '0 ≤ n ≤ 100', NULL, '"2025-11-21T14:07:27.812Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1372, 'Rotate List', 'Rotate list to the right by k places.

**Input Format:**
- First line: Size/Count
- Second line: Values

**Output Format:**
- Print the result as specified

**Constraints:**
- 1 <= n <= 10^5
- -10^4 <= values <= 10^4

**Note:**
- Ensure that your solution handles all edge cases and constraints effectively.
- Optimized time and space complexity is expected for this problem.', 'Medium', 'Linked List', NULL, NULL, 'First line: list. Second line: k.', 'Rotated list.', '0 ≤ n ≤ 500, 0 ≤ k ≤ 2×10^9', NULL, '"2025-11-21T14:07:27.816Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1374, 'Copy List with Random Pointer', 'Deep copy linked list with random pointers.

**Input Format:**
- First line: Size/Count
- Second line: Values

**Output Format:**
- Print the result as specified

**Constraints:**
- 1 <= n <= 10^6
- Values fit in 64-bit integer range

**Note:**
- Ensure that your solution handles all edge cases and constraints effectively.
- Optimized time and space complexity is expected for this problem.', 'Hard', 'Linked List', NULL, NULL, 'Each line: val next_idx random_idx.', 'Copied list info.', '0 ≤ n ≤ 1000', NULL, '"2025-11-21T14:07:27.821Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1378, 'Asteroid Collision', 'Simulate asteroid collisions.

**Input Format:**
- Space-separated values

**Output Format:**
- Print the result as specified

**Constraints:**
- 1 <= n <= 10^5
- -10^4 <= values <= 10^4

**Note:**
- Ensure that your solution handles all edge cases and constraints effectively.
- Optimized time and space complexity is expected for this problem.', 'Medium', 'Stack', NULL, NULL, 'Space-separated asteroid sizes (negative = left).', 'Remaining asteroids.', '2 ≤ n ≤ 10^4', NULL, '"2025-11-21T14:07:27.837Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1498, 'Design Snake Game', 'Design a snake game.

**Input Format:**
- First line: Size/Count
- Second line: Values

**Output Format:**
- Print the result as specified

**Constraints:**
- 1 <= n <= 10^5
- -10^4 <= values <= 10^4

**Note:**
- Ensure that your solution handles all edge cases and constraints effectively.
- Optimized time and space complexity is expected for this problem.', 'Medium', 'Queue', NULL, NULL, 'Width height. Food positions. Moves.', 'Scores after each move or -1.', '1≤width,height≤10^4', NULL, '"2025-11-21T14:17:59.752Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1320, 'Intersection of Two Linked Lists', 'Given a string s and a dictionary of strings wordDict, return true if s can be segmented into a space-separated sequence of one or more dictionary words.

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
leet code', 'true', NULL, NULL, NULL, NULL, '"2025-11-21T13:46:56.684Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1380, 'Maximal Rectangle', 'Find maximal rectangle in binary matrix.

**Input Format:**
- First line: Size/Count
- Second line: Values

**Output Format:**
- Print the result as specified

**Constraints:**
- 1 <= n <= 10^6
- Values fit in 64-bit integer range

**Note:**
- Ensure that your solution handles all edge cases and constraints effectively.
- Optimized time and space complexity is expected for this problem.', 'Hard', 'Stack', NULL, NULL, 'First line: rows cols. Next rows: binary strings.', 'Maximum rectangle area.', '1 ≤ rows,cols ≤ 200', NULL, '"2025-11-21T14:07:27.844Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1323, 'Decode Ways', 'A message containing letters from A-Z can be encoded into numbers using the following mapping:
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
- A single value

**Output Format:**
- Print the result as specified in the problem statement

**Constraints:**
- 1 <= n <= 10^5
- -10^4 <= values <= 10^4', 'Medium', 'Dynamic Programming', '12', '2', 'Single line: string s', 'Single integer (number of ways)', '1 <= s.length <= 100
s contains only digits and may contain leading zero(s).', 'LeetCode #91', '"2025-11-21T13:46:56.684Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1324, 'Maximum Product Subarray', 'Given an integer array nums, find a subarray that has the largest product, and return the product.

The test cases are generated so that the answer will fit in a 32-bit integer.

**Input Format:**
- First line: Size or parameter
- Second line: Space-separated values

**Output Format:**
- Print the result as specified in the problem statement

**Constraints:**
- 1 <= n <= 10^5
- -10^4 <= values <= 10^4', 'Medium', 'Dynamic Programming', '4
2 3 -2 4', '6', 'First line: n (size of array)
Second line: n space-separated integers', 'Single integer (maximum product)', '1 <= nums.length <= 2 * 10^4
-10 <= nums[i] <= 10
The product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer.', 'LeetCode #152', '"2025-11-21T13:46:56.684Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1499, 'Wiggle Subsequence', 'Max length wiggle subsequence.

**Input Format:**
- Space-separated values

**Output Format:**
- Print the result as specified

**Constraints:**
- 1 <= n <= 10^5
- -10^4 <= values <= 10^4

**Note:**
- Ensure that your solution handles all edge cases and constraints effectively.
- Optimized time and space complexity is expected for this problem.', 'Medium', 'Greedy', NULL, NULL, 'Array.', 'Max length.', '1≤n≤1000', NULL, '"2025-11-21T14:17:59.756Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1304, 'Find Median from Data Stream', 'The median is the middle value in an ordered integer list. If the size of the list is even, there is no middle value, and the median is the mean of the two middle values.

- For example, for arr = [2,3,4], the median is 3.
- For example, for arr = [2,3], the median is (2 + 3) / 2 = 2.5.

Implement the MedianFinder class:
- MedianFinder() initializes the MedianFinder object.
- void addNum(int num) adds the integer num from the data stream to the data structure.
- double findMedian() returns the median of all elements so far. Answers within 10^-5 of the actual answer will be accepted.

**Input Format:**
- First line: n (number of operations)
- Following n lines: operations (addNum <val> or findMedian)

**Output Format:**
- For each findMedian operation, print the result on a new line.

**Constraints:**
- -10^5 <= num <= 10^5
- There will be at least one element in the data structure before calling findMedian.
- At most 5 * 10^4 calls will be made to addNum and findMedian.', 'Hard', 'Heap', 'addNum 1
addNum 2
findMedian
addNum 3
findMedian', '1.5
2.0', 'First line: n (number of operations)
Next n lines: addNum val or findMedian', 'Output for each findMedian operation', '-10^5 <= num <= 10^5
There will be at least one element in the data structure before calling findMedian.
At most 5 * 10^4 calls will be made to addNum and findMedian.', 'LeetCode #295', '"2025-11-21T13:46:56.561Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1321, 'Partition Equal Subset Sum', 'Given an integer array nums, return true if you can partition the array into two subsets such that the sum of the elements in both subsets is equal or false otherwise.

**Input Format:**
- First line: Size or parameter
- Second line: Space-separated values

**Output Format:**
- Print the result as specified in the problem statement

**Constraints:**
- 1 <= n <= 10^5
- -10^4 <= values <= 10^4', 'Medium', 'Dynamic Programming', '4
1 5 11 5', 'true', 'First line: n (size of array)
Second line: n space-separated integers', 'true or false', '1 <= nums.length <= 200
1 <= nums[i] <= 100', 'LeetCode #416', '"2025-11-21T13:46:56.684Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1256, 'Group Anagrams', 'Given an array of strings strs, group the anagrams together. You can return the answer in any order.

An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.

**Input Format:**
- First line: Size or parameter
- Second line: Space-separated values

**Output Format:**
- Print the result as specified in the problem statement

**Constraints:**
- 1 <= n <= 10^5
- -10^4 <= values <= 10^4', 'Medium', 'String', '6
eat tea tan ate nat bat', 'bat
nat tan
ate eat tea', 'First line: n (number of strings)
Second line: n space-separated strings', 'Each line: space-separated strings (one group per line, sorted within group)', '1 <= strs.length <= 10^4
0 <= strs[i].length <= 100
strs[i] consists of lowercase English letters.', 'LeetCode #49', '"2025-11-21T13:46:56.561Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1309, 'Find All Duplicates in an Array', 'Given an integer array nums of length n where all the integers of nums are in the range [1, n] and each integer appears once or twice, return an array of all the integers that appears twice.

You must write an algorithm that runs in O(n) time and uses only constant extra space.

**Input Format:**
- First line: Size or parameter
- Second line: Space-separated values

**Output Format:**
- Print the result as specified in the problem statement

**Constraints:**
- 1 <= n <= 10^5
- -10^4 <= values <= 10^4', 'Medium', 'Array', '8
4 3 2 7 8 2 3 1', '2 3', 'First line: n (size of array)
Second line: n space-separated integers', 'Space-separated integers (duplicates in any order)', 'n == nums.length
1 <= n <= 10^5
1 <= nums[i] <= n
Each element in nums appears once or twice.', 'LeetCode #442', '"2025-11-21T13:46:56.684Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1341, 'Kth Smallest Element in a BST', 'Given the root of a binary search tree, and an integer k, return the kth smallest value (1-indexed) of all the values of the nodes in the tree.

**Input Format:**
- First line: Size or parameter
- Second line: Space-separated values

**Output Format:**
- Print the result as specified in the problem statement

**Constraints:**
- 1 <= n <= 10^5
- -10^4 <= values <= 10^4', 'Medium', 'Tree', NULL, NULL, 'Line 1: Level-order traversal
Line 2: k', 'Single integer (kth smallest)', 'The number of nodes in the tree is n.
1 <= k <= n <= 10^4
0 <= Node.val <= 10^4', 'LeetCode #230', '"2025-11-21T13:46:57.022Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1266, 'Maximum Depth of Binary Tree', 'Given the root of a binary tree, return its maximum depth.

A binary tree''s maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.

**Example 1:**
Input: root = [3,9,20,null,null,15,7]
Output: 3

**Example 2:**
Input: root = [1,null,2]
Output: 2

**Input Format:**
- The input is given as a level-order traversal of the tree (space-separated). ''null'' represents a missing node.

**Output Format:**
- Print the integer depth.

**Constraints:**
- The number of nodes in the tree is in the range [0, 10^4].
- -100 <= Node.val <= 100', 'Easy', 'Tree', '3 9 20 null null 15 7', '3', 'Level-order traversal: space-separated values (null for empty nodes)', 'Single integer (maximum depth)', 'The number of nodes in the tree is in the range [0, 10^4].
-100 <= Node.val <= 100', 'LeetCode #104', '"2025-11-21T13:46:56.561Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1384, 'First Unique Character in Stream', 'Find first non-repeating character after each insertion.

**Input Format:**
- A single value

**Output Format:**
- Print the result as specified in the problem statement

**Constraints:**
- 1 <= n <= 10^3
- Values fit in standard integer range', 'Easy', 'Queue', NULL, NULL, 'String of characters added one by one.', 'First unique char after each add ("-1" if none).', '1 ≤ length ≤ 4×10^4', NULL, '"2025-11-21T14:08:54.276Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1385, 'Time Needed to Buy Tickets', 'Calculate time for person at position k to buy tickets.

**Input Format:**
- First line: Size or parameter
- Second line: Space-separated values

**Output Format:**
- Print the result as specified in the problem statement

**Constraints:**
- 1 <= n <= 10^3
- Values fit in standard integer range', 'Easy', 'Queue', NULL, NULL, 'First line: tickets array. Second line: k.', 'Time in seconds.', '1 ≤ n ≤ 100', NULL, '"2025-11-21T14:08:54.280Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1390, 'Constrained Subsequence Sum', 'Max sum of subsequence with adjacent elements ≤ k apart.

**Input Format:**
- First line: Size or parameter
- Second line: Space-separated values

**Output Format:**
- Print the result as specified in the problem statement

**Constraints:**
- 1 <= n <= 10^6
- Values fit in 64-bit integer range', 'Hard', 'Queue', NULL, NULL, 'First line: n k. Second line: array.', 'Maximum sum.', '1 ≤ k ≤ n ≤ 10^5', NULL, '"2025-11-21T14:08:54.297Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1381, 'Implement Queue using Stacks', 'Implement FIFO queue using only two stacks.

**Input Format:**
- First line: Size/Count
- Second line: Values

**Output Format:**
- Print the result as specified

**Constraints:**
- 1 <= n <= 10^3
- Values fit in integer range

**Note:**
- Ensure that your solution handles all edge cases and constraints effectively.
- Optimized time and space complexity is expected for this problem.', 'Easy', 'Queue', NULL, NULL, 'Operations: "push x", "pop", "peek", "empty".', 'Results for pop/peek/empty.', '1 ≤ ops ≤ 100', NULL, '"2025-11-21T14:08:54.258Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1382, 'Design Circular Queue', 'Design circular queue with fixed size.

**Input Format:**
- First line: Size/Count
- Second line: Values

**Output Format:**
- Print the result as specified

**Constraints:**
- 1 <= n <= 10^3
- Values fit in integer range

**Note:**
- Ensure that your solution handles all edge cases and constraints effectively.
- Optimized time and space complexity is expected for this problem.', 'Easy', 'Queue', NULL, NULL, 'First line: size. Next: operations.', 'Operation results.', '1 ≤ k ≤ 1000', NULL, '"2025-11-21T14:08:54.269Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1383, 'Number of Recent Calls', 'Count requests in last 3000ms.

**Input Format:**
- First line: Size/Count
- Second line: Values

**Output Format:**
- Print the result as specified

**Constraints:**
- 1 <= n <= 10^3
- Values fit in integer range

**Note:**
- Ensure that your solution handles all edge cases and constraints effectively.
- Optimized time and space complexity is expected for this problem.', 'Easy', 'Queue', NULL, NULL, 'Timestamps one per line.', 'Count after each ping.', '1 ≤ calls ≤ 10^4', NULL, '"2025-11-21T14:08:54.273Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1386, 'Jump Game VI', 'Max score jumping at most k steps.

**Input Format:**
- First line: Size/Count
- Second line: Values

**Output Format:**
- Print the result as specified

**Constraints:**
- 1 <= n <= 10^5
- -10^4 <= values <= 10^4

**Note:**
- Ensure that your solution handles all edge cases and constraints effectively.
- Optimized time and space complexity is expected for this problem.', 'Medium', 'Queue', NULL, NULL, 'First line: n k. Second line: array.', 'Maximum score.', '1 ≤ n ≤ 10^5', NULL, '"2025-11-21T14:08:54.285Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1387, 'Shortest Subarray with Sum K', 'Find shortest subarray with sum ≥ k.

**Input Format:**
- First line: Size/Count
- Second line: Values

**Output Format:**
- Print the result as specified

**Constraints:**
- 1 <= n <= 10^5
- -10^4 <= values <= 10^4

**Note:**
- Ensure that your solution handles all edge cases and constraints effectively.
- Optimized time and space complexity is expected for this problem.', 'Medium', 'Queue', NULL, NULL, 'First line: n k. Second line: array.', 'Shortest length or -1.', '1 ≤ n ≤ 10^5', NULL, '"2025-11-21T14:08:54.288Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1388, 'Reveal Cards Increasing', 'Arrange deck to reveal in increasing order.

**Input Format:**
- Space-separated values

**Output Format:**
- Print the result as specified

**Constraints:**
- 1 <= n <= 10^5
- -10^4 <= values <= 10^4

**Note:**
- Ensure that your solution handles all edge cases and constraints effectively.
- Optimized time and space complexity is expected for this problem.', 'Medium', 'Queue', NULL, NULL, 'Space-separated card values.', 'Deck order.', '1 ≤ n ≤ 1000', NULL, '"2025-11-21T14:08:54.290Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1389, 'Dota2 Senate', 'Simulate voting rounds.

**Input Format:**
- A single value

**Output Format:**
- Print the result as specified

**Constraints:**
- 1 <= n <= 10^5
- -10^4 <= values <= 10^4

**Note:**
- Ensure that your solution handles all edge cases and constraints effectively.
- Optimized time and space complexity is expected for this problem.', 'Medium', 'Queue', NULL, NULL, 'String of R and D.', '"Radiant" or "Dire".', '1 ≤ n ≤ 10^4', NULL, '"2025-11-21T14:08:54.293Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1391, 'Maximum of Absolute Value Expression', 'Max of |arr1[i]-arr1[j]|+|arr2[i]-arr2[j]|+|i-j|.

**Input Format:**
- First line: Size/Count
- Second line: Values

**Output Format:**
- Print the result as specified

**Constraints:**
- 1 <= n <= 10^6
- Values fit in 64-bit integer range

**Note:**
- Ensure that your solution handles all edge cases and constraints effectively.
- Optimized time and space complexity is expected for this problem.', 'Hard', 'Queue', NULL, NULL, 'First line: n. Second line: arr1. Third line: arr2.', 'Maximum value.', '2 ≤ n ≤ 4×10^4', NULL, '"2025-11-21T14:08:54.299Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1393, 'Perfect Square', 'Check if number is perfect square.

**Input Format:**
- A single value

**Output Format:**
- Print the result as specified

**Constraints:**
- 1 <= n <= 10^3
- Values fit in integer range

**Note:**
- Ensure that your solution handles all edge cases and constraints effectively.
- Optimized time and space complexity is expected for this problem.', 'Easy', 'Binary Search', NULL, NULL, 'Integer n.', '"true" or "false".', '1 ≤ n ≤ 2^31-1', NULL, '"2025-11-21T14:08:54.307Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1289, 'Min Stack', 'Design a stack that supports push, pop, top, and retrieving the minimum element in constant time.

Implement the MinStack class:
- MinStack() initializes the stack object.
- void push(int val) pushes the element val onto the stack.
- void pop() removes the element on the top of the stack.
- int top() gets the top element of the stack.
- int getMin() retrieves the minimum element in the stack.

You must implement a solution with O(1) time complexity for each function.

**Input Format:**
- Operations are provided as commands on separate lines.

**Output Format:**
- For top() and getMin() operations, print the result on a new line.

**Constraints:**
- -2^31 <= val <= 2^31 - 1
- Methods pop, top and getMin operations will always be called on non-empty stacks.
- At most 3 * 10^4 calls will be made to push, pop, top, and getMin.', 'Medium', 'Stack', 'push -2
push 0
push -3
getMin
pop
top
getMin', '-3
0
-2', 'First line: n (number of operations)
Next n lines: operation val (push/pop/top/getMin)', 'Output for each top/getMin operation', '-2^31 <= val <= 2^31 - 1
Methods pop, top and getMin operations will always be called on non-empty stacks.
At most 3 * 10^4 calls will be made to push, pop, top, and getMin.', 'LeetCode #155', '"2025-11-21T13:46:56.561Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1275, '0/1 Knapsack Problem', 'Given N items where each item has some weight and profit associated with it and also given a bag with capacity W, [i.e., the bag can hold at most W weight in it]. The task is to put the items into the bag such that the sum of profits associated with them is the maximum possible. 

Note: The constraint here is we can either put an item completely into the bag or cannot put it at all [It is not possible to put a part of an item into the bag].

**Input Format:**
- First line: N (number of items)
- Second line: N space-separated integers (profits)
- Third line: N space-separated integers (weights)
- Fourth line: W (capacity)

**Output Format:**
- A single integer representing the maximum profit.

**Constraints:**
- 1 <= N <= 1000
- 1 <= W <= 1000
- 1 <= weights[i] <= 1000
- 1 <= profits[i] <= 1000', 'Medium', 'Dynamic Programming', '3 4
4 5 1
1 2 3', '3', NULL, NULL, NULL, NULL, '"2025-11-21T13:46:56.561Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1290, 'Evaluate Reverse Polish Notation', 'You are given an array of strings tokens that represents an arithmetic expression in a Reverse Polish Notation.

Evaluate the expression. Return an integer that represents the value of the expression.

Note that:
- The valid operators are ''+'', ''-'', ''*'', and ''/''.
- Each operand may be an integer or another expression.
- The division between two integers always truncates toward zero.
- There will not be any division by zero.
- The input represents a valid arithmetic expression in a reverse polish notation.
- The answer and all the intermediate calculations can be represented in a 32-bit integer.

**Input Format:**
- First line: n (number of tokens)
- Second line: n space-separated tokens

**Output Format:**
- A single integer representing the result.

**Constraints:**
- 1 <= tokens.length <= 10^4
- tokens[i] is either an operator: "+", "-", "*", or "/", or an integer in the range [-200, 200].', 'Medium', 'Stack', '2 1 + 3 *', '9', 'First line: n (number of tokens)
Second line: n space-separated tokens', 'Single integer (result)', '1 <= tokens.length <= 10^4
tokens[i] is either an operator: "+", "-", "*", or "/", or an integer in the range [-200, 200].', 'LeetCode #150', '"2025-11-21T13:46:56.561Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1352, 'Last Stone Weight', 'Simulate smashing stones until one or none remain.

**Input Format:**
- First line: Size/Count
- Second line: Values

**Output Format:**
- Print the result as specified

**Constraints:**
- 1 <= n <= 10^3
- Values fit in integer range

**Note:**
- Ensure that your solution handles all edge cases and constraints effectively.
- Optimized time and space complexity is expected for this problem.', 'Easy', 'Heap', NULL, NULL, 'First line: n. Second line: n space-separated integers (stone weights).', 'Weight of last remaining stone or 0.', '1 ≤ n ≤ 30', NULL, '"2025-11-21T14:02:28.362Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1354, 'Find Kth Smallest Element', 'Find the kth smallest element in an array.

**Input Format:**
- First line: Size/Count
- Second line: Values

**Output Format:**
- Print the result as specified

**Constraints:**
- 1 <= n <= 10^3
- Values fit in integer range

**Note:**
- Ensure that your solution handles all edge cases and constraints effectively.
- Optimized time and space complexity is expected for this problem.', 'Easy', 'Heap', NULL, NULL, 'First line: n k. Second line: n space-separated integers.', 'Kth smallest element.', '1 ≤ k ≤ n ≤ 10^5', NULL, '"2025-11-21T14:02:28.370Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1395, 'Find Minimum in Rotated Array', 'Find minimum in rotated sorted array.

**Input Format:**
- Space-separated values

**Output Format:**
- Print the result as specified

**Constraints:**
- 1 <= n <= 10^5
- -10^4 <= values <= 10^4

**Note:**
- Ensure that your solution handles all edge cases and constraints effectively.
- Optimized time and space complexity is expected for this problem.', 'Medium', 'Binary Search', NULL, NULL, 'Space-separated array.', 'Minimum value.', '1 ≤ n ≤ 5000', NULL, '"2025-11-21T14:08:54.314Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1396, 'Koko Eating Bananas', 'Min eating speed to finish in h hours.

**Input Format:**
- First line: Size/Count
- Second line: Values

**Output Format:**
- Print the result as specified

**Constraints:**
- 1 <= n <= 10^5
- -10^4 <= values <= 10^4

**Note:**
- Ensure that your solution handles all edge cases and constraints effectively.
- Optimized time and space complexity is expected for this problem.', 'Medium', 'Binary Search', NULL, NULL, 'First line: piles. Second line: h.', 'Minimum k.', '1 ≤ piles ≤ 10^4, piles.length ≤ h', NULL, '"2025-11-21T14:08:54.317Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1397, 'Capacity To Ship Packages', 'Min capacity to ship within days.

**Input Format:**
- First line: Size/Count
- Second line: Values

**Output Format:**
- Print the result as specified

**Constraints:**
- 1 <= n <= 10^5
- -10^4 <= values <= 10^4

**Note:**
- Ensure that your solution handles all edge cases and constraints effectively.
- Optimized time and space complexity is expected for this problem.', 'Medium', 'Binary Search', NULL, NULL, 'First line: weights. Second line: days.', 'Minimum capacity.', '1 ≤ days ≤ n ≤ 5×10^4', NULL, '"2025-11-21T14:08:54.320Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1398, 'Count of Range Sum', 'Count range sums in [lower, upper].

**Input Format:**
- First line: Size/Count
- Second line: Values

**Output Format:**
- Print the result as specified

**Constraints:**
- 1 <= n <= 10^6
- Values fit in 64-bit integer range

**Note:**
- Ensure that your solution handles all edge cases and constraints effectively.
- Optimized time and space complexity is expected for this problem.', 'Hard', 'Binary Search', NULL, NULL, 'First line: nums. Second line: lower upper.', 'Count.', '1 ≤ n ≤ 10^4', NULL, '"2025-11-21T14:08:54.324Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1500, 'Sort List', 'Sort linked list in O(n log n).

**Input Format:**
- Space-separated values

**Output Format:**
- Print the result as specified

**Constraints:**
- 1 <= n <= 10^6
- Values fit in 64-bit integer range

**Note:**
- Ensure that your solution handles all edge cases and constraints effectively.
- Optimized time and space complexity is expected for this problem.', 'Hard', 'Linked List', NULL, NULL, 'Space-separated values.', 'Sorted list.', '0≤n≤5×10^4', NULL, '"2025-11-21T14:18:35.116Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1501, 'Convert Sorted List to BST', 'Convert sorted list to height-balanced BST.

**Input Format:**
- As described in the problem statement

**Output Format:**
- Print the result as specified

**Constraints:**
- 1 <= n <= 10^6
- Values fit in 64-bit integer range

**Note:**
- Ensure that your solution handles all edge cases and constraints effectively.
- Optimized time and space complexity is expected for this problem.', 'Hard', 'Linked List', NULL, NULL, 'Sorted linked list.', 'BST level-order.', '0≤n≤2×10^4', NULL, '"2025-11-21T14:18:35.123Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1295, 'Word Ladder', 'A transformation sequence from word beginWord to word endWord using a dictionary wordList is a sequence of words beginWord -> s1 -> s2 -> ... -> sk such that:

- Every adjacent pair of words differs by a single letter.
- Every si for 1 <= i <= k is in wordList. Note that beginWord does not need to be in wordList.
- sk == endWord

Given two words, beginWord and endWord, and a dictionary wordList, return the number of words in the shortest transformation sequence from beginWord to endWord, or 0 if no such sequence exists.

**Input Format:**
- First line: beginWord
- Second line: endWord
- Third line: space-separated words in wordList

**Output Format:**
- A single integer representing the length of the sequence.

**Constraints:**
- 1 <= beginWord.length <= 10
- endWord.length == beginWord.length
- 1 <= wordList.length <= 5000
- wordList[i].length == beginWord.length
- beginWord, endWord, and wordList[i] consist of lowercase English letters.
- beginWord != endWord
- All the words in wordList are unique.', 'Hard', 'Graph', 'hit cog
6
hot dot dog lot log cog', '5', 'First line: beginWord
Second line: endWord
Third line: n (dictionary size)
Fourth line: n space-separated words', 'Single integer (shortest length or 0)', '1 <= beginWord.length <= 10
endWord.length == beginWord.length
1 <= wordList.length <= 5000
wordList[i].length == beginWord.length
beginWord, endWord, and wordList[i] consist of lowercase English letters.
beginWord != endWord
All the words in wordList are unique.', 'LeetCode #127', '"2025-11-21T13:46:56.561Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1348, 'Median of Two Sorted Arrays', 'Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.

The overall run time complexity should be O(log (m+n)).

**Input Format:**
- First line: m (size of nums1)
- Second line: m space-separated integers
- Third line: n (size of nums2)
- Fourth line: n space-separated integers

**Output Format:**
- A single float representing the median.

**Constraints:**
- nums1.length == m
- nums2.length == n
- 0 <= m <= 1000
- 0 <= n <= 1000
- 1 <= m + n <= 2000
- -10^6 <= nums1[i], nums2[i] <= 10^6', 'Hard', 'Array', NULL, NULL, 'First line: m n. Second line: m integers. Third line: n integers.', 'Median as a decimal with 1 decimal place.', '0 ≤ m, n ≤ 1000', NULL, '"2025-11-21T14:02:28.341Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1402, 'Balanced Binary Tree', 'Check height-balanced.

**Input Format:**
- Space-separated values

**Output Format:**
- Print the result as specified

**Constraints:**
- 1 <= n <= 10^3
- Values fit in integer range

**Note:**
- Ensure that your solution handles all edge cases and constraints effectively.
- Optimized time and space complexity is expected for this problem.', 'Easy', 'Tree', NULL, NULL, 'Level-order.', '"true"/"false".', '0≤n≤5000', NULL, '"2025-11-21T14:11:15.987Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1405, 'Binary Tree Level Order', 'Level order traversal.

**Input Format:**
- Space-separated values

**Output Format:**
- Print the result as specified

**Constraints:**
- 1 <= n <= 10^5
- -10^4 <= values <= 10^4

**Note:**
- Ensure that your solution handles all edge cases and constraints effectively.
- Optimized time and space complexity is expected for this problem.', 'Medium', 'Tree', NULL, NULL, 'Level-order.', 'Each level on new line.', '0≤n≤2000', NULL, '"2025-11-21T14:11:15.997Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1408, 'Serialize Deserialize Tree', 'Encode & decode tree.

**Input Format:**
- As described in the problem statement

**Output Format:**
- Print the result as specified

**Constraints:**
- 1 <= n <= 10^6
- Values fit in 64-bit integer range

**Note:**
- Ensure that your solution handles all edge cases and constraints effectively.
- Optimized time and space complexity is expected for this problem.', 'Hard', 'Tree', NULL, NULL, 'Level-order (null for empty).', 'Same format.', '0≤n≤10^4', NULL, '"2025-11-21T14:11:16.005Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1411, 'Find Town Judge', 'Find judge (trusted by all, trusts none).

**Input Format:**
- First line: Size/Count
- Second line: Values

**Output Format:**
- Print the result as specified

**Constraints:**
- 1 <= n <= 10^3
- Values fit in integer range

**Note:**
- Ensure that your solution handles all edge cases and constraints effectively.
- Optimized time and space complexity is expected for this problem.', 'Easy', 'Graph', NULL, NULL, 'n. Edges: a trusts b.', 'Judge or -1.', '1≤n≤1000', NULL, '"2025-11-21T14:11:16.013Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1415, 'Pacific Atlantic Water', 'Cells flowing to both oceans.

**Input Format:**
- First line: Size/Count
- Second line: Values

**Output Format:**
- Print the result as specified

**Constraints:**
- 1 <= n <= 10^5
- -10^4 <= values <= 10^4

**Note:**
- Ensure that your solution handles all edge cases and constraints effectively.
- Optimized time and space complexity is expected for this problem.', 'Medium', 'Graph', NULL, NULL, 'Matrix.', 'Coordinates.', '1≤m,n≤200', NULL, '"2025-11-21T14:11:16.027Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1418, 'Min Cost Climbing', 'Min cost to reach top.

**Input Format:**
- Space-separated values

**Output Format:**
- Print the result as specified

**Constraints:**
- 1 <= n <= 10^3
- Values fit in integer range

**Note:**
- Ensure that your solution handles all edge cases and constraints effectively.
- Optimized time and space complexity is expected for this problem.', 'Easy', 'Dynamic Programming', NULL, NULL, 'Cost array.', 'Min cost.', '2≤n≤1000', NULL, '"2025-11-21T14:11:16.036Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1421, 'Partition Equal Subset', 'Can partition into equal sums.

**Input Format:**
- Space-separated values

**Output Format:**
- Print the result as specified

**Constraints:**
- 1 <= n <= 10^5
- -10^4 <= values <= 10^4

**Note:**
- Ensure that your solution handles all edge cases and constraints effectively.
- Optimized time and space complexity is expected for this problem.', 'Medium', 'Dynamic Programming', NULL, NULL, 'Array.', '"true"/"false".', '1≤n≤200', NULL, '"2025-11-21T14:11:16.046Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1424, 'Lemonade Change', 'Can provide change.

**Input Format:**
- Space-separated values

**Output Format:**
- Print the result as specified

**Constraints:**
- 1 <= n <= 10^3
- Values fit in integer range

**Note:**
- Ensure that your solution handles all edge cases and constraints effectively.
- Optimized time and space complexity is expected for this problem.', 'Easy', 'Greedy', NULL, NULL, 'Bills.', '"true"/"false".', '1≤n≤10^5', NULL, '"2025-11-21T14:11:16.056Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1427, 'Queue Reconstruction', 'Reconstruct queue.

**Input Format:**
- First line: Size/Count
- Second line: Values

**Output Format:**
- Print the result as specified

**Constraints:**
- 1 <= n <= 10^5
- -10^4 <= values <= 10^4

**Note:**
- Ensure that your solution handles all edge cases and constraints effectively.
- Optimized time and space complexity is expected for this problem.', 'Medium', 'Greedy', NULL, NULL, 'People: [h,k].', 'Reconstructed queue.', '1≤n≤2000', NULL, '"2025-11-21T14:11:16.066Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1430, 'Letter Case Permutation', 'All case permutations.

**Input Format:**
- A single value

**Output Format:**
- Print the result as specified

**Constraints:**
- 1 <= n <= 10^3
- Values fit in integer range

**Note:**
- Ensure that your solution handles all edge cases and constraints effectively.
- Optimized time and space complexity is expected for this problem.', 'Easy', 'Backtracking', NULL, NULL, 'String.', 'All permutations.', '1≤length≤12', NULL, '"2025-11-21T14:11:16.075Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1502, 'Scramble String', 'Check if s2 is scrambled version of s1.

**Input Format:**
- First line: Size/Count
- Second line: Values

**Output Format:**
- Print the result as specified

**Constraints:**
- 1 <= n <= 10^6
- Values fit in 64-bit integer range

**Note:**
- Ensure that your solution handles all edge cases and constraints effectively.
- Optimized time and space complexity is expected for this problem.', 'Hard', 'String', NULL, NULL, 'String s1. String s2.', '"true"/"false".', '1≤s1,s2≤30', NULL, '"2025-11-21T14:19:06.715Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1488, 'Intersection of Two Lists', 'Given the heads of two singly linked-lists headA and headB, return the node at which the two lists intersect. If the two linked lists have no intersection at all, return null.

For example, the following two linked lists begin to intersect at node c1:
A:       a1 -> a2
                   ↘
                     c1 -> c2 -> c3
                   ↗
B: b1 -> b2 -> b3

The test cases are generated such that there are no cycles anywhere in the entire linked structure.

Note that the linked lists must retain their original structure after the function returns.

**Input Format:**
- First line: intersectVal (value of intersection node, 0 if none)
- Second line: listA (space-separated values)
- Third line: listB (space-separated values)
- Fourth line: skipA (number of nodes to skip in A before intersection)
- Fifth line: skipB (number of nodes to skip in B before intersection)

**Output Format:**
- The value of the intersected node, or "null" if no intersection.

**Constraints:**
- The number of nodes of listA is in the m.
- The number of nodes of listB is in the n.
- 1 <= m, n <= 3 * 10^4
- 1 <= Node.val <= 10^5
- 0 <= skipA < m
- 0 <= skipB < n
- intersectVal is 0 if listA and listB do not intersect.
- intersectVal == listA[skipA] == listB[skipB] if listA and listB intersect.', 'Easy', 'Linked List', NULL, NULL, 'Two lists. Intersection index.', 'Intersection value or "null".', '0≤m,n≤3×10^4', NULL, '"2025-11-21T14:17:02.018Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1243, 'Contains Duplicate', 'Given an integer array nums, return true if any value appears at least twice in the array, and return false if every element is distinct.

**Example 1:**
Input: nums = [1,2,3,1]
Output: true

**Example 2:**
Input: nums = [1,2,3,4]
Output: false

**Example 3:**
Input: nums = [1,1,1,3,3,4,3,2,4,2]
Output: true

**Input Format:**
- A single line containing space-separated integers representing the array nums.

**Output Format:**
- Print "true" if duplicates exist, otherwise "false".

**Constraints:**
- 1 <= nums.length <= 10^5
- -10^9 <= nums[i] <= 10^9', 'Easy', 'Hashing', '4
1 2 3 1', 'true', 'First line: n (size of array)
Second line: n space-separated integers', 'true or false', '1 <= nums.length <= 10^5
-10^9 <= nums[i] <= 10^9', 'LeetCode #217', '"2025-11-21T13:46:56.561Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1355, 'Merge K Sorted Lists', 'Merge k sorted linked lists into one sorted list.

**Input Format:**
- First line: Size/Count
- Second line: Values

**Output Format:**
- Print the result as specified

**Constraints:**
- 1 <= n <= 10^5
- -10^4 <= values <= 10^4

**Note:**
- Ensure that your solution handles all edge cases and constraints effectively.
- Optimized time and space complexity is expected for this problem.', 'Medium', 'Heap', NULL, NULL, 'First line: k. Next k lines: space-separated sorted integers.', 'Space-separated merged sorted list.', '0 ≤ k ≤ 10^4', NULL, '"2025-11-21T14:02:28.375Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1437, 'Same Tree', 'Check if two trees are identical.

**Input Format:**
- First line: Size/Count
- Second line: Values

**Output Format:**
- Print the result as specified

**Constraints:**
- 1 <= n <= 10^3
- Values fit in integer range

**Note:**
- Ensure that your solution handles all edge cases and constraints effectively.
- Optimized time and space complexity is expected for this problem.', 'Easy', 'Tree', NULL, NULL, 'Tree1. Tree2 (level-order).', '"true"/"false".', '0≤n≤100', NULL, '"2025-11-21T14:13:24.995Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1441, 'Populating Next Right Pointers', 'Populate next right pointers.

**Input Format:**
- Space-separated values

**Output Format:**
- Print the result as specified

**Constraints:**
- 1 <= n <= 10^5
- -10^4 <= values <= 10^4

**Note:**
- Ensure that your solution handles all edge cases and constraints effectively.
- Optimized time and space complexity is expected for this problem.', 'Medium', 'Tree', NULL, NULL, 'Perfect binary tree.', 'Tree with next pointers.', '0≤n≤4095', NULL, '"2025-11-21T14:13:25.015Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1444, 'N-ary Tree Max Depth', 'Max depth of n-ary tree.

**Input Format:**
- Space-separated values

**Output Format:**
- Print the result as specified

**Constraints:**
- 1 <= n <= 10^3
- Values fit in integer range

**Note:**
- Ensure that your solution handles all edge cases and constraints effectively.
- Optimized time and space complexity is expected for this problem.', 'Easy', 'Graph', NULL, NULL, 'Tree levels.', 'Max depth.', '0≤n≤10^4', NULL, '"2025-11-21T14:13:25.029Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1447, 'Shortest Path Binary Matrix', 'Shortest clear path.

**Input Format:**
- First line: Size/Count
- Second line: Values

**Output Format:**
- Print the result as specified

**Constraints:**
- 1 <= n <= 10^5
- -10^4 <= values <= 10^4

**Note:**
- Ensure that your solution handles all edge cases and constraints effectively.
- Optimized time and space complexity is expected for this problem.', 'Medium', 'Graph', NULL, NULL, 'Grid.', 'Path length or -1.', '1≤n≤100', NULL, '"2025-11-21T14:13:25.043Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1450, 'Word Ladder II', 'All shortest transformation paths.

**Input Format:**
- First line: Size/Count
- Second line: Values

**Output Format:**
- Print the result as specified

**Constraints:**
- 1 <= n <= 10^6
- Values fit in 64-bit integer range

**Note:**
- Ensure that your solution handles all edge cases and constraints effectively.
- Optimized time and space complexity is expected for this problem.', 'Hard', 'Graph', NULL, NULL, 'Begin end. Dictionary.', 'All shortest paths.', '1≤words≤5000', NULL, '"2025-11-21T14:13:25.054Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1453, 'Pascal Triangle', 'Generate first numRows.

**Input Format:**
- A single value

**Output Format:**
- Print the result as specified

**Constraints:**
- 1 <= n <= 10^3
- Values fit in integer range

**Note:**
- Ensure that your solution handles all edge cases and constraints effectively.
- Optimized time and space complexity is expected for this problem.', 'Easy', 'Dynamic Programming', NULL, NULL, 'numRows', 'Pascal triangle.', '1≤numRows≤30', NULL, '"2025-11-21T14:13:25.065Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1456, 'Min Cost Climbing Stairs', 'Min cost to reach top.

**Input Format:**
- Space-separated values

**Output Format:**
- Print the result as specified

**Constraints:**
- 1 <= n <= 10^3
- Values fit in integer range

**Note:**
- Ensure that your solution handles all edge cases and constraints effectively.
- Optimized time and space complexity is expected for this problem.', 'Easy', 'Greedy', NULL, NULL, 'Cost array.', 'Min cost.', '2≤n≤1000', NULL, '"2025-11-21T14:13:25.077Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1459, 'Binary Watch', 'Possible times with num LEDs on.

**Input Format:**
- A single value

**Output Format:**
- Print the result as specified

**Constraints:**
- 1 <= n <= 10^3
- Values fit in integer range

**Note:**
- Ensure that your solution handles all edge cases and constraints effectively.
- Optimized time and space complexity is expected for this problem.', 'Easy', 'Backtracking', NULL, NULL, 'num (turned on LEDs)', 'All times.', '0≤num≤10', NULL, '"2025-11-21T14:13:25.087Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1462, 'N-Queens II', 'Count solutions to N-Queens.

**Input Format:**
- A single value

**Output Format:**
- Print the result as specified

**Constraints:**
- 1 <= n <= 10^6
- Values fit in 64-bit integer range

**Note:**
- Ensure that your solution handles all edge cases and constraints effectively.
- Optimized time and space complexity is expected for this problem.', 'Hard', 'Backtracking', NULL, NULL, 'n', 'Solution count.', '1≤n≤9', NULL, '"2025-11-21T14:13:25.098Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1504, 'Merge k Sorted Arrays', 'Merge k sorted arrays.

**Input Format:**
- First line: Size/Count
- Second line: Values

**Output Format:**
- Print the result as specified

**Constraints:**
- 1 <= n <= 10^6
- Values fit in 64-bit integer range

**Note:**
- Ensure that your solution handles all edge cases and constraints effectively.
- Optimized time and space complexity is expected for this problem.', 'Hard', 'Array', NULL, NULL, 'First line: k. Next k lines: sorted arrays.', 'Merged sorted array.', '0≤k≤10^4', NULL, '"2025-11-21T14:19:35.035Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1394, 'Sqrt(x)', 'Given a non-negative integer x, return the square root of x rounded down to the nearest integer. The returned integer should be non-negative as well.

You must not use any built-in exponent function or operator.
- For example, do not use pow(x, 0.5) or x ** 0.5.

**Input Format:**
- A single integer x.

**Output Format:**
- A single integer representing the square root of x rounded down.

**Constraints:**
- 0 <= x <= 2^31 - 1', 'Easy', 'Binary Search', NULL, NULL, 'Integer x.', 'Floor of sqrt(x).', '0 ≤ x ≤ 2^31-1', NULL, '"2025-11-21T14:08:54.310Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1283, 'Subsets', 'Given an integer array nums of unique elements, return all possible subsets (the power set).

The solution set must not contain duplicate subsets. Return the solution in any order.

**Input Format:**
- First line: n (size of array)
- Second line: n space-separated integers (unique elements)

**Output Format:**
- Print each subset on a new line.
- Elements within a subset should be space-separated.
- Empty subset can be printed as "[]" or empty line.

**Constraints:**
- 1 <= nums.length <= 10
- -10 <= nums[i] <= 10
- All the numbers of nums are unique.', 'Medium', 'Backtracking', '3
1 2 3', '
1
2
1 2
3
1 3
2 3
1 2 3', NULL, NULL, NULL, NULL, '"2025-11-21T13:46:56.561Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1369, 'Remove Linked List Elements', 'Given the head of a linked list and an integer val, remove all the nodes of the linked list that has Node.val == val, and return the new head.

**Example 1:**
Input: head = [1,2,6,3,4,5,6], val = 6
Output: [1,2,3,4,5]

**Example 2:**
Input: head = [], val = 1
Output: []

**Example 3:**
Input: head = [7,7,7,7], val = 7
Output: []

**Input Format:**
- The first line contains the elements of the linked list separated by spaces.
- The second line contains the integer val.

**Output Format:**
- Print the elements of the modified linked list separated by spaces.

**Constraints:**
- The number of nodes in the list is in the range [0, 10^4].
- 1 <= Node.val <= 50
- 0 <= val <= 50', 'Easy', 'Linked List', NULL, NULL, 'First line: list. Second line: val.', 'Modified list.', '0 ≤ n ≤ 10^4', NULL, '"2025-11-21T14:07:27.797Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1247, 'Product of Array Except Self', 'Given an integer array nums, return an array answer such that answer[i] is equal to the product of all the elements of nums except nums[i].

The product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer.

You must write an algorithm that runs in O(n) time and without using the division operation.

**Example 1:**
Input: nums = [1,2,3,4]
Output: [24,12,8,6]

**Example 2:**
Input: nums = [-1,1,0,-3,3]
Output: [0,0,9,0,0]

**Input Format:**
- A single line containing space-separated integers representing the array nums.

**Output Format:**
- Print the result array elements separated by spaces.

**Constraints:**
- 2 <= nums.length <= 10^5
- -30 <= nums[i] <= 30', 'Medium', 'Array', '4
1 2 3 4', '24 12 8 6', 'First line: n (size of array)
Second line: n space-separated integers', 'n space-separated integers', '2 <= nums.length <= 10^5
-30 <= nums[i] <= 30
The product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer.', 'LeetCode #238', '"2025-11-21T13:46:56.561Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1261, 'Reverse Linked List', 'Given the head of a singly linked list, reverse the list, and return the reversed list.

**Example 1:**
Input: head = [1,2,3,4,5]
Output: [5,4,3,2,1]

**Example 2:**
Input: head = [1,2]
Output: [2,1]

**Input Format:**
- A single line containing space-separated integers representing the linked list nodes.

**Output Format:**
- Print the reversed list elements separated by spaces.

**Constraints:**
- The number of nodes in the list is the range [0, 5000].
- -5000 <= Node.val <= 5000', 'Easy', 'Linked List', '5
1 2 3 4 5', '5 4 3 2 1', 'First line: n (number of nodes)
Second line: n space-separated integers', 'n space-separated integers (reversed list)', 'The number of nodes in the list is the range [0, 5000].
-5000 <= Node.val <= 5000', 'LeetCode #206', '"2025-11-21T13:46:56.561Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1477, 'Reconstruct Itinerary', 'Reconstruct travel itinerary (lexicographically smallest).

**Input Format:**
- 4 lines of input

**Output Format:**
- Print the result as specified in the problem statement

**Constraints:**
- 1 <= n <= 10^6
- Values fit in 64-bit integer range', 'Hard', 'Graph', NULL, NULL, 'Tickets (from to).', 'Itinerary.', '1≤tickets≤300', NULL, '"2025-11-21T14:15:58.345Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1465, 'Employee Free Time', 'Common free time intervals.

**Input Format:**
- First line: Size/Count
- Second line: Values

**Output Format:**
- Print the result as specified

**Constraints:**
- 1 <= n <= 10^6
- Values fit in 64-bit integer range

**Note:**
- Ensure that your solution handles all edge cases and constraints effectively.
- Optimized time and space complexity is expected for this problem.', 'Hard', 'Greedy', NULL, NULL, 'Employee schedules.', 'Free intervals.', '1≤employees≤500', NULL, '"2025-11-21T14:15:58.292Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1469, 'Maximum Average Subarray II', 'Max average of subarray length ≥ k.

**Input Format:**
- First line: Size/Count
- Second line: Values

**Output Format:**
- Print the result as specified

**Constraints:**
- 1 <= n <= 10^6
- Values fit in 64-bit integer range

**Note:**
- Ensure that your solution handles all edge cases and constraints effectively.
- Optimized time and space complexity is expected for this problem.', 'Hard', 'Binary Search', NULL, NULL, 'Array. k.', 'Max average (3 decimals).', '1≤k≤n≤10^4', NULL, '"2025-11-21T14:15:58.312Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1472, 'Remove Invalid Parentheses', 'Remove min parentheses to make valid.

**Input Format:**
- A single value

**Output Format:**
- Print the result as specified

**Constraints:**
- 1 <= n <= 10^6
- Values fit in 64-bit integer range

**Note:**
- Ensure that your solution handles all edge cases and constraints effectively.
- Optimized time and space complexity is expected for this problem.', 'Hard', 'Stack', NULL, NULL, 'String.', 'All valid strings.', '1≤s≤25', NULL, '"2025-11-21T14:15:58.326Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1475, 'Burst Balloons', 'Max coins from bursting balloons.

**Input Format:**
- Space-separated values

**Output Format:**
- Print the result as specified

**Constraints:**
- 1 <= n <= 10^6
- Values fit in 64-bit integer range

**Note:**
- Ensure that your solution handles all edge cases and constraints effectively.
- Optimized time and space complexity is expected for this problem.', 'Hard', 'Dynamic Programming', NULL, NULL, 'Array of balloon values.', 'Max coins.', '1≤n≤500', NULL, '"2025-11-21T14:15:58.338Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1479, 'Reverse Nodes Between', 'Reverse nodes from position left to right.

**Input Format:**
- First line: Size/Count
- Second line: Values

**Output Format:**
- Print the result as specified

**Constraints:**
- 1 <= n <= 10^6
- Values fit in 64-bit integer range

**Note:**
- Ensure that your solution handles all edge cases and constraints effectively.
- Optimized time and space complexity is expected for this problem.', 'Hard', 'Linked List', NULL, NULL, 'Line 1: list. Line 2: left right.', 'Modified list.', '1≤left≤right≤n', NULL, '"2025-11-21T14:15:58.353Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1482, 'Count Unique BSTs', 'Count unique BSTs with n nodes.

**Input Format:**
- A single value

**Output Format:**
- Print the result as specified

**Constraints:**
- 1 <= n <= 10^6
- Values fit in 64-bit integer range

**Note:**
- Ensure that your solution handles all edge cases and constraints effectively.
- Optimized time and space complexity is expected for this problem.', 'Hard', 'Tree', NULL, NULL, 'n', 'Count.', '1≤n≤19', NULL, '"2025-11-21T14:15:58.364Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1307, 'Subarray Sum Equals K', 'Given an array of integers nums and an integer k, return the total number of subarrays whose sum equals to k.

A subarray is a contiguous non-empty sequence of elements within an array.

**Input Format:**
- 3 lines of input

**Output Format:**
- Print the result as specified in the problem statement

**Constraints:**
- 1 <= n <= 10^5
- -10^4 <= values <= 10^4', 'Medium', 'Array', '3
1 1 1
2', '2', 'First line: n (size of array)
Second line: n space-separated integers
Third line: k', 'Single integer (count)', '1 <= nums.length <= 2 * 10^4
-1000 <= nums[i] <= 1000
-10^7 <= k <= 10^7', 'LeetCode #560', '"2025-11-21T13:46:56.561Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1250, 'Merge Intervals', 'Given an array of intervals where intervals[i] = [starti, endi], merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.

**Input Format:**
- 5 lines of input

**Output Format:**
- Print the result as specified in the problem statement

**Constraints:**
- 1 <= n <= 10^5
- -10^4 <= values <= 10^4', 'Medium', 'Array', '4
1 3
2 6
8 10
15 18', '1 6
8 10
15 18', 'First line: n (number of intervals)
Next n lines: start end', 'Each line: start end (merged intervals)', '1 <= intervals.length <= 10^4
intervals[i].length == 2
0 <= starti <= endi <= 10^4', 'LeetCode #56', '"2025-11-21T13:46:56.561Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1308, 'Rotate Array', 'Given an integer array nums, rotate the array to the right by k steps, where k is non-negative.

Example 1:
Input: nums = [1,2,3,4,5,6,7], k = 3
Output: [5,6,7,1,2,3,4]
Explanation:
rotate 1 steps to the right: [7,1,2,3,4,5,6]
rotate 2 steps to the right: [6,7,1,2,3,4,5]
rotate 3 steps to the right: [5,6,7,1,2,3,4]

**Constraints:**
- 1 <= n <= 10^5
- -10^4 <= values <= 10^4



**Note:**
- Ensure that your solution handles all edge cases and constraints effectively.
- Optimized time and space complexity is expected for this problem.', 'Medium', 'Array', '7
1 2 3 4 5 6 7
3', '5 6 7 1 2 3 4', 'First line: n (size of array)
Second line: n space-separated integers
Third line: k (rotation steps)', 'n space-separated integers (rotated array)', '1 <= nums.length <= 10^5
-2^31 <= nums[i] <= 2^31 - 1
0 <= k <= 10^5', 'LeetCode #189', '"2025-11-21T13:46:56.684Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1310, 'Next Permutation', 'A permutation of an array of integers is an arrangement of its members into a sequence or linear order.

The next permutation of an array of integers is the next lexicographically greater permutation of its integer. More formally, if all the permutations of the array are sorted in one container according to their lexicographical order, then the next permutation of that array is the permutation that follows it in the sorted container. If such arrangement is not possible, the array must be rearranged as the lowest possible order (i.e., sorted in ascending order).

For example, the next permutation of arr = [1,2,3] is [1,3,2].
Similarly, the next permutation of arr = [2,3,1] is [3,1,2].
While the next permutation of arr = [3,2,1] is [1,2,3] because [3,2,1] does not have a lexicographical larger rearrangement.

**Input Format:**
- First line: Size or parameter
- Second line: Space-separated values

**Output Format:**
- Print the result as specified in the problem statement

**Constraints:**
- 1 <= n <= 10^5
- -10^4 <= values <= 10^4', 'Medium', 'Array', '3
1 2 3', '1 3 2', 'First line: n (size of array)
Second line: n space-separated integers', 'n space-separated integers (next permutation)', '1 <= nums.length <= 100
0 <= nums[i] <= 100', 'LeetCode #31', '"2025-11-21T13:46:56.684Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1319, 'Reorder List', 'You are given the head of a singly linked-list. The list can be represented as:
L0 → L1 → … → Ln - 1 → Ln

Reorder the list to be on the following form:
L0 → Ln → L1 → Ln - 1 → L2 → Ln - 2 → …

You may not modify the values in the list''s nodes. Only nodes themselves may be changed.

**Input Format:**
- First line: Size or parameter
- Second line: Space-separated values

**Output Format:**
- Print the result as specified in the problem statement

**Constraints:**
- 1 <= n <= 10^5
- -10^4 <= values <= 10^4', 'Medium', 'Linked List', '5
1 2 3 4 5', '1 5 2 4 3', 'First line: n (number of nodes)
Second line: n space-separated integers', 'n space-separated integers (reordered list)', 'The number of nodes in the list is in the range [1, 5 * 10^4].
1 <= Node.val <= 1000', 'LeetCode #143', '"2025-11-21T13:46:56.684Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1339, 'Binary Tree Right Side View', 'Given the root of a binary tree, imagine yourself standing on the right side of it, return the values of the nodes you can see ordered from top to bottom.

**Input Format:**
- Space-separated values

**Output Format:**
- Print the result as specified in the problem statement

**Constraints:**
- 1 <= n <= 10^5
- -10^4 <= values <= 10^4', 'Medium', 'Tree', NULL, NULL, 'Level-order traversal: space-separated values (null for empty nodes)', 'Space-separated integers (right side view)', 'The number of nodes in the tree is in the range [0, 100].
-100 <= Node.val <= 100', 'LeetCode #199', '"2025-11-21T13:46:57.018Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1485, 'Backspace String Compare', 'Compare strings with backspace (#).

**Input Format:**
- First line: Size/Count
- Second line: Values

**Output Format:**
- Print the result as specified

**Constraints:**
- 1 <= n <= 10^3
- Values fit in integer range

**Note:**
- Ensure that your solution handles all edge cases and constraints effectively.
- Optimized time and space complexity is expected for this problem.', 'Easy', 'Stack', NULL, NULL, 'String s. String t.', '"true"/"false".', '1≤s,t≤200', NULL, '"2025-11-21T14:17:01.992Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1486, 'Shortest Subarray Sum K', 'Shortest subarray with sum ≥ k.

**Input Format:**
- First line: Size/Count
- Second line: Values

**Output Format:**
- Print the result as specified

**Constraints:**
- 1 <= n <= 10^6
- Values fit in 64-bit integer range

**Note:**
- Ensure that your solution handles all edge cases and constraints effectively.
- Optimized time and space complexity is expected for this problem.', 'Hard', 'Queue', NULL, NULL, 'Array. k.', 'Min length or -1.', '1≤n≤10^5', NULL, '"2025-11-21T14:17:02.007Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1340, 'Serialize and Deserialize Binary Tree', 'Serialization is the process of converting a data structure or object into a sequence of bits so that it can be stored in a file or memory buffer, or transmitted across a network connection link to be reconstructed later in the same or another computer environment.

Design an algorithm to serialize and deserialize a binary tree. There is no restriction on how your serialization/deserialization algorithm should work. You just need to ensure that a binary tree can be serialized to a string and this string can be deserialized to the original tree structure.

**Output Format:**
- Print the result as specified in the problem statement

**Constraints:**
- 1 <= n <= 10^6
- Values fit in 64-bit integer range

**Input Format:**
- As described in problem statement', 'Hard', 'Tree', NULL, NULL, 'Level-order traversal: space-separated values (null for empty nodes)', 'Same as input (serialized then deserialized)', 'The number of nodes in the tree is in the range [0, 10^4].
-1000 <= Node.val <= 1000', 'LeetCode #297', '"2025-11-21T13:46:57.020Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1301, 'Find Minimum in Rotated Sorted Array', 'Suppose an array of length n sorted in ascending order is rotated between 1 and n times. For example, the array nums = [0,1,2,4,5,6,7] might become:
- [4,5,6,7,0,1,2] if it was rotated 4 times.
- [0,1,2,4,5,6,7] if it was rotated 7 times.

Notice that rotating an array [a[0], a[1], a[2], ..., a[n-1]] 1 time results in the array [a[n-1], a[0], a[1], a[2], ..., a[n-2]].

Given the sorted rotated array nums of unique elements, return the minimum element of this array.

You must write an algorithm that runs in O(log n) time.

**Input Format:**
- First line: n (size of array)
- Second line: n space-separated integers

**Output Format:**
- A single integer representing the minimum element.

**Constraints:**
- n == nums.length
- 1 <= n <= 5000
- -5000 <= nums[i] <= 5000
- All the integers of nums are unique.
- nums is sorted and rotated between 1 and n times.', 'Medium', 'Binary Search', '5
3 4 5 1 2', '1', 'First line: n (size of array)
Second line: n space-separated integers (rotated sorted array)', 'Single integer (minimum element)', 'n == nums.length
1 <= n <= 5000
-5000 <= nums[i] <= 5000
All the integers of nums are unique.
nums is sorted and rotated between 1 and n times.', 'LeetCode #153', '"2025-11-21T13:46:56.561Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1337, 'Partition Labels', 'You are given a string s. We want to partition the string into as many parts as possible so that each letter appears in at most one part.

Note that the partition is done so that after concatenating all the parts in order, the resultant string should be s.

Return a list of integers representing the size of these parts.

**Input Format:**
- A single string s.

**Output Format:**
- Space-separated integers representing the sizes of the parts.

**Constraints:**
- 1 <= s.length <= 500
- s consists of lowercase English letters.', 'Medium', 'Greedy', 'ababcbacadefegdehijhklij', '9 7 8', NULL, NULL, NULL, NULL, '"2025-11-21T13:46:56.684Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1342, 'Word Break', 'Given a string s and a dictionary of strings wordDict, return true if s can be segmented into a space-separated sequence of one or more dictionary words.

Note that the same word in the dictionary may be reused multiple times in the segmentation.

**Input Format:**
- 3 lines of input

**Output Format:**
- Print the result as specified in the problem statement

**Constraints:**
- 1 <= n <= 10^5
- -10^4 <= values <= 10^4', 'Medium', 'Dynamic Programming', NULL, NULL, 'First line: string s
Second line: n (number of words)
Third line: n space-separated words', 'true or false', '1 <= s.length <= 300
1 <= wordDict.length <= 1000
1 <= wordDict[i].length <= 20
s and wordDict[i] consist of only lowercase English letters.
All the strings of wordDict are unique.', 'LeetCode #139', '"2025-11-21T13:46:57.187Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1288, 'Merge k Sorted Lists', 'You are given an array of k linked-lists lists, each linked-list is sorted in ascending order.

Merge all the linked-lists into one sorted linked-list and return it.

**Input Format:**
- 4 lines of input

**Output Format:**
- Print the result as specified in the problem statement

**Constraints:**
- 1 <= n <= 10^6
- Values fit in 64-bit integer range', 'Hard', 'Heap', '3
3 1 4 5
3 1 3 4
2 2 6', '1 1 2 3 4 4 5 6', 'First line: k (number of lists)
Next k lines: n (size) followed by n space-separated integers', 'Space-separated integers (merged list)', 'k == lists.length
0 <= k <= 10^4
0 <= lists[i].length <= 500
-10^4 <= lists[i][j] <= 10^4
lists[i] is sorted in ascending order.
The sum of lists[i].length will not exceed 10^4.', 'LeetCode #23', '"2025-11-21T13:46:56.561Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1343, 'Generate Parentheses', 'Given n pairs of parentheses, write a function to generate all combinations of well-formed parentheses.

**Input Format:**
- A single value

**Output Format:**
- Print the result as specified in the problem statement

**Constraints:**
- 1 <= n <= 10^5
- -10^4 <= values <= 10^4', 'Medium', 'Backtracking', NULL, NULL, 'Single integer n', 'Space-separated strings (combinations)', '1 <= n <= 8', 'LeetCode #22', '"2025-11-21T13:46:57.215Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1487, 'Create Maximum Number', 'Max number from two arrays.

**Input Format:**
- First line: Size/Count
- Second line: Values

**Output Format:**
- Print the result as specified

**Constraints:**
- 1 <= n <= 10^6
- Values fit in 64-bit integer range

**Note:**
- Ensure that your solution handles all edge cases and constraints effectively.
- Optimized time and space complexity is expected for this problem.', 'Hard', 'Greedy', NULL, NULL, 'Line 1: nums1. Line 2: nums2. Line 3: k.', 'Max k-digit number.', '1≤k≤m+n', NULL, '"2025-11-21T14:17:02.012Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1489, 'Count Complete Tree Nodes', 'Count nodes in complete binary tree.

**Input Format:**
- Space-separated values

**Output Format:**
- Print the result as specified

**Constraints:**
- 1 <= n <= 10^5
- -10^4 <= values <= 10^4

**Note:**
- Ensure that your solution handles all edge cases and constraints effectively.
- Optimized time and space complexity is expected for this problem.', 'Medium', 'Tree', NULL, NULL, 'Level-order.', 'Node count.', '0≤n≤5×10^4', NULL, '"2025-11-21T14:17:02.023Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1490, 'Cheapest Flights Within K Stops', 'Cheapest flight with ≤ k stops.

**Input Format:**
- First line: Size/Count
- Second line: Values

**Output Format:**
- Print the result as specified

**Constraints:**
- 1 <= n <= 10^5
- -10^4 <= values <= 10^4

**Note:**
- Ensure that your solution handles all edge cases and constraints effectively.
- Optimized time and space complexity is expected for this problem.', 'Medium', 'Graph', NULL, NULL, 'n. Flights (from to price). src dst k.', 'Min price or -1.', '1≤n≤100', NULL, '"2025-11-21T14:17:02.032Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1491, 'Best Time Stock Cooldown', 'Max profit with cooldown.

**Input Format:**
- Space-separated values

**Output Format:**
- Print the result as specified

**Constraints:**
- 1 <= n <= 10^5
- -10^4 <= values <= 10^4

**Note:**
- Ensure that your solution handles all edge cases and constraints effectively.
- Optimized time and space complexity is expected for this problem.', 'Medium', 'Dynamic Programming', NULL, NULL, 'Prices.', 'Max profit.', '1≤n≤5000', NULL, '"2025-11-21T14:17:02.038Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1492, 'Restore IP Addresses', 'Generate all valid IP addresses.

**Input Format:**
- A single value

**Output Format:**
- Print the result as specified

**Constraints:**
- 1 <= n <= 10^5
- -10^4 <= values <= 10^4

**Note:**
- Ensure that your solution handles all edge cases and constraints effectively.
- Optimized time and space complexity is expected for this problem.', 'Medium', 'Backtracking', NULL, NULL, 'String of digits.', 'All valid IPs.', '4≤s≤12', NULL, '"2025-11-21T14:17:02.043Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1493, 'Search 2D Matrix', 'Search in row & column sorted matrix.

**Input Format:**
- First line: Size/Count
- Second line: Values

**Output Format:**
- Print the result as specified

**Constraints:**
- 1 <= n <= 10^5
- -10^4 <= values <= 10^4

**Note:**
- Ensure that your solution handles all edge cases and constraints effectively.
- Optimized time and space complexity is expected for this problem.', 'Medium', 'Binary Search', NULL, NULL, 'Matrix. Target.', '"true"/"false".', '1≤m,n≤300', NULL, '"2025-11-21T14:17:02.048Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1262, 'Merge Two Sorted Lists', 'You are given the heads of two sorted linked lists list1 and list2.

Merge the two lists into one sorted list. The list should be made by splicing together the nodes of the first two lists.

Return the head of the merged linked list.

**Example 1:**
Input: list1 = [1,2,4], list2 = [1,3,4]
Output: [1,1,2,3,4,4]

**Example 2:**
Input: list1 = [], list2 = []
Output: []

**Input Format:**
- First line: Elements of list1 (space-separated)
- Second line: Elements of list2 (space-separated)

**Output Format:**
- Print the merged list elements separated by spaces.

**Constraints:**
- The number of nodes in both lists is in the range [0, 50].
- -100 <= Node.val <= 100
- Both list1 and list2 are sorted in non-decreasing order.', 'Easy', 'Linked List', '3
1 2 4
3
1 3 4', '1 1 2 3 4 4', 'First line: n1 (size of list 1)
Second line: n1 space-separated integers
Third line: n2 (size of list 2)
Fourth line: n2 space-separated integers', 'Space-separated integers (merged sorted list)', 'The number of nodes in both lists is in the range [0, 50].
-100 <= Node.val <= 100
Both list1 and list2 are sorted in non-decreasing order.', 'LeetCode #21', '"2025-11-21T13:46:56.561Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1253, 'Valid Anagram', 'Given two strings s and t, return true if t is an anagram of s, and false otherwise.

An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.

**Example 1:**
Input: s = "anagram", t = "nagaram"
Output: true

**Example 2:**
Input: s = "rat", t = "car"
Output: false

**Input Format:**
- First line: string s
- Second line: string t

**Output Format:**
- Print "true" or "false".

**Constraints:**
- 1 <= s.length, t.length <= 5 * 10^4
- s and t consist of lowercase English letters.', 'Easy', 'String', 'anagram
nagaram', 'true', NULL, NULL, NULL, NULL, '"2025-11-21T13:46:56.561Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1311, 'Sort Colors (Dutch National Flag)', 'Given an array nums with n objects colored red, white, or blue, sort them in-place so that objects of the same color are adjacent, with the colors in the order red, white, and blue.

We will use the integers 0, 1, and 2 to represent the color red, white, and blue, respectively.

You must solve this problem without using the library''s sort function.

**Input Format:**
- First line: Size or parameter
- Second line: Space-separated values

**Output Format:**
- Print the result as specified in the problem statement

**Constraints:**
- 1 <= n <= 10^5
- -10^4 <= values <= 10^4', 'Medium', 'Array', '6
2 0 2 1 1 0', '0 0 1 1 2 2', 'First line: n (size of array)
Second line: n space-separated integers (0, 1, or 2)', 'n space-separated integers (sorted array)', 'n == nums.length
1 <= n <= 300
nums[i] is either 0, 1, or 2.', 'LeetCode #75', '"2025-11-21T13:46:56.684Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1315, 'String to Integer (atoi)', 'Implement the myAtoi(string s) function, which converts a string to a 32-bit signed integer (similar to C/C++''s atoi function).

The algorithm for myAtoi(string s) is as follows:
1. Read in and ignore any leading whitespace.
2. Check if the next character (if not already at the end of the string) is ''-'' or ''+''. Read this character in if it is either. This determines if the final result is negative or positive respectively. Assume the result is positive if neither is present.
3. Read in next the characters until the next non-digit character or the end of the input is reached. The rest of the string is ignored.
4. Convert these digits into an integer (i.e. "123" -> 123, "0032" -> 32). If no digits were read, then the integer is 0. Change the sign as necessary (from step 2).
5. If the integer is out of the 32-bit signed integer range [-2^31, 2^31 - 1], then clamp the integer so that it remains in the range. Specifically, integers less than -2^31 should be clamped to -2^31, and integers greater than 2^31 - 1 should be clamped to 2^31 - 1.
6. Return the integer as the final result.

**Input Format:**
- A single value

**Output Format:**
- Print the result as specified in the problem statement

**Constraints:**
- 1 <= n <= 10^5
- -10^4 <= values <= 10^4', 'Medium', 'String', '42', '42', 'Single line: string s', 'Single integer', '0 <= s.length <= 200
s consists of English letters (lower-case and upper-case), digits (0-9), '' '', ''+'', ''-'', and ''.''.', 'LeetCode #8', '"2025-11-21T13:46:56.684Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1322, 'Edit Distance', 'Given two strings word1 and word2, return the minimum number of operations required to convert word1 to word2.

You have the following three operations permitted on a word:
- Insert a character
- Delete a character
- Replace a character

**Input Format:**
- First line: Size or parameter
- Second line: Space-separated values

**Output Format:**
- Print the result as specified in the problem statement

**Constraints:**
- 1 <= n <= 10^5
- -10^4 <= values <= 10^4', 'Medium', 'Dynamic Programming', 'horse
ros', '3', 'First line: word1
Second line: word2', 'Single integer (minimum operations)', '0 <= word1.length, word2.length <= 500
word1 and word2 consist of lowercase English letters.', 'LeetCode #72', '"2025-11-21T13:46:56.684Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1325, 'Clone Graph', 'Given a reference of a node in a connected undirected graph.

Return a deep copy (clone) of the graph.

Each node in the graph contains a value (int) and a list (List[Node]) of its neighbors.

**Input Format:**
- 5 lines of input

**Output Format:**
- Print the result as specified in the problem statement

**Constraints:**
- 1 <= n <= 10^5
- -10^4 <= values <= 10^4', 'Medium', 'Graph', '4
1 2 4
2 1 3
3 2 4
4 1 3', '4
1 2 4
2 1 3
3 2 4
4 1 3', 'First line: n (number of nodes)
Next n lines: node_value space-separated neighbor values', 'Same as input (cloned graph)', 'The number of nodes in the graph is in the range [0, 100].
1 <= Node.val <= 100
Node.val is unique for each node.
There are no repeated edges and no self-loops in the graph.
The Graph is connected and all nodes can be visited starting from the given node.', 'LeetCode #133', '"2025-11-21T13:46:56.684Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1326, 'Pacific Atlantic Water Flow', 'There is an m x n rectangular island that borders both the Pacific Ocean and Atlantic Ocean. The Pacific Ocean touches the island''s left and top edges, and the Atlantic Ocean touches the island''s right and bottom edges.

The island is partitioned into a grid of square cells. You are given an m x n integer matrix heights where heights[r][c] represents the height above sea level of the cell at coordinate (r, c).

The island receives a lot of rain, and the rain water can flow to neighboring cells directly north, south, east, and west if the neighboring cell''s height is less than or equal to the current cell''s height. Water can flow from any cell adjacent to an ocean into the ocean.

Return a 2D list of grid coordinates result where result[i] = [ri, ci] denotes that rain water can flow from cell (ri, ci) to both the Pacific and Atlantic oceans.

**Input Format:**
- 6 lines of input

**Output Format:**
- Print the result as specified in the problem statement

**Constraints:**
- 1 <= n <= 10^5
- -10^4 <= values <= 10^4', 'Medium', 'Graph', '5 5
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
4 0', 'First line: m n (rows and columns)
Next m lines: n space-separated integers (heights)', 'Each line: row col (cells that can flow to both oceans)', 'm == heights.length
n == heights[r].length
1 <= m, n <= 200
0 <= heights[r][c] <= 10^5', 'LeetCode #417', '"2025-11-21T13:46:56.684Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1338, 'Lowest Common Ancestor of a Binary Tree', 'Given a binary tree, find the lowest common ancestor (LCA) of two given nodes in the tree.

According to the definition of LCA on Wikipedia: "The lowest common ancestor is defined between two nodes p and q as the lowest node in T that has both p and q as descendants (where we allow a node to be a descendant of itself)."

**Input Format:**
- 3 lines of input

**Output Format:**
- Print the result as specified in the problem statement

**Constraints:**
- 1 <= n <= 10^5
- -10^4 <= values <= 10^4', 'Medium', 'Tree', NULL, NULL, 'Line 1: Level-order traversal (null for empty nodes)
Line 2: p value
Line 3: q value', 'Single integer (LCA value)', 'The number of nodes in the tree is in the range [2, 10^5].
-10^9 <= Node.val <= 10^9
All Node.val are unique.
p != q
p and q will exist in the tree.', 'LeetCode #236', '"2025-11-21T13:46:57.016Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1344, 'Implement Stack using Queues', 'Implement a last-in-first-out (LIFO) stack using only two queues. The implemented stack should support all the functions of a normal stack (push, top, pop, and empty).

Implement the MyStack class:
- void push(int x) Pushes element x to the top of the stack.
- int pop() Removes the element on the top of the stack and returns it.
- int top() Returns the element on the top of the stack.
- boolean empty() Returns true if the stack is empty, false otherwise.

Notes:
- You must use only standard operations of a queue, which means only push to back, peek/pop from front, size and is empty operations are valid.
- Depending on your language, the queue may not be supported natively. You may simulate a queue using a list or deque (double-ended queue) as long as you use only a queue''s standard operations.

**Input Format:**
- 6 lines of input

**Output Format:**
- Print the result as specified in the problem statement

**Constraints:**
- 1 <= n <= 10^3
- Values fit in standard integer range', 'Easy', 'Queue', 'MyStack
push 1
push 2
top
pop
empty', '2
2
false', 'Commands and values (simulated for online judge)', 'Outputs of operations', '1 <= x <= 9
At most 100 calls will be made to push, pop, top, and empty.
All the calls to pop and top are valid.', 'LeetCode #225', '"2025-11-21T13:46:57.370Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1357, 'Reorganize String', 'Reorganize string so no two adjacent characters are same.

**Input Format:**
- A single value

**Output Format:**
- Print the result as specified in the problem statement

**Constraints:**
- 1 <= n <= 10^5
- -10^4 <= values <= 10^4', 'Medium', 'Heap', NULL, NULL, 'Single string.', 'Reorganized string or empty if impossible.', '1 ≤ length ≤ 500', NULL, '"2025-11-21T14:02:28.384Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1359, 'Isomorphic Strings', 'Check if two strings are isomorphic.

**Input Format:**
- First line: Size/Count
- Second line: Values

**Output Format:**
- Print the result as specified

**Constraints:**
- 1 <= n <= 10^3
- Values fit in integer range

**Note:**
- Ensure that your solution handles all edge cases and constraints effectively.
- Optimized time and space complexity is expected for this problem.', 'Easy', 'Hashing', NULL, NULL, 'Two strings on separate lines.', '"true" or "false".', '1 ≤ length ≤ 5×10^4', NULL, '"2025-11-21T14:02:28.396Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1361, 'Word Pattern', 'Check if pattern matches string (bijection).

**Input Format:**
- First line: Size/Count
- Second line: Values

**Output Format:**
- Print the result as specified

**Constraints:**
- 1 <= n <= 10^3
- Values fit in integer range

**Note:**
- Ensure that your solution handles all edge cases and constraints effectively.
- Optimized time and space complexity is expected for this problem.', 'Easy', 'Hashing', NULL, NULL, 'Two lines: pattern and string.', '"true" or "false".', '1 ≤ length ≤ 300', NULL, '"2025-11-21T14:02:28.404Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1362, 'Find All Anagrams', 'Find all start indices of anagrams of p in s.

**Input Format:**
- First line: Size/Count
- Second line: Values

**Output Format:**
- Print the result as specified

**Constraints:**
- 1 <= n <= 10^5
- -10^4 <= values <= 10^4

**Note:**
- Ensure that your solution handles all edge cases and constraints effectively.
- Optimized time and space complexity is expected for this problem.', 'Medium', 'Hashing', NULL, NULL, 'Two strings on separate lines.', 'Space-separated indices.', '1 ≤ length ≤ 3×10^4', NULL, '"2025-11-21T14:02:28.410Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1373, 'Reverse Nodes in k-Group', 'Reverse every k group of nodes.

**Input Format:**
- First line: Size/Count
- Second line: Values

**Output Format:**
- Print the result as specified

**Constraints:**
- 1 <= n <= 10^6
- Values fit in 64-bit integer range

**Note:**
- Ensure that your solution handles all edge cases and constraints effectively.
- Optimized time and space complexity is expected for this problem.', 'Hard', 'Linked List', NULL, NULL, 'First line: list. Second line: k.', 'Modified list.', '1 ≤ k ≤ n ≤ 5000', NULL, '"2025-11-21T14:07:27.819Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1375, 'Baseball Game', 'Calculate score based on operations.

**Input Format:**
- First line: Size/Count
- Second line: Values

**Output Format:**
- Print the result as specified

**Constraints:**
- 1 <= n <= 10^3
- Values fit in integer range

**Note:**
- Ensure that your solution handles all edge cases and constraints effectively.
- Optimized time and space complexity is expected for this problem.', 'Easy', 'Stack', NULL, NULL, 'Each line: number, "+", "D", or "C".', 'Total score.', '1 ≤ ops ≤ 1000', NULL, '"2025-11-21T14:07:27.826Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1376, 'Next Greater Element I', 'Find next greater element for each element.

**Input Format:**
- First line: Size/Count
- Second line: Values

**Output Format:**
- Print the result as specified

**Constraints:**
- 1 <= n <= 10^3
- Values fit in integer range

**Note:**
- Ensure that your solution handles all edge cases and constraints effectively.
- Optimized time and space complexity is expected for this problem.', 'Easy', 'Stack', NULL, NULL, 'Two lines: query array, full array.', 'Space-separated results (-1 if none).', '1 ≤ n ≤ 1000', NULL, '"2025-11-21T14:07:27.830Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1379, 'Remove K Digits', 'Remove k digits to make smallest number.

**Input Format:**
- First line: Size/Count
- Second line: Values

**Output Format:**
- Print the result as specified

**Constraints:**
- 1 <= n <= 10^5
- -10^4 <= values <= 10^4

**Note:**
- Ensure that your solution handles all edge cases and constraints effectively.
- Optimized time and space complexity is expected for this problem.', 'Medium', 'Stack', NULL, NULL, 'Number string and k.', 'Smallest number (no leading zeros).', '1 ≤ k ≤ length ≤ 10^5', NULL, '"2025-11-21T14:07:27.840Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1392, 'First Bad Version', 'Find first bad version using isBadVersion API.

**Input Format:**
- First line: Size/Count
- Second line: Values

**Output Format:**
- Print the result as specified

**Constraints:**
- 1 <= n <= 10^3
- Values fit in integer range

**Note:**
- Ensure that your solution handles all edge cases and constraints effectively.
- Optimized time and space complexity is expected for this problem.', 'Easy', 'Binary Search', NULL, NULL, 'First line: n. Second line: first bad version.', 'First bad version.', '1 ≤ bad ≤ n ≤ 2^31-1', NULL, '"2025-11-21T14:08:54.304Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1399, 'Max Depth Binary Tree', 'Find max depth.

**Input Format:**
- First line: Size/Count
- Second line: Values

**Output Format:**
- Print the result as specified

**Constraints:**
- 1 <= n <= 10^3
- Values fit in integer range

**Note:**
- Ensure that your solution handles all edge cases and constraints effectively.
- Optimized time and space complexity is expected for this problem.', 'Easy', 'Tree', NULL, NULL, 'Level-order: vals per level.', 'Depth.', '0≤n≤10^4', NULL, '"2025-11-21T14:11:15.970Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1400, 'Symmetric Tree', 'Check symmetric.

**Input Format:**
- Space-separated values

**Output Format:**
- Print the result as specified

**Constraints:**
- 1 <= n <= 10^3
- Values fit in integer range

**Note:**
- Ensure that your solution handles all edge cases and constraints effectively.
- Optimized time and space complexity is expected for this problem.', 'Easy', 'Tree', NULL, NULL, 'Level-order.', '"true"/"false".', '1≤n≤1000', NULL, '"2025-11-21T14:11:15.979Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1401, 'Diameter of Binary Tree', 'Longest path length.

**Input Format:**
- Space-separated values

**Output Format:**
- Print the result as specified

**Constraints:**
- 1 <= n <= 10^3
- Values fit in integer range

**Note:**
- Ensure that your solution handles all edge cases and constraints effectively.
- Optimized time and space complexity is expected for this problem.', 'Easy', 'Tree', NULL, NULL, 'Level-order.', 'Diameter.', '1≤n≤10^4', NULL, '"2025-11-21T14:11:15.983Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1403, 'Validate BST', 'Check valid BST.

**Input Format:**
- Space-separated values

**Output Format:**
- Print the result as specified

**Constraints:**
- 1 <= n <= 10^5
- -10^4 <= values <= 10^4

**Note:**
- Ensure that your solution handles all edge cases and constraints effectively.
- Optimized time and space complexity is expected for this problem.', 'Medium', 'Tree', NULL, NULL, 'Level-order.', '"true"/"false".', '1≤n≤10^4', NULL, '"2025-11-21T14:11:15.991Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1404, 'Lowest Common Ancestor', 'Find LCA of two nodes.

**Input Format:**
- First line: Size/Count
- Second line: Values

**Output Format:**
- Print the result as specified

**Constraints:**
- 1 <= n <= 10^5
- -10^4 <= values <= 10^4

**Note:**
- Ensure that your solution handles all edge cases and constraints effectively.
- Optimized time and space complexity is expected for this problem.', 'Medium', 'Tree', NULL, NULL, 'Line 1: tree. Line 2: p q.', 'LCA value.', '2≤n≤10^5', NULL, '"2025-11-21T14:11:15.993Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1406, 'Path Sum II', 'All root-to-leaf paths summing to target.

**Input Format:**
- First line: Size/Count
- Second line: Values

**Output Format:**
- Print the result as specified

**Constraints:**
- 1 <= n <= 10^5
- -10^4 <= values <= 10^4

**Note:**
- Ensure that your solution handles all edge cases and constraints effectively.
- Optimized time and space complexity is expected for this problem.', 'Medium', 'Tree', NULL, NULL, 'Line 1: tree. Line 2: target.', 'Paths (each on line).', '0≤n≤5000', NULL, '"2025-11-21T14:11:15.999Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1407, 'Construct from Preorder Inorder', 'Build tree from pre & in order.

**Input Format:**
- As described in the problem statement

**Output Format:**
- Print the result as specified

**Constraints:**
- 1 <= n <= 10^5
- -10^4 <= values <= 10^4

**Note:**
- Ensure that your solution handles all edge cases and constraints effectively.
- Optimized time and space complexity is expected for this problem.', 'Medium', 'Tree', NULL, NULL, 'Line 1: preorder. Line 2: inorder.', 'Level-order.', '1≤n≤3000', NULL, '"2025-11-21T14:11:16.002Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1409, 'Binary Tree Max Path Sum', 'Max path sum.

**Input Format:**
- Space-separated values

**Output Format:**
- Print the result as specified

**Constraints:**
- 1 <= n <= 10^6
- Values fit in 64-bit integer range

**Note:**
- Ensure that your solution handles all edge cases and constraints effectively.
- Optimized time and space complexity is expected for this problem.', 'Hard', 'Tree', NULL, NULL, 'Level-order.', 'Max sum.', '1≤n≤3×10^4,-1000≤val≤1000', NULL, '"2025-11-21T14:11:16.007Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1410, 'Find Center of Star', 'Find center node.

**Input Format:**
- First line: Size/Count
- Second line: Values

**Output Format:**
- Print the result as specified

**Constraints:**
- 1 <= n <= 10^3
- Values fit in integer range

**Note:**
- Ensure that your solution handles all edge cases and constraints effectively.
- Optimized time and space complexity is expected for this problem.', 'Easy', 'Graph', NULL, NULL, 'Edges.', 'Center.', '3≤n≤10^5', NULL, '"2025-11-21T14:11:16.010Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1412, 'All Paths Source to Target', 'All paths from 0 to n-1.

**Input Format:**
- First line: Size/Count
- Second line: Values

**Output Format:**
- Print the result as specified

**Constraints:**
- 1 <= n <= 10^3
- Values fit in integer range

**Note:**
- Ensure that your solution handles all edge cases and constraints effectively.
- Optimized time and space complexity is expected for this problem.', 'Easy', 'Graph', NULL, NULL, 'Adjacency list.', 'All paths.', '2≤n≤15', NULL, '"2025-11-21T14:11:16.016Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1413, 'Find if Path Exists', 'Check if path exists.

**Input Format:**
- First line: Size/Count
- Second line: Values

**Output Format:**
- Print the result as specified

**Constraints:**
- 1 <= n <= 10^3
- Values fit in integer range

**Note:**
- Ensure that your solution handles all edge cases and constraints effectively.
- Optimized time and space complexity is expected for this problem.', 'Easy', 'Graph', NULL, NULL, 'n. Edges. source dest.', '"true"/"false".', '1≤n≤2×10^5', NULL, '"2025-11-21T14:11:16.019Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1414, 'Number of Provinces', 'Count provinces (connected components).

**Input Format:**
- First line: Size/Count
- Second line: Values

**Output Format:**
- Print the result as specified

**Constraints:**
- 1 <= n <= 10^5
- -10^4 <= values <= 10^4

**Note:**
- Ensure that your solution handles all edge cases and constraints effectively.
- Optimized time and space complexity is expected for this problem.', 'Medium', 'Graph', NULL, NULL, 'Adjacency matrix.', 'Province count.', '1≤n≤200', NULL, '"2025-11-21T14:11:16.024Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1416, 'Network Delay Time', 'Min time for signal to reach all nodes.

**Input Format:**
- First line: Size/Count
- Second line: Values

**Output Format:**
- Print the result as specified

**Constraints:**
- 1 <= n <= 10^5
- -10^4 <= values <= 10^4

**Note:**
- Ensure that your solution handles all edge cases and constraints effectively.
- Optimized time and space complexity is expected for this problem.', 'Medium', 'Graph', NULL, NULL, 'n k. Edges: u v w.', 'Time or -1.', '1≤k≤n≤100', NULL, '"2025-11-21T14:11:16.030Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1417, 'Minimum Height Trees', 'Find roots of MHTs.

**Input Format:**
- First line: Size/Count
- Second line: Values

**Output Format:**
- Print the result as specified

**Constraints:**
- 1 <= n <= 10^6
- Values fit in 64-bit integer range

**Note:**
- Ensure that your solution handles all edge cases and constraints effectively.
- Optimized time and space complexity is expected for this problem.', 'Hard', 'Graph', NULL, NULL, 'n. Edges.', 'Root labels.', '1≤n≤2×10^4', NULL, '"2025-11-21T14:11:16.032Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1419, 'Maximum Subarray', 'Max subarray sum.

**Input Format:**
- Space-separated values

**Output Format:**
- Print the result as specified

**Constraints:**
- 1 <= n <= 10^3
- Values fit in integer range

**Note:**
- Ensure that your solution handles all edge cases and constraints effectively.
- Optimized time and space complexity is expected for this problem.', 'Easy', 'Dynamic Programming', NULL, NULL, 'Array.', 'Max sum.', '1≤n≤10^5', NULL, '"2025-11-21T14:11:16.039Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1420, 'Divisor Game', 'Win divisor game.

**Input Format:**
- A single value

**Output Format:**
- Print the result as specified

**Constraints:**
- 1 <= n <= 10^3
- Values fit in integer range

**Note:**
- Ensure that your solution handles all edge cases and constraints effectively.
- Optimized time and space complexity is expected for this problem.', 'Easy', 'Dynamic Programming', NULL, NULL, 'n', '"true"/"false".', '1≤n≤1000', NULL, '"2025-11-21T14:11:16.042Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1422, 'Regular Expression Match', 'Match with . and *.

**Input Format:**
- First line: Size/Count
- Second line: Values

**Output Format:**
- Print the result as specified

**Constraints:**
- 1 <= n <= 10^6
- Values fit in 64-bit integer range

**Note:**
- Ensure that your solution handles all edge cases and constraints effectively.
- Optimized time and space complexity is expected for this problem.', 'Hard', 'Dynamic Programming', NULL, NULL, 'String. Pattern.', '"true"/"false".', '1≤s≤20', NULL, '"2025-11-21T14:11:16.050Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1423, 'Assign Cookies', 'Max satisfied children.

**Input Format:**
- First line: Size/Count
- Second line: Values

**Output Format:**
- Print the result as specified

**Constraints:**
- 1 <= n <= 10^3
- Values fit in integer range

**Note:**
- Ensure that your solution handles all edge cases and constraints effectively.
- Optimized time and space complexity is expected for this problem.', 'Easy', 'Greedy', NULL, NULL, 'Line 1: greed. Line 2: sizes.', 'Count.', '1≤m,n≤3×10^4', NULL, '"2025-11-21T14:11:16.053Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1425, 'Best Time Buy Sell II', 'Max profit unlimited transactions.

**Input Format:**
- Space-separated values

**Output Format:**
- Print the result as specified

**Constraints:**
- 1 <= n <= 10^3
- Values fit in integer range

**Note:**
- Ensure that your solution handles all edge cases and constraints effectively.
- Optimized time and space complexity is expected for this problem.', 'Easy', 'Greedy', NULL, NULL, 'Prices.', 'Max profit.', '1≤n≤3×10^4', NULL, '"2025-11-21T14:11:16.059Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1426, 'Minimum Moves Equal', 'Min moves to equal.

**Input Format:**
- Space-separated values

**Output Format:**
- Print the result as specified

**Constraints:**
- 1 <= n <= 10^3
- Values fit in integer range

**Note:**
- Ensure that your solution handles all edge cases and constraints effectively.
- Optimized time and space complexity is expected for this problem.', 'Easy', 'Greedy', NULL, NULL, 'Array.', 'Min moves.', '1≤n≤10^5', NULL, '"2025-11-21T14:11:16.062Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1428, 'Non-overlapping Intervals', 'Min removals for non-overlap.

**Input Format:**
- First line: Size/Count
- Second line: Values

**Output Format:**
- Print the result as specified

**Constraints:**
- 1 <= n <= 10^5
- -10^4 <= values <= 10^4

**Note:**
- Ensure that your solution handles all edge cases and constraints effectively.
- Optimized time and space complexity is expected for this problem.', 'Medium', 'Greedy', NULL, NULL, 'Intervals: start end.', 'Min removals.', '1≤n≤10^5', NULL, '"2025-11-21T14:11:16.069Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1429, 'Jump Game II', 'Min jumps to reach end.

**Input Format:**
- Space-separated values

**Output Format:**
- Print the result as specified

**Constraints:**
- 1 <= n <= 10^6
- Values fit in 64-bit integer range

**Note:**
- Ensure that your solution handles all edge cases and constraints effectively.
- Optimized time and space complexity is expected for this problem.', 'Hard', 'Greedy', NULL, NULL, 'Array.', 'Min jumps.', '1≤n≤10^4', NULL, '"2025-11-21T14:11:16.072Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1431, 'Combinations', 'All k-length combos from 1..n.

**Input Format:**
- Space-separated values

**Output Format:**
- Print the result as specified

**Constraints:**
- 1 <= n <= 10^3
- Values fit in integer range

**Note:**
- Ensure that your solution handles all edge cases and constraints effectively.
- Optimized time and space complexity is expected for this problem.', 'Easy', 'Backtracking', NULL, NULL, 'n k', 'Combos.', '1≤k≤n≤20', NULL, '"2025-11-21T14:11:16.078Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1433, 'Word Search II', 'Find all words in board.

**Input Format:**
- First line: Size/Count
- Second line: Values

**Output Format:**
- Print the result as specified

**Constraints:**
- 1 <= n <= 10^6
- Values fit in 64-bit integer range

**Note:**
- Ensure that your solution handles all edge cases and constraints effectively.
- Optimized time and space complexity is expected for this problem.', 'Hard', 'Backtracking', NULL, NULL, 'Board. Words.', 'Found words.', '1≤rows,cols≤12', NULL, '"2025-11-21T14:11:16.087Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1434, 'Min K Pairs Smallest Sum', 'Find k pairs with smallest sums.

**Input Format:**
- First line: Size/Count
- Second line: Values

**Output Format:**
- Print the result as specified

**Constraints:**
- 1 <= n <= 10^3
- Values fit in integer range

**Note:**
- Ensure that your solution handles all edge cases and constraints effectively.
- Optimized time and space complexity is expected for this problem.', 'Easy', 'Heap', NULL, NULL, 'Line 1: nums1. Line 2: nums2. Line 3: k.', 'k pairs.', '1≤k≤1000', NULL, '"2025-11-21T14:13:24.974Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1435, 'Contiguous Array', 'Longest subarray with equal 0s and 1s.

**Input Format:**
- Space-separated values

**Output Format:**
- Print the result as specified

**Constraints:**
- 1 <= n <= 10^5
- -10^4 <= values <= 10^4

**Note:**
- Ensure that your solution handles all edge cases and constraints effectively.
- Optimized time and space complexity is expected for this problem.', 'Medium', 'Hashing', NULL, NULL, 'Binary array.', 'Max length.', '1≤n≤10^5', NULL, '"2025-11-21T14:13:24.984Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1436, '4Sum II', 'Count 4-tuples summing to 0.

**Input Format:**
- First line: Size/Count
- Second line: Values

**Output Format:**
- Print the result as specified

**Constraints:**
- 1 <= n <= 10^5
- -10^4 <= values <= 10^4

**Note:**
- Ensure that your solution handles all edge cases and constraints effectively.
- Optimized time and space complexity is expected for this problem.', 'Medium', 'Hashing', NULL, NULL, '4 arrays.', 'Count.', '1≤n≤200', NULL, '"2025-11-21T14:13:24.990Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1438, 'Minimum Depth', 'Find min depth to leaf.

**Input Format:**
- Space-separated values

**Output Format:**
- Print the result as specified

**Constraints:**
- 1 <= n <= 10^3
- Values fit in integer range

**Note:**
- Ensure that your solution handles all edge cases and constraints effectively.
- Optimized time and space complexity is expected for this problem.', 'Easy', 'Tree', NULL, NULL, 'Level-order.', 'Min depth.', '0≤n≤10^5', NULL, '"2025-11-21T14:13:24.999Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1439, 'Kth Smallest in BST', 'Find kth smallest value.

**Input Format:**
- First line: Size/Count
- Second line: Values

**Output Format:**
- Print the result as specified

**Constraints:**
- 1 <= n <= 10^5
- -10^4 <= values <= 10^4

**Note:**
- Ensure that your solution handles all edge cases and constraints effectively.
- Optimized time and space complexity is expected for this problem.', 'Medium', 'Tree', NULL, NULL, 'Line 1: tree. Line 2: k.', 'Kth smallest.', '1≤k≤n≤10^4', NULL, '"2025-11-21T14:13:25.004Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1440, 'Flatten Tree to Linked List', 'Flatten to linked list in-place.

**Input Format:**
- As described in the problem statement

**Output Format:**
- Print the result as specified

**Constraints:**
- 1 <= n <= 10^5
- -10^4 <= values <= 10^4

**Note:**
- Ensure that your solution handles all edge cases and constraints effectively.
- Optimized time and space complexity is expected for this problem.', 'Medium', 'Tree', NULL, NULL, 'Level-order.', 'Flattened preorder.', '0≤n≤2000', NULL, '"2025-11-21T14:13:25.010Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1442, 'Binary Tree Cameras', 'Min cameras to monitor all.

**Input Format:**
- Space-separated values

**Output Format:**
- Print the result as specified

**Constraints:**
- 1 <= n <= 10^6
- Values fit in 64-bit integer range

**Note:**
- Ensure that your solution handles all edge cases and constraints effectively.
- Optimized time and space complexity is expected for this problem.', 'Hard', 'Tree', NULL, NULL, 'Level-order.', 'Min cameras.', '1≤n≤1000', NULL, '"2025-11-21T14:13:25.020Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1443, 'Vertical Order Traversal', 'Vertical order traversal.

**Input Format:**
- Space-separated values

**Output Format:**
- Print the result as specified

**Constraints:**
- 1 <= n <= 10^6
- Values fit in 64-bit integer range

**Note:**
- Ensure that your solution handles all edge cases and constraints effectively.
- Optimized time and space complexity is expected for this problem.', 'Hard', 'Tree', NULL, NULL, 'Level-order.', 'Vertical columns.', '1≤n≤1000', NULL, '"2025-11-21T14:13:25.025Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1445, 'Minimum Depth Leaves', 'Min depth to leaf.

**Input Format:**
- Space-separated values

**Output Format:**
- Print the result as specified

**Constraints:**
- 1 <= n <= 10^3
- Values fit in integer range

**Note:**
- Ensure that your solution handles all edge cases and constraints effectively.
- Optimized time and space complexity is expected for this problem.', 'Easy', 'Graph', NULL, NULL, 'Level-order.', 'Min depth.', '1≤n≤10^5', NULL, '"2025-11-21T14:13:25.033Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1446, 'Surrounded Regions', 'Flip surrounded regions.

**Input Format:**
- First line: Size/Count
- Second line: Values

**Output Format:**
- Print the result as specified

**Constraints:**
- 1 <= n <= 10^5
- -10^4 <= values <= 10^4

**Note:**
- Ensure that your solution handles all edge cases and constraints effectively.
- Optimized time and space complexity is expected for this problem.', 'Medium', 'Graph', NULL, NULL, 'Board.', 'Modified board.', '1≤m,n≤200', NULL, '"2025-11-21T14:13:25.039Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1448, 'Minimum Cost Path', 'Min cost to reach bottom-right.

**Input Format:**
- First line: Size/Count
- Second line: Values

**Output Format:**
- Print the result as specified

**Constraints:**
- 1 <= n <= 10^5
- -10^4 <= values <= 10^4

**Note:**
- Ensure that your solution handles all edge cases and constraints effectively.
- Optimized time and space complexity is expected for this problem.', 'Medium', 'Graph', NULL, NULL, 'Grid with costs.', 'Min cost.', '1≤m,n≤200', NULL, '"2025-11-21T14:13:25.047Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1449, 'Alien Dictionary', 'Find alien alphabet order.

**Input Format:**
- First line: Size/Count
- Second line: Values

**Output Format:**
- Print the result as specified

**Constraints:**
- 1 <= n <= 10^6
- Values fit in 64-bit integer range

**Note:**
- Ensure that your solution handles all edge cases and constraints effectively.
- Optimized time and space complexity is expected for this problem.', 'Hard', 'Graph', NULL, NULL, 'Words.', 'Alien order or "".', '1≤words≤100', NULL, '"2025-11-21T14:13:25.050Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1451, 'Shortest Path Visiting All Nodes', 'Shortest path visiting all.

**Input Format:**
- First line: Size/Count
- Second line: Values

**Output Format:**
- Print the result as specified

**Constraints:**
- 1 <= n <= 10^6
- Values fit in 64-bit integer range

**Note:**
- Ensure that your solution handles all edge cases and constraints effectively.
- Optimized time and space complexity is expected for this problem.', 'Hard', 'Graph', NULL, NULL, 'Graph adjacency.', 'Path length.', '1≤n≤12', NULL, '"2025-11-21T14:13:25.058Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1452, 'Fibonacci Number', 'Compute nth Fibonacci.

**Input Format:**
- A single value

**Output Format:**
- Print the result as specified

**Constraints:**
- 1 <= n <= 10^3
- Values fit in integer range

**Note:**
- Ensure that your solution handles all edge cases and constraints effectively.
- Optimized time and space complexity is expected for this problem.', 'Easy', 'Dynamic Programming', NULL, NULL, 'n', 'F(n).', '0≤n≤30', NULL, '"2025-11-21T14:13:25.061Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1454, 'Triangle Minimum Path', 'Min path sum top to bottom.

**Input Format:**
- First line: Size/Count
- Second line: Values

**Output Format:**
- Print the result as specified

**Constraints:**
- 1 <= n <= 10^5
- -10^4 <= values <= 10^4

**Note:**
- Ensure that your solution handles all edge cases and constraints effectively.
- Optimized time and space complexity is expected for this problem.', 'Medium', 'Dynamic Programming', NULL, NULL, 'Triangle rows.', 'Min sum.', '1≤rows≤200', NULL, '"2025-11-21T14:13:25.069Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1455, 'Longest Valid Parentheses', 'Length of longest valid parentheses.

**Input Format:**
- A single value

**Output Format:**
- Print the result as specified

**Constraints:**
- 1 <= n <= 10^6
- Values fit in 64-bit integer range

**Note:**
- Ensure that your solution handles all edge cases and constraints effectively.
- Optimized time and space complexity is expected for this problem.', 'Hard', 'Dynamic Programming', NULL, NULL, 'String of parentheses.', 'Max length.', '0≤length≤3×10^4', NULL, '"2025-11-21T14:13:25.073Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1457, 'Minimum Arrows Burst Balloons', 'Min arrows to burst all.

**Input Format:**
- First line: Size/Count
- Second line: Values

**Output Format:**
- Print the result as specified

**Constraints:**
- 1 <= n <= 10^5
- -10^4 <= values <= 10^4

**Note:**
- Ensure that your solution handles all edge cases and constraints effectively.
- Optimized time and space complexity is expected for this problem.', 'Medium', 'Greedy', NULL, NULL, 'Balloon intervals.', 'Min arrows.', '1≤n≤10^5', NULL, '"2025-11-21T14:13:25.080Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1458, 'Combination Sum III', 'Find k numbers summing to n (1-9).

**Input Format:**
- Space-separated values

**Output Format:**
- Print the result as specified

**Constraints:**
- 1 <= n <= 10^3
- Values fit in integer range

**Note:**
- Ensure that your solution handles all edge cases and constraints effectively.
- Optimized time and space complexity is expected for this problem.', 'Easy', 'Backtracking', NULL, NULL, 'k n', 'All combinations.', '2≤k≤9,1≤n≤60', NULL, '"2025-11-21T14:13:25.084Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1460, 'Palindrome Partitioning', 'All palindrome partitions.

**Input Format:**
- A single value

**Output Format:**
- Print the result as specified

**Constraints:**
- 1 <= n <= 10^5
- -10^4 <= values <= 10^4

**Note:**
- Ensure that your solution handles all edge cases and constraints effectively.
- Optimized time and space complexity is expected for this problem.', 'Medium', 'Backtracking', NULL, NULL, 'String.', 'All partitions.', '1≤s≤16', NULL, '"2025-11-21T14:13:25.091Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1461, 'Sudoku Solver', 'Solve 9x9 Sudoku.

**Input Format:**
- First line: Size/Count
- Second line: Values

**Output Format:**
- Print the result as specified

**Constraints:**
- 1 <= n <= 10^5
- -10^4 <= values <= 10^4

**Note:**
- Ensure that your solution handles all edge cases and constraints effectively.
- Optimized time and space complexity is expected for this problem.', 'Medium', 'Backtracking', NULL, NULL, '9 lines of 9 chars (. for empty).', 'Solved board.', 'Valid input', NULL, '"2025-11-21T14:13:25.095Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1463, 'Sudoku Permutations', 'Count valid Sudoku permutations.

**Input Format:**
- First line: Size/Count
- Second line: Values

**Output Format:**
- Print the result as specified

**Constraints:**
- 1 <= n <= 10^6
- Values fit in 64-bit integer range

**Note:**
- Ensure that your solution handles all edge cases and constraints effectively.
- Optimized time and space complexity is expected for this problem.', 'Hard', 'Backtracking', NULL, NULL, 'Partially filled board.', 'Count.', 'Valid input', NULL, '"2025-11-21T14:13:25.101Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1464, 'IPO', 'Max capital with k projects.

**Input Format:**
- First line: Size/Count
- Second line: Values

**Output Format:**
- Print the result as specified

**Constraints:**
- 1 <= n <= 10^6
- Values fit in 64-bit integer range

**Note:**
- Ensure that your solution handles all edge cases and constraints effectively.
- Optimized time and space complexity is expected for this problem.', 'Hard', 'Greedy', NULL, NULL, 'k w. Profits. Capital.', 'Max capital.', '1≤k≤10^5', NULL, '"2025-11-21T14:15:58.282Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1466, 'Letter Combinations Length', 'Count letter combinations.

**Input Format:**
- A single value

**Output Format:**
- Print the result as specified

**Constraints:**
- 1 <= n <= 10^3
- Values fit in integer range

**Note:**
- Ensure that your solution handles all edge cases and constraints effectively.
- Optimized time and space complexity is expected for this problem.', 'Easy', 'Backtracking', NULL, NULL, 'Digits.', 'Count.', '0≤digits≤4', NULL, '"2025-11-21T14:15:58.298Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1467, 'Kth Smallest Pair Distance', 'Find kth smallest pair distance.

**Input Format:**
- First line: Size/Count
- Second line: Values

**Output Format:**
- Print the result as specified

**Constraints:**
- 1 <= n <= 10^6
- Values fit in 64-bit integer range

**Note:**
- Ensure that your solution handles all edge cases and constraints effectively.
- Optimized time and space complexity is expected for this problem.', 'Hard', 'Binary Search', NULL, NULL, 'Array. k.', 'kth distance.', '2≤n≤10^4', NULL, '"2025-11-21T14:15:58.304Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1468, 'Find K-th Smallest Sum', 'Kth smallest sum of pairs.

**Input Format:**
- First line: Size/Count
- Second line: Values

**Output Format:**
- Print the result as specified

**Constraints:**
- 1 <= n <= 10^6
- Values fit in 64-bit integer range

**Note:**
- Ensure that your solution handles all edge cases and constraints effectively.
- Optimized time and space complexity is expected for this problem.', 'Hard', 'Binary Search', NULL, NULL, 'Line 1: nums1. Line 2: nums2. Line 3: k.', 'kth sum.', '1≤n≤2000', NULL, '"2025-11-21T14:15:58.308Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1470, 'Trapping Rain Water II', 'Water trapped in 2D elevation map.

**Input Format:**
- First line: Size/Count
- Second line: Values

**Output Format:**
- Print the result as specified

**Constraints:**
- 1 <= n <= 10^6
- Values fit in 64-bit integer range

**Note:**
- Ensure that your solution handles all edge cases and constraints effectively.
- Optimized time and space complexity is expected for this problem.', 'Hard', 'Heap', NULL, NULL, 'rows cols. Matrix.', 'Total water.', '1≤m,n≤200', NULL, '"2025-11-21T14:15:58.316Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1471, 'Basic Calculator', 'Evaluate expression with +, -, (, ).

**Input Format:**
- A single value

**Output Format:**
- Print the result as specified

**Constraints:**
- 1 <= n <= 10^6
- Values fit in 64-bit integer range

**Note:**
- Ensure that your solution handles all edge cases and constraints effectively.
- Optimized time and space complexity is expected for this problem.', 'Hard', 'Stack', NULL, NULL, 'Expression string.', 'Result.', '1≤s≤3×10^5', NULL, '"2025-11-21T14:15:58.319Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1473, 'Distinct Subsequences', 'Count distinct subsequences of t in s.

**Input Format:**
- First line: Size/Count
- Second line: Values

**Output Format:**
- Print the result as specified

**Constraints:**
- 1 <= n <= 10^6
- Values fit in 64-bit integer range

**Note:**
- Ensure that your solution handles all edge cases and constraints effectively.
- Optimized time and space complexity is expected for this problem.', 'Hard', 'Dynamic Programming', NULL, NULL, 'String s. String t.', 'Count.', '1≤s,t≤1000', NULL, '"2025-11-21T14:15:58.330Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1474, 'Interleaving String', 'Check if s3 is interleaving of s1 and s2.

**Input Format:**
- First line: Size/Count
- Second line: Values

**Output Format:**
- Print the result as specified

**Constraints:**
- 1 <= n <= 10^6
- Values fit in 64-bit integer range

**Note:**
- Ensure that your solution handles all edge cases and constraints effectively.
- Optimized time and space complexity is expected for this problem.', 'Hard', 'Dynamic Programming', NULL, NULL, 'String s1. String s2. String s3.', '"true"/"false".', '0≤len≤100', NULL, '"2025-11-21T14:15:58.334Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1476, 'Critical Connections', 'Find all critical connections (bridges).

**Input Format:**
- First line: Size/Count
- Second line: Values

**Output Format:**
- Print the result as specified

**Constraints:**
- 1 <= n <= 10^6
- Values fit in 64-bit integer range

**Note:**
- Ensure that your solution handles all edge cases and constraints effectively.
- Optimized time and space complexity is expected for this problem.', 'Hard', 'Graph', NULL, NULL, 'n. Edges.', 'Critical connections.', '1≤n≤10^5', NULL, '"2025-11-21T14:15:58.341Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1478, 'Swim in Rising Water', 'Min time to swim from top-left to bottom-right.

**Input Format:**
- First line: Size/Count
- Second line: Values

**Output Format:**
- Print the result as specified

**Constraints:**
- 1 <= n <= 10^6
- Values fit in 64-bit integer range

**Note:**
- Ensure that your solution handles all edge cases and constraints effectively.
- Optimized time and space complexity is expected for this problem.', 'Hard', 'Graph', NULL, NULL, 'n×n grid with elevations.', 'Min time.', '1≤n≤50', NULL, '"2025-11-21T14:15:58.349Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1480, 'Max Points on Line', 'Max points on same line.

**Input Format:**
- First line: Size/Count
- Second line: Values

**Output Format:**
- Print the result as specified

**Constraints:**
- 1 <= n <= 10^6
- Values fit in 64-bit integer range

**Note:**
- Ensure that your solution handles all edge cases and constraints effectively.
- Optimized time and space complexity is expected for this problem.', 'Hard', 'Hashing', NULL, NULL, 'Points (x y per line).', 'Max points.', '1≤points≤300', NULL, '"2025-11-21T14:15:58.357Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1481, 'Sliding Puzzle', 'Min moves to solve 2×3 sliding puzzle.

**Input Format:**
- First line: Size/Count
- Second line: Values

**Output Format:**
- Print the result as specified

**Constraints:**
- 1 <= n <= 10^6
- Values fit in 64-bit integer range

**Note:**
- Ensure that your solution handles all edge cases and constraints effectively.
- Optimized time and space complexity is expected for this problem.', 'Hard', 'Queue', NULL, NULL, '2×3 board.', 'Min moves or -1.', 'Valid board', NULL, '"2025-11-21T14:15:58.360Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1483, 'First Missing Positive', 'Find smallest missing positive integer.

**Input Format:**
- Space-separated values

**Output Format:**
- Print the result as specified

**Constraints:**
- 1 <= n <= 10^6
- Values fit in 64-bit integer range

**Note:**
- Ensure that your solution handles all edge cases and constraints effectively.
- Optimized time and space complexity is expected for this problem.', 'Hard', 'Array', NULL, NULL, 'Array.', 'Smallest missing positive.', '1≤n≤10^5', NULL, '"2025-11-21T14:15:58.368Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1484, 'Minimum Window Contains All', 'Min substring containing all characters.

**Input Format:**
- First line: Size/Count
- Second line: Values

**Output Format:**
- Print the result as specified

**Constraints:**
- 1 <= n <= 10^6
- Values fit in 64-bit integer range

**Note:**
- Ensure that your solution handles all edge cases and constraints effectively.
- Optimized time and space complexity is expected for this problem.', 'Hard', 'String', NULL, NULL, 'String s. String t.', 'Min window.', '1≤m,n≤10^5', NULL, '"2025-11-21T14:15:58.372Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1494, 'Count of Atoms', 'Parse chemical formula and count atoms.

**Input Format:**
- A single value

**Output Format:**
- Print the result as specified

**Constraints:**
- 1 <= n <= 10^6
- Values fit in 64-bit integer range

**Note:**
- Ensure that your solution handles all edge cases and constraints effectively.
- Optimized time and space complexity is expected for this problem.', 'Hard', 'Stack', NULL, NULL, 'Chemical formula.', 'Sorted atom counts.', '1≤formula≤1000', NULL, '"2025-11-21T14:17:59.728Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1495, 'Word Break II', 'All possible word breaks.

**Input Format:**
- First line: Size/Count
- Second line: Values

**Output Format:**
- Print the result as specified

**Constraints:**
- 1 <= n <= 10^6
- Values fit in 64-bit integer range

**Note:**
- Ensure that your solution handles all edge cases and constraints effectively.
- Optimized time and space complexity is expected for this problem.', 'Hard', 'String', NULL, NULL, 'String. Dictionary.', 'All sentences.', '1≤s≤20', NULL, '"2025-11-21T14:17:59.738Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1497, 'Partition List', 'Partition list around value x.

**Input Format:**
- First line: Size/Count
- Second line: Values

**Output Format:**
- Print the result as specified

**Constraints:**
- 1 <= n <= 10^5
- -10^4 <= values <= 10^4

**Note:**
- Ensure that your solution handles all edge cases and constraints effectively.
- Optimized time and space complexity is expected for this problem.', 'Medium', 'Linked List', NULL, NULL, 'Line 1: list. Line 2: x.', 'Partitioned list.', '0≤n≤200', NULL, '"2025-11-21T14:17:59.748Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO problems (problem_id, title, description, difficulty, topic, test_case_input, test_case_output, input_format, output_format, constraints, source, created_at) VALUES (1503, 'Candy Distribution', 'Min candies for children with ratings.

**Input Format:**
- Space-separated values

**Output Format:**
- Print the result as specified

**Constraints:**
- 1 <= n <= 10^6
- Values fit in 64-bit integer range

**Note:**
- Ensure that your solution handles all edge cases and constraints effectively.
- Optimized time and space complexity is expected for this problem.', 'Hard', 'Array', NULL, NULL, 'Ratings.', 'Min total candies.', '1≤n≤2×10^4', NULL, '"2025-11-21T14:19:35.028Z"') ON CONFLICT (problem_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (283, 1308, '7
1 2 3 4 5 6 7
3', '5 6 7 1 2 3 4', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (284, 1309, '8
4 3 2 7 8 2 3 1', '2 3', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (285, 1310, '3
1 2 3', '1 3 2', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (286, 1311, '6
2 0 2 1 1 0', '0 0 1 1 2 2', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (287, 1312, '7
2 2 1 1 1 2 2', '2', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (288, 1250, '4
1 3
2 6
8 10
15 18', '1 6
8 10
15 18', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (289, 1247, '4
1 2 3 4', '24 12 8 6', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (290, 1307, '3
1 1 1
2', '2', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (291, 1313, 'the sky is blue', 'blue is sky the', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (292, 1314, 'sadbutsad
sad', '0', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (293, 1315, '42', '42', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (294, 1316, 'ADOBECODEBANC
ABC', 'BANC', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (295, 1317, '3
flower flow flight', 'fl', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (296, 1256, '6
eat tea tan ate nat bat', 'ate eat tea
bat
nat tan', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (297, 1252, 'A man, a plan, a canal: Panama', 'true', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (298, 1286, '4
1 2 2 1', 'true', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (299, 1319, '5
1 2 3 4 5', '1 5 2 4 3', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (301, 1261, '5
1 2 3 4 5', '5 4 3 2 1', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (302, 1262, '3
1 2 4
3
1 3 4', '1 1 2 3 4 4', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (303, 1338, '3 5 1 6 2 0 8 null null 7 4
5
1', '3', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (304, 1339, '1 2 3 null 5 null 4', '1 3 4', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (306, 1341, '5 3 6 2 4 null null 1
3', '3', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (307, 1266, '3 9 20 null null 15 7', '3', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (308, 1325, '4
1 2 4
2 1 3
3 2 4
4 1 3', '4
1 2 4
2 1 3
3 2 4
4 1 3', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (309, 1326, '5 5
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
4 0', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (310, 1295, 'hit
cog
6
hot dot dog lot log cog', '5', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (311, 1276, '4 5
1 1 1 1 0
1 1 0 1 0
1 1 0 0 0
0 0 0 0 0', '1', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (312, 1277, '2
1
1 0', 'true', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (313, 1342, 'leetcode
2
leet code', 'true', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (314, 1321, '4
1 5 11 5', 'true', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (315, 1322, 'horse
ros', '3', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (316, 1323, '12', '2', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (317, 1324, '4
2 3 -2 4', '6', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (318, 1289, '7
push -2
push 0
push -3
getMin
pop
top
getMin', '-3
0
-2', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (319, 1290, '5
2 1 + 3 *', '9', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (320, 1301, '7
4 5 6 7 0 1 2', '0', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (321, 1331, '5 5
1 4 7 11 15
2 5 8 12 19
3 6 9 16 22
10 13 14 17 24
18 21 23 26 30
5', 'true', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (322, 1304, '3
addNum 1
addNum 2
findMedian', '1.5', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (323, 1288, '3
3 1 4 5
3 1 3 4
2 2 6', '1 1 2 3 4 4 5 6', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (324, 1284, '6
1 1 1 2 2 3
2', '1 2', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1883, 1241, '4
2 7 11 15
9', '0 1', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (326, 1334, '23', 'ad ae af bd be bf cd ce cf', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (327, 1343, '3', '((())) (()()) (())() ()(()) ()()()', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (328, 1243, '4
1 2 3 1', 'true', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (329, 1243, '3
1 2 3', 'false', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (330, 1243, '5
1 1 1 3 3 4 3 2 4 2', 'true', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (331, 1306, '6
100 4 200 1 3 2', '4', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (332, 1306, '10
0 3 7 2 5 8 4 6 0 1', '9', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (333, 1306, '0
', '0', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (334, 1281, '5
2 3 1 1 4', 'true', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (335, 1281, '5
3 2 1 0 4', 'false', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (336, 1281, '1
0', 'true', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (337, 1296, '5
1 2 3 4 5
3 4 5 1 2', '3', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (338, 1296, '3
2 3 4
3 4 3', '-1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (339, 1296, '1
5
4', '0', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (340, 1344, 'MyStack
push 1
push 2
top
pop
empty', '2
2
false', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (341, 1285, '6
3 2 1 5 6 4
2', '5', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (342, 1285, '9
3 2 3 1 2 4 5 5 6
4', '4', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (343, 1285, '1
1
1', '1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (344, 1345, '3
3 0 1', '2', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (345, 1345, '5
5 4 0 3 1', '2', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (346, 1345, '9
9 6 4 2 3 5 7 0 1', '8', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (347, 1345, '1
1', '0', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (348, 1346, '5
1 1 2 2 3', '3
1 2 3', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (349, 1346, '3
1 1 1', '1
1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (350, 1346, '6
0 0 1 1 1 2', '3
0 1 2', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (351, 1346, '1
5', '1
5', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (352, 1347, '6
-1 0 1 2 -1 -4', '-1 -1 2
-1 0 1', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (353, 1347, '3
0 0 0', '0 0 0', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (354, 1347, '5
1 2 3 4 5', '', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (355, 1347, '4
-2 0 1 1', '-2 1 1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (356, 1348, '2 2
1 3
2 4', '2.5', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (360, 1349, 'hello', 'olleh', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (361, 1349, 'a', 'a', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (362, 1349, 'Hannah', 'hannaH', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (363, 1349, 'racecar', 'racecar', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (364, 1350, 'leetcode', '0', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (365, 1350, 'loveleetcode', '2', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (366, 1350, 'aabb', '-1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (367, 1350, 'z', '0', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (368, 1351, '6 2
3 2 1 5 6 4', '5', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (369, 1351, '1 1
5', '5', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (370, 1351, '9 4
3 2 3 1 2 4 5 5 6', '4', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (371, 1351, '4 1
10 5 20 15', '20', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (372, 1352, '4
2 7 4 1', '1', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (373, 1352, '2
1 1', '0', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (374, 1352, '1
5', '5', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (375, 1352, '3
3 7 2', '2', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (376, 1353, '3 1
1 3
-2 2
5 8', '-2 2', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (377, 1353, '2 2
3 3
5 -1', '3 3
5 -1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (378, 1353, '1 1
0 1', '0 1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (379, 1353, '3 2
0 1
1 0
3 3', '0 1
1 0', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (380, 1354, '7 3
7 10 4 3 20 15 8', '7', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (381, 1354, '5 1
5 4 3 2 1', '1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (382, 1354, '3 2
10 5 12', '10', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (383, 1354, '1 1
42', '42', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (384, 1355, '3
1 4 5
1 3 4
2 6', '1 1 2 3 4 4 5 6', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (385, 1355, '0', '', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (386, 1355, '1
1', '1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (387, 1355, '2

1', '1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (388, 1356, '3
4 5 8 2
3
3
5
10', '4
5
5', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (389, 1356, '1

2
5
3', '5
5', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (390, 1356, '2
1 2
1
3', '2', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (391, 1356, '1
5
2
10
12', '10
12', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (392, 1357, 'aab', 'aba', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (393, 1357, 'aaab', '', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (394, 1357, 'abc', 'abc', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (395, 1357, 'vvvlo', 'vovlv', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (396, 1358, '2 0
3
1 0
2 1
3 1', '4', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (397, 1358, '1 0
1
1 0', '1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (398, 1358, '3 0
2
1 1
2 2', '0', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (399, 1358, '1 10
2
5 10
10 20', '15', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (400, 1359, 'egg
add', 'true', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (401, 1359, 'foo
bar', 'false', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (402, 1359, 'paper
title', 'true', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (403, 1359, 'ab
aa', 'false', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (404, 1360, '19', 'true', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (405, 1360, '2', 'false', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (406, 1360, '1', 'true', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (407, 1360, '7', 'true', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (408, 1361, 'abba
dog cat cat dog', 'true', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (409, 1361, 'abba
dog cat cat fish', 'false', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (410, 1361, 'aaaa
dog cat cat dog', 'false', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (411, 1361, 'abc
b c a', 'true', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (412, 1362, 'cbaebabacd
abc', '0 6', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (413, 1362, 'abab
ab', '0 1 2', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (414, 1362, 'baa
aa', '1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (415, 1362, 'a
a', '0', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (417, 1363, '2 2
a
a', 'a', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (418, 1363, '4 1
the
day
is
sunny', 'day', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (419, 1363, '1 1
hello', 'hello', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (420, 1364, '4 3 0
1 2 3 1', 'true', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (421, 1364, '6 2 1
1 5 9 1 5 9', 'false', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (422, 1364, '2 1 1
1 3', 'true', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (424, 1365, 'barfoothefoobarman
2
foo
bar', '0 9', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (425, 1365, 'wordgoodgoodgoodbestword
4
word
good
best
word', '', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (426, 1365, 'barfoofoobarthefoobarman
2
bar
foo', '0 3 9 12', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (427, 1365, 'a
1
a', '0', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (428, 1366, 'banana', 'ana', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (429, 1366, 'abcd', '', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (430, 1366, 'aaaa', 'aaa', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (431, 1366, 'abcabcabc', 'abcabc', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (432, 1367, 'ABC', '10', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (433, 1367, 'ABA', '8', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (434, 1367, 'LEETCODE', '92', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (435, 1367, 'A', '1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (436, 1368, '4
abcd
dcba
lls
s', '0 1
1 0
2 3
3 2', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (437, 1368, '2
bat
tab', '0 1
1 0', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (438, 1368, '2
a
', '0 1
1 0', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (439, 1368, '1
abc', '', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (440, 1369, '1 2 6 3 4 5 6
6', '1 2 3 4 5', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (441, 1369, '
1', '', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (442, 1369, '7 7 7 7
7', '', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (443, 1369, '1 2 3
4', '1 2 3', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (444, 1370, '1 2 3 4 5
2', '1 2 3 5', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (445, 1370, '1
1', '', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (446, 1370, '1 2
1', '1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (447, 1370, '1 2
2', '2', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (448, 1371, '1 2 3 4', '2 1 4 3', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (449, 1371, '', '', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (450, 1371, '1', '1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (451, 1371, '1 2 3', '2 1 3', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (452, 1372, '1 2 3 4 5
2', '4 5 1 2 3', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (453, 1372, '0 1 2
4', '2 0 1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (454, 1372, '1 2
0', '1 2', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (455, 1372, '1
99', '1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (456, 1373, '1 2 3 4 5
2', '2 1 4 3 5', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (457, 1373, '1 2 3 4 5
3', '3 2 1 4 5', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (458, 1373, '1
1', '1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (459, 1373, '1 2 3 4 5
1', '1 2 3 4 5', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (460, 1374, '7 1 -1
13 2 0
11 3 2
10 4 1
1 -1 -1', '7 1 -1
13 2 0
11 3 2
10 4 1
1 -1 -1', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (462, 1374, '', '', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (463, 1374, '1 1 1
2 -1 0', '1 1 1
2 -1 0', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (464, 1375, '5
2
D
+
C', '30', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (465, 1375, '5
-2
4
C
D
9
+
+', '27', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (466, 1375, '1', '1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (467, 1375, '1
C', '0', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (468, 1376, '4 1 2
1 3 4 2', '3 -1 3', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (469, 1376, '2 4
1 2 3 4', '3 -1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (470, 1376, '1
1', '-1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (471, 1376, '1 2
2 1 3', '3 3', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (472, 1377, '(()())(())', '()()()', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (473, 1377, '()()', '', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (474, 1377, '(()())(())(()(()))', '()()()()(())', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (475, 1377, '((()))', '(())', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (476, 1378, '5 10 -5', '5 10', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (477, 1378, '8 -8', '', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (478, 1378, '10 2 -5', '10', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (479, 1378, '-2 -1 1 2', '-2 -1 1 2', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (480, 1379, '1432219
3', '1219', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (481, 1379, '10200
1', '200', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (482, 1379, '10
2', '0', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (483, 1379, '9
1', '0', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (484, 1380, '4 5
10100
10111
11111
10010', '6', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (485, 1380, '1 1
0', '0', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (486, 1380, '1 1
1', '1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (487, 1380, '2 2
11
11', '4', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (488, 1381, 'push 1
push 2
peek
pop
empty', '1
1
false', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (489, 1381, 'push 1
pop
empty', '1
true', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (490, 1381, 'push 5
peek', '5', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (491, 1381, 'empty', 'true', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (492, 1382, '3
enqueue 1
enqueue 2
dequeue
enqueue 3', 'true
true
true
true', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (493, 1382, '2
enqueue 1
enqueue 2
enqueue 3', 'true
true
false', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (494, 1382, '1
enqueue 1
dequeue', 'true
true', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (495, 1382, '5
isEmpty', 'true', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (496, 1383, '1
100
3001
3002', '1
2
3
3', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (497, 1383, '1', '1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (498, 1383, '1
2
3
4
5', '1
2
3
4
5', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (499, 1383, '1
3001', '1
1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (500, 1384, 'aabcc', 'a
-1
b
b
-1', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (501, 1384, 'a', 'a', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (502, 1384, 'aa', 'a
-1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (503, 1384, 'abc', 'a
a
a', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (504, 1385, '2 3 2
2', '6', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (505, 1385, '5 1 1 1
0', '8', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (506, 1385, '1
0', '1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (507, 1385, '10 9 8
1', '17', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (508, 1386, '5 3
1 -1 -2 4 -7', '7', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (509, 1386, '10 4
10 -5 -2 4 0 3 -1 -3 7 -2', '17', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (510, 1386, '3 1
1 2 3', '6', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (511, 1386, '1 1
5', '5', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (423, 1364, '3
0 0 0', 'false', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (461, 1374, '3
1 -1 -1', '1 -1 -1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (512, 1387, '5 7
2 -1 2 3 1', '2', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (513, 1387, '3 3
1 1 1', '3', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (514, 1387, '3 81
1 2 3', '-1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (515, 1387, '5 20
1 -1 4 5 10', '3', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (516, 1388, '17 13 11 2 3 5 7', '2 13 3 11 5 17 7', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (517, 1388, '1', '1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (518, 1388, '1 2 3 4 5', '1 5 2 4 3', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (519, 1388, '1 2', '1 2', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (520, 1389, 'RD', 'Radiant', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (521, 1389, 'RDD', 'Dire', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (522, 1389, 'R', 'Radiant', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (523, 1389, 'RRDDD', 'Dire', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (524, 1390, '5 2
10 2 -10 5 20', '37', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (525, 1390, '7 2
-1 -2 -3 -4 -5 -6 -7', '-1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (526, 1390, '3 1
10 -2 -10', '10', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (527, 1390, '4 2
-5 -1 -3 -2', '-1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (528, 1391, '4
1 2 3 4
-1 4 5 6', '13', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (529, 1391, '2
1 2
3 4', '3', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (530, 1391, '3
1 2 3
1 2 3', '4', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (531, 1391, '1
5
5', '0', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (532, 1392, '5
4', '4', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (533, 1392, '1
1', '1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (534, 1392, '10
6', '6', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (535, 1392, '100
1', '1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (536, 1393, '16', 'true', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (537, 1393, '14', 'false', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (538, 1393, '1', 'true', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (539, 1393, '2147483647', 'false', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (540, 1394, '8', '2', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (544, 1395, '3 4 5 1 2', '1', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (545, 1395, '4 5 6 7 0 1 2', '0', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (546, 1395, '11 13 15 17', '11', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (547, 1395, '1', '1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (548, 1396, '3 6 7 11
8', '4', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (549, 1396, '30 11 23 4 20
5', '30', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (550, 1396, '30 11 23 4 20
6', '23', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (551, 1396, '1000000000
2', '500000000', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (552, 1397, '1 2 3 4 5 6 7 8 9 10
5', '15', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (553, 1397, '3 2 2 4 1 4
3', '6', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (554, 1397, '1 2 3 1 1
4', '3', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (555, 1397, '10
1', '10', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (556, 1398, '-2 5 -1
-2 2', '3', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (557, 1398, '0
0 0', '1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (558, 1398, '1 2 3
3 3', '2', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (559, 1398, '2147483647 -2147483648 -1 0
-1 0', '4', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (560, 1399, '3 9 20
15 7', '3', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (561, 1399, '1', '1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (562, 1399, '', '0', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (563, 1399, '5 1
2', '2', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (564, 1400, '1 2 2 3 4 4 3', 'true', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (565, 1400, '1 2 2 null 3 null 3', 'false', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (566, 1400, '1', 'true', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (567, 1400, '1 2 3', 'false', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (568, 1401, '1 2 3 4 5', '3', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (569, 1401, '1 2', '1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (570, 1401, '1', '0', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (571, 1401, '1 2 3 4 5 null null 6', '4', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (572, 1402, '3 9 20 null null 15 7', 'true', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (573, 1402, '1 2 2 3 3 null null 4 4', 'false', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (574, 1402, '', 'true', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (575, 1402, '1', 'true', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (576, 1403, '2 1 3', 'true', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (577, 1403, '5 1 4 null null 3 6', 'false', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (578, 1403, '1', 'true', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (579, 1403, '2 1 3', 'true', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (580, 1404, '6 2 8 0 4 7 9 null null 3 5
2 8', '6', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (581, 1404, '6 2 8 0 4 7 9 null null 3 5
2 4', '2', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (582, 1404, '2 1
2 1', '2', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (583, 1404, '1 2
2 2', '2', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (584, 1405, '3 9 20 null null 15 7', '3
9 20
15 7', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (585, 1405, '1', '1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (586, 1405, '', '', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (587, 1405, '1 2 3 4 null null 5', '1
2 3
4 5', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (588, 1406, '5 4 8 11 null 13 4 7 2 null null 5 1
22', '5 4 11 2
5 8 4 1', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (589, 1406, '1 2 3
5', '', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (590, 1406, '1
1', '1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (591, 1406, '1 2
1', '', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (593, 1407, '-1
-1', '-1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (594, 1407, '1 2
2 1', '1 2', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (595, 1407, '1 2 3
2 1 3', '1 2 3', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (597, 1408, '', '', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (598, 1408, '1', '1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (599, 1408, '1 2 3 4 5', '1 2 3 4 5', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (600, 1409, '-10 9 20 null null 15 7', '42', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (601, 1409, '1 2 3', '6', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (602, 1409, '-3', '-3', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (603, 1409, '1 -2 -3 1 3 -2 null -1', '3', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (604, 1410, '1 2
2 3
4 2', '2', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (605, 1410, '1 2
5 1
1 3
1 4', '1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (606, 1410, '2 3
3 1', '3', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (607, 1410, '1 2
2 3', '2', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (608, 1411, '2
1 2', '2', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (609, 1411, '3
1 3
2 3', '3', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (610, 1411, '3
1 3
2 3
3 1', '-1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (611, 1411, '1', '1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (612, 1412, '1 2
3
3
', '0 1 3
0 2 3', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (613, 1412, '1
', '0 1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (614, 1412, '3
0
0
', '0 1 2
0 2', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (615, 1412, '1 2
3
3
', '0 1 3
0 2 3', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (616, 1413, '3
0 1
1 2
2 0
0
2', 'true', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (617, 1413, '6
0 1
0 2
3 5
5 4
4 3
0
5', 'false', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (618, 1413, '1

0
0', 'true', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (619, 1413, '2
0 1
0
1', 'true', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (620, 1414, '1 1 0
1 1 0
0 0 1', '2', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (621, 1414, '1 0 0
0 1 0
0 0 1', '3', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (622, 1414, '1', '1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (623, 1414, '1 1
1 1', '1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (624, 1415, '1 2 2 3 5
3 2 3 4 4
2 4 5 3 1
6 7 1 4 5
5 1 1 2 4', '0 4
1 3
1 4
2 2
3 0
3 1
4 0', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (625, 1415, '1', '0 0', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (627, 1415, '1 2
3 4', '0 0
0 1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (628, 1416, '4 2
2 1 1
2 3 1
3 4 1', '2', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (630, 1416, '2 1
1 2 1', '1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (631, 1416, '2 2
1 2 1', '-1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (626, 1415, '2
1 1', '0 0', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (629, 1416, '2
1 1', '0', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (632, 1417, '4
1 0
1 2
1 3', '1', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (633, 1417, '6
3 0
3 1
3 2
3 4
5 4', '3 4', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (634, 1417, '1', '0', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (635, 1417, '2
0 1', '0 1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (636, 1418, '10 15 20', '15', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (637, 1418, '1 100 1 1 1 100 1 1 100 1', '6', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (638, 1418, '10 15', '10', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (639, 1418, '1 2 3', '2', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (640, 1419, '-2 1 -3 4 -1 2 1 -5 4', '6', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (641, 1419, '1', '1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (642, 1419, '-1', '-1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (643, 1419, '5 4 -1 7 8', '23', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (644, 1420, '2', 'true', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (645, 1420, '1', 'false', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (646, 1420, '3', 'false', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (647, 1420, '4', 'true', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (648, 1421, '1 5 11 5', 'true', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (649, 1421, '1 2 3 5', 'false', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (650, 1421, '2 2', 'true', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (651, 1421, '1 2 5', 'false', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (652, 1422, 'aa
a*', 'true', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (653, 1422, 'aa
a', 'false', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (654, 1422, 'ab
.*', 'true', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (655, 1422, 'aab
c*a*b', 'true', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (656, 1423, '1 2 3
1 1', '1', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (657, 1423, '1 2
1 2 3', '2', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (658, 1423, '10 9 8 7
5 6 7 8', '2', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (659, 1423, '1 1 1
1 1 1', '3', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (660, 1424, '5 5 5 10 20', 'true', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (661, 1424, '5 5 10 10 20', 'false', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (662, 1424, '5 5 10', 'true', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (663, 1424, '10 10', 'false', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (664, 1425, '7 1 5 3 6 4', '7', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (665, 1425, '1 2 3 4 5', '4', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (666, 1425, '7 6 4 3 1', '0', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (667, 1425, '2 1 2 0 1', '2', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (668, 1426, '1 2 3', '3', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (669, 1426, '1 1 1', '0', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (670, 1426, '1 2 3 4 5', '6', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (671, 1426, '1 1000000000', '999999999', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (672, 1427, '7 0
4 4
7 1
5 0
6 1
5 2', '5 0
7 0
5 2
6 1
4 4
7 1', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (673, 1427, '6 0
5 0
4 0
3 2
2 2
1 4', '4 0
5 0
2 2
3 2
1 4
6 0', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (675, 1427, '2 0
1 0', '1 0
2 0', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (676, 1428, '1 2
2 3
3 4
1 3', '1', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (677, 1428, '1 2
1 2
1 2', '2', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (678, 1428, '1 2
2 3', '0', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (679, 1428, '1 100
11 22
1 11
2 12', '2', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (680, 1429, '2 3 1 1 4', '2', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (681, 1429, '2 3 0 1 4', '2', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (682, 1429, '1 1 1 1', '3', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (683, 1429, '1 2', '1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (684, 1430, 'a1b2', 'a1b2
a1B2
A1b2
A1B2', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (685, 1430, '3z4', '3z4
3Z4', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (686, 1430, '12345', '12345', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (687, 1430, 'C', 'c
C', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (688, 1431, '4 2', '1 2
1 3
1 4
2 3
2 4
3 4', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (689, 1431, '1 1', '1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (690, 1431, '3 3', '1 2 3', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (691, 1431, '5 3', '1 2 3
1 2 4
1 2 5
1 3 4
1 3 5
1 4 5
2 3 4
2 3 5
2 4 5
3 4 5', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (692, 1432, '23', 'ad ae af bd be bf cd ce cf', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (693, 1432, '', '', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (694, 1432, '2', 'a b c', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (695, 1432, '234', 'adg adh adi aeg aeh aei afg afh afi bdg bdh bdi beg beh bei bfg bfh bfi cdg cdh cdi ceg ceh cei cfg cfh cfi', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (696, 1433, 'o a a n
e t a e
i h k r
i f l v
oath pea eat rain', 'eat oath', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (697, 1433, 'a b
c d
abcd dcba', 'abcd dcba', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (698, 1433, 'a
a', 'a', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (699, 1433, 'a b
c d
ab', 'ab', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (700, 1434, '1 7 11
2 4 6
3', '1 2
1 4
1 6', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (701, 1434, '1 1 2
1 2 3
2', '1 1
1 1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (702, 1434, '1 2
3
3', '1 3
2 3', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (703, 1434, '1
1
1', '1 1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (704, 1435, '0 1', '2', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (705, 1435, '0 1 0', '2', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (706, 1435, '0 0 1 1 0', '4', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (707, 1435, '1 1 1 1', '0', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (708, 1436, '1 2
-2 -1
-1 2
0 2', '2', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (709, 1436, '0
0
0
0', '1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (710, 1436, '1 1
-1 -1
0 0
0 0', '4', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (711, 1436, '1
1
1
1', '0', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (712, 1437, '1 2 3
1 2 3', 'true', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (713, 1437, '1 2
1 null 2', 'false', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (714, 1437, '1 2 1
1 1 2', 'false', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (715, 1437, '
', 'true', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (716, 1438, '3 9 20 null null 15 7', '2', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (717, 1438, '2 null 3 null 4 null 5 null 6', '5', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (718, 1438, '', '0', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (719, 1438, '1', '1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (720, 1439, '3 1 4 null 2
1', '1', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (721, 1439, '5 3 6 2 4 null null 1
3', '3', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (722, 1439, '1
1', '1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (723, 1439, '2 1 3
2', '2', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (725, 1440, '', '', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (726, 1440, '1 2', '1 null 2', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (727, 1440, '1 null 2', '1 null 2', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (728, 1441, '1 2 3 4 5 6 7', '1#2 3#4 5 6 7#', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (729, 1441, '', '', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (730, 1441, '1', '1#', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (731, 1441, '1 2 3', '1#2 3#', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (732, 1442, '0 0 null 0 0', '1', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (733, 1442, '0 0 null 0 null 0 null null 0', '2', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (734, 1442, '0', '1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (735, 1442, '0 0 0', '1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (736, 1443, '3 9 20 null null 15 7', '9
3 15
20
7', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (737, 1443, '1 2 3 4 5 6 7', '4
2
1 5 6
3
7', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (738, 1443, '1', '1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (739, 1443, '1 2 3', '2
1
3', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (740, 1444, '1 3 2 4 5 6', '3', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (741, 1444, '1 2 3 4 5', '3', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (742, 1444, '', '0', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (743, 1444, '1', '1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (744, 1445, '3 9 20 null null 15 7', '2', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (745, 1445, '1', '1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (746, 1445, '2 null 3 null 4', '4', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (747, 1445, '1 2 3', '2', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (748, 1446, 'X X X X
X O O X
X X O X
X O X X', 'X X X X
X X X X
X X X X
X O X X', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (674, 1427, '2
1 0', '1 0', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (749, 1446, 'X', 'X', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (750, 1446, 'O', 'O', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (751, 1446, 'X O X
X O X
X O X', 'X O X
X O X
X O X', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (752, 1447, '0 1
1 0', '2', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (753, 1447, '0 0 0
1 1 0
1 1 0', '4', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (754, 1447, '1 0 0
1 1 0
1 1 0', '-1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (755, 1447, '0', '1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (756, 1448, '1 3 1
1 5 1
4 2 1', '7', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (757, 1448, '1 2 3
4 5 6', '12', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (758, 1448, '5', '5', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (759, 1448, '1 1
1 1', '2', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (760, 1449, 'wrt
wrf
er
ett
rftt', 'wertf', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (761, 1449, 'z
x', 'zx', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (762, 1449, 'z
x
z', '', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (763, 1449, 'a
b
c', 'abc', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (764, 1450, 'hit
cog
hot dot dog lot log cog', 'hit hot dot dog cog
hit hot lot log cog', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (765, 1450, 'red
tax
ted tad tex red tax tad den rex pee', 'red ted tad tax
red ted tex tax
red rex tex tax', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (766, 1450, 'a
c
a b c', 'a c', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (767, 1450, 'abc
cba
abc cba', '', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (768, 1451, '1 2 3
0
0
0', '4', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (769, 1451, '1
0', '0', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (770, 1451, '1 2 3 4
0
0
0
0', '4', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (771, 1451, '1
', '0', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (772, 1452, '4', '3', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (773, 1452, '0', '0', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (774, 1452, '1', '1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (775, 1452, '10', '55', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (776, 1453, '5', '1
1 1
1 2 1
1 3 3 1
1 4 6 4 1', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (777, 1453, '1', '1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (778, 1453, '2', '1
1 1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (779, 1453, '3', '1
1 1
1 2 1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (780, 1454, '2
3 4
6 5 7
4 1 8 3', '11', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (781, 1454, '-10', '-10', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (782, 1454, '2
3 4', '5', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (783, 1454, '1
2 3', '3', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (784, 1455, '(()', '2', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (785, 1455, ')()())', '4', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (786, 1455, '', '0', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (787, 1455, '()(())', '6', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (788, 1456, '10 15 20', '15', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (789, 1456, '1 100 1 1 1 100 1 1 100 1', '6', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (790, 1456, '1 2 3 4 5', '6', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (791, 1456, '10 15', '10', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (792, 1457, '10 16
2 8
1 6
7 12', '2', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (793, 1457, '1 2
3 4
5 6
7 8', '4', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (794, 1457, '1 2
2 3
3 4
4 5', '2', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (795, 1457, '1 10
2 9
3 8', '1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (796, 1458, '3 7', '1 2 4', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (797, 1458, '3 9', '1 2 6
1 3 5
2 3 4', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (798, 1458, '4 1', '', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (799, 1458, '2 18', '9 9', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (800, 1459, '1', '0:01 0:02 0:04 0:08 0:16 0:32 1:00 2:00 4:00 8:00', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (801, 1459, '0', '0:00', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (802, 1459, '2', '0:03 0:05 0:06 0:09 0:10 0:12 0:17 0:18 0:20 0:24 0:33 0:34 0:36 0:40 0:48 1:01 1:02 1:04 1:08 1:16 1:32 2:01 2:02 2:04 2:08 2:16 2:32 3:00 4:01 4:02 4:04 4:08 4:16 4:32 5:00 6:00 8:01 8:02 8:04 8:08 8:16 8:32 9:00 10:00', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (803, 1459, '9', '7:31 7:47 7:55 7:59 11:31 11:47 11:55 11:59', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (804, 1460, 'aab', 'a a b
a ab', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (805, 1460, 'a', 'a', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (806, 1460, 'bb', 'b b
bb', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (807, 1460, 'abc', 'a b c', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (808, 1461, '53..7....
6..195...
.98....6.
8...6...3
4..8.3..1
7...2...6
.6....28.
...419..5
....8..79', '534678912
672195348
198342567
859761423
426853791
713924856
961537284
287419635
345286179', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (809, 1461, '..9748...
7........
.2.1.9...
..7...24.
.64.1.59.
.98...3..
...8.3.2.
........6
...2759..', '519748632
783652419
426139875
357986241
264317598
198524367
975863124
832491756
641275983', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (810, 1461, '1........
.2.......
..3......
...4.....
....5....
.....6...
......7..
.......8.
........9', '123456789
456789123
789123456
234567891
567891234
891234567
345678912
678912345
912345678', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (811, 1461, '.........
.........
.........
.........
.........
.........
.........
.........
.........', '123456789
456789123
789123456
234567891
567891234
891234567
345678912
678912345
912345678', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (812, 1462, '4', '2', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (813, 1462, '1', '1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (814, 1462, '2', '0', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (815, 1462, '8', '92', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (816, 1463, '53..7....
6..195...
.98....6.
8...6...3
4..8.3..1
7...2...6
.6....28.
...419..5
....8..79', '1', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (817, 1463, '.........
.........
.........
.........
.........
.........
.........
.........
.........', '6670903752021072936960', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (818, 1463, '1........
.2.......
..3......
...4.....
....5....
.....6...
......7..
.......8.
........9', '1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (819, 1463, '12.......
3........
.........
.........
.........
.........
.........
.........
.........', '2612736', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (820, 1464, '2 0
1 2 3
0 1 1', '4', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (821, 1464, '1 0
1
0', '1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (822, 1464, '3 0
1 2 3
0 1 2', '6', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (823, 1464, '1 1
1 2 3
1 1 2', '2', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (824, 1465, '1 3 5 6
2 4
2 3 9 12', '6 9', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (826, 1465, '1 3
4 6', '3 4', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (827, 1465, '1 5
2 3', '', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (828, 1466, '23', '9', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (829, 1466, '', '0', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (830, 1466, '2', '3', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (831, 1466, '999', '27', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (832, 1467, '1 3 1
1', '0', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (833, 1467, '1 1 1
2', '0', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (834, 1467, '1 6 1
3', '5', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (835, 1467, '1 2 3
2', '1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (836, 1468, '1 7 11
2 4 6
3', '7', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (837, 1468, '1 2
3
2', '4', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (838, 1468, '1
1
1', '2', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (839, 1468, '1 2 3
4 5 6
5', '7', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (840, 1469, '1 12 -5 -6 50 3
4', '12.750', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (841, 1469, '5
1', '5.000', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (842, 1469, '-1 -2 -3 -4 -5
2', '-1.500', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (843, 1469, '1 2 3 4 5
3', '4.000', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (844, 1470, '3 6
1 4 3 1 3 2
3 2 1 3 2 4
2 3 3 2 3 1', '4', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (845, 1470, '3 3
3 3 3
3 2 3
3 3 3', '1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (846, 1470, '2 2
1 2
2 1', '0', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (847, 1470, '1 1
5', '0', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (848, 1471, '(1+(4+5+2)-3)+(6+8)', '23', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (849, 1471, '1 + 1', '2', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (850, 1471, ' 2-1 + 2 ', '3', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (851, 1471, '(1)', '1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (852, 1472, '()())()', '(())()
()()()', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (853, 1472, '(a)())()', '(a())()
(a)()()', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (854, 1472, ')(', '', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (855, 1472, 'n', 'n', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (856, 1473, 'rabbbit
rabbit', '3', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (857, 1473, 'babgbag
bag', '5', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (858, 1473, 'abc
abc', '1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (859, 1473, 'a
a', '1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (860, 1474, 'aabcc
dbbca
aadbbcbcac', 'true', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (861, 1474, 'aabcc
dbbca
aadbbbaccc', 'false', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (862, 1474, 'a
b
ab', 'true', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (863, 1474, 'a
b
ba', 'true', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (864, 1475, '3 1 5 8', '167', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (865, 1475, '1 5', '10', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (866, 1475, '1', '1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (867, 1475, '9 76 64', '14824', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (868, 1476, '4
0 1
1 2
2 0
1 3', '1 3', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (869, 1476, '2
0 1', '0 1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (870, 1476, '6
0 1
1 2
2 0
1 3
3 4
4 5
5 3', '0 1
1 3', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (871, 1476, '3
0 1
1 2
2 0', '', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (872, 1477, 'MUC LHR
JFK MUC
SFO SJC
LHR SFO', 'JFK MUC LHR SFO SJC', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (873, 1477, 'JFK SFO
JFK ATL
SFO ATL
ATL JFK
ATL SFO', 'JFK ATL JFK SFO ATL SFO', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (874, 1477, 'JFK KUL
JFK NRT', 'JFK KUL', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (875, 1477, 'A B
B A', 'A B A', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (876, 1478, '0 2
1 3', '3', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (877, 1478, '0 1 2 3 4
24 23 22 21 5
12 13 14 15 16
11 17 18 19 20
10 9 8 7 6', '16', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (878, 1478, '0', '0', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (879, 1478, '3 2
0 1', '3', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (880, 1479, '1 2 3 4 5
2 4', '1 4 3 2 5', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (881, 1479, '5
1 1', '5', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (882, 1479, '1 2 3
1 3', '3 2 1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (883, 1479, '1 2 3 4 5
1 5', '5 4 3 2 1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (884, 1480, '1 1
2 2
3 3', '3', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (885, 1480, '1 1
3 2
5 3
4 1
2 3
1 4', '4', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (887, 1480, '0 0
1 1
0 0', '3', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (888, 1481, '1 2 3
4 0 5', '1', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (889, 1481, '1 2 3
5 4 0', '-1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (890, 1481, '4 1 2
5 0 3', '5', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (891, 1481, '1 2 3
4 5 0', '0', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (892, 1482, '3', '5', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (893, 1482, '1', '1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (894, 1482, '2', '2', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (895, 1482, '4', '14', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (896, 1483, '1 2 0', '3', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (897, 1483, '3 4 -1 1', '2', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (898, 1483, '7 8 9 11 12', '1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (899, 1483, '1', '2', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (900, 1484, 'ADOBECODEBANC
ABC', 'BANC', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (901, 1484, 'a
a', 'a', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (902, 1484, 'a
aa', '', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (903, 1484, 'aaaaaaaaaaaabbbbbcdd
abcdd', 'abbbbbcdd', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (904, 1485, 'ab#c
ad#c', 'true', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (905, 1485, 'ab##
c#d#', 'true', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (906, 1485, 'a#c
b', 'false', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (907, 1485, 'a##c
#a#c', 'true', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (908, 1486, '2 -1 2
3', '3', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (909, 1486, '1
1', '1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (910, 1486, '1 2
4', '-1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (911, 1486, '84 -37 32 40 95
167', '3', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (912, 1487, '3 4 6 5
9 1 2 5 8 3
5', '9 8 6 5 3', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (913, 1487, '6 7
6 0 4
5', '6 7 6 0 4', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (914, 1487, '3 9
8 9
3', '9 8 9', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (915, 1487, '1
2
1', '2', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (916, 1488, '4 1 8 4 5
5 6 1 8 4 5
8', '8', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (917, 1488, '1 9 1 2 4
3 2 4
2', '2', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (918, 1488, '2 6 4
1 5
-1', 'null', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (919, 1488, '1
1
1', '1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (920, 1489, '1 2 3 4 5 6', '6', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (921, 1489, '', '0', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (922, 1489, '1', '1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (923, 1489, '1 2 3 4', '4', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (924, 1490, '4
0 1 100
1 2 100
2 0 100
1 3 600
2 3 200
0 3 3', '700', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (925, 1490, '3
0 1 100
1 2 100
0 2 500
0 2 1', '200', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (926, 1490, '3
0 1 100
1 2 100
0 2 500
0 2 0', '500', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (927, 1490, '1

0 0 0', '0', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (928, 1491, '1 2 3 0 2', '3', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (929, 1491, '1', '0', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (930, 1491, '1 2 4', '3', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (931, 1491, '5 4 3 2 1', '0', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (932, 1492, '25525511135', '255.255.11.135
255.255.111.35', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (933, 1492, '0000', '0.0.0.0', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (934, 1492, '101023', '1.0.10.23
1.0.102.3
10.1.0.23
10.10.2.3
101.0.2.3', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (935, 1492, '1111', '1.1.1.1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (936, 1493, '1 4 7 11 15
2 5 8 12 19
3 6 9 16 22
10 13 14 17 24
18 21 23 26 30
5', 'true', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (937, 1493, '1 4 7 11 15
2 5 8 12 19
3 6 9 16 22
10 13 14 17 24
18 21 23 26 30
20', 'false', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (938, 1493, '1
1', 'true', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (939, 1493, '1 3
2 4
10', 'false', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (940, 1494, 'H2O', 'H2O', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (941, 1494, 'Mg(OH)2', 'H2MgO2', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (942, 1494, 'K4(ON(SO3)2)2', 'K4N2O14S4', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (943, 1494, 'Be32', 'Be32', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (944, 1495, 'catsanddog
cat cats and sand dog', 'cat sand dog
cats and dog', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (945, 1495, 'pineapplepenapple
apple pen applepen pine pineapple', 'pine apple pen apple
pine applepen apple
pineapple pen apple', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (946, 1495, 'catsandog
cats dog sand and cat', '', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (947, 1495, 'a
a', 'a', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (948, 1496, 'This is an example of text justification.
16', 'This    is    an
example  of text
justification.  ', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (949, 1496, 'What must be acknowledgment shall be
16', 'What   must   be
acknowledgment  
shall be        ', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (950, 1496, 'Science  is  what we understand well enough to explain to a computer.  Art is everything else we do
20', 'Science  is  what we
understand      well
enough to explain to
a  computer.  Art is
everything  else  we
do                  ', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (951, 1496, 'a
1', 'a', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (952, 1497, '1 4 3 2 5 2
3', '1 2 2 4 3 5', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (953, 1497, '2 1
2', '1 2', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (954, 1497, '1
0', '1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (955, 1497, '1 4 3 0 2 5 2
3', '1 0 2 2 4 3 5', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (956, 1498, '3 2
1 2
2 0
R
D
R
U
L
U', '0
1
1
1
1
-1', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (957, 1498, '3 3
2 0
0 1
R
D
D
L
U', '0
0
1
1
1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (958, 1498, '2 2
0 1
R
D', '0
1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (959, 1498, '1 1

L', '-1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (960, 1499, '1 7 4 9 2 5', '6', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (961, 1499, '1 17 5 10 13 15 10 5 16 8', '7', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (962, 1499, '1 2 3 4 5 6 7 8 9', '2', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (963, 1499, '1', '1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (964, 1500, '4 2 1 3', '1 2 3 4', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (965, 1500, '-1 5 3 4 0', '-1 0 3 4 5', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (966, 1500, '', '', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (967, 1500, '1', '1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (969, 1501, '', '', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (970, 1501, '1 2 3 4 5', '3 2 5 1 null 4', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (971, 1501, '1', '1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (972, 1502, 'great
rgeat', 'true', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (973, 1502, 'abcde
caebd', 'false', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (974, 1502, 'a
a', 'true', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (975, 1502, 'abc
acb', 'true', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (976, 1503, '1 0 2', '5', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (977, 1503, '1 2 2', '4', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (978, 1503, '1 3 2 2 1', '7', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (979, 1503, '1', '1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (980, 1504, '3
1 4 5
1 3 4
2 6', '1 1 2 3 4 4 5 6', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (981, 1504, '0', '', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (982, 1504, '1
', '', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (983, 1504, '2
1
2', '1 2', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (990, 1243, '4
1 2 3 1', 'true', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (991, 1243, '4
1 2 3 4', 'false', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (992, 1243, '1
1', 'false', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (993, 1243, '10
1 1 1 3 3 4 3 2 4 2', 'true', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (994, 1243, '0', 'false', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (995, 1243, '5
1 2 3 4 5', 'false', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (996, 1247, '4
1 2 3 4', '24 12 8 6', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (997, 1247, '5
-1 1 0 -3 3', '0 0 9 0 0', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (998, 1247, '2
1 2', '2 1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (999, 1247, '3
2 3 4', '12 8 6', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1001, 1247, '4
0 0 0 1', '0 0 0 0', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1008, 1249, '9
1 8 6 2 5 4 8 3 7', '49', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1009, 1249, '2
1 1', '1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1010, 1249, '2
4 3', '3', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1011, 1249, '6
1 2 4 3 1 5', '10', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1012, 1249, '3
3 1 3', '6', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1013, 1249, '10
1 2 3 4 5 6 7 8 9 10', '25', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1014, 1246, '6
-1 0 1 2 -1 -4', '-1 -1 2
-1 0 1', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1015, 1246, '0', '', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1016, 1246, '1
0', '', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1017, 1246, '3
0 0 0', '0 0 0', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1018, 1246, '4
-2 0 1 1', '-2 1 1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1019, 1246, '5
1 2 -2 -1 0', '-2 0 2
-1 0 1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1020, 1251, '12
0 1 0 2 1 0 1 3 2 1 2 1', '6', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1021, 1251, '6
4 2 0 3 2 5', '9', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1022, 1251, '1
5', '0', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1023, 1251, '3
1 2 1', '0', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1024, 1251, '5
3 0 2 0 4', '7', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1025, 1251, '4
2 1 2 1', '1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1026, 1250, '4
1 3
2 6
8 10
15 18', '1 6
8 10
15 18', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1027, 1250, '2
1 4
4 5', '1 5', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1028, 1250, '1
1 4', '1 4', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1029, 1250, '2
1 4
5 6', '1 4
5 6', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1030, 1250, '3
1 10
2 6
3 5', '1 10', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1031, 1250, '5
1 2
3 4
5 6
7 8
9 10', '1 2
3 4
5 6
7 8
9 10', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1032, 1252, 'A man, a plan, a canal: Panama', 'true', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1033, 1252, 'race a car', 'false', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1035, 1252, 'a', 'true', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1036, 1252, 'ab', 'false', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1037, 1252, 'racecar', 'true', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1038, 1253, 'anagram
nagaram', 'true', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1039, 1253, 'rat
car', 'false', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1040, 1253, 'a
a', 'true', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1041, 1253, 'ab
ba', 'true', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1042, 1253, 'abc
cba', 'true', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1043, 1253, 'hello
world', 'false', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1044, 1244, '3
3 0 1', '2', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1045, 1244, '2
0 1', '2', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1046, 1244, '1
1', '0', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1047, 1244, '9
9 6 4 2 3 5 7 0 1', '8', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1048, 1244, '1
0', '1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1049, 1244, '5
0 1 2 3 4', '5', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1050, 1245, '3
2 2 1', '1', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1051, 1245, '1
1', '1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1052, 1245, '5
4 1 2 1 2', '4', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1053, 1245, '7
1 2 3 4 5 1 2', '3', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1054, 1245, '3
7 7 8', '8', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1055, 1245, '9
1 2 3 4 5 3 2 1 5', '4', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1056, 1254, 'abcabcbb', '3', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1057, 1254, 'bbbbb', '1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1058, 1254, 'pwwkew', '3', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1059, 1254, '', '0', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1060, 1254, 'a', '1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1061, 1254, 'abcdefg', '7', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1062, 1255, 'babad', 'bab', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1063, 1255, 'cbbd', 'bb', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1064, 1255, 'a', 'a', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1065, 1255, 'ac', 'a', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1066, 1255, 'racecar', 'racecar', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1067, 1255, 'noon', 'noon', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1068, 1256, '1
a', 'a', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1069, 1256, '2
abc cba', 'abc cba', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1070, 1256, '3
dog god cat', 'cat
dog god', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1071, 1256, '0', '', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1072, 1256, '4
listen silent hello world', 'hello
world
listen silent', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1073, 1242, '6
7 1 5 3 6 4', '5', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1074, 1242, '5
7 6 4 3 1', '0', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1075, 1242, '1
1', '0', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1076, 1242, '2
1 2', '1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1077, 1242, '5
2 4 1 7 3', '6', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1078, 1242, '7
3 3 5 0 0 3 1  7', '4', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1079, 1306, '10
0 3 7 2 5 8 4 6 0 1', '9', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1002, 1248, '9
-2 1 -3 4 -1 2 1 -5 4', '6', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1003, 1248, '1
1', '1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1004, 1248, '1
-1', '-1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1005, 1248, '5
5 4 -1 7 8', '23', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1006, 1248, '2
-2 -1', '-1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1007, 1248, '5
1 2 3 4 5', '15', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1080, 1306, '1
1', '1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1081, 1306, '0', '0', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1082, 1306, '4
1 2 0 1', '3', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1083, 1306, '5
9 1 -3 2 4', '2', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1084, 1308, '2
-1 -100
2', '-1 -100', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1085, 1308, '1
1
0', '1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1086, 1308, '4
1 2 3 4
1', '4 1 2 3', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1087, 1308, '5
1 2 3 4 5
5', '1 2 3 4 5', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1088, 1308, '3
1 2 3
4', '3 1 2', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1089, 1307, '4
1 2 3 4
3', '2', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1090, 1307, '1
1
1', '1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1091, 1307, '5
1 -1 0 1 -1
0', '5', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1092, 1307, '2
1 2
3', '1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1093, 1307, '6
0 0 0 0 0 1
0', '15', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1094, 1310, '3
3 2 1', '1 2 3', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1095, 1310, '2
1 1', '1 1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1096, 1310, '1
1', '1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1097, 1310, '4
1 3 2 1', '2 1 1 3', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1098, 1310, '5
1 5 8 4 7', '1 5 8 7 4', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1099, 1311, '1
0', '0', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1100, 1311, '3
2 1 0', '0 1 2', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1101, 1311, '5
1 1 1 1 1', '1 1 1 1 1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1102, 1311, '4
2 2 0 0', '0 0 2 2', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1103, 1311, '7
0 1 2 0 1 2 1', '0 0 1 1 1 2 2', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1104, 1309, '1
1', '', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1105, 1309, '5
1 1 2 3 4', '1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1106, 1309, '6
10 2 5 10 9 1', '', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1107, 1309, '4
1 1 1 1', '1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1108, 1309, '7
2 3 4 5 2 3 4', '2 3 4', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1109, 1312, '7
2 2 1 1 1 2 2', '2', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1110, 1312, '1
1', '1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1111, 1312, '5
1 1 1 2 2', '1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1112, 1312, '3
6 5 5', '5', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1113, 1312, '9
1 1 1 1 2 2 2 3 3', '1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1114, 1285, '9
3 2 3 1 2 4 5 5 6
4', '4', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1115, 1285, '1
1
1', '1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1116, 1285, '5
5 4 3 2 1
1', '5', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1117, 1285, '4
1 1 1 1
2', '1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1118, 1285, '7
7 6 5 4 3 2 1
3', '5', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1119, 1284, '1
1
1', '1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1120, 1284, '7
4 1 -1 2 -1 2 3
2', '-1 2', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1121, 1284, '5
1 2 3 4 5
1', '1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1122, 1284, '4
1 1 2 2
2', '1 2', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1123, 1284, '8
5 5 5 3 3 1 1 1
2', '5 1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1124, 1261, '1 2', '2 1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1125, 1261, '1', '1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1126, 1261, '', '', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1127, 1261, '1 2 3', '3 2 1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1128, 1261, '5 4 3 2 1', '1 2 3 4 5', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1129, 1262, '
', '', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1130, 1262, '1
2', '1 2', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1131, 1262, '5
1 2 3 4', '1 2 3 4 5', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1132, 1262, '1 3 5
2 4 6', '1 2 3 4 5 6', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1133, 1262, '1 1 1
2 2 2', '1 1 1 2 2 2', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1135, 1263, '1
-1', 'false', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1136, 1263, '1 2
0', 'true', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1137, 1263, '1
0', 'true', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1138, 1263, '1 2 3 4
-1', 'false', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1139, 1263, '1 2 3
2', 'true', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1141, 1286, '1', 'true', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1146, 1264, '0
0', '0', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1147, 1264, '9 9 9
9 9 9 9', '8 9 9 0 1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1148, 1264, '5
5', '0 1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1149, 1264, '1 8
0', '1 8', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1150, 1264, '9 9
1', '0 0 1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1152, 1265, '1
1', '', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1153, 1265, '1 2
1', '1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1154, 1265, '1 2
2', '2', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1155, 1265, '1 2 3 4
4', '2 3 4', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1156, 1265, '1 2 3
1', '1 2', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1158, 1319, '1', '1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1162, 1320, '4 1 8 4 5
5 6 1 8 4 5
8', '8', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1163, 1320, '1 9 1 2 4
3 2 4
2', '2', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1164, 1320, '2 6 4
1 5
-1', 'null', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1165, 1320, '1
1
1', '1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1166, 1320, '1 2 3
4 5 6
-1', 'null', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1167, 1320, '1 2
1 2
1', '1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1168, 1288, '0', '', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1169, 1288, '1
', '', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1170, 1288, '2
1
2', '1 2', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1171, 1288, '1
1 2 3', '1 2 3', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1172, 1288, '4
1
2
3
4', '1 2 3 4', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1174, 1374, '', '', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1175, 1374, '1 1 1
2 -1 0', '1 1 1
2 -1 0', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1176, 1374, '3 1 -1
3 2 0
3 -1 1', '3 1 -1
3 2 0
3 -1 1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1177, 1374, '1 1 0
2 -1 0', '1 1 0
2 -1 0', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1178, 1278, '()[]{}', 'true', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1179, 1278, '{"(]","false"}', '{"([)]","false"}', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1180, 1278, '{"{[]}","true"}', '{"((","false"}', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1181, 1289, '{"push 1
getMin","1"}', '{"push 5
push 1
pop
getMin","5"}', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1182, 1289, '{"push 0
push 1
push 0
getMin","0"}', '{"push -1
push 2
getMin","-1"}', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1186, 1291, '3[a]2[bc]', 'aaabcbc', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1187, 1291, '{"3[a2[c]]","accaccacc"}', '{"2[abc]3[cd]ef","abcabccdcdcdef"}', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1188, 1291, '{"abc","abc"}', '{"10[a]","aaaaaaaaaa"}', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1189, 1381, '{"push 1
pop
empty","1
true"}', '{"push 5
peek","5"}', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1190, 1381, '{"empty","true"}', '{"push 1
push 2
pop
pop
empty","1
2
true"}', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1191, 1382, '{"2
enqueue 1
enqueue 2
enqueue 3","true
true
false"}', '{"1
enqueue 1
dequeue","true
true"}', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1192, 1382, '{"5
isEmpty","true"}', '{"4
enqueue 1
isFull","true
false"}', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1193, 1257, '2
6 0
-1 0 3 5 9 12', '1', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1134, 1263, '4
3 2 0 -4
1', 'true', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1145, 1264, '3
2 4 3
5 6 4', '7 0 8', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1151, 1265, '5
1 2 3 4 5
2', '1 2 3 5', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1185, 1279, '19
{"89 62 70 58 47 47 46 76 100 70","8 1 5 4 3 2 1 1 0 0"}', '{"100","0"}', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1140, 1286, '2
1 2', 'false', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1142, 1286, '5
1 2 3 2 1', 'true', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1143, 1286, '5
1 2 3 4 5', 'false', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1144, 1286, '2
1 1', 'true', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1157, 1319, '5
1 2 3 4 5', '1 5 2 4 3', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1159, 1319, '2
1 2', '1 2', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1160, 1319, '3
1 2 3', '1 3 2', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1161, 1319, '6
1 2 3 4 5 6', '1 6 2 5 3 4', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1173, 1374, '3
1 -1 -1', '1 -1 -1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1194, 1257, '{"6 9
-1 0 3 5 9 12","4"}', '{"6 2
-1 0 3 5 9 12","-1"}', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1195, 1257, '{"1 5
5","0"}', '{"10 100
1 2 3 4 5 6 7 8 9 10","-1"}', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1197, 1258, '{"4 2
1 3 5 6","1"}', '{"4 7
1 3 5 6","4"}', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1198, 1258, '{"1 1
2","0"}', '{"3 0
1 2 3","0"}', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1203, 1259, '{"7 3
4 5 6 7 0 1 2","-1"}', '{"1 5
5","0"}', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1204, 1259, '{"3 1
3 1 2","1"}', '{"5 4
4 5 6 7 0","0"}', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1205, 1270, '3', '3', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1206, 1270, '{"2","2"}', '{"1","1"}', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1207, 1270, '{"5","8"}', '{"10","89"}', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1211, 1274, '3 7', '28', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1212, 1274, '{"3 2","3"}', '{"1 1","1"}', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1213, 1274, '{"2 2","2"}', '{"5 5","70"}', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1215, 1272, '{"3
2","-1"}', '{"0
1","0"}', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1216, 1272, '{"1
1","1"}', '{"5
1 2 5","1"}', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1220, 1342, '{"applepenapple
apple pen","true"}', '{"catsandog
cats dog sand and cat","false"}', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1221, 1342, '{"a
a","true"}', '{"cars
car ca rs","true"}', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1222, 1423, '{"1 2
1 2 3","2"}', '{"10 9 8 7
5 6 7 8","2"}', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1223, 1423, '{"1 1 1
1 1 1","3"}', '{"5 2
1 1","0"}', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1224, 1425, '{"1 2 3 4 5","4"}', '{"7 6 4 3 1","0"}', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1225, 1425, '{"2 1 2 0 1","2"}', '{"1 2 1 2 1 2","3"}', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1226, 1281, '{"3 2 1 0 4","false"}', '{"0","true"}', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1227, 1281, '{"2 0 0","false"}', '{"2 5 0 0","true"}', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1230, 1266, '{"1 2 3 4 5","3"}', '{"","0"}', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1231, 1266, '{"1","1"}', '{"1 null 2","2"}', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1232, 1267, '4 2 7 1 3 6 9', '4 7 2 9 6 3 1', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1233, 1267, '{"2 1 3","2 3 1"}', '{"",""}', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1234, 1267, '{"1","1"}', '{"1 2","1 null 2"}', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1235, 1269, '2 1 3', 'true', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1236, 1269, '{"5 1 4 null null 3 6","false"}', '{"1","true"}', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1237, 1269, '{"0","true"}', '{"5 4 6 null null 3 7","false"}', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1238, 1401, '{"1 2","1"}', '{"1","0"}', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1239, 1401, '{"1 2 3 4 5 null null 6","4"}', '{"1 null 2","1"}', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1240, 1276, '{"4 5
11000
11000
00100
00011","3"}', '{"1 1
1","1"}', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1241, 1276, '{"2 2
10
01","2"}', '{"3 3
111
010
111","1"}', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1242, 1325, '{"",""}', '{"1
","1
"}', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1243, 1325, '{"1 2
2
","1 2
2
"}', '{"1 2 3
2 3
3
","1 2 3
2 3
3
"}', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1244, 1277, '{"2
1 0
0 1","false"}', '{"1
","true"}', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1245, 1277, '{"3
1 0
2 1","true"}', '{"4
1 0
2 0
3 1
3 2","true"}', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1246, 1275, '1', '1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1247, 1275, '0', '0', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1248, 1275, '5', '8', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1249, 1275, '10', '89', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1250, 1275, '3', '3', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1251, 1275, '20', '10946', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1252, 1268, '1', '1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1253, 1268, '', '', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1254, 1268, '1 2 3', '1 2 3', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1255, 1268, '1 2 3 4 5', '1 2 3 4 5', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1256, 1268, '1 null 2 null 3', '1 null 2 null 3', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1257, 1268, '5 3 7 2 4 6 8', '5 3 7 2 4 6 8', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1258, 1297, '1
5', '5', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1259, 1297, '0', '0', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1260, 1297, '3
1 2 3', '6', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1261, 1297, '5
5 5 5 5 5', '25', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1262, 1297, '2
10 20', '30', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1263, 1297, '4
1 3 5 7', '16', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1270, 1298, '1
5', '5', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1271, 1298, '0', '0', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1272, 1298, '5
1 2 3 4 5', '15', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1273, 1298, '2
-1 1', '0', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1274, 1298, '10
1 1 1 1 1 1 1 1 1 1', '10', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1275, 1298, '3
100 200 300', '600', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1300, 1280, 'push 1
pop', '1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1301, 1280, 'push 1
push 2
pop', '2', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1302, 1280, 'empty', 'true', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1199, 1260, '4
1 2 3 1', '2', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1208, 1271, '4
1 2 3 1', '4', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1217, 1273, '8
10 9 2 5 3 7 101 18', '4', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1196, 1258, '2
4 5
1 3 5 6', '2', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1202, 1259, '2
7 0
4 5 6 7 0 1 2', '4', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1214, 1272, '3
1 2 5
11', '3', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1200, 1260, '7
{"1 2 1 3 5 6 4","5"}', '{"1","0"}', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1201, 1260, '2
{"1 2","1"}', '{"3 2 1","0"}', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1209, 1271, '5
{"2 7 9 3 1","12"}', '{"1","1"}', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1210, 1271, '4
{"2 1 1 2","4"}', '{"5 3 4 11 2","16"}', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1218, 1273, '6
{"0 1 0 3 2 3","4"}', '{"7 7 7 7","1"}', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1219, 1273, '3
{"1 2 3","3"}', '{"1","1"}', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1228, 1312, '7
{"2 2 1 1 1 2 2","2"}', '{"1","1"}', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1229, 1312, '3
{"6 5 5","5"}', '{"1 1 1 2 2","1"}', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1303, 1280, 'push 5
peek', '5', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1304, 1280, 'push 1
push 2
push 3', 'ok', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1305, 1280, 'push 10
pop
pop', '10
error', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1318, 1300, '1', '1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1319, 1300, '2', '2', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1320, 1300, '3', '9', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1321, 1300, '0', '0', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1322, 1300, '4', '24', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1323, 1300, '5', '120', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1330, 1337, '1
5', '5', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1331, 1337, '0', '0', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1332, 1337, '3
1 2 3', '6', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1333, 1337, '5
5 5 5 5 5', '25', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1334, 1337, '2
10 20', '30', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1335, 1337, '4
1 3 5 7', '16', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1336, 1282, '1', '1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1337, 1282, '2', '2', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1338, 1282, '3', '9', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1339, 1282, '0', '0', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1340, 1282, '4', '24', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1341, 1282, '5', '120', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1342, 1305, '1
5', '5', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1343, 1305, '3
3 2 1', '3', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1344, 1305, '5
1 2 3 4 5', '5', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1345, 1305, '4
10 20 30 40', '40', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1346, 1305, '2
5 5', '5', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1347, 1305, '6
3 3 3 3 3 3', '3', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1348, 1294, '1', '1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1349, 1294, '', '', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1350, 1294, '1 2 3', '1 2 3', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1351, 1294, '1 2 3 4 5', '1 2 3 4 5', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1352, 1294, '1 null 2 null 3', '1 null 2 null 3', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1353, 1294, '5 3 7 2 4 6 8', '5 3 7 2 4 6 8', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1354, 1293, 'push 1
pop', '1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1355, 1293, 'push 1
push 2
pop', '2', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1356, 1293, 'empty', 'true', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1357, 1293, 'push 5
peek', '5', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1358, 1293, 'push 1
push 2
push 3', 'ok', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1359, 1293, 'push 10
pop
pop', '10
error', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1360, 1303, '1
5', '5', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1361, 1303, '3
3 2 1', '3', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1362, 1303, '5
1 2 3 4 5', '5', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1363, 1303, '4
10 20 30 40', '40', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1364, 1303, '2
5 5', '5', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1365, 1303, '6
3 3 3 3 3 3', '3', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1366, 1302, '1
5', '5', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1367, 1302, '0', '0', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1368, 1302, '5
1 2 3 4 5', '15', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1369, 1302, '2
-1 1', '0', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1370, 1302, '10
1 1 1 1 1 1 1 1 1 1', '10', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1371, 1302, '3
100 200 300', '600', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1372, 1283, '1', '1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1373, 1283, '2', '2', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1374, 1283, '3', '9', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1375, 1283, '0', '0', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1376, 1283, '4', '24', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1377, 1283, '5', '120', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1378, 1292, 'push 1
pop', '1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1379, 1292, 'push 1
push 2
pop', '2', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1380, 1292, 'empty', 'true', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1381, 1292, 'push 5
peek', '5', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1382, 1292, 'push 1
push 2
push 3', 'ok', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1383, 1292, 'push 10
pop
pop', '10
error', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1390, 1299, 'a', 'a', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1391, 1299, '', '', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1392, 1299, 'hello', 'hello', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1393, 1299, 'aaa', 'aaa', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1394, 1299, 'abcdefghij', 'abcdefghij', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1395, 1299, 'A B C', 'A B C', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1396, 1339, '1', '1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1397, 1339, '', '', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1398, 1339, '1 2 3', '1 2 3', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1399, 1339, '1 2 3 4 5', '1 2 3 4 5', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1400, 1339, '1 null 2 null 3', '1 null 2 null 3', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1401, 1323, '1', '1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1402, 1323, '0', '0', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1403, 1323, '5', '8', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1404, 1323, '10', '89', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1405, 1323, '3', '3', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1406, 1322, '1', '1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1407, 1322, '0', '0', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1408, 1322, '5', '8', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1409, 1322, '10', '89', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1410, 1322, '3', '3', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1411, 1290, 'push 1
pop', '1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1412, 1290, 'push 1
push 2
pop', '2', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1413, 1290, 'empty', 'true', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1414, 1290, 'push 5
peek', '5', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1415, 1290, 'push 1
push 2
push 3', 'ok', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1416, 1304, '1
5', '5', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1417, 1304, '3
3 2 1', '3', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1418, 1304, '5
1 2 3 4 5', '5', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1419, 1304, '4
10 20 30 40', '40', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1420, 1304, '2
5 5', '5', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1421, 1301, '1
5', '5', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1422, 1301, '0', '0', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1423, 1301, '5
1 2 3 4 5', '15', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1424, 1301, '2
-1 1', '0', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1425, 1301, '10
1 1 1 1 1 1 1 1 1 1', '10', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1426, 1343, '1', '1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1427, 1343, '2', '2', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1428, 1343, '3', '9', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1429, 1343, '0', '0', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1430, 1343, '4', '24', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1431, 1344, 'push 1
pop', '1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1432, 1344, 'push 1
push 2
pop', '2', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1433, 1344, 'empty', 'true', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1434, 1344, 'push 5
peek', '5', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1435, 1344, 'push 1
push 2
push 3', 'ok', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1436, 1314, 'a', 'a', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1438, 1314, 'hello', 'hello', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1439, 1314, 'aaa', 'aaa', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1440, 1314, 'abcdefghij', 'abcdefghij', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1446, 1341, '1', '1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1447, 1341, '', '', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1450, 1341, '1 null 2 null 3', '1 null 2 null 3', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1451, 1334, '1', '1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1452, 1334, '2', '2', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1453, 1334, '3', '9', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1454, 1334, '0', '0', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1455, 1334, '4', '24', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1456, 1317, 'a', 'a', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1458, 1317, 'hello', 'hello', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1459, 1317, 'aaa', 'aaa', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1460, 1317, 'abcdefghij', 'abcdefghij', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1461, 1338, '1', '1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1462, 1338, '', '', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1463, 1338, '1 2 3', '1 2 3', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1464, 1338, '1 2 3 4 5', '1 2 3 4 5', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1465, 1338, '1 null 2 null 3', '1 null 2 null 3', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1466, 1324, '1', '1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1467, 1324, '0', '0', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1468, 1324, '5', '8', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1469, 1324, '10', '89', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1470, 1324, '3', '3', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1471, 1316, 'a', 'a', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1473, 1316, 'hello', 'hello', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1474, 1316, 'aaa', 'aaa', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1475, 1316, 'abcdefghij', 'abcdefghij', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1476, 1326, '1', '1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1477, 1326, '', '', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1478, 1326, '1 2 3', '1 2 3', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1479, 1326, '1 2 3 4 5', '1 2 3 4 5', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1480, 1326, '1 null 2 null 3', '1 null 2 null 3', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1481, 1321, '1
5', '5', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1482, 1321, '0', '0', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1483, 1321, '5
1 2 3 4 5', '15', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1484, 1321, '2
-1 1', '0', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1485, 1321, '10
1 1 1 1 1 1 1 1 1 1', '10', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1486, 1313, 'a', 'a', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1488, 1313, 'hello', 'hello', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1489, 1313, 'aaa', 'aaa', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1490, 1313, 'abcdefghij', 'abcdefghij', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1491, 1331, '1 1
1', '0', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1492, 1331, '5 3
1 2 3 4 5', '2', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1493, 1331, '5 6
1 2 3 4 5', '-1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1494, 1331, '10 5
1 2 3 4 5 6 7 8 9 10', '4', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1495, 1331, '3 1
1 3 5', '0', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1496, 1340, '1', '1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1497, 1340, '', '', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1498, 1340, '1 2 3', '1 2 3', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1499, 1340, '1 2 3 4 5', '1 2 3 4 5', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1500, 1340, '1 null 2 null 3', '1 null 2 null 3', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1501, 1315, 'a', 'a', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1502, 1315, '', '', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1503, 1315, 'hello', 'hello', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1504, 1315, 'aaa', 'aaa', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1505, 1315, 'abcdefghij', 'abcdefghij', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1506, 1295, 'a', 'a', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1507, 1295, '', '', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1508, 1295, 'hello', 'hello', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1509, 1295, 'aaa', 'aaa', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1510, 1295, 'abcdefghij', 'abcdefghij', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1511, 1257, '1 1
1', '0', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1512, 1257, '5 3
1 2 3 4 5', '2', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1513, 1257, '5 6
1 2 3 4 5', '-1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1514, 1270, '1', '1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1515, 1270, '0', '0', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1516, 1270, '5', '8', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1517, 1325, '1', '1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1518, 1325, '', '', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1519, 1325, '1 2 3', '1 2 3', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1520, 1272, '1', '1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1521, 1272, '0', '0', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1522, 1272, '5', '8', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1523, 1277, '1', '1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1524, 1277, '', '', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1525, 1277, '1 2 3', '1 2 3', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1526, 1279, 'push 1
pop', '1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1527, 1279, 'push 1
push 2
pop', '2', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1528, 1279, 'empty', 'true', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1529, 1291, 'a', 'a', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1530, 1291, '', '', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1531, 1291, 'hello', 'hello', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1532, 1260, '1 1
1', '0', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1533, 1260, '5 3
1 2 3 4 5', '2', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1534, 1260, '5 6
1 2 3 4 5', '-1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1535, 1296, '1
5', '5', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1536, 1296, '0', '0', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1537, 1296, '3
1 2 3', '6', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1538, 1271, '1', '1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1539, 1271, '0', '0', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1540, 1271, '5', '8', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1541, 1267, '1', '1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1542, 1267, '', '', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1543, 1267, '1 2 3', '1 2 3', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1544, 1273, '1', '1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1545, 1273, '0', '0', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1546, 1273, '5', '8', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1547, 1266, '1', '1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1548, 1266, '', '', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1549, 1266, '1 2 3', '1 2 3', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1550, 1289, 'push 1
pop', '1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1551, 1289, 'push 1
push 2
pop', '2', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1552, 1289, 'empty', 'true', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1553, 1276, '1', '1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1554, 1276, '', '', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1555, 1276, '1 2 3', '1 2 3', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1556, 1259, '1
5', '5', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1448, 1341, '3
1 2 3', '1 2 3', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1449, 1341, '5
1 2 3 4 5', '1 2 3 4 5', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1557, 1259, '0', '0', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1558, 1259, '5
1 2 3 4 5', '15', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1559, 1258, '1 1
1', '0', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1560, 1258, '5 3
1 2 3 4 5', '2', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1561, 1258, '5 6
1 2 3 4 5', '-1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1562, 1274, '1', '1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1563, 1274, '0', '0', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1564, 1274, '5', '8', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1565, 1278, 'push 1
pop', '1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1566, 1278, 'push 1
push 2
pop', '2', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1567, 1278, 'empty', 'true', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1568, 1269, '1', '1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1569, 1269, '', '', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1570, 1269, '1 2 3', '1 2 3', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1571, 1342, 'a', 'a', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1572, 1342, '', '', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1573, 1342, 'hello', 'hello', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1574, 1347, '1
5', '5', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1575, 1347, '0', '0', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1576, 1436, '1
5', '5', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1577, 1436, '0', '0', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1578, 1449, '1', '1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1579, 1449, '', '', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1580, 1412, '1', '1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1581, 1412, '', '', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1582, 1378, 'push 1
pop', '1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1583, 1378, 'push 1
push 2
pop', '2', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1584, 1485, 'a', 'a', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1585, 1485, '', '', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1586, 1402, '1', '1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1587, 1402, '', '', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1588, 1375, 'push 1
pop', '1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1589, 1375, 'push 1
push 2
pop', '2', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1590, 1471, 'push 1
pop', '1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1591, 1471, 'push 1
push 2
pop', '2', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1592, 1491, '1', '1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1593, 1491, '0', '0', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1594, 1442, '1', '1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1595, 1442, '', '', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1596, 1405, '1', '1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1597, 1405, '', '', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1598, 1409, '1
5', '5', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1599, 1409, '0', '0', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1600, 1459, '1', '1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1601, 1459, '2', '2', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1602, 1475, '1', '1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1603, 1475, '0', '0', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1604, 1503, '1
5', '5', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1605, 1503, '0', '0', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1606, 1397, '1 1
1', '0', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1607, 1397, '5 3
1 2 3 4 5', '2', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1608, 1490, '1', '1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1609, 1490, '', '', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1610, 1458, '1
5', '5', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1611, 1458, '0', '0', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1612, 1431, '1', '1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1613, 1431, '2', '2', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1614, 1390, '1
5', '5', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1615, 1390, '0', '0', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1616, 1407, '1', '1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1617, 1407, '', '', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1618, 1364, '1
5', '5', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1619, 1364, '3
3 2 1', '3', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1620, 1435, '1
5', '5', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1621, 1435, '0', '0', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1622, 1501, '1', '1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1623, 1501, '', '', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1626, 1494, 'push 1
pop', '1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1627, 1494, 'push 1
push 2
pop', '2', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1628, 1398, '1
5', '5', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1629, 1398, '0', '0', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1630, 1482, '1', '1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1631, 1482, '', '', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1632, 1367, '1
5', '5', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1633, 1367, '3
3 2 1', '3', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1634, 1487, '1
5', '5', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1635, 1487, '0', '0', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1636, 1476, '1', '1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1637, 1476, '', '', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1638, 1498, 'push 1
pop', '1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1639, 1498, 'push 1
push 2
pop', '2', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1640, 1473, '1', '1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1641, 1473, '0', '0', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1642, 1420, '1', '1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1643, 1420, '0', '0', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1644, 1389, 'push 1
pop', '1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1645, 1389, 'push 1
push 2
pop', '2', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1646, 1465, '1
5', '5', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1647, 1465, '0', '0', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1648, 1452, '1', '1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1649, 1452, '0', '0', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1650, 1362, '1
5', '5', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1651, 1362, '3
3 2 1', '3', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1652, 1410, '1', '1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1653, 1410, '', '', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1654, 1413, '1', '1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1655, 1413, '', '', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1656, 1468, '1
5', '5', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1657, 1468, '0', '0', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1658, 1354, '1
5', '5', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1659, 1354, '3
3 2 1', '3', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1660, 1395, '1
5', '5', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1661, 1395, '0', '0', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1662, 1345, '1
5', '5', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1663, 1345, '0', '0', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1664, 1411, '1', '1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1665, 1411, '', '', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1666, 1392, '1 1
1', '0', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1667, 1392, '5 3
1 2 3 4 5', '2', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1668, 1483, '1
5', '5', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1669, 1483, '0', '0', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1670, 1350, 'a', 'a', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1671, 1350, '', '', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1672, 1384, 'push 1
pop', '1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1673, 1384, 'push 1
push 2
pop', '2', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1674, 1440, '1', '1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1675, 1440, '', '', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1676, 1360, '1
5', '5', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1677, 1360, '3
3 2 1', '3', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1678, 1474, 'a', 'a', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1679, 1474, '', '', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1680, 1488, '1', '1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1681, 1488, '', '', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1682, 1464, '1
5', '5', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1683, 1464, '0', '0', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1684, 1358, '1
5', '5', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1685, 1358, '3
3 2 1', '3', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1686, 1359, 'a', 'a', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1687, 1359, '', '', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1688, 1429, '1
5', '5', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1689, 1429, '0', '0', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1690, 1386, 'push 1
pop', '1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1691, 1386, 'push 1
push 2
pop', '2', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1692, 1353, '1
5', '5', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1693, 1353, '3
3 2 1', '3', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1694, 1396, '1 1
1', '0', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1695, 1396, '5 3
1 2 3 4 5', '2', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1696, 1351, '1
5', '5', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1697, 1351, '0', '0', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1698, 1356, '1
5', '5', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1699, 1356, '3
3 2 1', '3', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1700, 1439, '1', '1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1701, 1439, '', '', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1702, 1467, '1 1
1', '0', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1703, 1467, '5 3
1 2 3 4 5', '2', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1704, 1352, '1
5', '5', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1705, 1352, '3
3 2 1', '3', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1706, 1424, '1
5', '5', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1707, 1424, '0', '0', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1708, 1430, '1', '1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1709, 1430, '2', '2', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1710, 1466, '1', '1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1711, 1466, '2', '2', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1712, 1366, '1
5', '5', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1713, 1366, '3
3 2 1', '3', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1714, 1455, '1', '1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1715, 1455, '0', '0', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1716, 1404, '1', '1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1717, 1404, '', '', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1718, 1399, '1', '1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1719, 1399, '', '', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1720, 1480, '1
5', '5', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1721, 1480, '3
3 2 1', '3', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1722, 1380, 'push 1
pop', '1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1723, 1380, 'push 1
push 2
pop', '2', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1724, 1469, '1 1
1', '0', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1725, 1469, '5 3
1 2 3 4 5', '2', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1726, 1391, 'push 1
pop', '1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1727, 1391, 'push 1
push 2
pop', '2', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1728, 1419, '1', '1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1729, 1419, '0', '0', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1732, 1504, '1
5', '5', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1733, 1504, '0', '0', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1734, 1355, '1
5', '5', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1735, 1355, '3
3 2 1', '3', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1736, 1418, '1', '1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1737, 1418, '0', '0', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1738, 1456, '1
5', '5', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1739, 1456, '0', '0', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1740, 1434, '1
5', '5', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1741, 1434, '0', '0', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1742, 1457, '1
5', '5', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1743, 1457, '0', '0', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1744, 1448, '1', '1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1745, 1448, '', '', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1746, 1438, '1', '1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1747, 1438, '', '', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1748, 1445, '1', '1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1749, 1445, '', '', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1750, 1417, '1', '1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1751, 1417, '', '', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1752, 1426, '1
5', '5', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1753, 1426, '0', '0', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1754, 1484, 'a', 'a', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1755, 1484, '', '', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1756, 1444, '1', '1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1757, 1444, '', '', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1758, 1462, '1', '1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1759, 1462, '2', '2', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1760, 1416, '1', '1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1761, 1416, '', '', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1762, 1376, 'push 1
pop', '1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1763, 1376, 'push 1
push 2
pop', '2', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1764, 1428, '1
5', '5', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1765, 1428, '0', '0', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1766, 1414, '1', '1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1767, 1414, '', '', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1768, 1383, 'push 1
pop', '1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1769, 1383, 'push 1
push 2
pop', '2', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1770, 1415, '1', '1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1771, 1415, '', '', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1772, 1368, '1
5', '5', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1773, 1368, '3
3 2 1', '3', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1774, 1460, '1', '1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1775, 1460, '2', '2', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1776, 1421, '1', '1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1777, 1421, '0', '0', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1778, 1497, '1', '1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1779, 1497, '', '', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1780, 1453, '1', '1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1781, 1453, '0', '0', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1782, 1406, '1
5', '5', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1783, 1406, '0', '0', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1784, 1393, '1 1
1', '0', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1785, 1393, '5 3
1 2 3 4 5', '2', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1786, 1432, '1', '1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1787, 1432, '2', '2', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1788, 1441, '1', '1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1789, 1441, '', '', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1790, 1427, '1
5', '5', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1791, 1427, '0', '0', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1792, 1477, '1', '1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1793, 1477, '', '', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1794, 1422, '1', '1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1795, 1422, '0', '0', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1796, 1346, '1
5', '5', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1797, 1346, '0', '0', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1798, 1472, 'push 1
pop', '1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1799, 1472, 'push 1
push 2
pop', '2', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1800, 1379, 'push 1
pop', '1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1801, 1379, 'push 1
push 2
pop', '2', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1802, 1369, '1', '1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1803, 1369, '', '', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1804, 1370, '1', '1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1805, 1370, '', '', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1806, 1377, 'push 1
pop', '1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1807, 1377, 'push 1
push 2
pop', '2', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1808, 1357, 'a', 'a', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1809, 1357, '', '', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1810, 1492, '1', '1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1811, 1492, '2', '2', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1812, 1388, 'push 1
pop', '1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1813, 1388, 'push 1
push 2
pop', '2', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1814, 1479, '1', '1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1815, 1479, '', '', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1816, 1373, '1', '1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1817, 1373, '', '', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1818, 1349, 'a', 'a', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1819, 1349, '', '', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1820, 1372, '1', '1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1821, 1372, '', '', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1822, 1437, '1', '1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1823, 1437, '', '', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1824, 1502, 'a', 'a', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1825, 1502, '', '', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1826, 1493, '1 1
1', '0', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1827, 1493, '5 3
1 2 3 4 5', '2', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1828, 1408, '1', '1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1829, 1408, '', '', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1830, 1447, '1', '1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1831, 1447, '', '', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1832, 1451, '1', '1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1833, 1451, '', '', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1834, 1486, '1
5', '5', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1835, 1486, '0', '0', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1836, 1387, '1
5', '5', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1837, 1387, '0', '0', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1838, 1481, 'push 1
pop', '1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1839, 1481, 'push 1
push 2
pop', '2', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1840, 1500, '1', '1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1841, 1500, '', '', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1844, 1365, '1
5', '5', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1845, 1365, '3
3 2 1', '3', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1846, 1463, '1', '1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1847, 1463, '2', '2', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1848, 1461, '1', '1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1849, 1461, '2', '2', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1850, 1446, '1', '1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1851, 1446, '', '', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1852, 1371, '1', '1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1853, 1371, '', '', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1854, 1478, '1', '1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1855, 1478, '', '', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1856, 1400, '1', '1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1857, 1400, '', '', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1858, 1496, 'a', 'a', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1859, 1496, '', '', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1860, 1385, 'push 1
pop', '1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1861, 1385, 'push 1
push 2
pop', '2', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1862, 1363, 'a', 'a', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1863, 1363, '', '', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1864, 1470, '1
5', '5', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1865, 1470, '3
3 2 1', '3', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1866, 1454, '1', '1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1867, 1454, '0', '0', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1868, 1403, '1', '1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1869, 1403, '', '', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1870, 1443, '1', '1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1871, 1443, '', '', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1872, 1499, '1
5', '5', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1873, 1499, '0', '0', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1874, 1495, 'a', 'a', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1875, 1495, '', '', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1876, 1450, 'a', 'a', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1877, 1450, '', '', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1878, 1361, 'a', 'a', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1879, 1361, '', '', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1880, 1433, 'a', 'a', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1881, 1433, '', '', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1882, 1281, '1
5', '5', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1884, 1241, '2
3 3
6', '0 1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1885, 1241, '3
3 2 4
6', '1 2', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1891, 1283, '3
1 2 3', '[] [1] [2] [1 2] [3] [1 3] [2 3] [1 2 3]', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1895, 1303, 'tree', 'eert', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1897, 1300, '4', '.Q..
...Q
Q...
..Q.

..Q.
Q...
...Q
.Q..', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1898, 1275, '3
60 100 120
10 20 30
50', '220', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1899, 1294, '3 3
2 1 1
1 1 0
0 1 1', '4', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1901, 1297, '3
1 0 2', '5', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1903, 1337, 'ababcbacadefegdehijhklij', '9 7 8', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1904, 1299, '3 4
A B C E
S F C S
A D E E
ABCCED', 'true', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1905, 1302, '5
7 2 5 10 8
2', '18', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1906, 1293, '8
1 3 -1 -3 5 3 6 7
3', '3 3 5 5 6 7', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1908, 1280, '6
2 1 5 6 2 3', '10', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1909, 1292, '6
A A A B B B
2', '8', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1910, 1282, '3
1 2 3', '1 2 3
1 3 2
2 1 3
2 3 1
3 1 2
3 2 1', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1912, 1298, '4
2 3 6 7
7', '2 2 3
7', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1914, 1268, '3 9 20 null null 15 7', '3
9 20
15 7', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1915, 1305, 'a
b', 'false', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1916, 1348, '2
1 2
3 4', '2.50000', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1917, 1348, '2
0 0
0 0', '0.00000', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1918, 1348, '1

1', '1.00000', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1919, 1348, '2
2

', '2.00000', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1920, 1348, '4
1 3 5 7
2 4 6 8', '4.50000', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1921, 1394, '4', '2', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1922, 1394, '0', '0', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1923, 1394, '1', '1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1924, 1394, '2147395599', '46339', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1925, 1394, '2147483647', '46340', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1926, 1489, '1 2 3 4 5 6 7', '7', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (416, 1363, '7 2
i
love
leetcode
i
love
coding
leetcode', 'i
leetcode', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1183, 1279, '8
73 74 75 71 69 72 76 73', '1 1 4 2 1 1 0 0', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1927, 1340, '1 2 3 null null 4 5', '1 2 3 null null 4 5', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1928, 1407, '5
3 9 20 15 7
9 3 15 20 7', '3 9 20 null null 15 7', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1929, 1408, '1 2 3 null null 4 5', '1 2 3 null null 4 5', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1930, 1440, '1 2 5 3 4 null 6', '1 null 2 null 3 null 4 null 5 null 6', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1931, 1501, '5
-10 -3 0 5 9', '0 -3 9 -10 null 5', NULL, true) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (1184, 1279, '7
{"30 40 50 60","1 1 1 0"}', '{"30 60 90","1 1 0"}', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (825, 1465, '4
1 2 3 4', '', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_hidden, is_sample) VALUES (886, 1480, '2
0 0', '1', NULL, false) ON CONFLICT (test_case_id) DO NOTHING;
COMMIT;
