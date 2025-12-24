const { Pool } = require('pg');

const pool = new Pool({
    connectionString: 'postgresql://postgres.xlqzqcqacpajpqwneqpa:05Supabase%40%40%3F%3F@aws-1-ap-south-1.pooler.supabase.com:6543/postgres',
    ssl: { rejectUnauthorized: false }
});

const rangeQueryContent = {
    "1. Sparse Table (Static RMQ)": `# Sparse Table

## 🎯 Purpose
Static range min/max/GCD queries in O(1).

---

## 💻 Template
\`\`\`cpp
const int LOG = 20;
int st[MAXN][LOG];
int lg[MAXN];

void build(vector<int>& arr) {
    int n = arr.size();
    lg[1] = 0;
    for (int i = 2; i <= n; i++) lg[i] = lg[i/2] + 1;
    
    for (int i = 0; i < n; i++) st[i][0] = arr[i];
    
    for (int j = 1; j < LOG; j++)
        for (int i = 0; i + (1 << j) <= n; i++)
            st[i][j] = min(st[i][j-1], st[i + (1 << (j-1))][j-1]);
}

int query(int L, int R) {
    int j = lg[R - L + 1];
    return min(st[L][j], st[R - (1 << j) + 1][j]);
}
\`\`\`

**Complexity**: O(N log N) build, O(1) query.

---

## 📚 Practice Problems

- [Static Range Minimum (CSES)](https://cses.fi/problemset/task/1647)
`,

    "2. Fenwick Tree (Binary Indexed Tree)": `# Fenwick Tree (BIT)

## 🎯 Purpose
Point update + prefix sum in O(log N).

---

## 💻 Template
\`\`\`cpp
int bit[MAXN];

void update(int i, int delta) {
    for (; i < MAXN; i += i & (-i))
        bit[i] += delta;
}

int query(int i) {  // Sum [1, i]
    int sum = 0;
    for (; i > 0; i -= i & (-i))
        sum += bit[i];
    return sum;
}

int rangeQuery(int l, int r) {
    return query(r) - query(l - 1);
}
\`\`\`

**Note**: 1-indexed.

---

## 🎮 Inversion Count
\`\`\`cpp
long long inversionCount(vector<int>& arr) {
    // Coordinate compress arr
    long long count = 0;
    for (int i = n - 1; i >= 0; i--) {
        count += query(arr[i] - 1);  // Elements less than arr[i] seen so far
        update(arr[i], 1);
    }
    return count;
}
\`\`\`

---

## 📚 Practice Problems

- [Dynamic Range Sum (CSES)](https://cses.fi/problemset/task/1648)
- [Inversion Count (SPOJ)](https://www.spoj.com/problems/INVCNT/)
`,

    "3. Segment Tree (Lazy Propagation)": `# Segment Tree

## 💻 Basic Template (Point Update)
\`\`\`cpp
int tree[4 * MAXN], arr[MAXN];

void build(int node, int start, int end) {
    if (start == end) { tree[node] = arr[start]; return; }
    int mid = (start + end) / 2;
    build(2*node, start, mid);
    build(2*node+1, mid+1, end);
    tree[node] = tree[2*node] + tree[2*node+1];
}

void update(int node, int start, int end, int idx, int val) {
    if (start == end) { tree[node] = val; return; }
    int mid = (start + end) / 2;
    if (idx <= mid) update(2*node, start, mid, idx, val);
    else update(2*node+1, mid+1, end, idx, val);
    tree[node] = tree[2*node] + tree[2*node+1];
}

int query(int node, int start, int end, int l, int r) {
    if (r < start || end < l) return 0;
    if (l <= start && end <= r) return tree[node];
    int mid = (start + end) / 2;
    return query(2*node, start, mid, l, r) + query(2*node+1, mid+1, end, l, r);
}
\`\`\`

---

## 💻 Lazy Propagation (Range Update)
\`\`\`cpp
int tree[4 * MAXN], lazy[4 * MAXN];

void pushDown(int node, int start, int end) {
    if (lazy[node] != 0) {
        tree[node] += (end - start + 1) * lazy[node];
        if (start != end) {
            lazy[2*node] += lazy[node];
            lazy[2*node+1] += lazy[node];
        }
        lazy[node] = 0;
    }
}

void updateRange(int node, int start, int end, int l, int r, int val) {
    pushDown(node, start, end);
    if (r < start || end < l) return;
    if (l <= start && end <= r) {
        lazy[node] += val;
        pushDown(node, start, end);
        return;
    }
    int mid = (start + end) / 2;
    updateRange(2*node, start, mid, l, r, val);
    updateRange(2*node+1, mid+1, end, l, r, val);
    tree[node] = tree[2*node] + tree[2*node+1];
}
\`\`\`

---

## 📚 Practice Problems

- [Range Update Queries (CSES)](https://cses.fi/problemset/task/1651)
- [Dynamic Range Minimum (CSES)](https://cses.fi/problemset/task/1649)
`,

    "4. Mo's Algorithm (Square Root Decomposition)": `# Mo's Algorithm

## 🎯 Purpose
Answer offline range queries in O((N + Q) × √N).

---

## 💻 Template
\`\`\`cpp
int BLOCK;
struct Query { int l, r, idx; };

bool compare(Query& a, Query& b) {
    if (a.l / BLOCK != b.l / BLOCK) return a.l < b.l;
    return (a.l / BLOCK & 1) ? (a.r < b.r) : (a.r > b.r);
}

int curL = 0, curR = -1, answer = 0;

void add(int idx) {
    // Add arr[idx] to current answer
}

void remove(int idx) {
    // Remove arr[idx] from current answer
}

vector<int> solve(vector<Query>& queries) {
    BLOCK = max(1, (int)sqrt(n));
    sort(queries.begin(), queries.end(), compare);
    
    vector<int> ans(queries.size());
    for (auto& q : queries) {
        while (curR < q.r) add(++curR);
        while (curL > q.l) add(--curL);
        while (curR > q.r) remove(curR--);
        while (curL < q.l) remove(curL++);
        ans[q.idx] = answer;
    }
    return ans;
}
\`\`\`

---

## 📚 Practice Problems

- [Distinct Values Queries (CSES)](https://cses.fi/problemset/task/1734)
- [Powerful Array (CF 86D)](https://codeforces.com/problemset/problem/86/D)
`,

    "5. Strategy: Handling TLE/MLE & Optimization": `# TLE/MLE Debugging Guide

## ⏱️ TLE Fixes

### 1. Check Complexity
| N | Max Complexity |
|---|----------------|
| 10^4 | O(N²) |
| 10^5 | O(N log N) |
| 10^6 | O(N) |
| 10^7 | O(N) with simple ops |

### 2. Fast I/O
\`\`\`cpp
ios::sync_with_stdio(false);
cin.tie(nullptr);
\`\`\`

### 3. Avoid Repeated Allocations
\`\`\`cpp
// Bad: creates new vector each iteration
for (int i = 0; i < n; i++) {
    vector<int> temp(m);  // Slow!
}

// Good: reuse
vector<int> temp(m);
for (int i = 0; i < n; i++) {
    fill(temp.begin(), temp.end(), 0);
}
\`\`\`

---

## 💾 MLE Fixes

### 1. Use Smaller Types
\`\`\`cpp
short instead of int  // 2 bytes vs 4
bool instead of int   // 1 byte vs 4
bitset<N> vs bool[N]  // N/8 bytes vs N bytes
\`\`\`

### 2. Space-Optimized DP
\`\`\`cpp
// If dp[i] only depends on dp[i-1], use 2 rows
int dp[2][MAXM];
// Or rolling array
\`\`\`

### 3. Memory Limits
- 10^8 ints = 400 MB
- 10^7 ints = 40 MB

---

## 📚 Practice Problems

- [Queries for Palindromes (CF 245H)](https://codeforces.com/problemset/problem/245/H)
`
};

