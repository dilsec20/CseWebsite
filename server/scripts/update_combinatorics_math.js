const { Pool } = require('pg');

const pool = new Pool({
    connectionString: 'postgresql://postgres.xlqzqcqacpajpqwneqpa:05Supabase%40%40%3F%3F@aws-1-ap-south-1.pooler.supabase.com:6543/postgres',
    ssl: { rejectUnauthorized: false }
});

const combinatoricsContent = {
    "1. Basics & Binomial Coefficients": `# Binomial Coefficients

## 🎯 Counting Rules

**Rule of Sum**: If A can be done in m ways OR B in n ways → m + n ways
**Rule of Product**: If A can be done in m ways AND B in n ways → m × n ways

---

## 🧠 Binomial Coefficient

$$\\binom{n}{r} = \\frac{n!}{r!(n-r)!}$$

Number of ways to choose r items from n distinct items.

### Properties
1. $\\binom{n}{r} = \\binom{n}{n-r}$ (Symmetry)
2. $\\binom{n}{r} = \\binom{n-1}{r-1} + \\binom{n-1}{r}$ (Pascal's Identity)
3. $\\sum_{i=0}^{n} \\binom{n}{i} = 2^n$
4. $\\binom{n}{0} + \\binom{n}{2} + ... = \\binom{n}{1} + \\binom{n}{3} + ... = 2^{n-1}$

---

## 💻 Code Templates

### Pascal's Triangle (Small n, any mod)
\`\`\`cpp
const int MAXN = 2005;
long long C[MAXN][MAXN];

void precompute() {
    for (int i = 0; i < MAXN; i++) {
        C[i][0] = 1;
        for (int j = 1; j <= i; j++)
            C[i][j] = (C[i-1][j-1] + C[i-1][j]) % MOD;
    }
}
\`\`\`

### Factorial + Inverse (Large n, prime mod)
\`\`\`cpp
const int MAXN = 2e5 + 5;
const long long MOD = 1e9 + 7;
long long fact[MAXN], invFact[MAXN];

long long binpow(long long a, long long b, long long m) {
    long long res = 1; a %= m;
    while (b > 0) {
        if (b & 1) res = res * a % m;
        a = a * a % m; b >>= 1;
    }
    return res;
}

void precompute() {
    fact[0] = 1;
    for (int i = 1; i < MAXN; i++)
        fact[i] = fact[i-1] * i % MOD;
    
    invFact[MAXN-1] = binpow(fact[MAXN-1], MOD-2, MOD);
    for (int i = MAXN-2; i >= 0; i--)
        invFact[i] = invFact[i+1] * (i+1) % MOD;
}

long long nCr(int n, int r) {
    if (r < 0 || r > n) return 0;
    return fact[n] * invFact[r] % MOD * invFact[n-r] % MOD;
}

long long nPr(int n, int r) {
    if (r < 0 || r > n) return 0;
    return fact[n] * invFact[n-r] % MOD;
}
\`\`\`

---

## 🎮 Common Patterns

### Grid Paths
Paths from (0,0) to (n,m) going only right/down:
$$\\binom{n+m}{n}$$

### Multiset Coefficient (with repetition)
Choose r items from n types (unlimited copies):
$$\\binom{n+r-1}{r}$$

---

## 📚 Practice Problems

- [Pascal's Triangle (LeetCode)](https://leetcode.com/problems/pascals-triangle/)
- [nCr (GFG)](https://practice.geeksforgeeks.org/problems/ncr1019/1)
- [Dreamoon and Sums (CF 476C)](https://codeforces.com/problemset/problem/476/C)
`,

    "2. Catalan Numbers": `# Catalan Numbers

## 🎯 Formula

$$C_n = \\frac{1}{n+1}\\binom{2n}{n} = \\frac{(2n)!}{(n+1)!n!}$$

Sequence: 1, 1, 2, 5, 14, 42, 132, 429, 1430, ...

**Recurrence**: $C_n = \\sum_{i=0}^{n-1} C_i \\cdot C_{n-1-i}$

---

## 🧠 Applications

1. **Balanced Parentheses**: Number of valid sequences with n pairs
2. **Binary Trees**: Number of distinct binary trees with n nodes
3. **Triangulations**: Ways to triangulate a convex polygon with n+2 sides
4. **Mountain Ranges**: Paths from (0,0) to (2n,0) never going below x-axis
5. **Non-crossing Partitions**: Non-crossing ways to connect 2n points on a circle

---

## 💻 Code

\`\`\`cpp
long long catalan(int n) {
    return nCr(2*n, n) * binpow(n+1, MOD-2, MOD) % MOD;
}

// Or using recurrence (slower but intuitive)
long long catalanDP(int n) {
    vector<long long> dp(n+1);
    dp[0] = dp[1] = 1;
    for (int i = 2; i <= n; i++)
        for (int j = 0; j < i; j++)
            dp[i] = (dp[i] + dp[j] * dp[i-1-j]) % MOD;
    return dp[n];
}
\`\`\`

---

## 📚 Practice Problems

- [Bracket Sequences (CSES)](https://cses.fi/problemset/task/2064)
- [Dyck Paths (CF 5C)](https://codeforces.com/problemset/problem/5/C)
`,

    "3. Stars and Bars": `# Stars and Bars

## 🎯 Problem
Distribute n identical balls into k distinct boxes.

---

## 🧠 Formulas

### Boxes can be empty
$$\\binom{n+k-1}{k-1}$$

Think: n stars (*) and k-1 bars (|). Any arrangement represents a distribution.
Example: **|*|*** = {2, 1, 3} for 3 boxes.

### Each box must have ≥ 1
$$\\binom{n-1}{k-1}$$

Pre-place 1 ball in each box, then distribute remaining n-k balls freely.

### Each box has ≥ a_i balls
Reduce to basic problem by subtracting minimum requirements.

---

## 💻 Code

\`\`\`cpp
// n balls into k boxes, boxes can be empty
long long distribute(int n, int k) {
    return nCr(n + k - 1, k - 1);
}

// n balls into k boxes, each box must have >= 1
long long distributeNonEmpty(int n, int k) {
    if (n < k) return 0;
    return nCr(n - 1, k - 1);
}
\`\`\`

---

## 🎮 Variations

### Integer Solutions
Number of non-negative integer solutions to $x_1 + x_2 + ... + x_k = n$:
$$\\binom{n+k-1}{k-1}$$

### Bounded values
Each $x_i \\leq m$: Use inclusion-exclusion.

---

## 📚 Practice Problems

- [Marbles (SPOJ)](https://www.spoj.com/problems/MARBLES/)
- [Combination Lock (CF 1090M)](https://codeforces.com/problemset/problem/1090/M)
`,

    "4. Inclusion-Exclusion Principle": `# Inclusion-Exclusion Principle

## 🎯 Formula

$$|A \\cup B| = |A| + |B| - |A \\cap B|$$

$$|A \\cup B \\cup C| = |A| + |B| + |C| - |AB| - |BC| - |AC| + |ABC|$$

General:
$$\\left|\\bigcup_{i=1}^n A_i\\right| = \\sum_{\\emptyset \\neq S \\subseteq \\{1..n\\}} (-1)^{|S|+1} \\left|\\bigcap_{i \\in S} A_i\\right|$$

---

## 💻 Implementation

\`\`\`cpp
// Count integers in [1, N] divisible by at least one element of arr
long long countDivisible(long long N, vector<int>& arr) {
    int n = arr.size();
    long long result = 0;
    
    for (int mask = 1; mask < (1 << n); mask++) {
        long long lcmVal = 1;
        int bits = __builtin_popcount(mask);
        
        for (int i = 0; i < n; i++) {
            if (mask & (1 << i)) {
                lcmVal = lcm(lcmVal, (long long)arr[i]);
                if (lcmVal > N) break;
            }
        }
        
        long long count = N / lcmVal;
        if (bits % 2 == 1) result += count;
        else result -= count;
    }
    return result;
}
\`\`\`

---

## 🎮 Applications

1. **Derangements**: Count permutations with no fixed points
   $$D_n = n! \\sum_{i=0}^{n} \\frac{(-1)^i}{i!}$$

2. **Coprime counting**: Count integers in [1,N] coprime to M

3. **At least k property**: Count objects with at least k of n properties

---

## 📚 Practice Problems

- [Count divisible numbers](https://codeforces.com/problemset/problem/1305/C)
- [Derangements (CSES)](https://cses.fi/problemset/task/1717)
`,

    "5. Lucas Theorem": `# Lucas' Theorem

## 🎯 When to Use
Computing $\\binom{n}{r} \\mod p$ where p is a **small prime** but n, r can be very large.

---

## 🧠 Formula

$$\\binom{n}{r} \\equiv \\prod_{i=0}^{k} \\binom{n_i}{r_i} \\pmod{p}$$

where $n = \\sum n_i p^i$ and $r = \\sum r_i p^i$ (base-p representations).

Simpler recursive form:
$$\\binom{n}{r} \\equiv \\binom{n \\mod p}{r \\mod p} \\cdot \\binom{n/p}{r/p} \\pmod{p}$$

---

## 💻 Code

\`\`\`cpp
// Precompute factorial for small p
long long fact[MAXP], invFact[MAXP];

void precompute(int p) {
    fact[0] = 1;
    for (int i = 1; i < p; i++)
        fact[i] = fact[i-1] * i % p;
    invFact[p-1] = binpow(fact[p-1], p-2, p);
    for (int i = p-2; i >= 0; i--)
        invFact[i] = invFact[i+1] * (i+1) % p;
}

long long nCrSmall(int n, int r, int p) {
    if (r > n) return 0;
    return fact[n] * invFact[r] % p * invFact[n-r] % p;
}

long long lucas(long long n, long long r, int p) {
    if (r == 0) return 1;
    return nCrSmall(n % p, r % p, p) * lucas(n / p, r / p, p) % p;
}
\`\`\`

---

## 📚 Practice Problems

- [Lucas Theorem (HackerRank)](https://www.hackerrank.com/challenges/ncr-lucas)
- [A Gift (SPOJ)](https://www.spoj.com/problems/LUCAS/)
`,

    "6. Advanced: Burnside's Lemma": `# Burnside's Lemma

## 🎯 Problem
Count distinct objects under group symmetry (rotations, reflections, etc.)

---

## 🧠 Formula

$$|X/G| = \\frac{1}{|G|} \\sum_{g \\in G} |X^g|$$

Where:
- $|X/G|$ = number of distinct objects
- $G$ = group of symmetries
- $|X^g|$ = objects fixed by symmetry g

---

## 🎮 Example: Necklace Coloring

Count distinct necklaces with n beads and k colors.

**Symmetries**: n rotations
**Objects fixed by rotation i**: $k^{\\gcd(n, i)}$

$$\\text{Answer} = \\frac{1}{n} \\sum_{i=0}^{n-1} k^{\\gcd(n, i)}$$

\`\`\`cpp
long long countNecklaces(int n, int k) {
    long long total = 0;
    for (int i = 0; i < n; i++)
        total += binpow(k, __gcd(i, n), MOD);
    return total * binpow(n, MOD-2, MOD) % MOD;
}
\`\`\`

---

## 📚 Practice Problems

- [Necklace (SPOJ)](https://www.spoj.com/problems/NECKLACE/)
- [Colored Beads (CF 356D)](https://codeforces.com/problemset/problem/356/D)
`
};

