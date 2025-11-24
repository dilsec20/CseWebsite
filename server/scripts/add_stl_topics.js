const pool = require('../db');

async function addSTLTopics() {
    const client = await pool.connect();
    try {
        console.log('🚀 Adding STL Topics to Module 1...\n');

        // Get Module 1 ID
        const moduleRes = await client.query(
            "SELECT module_id FROM dsa_modules WHERE title ILIKE '%Introduction%C++%'"
        );
        const moduleId = moduleRes.rows[0].module_id;

        // Get current max order_index for Module 1
        const orderRes = await client.query(
            "SELECT MAX(order_index) as max_order FROM dsa_topics WHERE module_id = $1",
            [moduleId]
        );
        let nextOrder = (orderRes.rows[0].max_order || 0) + 1;

        // Topic 1: Functions in C++
        await client.query(
            "INSERT INTO dsa_topics (module_id, title, content, problem_id, order_index) VALUES ($1, $2, $3, $4, $5)",
            [moduleId, 'Functions in C++', `
# Functions in C++

A function is a reusable block of code that performs a specific task.

## Why Functions?
- **Code Reusability**: Write once, use many times
- **Modularity**: Break complex problems into smaller pieces
- **Readability**: Makes code easier to understand

## Function Syntax
\`\`\`cpp
return_type function_name(parameters) {
    // Function body
    return value;
}
\`\`\`

## Example: Simple Function
\`\`\`cpp
// Function to add two numbers
int add(int a, int b) {
    return a + b;
}

int main() {
    int result = add(5, 3);
    cout << result;  // Output: 8
}
\`\`\`

## Function with No Return (void)
\`\`\`cpp
void greet(string name) {
    cout << "Hello, " << name << "!" << endl;
}

int main() {
    greet("Alice");  // Output: Hello, Alice!
}
\`\`\`

## Pass by Value vs Pass by Reference
\`\`\`cpp
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
\`\`\`

## Function Overloading
C++ allows multiple functions with the same name but different parameters.
\`\`\`cpp
int add(int a, int b) {
    return a + b;
}

double add(double a, double b) {
    return a + b;
}

int add(int a, int b, int c) {
    return a + b + c;
}
\`\`\`

## Default Parameters
\`\`\`cpp
void printMessage(string msg = "Hello") {
    cout << msg << endl;
}

int main() {
    printMessage();           // Output: Hello
    printMessage("Hi there"); // Output: Hi there
}
\`\`\`

## Recursive Functions
A function that calls itself.
\`\`\`cpp
int factorial(int n) {
    if (n <= 1) return 1;        // Base case
    return n * factorial(n - 1); // Recursive case
}
\`\`\`

## Tips
- Keep functions small and focused (single responsibility)
- Use meaningful function names
- Pass large objects by reference to avoid copying
            `, null, nextOrder++]
        );

        // Topic 2: STL Containers
        await client.query(
            "INSERT INTO dsa_topics (module_id, title, content, problem_id, order_index) VALUES ($1, $2, $3, $4, $5)",
            [moduleId, 'STL Containers', `
# STL Containers

STL (Standard Template Library) provides ready-to-use containers to store data.

## 1. Vector (Dynamic Array)
\`\`\`cpp
#include <vector>

vector<int> v = {1, 2, 3};
v.push_back(4);    // Add to end: {1,2,3,4}
v.pop_back();      // Remove last: {1,2,3}
v.size();          // Length: 3
v[0];              // Access: 1
v.clear();         // Empty vector
\`\`\`

## 2. Set (Unique, Sorted Elements)
\`\`\`cpp
#include <set>

set<int> s;
s.insert(5);       // {5}
s.insert(2);       // {2, 5} (sorted)
s.insert(2);       // {2, 5} (no duplicates)
s.erase(2);        // {5}
s.count(5);        // 1 (exists)
s.size();          // 1
\`\`\`

## 3. Map (Key-Value Pairs)
\`\`\`cpp
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
\`\`\`

## 4. Unordered_map (Hash Map - Faster)
\`\`\`cpp
#include <unordered_map>

unordered_map<int, string> m;
m[1] = "One";
m[2] = "Two";

// O(1) average lookup vs O(log n) in map
\`\`\`

## 5. Stack (LIFO)
\`\`\`cpp
#include <stack>

stack<int> st;
st.push(10);
st.push(20);
st.top();      // 20 (peek)
st.pop();      // Remove top
st.empty();    // Is empty?
\`\`\`

## 6. Queue (FIFO)
\`\`\`cpp
#include <queue>

queue<int> q;
q.push(10);
q.push(20);
q.front();     // 10
q.back();      // 20
q.pop();       // Remove front
\`\`\`

## 7. Priority Queue (Heap)
\`\`\`cpp
#include <queue>

priority_queue<int> pq;  // Max heap by default
pq.push(10);
pq.push(30);
pq.push(20);
pq.top();      // 30 (max)
pq.pop();      // Remove max
\`\`\`

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
- **Unordered_map**: Fast lookups, don't care about order
- **Stack**: LIFO operations (undo, parentheses matching)
- **Queue**: FIFO operations (BFS, task scheduling)
- **Priority Queue**: Always need min/max element
            `, null, nextOrder++]
        );

        // Topic 3: STL Algorithms
        await client.query(
            "INSERT INTO dsa_topics (module_id, title, content, problem_id, order_index) VALUES ($1, $2, $3, $4, $5)",
            [moduleId, 'STL Algorithms', `
# STL Algorithms

STL provides powerful algorithms that work on containers.

## 1. Sorting
\`\`\`cpp
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
\`\`\`

## 2. Binary Search (on sorted array)
\`\`\`cpp
vector<int> v = {1, 2, 5, 8, 9};

// Check if element exists
bool found = binary_search(v.begin(), v.end(), 5);  // true

// Find position (lower_bound)
auto it = lower_bound(v.begin(), v.end(), 5);
int index = it - v.begin();  // 2 (index of 5)

// Upper bound (first element > x)
auto it2 = upper_bound(v.begin(), v.end(), 5);
\`\`\`

## 3. Min/Max Element
\`\`\`cpp
vector<int> v = {5, 2, 8, 1, 9};

auto minIt = min_element(v.begin(), v.end());
cout << *minIt;  // 1

auto maxIt = max_element(v.begin(), v.end());
cout << *maxIt;  // 9

// Get both
auto [minIt, maxIt] = minmax_element(v.begin(), v.end());
\`\`\`

## 4. Reverse
\`\`\`cpp
vector<int> v = {1, 2, 3, 4, 5};
reverse(v.begin(), v.end());
// Result: {5, 4, 3, 2, 1}
\`\`\`

## 5. Count
\`\`\`cpp
vector<int> v = {1, 2, 2, 3, 2, 4};
int cnt = count(v.begin(), v.end(), 2);  // 3
\`\`\`

## 6. Fill
\`\`\`cpp
vector<int> v(5);
fill(v.begin(), v.end(), 10);
// Result: {10, 10, 10, 10, 10}
\`\`\`

## 7. Unique (Remove Duplicates)
**Note**: Array must be sorted first!
\`\`\`cpp
vector<int> v = {1, 1, 2, 2, 3, 3};
sort(v.begin(), v.end());
auto it = unique(v.begin(), v.end());
v.erase(it, v.end());
// Result: {1, 2, 3}
\`\`\`

## 8. Accumulate (Sum)
\`\`\`cpp
#include <numeric>

vector<int> v = {1, 2, 3, 4, 5};
int sum = accumulate(v.begin(), v.end(), 0);  // 15
\`\`\`

## 9. Next Permutation
\`\`\`cpp
vector<int> v = {1, 2, 3};
next_permutation(v.begin(), v.end());
// Result: {1, 3, 2}
\`\`\`

## Tips
- Always include \`<algorithm>\` header
- Use \`begin()\` and \`end()\` for range
- STL algorithms are highly optimized
- Learn these to save time in contests!
            `, null, nextOrder++]
        );

        // Topic 4: Iterators
        await client.query(
            "INSERT INTO dsa_topics (module_id, title, content, problem_id, order_index) VALUES ($1, $2, $3, $4, $5)",
            [moduleId, 'Iterators in C++', `
# Iterators in C++

Iterators are objects that point to elements in containers. Think of them as smart pointers.

## Why Iterators?
- **Uniform Access**: Work with any container (vector, set, map)
- **STL Compatibility**: Required for many STL algorithms
- **Flexibility**: Can traverse, modify, and query containers

## Basic Iterator Usage
\`\`\`cpp
vector<int> v = {1, 2, 3, 4, 5};

// Create iterator
vector<int>::iterator it;

// Or use 'auto' (C++11)
auto it = v.begin();

// Dereference to get value
cout << *it;  // 1

// Move to next element
it++;
cout << *it;  // 2
\`\`\`

## Iterating Through Container
\`\`\`cpp
vector<int> v = {1, 2, 3, 4, 5};

// Method 1: Iterator loop
for (auto it = v.begin(); it != v.end(); it++) {
    cout << *it << " ";
}

// Method 2: Range-based for (C++11) - Preferred
for (int x : v) {
    cout << x << " ";
}
\`\`\`

## Iterator Types
### 1. begin() and end()
\`\`\`cpp
v.begin()  // Points to first element
v.end()    // Points PAST last element (not valid to dereference!)
\`\`\`

### 2. rbegin() and rend() (Reverse)
\`\`\`cpp
for (auto it = v.rbegin(); it != v.rend(); it++) {
    cout << *it << " ";  // Prints in reverse
}
\`\`\`

## Iterator Operations
\`\`\`cpp
vector<int> v = {10, 20, 30, 40, 50};
auto it = v.begin();

*it;        // 10 (value)
it++;       // Move to next
it--;       // Move to previous
it + 2;     // Jump forward 2 positions
it - 2;     // Jump backward 2 positions

// Distance between iterators
int dist = distance(v.begin(), v.end());  // 5
\`\`\`

## Iterators with Different Containers
### Vector
\`\`\`cpp
vector<int> v = {1, 2, 3};
for (auto it = v.begin(); it != v.end(); it++) {
    *it = *it * 2;  // Modify elements
}
\`\`\`

### Set
\`\`\`cpp
set<int> s = {3, 1, 2};
for (auto it = s.begin(); it != s.end(); it++) {
    cout << *it << " ";  // Prints: 1 2 3 (sorted)
}
\`\`\`

### Map
\`\`\`cpp
map<string, int> m = {{"Alice", 25}, {"Bob", 30}};
for (auto it = m.begin(); it != m.end(); it++) {
    cout << it->first << ": " << it->second << endl;
    // Alice: 25
    // Bob: 30
}
\`\`\`

## Advanced: Insert and Erase with Iterators
\`\`\`cpp
vector<int> v = {1, 2, 3, 4, 5};

// Erase element at position 2 (value 3)
v.erase(v.begin() + 2);  // {1, 2, 4, 5}

// Insert 10 at position 1
v.insert(v.begin() + 1, 10);  // {1, 10, 2, 4, 5}
\`\`\`

## Common Patterns
### Find an Element
\`\`\`cpp
#include <algorithm>

vector<int> v = {1, 2, 3, 4, 5};
auto it = find(v.begin(), v.end(), 3);

if (it != v.end()) {
    cout << "Found at index: " << (it - v.begin());
} else {
    cout << "Not found";
}
\`\`\`

### Erase All Occurrences
\`\`\`cpp
v.erase(remove(v.begin(), v.end(), 2), v.end());
// Removes all 2's from vector
\`\`\`

## Tips
- Use \`auto\` to avoid long iterator type names
- Always check \`it != container.end()\` before dereferencing
- Prefer range-based for loops when you don't need iterator operations
- Never use invalidated iterators (after insert/erase operations)
            `, null, nextOrder++]
        );

        console.log('\n✅ Added 4 STL Topics to Module 1!');
        console.log('   - Functions in C++');
        console.log('   - STL Containers');
        console.log('   - STL Algorithms');
        console.log('   - Iterators in C++');

    } catch (err) {
        console.error('Error:', err);
    } finally {
        client.release();
        await pool.end();
    }
}

addSTLTopics();