const stringContent = {
    "1. KMP Algorithm (Pattern Matching)": `# KMP Algorithm

## 🎯 Purpose
Find all occurrences of pattern P in text T in O(N + M).

---

## 💻 Prefix Function (LPS Array)
\`\`\`cpp
vector<int> prefixFunction(string& s) {
    int n = s.size();
    vector<int> pi(n);
    for (int i = 1; i < n; i++) {
        int j = pi[i - 1];
        while (j > 0 && s[i] != s[j]) j = pi[j - 1];
        if (s[i] == s[j]) j++;
        pi[i] = j;
    }
    return pi;
}
\`\`\`

---

## 💻 Pattern Search
\`\`\`cpp
vector<int> kmp(string& text, string& pattern) {
    string combined = pattern + "#" + text;
    auto pi = prefixFunction(combined);
    
    vector<int> matches;
    int pLen = pattern.size();
    for (int i = pLen + 1; i < combined.size(); i++)
        if (pi[i] == pLen)
            matches.push_back(i - 2 * pLen);
    return matches;
}
\`\`\`

---

## 📚 Practice Problems

- [String Matching (CSES)](https://cses.fi/problemset/task/1753)
- [Password (CF 126B)](https://codeforces.com/problemset/problem/126/B)
`,

    "2. Z-Algorithm": `# Z-Algorithm

## 🎯 Purpose
Z[i] = length of longest prefix of s that starts at position i.

---

## 💻 Template
\`\`\`cpp
vector<int> zFunction(string& s) {
    int n = s.size();
    vector<int> z(n);
    int l = 0, r = 0;
    for (int i = 1; i < n; i++) {
        if (i < r) z[i] = min(r - i, z[i - l]);
        while (i + z[i] < n && s[z[i]] == s[i + z[i]]) z[i]++;
        if (i + z[i] > r) { l = i; r = i + z[i]; }
    }
    return z;
}
\`\`\`

---

## 📚 Practice Problems

- [Prefixes and Suffixes (CF 432D)](https://codeforces.com/problemset/problem/432/D)
`,

    "3. Manacher's Algorithm": `# Manacher's Algorithm

## 🎯 Purpose
Find longest palindrome centered at each position in O(N).

---

## 💻 Template
\`\`\`cpp
string manacher(string s) {
    string t = "#";
    for (char c : s) { t += c; t += '#'; }
    
    int n = t.size();
    vector<int> p(n);
    int c = 0, r = 0;
    
    for (int i = 0; i < n; i++) {
        if (i < r) p[i] = min(r - i, p[2 * c - i]);
        while (i + p[i] + 1 < n && i - p[i] - 1 >= 0 && 
               t[i + p[i] + 1] == t[i - p[i] - 1])
            p[i]++;
        if (i + p[i] > r) { c = i; r = i + p[i]; }
    }
    
    int maxLen = 0, center = 0;
    for (int i = 0; i < n; i++)
        if (p[i] > maxLen) { maxLen = p[i]; center = i; }
    
    return s.substr((center - maxLen) / 2, maxLen);
}
\`\`\`

---

## 📚 Practice Problems

- [Longest Palindrome (CSES)](https://cses.fi/problemset/task/1111)
`,

    "4. Trie (Prefix Tree)": `# Trie

## 💻 Template
\`\`\`cpp
struct Trie {
    Trie* child[26];
    int cnt;  // Words ending here
    
    Trie() {
        for (int i = 0; i < 26; i++) child[i] = nullptr;
        cnt = 0;
    }
    
    void insert(string& s) {
        Trie* cur = this;
        for (char c : s) {
            int idx = c - 'a';
            if (!cur->child[idx]) cur->child[idx] = new Trie();
            cur = cur->child[idx];
        }
        cur->cnt++;
    }
    
    int search(string& s) {
        Trie* cur = this;
        for (char c : s) {
            int idx = c - 'a';
            if (!cur->child[idx]) return 0;
            cur = cur->child[idx];
        }
        return cur->cnt;
    }
};
\`\`\`

---

## 🎮 XOR Trie (Binary Trie)
For finding max XOR pair.

---

## 📚 Practice Problems

- [Word Combinations (CSES)](https://cses.fi/problemset/task/1731)
- [Maximum XOR Subarray (CSES)](https://cses.fi/problemset/task/1655)
`
};