const advancedMathContent = {
    "1. Matrix Exponentiation": `# Matrix Exponentiation

## 🎯 When to Use
Solve linear recurrences in $O(k^3 \\log n)$ where k is matrix size.

---

## 🧠 Idea

For Fibonacci: $F_n = F_{n-1} + F_{n-2}$

$$\\begin{pmatrix} F_{n+1} \\\\ F_n \\end{pmatrix} = \\begin{pmatrix} 1 & 1 \\\\ 1 & 0 \\end{pmatrix} \\begin{pmatrix} F_n \\\\ F_{n-1} \\end{pmatrix}$$

Therefore:
$$\\begin{pmatrix} F_{n+1} \\\\ F_n \\end{pmatrix} = \\begin{pmatrix} 1 & 1 \\\\ 1 & 0 \\end{pmatrix}^n \\begin{pmatrix} F_1 \\\\ F_0 \\end{pmatrix}$$

---

## 💻 Code

\`\`\`cpp
typedef vector<vector<long long>> Matrix;
const long long MOD = 1e9 + 7;

Matrix multiply(Matrix& A, Matrix& B) {
    int n = A.size();
    Matrix C(n, vector<long long>(n, 0));
    for (int i = 0; i < n; i++)
        for (int j = 0; j < n; j++)
            for (int k = 0; k < n; k++)
                C[i][j] = (C[i][j] + A[i][k] * B[k][j]) % MOD;
    return C;
}

Matrix matpow(Matrix A, long long p) {
    int n = A.size();
    Matrix result(n, vector<long long>(n, 0));
    for (int i = 0; i < n; i++) result[i][i] = 1;  // Identity
    
    while (p > 0) {
        if (p & 1) result = multiply(result, A);
        A = multiply(A, A);
        p >>= 1;
    }
    return result;
}

long long fib(long long n) {
    if (n <= 1) return n;
    Matrix A = {{1, 1}, {1, 0}};
    Matrix result = matpow(A, n - 1);
    return result[0][0];
}
\`\`\`

---

## 🎮 Other Recurrences

### General: $a_n = c_1 a_{n-1} + c_2 a_{n-2} + ... + c_k a_{n-k}$
\`\`\`cpp
// Transition matrix:
// | c1 c2 c3 ... ck |
// | 1  0  0  ... 0  |
// | 0  1  0  ... 0  |
// | ...             |
// | 0  0  ... 1  0  |
\`\`\`

### With constant term: $a_n = c_1 a_{n-1} + c$
Add extra row/column for the constant.

---

## 📚 Practice Problems

- [Fibonacci Sum (SPOJ)](https://www.spoj.com/problems/FIBOSUM/)
- [Random Mood (CF 1182E)](https://codeforces.com/problemset/problem/1182/E)
`,

    "2. Gaussian Elimination": `# Gaussian Elimination

## 🎯 Purpose
Solve system of linear equations. $O(n^3)$ complexity.

---

## 💻 Code

\`\`\`cpp
const double EPS = 1e-9;

int gauss(vector<vector<double>>& a) {
    int n = a.size(), m = a[0].size() - 1;
    
    int row = 0;
    for (int col = 0; col < m && row < n; col++) {
        // Find pivot
        int pivot = row;
        for (int i = row; i < n; i++)
            if (abs(a[i][col]) > abs(a[pivot][col]))
                pivot = i;
        
        if (abs(a[pivot][col]) < EPS) continue;
        
        swap(a[row], a[pivot]);
        
        // Eliminate
        for (int i = 0; i < n; i++) {
            if (i != row && abs(a[i][col]) > EPS) {
                double c = a[i][col] / a[row][col];
                for (int j = col; j <= m; j++)
                    a[i][j] -= a[row][j] * c;
            }
        }
        row++;
    }
    
    // Check for contradictions
    for (int i = row; i < n; i++)
        if (abs(a[i][m]) > EPS) return 0; // No solution
    
    return (row == m) ? 1 : 2; // 1 = unique, 2 = infinite
}
\`\`\`

---

## 🎮 XOR System (GF(2))
\`\`\`cpp
// Use bitset for efficiency
bitset<MAXN> a[MAXN];

void gaussXOR() {
    int row = 0;
    for (int col = 0; col < m && row < n; col++) {
        int pivot = -1;
        for (int i = row; i < n; i++)
            if (a[i][col]) { pivot = i; break; }
        
        if (pivot == -1) continue;
        swap(a[row], a[pivot]);
        
        for (int i = 0; i < n; i++)
            if (i != row && a[i][col])
                a[i] ^= a[row];
        row++;
    }
}
\`\`\`

---

## 📚 Practice Problems

- [XOR Equations (SPOJ)](https://www.spoj.com/problems/XOREQ/)
`,

    "3. Fast Fourier Transform (FFT)": `# Fast Fourier Transform (FFT)

## 🎯 Purpose
Multiply two polynomials of degree n in $O(n \\log n)$ instead of $O(n^2)$.

---

## 🧠 Idea
1. Evaluate polynomials at 2n points (roots of unity)
2. Point-wise multiply
3. Interpolate back (Inverse FFT)

---

## 💻 NTT (Number Theoretic Transform)
For modular arithmetic, use NTT with prime $p = 998244353$ (or others with primitive root).

\`\`\`cpp
const int MOD = 998244353;
const int g = 3;  // Primitive root

void ntt(vector<long long>& a, bool inv) {
    int n = a.size();
    for (int i = 1, j = 0; i < n; i++) {
        int bit = n >> 1;
        for (; j & bit; bit >>= 1) j ^= bit;
        j ^= bit;
        if (i < j) swap(a[i], a[j]);
    }
    
    for (int len = 2; len <= n; len <<= 1) {
        long long w = binpow(inv ? binpow(g, MOD-2, MOD) : g, 
                            (MOD-1) / len, MOD);
        for (int i = 0; i < n; i += len) {
            long long wn = 1;
            for (int j = 0; j < len/2; j++) {
                long long u = a[i+j];
                long long v = a[i+j+len/2] * wn % MOD;
                a[i+j] = (u + v) % MOD;
                a[i+j+len/2] = (u - v + MOD) % MOD;
                wn = wn * w % MOD;
            }
        }
    }
    if (inv) {
        long long n_inv = binpow(n, MOD-2, MOD);
        for (auto& x : a) x = x * n_inv % MOD;
    }
}

vector<long long> multiply(vector<long long> a, vector<long long> b) {
    int result_size = a.size() + b.size() - 1;
    int n = 1;
    while (n < result_size) n <<= 1;
    a.resize(n); b.resize(n);
    
    ntt(a, false); ntt(b, false);
    for (int i = 0; i < n; i++) a[i] = a[i] * b[i] % MOD;
    ntt(a, true);
    
    a.resize(result_size);
    return a;
}
\`\`\`

---

## 📚 Practice Problems

- [Polynomial Multiplication (CSES)](https://cses.fi/problemset/task/2111)
`,

    "4. Probability & Expectation": `# Probability & Expectation

## 🧠 Key Properties

**Linearity of Expectation** (doesn't require independence!):
$$E[X + Y] = E[X] + E[Y]$$

**Expected trials for success with probability p**:
$$E = \\frac{1}{p}$$

---

## 🎮 Patterns

### Indicator Random Variables
$X_i = 1$ if event i occurs, 0 otherwise.
$$E[\\text{count}] = \\sum E[X_i] = \\sum P(X_i = 1)$$

### Coupon Collector
Expected draws to get all n distinct coupons:
$$E = n \\cdot H_n = n \\cdot \\sum_{i=1}^n \\frac{1}{i}$$

---

## 💻 Expected Value DP

\`\`\`cpp
// Random walk: from position i, move to i+1 with prob p, else stay
// Expected steps to reach n starting from 0
double expected[MAXN];

void solve(int n, double p) {
    expected[n] = 0;
    for (int i = n-1; i >= 0; i--) {
        // expected[i] = 1 + p * expected[i+1] + (1-p) * expected[i]
        // expected[i] * p = 1 + p * expected[i+1]
        expected[i] = (1 + p * expected[i+1]) / p;
    }
}
\`\`\`

---

## 📚 Practice Problems

- [Journey (CF 839C)](https://codeforces.com/problemset/problem/839/C)
- [Expected Value (CSES)](https://cses.fi/problemset/task/1097)
`,

    "5. Geometry Fundamentals": `# Computational Geometry

## 🧠 Basics

### Cross Product
$$A \\times B = A_x B_y - A_y B_x$$

- Positive: B is counter-clockwise from A
- Negative: B is clockwise from A
- Zero: Collinear

### Area of Triangle
$$\\text{Area} = \\frac{1}{2} |\\vec{AB} \\times \\vec{AC}|$$

---

## 💻 Templates

\`\`\`cpp
struct Point {
    double x, y;
    Point operator-(Point p) { return {x - p.x, y - p.y}; }
    double cross(Point p) { return x * p.y - y * p.x; }
    double dot(Point p) { return x * p.x + y * p.y; }
    double norm() { return sqrt(x*x + y*y); }
};

double triangleArea(Point a, Point b, Point c) {
    return abs((b - a).cross(c - a)) / 2.0;
}

// 1 = left, -1 = right, 0 = on line
int orientation(Point a, Point b, Point c) {
    double v = (b - a).cross(c - a);
    if (v > EPS) return 1;
    if (v < -EPS) return -1;
    return 0;
}
\`\`\`

### Convex Hull (Andrew's Monotone Chain)
\`\`\`cpp
vector<Point> convexHull(vector<Point> pts) {
    sort(pts.begin(), pts.end(), [](Point& a, Point& b) {
        return a.x < b.x || (a.x == b.x && a.y < b.y);
    });
    
    vector<Point> hull;
    // Lower hull
    for (auto& p : pts) {
        while (hull.size() >= 2 && 
               (hull.back() - hull[hull.size()-2]).cross(p - hull.back()) <= 0)
            hull.pop_back();
        hull.push_back(p);
    }
    
    // Upper hull
    int lower_size = hull.size();
    for (int i = pts.size() - 2; i >= 0; i--) {
        while (hull.size() > lower_size && 
               (hull.back() - hull[hull.size()-2]).cross(pts[i] - hull.back()) <= 0)
            hull.pop_back();
        hull.push_back(pts[i]);
    }
    hull.pop_back();
    return hull;
}
\`\`\`

---

## 📚 Practice Problems

- [Polygon Area (CSES)](https://cses.fi/problemset/task/2191)
- [Convex Hull (CSES)](https://cses.fi/problemset/task/2195)
`,

    "6. Pigeonhole Principle": `# Pigeonhole Principle

## 🎯 Statement
If n+1 objects are placed in n boxes, at least one box has ≥2 objects.

---

## 🎮 Applications

### 1. Subset Sum Divisibility
**Claim**: Given n integers, there exists a contiguous subarray with sum divisible by n.

**Proof**: Consider prefix sums mod n. There are n values {0, 1, ..., n-1} and n+1 prefix sums. By pigeonhole, two prefix sums have same remainder. Their difference is divisible by n.

### 2. Birthday Paradox
With 23 people, probability of shared birthday > 50%.

### 3. Cycle Detection
In a sequence with finite domain, repetition must occur.

---

## 💻 Code Example

\`\`\`cpp
// Find subarray with sum divisible by n
pair<int,int> findSubarray(vector<int>& arr) {
    int n = arr.size();
    vector<int> prefixMod(n + 1);
    map<int, int> firstOccurrence;
    firstOccurrence[0] = 0;
    
    long long sum = 0;
    for (int i = 0; i < n; i++) {
        sum += arr[i];
        int mod = ((sum % n) + n) % n;
        
        if (firstOccurrence.count(mod))
            return {firstOccurrence[mod], i};
        firstOccurrence[mod] = i + 1;
    }
    return {-1, -1};
}
\`\`\`

---

## 📚 Practice Problems

- [Divisible Subset (CF 877B)](https://codeforces.com/problemset/problem/877/B)
`
};

async function update() {
    try {
        console.log('📚 Updating Combinatorics...');
        for (const [title, content] of Object.entries(combinatoricsContent)) {
            const res = await pool.query('UPDATE cp_topics SET content = $1 WHERE title = $2', [content, title]);
            console.log(res.rowCount > 0 ? '✅ ' + title : '⚠️ Not found: ' + title);
        }

        console.log('📚 Updating Advanced Math...');
        for (const [title, content] of Object.entries(advancedMathContent)) {
            const res = await pool.query('UPDATE cp_topics SET content = $1 WHERE title = $2', [content, title]);
            console.log(res.rowCount > 0 ? '✅ ' + title : '⚠️ Not found: ' + title);
        }

        console.log('🎉 Done!');
    } catch (err) {
        console.error('Error:', err);
    } finally {
        await pool.end();
    }
}

update();
