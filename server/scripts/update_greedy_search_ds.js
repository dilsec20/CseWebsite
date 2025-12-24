const { Pool } = require('pg');

const pool = new Pool({
    connectionString: 'postgresql://postgres.xlqzqcqacpajpqwneqpa:05Supabase%40%40%3F%3F@aws-1-ap-south-1.pooler.supabase.com:6543/postgres',
    ssl: { rejectUnauthorized: false }
});

const greedyContent = {
    "1. Standard Greedy Algorithms": `# Standard Greedy Algorithms

## 🎯 When to Use
- Make locally optimal choice at each step
- Must have **optimal substructure** and **greedy choice property**
- No need to reconsider previous choices

---

## 🧠 Classic Problems

### Activity Selection
Pick maximum non-overlapping activities.
**Strategy**: Sort by **end time**, greedily pick earliest-ending activities.

\`\`\`cpp
int activitySelection(vector<pair<int,int>>& activities) {
    sort(activities.begin(), activities.end(), 
         [](auto& a, auto& b) { return a.second < b.second; });
    
    int count = 1, lastEnd = activities[0].second;
    for (int i = 1; i < activities.size(); i++) {
        if (activities[i].first >= lastEnd) {
            count++;
            lastEnd = activities[i].second;
        }
    }
    return count;
}
\`\`\`

### Huffman Coding
Build optimal prefix-free encoding.
**Strategy**: Always merge two nodes with smallest frequencies.

### Fractional Knapsack
**Strategy**: Sort by value/weight ratio, take greedily.

---

## ⚠️ When Greedy Fails

- **0/1 Knapsack**: Can't take fractions → use DP
- **Longest Path**: Greedy doesn't work → use DP or BFS/DFS
- **Travelling Salesman**: Greedy gives approximation, not optimal

---

## 📚 Practice Problems

- [Activity Selection (SPOJ BUSYMAN)](https://www.spoj.com/problems/BUSYMAN/)
- [Huffman Coding (GFG)](https://practice.geeksforgeeks.org/problems/huffman-encoding3345/1)
`,

    "2. Greedy on Arrays": `# Greedy on Arrays

## 🎮 Patterns

### Pattern 1: Sort and Process
\`\`\`cpp
// Maximize sum of arr[i] * i
// Sort ascending and multiply by index
sort(arr.begin(), arr.end());
long long sum = 0;
for (int i = 0; i < n; i++) sum += (long long)arr[i] * i;
\`\`\`

### Pattern 2: Two Pointers
\`\`\`cpp
// Pair smallest with largest for balanced teams
sort(arr.begin(), arr.end());
int l = 0, r = n - 1;
while (l < r) {
    process(arr[l], arr[r]);
    l++; r--;
}
\`\`\`

### Pattern 3: Merge Intervals
\`\`\`cpp
vector<pair<int,int>> merge(vector<pair<int,int>>& intervals) {
    sort(intervals.begin(), intervals.end());
    vector<pair<int,int>> result;
    result.push_back(intervals[0]);
    
    for (int i = 1; i < intervals.size(); i++) {
        if (intervals[i].first <= result.back().second)
            result.back().second = max(result.back().second, intervals[i].second);
        else
            result.push_back(intervals[i]);
    }
    return result;
}
\`\`\`

---

## 📚 Practice Problems

- [Dragons (CF 230A)](https://codeforces.com/problemset/problem/230/A)
- [Chat Room (CF 58A)](https://codeforces.com/problemset/problem/58/A)
- [Merge Intervals (LeetCode)](https://leetcode.com/problems/merge-intervals/)
`,

    "3. Priority Queue Greedy": `# Priority Queue Greedy

## 🎯 When to Use
- Need to repeatedly get min/max element
- Dynamic set that changes over time

---

## 💻 Templates

### C++ Priority Queue
\`\`\`cpp
priority_queue<int> maxHeap;                               // Max heap
priority_queue<int, vector<int>, greater<int>> minHeap;    // Min heap

maxHeap.push(5);
int top = maxHeap.top();
maxHeap.pop();
\`\`\`

### Running Median (Two Heaps)
\`\`\`cpp
class MedianFinder {
    priority_queue<int> maxHeap;  // Left half
    priority_queue<int, vector<int>, greater<int>> minHeap;  // Right half
    
public:
    void add(int num) {
        maxHeap.push(num);
        minHeap.push(maxHeap.top());
        maxHeap.pop();
        
        if (maxHeap.size() < minHeap.size()) {
            maxHeap.push(minHeap.top());
            minHeap.pop();
        }
    }
    
    double getMedian() {
        if (maxHeap.size() > minHeap.size()) return maxHeap.top();
        return (maxHeap.top() + minHeap.top()) / 2.0;
    }
};
\`\`\`

---

## 🎮 Patterns

### Merge K Sorted Arrays
Push first element of each array with index. Pop min, push next from same array.

### Dijkstra's Algorithm
Priority queue with {distance, node}. Always process minimum distance first.

---

## 📚 Practice Problems

- [Potions (CF 1526C1)](https://codeforces.com/problemset/problem/1526/C1)
- [Find Median (LeetCode)](https://leetcode.com/problems/find-median-from-data-stream/)
`,

    "4. Exchange Arguments (Sorting)": `# Exchange Arguments

## 🎯 Technique
Prove greedy sorting order by comparing adjacent elements.

**Method**: Assume element i comes before j. Show that swapping makes things worse (or not better).

---

## 🧠 Example: Minimize Penalty

Given tasks with deadlines $d_i$ and penalties $p_i$. Minimize total penalty.

**Claim**: Process in order of deadline.
**Proof**: If $d_i > d_j$ but i comes first, swapping can only help (or not hurt).

---

## 🎮 Common Patterns

### Lexicographically Smallest
Sort by comparing $a + b$ vs $b + a$.

\`\`\`cpp
// Arrange strings to form smallest concatenation
sort(arr.begin(), arr.end(), [](string& a, string& b) {
    return a + b < b + a;
});
\`\`\`

### Rearrangement Inequality
To minimize $\\sum a_i \\cdot b_i$: sort A ascending, B descending.
To maximize: sort both same way.

---

## 📚 Practice Problems

- [Job Scheduling](https://leetcode.com/problems/minimum-number-of-work-sessions-to-finish-the-tasks/)
- [Largest Number (LeetCode)](https://leetcode.com/problems/largest-number/)
`
};