const gameTheoryContent = {
    "1. Impartial Games & Nim Sum": `# Game Theory Basics

## 🧠 Nim Game
N piles, take any amount from one pile. Last to move wins.

**Theorem**: First player wins iff XOR of all pile sizes ≠ 0.

\`\`\`cpp
bool firstPlayerWins(vector<int>& piles) {
    int xorSum = 0;
    for (int p : piles) xorSum ^= p;
    return xorSum != 0;
}
\`\`\`

---

## 📚 Practice Problems

- [Nim Game I (CSES)](https://cses.fi/problemset/task/1730)
`,

    "2. Sprague-Grundy Theorem": `# Sprague-Grundy Theorem

## 🧠 Key Insight
Every impartial game is equivalent to a Nim pile.

**Grundy Number**: G(state) = mex({G(next states)})

**mex** = minimum excludant = smallest non-negative integer not in set.

---

## 💻 Example: Staircase Nim
\`\`\`cpp
int grundy(int n) {
    if (n == 0) return 0;
    if (memo[n] != -1) return memo[n];
    
    set<int> reachable;
    for (each valid move from n to m)
        reachable.insert(grundy(m));
    
    int mex = 0;
    while (reachable.count(mex)) mex++;
    return memo[n] = mex;
}
\`\`\`

---

## 📚 Practice Problems

- [Game of Stones (SPOJ MCOINS)](https://www.spoj.com/problems/MCOINS/)
`,

    "3. Minimax Algorithm (Zero-Sum)": `# Minimax

## 🧠 Concept
Two players: Maximizer and Minimizer.
Each player plays optimally.

---

## 💻 Template
\`\`\`cpp
int minimax(State state, int depth, bool isMax) {
    if (isTerminal(state) || depth == 0)
        return evaluate(state);
    
    if (isMax) {
        int best = INT_MIN;
        for (auto& next : getMoves(state))
            best = max(best, minimax(next, depth - 1, false));
        return best;
    } else {
        int best = INT_MAX;
        for (auto& next : getMoves(state))
            best = min(best, minimax(next, depth - 1, true));
        return best;
    }
}
\`\`\`

---

## 🎮 Alpha-Beta Pruning
Optimization to skip branches that can't affect result.

---

## 📚 Practice Problems

- [Predict the Winner (LeetCode)](https://leetcode.com/problems/predict-the-winner/)
`
};

