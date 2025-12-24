const { Pool } = require('pg');

const connectionString = process.env.DATABASE_URL || 'postgresql://postgres.xlqzqcqacpajpqwneqpa:05Supabase%40%40%3F%3F@aws-1-ap-south-1.pooler.supabase.com:6543/postgres';

const pool = new Pool({
    connectionString: connectionString,
    ssl: { rejectUnauthorized: false }
});

const updates = [
    {
        title: '1. Basics & Binomial Coefficients',
        content: `# Rules of Counting
1. **Rule of Sum**: If task A can be done in $m$ ways and B in $n$ ways (mutually exclusive), then A **or** B can be done in $m+n$ ways.
2. **Rule of Product**: If task A can be done in $m$ ways and B in $n$ ways, then A **and** B can be done in $m \\times n$ ways.

### Binomial Coefficient ($nCr$)
Number of ways to choose $r$ items from $n$ distinct items.
$$ \\binom{n}{r} = \\frac{n!}{r!(n-r)!} $$

### Properties
1. $$ \\binom{n}{r} = \\binom{n}{n-r} $$
2. $$ \\binom{n}{r} = \\binom{n-1}{r-1} + \\binom{n-1}{r} $$ (Pascal's Identity)
3. $$ \\sum_{i=0}^n \\binom{n}{i} = 2^n $$

### Computing $nCr \\pmod M$
Precompute factorials and their modular inverses.
\`\`\`cpp
long long nCr(int n, int r) {
    if (r < 0 || r > n) return 0;
    return fact[n] * invFact[r] % M * invFact[n - r] % M;
}
\`\`\`

### Practice Problems
- [nCr (GeeksForGeeks)](https://practice.geeksforgeeks.org/problems/ncr1019/1)
- [Pascal's Triangle (LeetCode)](https://leetcode.com/problems/pascals-triangle/)`
    },
    {
        title: '2. Catalan Numbers',
        content: `# Catalan Numbers ($C_n$)
Sequence: 1, 1, 2, 5, 14, 42, 132...

**Formula**:
$$ C_n = \\frac{1}{n+1} \\binom{2n}{n} $$

### Applications
1. Number of correct bracket sequences of length $2n$.
2. Number of full binary trees with $n+1$ leaves.
3. Ways to triangulate a convex polygon with $n+2$ sides.
4. Paths from $(0,0)$ to $(n,n)$ on grid without crossing diagonal.

### Code Template
\`\`\`cpp
// Using precomputed factorials
long long catalan(int n) {
    long long num = nCr(2 * n, n);
    long long den = modInverse(n + 1);
    return num * den % M;
}
\`\`\`

### Practice Problems
- [Trees and Brackets (Codeforces)](https://codeforces.com/problemset/problem/5/C)
- [Skyline (SPOJ)](https://www.spoj.com/problems/SKYLINE/)`
    },
    {
        title: '3. Stars and Bars',
        content: `# Stars and Bars Theorem
**Problem**: Number of ways to distribute $N$ identical items into $K$ distinct bins.

### Formula 1 (Bins can be empty)
$$ \\binom{N + K - 1}{K - 1} $$
Imagine $N$ stars ($*$) and $K-1$ bars ($|$). Any permutation represents a distribution.

### Formula 2 (Bins must contain at least 1)
$$ \\binom{N - 1}{K - 1} $$
Pre-place 1 item in each bin, then distribute remaining $N-K$ items.

### Practice Problems
- [Marbles (SPOJ)](https://www.spoj.com/problems/MARBLES/)
- [Combination Lock (Codeforces)](https://codeforces.com/problemset/problem/1090/M)`
    },
    {
        title: '4. Inclusion-Exclusion Principle',
        content: `# Inclusion-Exclusion Principle
To count size of union of sets, we sum sizes of individual sets, subtract intersections of pairs, add back intersections of triples, etc.

$$ |A \\cup B| = |A| + |B| - |A \\cap B| $$
$$ |A \\cup B \\cup C| = \\sum |A| - \\sum |A \\cap B| + |A \\cap B \\cap C| $$

### General Formula
$$ \\left| \\bigcup_{i=1}^n A_i \\right| = \\sum_{\\emptyset \\neq J \\subseteq \\{1,..,n\\}} (-1)^{|J|-1} \\left| \\bigcap_{j \\in J} A_j \\right| $$

### Coding (Bitmask)
Iterate $mask$ from $1$ to $2^N - 1$.
- If \`popcount(mask)\` is odd, **ADD** intersection of sets in mask.
- If \`popcount(mask)\` is even, **SUBTRACT** intersection.

### Practice Problems
- [The number of valid sets (Codeforces)](https://codeforces.com/problemset/problem/1169/C) - checks concepts
- [Count Multiples (Math)](https://atcoder.jp/contests/abc293/tasks/abc293_e) - often uses similar logic`
    },
    {
        title: '5. Lucas Theorem',
        content: `# Lucas Theorem
Used to compute $\\binom{n}{r} \\pmod p$ where $p$ is a **prime** (usually small).
$$ \\binom{n}{r} \\equiv \\prod_{i=0}^k \\binom{n_i}{r_i} \\pmod p $$
where $n = n_k p^k + ... + n_1 p + n_0$ and $r = r_k p^k + ... + r_1 p + r_0$ are base-$p$ expansions.

Basically:
$$ \\binom{n}{r} \\pmod p = \\binom{n \\% p}{r \\% p} \\times \\binom{n/p}{r/p} \\pmod p $$

### Code Template
\`\`\`cpp
long long nCr_mod_p(long long n, long long r, long long p) {
    if (r == 0) return 1;
    return (nCr_small(n % p, r % p, p) * nCr_mod_p(n / p, r / p, p)) % p;
}
\`\`\`

### Practice Problems
- [Lucas Theorem (Hackerrank)](https://www.hackerrank.com/challenges/ncr-lucas/problem)
- [A Gift (SPOJ)](https://www.spoj.com/problems/LUCAS/)`
    },
    {
        title: "6. Advanced: Burnside's Lemma",
        content: `# Burnside's Lemma
Number of distinct objects (orbits) under group symmetry operations.
$$ |X/G| = \\frac{1}{|G|} \\sum_{g \\in G} |X^g| $$
where $|X^g|$ is number of elements invariant under operation $g$.

### Polya Enumeration Theorem
Often used for coloring problems (e.g., coloring necklace beads).
**Number of colorings**:
$$ \\frac{1}{|G|} \\sum_{g \\in G} k^{c(g)} $$
where $c(g)$ is number of cycles in permutation $g$, and $k$ is number of colors.

### Practice Problems
- [Necklace (SPOJ)](https://www.spoj.com/problems/NECKLACE/)
- [Colored Beads (Codeforces)](https://codeforces.com/problemset/problem/356/D) - Hard`
    },
    {
        title: "1. Matrix Exponentiation",
        content: `# Matrix Exponentiation
**Goal**: Solve linear recurrence relations in $O(k^3 \\log n)$.
Example: Fibonacci $F_n = F_{n-1} + F_{n-2}$.

$$ \\begin{pmatrix} F_{n+1} \\\\ F_n \\end{pmatrix} = \\begin{pmatrix} 1 & 1 \\\\ 1 & 0 \\end{pmatrix} \\begin{pmatrix} F_n \\\\ F_{n-1} \\end{pmatrix} $$

### Algorithm
1. Construct the Transition Matrix $T$.
2. Compute $T^{n}$ using Binary Exponentiation.
3. Multiply $T^{n}$ with initial state vector.

### Code Template
\`\`\`cpp
struct Matrix { long long mat[2][2]; };
Matrix multiply(Matrix A, Matrix B) { ... }
Matrix power(Matrix A, long long p) { ... }
\`\`\`

### Practice Problems
- [Fibonacci Sum (SPOJ)](https://www.spoj.com/problems/FIBOSUM/)
- [Random Mood (Codeforces 291E)](https://codeforces.com/problemset/problem/1182/E)`
    },
    {
        title: "5. Geometry Fundamentals",
        content: `# Geometry Fundamentals
**Concepts**: Points, Lines, Vectors, Cross Product, Convex Hull.

### Cross Product ($A \\times B$)
$$ A \\times B = |A||B|\\sin\\theta $$

- **Positive**: B is left of A.
- **Negative**: B is right of A.
- **Zero**: Collinear.

**Area of Triangle**:
$$ 0.5 \\times |(B-A) \\times (C-A)| $$

### Convex Hull (Monotone Chain)
Sort points by X. Build upper and lower hulls using Cross Product to check turns.

### Practice Problems
- [Polygon Area (CSES)](https://cses.fi/problemset/task/2191)
- [Convex Hull (CSES)](https://cses.fi/problemset/task/2195)`
    },
    {
        title: "3. String Hashing (Rolling Hash)",
        content: `# String Hashing
**Goal**: Compare substrings in $O(1)$.
Map string to an integer ($Hash$).

$$ H(S) = (S[0] \\cdot P^0 + S[1] \\cdot P^1 + ... + S[n-1] \\cdot P^{n-1}) \\pmod M $$

### Rolling Hash
Compute hash of $S[i...j]$ using prefix hashes.
$$ Hash(i, j) = (Hash(0, j) - Hash(0, i-1)) \\cdot P^{-i} \\pmod M $$

*Note*: Use two different Modulo pairs to avoid collisions (Double Hash).

### Practice Problems
- [String Matching (CSES)](https://cses.fi/problemset/task/1753)
- [Good Substrings (Codeforces 271D)](https://codeforces.com/problemset/problem/271/D)`
    },
    {
        title: "2. Lowest Common Ancestor (LCA)",
        content: `# Lowest Common Ancestor (LCA)
Lowest node that is ancestor of both $u$ and $v$.

### Binary Lifting ($O(N \\log N)$ precompute, $O(\\log N)$ query)
Precompute \`up[u][i]\` = $2^i$-th ancestor of $u$.
$$ up[u][i] = up[up[u][i-1]][i-1] $$

### Finding LCA(u, v)
1. Lift deeper node to same depth as other.
2. If $u == v$, return $u$.
3. Lift both upwards while \`up[u][i] != up[v][i]\`.
4. Return \`up[u][0]\`.

### Distance(u, v)
$$ dist(u, v) = depth[u] + depth[v] - 2 \\times depth[LCA(u, v)] $$

### Practice Problems
- [Company Queries I (CSES)](https://cses.fi/problemset/task/1687)
- [Company Queries II (CSES)](https://cses.fi/problemset/task/1688) - Find LCA`
    },
    {
        title: "4. Tree Dynamic Programming",
        content: `# Tree DP
Solve problems by combining results from children.
**State**: $dp[u][state]$

### Max Independent Set on Tree
- $dp[u][0]$: Max set size if $u$ is NOT included.
  $$ \\sum \\max(dp[v][0], dp[v][1]) $$
- $dp[u][1]$: Max set size if $u$ IS included.
  $$ 1 + \\sum dp[v][0] $$

### Tree Distances
Find sum of distances from every node to all other nodes.
**Rerooting Technique**:
1. Compute for root (0).
2. Move root to neighbor, update answer in $O(1)$.

### Practice Problems
- [Tree Matching (CSES)](https://cses.fi/problemset/task/1130)
- [Tree Distances I (CSES)](https://cses.fi/problemset/task/1132)`
    },
    {
        title: "1. DP Fundamentals (1D & 2D)",
        content: `# Dynamic Programming
**Core Idea**: Break problem into Overlapping Subproblems and use Optimal Substructure.

### Memoization (Top-Down) vs Tabulation (Bottom-Up)
- **Memoization**: Recursive. Easier to write. Stores result of \`solve(state)\`.
- **Tabulation**: Iterative. Saves limits recursion depth. Filling table \`dp[i]\`.

### Standard Patterns
1. **Frog Jump**:
   $$ DP[i] = \\min(DP[i-1], DP[i-2]) + cost $$
2. **Vacation**: Pick max reward from activities without consecutive same choice.
3. **Grid Paths**: Unique paths from $(0,0)$ to $(R, C)$.

### Practice Problems
- [Frog 1 (AtCoder DP A)](https://atcoder.jp/contests/dp/tasks/dp_a)
- [Vacation (AtCoder DP C)](https://atcoder.jp/contests/dp/tasks/dp_c)`
    },
    {
        title: "3. Range DP (Intervals)",
        content: `# Range DP
Solve problem on interval $[L, R]$ by splitting into $[L, k]$ and $[k+1, R]$.
**Complexity**: Usually $O(N^3)$.
\`dp[len][i]\` where $j = i + len - 1$.

### Matrix Chain Multiplication (MCM)
Find min cost to multiply chain of matrices.
Cost to split at $k$:
$$ DP[L][k] + DP[k+1][R] + rows[L] \\cdot cols[k] \\cdot cols[R] $$

### Palindromes
Min cuts to make string palindrome, or Longest Palindromic Subsequence.

### Practice Problems
- [Matrix Chain Multiplication (GeeksForGeeks)](https://practice.geeksforgeeks.org/problems/matrix-chain-multiplication0303/1)
- [Slime (AtCoder DP N)](https://atcoder.jp/contests/dp/tasks/dp_n)`
    },
    {
        title: "5. DP Optimizations (CHT, SOS)",
        content: `# DP Optimizations

### Convex Hull Trick (CHT)
Optimize:
$$ DP[i] = \\min(DP[j] + b[j] \\cdot a[i]) $$
Equation looks like line $y = mx + c$.
Maintain lower/upper hull of lines to query min/max efficiently.
Complexity: $O(N^2) \\to O(N)$ or $O(N \\log N)$.

### SOS DP (Sum Over Subsets)
Compute:
$$ F[mask] = \\sum_{sub \\subseteq mask} A[sub] $$
Naive: $3^N$. SOS: $N \\cdot 2^N$.
Iterate through each bit and aggregate results.

### Practice Problems
- [Frog 3 (AtCoder DP Z)](https://atcoder.jp/contests/dp/tasks/dp_z) - CHT
- [Vowels (Codeforces 383E)](https://codeforces.com/problemset/problem/383/E) - SOS`
    },
    {
        title: "1. Impartial Games & Nim Sum",
        content: `# Game Theory Basics
**Impartial Game**: Available moves depend only on state, not on which player is moving.
**Normal Play**: Last player to move wins (no moves = lose).

### Nim Game
$N$ piles of stones. Players take any number from one pile.

**Theorem**:
1. Compute XOR sum:
   $$ S = A_1 \\oplus A_2 \\oplus ... \\oplus A_N $$
2. If $S \\neq 0$: **First** player wins (Winning State).
3. If $S == 0$: **Second** player wins (Losing State).

### Practice Problems
- [Nim Game I (CSES)](https://cses.fi/problemset/task/1730)
- [Nim Game II (CSES)](https://cses.fi/problemset/task/1098)`
    },
    {
        title: "2. Sprague-Grundy Theorem",
        content: `# Sprague-Grundy Theorem
Every impartial game under the normal play convention is equivalent to a Nim pile of a certain size.

### Grandy Number (Mex)
$$ G(State) = Mex(\\{ G(NextState) \\text{ for all moves} \\}) $$
**Mex (Minimum Excluded)**: Smallest non-negative integer **NOT** in the set.
- Win if $G(State) > 0$.
- Lose if $G(State) == 0$.

### Composite Games
If a game is composed of independent subgames:
$$ G(Total) = G(Sub_1) \\oplus G(Sub_2) \\oplus ... $$

### Practice Problems
- [Game of Stones (SPOJ)](https://www.spoj.com/problems/MCOINS/)
- [Grundy's Game (Codeforces)](https://codeforces.com/problemset/problem/1194/D)`
    }
];

async function fixAll() {
    try {
        console.log('🔧 Starting Bulk Content Update...');
        for (const update of updates) {
            const res = await pool.query(
                'UPDATE cp_topics SET content = $1 WHERE title = $2',
                [update.content, update.title]
            );
            if (res.rowCount > 0) {
                console.log(`✅ Updated: ${update.title}`);
            } else {
                console.warn(`⚠️ Topic not found: ${update.title}`);
            }
        }
        console.log('✨ All optimizations applied!');
        process.exit(0);
    } catch (err) {
        console.error('❌ Error:', err);
        process.exit(1);
    }
}

fixAll();