const searchingContent = {
    "1. Binary Search Fundamentals": `# Binary Search

## 🎯 Concept
Search in sorted array in $O(\\log n)$.

---

## 💻 Templates

### Find Exact Value
\`\`\`cpp
int binarySearch(vector<int>& arr, int target) {
    int lo = 0, hi = arr.size() - 1;
    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;
        if (arr[mid] == target) return mid;
        if (arr[mid] < target) lo = mid + 1;
        else hi = mid - 1;
    }
    return -1;  // Not found
}
\`\`\`

### Lower Bound (first >= target)
\`\`\`cpp
int lowerBound(vector<int>& arr, int target) {
    int lo = 0, hi = arr.size();
    while (lo < hi) {
        int mid = lo + (hi - lo) / 2;
        if (arr[mid] < target) lo = mid + 1;
        else hi = mid;
    }
    return lo;
}
// Or use: lower_bound(arr.begin(), arr.end(), target) - arr.begin()
\`\`\`

### Upper Bound (first > target)
\`\`\`cpp
// Use: upper_bound(arr.begin(), arr.end(), target) - arr.begin()
\`\`\`

---

## ⚠️ Common Pitfalls

1. **Integer overflow**: Use \`lo + (hi - lo) / 2\` not \`(lo + hi) / 2\`
2. **Off-by-one**: Carefully choose \`lo <= hi\` vs \`lo < hi\`
3. **Infinite loop**: Make sure lo or hi changes each iteration

---

## 📚 Practice Problems

- [Binary Search (LeetCode)](https://leetcode.com/problems/binary-search/)
- [Worms (CF 474B)](https://codeforces.com/problemset/problem/474/B)
`,

    "2. Binary Search on Answer": `# Binary Search on Answer

## 🎯 Pattern
Find min/max value X such that some condition is satisfied.

**Key requirement**: Condition must be monotonic (if true for X, true for all Y > X or all Y < X).

---

## 💻 Template

\`\`\`cpp
bool check(long long x) {
    // Return true if x is feasible
}

long long binarySearchAnswer(long long lo, long long hi) {
    long long ans = -1;
    while (lo <= hi) {
        long long mid = lo + (hi - lo) / 2;
        if (check(mid)) {
            ans = mid;
            hi = mid - 1;  // Find smaller (for minimum)
            // lo = mid + 1;  // Find larger (for maximum)
        } else {
            lo = mid + 1;
            // hi = mid - 1;  // For maximum
        }
    }
    return ans;
}
\`\`\`

---

## 🎮 Classic Problems

### Aggressive Cows
Place cows in stalls maximizing minimum distance.
**Binary search** the minimum distance and check if feasible.

### Factory Machines
Given K machines with times, minimize time to produce N items.
**Binary search** the total time.

---

## 📚 Practice Problems

- [Aggressive Cows (SPOJ)](https://www.spoj.com/problems/AGGRCOW/)
- [Factory Machines (CSES)](https://cses.fi/problemset/task/1620)
`,

    "3. Ternary Search": `# Ternary Search

## 🎯 When to Use
Find maximum/minimum of **unimodal function** (single peak/valley).

---

## 💻 Template

\`\`\`cpp
double ternarySearch(double lo, double hi) {
    const double EPS = 1e-9;
    while (hi - lo > EPS) {
        double m1 = lo + (hi - lo) / 3;
        double m2 = hi - (hi - lo) / 3;
        
        if (f(m1) < f(m2))
            lo = m1;  // Maximum in [m1, hi]
        else
            hi = m2;  // Maximum in [lo, m2]
    }
    return lo;
}

// For integers (finding maximum)
int ternarySearchInt(int lo, int hi) {
    while (hi - lo > 2) {
        int m1 = lo + (hi - lo) / 3;
        int m2 = hi - (hi - lo) / 3;
        if (f(m1) < f(m2)) lo = m1;
        else hi = m2;
    }
    // Linear search in [lo, hi]
    int best = lo;
    for (int i = lo; i <= hi; i++)
        if (f(i) > f(best)) best = i;
    return best;
}
\`\`\`

---

## 📚 Practice Problems

- [Weakness and Poorness (CF 578C)](https://codeforces.com/problemset/problem/578/C)
`,

    "4. Interactive Problems": `# Interactive Problems

## 🎯 Key Rules
1. **Flush output** after every query
2. Limit number of queries
3. Often use binary search

---

## 💻 Template

\`\`\`cpp
int main() {
    ios::sync_with_stdio(false);
    // Don't use cin.tie(nullptr) for interactive!
    
    int lo = 1, hi = 1000000;
    while (lo < hi) {
        int mid = (lo + hi) / 2;
        
        cout << mid << endl;  // endl flushes
        // Or: cout << mid << '\\n'; cout.flush();
        
        int response;
        cin >> response;
        
        if (response == 1)
            lo = mid + 1;
        else
            hi = mid;
    }
    
    cout << "! " << lo << endl;
    return 0;
}
\`\`\`

---

## ⚠️ Common Pitfalls

1. **Forgetting to flush**: Use \`endl\` or \`cout.flush()\`
2. **Wrong query count**: Calculate max queries needed before coding
3. **Edge cases**: Test with boundary values

---

## 📚 Practice Problems

- [Guess the Number (CF)](https://codeforces.com/problemset/task/1/A)
- [Lost Numbers (CF 1167B)](https://codeforces.com/problemset/problem/1167/B)
`
};