const advancedContent = {
    "1. Tree Decompositions (HLD & Centroid)": `# Advanced Tree Algorithms

## 🧠 Heavy-Light Decomposition
Path queries in O(log² N).

---

## 🧠 Centroid Decomposition
Divide & conquer on trees for path counting.

**Centroid**: Node whose removal leaves subtrees of size ≤ N/2.

---

## 📚 Practice Problems

- [Path Queries II (CSES)](https://cses.fi/problemset/task/2134)
- [Fixed-Length Paths I (CSES)](https://cses.fi/problemset/task/2080)
`,

    "2. Suffix Array & LCP": `# Suffix Array

## 🎯 Purpose
Sorted array of all suffixes. O(N log N) construction.

---

## 🎮 Applications
- Number of distinct substrings: $\\frac{N(N+1)}{2} - \\sum LCP[i]$
- Longest repeated substring: max(LCP)

---

## 📚 Practice Problems

- [Suffix Array (CSES)](https://cses.fi/problemset/task/2105)
`,

    "3. Meet-in-the-Middle": `# Meet in the Middle

## 🎯 Purpose
Reduce O(2^N) to O(2^(N/2)).

---

## 💻 Template (Subset Sum)
\`\`\`cpp
bool subsetSum(vector<int>& arr, int target) {
    int n = arr.size();
    int half = n / 2;
    
    set<int> firstHalf;
    for (int mask = 0; mask < (1 << half); mask++) {
        int sum = 0;
        for (int i = 0; i < half; i++)
            if (mask & (1 << i)) sum += arr[i];
        firstHalf.insert(sum);
    }
    
    for (int mask = 0; mask < (1 << (n - half)); mask++) {
        int sum = 0;
        for (int i = 0; i < (n - half); i++)
            if (mask & (1 << i)) sum += arr[half + i];
        if (firstHalf.count(target - sum)) return true;
    }
    return false;
}
\`\`\`

---

## 📚 Practice Problems

- [Meet in the Middle (CSES)](https://cses.fi/problemset/task/1628)
`,

    "4. 2-SAT (Boolean Satisfiability)": `# 2-SAT

## 🎯 Purpose
Assign true/false to variables satisfying CNF with 2-variable clauses.

---

## 🧠 Algorithm
1. Build implication graph
2. Find SCCs
3. If x and ¬x in same SCC → unsatisfiable
4. Else assign based on SCC order

---

## 📚 Practice Problems

- [Giant Pizza (CSES)](https://cses.fi/problemset/task/1684)
`,

    "5. Constructive & Randomized Algorithms": `# Ad-Hoc Techniques

## 🎮 Constructive Patterns

### Greedy Construction
Build solution step by step, proving correctness.

### Swapping Arguments
If current arrangement is suboptimal, show swap improves it.

---

## 🎮 Randomized

### Random Shuffle
Avoid worst-case for algorithms like QuickSort.
\`\`\`cpp
random_shuffle(arr.begin(), arr.end());
// Or with custom seed
mt19937 rng(chrono::steady_clock::now().time_since_epoch().count());
shuffle(arr.begin(), arr.end(), rng);
\`\`\`

---

## 📚 Practice Problems

- [Constructive Problems (CF Blog)](https://codeforces.com/blog/entry/102937)
`
};

async function update() {
    try {
        for (const [title, content] of Object.entries(rangeQueryContent)) {
            await pool.query('UPDATE cp_topics SET content = $1 WHERE title = $2', [content, title]);
            console.log('✅ ' + title);
        }
        for (const [title, content] of Object.entries(stringContent)) {
            await pool.query('UPDATE cp_topics SET content = $1 WHERE title = $2', [content, title]);
            console.log('✅ ' + title);
        }
        for (const [title, content] of Object.entries(gameTheoryContent)) {
            await pool.query('UPDATE cp_topics SET content = $1 WHERE title = $2', [content, title]);
            console.log('✅ ' + title);
        }
        for (const [title, content] of Object.entries(advancedContent)) {
            await pool.query('UPDATE cp_topics SET content = $1 WHERE title = $2', [content, title]);
            console.log('✅ ' + title);
        }
        console.log('🎉 All modules updated!');
    } catch (err) {
        console.error(err);
    } finally {
        await pool.end();
    }
}

update();
