const { Pool } = require('pg');

const pool = new Pool({
    connectionString: 'postgresql://postgres.xlqzqcqacpajpqwneqpa:05Supabase%40%40%3F%3F@aws-1-ap-south-1.pooler.supabase.com:6543/postgres',
    ssl: { rejectUnauthorized: false }
});

const bitManipulationContent = {
    "1. Bitwise Operators & Basics": `# Bitwise Operators

## 🎯 Overview
Bitwise operations work on individual bits of integers. They're extremely fast (single CPU instruction).

---

## 🧠 Operators

| Operator | Symbol | Description |
|----------|--------|-------------|
| AND | \`a & b\` | 1 if both bits are 1 |
| OR | \`a \\| b\` | 1 if at least one bit is 1 |
| XOR | \`a ^ b\` | 1 if bits are different |
| NOT | \`~a\` | Flip all bits |
| Left Shift | \`a << k\` | Multiply by $2^k$ |
| Right Shift | \`a >> k\` | Divide by $2^k$ |

---

## 💻 Common Operations

### Check if bit k is set
\`\`\`cpp
bool isSet = (n >> k) & 1;
// OR
bool isSet = n & (1 << k);
\`\`\`

### Set bit k
\`\`\`cpp
n = n | (1 << k);
\`\`\`

### Unset bit k
\`\`\`cpp
n = n & ~(1 << k);
\`\`\`

### Toggle bit k
\`\`\`cpp
n = n ^ (1 << k);
\`\`\`

### Count set bits
\`\`\`cpp
int count = __builtin_popcount(n);      // for int
int count = __builtin_popcountll(n);    // for long long
\`\`\`

### Get lowest set bit
\`\`\`cpp
int lsb = n & (-n);
\`\`\`

### Remove lowest set bit
\`\`\`cpp
n = n & (n - 1);
\`\`\`

### Check if power of 2
\`\`\`cpp
bool isPow2 = n > 0 && (n & (n - 1)) == 0;
\`\`\`

---

## 🎮 XOR Properties
$$x \\oplus x = 0$$
$$x \\oplus 0 = x$$
$$x \\oplus y = y \\oplus x$$ (Commutative)
$$(x \\oplus y) \\oplus z = x \\oplus (y \\oplus z)$$ (Associative)

**Key Application**: Find unique element in array where all others appear twice:
\`\`\`cpp
int findUnique(vector<int>& arr) {
    int result = 0;
    for (int x : arr) result ^= x;
    return result;
}
\`\`\`

---

## ⚠️ Common Pitfalls

1. **Shift overflow**: \`1 << 31\` is negative! Use \`1LL << k\` for k ≥ 31
2. **Signed right shift**: May insert 1s, use \`unsigned\` for logical shift
3. **Operator precedence**: \`a & b == 0\` is \`a & (b == 0)\`! Use \`(a & b) == 0\`

---

## 📚 Practice Problems

- [Sum of Two Integers (LeetCode)](https://leetcode.com/problems/sum-of-two-integers/)
- [Single Number (LeetCode)](https://leetcode.com/problems/single-number/)
- [Raising Bacteria (CF 579A)](https://codeforces.com/problemset/problem/579/A)
`,

    "2. Common Bit Tricks": `# Common Bit Tricks

## 💻 Essential Tricks

### 1. Swap without temp variable
\`\`\`cpp
a ^= b;
b ^= a;
a ^= b;
\`\`\`

### 2. Absolute value
\`\`\`cpp
int abs(int n) {
    int mask = n >> 31;
    return (n + mask) ^ mask;
}
\`\`\`

### 3. Min/Max without branching
\`\`\`cpp
int min(int a, int b) {
    return b ^ ((a ^ b) & -(a < b));
}
\`\`\`

### 4. Check if same sign
\`\`\`cpp
bool sameSign = (a ^ b) >= 0;
\`\`\`

### 5. Round up to next power of 2
\`\`\`cpp
unsigned nextPow2(unsigned n) {
    n--;
    n |= n >> 1; n |= n >> 2;
    n |= n >> 4; n |= n >> 8;
    n |= n >> 16;
    return n + 1;
}
\`\`\`

### 6. Iterate all submasks of a mask
\`\`\`cpp
for (int sub = mask; sub > 0; sub = (sub - 1) & mask) {
    // Process submask 'sub'
}
// Don't forget to handle sub = 0 separately if needed
\`\`\`

### 7. Count trailing zeros
\`\`\`cpp
int tz = __builtin_ctz(n);      // Undefined for n = 0!
int tz = __builtin_ctzll(n);
\`\`\`

### 8. Count leading zeros
\`\`\`cpp
int lz = __builtin_clz(n);      // Undefined for n = 0!
int highestBit = 31 - __builtin_clz(n);
\`\`\`

### 9. Compute floor(log2(n))
\`\`\`cpp
int log2Floor = 31 - __builtin_clz(n);
int log2Floor = 63 - __builtin_clzll(n);
\`\`\`

---

## 📚 Practice Problems

- [Fedor and New Game (CF 467B)](https://codeforces.com/problemset/problem/467/B)
- [Number of 1 Bits (LeetCode)](https://leetcode.com/problems/number-of-1-bits/)
`,

    "3. Built-in Functions & Optimization": `# GCC Built-in Functions

## 💻 Functions

| Function | Description | Complexity |
|----------|-------------|------------|
| \`__builtin_popcount(x)\` | Count set bits in int | O(1) |
| \`__builtin_popcountll(x)\` | Count set bits in long long | O(1) |
| \`__builtin_clz(x)\` | Count leading zeros (undefined if x=0) | O(1) |
| \`__builtin_ctz(x)\` | Count trailing zeros (undefined if x=0) | O(1) |
| \`__builtin_ffs(x)\` | Returns 1 + index of least significant set bit | O(1) |
| \`__builtin_parity(x)\` | Returns 1 if odd number of set bits | O(1) |

---

## 🎮 std::bitset

When you need more than 64 bits:
\`\`\`cpp
#include <bitset>

bitset<1000> b;
b[5] = 1;
b.set(10);
b.reset(5);
b.flip(3);

int cnt = b.count();    // Number of set bits
bool any = b.any();     // Any bit set?
bool none = b.none();   // All bits zero?

// Bitwise operations work!
bitset<1000> c = a & b;
bitset<1000> d = a | b;
bitset<1000> e = a ^ b;

// Shift operations
bitset<1000> f = a << 5;
bitset<1000> g = a >> 3;
\`\`\`

**Optimization**: Bitset operations are 64x faster than manual bit arrays!

---

## 📚 Practice Problems

- [Preparing Olympiad (CF 550B)](https://codeforces.com/problemset/problem/550/B)
- [Petr and a Combination Lock (CF 1097B)](https://codeforces.com/problemset/problem/1097/B)
`,

    "4. XOR Properties": `# XOR Deep Dive

## 🧠 Properties

1. **Self-inverse**: $x \\oplus x = 0$
2. **Identity**: $x \\oplus 0 = x$
3. **Commutative**: $x \\oplus y = y \\oplus x$  
4. **Associative**: $(x \\oplus y) \\oplus z = x \\oplus (y \\oplus z)$
5. **Cancellation**: If $a \\oplus b = c$, then $a \\oplus c = b$ and $b \\oplus c = a$

---

## 🎮 Patterns

### Pattern 1: Find the single unique element
\`\`\`cpp
int findSingle(vector<int>& arr) {
    int xorSum = 0;
    for (int x : arr) xorSum ^= x;
    return xorSum;
}
\`\`\`

### Pattern 2: Find two unique elements
\`\`\`cpp
pair<int,int> findTwoUnique(vector<int>& arr) {
    int xorAll = 0;
    for (int x : arr) xorAll ^= x;
    
    int diffBit = xorAll & (-xorAll);  // Rightmost set bit
    int a = 0, b = 0;
    for (int x : arr) {
        if (x & diffBit) a ^= x;
        else b ^= x;
    }
    return {a, b};
}
\`\`\`

### Pattern 3: XOR prefix array
\`\`\`cpp
// XOR of range [L, R] in O(1) after O(n) preprocessing
vector<int> prefixXor(n + 1);
for (int i = 1; i <= n; i++)
    prefixXor[i] = prefixXor[i-1] ^ arr[i-1];

int rangeXor = prefixXor[R+1] ^ prefixXor[L];
\`\`\`

### Pattern 4: Swap using XOR
\`\`\`cpp
void swap(int& a, int& b) {
    a ^= b; b ^= a; a ^= b;
}
\`\`\`

---

## 📚 Practice Problems

- [Mahmoud and Ehab and the xor-MST (CF 959C)](https://codeforces.com/problemset/problem/959/C)
- [XORwice (CF 1421A)](https://codeforces.com/problemset/problem/1421/A)
- [Single Number II (LeetCode)](https://leetcode.com/problems/single-number-ii/)
`,

    "5. Bitmasking on Sets & Numbers": `# Bitmasking

## 🎯 Concept
Represent a subset of $\\{0, 1, ..., n-1\\}$ as an integer where bit $i$ is set iff element $i$ is in the subset.

---

## 💻 Operations

### Iterate all subsets of {0..n-1}
\`\`\`cpp
for (int mask = 0; mask < (1 << n); mask++) {
    // Process subset represented by mask
}
\`\`\`

### Iterate elements in a mask
\`\`\`cpp
for (int i = 0; i < n; i++) {
    if (mask & (1 << i)) {
        // Element i is in the subset
    }
}
\`\`\`

### Iterate all submasks of a mask
\`\`\`cpp
for (int sub = mask; ; sub = (sub - 1) & mask) {
    // Process submask
    if (sub == 0) break;
}
\`\`\`
**Complexity**: Sum over all masks is $O(3^n)$

### Check if A is subset of B
\`\`\`cpp
bool isSubset = (A & B) == A;
\`\`\`

### Union and Intersection
\`\`\`cpp
int unionSet = A | B;
int intersection = A & B;
\`\`\`

---

## 🎮 Application: Subset Sum DP
\`\`\`cpp
// Can we achieve target sum using subset?
bool canSum(vector<int>& arr, int target) {
    int n = arr.size();
    for (int mask = 0; mask < (1 << n); mask++) {
        int sum = 0;
        for (int i = 0; i < n; i++)
            if (mask & (1 << i)) sum += arr[i];
        if (sum == target) return true;
    }
    return false;
}
\`\`\`

---

## 📚 Practice Problems

- [Apple Division (CSES)](https://cses.fi/problemset/task/1623)
- [Subset Sum (AtCoder)](https://atcoder.jp/contests/dp/tasks/dp_a)
`,

    "6. Bitmasking on Strings": `# Bitmasking on Strings

## 🎯 Concept
Represent set of characters in a string as a bitmask (26 bits for lowercase).

---

## 💻 Code

### Create mask from string
\`\`\`cpp
int getMask(string& s) {
    int mask = 0;
    for (char c : s)
        mask |= (1 << (c - 'a'));
    return mask;
}
\`\`\`

### Check common characters
\`\`\`cpp
bool hasCommon = (mask1 & mask2) != 0;
\`\`\`

### Count unique characters
\`\`\`cpp
int unique = __builtin_popcount(mask);
\`\`\`

### Palindrome permutation check
A string can form a palindrome iff at most one character appears odd times:
\`\`\`cpp
bool canFormPalindrome(string& s) {
    int mask = 0;
    for (char c : s) mask ^= (1 << (c - 'a'));
    return __builtin_popcount(mask) <= 1;
}
\`\`\`

---

## 📚 Practice Problems

- [Maximum Product of Word Lengths (LeetCode)](https://leetcode.com/problems/maximum-product-of-word-lengths/)
- [Longest Substring with At Most K Distinct Characters](https://leetcode.com/problems/longest-substring-with-at-most-k-distinct-characters/)
`,

    "7. Bitmask DP (Introduction)": `# Bitmask DP

## 🎯 When to Use
- N ≤ 20 (because $2^{20} \\approx 10^6$)
- Problem involves subsets/permutations
- State depends on "which elements have been used"

---

## 🧠 Template

**State**: \`dp[mask]\` or \`dp[mask][last]\`

**Transition**: Try adding each unused element

---

## 💻 Example: Travelling Salesman Problem (TSP)

Find shortest path visiting all cities exactly once.

\`\`\`cpp
const int INF = 1e9;
int n;
int dist[20][20];
int dp[1 << 20][20];

int tsp(int mask, int pos) {
    if (mask == (1 << n) - 1)
        return dist[pos][0];  // Return to start
    
    if (dp[mask][pos] != -1)
        return dp[mask][pos];
    
    int ans = INF;
    for (int next = 0; next < n; next++) {
        if (!(mask & (1 << next))) {
            int newMask = mask | (1 << next);
            ans = min(ans, dist[pos][next] + tsp(newMask, next));
        }
    }
    return dp[mask][pos] = ans;
}

// Call: tsp(1, 0) - start at city 0 with only city 0 visited
\`\`\`

**Complexity**: $O(n^2 \\cdot 2^n)$

---

## 🎮 Other Patterns

### Assignment Problem
Match N workers to N jobs with minimum cost.
\`\`\`cpp
// dp[mask] = min cost to assign jobs in mask to first popcount(mask) workers
\`\`\`

### Hamiltonian Path
\`\`\`cpp
// dp[mask][i] = number of paths ending at i using exactly vertices in mask
\`\`\`

---

## 📚 Practice Problems

- [Matching (AtCoder DP O)](https://atcoder.jp/contests/dp/tasks/dp_o)
- [Assignment Problem (SPOJ)](https://www.spoj.com/problems/ASSIGN/)
- [Hamiltonian Flights (CSES)](https://cses.fi/problemset/task/1690)
`,

    "8. Advanced: Linear Basis (XOR Basis)": `# Linear Basis (XOR Basis)

## 🎯 Concept
A **linear basis** is a minimal set of numbers that can represent any XOR-combination of an array.

**Size**: At most $\\log(\\max A_i) \\approx 30$ or 60 elements.

---

## 🧠 Algorithm

### Insert into Basis
\`\`\`cpp
vector<long long> basis;

void insert(long long x) {
    for (auto b : basis)
        x = min(x, x ^ b);
    if (x > 0) {
        basis.push_back(x);
        // Keep sorted for some applications
        sort(basis.rbegin(), basis.rend());
    }
}
\`\`\`

### Gaussian Elimination Style
\`\`\`cpp
long long basis[60];

void insert(long long x) {
    for (int i = 59; i >= 0; i--) {
        if (!(x >> i & 1)) continue;
        if (!basis[i]) {
            basis[i] = x;
            return;
        }
        x ^= basis[i];
    }
}
\`\`\`

---

## 🎮 Applications

### 1. Maximum XOR Sum
\`\`\`cpp
long long maxXor() {
    long long result = 0;
    for (int i = 59; i >= 0; i--)
        result = max(result, result ^ basis[i]);
    return result;
}
\`\`\`

### 2. Check if X is representable
\`\`\`cpp
bool canRepresent(long long x) {
    for (int i = 59; i >= 0; i--) {
        if (x >> i & 1) {
            if (!basis[i]) return false;
            x ^= basis[i];
        }
    }
    return x == 0;
}
\`\`\`

### 3. K-th smallest XOR sum
More complex, requires reducing basis to row echelon form.

---

## 📚 Practice Problems

- [XOR Maximization (CF 242E)](https://codeforces.com/problemset/problem/242/E)
- [Basis (CodeChef)](https://www.codechef.com/problems/XORBASIS)
`
};

async function updateBitManipulation() {
    try {
        console.log('📚 Updating Bit Manipulation Module...');

        for (const [title, content] of Object.entries(bitManipulationContent)) {
            const res = await pool.query(
                'UPDATE cp_topics SET content = $1 WHERE title = $2',
                [content, title]
            );
            if (res.rowCount > 0) {
                console.log('✅ Updated: ' + title);
            } else {
                console.log('⚠️ Not found: ' + title);
            }
        }

        console.log('🎉 Bit Manipulation module updated!');
    } catch (err) {
        console.error('Error:', err);
    } finally {
        await pool.end();
    }
}

updateBitManipulation();