const dataStructuresContent = {
    "1. Stack & Monotonic Stack": `# Stack & Monotonic Stack

## 🎯 Monotonic Stack
Maintains elements in sorted order. Used for Next Greater/Smaller Element.

---

## 💻 Templates

### Next Greater Element
\`\`\`cpp
vector<int> nextGreater(vector<int>& arr) {
    int n = arr.size();
    vector<int> result(n, -1);
    stack<int> st;  // Store indices
    
    for (int i = 0; i < n; i++) {
        while (!st.empty() && arr[st.top()] < arr[i]) {
            result[st.top()] = arr[i];
            st.pop();
        }
        st.push(i);
    }
    return result;
}
\`\`\`

### Largest Rectangle in Histogram
\`\`\`cpp
long long largestRectangle(vector<int>& heights) {
    int n = heights.size();
    stack<int> st;
    long long maxArea = 0;
    
    for (int i = 0; i <= n; i++) {
        int h = (i == n) ? 0 : heights[i];
        while (!st.empty() && heights[st.top()] > h) {
            int height = heights[st.top()];
            st.pop();
            int width = st.empty() ? i : (i - st.top() - 1);
            maxArea = max(maxArea, (long long)height * width);
        }
        st.push(i);
    }
    return maxArea;
}
\`\`\`

---

## 📚 Practice Problems

- [Next Greater Element II (LeetCode)](https://leetcode.com/problems/next-greater-element-ii/)
- [Largest Rectangle (LeetCode)](https://leetcode.com/problems/largest-rectangle-in-histogram/)
`,

    "2. Queue & Deque (Sliding Window)": `# Sliding Window with Deque

## 🎯 Problem
Find max/min in every window of size K.

---

## 💻 Template

\`\`\`cpp
vector<int> maxSlidingWindow(vector<int>& nums, int k) {
    deque<int> dq;  // Store indices
    vector<int> result;
    
    for (int i = 0; i < nums.size(); i++) {
        // Remove elements outside window
        while (!dq.empty() && dq.front() <= i - k)
            dq.pop_front();
        
        // Remove smaller elements (they'll never be max)
        while (!dq.empty() && nums[dq.back()] <= nums[i])
            dq.pop_back();
        
        dq.push_back(i);
        
        if (i >= k - 1)
            result.push_back(nums[dq.front()]);
    }
    return result;
}
\`\`\`

**Complexity**: O(n) - each element is pushed/popped at most once.

---

## 📚 Practice Problems

- [Sliding Window Maximum (LeetCode)](https://leetcode.com/problems/sliding-window-maximum/)
- [Queries with Fixed Length (HackerRank)](https://www.hackerrank.com/challenges/queries-with-fixed-length)
`,

    "3. Min & Max Heaps (Priority Queue)": `# Priority Queue

## 💻 C++ STL

\`\`\`cpp
// Max Heap (default)
priority_queue<int> maxHeap;

// Min Heap
priority_queue<int, vector<int>, greater<int>> minHeap;

// Custom comparator
auto cmp = [](pair<int,int>& a, pair<int,int>& b) {
    return a.first + a.second > b.first + b.second;
};
priority_queue<pair<int,int>, vector<pair<int,int>>, decltype(cmp)> pq(cmp);
\`\`\`

---

## 🎮 Applications

### Merge K Sorted Lists
\`\`\`cpp
ListNode* mergeKLists(vector<ListNode*>& lists) {
    auto cmp = [](ListNode* a, ListNode* b) { return a->val > b->val; };
    priority_queue<ListNode*, vector<ListNode*>, decltype(cmp)> pq(cmp);
    
    for (auto list : lists)
        if (list) pq.push(list);
    
    ListNode dummy(0), *tail = &dummy;
    while (!pq.empty()) {
        auto node = pq.top(); pq.pop();
        tail->next = node;
        tail = tail->next;
        if (node->next) pq.push(node->next);
    }
    return dummy.next;
}
\`\`\`

---

## 📚 Practice Problems

- [Merge k Sorted Lists (LeetCode)](https://leetcode.com/problems/merge-k-sorted-lists/)
- [Find Median (LeetCode)](https://leetcode.com/problems/find-median-from-data-stream/)
`,

    "4. Set & Hash Table (Map)": `# Set & Map

## 💻 C++ Containers

### Ordered (Red-Black Tree)
\`\`\`cpp
set<int> s;           // O(log n) operations
map<int, int> m;      // O(log n) operations

s.insert(5);
s.erase(5);
s.count(5);           // 0 or 1
auto it = s.lower_bound(5);  // First >= 5
\`\`\`

### Unordered (Hash Table)
\`\`\`cpp
unordered_set<int> us;    // O(1) average
unordered_map<int, int> um;

// Custom hash for pairs (to avoid hacking)
struct PairHash {
    size_t operator()(const pair<int,int>& p) const {
        return hash<long long>()(((long long)p.first << 32) | p.second);
    }
};
unordered_set<pair<int,int>, PairHash> pairSet;
\`\`\`

---

## ⚠️ Anti-Hash Attack
For contests, use custom hash to prevent TLE attacks:

\`\`\`cpp
struct SafeHash {
    static uint64_t splitmix64(uint64_t x) {
        x += 0x9e3779b97f4a7c15;
        x = (x ^ (x >> 30)) * 0xbf58476d1ce4e5b9;
        x = (x ^ (x >> 27)) * 0x94d049bb133111eb;
        return x ^ (x >> 31);
    }
    size_t operator()(uint64_t x) const {
        static const uint64_t FIXED_RANDOM = chrono::steady_clock::now().time_since_epoch().count();
        return splitmix64(x + FIXED_RANDOM);
    }
};
\`\`\`

---

## 📚 Practice Problems

- [Registration System (CF 4C)](https://codeforces.com/problemset/problem/4/C)
`,

    "5. Policy Based Data Structures (PBDS)": `# Policy Based Data Structures

## 🎯 What is it?
Ordered set with **indexing** support (find k-th element, find rank of element).

---

## 💻 Template

\`\`\`cpp
#include <ext/pb_ds/assoc_container.hpp>
#include <ext/pb_ds/tree_policy.hpp>
using namespace __gnu_pbds;

typedef tree<int, null_type, less<int>, rb_tree_tag,
             tree_order_statistics_node_update> ordered_set;

// For multiset (allow duplicates), use pair<int, int>
typedef tree<pair<int,int>, null_type, less<pair<int,int>>, rb_tree_tag,
             tree_order_statistics_node_update> ordered_multiset;

int main() {
    ordered_set os;
    os.insert(5);
    os.insert(3);
    os.insert(7);
    
    // Find k-th smallest (0-indexed)
    auto it = os.find_by_order(1);  // Points to 5
    
    // Find number of elements < x
    int rank = os.order_of_key(5);  // Returns 1
    
    os.erase(5);
}
\`\`\`

---

## 🎮 Applications
- **Inversion count**: Insert elements, count elements greater than current
- **Range queries**: Combined with lazy updates

---

## 📚 Practice Problems

- [Order Set (SPOJ)](https://www.spoj.com/problems/ORDERSET/)
- [Enemy is weak (CF 61E)](https://codeforces.com/problemset/problem/61/E)
`
};

const precomputeContent = {
    "1. 1D & 2D Prefix Sums (Arrays)": `# Prefix Sums

## 🎯 1D Prefix Sum
Range sum query in O(1) after O(n) preprocessing.

\`\`\`cpp
vector<long long> prefix(n + 1);
for (int i = 0; i < n; i++)
    prefix[i + 1] = prefix[i] + arr[i];

// Sum of [L, R] (0-indexed)
long long rangeSum = prefix[R + 1] - prefix[L];
\`\`\`

---

## 🎯 2D Prefix Sum
\`\`\`cpp
vector<vector<long long>> prefix(n + 1, vector<long long>(m + 1));

// Build
for (int i = 0; i < n; i++)
    for (int j = 0; j < m; j++)
        prefix[i+1][j+1] = arr[i][j] + prefix[i][j+1] + prefix[i+1][j] - prefix[i][j];

// Query rectangle (r1,c1) to (r2,c2) inclusive, 0-indexed in original
long long sum = prefix[r2+1][c2+1] - prefix[r1][c2+1] - prefix[r2+1][c1] + prefix[r1][c1];
\`\`\`

---

## 📚 Practice Problems

- [Static Range Sum (CSES)](https://cses.fi/problemset/task/1646)
- [Forest Queries (CSES)](https://cses.fi/problemset/task/1652)
`,

    "2. Difference Arrays (Range Updates)": `# Difference Arrays

## 🎯 Purpose
Range update in O(1), point query after O(n) reconstruction.

---

## 💻 Template

\`\`\`cpp
vector<long long> diff(n + 1);

// Add val to range [L, R]
void rangeAdd(int L, int R, long long val) {
    diff[L] += val;
    diff[R + 1] -= val;
}

// Reconstruct array
void reconstruct() {
    for (int i = 1; i < n; i++)
        diff[i] += diff[i - 1];
}
\`\`\`

---

## 🎮 2D Difference Array
\`\`\`cpp
// Add val to rectangle (r1,c1) to (r2,c2)
diff[r1][c1] += val;
diff[r1][c2+1] -= val;
diff[r2+1][c1] -= val;
diff[r2+1][c2+1] += val;

// Reconstruct with 2D prefix sum
\`\`\`

---

## 📚 Practice Problems

- [Greg and Array (CF 295A)](https://codeforces.com/problemset/problem/295/A)
- [Little Girl and Maximum Sum (CF 276C)](https://codeforces.com/problemset/problem/276/C)
`,

    "3. String Hashing (Rolling Hash)": `# String Hashing

## 🎯 Purpose
Compare substrings in O(1).

---

## 💻 Template

\`\`\`cpp
const long long MOD = 1e9 + 7;
const long long BASE = 31;

vector<long long> hashPrefix, powBase;

void build(string& s) {
    int n = s.size();
    hashPrefix.resize(n + 1);
    powBase.resize(n + 1);
    
    powBase[0] = 1;
    for (int i = 0; i < n; i++) {
        hashPrefix[i + 1] = (hashPrefix[i] * BASE + (s[i] - 'a' + 1)) % MOD;
        powBase[i + 1] = powBase[i] * BASE % MOD;
    }
}

// Hash of s[L..R] (0-indexed, inclusive)
long long getHash(int L, int R) {
    long long h = (hashPrefix[R + 1] - hashPrefix[L] * powBase[R - L + 1] % MOD + MOD) % MOD;
    return h;
}
\`\`\`

---

## ⚠️ Collision Prevention
Use **double hashing** (two different mods/bases):
\`\`\`cpp
pair<long long, long long> getDoubleHash(int L, int R) {
    return {getHash1(L, R), getHash2(L, R)};
}
\`\`\`

---

## 📚 Practice Problems

- [String Matching (CSES)](https://cses.fi/problemset/task/1753)
- [Good Substrings (CF 271D)](https://codeforces.com/problemset/problem/271/D)
`,

    "4. Prefix/Suffix Computation on Strings": `# Prefix/Suffix Techniques

## 🎮 Patterns

### Prefix Max/Min Array
\`\`\`cpp
vector<int> prefixMax(n);
prefixMax[0] = arr[0];
for (int i = 1; i < n; i++)
    prefixMax[i] = max(prefixMax[i-1], arr[i]);

vector<int> suffixMax(n);
suffixMax[n-1] = arr[n-1];
for (int i = n-2; i >= 0; i--)
    suffixMax[i] = max(suffixMax[i+1], arr[i]);
\`\`\`

### Prefix/Suffix XOR
\`\`\`cpp
vector<int> prefixXor(n + 1);
for (int i = 0; i < n; i++)
    prefixXor[i + 1] = prefixXor[i] ^ arr[i];

// XOR of range [L, R]
int rangeXor = prefixXor[R + 1] ^ prefixXor[L];
\`\`\`

### Prefix/Suffix GCD
\`\`\`cpp
vector<int> prefixGcd(n), suffixGcd(n);
prefixGcd[0] = arr[0];
for (int i = 1; i < n; i++)
    prefixGcd[i] = __gcd(prefixGcd[i-1], arr[i]);

suffixGcd[n-1] = arr[n-1];
for (int i = n-2; i >= 0; i--)
    suffixGcd[i] = __gcd(suffixGcd[i+1], arr[i]);

// GCD of array excluding element i
int gcdExcluding = __gcd(i > 0 ? prefixGcd[i-1] : 0, 
                          i < n-1 ? suffixGcd[i+1] : 0);
\`\`\`

---

## 📚 Practice Problems

- [Prefix-Suffix Palindrome (CF 1326D1)](https://codeforces.com/problemset/problem/1326/D1)
`
};

async function update() {
    try {
        for (const [title, content] of Object.entries(greedyContent)) {
            await pool.query('UPDATE cp_topics SET content = $1 WHERE title = $2', [content, title]);
            console.log('✅ ' + title);
        }
        for (const [title, content] of Object.entries(searchingContent)) {
            await pool.query('UPDATE cp_topics SET content = $1 WHERE title = $2', [content, title]);
            console.log('✅ ' + title);
        }
        for (const [title, content] of Object.entries(dataStructuresContent)) {
            await pool.query('UPDATE cp_topics SET content = $1 WHERE title = $2', [content, title]);
            console.log('✅ ' + title);
        }
        for (const [title, content] of Object.entries(precomputeContent)) {
            await pool.query('UPDATE cp_topics SET content = $1 WHERE title = $2', [content, title]);
            console.log('✅ ' + title);
        }
        console.log('🎉 Done!');
    } catch (err) {
        console.error(err);
    } finally {
        await pool.end();
    }
}

update();
