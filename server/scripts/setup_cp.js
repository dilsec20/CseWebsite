const pool = require('../db');

const modules = [
    "Number Theory",
    "Bit Manipulation",
    "Combinatorics",
    "Advance Mathematics",
    "Greedy Algorithms",
    "Searching Techniques",
    "Must know Data Structures",
    "Pre-Computation",
    "Graph Algorithms",
    "Tree Algorithms",
    "Dynamic Programming",
    "Range Queries",
    "String Algorithms",
    "Game Theory",
    "Advanced Topics"
];

const numberTheoryTopics = [
    {
        title: "1. Basic Number Theory & Primality Test",
        content: `# Primality Test
**Intution**: A number $N$ is prime if it has exactly two divisors: 1 and $N$.
To check if a number is prime efficiently, we only need to check divisors up to $\\sqrt{N}$. If $N$ has a divisor greater than $\\sqrt{N}$, it must also have a corresponding divisor smaller than $\\sqrt{N}$.

### Code Template (C++)
\`\`\`cpp
bool isPrime(long long n) {
    if (n <= 1) return false;
    if (n <= 3) return true;
    if (n % 2 == 0 || n % 3 == 0) return false;
    for (long long i = 5; i * i <= n; i = i + 6)
        if (n % i == 0 || n % (i + 2) == 0)
            return false;
    return true;
}
\`\`\`
**Time Complexity**: $O(\\sqrt{N})$

### Practice Problems
- [Prime Generator (SPOJ)](https://www.spoj.com/problems/PRIME1/) - Easy
- [Checking for Primes](https://codeforces.com/problemset/problem/999/999) - Easy`
    },
    {
        title: "2. Sieve of Eratosthenes",
        content: `# Sieve of Eratosthenes
**Concept**: An efficient algorithm to find all prime numbers up to a specified integer $N$.
**Algorithm**:
1. Create a boolean array \`isPrime[0..N]\` and initialize all entries as true.
2. Mark 0 and 1 as false.
3. For $p = 2$ to $\\sqrt{N}$:
    If \`isPrime[p]\` is true, loop through all multiples of $p$ starting from $p*p$ and mark them as false.

### Code Template
\`\`\`cpp
const int MAXN = 1000000;
bool is_prime[MAXN + 1];

void sieve() {
    fill(is_prime, is_prime + MAXN + 1, true);
    is_prime[0] = is_prime[1] = false;
    for (int p = 2; p * p <= MAXN; p++) {
        if (is_prime[p]) {
            for (int i = p * p; i <= MAXN; i += p)
                is_prime[i] = false;
        }
    }
}
\`\`\`
**Time Complexity**: $O(N \\log \\log N)$
**Tips**:
- Global arrays are initialized to 0 (false) by default in C++.
- You can compute primes up to $10^7$ in ~1 second.

### Practice Problems
- [TDKPRIME - Finding the Kth Prime](https://www.spoj.com/problems/TDKPRIME/)
- [Sherlock and his girlfriend (Codeforces 776B)](https://codeforces.com/problemset/problem/776/B)`
    },
    {
        title: "3. Euclidean Algorithm (GCD & LCM)",
        content: `# GCD & LCM
**GCD (Greatest Common Divisor)**: The largest number that divides both $A$ and $B$.
**LCM (Least Common Multiple)**: The smallest number divisible by both $A$ and $B$.

**Relationship**: $A \\times B = GCD(A, B) \\times LCM(A, B)$

### Euclidean Algorithm
\`\`\`cpp
long long gcd(long long a, long long b) {
    if (b == 0) return a;
    return gcd(b, a % b);
}

// C++ Built-in (recommended)
// #include <numeric>
// std::gcd(a, b);
\`\`\`

### Extended Euclidean Algorithm
Used to find integer solutions for $ax + by = gcd(a, b)$. Useful for finding Modular Inverse.

\`\`\`cpp
long long extended_gcd(long long a, long long b, long long &x, long long &y) {
    if (b == 0) {
        x = 1; y = 0;
        return a;
    }
    long long x1, y1;
    long long d = extended_gcd(b, a % b, x1, y1);
    x = y1;
    y = x1 - y1 * (a / b);
    return d;
}
\`\`\`

### Practice Problems
- [GCD and LCM (CodeChef)](https://www.codechef.com/problems/FLOW016)
- [Complicated GCD (Codeforces 664A)](https://codeforces.com/problemset/problem/664/A)`
    },
    {
        title: "4. Binary Exponentiation (Modular Pow)",
        content: `# Binary Exponentiation
**Goal**: Compute $a^b$ efficiently in $O(\\log b)$.
**Idea**: 
$a^{13} = a^{1101_2} = a^8 \\cdot a^4 \\cdot a^1$

### Code Template
\`\`\`cpp
long long binpow(long long a, long long b, long long m) {
    a %= m;
    long long res = 1;
    while (b > 0) {
        if (b & 1) res = res * a % m;
        a = a * a % m;
        b >>= 1;
    }
    return res;
}
\`\`\`
**Tip**: Always handle negative bases using \`(a % m + m) % m\`.

### Practice Problems
- [Big Mod (UVA 374)](https://onlinejudge.org/index.php?option=com_onlinejudge&Itemid=8&category=5&page=show_problem&problem=310)
- [Parking Lot (Codeforces 630I)](https://codeforces.com/problemset/problem/630/I)`
    },
    {
        title: "5. Linear Diophantine Equations",
        content: `# Linear Diophantine Equations
**Equation**: $ax + by = c$
A linear Diophantine equation has a solution if and only if $c$ is a multiple of $g = GCD(a, b)$.
If a solution $(x_0, y_0)$ exists, then all other solutions are given by:
$x = x_0 + k \\frac{b}{g}$
$y = y_0 - k \\frac{a}{g}$

### Finding a Solution
Use **Extended Euclidean Algorithm** to find $x_g, y_g$ such that $a x_g + b y_g = g$.
Then multiply by $c/g$ to get specific solution.

### Code Template
\`\`\`cpp
bool find_any_solution(long long a, long long b, long long c, long long &x0, long long &y0, long long &g) {
    g = extended_gcd(abs(a), abs(b), x0, y0);
    if (c % g) return false;
    x0 *= c / g;
    y0 *= c / g;
    if (a < 0) x0 = -x0;
    if (b < 0) y0 = -y0;
    return true;
}
\`\`\`

### Practice Problems
- [Ebony and Ivory (Codeforces 633A)](https://codeforces.com/problemset/problem/633/A) - Beginner
- [Get AC (AtCoder)](https://atcoder.jp/contests/abc186/tasks/abc186_e) - Application`
    },
    {
        title: "6. Euler's Totient Function (Phi)",
        content: `# Euler's Totient Function ($\\phi$)
**Definition**: $\\phi(n)$ is the number of integers $k$ in range $[1, n]$ such that $GCD(k, n) = 1$.
**Formula**: If prime factorization $n = p_1^{a_1} p_2^{a_2} ...$, then:
$\\phi(n) = n \\cdot (1 - \\frac{1}{p_1}) \\cdot (1 - \\frac{1}{p_2}) \\cdots$

### Properties
1. If $p$ is prime, $\\phi(p) = p - 1$.
2. **Euler's Theorem**: $a^{\\phi(m)} \\equiv 1 \\pmod m$ if $GCD(a, m) = 1$.

### Code Template
\`\`\`cpp
long long phi(long long n) {
    long long result = n;
    for (long long i = 2; i * i <= n; i++) {
        if (n % i == 0) {
            while (n % i == 0)
                n /= i;
            result -= result / i;
        }
    }
    if (n > 1)
        result -= result / n;
    return result;
}
\`\`\`
**Complexity**: $O(\\sqrt{N})$

### Practice Problems
- [ETF - Euler Totient Function (SPOJ)](https://www.spoj.com/problems/ETF/)
- [Power Tower (Codeforces 906D)](https://codeforces.com/problemset/problem/906/D) - Hard`
    },
    {
        title: "7. Modular Inverse",
        content: `# Modular Inverse
**Goal**: Find $x$ such that $A \\cdot x \\equiv 1 \\pmod M$.
Exists only if $GCD(A, M) = 1$.

### Method 1: Fermat's Little Theorem
If $M$ is prime, then $A^{M-2} \\pmod M$ is the inverse.
\`\`\`cpp
long long modInverse(long long n, long long m) {
    return binpow(n, m - 2, m);
}
\`\`\`

### Method 2: Extended Euclidean
Works for any $M$ (not just primes), as long as coprime.
Find $x, y$ for $Ax + My = 1$. Then $(x \\% M + M) \\% M$ is the inverse.

### Practice Problems
- [Modular Inverse (Hackerrank)](https://www.hackerrank.com/challenges/modular-1d-array-c/problem)
- [Beautiful Numbers (Codeforces 300C)](https://codeforces.com/problemset/problem/300/C) - Combinatorics`
    },
    {
        title: "8. Chinese Remainder Theorem (CRT)",
        content: `# Chinese Remainder Theorem
**Problem**: Solve system of congruences:
$x \\equiv a_1 \\pmod{m_1}$
$x \\equiv a_2 \\pmod{m_2}$yes
...
where all $m_i$ are pairwise coprime.

**Theorem**: There exists a unique solution for $x$ modulo $M = m_1 \\times m_2 \\times ...$

### Garner's Algorithm approach (Generic)
Often sufficient to solve for 2 equations and merge:
$x = a_1 + m_1 \\cdot k$
$a_1 + m_1 k \\equiv a_2 \\pmod{m_2}$
$m_1 k \\equiv a_2 - a_1 \\pmod{m_2}$
Multiply by $m_1^{-1} \\pmod{m_2}$ to find $k$.

### Practice Problems
- [Strange Food Chain (SPOJ)](https://www.spoj.com/problems/CHAIN/)
- [Remainders Game (Codeforces 687B)](https://codeforces.com/problemset/problem/687/B)
- [Biathlon 2.0 (Codeforces 840C)](https://codeforces.com/problemset/problem/840/C) - Very Hard`
    }
];

const bitManipulationTopics = [
    {
        title: "1. Bitwise Operators & Basics",
        content: `# Bitwise Operators
Basic operators in C++:
- \`&\` (AND): 1 if both bits are 1.
- \`|\` (OR): 1 if at least one bit is 1.
- \`^\` (XOR): 1 if bits are different.
- \`~\` (NOT): Inverts all bits (one's complement).
- \`<<\` (Left Shift): \`a << b\` multiplies $a$ by $2^b$.
- \`>>\` (Right Shift): \`a >> b\` divides $a$ by $2^b$.

### Truth Table (XOR)
| A | B | A^B |
|---|---|---|
| 0 | 0 | 0 |
| 0 | 1 | 1 |
| 1 | 0 | 1 |
| 1 | 1 | 0 |

### Complexity
All bitwise operations are $O(1)$ (CPU native instructions).

### Practice Problems
- [A+B (Trial Problem)](https://codeforces.com/problemset/problem/1/A)
- [Sum of Two Integers (LeetCode)](https://leetcode.com/problems/sum-of-two-integers/)`
    },
    {
        title: "2. Common Bit Tricks",
        content: `# Useful Bit Tricks
1. **Check if Odd**: \`if (n & 1)\` (Faster than \`n % 2\`)
2. **Check if Power of 2**: \`n > 0 && !(n & (n - 1))\`
3. **Turn off Rightmost Set Bit**: \`n = n & (n - 1)\`
4. **Get Rightmost Set Bit**: \`lsb = n & -n\`
5. **Set k-th bit**: \`n | (1 << k)\`
6. **Unset k-th bit**: \`n & ~(1 << k)\`
7. **Toggle k-th bit**: \`n ^ (1 << k)\`

### Code Template
\`\`\`cpp
bool isPowerOfTwo(int n) {
    return n > 0 && (n & (n - 1)) == 0;
}
int countSetBits(int n) {
    int count = 0;
    while (n > 0) {
        n &= (n - 1); // remove last set bit
        count++;
    }
    return count;
}
\`\`\`

### Practice Problems
- [Raising Bacteria (Codeforces 579A)](https://codeforces.com/problemset/problem/579/A)
- [Fedor and New Game (Codeforces 467B)](https://codeforces.com/problemset/problem/467/B)`
    },
    {
        title: "3. Built-in Functions & Optimization",
        content: `# C++ Built-in Functions
GCC provides optimized functions mapping directly to CPU instructions.
1. \`__builtin_popcount(n)\`: Count set bits in \`int\`.
   - Use \`__builtin_popcountll(n)\` for \`long long\`.
2. \`__builtin_clz(n)\`: Count Leading Zeros.
3. \`__builtin_ctz(n)\`: Count Trailing Zeros.

### C++ std::bitset
Useful for handling bitmasks larger than 64 bits.
\`\`\`cpp
#include <bitset>
bitset<100> b;
b[5] = 1;
cout << b.count(); // Number of set bits
\`\`\`

### Practice Problems
- [Preparing Olympiad (Codeforces 550B)](https://codeforces.com/problemset/problem/550/B)
- [Petr and a Combination Lock (Codeforces 1097B)](https://codeforces.com/problemset/problem/1097/B)`
    },
    {
        title: "4. XOR Properties",
        content: `# Properties of XOR
1. $x \\oplus x = 0$
2. $x \\oplus 0 = x$
3. $x \\oplus y = y \\oplus x$ (Commutative)
4. $(x \\oplus y) \\oplus z = x \\oplus (y \\oplus z)$ (Associative)

**Key Application**:
In an array where every element appears twice except one, find that unique element.
Solution: XOR all elements. $Result = UniqueElement$.

### Code Template (Swap Logic)
\`\`\`cpp
void swap(int &a, int &b) {
    a ^= b;
    b ^= a;
    a ^= b;
}
\`\`\`

### Practice Problems
- [Mahmoud and Ehab and the xor-MST (Codeforces 959C)](https://codeforces.com/problemset/problem/959/C)
- [XORwice (Codeforces 1421A)](https://codeforces.com/problemset/problem/1421/A)`
    },
    {
        title: "5. Bitmasking on Sets & Numbers",
        content: `# Bitmasking on Sets
Represent a subset of elements $S = \\{0, 1, ..., N-1\\}$ as an integer.
If $k$-th bit is 1, element $k$ is in subset.

### Iterate all Subsets ($O(2^N)$)
\`\`\`cpp
for (int mask = 0; mask < (1 << n); mask++) {
    // Process mask
    for (int i = 0; i < n; i++) {
        if (mask & (1 << i)) {
            // Element i is in subset
        }
    }
}
\`\`\`

### Tricks
- **Iterate submasks of a mask**:
  \`for (int s = m; s; s = (s-1)&m)\` ... $O(3^N)$ over all masks.
- **Check Subset**: \`(A & B) == A\` implies A is a subset of B.

### Practice Problems
- [Apple Division (CSES)](https://cses.fi/problemset/task/1623)
- [Bars (Codeforces 258A)](https://codeforces.com/problemset/problem/258/A)`
    },
    {
        title: "6. Bitmasking on Strings",
        content: `# Bitmasking on Strings
Often used to represent the set of characters present in a string.
Since there are only 26 lowercase English letters, a 32-bit integer is perfect.

### Technique
\`\`\`cpp
int getMask(string s) {
    int mask = 0;
    for (char c : s) {
        mask |= (1 << (c - 'a'));
    }
    return mask;
}
\`\`\`

### Applications
- Checking if two strings share common characters: \`if (mask1 & mask2)\`
- Counting unique characters: \`__builtin_popcount(mask)\`
- Palindrome Permutation Check: Mask should have at most 1 bit set.

### Practice Problems
- [Jzzhu and Sequences (Codeforces 450B)](https://codeforces.com/problemset/problem/450/B)
- [Maximal And (Codeforces 1669H)](https://codeforces.com/problemset/problem/1669/H)`
    },
    {
        title: "7. Bitmask DP (Introduction)",
        content: `# Bitmask DP
Used when constraints are small ($N \\le 20$) and state depends on "what set of elements has been used".

### Standard State
\`dp[mask][last_element]\`: Cost/Ways to reach state represented by \`mask\`, ending at \`last_element\`.

### TSP (Travelling Salesman Problem)
Finding shortest path visiting every city exactly once.
\`\`\`cpp
int dp[1<<20][20];
int tsp(int mask, int pos) {
    if (mask == (1<<n) - 1) return dist[pos][0]; // Return to start
    if (dp[mask][pos] != -1) return dp[mask][pos];

    int ans = INF;
    for (int city = 0; city < n; city++) {
        if ((mask & (1<<city)) == 0) { // If city not visited
            ans = min(ans, dist[pos][city] + tsp(mask | (1<<city), city));
        }
    }
    return dp[mask][pos] = ans;
}
\`\`\`

### Practice Problems
- [Matching (AtCoder DP Contest)](https://atcoder.jp/contests/dp/tasks/dp_o)
- [Assignment Problem (SPOJ)](https://www.spoj.com/problems/ASSIGN/)`
    },
    {
        title: "8. Advanced: Linear Basis (XOR Basis)",
        content: `# Linear Basis (XOR Basis)
**Concept**: A minimal set of numbers (Basis) that can represent any number in an array via XOR combinations.
Size of Basis $\\le \\log(\\max A_i)$ (approx 30 or 60).

### Algorithm (Insert)
To insert $x$ into basis:
1. Iterate $i$ from high bit (e.g. 60) down to 0.
2. If $x$ has bit $i$ set:
   - If basis has no element at $basis[i]$, set $basis[i] = x$ and stop.
   - Else, $x = x \\oplus basis[i]$.

### Applications
1. Max XOR subset sum.
2. K-th smallest XOR sum.

### Code Template
\`\`\`cpp
vector<int> basis;
void insert(int mask) {
    for (int x : basis)
        mask = min(mask, mask ^ x);
    if (mask > 0) {
        basis.push_back(mask);
        sort(basis.rbegin(), basis.rend());
    }
}
\`\`\`

### Practice Problems
- [XOR Maximization (Codeforces 242E)](https://codeforces.com/problemset/problem/242/E)
- [Basis (CodeChef)](https://www.codechef.com/problems/XORBASIS)`
    }
];

const combinatoricsTopics = [
    {
        title: "1. Basics & Binomial Coefficients",
        content: `# Rules of Counting
1. **Rule of Sum**: If task A can be done in $m$ ways and B in $n$ ways (mutually exclusive), then A **or** B can be done in $m+n$ ways.
2. **Rule of Product**: If task A can be done in $m$ ways and B in $n$ ways, then A **and** B can be done in $m \\times n$ ways.

### Binomial Coefficient ($nCr$)
Number of ways to choose $r$ items from $n$ distinct items.
$\\binom{n}{r} = \\frac{n!}{r!(n-r)!}$

### Properties
1. $\\binom{n}{r} = \\binom{n}{n-r}$
2. $\\binom{n}{r} = \\binom{n-1}{r-1} + \\binom{n-1}{r}$ (Pascal's Identity)
3. $\\sum_{i=0}^n \\binom{n}{i} = 2^n$

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
        title: "2. Catalan Numbers",
        content: `# Catalan Numbers ($C_n$)
Sequence: 1, 1, 2, 5, 14, 42, 132...
**Formula**: $C_n = \\frac{1}{n+1} \\binom{2n}{n}$

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
        title: "3. Stars and Bars",
        content: `# Stars and Bars Theorem
**Problem**: Number of ways to distribute $N$ identical items into $K$ distinct bins.

### Formula 1 (Bins can be empty)
$\\binom{N + K - 1}{K - 1}$
Imagine $N$ stars ($*$) and $K-1$ bars ($|$). Any permutation represents a distribution.

### Formula 2 (Bins must check contain at least 1)
$\\binom{N - 1}{K - 1}$
Pre-place 1 item in each bin, then distribute remaining $N-K$ items.

### Practice Problems
- [Marbles (SPOJ)](https://www.spoj.com/problems/MARBLES/)
- [Combination Lock (Codeforces)](https://codeforces.com/problemset/problem/1090/M)`
    },
    {
        title: "4. Inclusion-Exclusion Principle",
        content: `# Inclusion-Exclusion Principle
To count size of union of sets, we sum sizes of individual sets, subtract intersections of pairs, add back intersections of triples, etc.

$|A \\cup B| = |A| + |B| - |A \\cap B|$
$|A \\cup B \\cup C| = \\sum |A| - \\sum |A \\cap B| + |A \\cap B \\cap C|$

### General Formula
$\\left| \\bigcup_{i=1}^n A_i \\right| = \\sum_{\\emptyset \\neq J \\subseteq \\{1,..,n\\}} (-1)^{|J|-1} \\left| \\bigcap_{j \\in J} A_j \\right|$

### Coding (Bitmask)
Iterate $mask$ from $1$ to $2^N - 1$.
- If \`popcount(mask)\` is odd, **ADD** intersection of sets in mask.
- If \`popcount(mask)\` is even, **SUBTRACT** intersection.

### Practice Problems
- [The number of valid sets (Codeforces)](https://codeforces.com/problemset/problem/1169/C) - checks concepts
- [Count Multiples (Math)](https://atcoder.jp/contests/abc293/tasks/abc293_e) - often uses similar logic`
    },
    {
        title: "5. Lucas Theorem",
        content: `# Lucas Theorem
Used to compute $\\binom{n}{r} \\pmod p$ where $p$ is a **prime** (usually small).
$\\binom{n}{r} \\equiv \\prod_{i=0}^k \\binom{n_i}{r_i} \\pmod p$
where $n = n_k p^k + ... + n_1 p + n_0$ and $r = r_k p^k + ... + r_1 p + r_0$ are base-$p$ expansions.

Basically, $\\binom{n}{r} \\pmod p = \\binom{n \\% p}{r \\% p} \\times \\binom{n/p}{r/p} \\pmod p$.

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
$|X/G| = \\frac{1}{|G|} \\sum_{g \\in G} |X^g|$
where $|X^g|$ is number of elements invariant under operation $g$.

### Polya Enumeration Theorem
Often used for coloring problems (e.g., coloring necklace beads).
Number of colorings = $\\frac{1}{|G|} \\sum_{g \\in G} k^{c(g)}$
where $c(g)$ is number of cycles in permutation $g$, and $k$ is number of colors.

### Practice Problems
- [Necklace (SPOJ)](https://www.spoj.com/problems/NECKLACE/)
- [Colored Beads (Codeforces)](https://codeforces.com/problemset/problem/356/D) - Hard`
    }
];

const advancedMathTopics = [
    {
        title: "1. Matrix Exponentiation",
        content: `# Matrix Exponentiation
**Goal**: Solve linear recurrence relations in $O(k^3 \\log n)$.
Example: Fibonacci $F_n = F_{n-1} + F_{n-2}$.
$\\begin{pmatrix} F_{n+1} \\\\ F_n \\end{pmatrix} = \\begin{pmatrix} 1 & 1 \\\\ 1 & 0 \\end{pmatrix} \\begin{pmatrix} F_n \\\\ F_{n-1} \\end{pmatrix}$

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
        title: "2. Gaussian Elimination",
        content: `# Gaussian Elimination
**Goal**: Solve system of linear equations $Ax = B$.
$O(N^3)$ complexity.

### Algorithm
1. Forward Elimination: Convert $A$ to Row Echelon Form.
2. Back Substitution: Solve for variables starting from last.

### XOR Basis (System of Equations over GF(2))
Can be solved using Bitsets in $O(N^3 / 64)$.

### Practice Problems
- [XOR Equations (SPOJ)](https://www.spoj.com/problems/XOREQ/)
- [Linear Equations (Timus)](https://acm.timus.ru/problem.aspx?space=1&num=1042)`
    },
    {
        title: "3. Fast Fourier Transform (FFT)",
        content: `# Fast Fourier Transform (FFT)
**Goal**: Multiply two polynomials of degree $N$ in $O(N \\log N)$.
Naive multiplication is $O(N^2)$.

### Concept
1. Evaluate polynomials at $2n$-th roots of unity (DFT).
2. Point-wise multiply values.
3. Interpolate back to coefficients (Inverse DFT).

### Number Theoretic Transform (NTT)
Same as FFT but under modulo $P$ (usually $P = 998244353$).
Avoids floating point errors.

### Practice Problems
- [Polynomial Multiplication (CSES)](https://cses.fi/problemset/task/1671)
- [Vanya and Label (Codeforces 577B)](https://codeforces.com/problemset/problem/577/B) - Application`
    },
    {
        title: "4. Probability & Expectation",
        content: `# Probability & Expectation
**Expectation (Linearity)**: $E[X+Y] = E[X] + E[Y]$.
Independent events not required for linearity!

### Expected Number of Trials
If probability of success is $p$, expected trials to get first success is $1/p$.

### Dynamic Programming with Probability
$dp[i]$ = expected steps to reach end from state $i$.
$dp[i] = 1 + \\sum P(i \\to j) \\cdot dp[j]$
Solve system of linear equations (Gaussian Elimination) if cyclic.

### Practice Problems
- [New Year and K Permutations (Codeforces)](https://codeforces.com/problemset/problem/460/C)
- [Journey (Codeforces 839C)](https://codeforces.com/problemset/problem/839/C)`
    },
    {
        title: "5. Geometry Fundamentals",
        content: `# Geometry Fundamentals
**Concepts**: Points, Lines, Vectors, Cross Product, Convex Hull.

### Cross Product ($A \\times B$)
$A \\times B = |A||B|\\sin\\theta$.
- Positive: B is left of A.
- Negative: B is right of A.
- Zero: Collinear.
**Area of Triangle**: $0.5 \\times |(B-A) \\times (C-A)|$.

### Convex Hull (Monotone Chain)
Sort points by X. Build upper and lower hulls using Cross Product to check turns.

### Practice Problems
- [Polygon Area (CSES)](https://cses.fi/problemset/task/2191)
- [Convex Hull (CSES)](https://cses.fi/problemset/task/2195)`
    },
    {
        title: "6. Pigeonhole Principle",
        content: `# Pigeonhole Principle
**Statement**: If $N$ items are put into $M$ containers and $N > M$, at least one container has $>1$ item.

### Applications
- Proving existence.
- Divisibility problems (e.g., subset sum divisible by N).

### Example
Given $N$ integers, there exists a subarray with sum divisible by $N$.
**Proof**: Consider prefix sums mod $N$. There are $N$ possible remainders. Since there are $N+1$ prefix sums (including 0), two must be same. Their difference corresponds to a subarray sum divisible by $N$.

### Practice Problems
- [Divisible Subset (Codeforces)](https://codeforces.com/problemset/problem/877/B) - Logic check
- [Holiday of Equality (Codeforces)](https://codeforces.com/problemset/problem/758/A)`
    }
];

const dataStructuresTopics = [
    {
        title: "1. Stack & Monotonic Stack",
        content: `# Stack & Monotonic Stack
**LIFO**: Last In First Out.

### Monotonic Stack
Maintains elements in increasing or decreasing order.
Used to find **Next Greater Element (NGE)** or **Previous Smaller Element (PSE)** in $O(N)$.

### Algorithm (NGE)
Iterate array. While stack top < current, pop (current is NGE for popped). Push current.

### Applications
- Largest Rectangle in Histogram.
- Daily Temperatures.

### Practice Problems
- [Next Greater Element (Next Greater Element II LeetCode)](https://leetcode.com/problems/next-greater-element-ii/)
- [Largest Rectangle in Histogram (LeetCode)](https://leetcode.com/problems/largest-rectangle-in-histogram/)`
    },
    {
        title: "2. Queue & Deque (Sliding Window)",
        content: `# Queue & Deque
**FIFO**: First In First Out.
**Deque**: Double-ended queue (insert/delete at both ends).

### Sliding Window Maximum
Find max in every window of size $K$.
**Solution**: Use Deque to store indices of potential max elements. Remove elements out of window from front. Remove elements smaller than current from back (monotonic deque).

### Practice Problems
- [Sliding Window Maximum (LeetCode)](https://leetcode.com/problems/sliding-window-maximum/)
- [Queries with Fixed Length (Hackerrank)](https://www.hackerrank.com/challenges/queries-with-fixed-length/problem)`
    },
    {
        title: "3. Min & Max Heaps (Priority Queue)",
        content: `# Priority Queue (Heap)
Efficiently access the highest (Max Heap) or lowest (Min Heap) priority element.
Insert: $O(\\log N)$, Extract: $O(\\log N)$, Peek: $O(1)$.

### Applications
- Dijkstra's Algorithm.
- Median finding.
- Greedy strategy execution.

### C++ STL
\`priority_queue<int>\` (Max Heap)
\`priority_queue<int, vector<int>, greater<int>>\` (Min Heap)

### Practice Problems
- [Running Median (Find Median from Data Stream LeetCode)](https://leetcode.com/problems/find-median-from-data-stream/)
- [Merge k Sorted Lists (LeetCode)](https://leetcode.com/problems/merge-k-sorted-lists/)`
    },
    {
        title: "4. Set & Hash Table (Map)",
        content: `# Set & Map
### std::set / std::map (Balanced BST)
- Ordered.
- $O(\\log N)$ operations.
- Good for range queries (lower_bound).

### std::unordered_set / std::unordered_map (Hash Table)
- Unordered.
- $O(1)$ average, $O(N)$ worst case.
- Vulnerable to hash collisions (custom hash needed for CP).

### Custom Hash (Anti-Hack)
\`\`\`cpp
struct custom_hash {
    static uint64_t splitmix64(uint64_t x) { ... }
    size_t operator()(uint64_t x) const { ... }
};
\`\`\`

### Practice Problems
- [Registration System (Codeforces 4C)](https://codeforces.com/problemset/problem/4/C)
- [Radio Station (Codeforces 918B)](https://codeforces.com/problemset/problem/918/B)`
    },
    {
        title: "5. Policy Based Data Structures (PBDS)",
        content: `# Policy Based Data Structures
C++ Extensions (GCC) that provide ordered sets with indexing.
**Header**: \`#include <ext/pb_ds/assoc_container.hpp>\`

### Features
1. \`find_by_order(k)\`: Returns iterator to $k$-th smallest element ($0$-indexed).
2. \`order_of_key(x)\`: Returns number of elements strictly smaller than $x$.

### Definition
\`\`\`cpp
using namespace __gnu_pbds;
typedef tree<int, null_type, less<int>, rb_tree_tag, tree_order_statistics_node_update> ordered_set;
\`\`\`

### Practice Problems
- [Order Statistic Set (SPOJ)](https://www.spoj.com/problems/ORDERSET/)
- [Enemy is weak (Codeforces 61E)](https://codeforces.com/problemset/problem/61/E) - Inversion counting`
    }
];

const searchingTopics = [
    {
        title: "1. Binary Search Fundamentals",
        content: `# Binary Search
Search in a sorted array in $O(\\log N)$.

### Functions (C++ STL)
1. \`binary_search(start, end, val)\`: Returns true/false.
2. \`lower_bound(start, end, val)\`: Iterator to first element $\\ge val$.
3. \`upper_bound(start, end, val)\`: Iterator to first element $> val$.

### Custom Implementation
\`\`\`cpp
int l = 0, r = n - 1, ans = -1;
while (l <= r) {
    int mid = l + (r - l) / 2;
    if (arr[mid] >= target) {
        ans = mid;
        r = mid - 1;
    } else {
        l = mid + 1;
    }
}
\`\`\`

### Practice Problems
- [Binary Search (LeetCode)](https://leetcode.com/problems/binary-search/)
- [Worms (Codeforces 474B)](https://codeforces.com/problemset/problem/474/B)`
    },
    {
        title: "2. Binary Search on Answer",
        content: `# Binary Search on Answer
**Pattern**: We want to find the Min/Max value $X$ such that a condition $Possible(X)$ is true.
If $Possible(X)$ is true, then it is usually true for all $Y > X$ (or $Y < X$). This monotonicity allows Binary Search.

### Template
\`\`\`cpp
bool check(long long x) {
    // Return true if x is feasible
}

long long l = 0, r = 1e18, ans = -1;
while (l <= r) {
    long long mid = l + (r - l) / 2;
    if (check(mid)) {
        ans = mid;
        r = mid - 1; // Try smaller (for minimization)
    } else {
        l = mid + 1;
    }
}
\`\`\`

### Practice Problems
- [Aggressive Cows (SPOJ)](https://www.spoj.com/problems/AGGRCOW/)
- [Factory Machines (CSES)](https://cses.fi/problemset/task/1620)`
    },
    {
        title: "3. Ternary Search",
        content: `# Ternary Search
Used to find the maximum/minimum of a **Unimodal Function** (increases then decreases, or vice versa).
$O(\\log N)$ complexity.

### Algorithm
Dividing range $[L, R]$ into 3 parts using $m1$ and $m2$.
- If $f(m1) < f(m2)$, max is not in $[L, m1]$. New range: $[m1, R]$.
- Else, max is not in $[m2, R]$. New range: $[L, m2]$.

### Code Template
\`\`\`cpp
while (r - l > EPS) {
    double m1 = l + (r - l) / 3;
    double m2 = r - (r - l) / 3;
    if (f(m1) < f(m2)) l = m1;
    else r = m2;
}
\`\`\`
For integers, iterate while \`r - l > 2\` and do linear scan at end.

### Practice Problems
- [Weakness and Poorness (Codeforces 578C)](https://codeforces.com/problemset/problem/578/C)
- [Restoring the Expression (Codeforces)](https://codeforces.com/problemset/problem/1149/A)`
    },
    {
        title: "4. Interactive Problems",
        content: `# Interactive Problems
You write a program that interacts with a judge program via Standard I/O.
**Key**: Flush output after every print!
\`cout << query << endl;\` or \`fflush(stdout);\`.

### Guess the number
Judge has hidden number $X$. You can ask "Is $X \\ge Y$?".
Use Binary Search.

### Practice Problems
- [Guess section (Codeforces Gym)](https://codeforces.com/gym/101021/problem/1)
- [Bear and Prime 100 (Codeforces 679A)](https://codeforces.com/problemset/problem/679/A)
- [Lost Numbers (Codeforces 1167B)](https://codeforces.com/problemset/problem/1167/B)`
    }
];

const greedyTopics = [
    {
        title: "1. Standard Greedy Algorithms",
        content: `# Standard Greedy
Make the locally optimal choice at each step to find global optimum.
**Prerequisite**: Problem must have optimal substructure & greedy property.

### Activity Selection
Pick maximum number of non-overlapping activities.
**Strategy**: Sort by **Finish Time**. Pick first, then pick next compatible.

### Huffman Coding
Lossless compression.
**Strategy**: Build tree bottom-up. Always merge two nodes with smallest frequencies. Use Min-Priority Queue.

### Practice Problems
- [Activity Selection (SPOJ)](https://www.spoj.com/problems/BUSYMAN/)
- [Huffman Coding (GeeksForGeeks)](https://practice.geeksforgeeks.org/problems/huffman-encoding3345/1)`
    },
    {
        title: "2. Greedy on Arrays",
        content: `# Greedy on Arrays
Often involves sorting or two-pointer approach.

### Techniques
1. **Sort**: Makes it easy to pick "best" or "worst".
2. **Two Pointers**: Match smallest with largest, etc.
3. **Prefix Sums**: Optimize range queries/decisions.

### Example: Merge Intervals
Sort by start time. Merge if $start[i] \\le end[last]$.

### Practice Problems
- [Dragons (Codeforces 230A)](https://codeforces.com/problemset/problem/230/A)
- [Chat Room (Codeforces 58A)](https://codeforces.com/problemset/problem/58/A)`
    },
    {
        title: "3. Priority Queue Greedy",
        content: `# Priority Queue Greedy
Use a Heap to efficiently fetch the current max/min element.

### Applications
1. **Dijkstra's Algorithm** (Shortest Path).
2. **Merging K sorted arrays**.
3. **Running Median**.

### Problem Pattern
"Find $k$ largest elements" or "Repeatedly remove smallest/largest".

### Practice Problems
- [Potions (Codeforces 1526C1)](https://codeforces.com/problemset/problem/1526/C1)
- [Productive Meeting (Codeforces 1579D)](https://codeforces.com/problemset/problem/1579/D)`
    },
    {
        title: "4. Exchange Arguments (Sorting)",
        content: `# Exchange Arguments
How to decide the sorting order for a greedy strategy?
**Technique**: Assume optimal order. Swap two adjacent elements. If cost improves (or stays same), then the swapped order is better. Derive condition.

### Example
Minimize $\\sum (A_i \\times B_i)$ by rearranging $A$.
Result: Sort $A$ ascending, $B$ descending (Rearrangement Inequality).

### Practice Problems
- [Watering the Fields (SPOJ)](https://www.spoj.com/problems/PRO/)
- [Queen (Codeforces 1144F)](https://codeforces.com/problemset/problem/1144/F) - Bipartite check but greedy feel`
    }
];

const preComputationTopics = [
    {
        title: "1. 1D & 2D Prefix Sums (Arrays)",
        content: `# Prefix Sums
**Goal**: Compute sum of subarray $[L, R]$ in $O(1)$.
**Pre-computation**: $O(N)$.
$P[i] = P[i-1] + arr[i]$.
$Sum(L, R) = P[R] - P[L-1]$.

### 2D Prefix Sums
Compute sum of sub-rectangle $(x1, y1)$ to $(x2, y2)$.
$P[i][j] = A[i][j] + P[i-1][j] + P[i][j-1] - P[i-1][j-1]$.
$Sum = P[x2][y2] - P[x1-1][y2] - P[x2][y1-1] + P[x1-1][y1-1]$.

### Practice Problems
- [Static Range Sum (CSES)](https://cses.fi/problemset/task/1646)
- [Forest Queries (CSES)](https://cses.fi/problemset/task/1652)`
    },
    {
        title: "2. Difference Arrays (Range Updates)",
        content: `# Difference Arrays
**Goal**: Add $X$ to all elements in range $[L, R]$ in $O(1)$.
**Reconstruction**: $O(N)$ prefix sum.

### Technique
Array $D[i] = A[i] - A[i-1]$.
To update $[L, R]$ by $+Val$:
1. $D[L] += Val$
2. $D[R+1] -= Val$

After all updates, run prefix sum on $D$ to get final array $A$.

### Practice Problems
- [Greg and Array (Codeforces 295A)](https://codeforces.com/problemset/problem/295/A)
- [Little Girl and Maximum Sum (Codeforces 276C)](https://codeforces.com/problemset/problem/276/C)`
    },
    {
        title: "3. String Hashing (Rolling Hash)",
        content: `# String Hashing
**Goal**: Compare substrings in $O(1)$.
Map string to an integer ($Hash$).
$H(S) = (S[0] \\cdot P^0 + S[1] \\cdot P^1 + ... + S[n-1] \\cdot P^{n-1}) \\pmod M$.

### Rolling Hash
Compute hash of $S[i...j]$ using prefix hashes.
$Hash(i, j) = (Hash(0, j) - Hash(0, i-1)) \\cdot P^{-i} \\pmod M$.
*Note*: Use two different Modulo pairs to avoid collisions (Double Hash).

### Practice Problems
- [String Matching (CSES)](https://cses.fi/problemset/task/1753)
- [Good Substrings (Codeforces 271D)](https://codeforces.com/problemset/problem/271/D)`
    },
    {
        title: "4. Prefix/Suffix Computation on Strings",
        content: `# Prefix/Suffix Computation
Often used in Palindrome or construction problems.

### Technique
Precompute:
1. **Prefix Max/Min**: $Pre[i] = \\max(Pre[i-1], arr[i])$.
2. **Suffix Max/Min**: $Suf[i] = \\max(Suf[i+1], arr[i])$.
3. **Prefix/Suffix Palindromes**: Using Manacher's or Hashing.

### Example Problem
Find index $i$ such that removing $S[i]$ makes string lexicographically smallest.

### Practice Problems
- [Prefix-Suffix Palindrome (Codeforces 1326D1)](https://codeforces.com/problemset/problem/1326/D1)
- [Kuroni and the Gifts (Codeforces 1305C)](https://codeforces.com/problemset/problem/1305/C)`
    }
];

const graphTopics = [
    {
        title: "1. DFS & BFS Fundamentals",
        content: `# Graph Traversals
### DFS (Depth First Search)
Recursive. Good for: Connectivity, Cycle Detection, Topological Sort.
**Complexity**: $O(V+E)$.

### BFS (Breadth First Search)
Queue-based. Good for: Shortest Path in Unweighted Graph.
**Multi-source BFS**: Push all starting nodes to queue initially with dist=0.

### 0-1 BFS (Deque)
Find shortest path in graph with edge weights 0 or 1.
- If weight 0: Push front.
- If weight 1: Push back.
**Complexity**: $O(V+E)$.

### Bipartite Check
Color nodes 0 and 1. If neighbor has same color -> impossible.

### Practice Problems
- [Rumor (Codeforces 893C)](https://codeforces.com/problemset/problem/893/C)
- [0-1 BFS Tutorial (Codeforces)](https://codeforces.com/blog/entry/22276)`
    },
    {
        title: "2. Shortest Path Algorithms",
        content: `# Shortest Paths

### Dijkstra's Algorithm ($O(E \\log V)$)
Single Source Shortest Path (Non-negative weights).
**State-Space Dijkstra**: Nodes can be $(u, state)$, e.g., reaching $u$ with $k$ fuel.
\`\`\`cpp
priority_queue<pair<long long, int>, vector<pair<long long, int>>, greater<>> pq;
pq.push({0, start});
dist[start] = 0;
while(!pq.empty()) {
    long long d = pq.top().first;
    int u = pq.top().second;
    pq.pop();
    if (d > dist[u]) continue;
    for (auto& edge : adj[u]) {
        if (dist[u] + edge.w < dist[edge.to]) {
            dist[edge.to] = dist[u] + edge.w;
            pq.push({dist[edge.to], edge.to});
        }
    }
}
\`\`\`

### Bellman-Ford
Handles negative weights. Detects negative cycles. $O(VE)$.

### Floyd-Warshall
All-pairs shortest path. $O(V^3)$.
\`dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j])\`

### Practice Problems
- [Dijkstra? (Codeforces 20C)](https://codeforces.com/problemset/problem/20/C)
- [Shortest Routes I (CSES)](https://cses.fi/problemset/task/1671)`
    },
    {
        title: "3. DSU & MST",
        content: `# Disjoint Set Union (DSU) & MST

### DSU (Union-Find)
Manages disjoint sets. Operations: \`find(x)\`, \`unite(x, y)\`.
**Optimization**: Path Compression + Union by Rank -> $\\alpha(N)$ (nearly constant).

### Kruskal's Algorithm (MST)
Sort edges by weight. Iterate and unite if endpoints are in different sets.
**Complexity**: $O(E \\log E)$.

### Applications
- Connected components management.
- Offline dynamic connectivity.

### Practice Problems
- [Road Reparation (CSES)](https://cses.fi/problemset/task/1675)
- [Mocha and Diana (Codeforces 1559D1)](https://codeforces.com/problemset/problem/1559/D1)`
    },
    {
        title: "4. DAG & Topological Sort",
        content: `# DAG & Topological Sort
**DAG**: Directed Acyclic Graph.

### Topological Sort (Kahn's Algorithm)
1. Compute in-degrees.
2. Push nodes with in-degree 0 to queue.
3. Process queue: remove node, decrement neighbor in-degrees. If becomes 0, push.
**Cycle Detection**: If count of processed nodes < $V$, cycle exists.

### Longest Path in DAG
DP or Memoization.
\`dp[u] = 1 + max(dp[v])\` for all neighbors $v$.

### Practice Problems
- [Course Schedule (LeetCode)](https://leetcode.com/problems/course-schedule-ii/)
- [Game Routes (CSES)](https://cses.fi/problemset/task/1681)`
    },
    {
        title: "5. Advanced Connectivity (Bridges, SCC)",
        content: `# Advanced Graphs

### Bridges & Articulation Points
**Bridge**: Edge whose removal increases connected components.
**Algorithm**: DFS Tree + Low-Link values.
\`low[u] = min(tin[u], tin[v], low[v])\`.
Bridge if \`low[v] > tin[u]\`.

### Strongly Connected Components (SCC)
Set of nodes where every node is reachable from every other node.
**Kosaraju's Algorithm**:
1. DFS and store finish order.
2. Transpose graph (reverse edges).
3. DFS on transposed graph in reverse finish order.

### Practice Problems
- [Critical Connections (LeetCode)](https://leetcode.com/problems/critical-connections-in-a-network/)
- [Checkposts (Codeforces 427C)](https://codeforces.com/problemset/problem/427/C)`
    },
    {
        title: "6. Grid Graphs & Matrix Algorithms",
        content: `# Grid Graphs
Treat a 2D Matrix as a graph where cells $(r, c)$ are nodes and adjacent cells are neighbors.
**Direction Arrays**: \`dx = {0, 0, 1, -1}\`, \`dy = {1, -1, 0, 0}\`.

### 1. Matrix DFS/BFS
**Template**: "Number of Islands" / "Connected Components".
\`\`\`cpp
void dfs(int r, int c) {
    vis[r][c] = true;
    for(int i=0; i<4; i++) {
        int nr = r + dx[i], nc = c + dy[i];
        if(isValid(nr, nc) && !vis[nr][nc]) dfs(nr, nc);
    }
}
\`\`\`

### 2. Multi-Source BFS on Grid
**Pattern**: "Rotting Oranges" / "Minimum distance from any monster".
Push all sources to Queue with \`dist=0\`. Run standard BFS.

### 3. Dijkstra on Grid
Min-Cost Path in a weighted grid.
State in PQ: \`{cost, r, c}\`.
\`\`\`cpp
pq.push({0, r, c});
while(!pq.empty()) {
    auto [d, r, c] = pq.top(); pq.pop();
    if(d > dist[r][c]) continue;
    // ... visit neighbors
}
\`\`\`

### 4. Grid DP (Graph style)
Find number of paths or max/min path sum.
\`dp[r][c] = dp[r-1][c] + dp[r][c-1]\`.

### Practice Problems
- [Counting Rooms (CSES)](https://cses.fi/problemset/task/1192)
- [Labyrinth (CSES)](https://cses.fi/problemset/task/1193)
- [Minimum Path Sum (LeetCode)](https://leetcode.com/problems/minimum-path-sum/)`
    }
];

const treeTopics = [
    {
        title: "1. Tree Basics & Traversal",
        content: `# Tree Basics
**Tree**: A connected acyclic graph with $N$ nodes and $N-1$ edges.

### Tree Diameter
Longest path between any two nodes.
**Algorithm (2-DFS)**:
1. DFS from arbitrary node $u$ to find farthest node $x$.
2. DFS from $x$ to find farthest node $y$.
3. Distance $(x, y)$ is diameter.

### Tree Center
Middle node(s) of the diameter.
Used in "Minimum Height Tree" problems.

### Practice Problems
- [Tree Diameter (CSES)](https://cses.fi/problemset/task/1131)
- [Subordinates (CSES)](https://cses.fi/problemset/task/1674)`
    },
    {
        title: "2. Lowest Common Ancestor (LCA)",
        content: `# Lowest Common Ancestor (LCA)
Lowest node that is ancestor of both $u$ and $v$.

### Binary Lifting ($O(N \\log N)$ precompute, $O(\\log N)$ query)
Precompute \`up[u][i]\` = $2^i$-th ancestor of $u$.
\`up[u][i] = up[up[u][i-1]][i-1]\`.

### Finding LCA(u, v)
1. Lift deeper node to same depth as other.
2. If $u == v$, return $u$.
3. Lift both upwards while \`up[u][i] != up[v][i]\`.
4. Return \`up[u][0]\`.

### Distance(u, v)
$dist(u, v) = depth[u] + depth[v] - 2 \\times depth[LCA(u, v)]$.

### Practice Problems
- [Company Queries I (CSES)](https://cses.fi/problemset/task/1687)
- [Company Queries II (CSES)](https://cses.fi/problemset/task/1688) - Find LCA`
    },
    {
        title: "3. Tree Flattening (Euler Tour)",
        content: `# Tree Flattening
Convert tree into an array (DFS traversal order) to answer subtree queries.

### Technique
Record **Entry Time** ($tin[u]$) and **Exit Time** ($tout[u]$) for each node.
Subtree of $u$ corresponds to range $[tin[u], tout[u]]$ in the linear array.
Allows using Fenwick Tree/Segment Tree for subtree updates/queries.

### Practice Problems
- [Subtree Queries (CSES)](https://cses.fi/problemset/task/1137)
- [Path Queries (CSES)](https://cses.fi/problemset/task/1138)`
    },
    {
        title: "4. Tree Dynamic Programming",
        content: `# Tree DP
Solve problems by combining results from children.
**State**: $dp[u][state]$

### Max Independent Set on Tree
$dp[u][0]$: Max set size if $u$ is NOT included. $\\sum \\max(dp[v][0], dp[v][1])$.
$dp[u][1]$: Max set size if $u$ IS included. $1 + \\sum dp[v][0]$.

### Tree Distances
Find sum of distances from every node to all other nodes.
**Rerooting Technique**:
1. Compute for root (0).
2. Move root to neighbor, update answer in $O(1)$.

### Practice Problems
- [Tree Matching (CSES)](https://cses.fi/problemset/task/1130)
- [Tree Distances I (CSES)](https://cses.fi/problemset/task/1132)`
    }
];

const dpTopics = [
    {
        title: "1. DP Fundamentals (1D & 2D)",
        content: `# Dynamic Programming
**Core Idea**: Break problem into Overlapping Subproblems and use Optimal Substructure.

### Memoization (Top-Down) vs Tabulation (Bottom-Up)
- **Memoization**: Recursive. Easier to write. Stores result of \`solve(state)\`.
- **Tabulation**: Iterative. Saves limits recursion depth. Filling table \`dp[i]\`.

### Standard Patterns
1. **Frog Jump**: $DP[i] = min(DP[i-1], DP[i-2]) + cost$.
2. **Vacation**: Pick max reward from activities without consecutive same choice.
3. **Grid Paths**: Unique paths from $(0,0)$ to $(R, C)$.

### Practice Problems
- [Frog 1 (AtCoder DP A)](https://atcoder.jp/contests/dp/tasks/dp_a)
- [Vacation (AtCoder DP C)](https://atcoder.jp/contests/dp/tasks/dp_c)`
    },
    {
        title: "2. Classic Problems (Knapsack, LIS, LCS)",
        content: `# Classic DP Problems

### 0/1 Knapsack
Items have weight $w_i$ and value $v_i$. Maximize value within capacity $W$.
State: \`dp[i][rem_weight]\`.
**Space Optimization**: Use 1D array \`dp[w]\` iterating backwards.

### Longest Increasing Subsequence (LIS)
Find length of longest subsequence where elements are increasing.
- $O(N^2)$: \`dp[i] = max(dp[j] + 1)\` if \`a[i] > a[j]\`.
- $O(N \\log N)$: Patience sorting (Binary Search).

### Longest Common Subsequence (LCS)
$DP[i][j]$ = LCS of $S1[0..i]$ and $S2[0..j]$.
- If $S1[i] == S2[j]$: $1 + DP[i-1][j-1]$.
- Else: $max(DP[i-1][j], DP[i][j-1])$.

### Practice Problems
- [Knapsack 1 (AtCoder DP D)](https://atcoder.jp/contests/dp/tasks/dp_d)
- [LCS (AtCoder DP F)](https://atcoder.jp/contests/dp/tasks/dp_f)`
    },
    {
        title: "3. Range DP (Intervals)",
        content: `# Range DP
Solve problem on interval $[L, R]$ by splitting into $[L, k]$ and $[k+1, R]$.
**Complexity**: Usually $O(N^3)$.
\`dp[len][i]\` where $j = i + len - 1$.

### Matrix Chain Multiplication (MCM)
Find min cost to multiply chain of matrices.
Cost to split at $k$: $DP[L][k] + DP[k+1][R] + rows[L] \\cdot cols[k] \\cdot cols[R]$.

### Palindromes
Min cuts to make string palindrome, or Longest Palindromic Subsequence.

### Practice Problems
- [Matrix Chain Multiplication (GeeksForGeeks)](https://practice.geeksforgeeks.org/problems/matrix-chain-multiplication0303/1)
- [Slime (AtCoder DP N)](https://atcoder.jp/contests/dp/tasks/dp_n)`
    },
    {
        title: "4. Digit DP & Bitmask DP",
        content: `# Advanced DP Techniques

### Digit DP
Count numbers in range $[L, R]$ satisfying property.
**State**: \`dp[pos][tight][state]\`.
- \`pos\`: Current digit position (from left).
- \`tight\`: Are we restricted by the number $R$?
- \`state\`: Problem specific (sum of digits, mask of seen digits).

### Bitmask DP (Small N <= 20)
Represent set of visited nodes / used items as an integer bitmask.
**Traveling Salesman Problem (TSP)**: Min cost to visit all cities.
\`dp[mask][last_city]\`.

### Practice Problems
- [Digit Sum (SPOJ)](https://www.spoj.com/problems/PR003004/)
- [Matching (AtCoder DP O)](https://atcoder.jp/contests/dp/tasks/dp_o) - Bitmask`
    },
    {
        title: "5. DP Optimizations (CHT, SOS)",
        content: `# DP Optimizations

### Convex Hull Trick (CHT)
Optimize $DP[i] = min(DP[j] + b[j] \\cdot a[i])$.
Equation looks like line $y = mx + c$.
Maintain lower/upper hull of lines to query min/max efficiently.
Complexity: $O(N^2) \\to O(N)$ or $O(N \\log N)$.

### SOS DP (Sum Over Subsets)
Compute $F[mask] = \\sum_{sub \\subseteq mask} A[sub]$.
Naive: $3^N$. SOS: $N \\cdot 2^N$.
Iterate through each bit and aggregate results.

### Practice Problems
- [Frog 3 (AtCoder DP Z)](https://atcoder.jp/contests/dp/tasks/dp_z) - CHT
- [Vowels (Codeforces 383E)](https://codeforces.com/problemset/problem/383/E) - SOS`
    },
    {
        title: "6. Master DP: Patterns & Constraints",
        content: `# How to Think in DP
**Checklist**:
1. **Optimization/Counting?**: "Max value", "Min cost", "Count ways".
2. **Choice at each step?**: "Pick or Leave", "Cut here", "Move Left/Right".
3. **Overlapping Subproblems?**: Does solving for \`i\` help solve for \`i+1\`?

### Constraint Guide (Guess complexity)
- $N \\le 20$: **Bitmask DP** ($O(2^N \\cdot N)$).
- $N \\le 100$: **Range DP** ($O(N^3)$) or **Knapsack** ($O(N \\cdot W)$).
- $N \\le 1000$: **2D DP** ($O(N^2)$).
- $N \\le 10^5$: **1D DP** + Optimization (Binary Search, Segment Tree) ($O(N \\log N)$).

### Common Tricks
1. **Coordinate Compression**: If values are large ($10^9$) but $N$ is small, map values to $0..N$.
2. **State Reduction**: If \`dp[i][j]\` only depends on \`dp[i-1]\`, use 2 rows or 1D array.
3. **Total - Bad**: Count total ways and subtract invalid ones (often easier).

### Debugging
- **Print Table**: For small inputs ($N=5$), print the full DP table.
- **Base Cases**: Check $N=0, N=1$ boundaries carefully.

### Practice Problems
- [Boredom (Codeforces 455A)](https://codeforces.com/problemset/problem/455/A) - Frequency Array DP
- [Flowers (Codeforces 474D)](https://codeforces.com/problemset/problem/474/D) - Precompute + Prefix Sums`
    }
];

const rangeQueryTopics = [
    {
        title: "1. Sparse Table (Static RMQ)",
        content: `# Sparse Table
Efficient for **Static Range Queries** (Immutable array).
**Build**: $O(N \\log N)$. **Query**: $O(1)$ for Idempotent (Min/Max/GCD), $O(\\log N)$ for Sum.

### Idea
$ST[i][j]$ stores answer for range $[i, i + 2^j - 1]$ (length $2^j$).
$ST[i][j] = op(ST[i][j-1], ST[i + 2^{j-1}][j-1])$.

### Query
Overlap two ranges of length $2^k$.
$min(L, R) = min(ST[L][k], ST[R - 2^k + 1][k])$.

### Practice Problems
- [Static Range Minimum Queries (CSES)](https://cses.fi/problemset/task/1647)
- [Catapult that ball (SPOJ)](https://www.spoj.com/problems/THRBL/)`
    },
    {
        title: "2. Fenwick Tree (Binary Indexed Tree)",
        content: `# Fenwick Tree (BIT)
Efficient for **Point Update** and **Range Prefix Sum**.
**Complexity**: $O(\\log N)$ for both.
**Code Length**: Very short (~10 lines).

### Operations
- \`add(index, delta)\`: Adds val to element.
- \`query(index)\`: Returns sum of $[1, index]$.
- \`range_sum(l, r)\`: \`query(r) - query(l-1)\`.

### Inversion Count
Standard application: Count how many elements > current element appeared before.

### Practice Problems
- [Dynamic Range Sum Queries (CSES)](https://cses.fi/problemset/task/1648)
- [Inversion Count (SPOJ)](https://www.spoj.com/problems/INVCNT/)`
    },
    {
        title: "3. Segment Tree (Lazy Propagation)",
        content: `# Segment Tree
The Swiss Army Knife of Range Queries.
**Supports**: Range Updates, Range Queries for ANY associative property (Sum, Min, Max, GCD, XOR).
**Complexity**: $O(\\log N)$. Space: $4N$.

### Lazy Propagation
Defers updates to children to guarantee $O(\\log N)$ for Range Updates.
1. If node has pending update, apply it and push to children.
2. If distinct overlap, return.
3. If total overlap, update node and mark lazy.

### Practice Problems
- [Dynamic Range Minimum Queries (CSES)](https://cses.fi/problemset/task/1649)
- [Range Update Queries (CSES)](https://cses.fi/problemset/task/1651)`
    },
    {
        title: "4. Mo's Algorithm (Square Root Decomposition)",
        content: `# Mo's Algorithm
Offline query optimization using **Square Root Decomposition**.
Sorts queries in a specific order to minimize movement of pointers ($L, R$).
**Complexity**: $O((N+Q) \\sqrt N)$.

### Sorting Strategy
Sort by block of $L$ ($L / \\text{BLOCK}$), then by $R$.
Move current range $[curL, curR]$ to query range $[L, R]$ by adding/removing elements one by one.

### Practice Problems
- [Distinct Values Queries (CSES)](https://cses.fi/problemset/task/1734)
- [Powerful Array (Codeforces 86D)](https://codeforces.com/problemset/problem/86/D)`
    },
    {
        title: "5. Strategy: Handling TLE/MLE & Optimization",
        content: `# Optimization Strategy
**Got TLE?** Check constraints.
1. **$N \\le 10^5$**: Algorithm must be $O(N)$ or $O(N \\log N)$.
   - Nested loops ($O(N^2)$)? $\\to$ Use **Segment Tree / Fenwick / Sorting**.
2. **$N \\le 2000$**: $O(N^2)$ is fine.
3. **Query limit?**: Many queries? Pre-compute or use DS.

### DP vs Greedy
- **Greedy**: Fast ($O(N \\log N)$). Valid if "local best = global best".
  - *Check*: Exchange argument. Can I swap two items and improve?
- **DP**: Slower ($O(N^2)$). Required if future decisions depend on current state history.
  - *MLE?* State too big? Use Iterative DP with % 2 (for 2 rows only) or coordinate compression.

### Debugging TLE/MLE
- **TLE**: Infinite loop? Slow I/O (\`cin.tie\`)? Constantly creating vectors inside loops?
- **MLE**: $10^8$ integers $\\approx$ 400MB. Don't declare \`dp[10000][10000]\` (100MB+). Use \`vector\` or optimize state.

### Practice Problems
- [Queries for Number of Palindromes (Codeforces 245H)](https://codeforces.com/problemset/problem/245/H) - DP + Optimization
- [Ant Colony (Codeforces 474F)](https://codeforces.com/problemset/problem/474/F) - SegTree Application`
    }
];

const stringTopics = [
    {
        title: "1. KMP Algorithm (Pattern Matching)",
        content: `# KMP Algorithm
Find all occurrences of Pattern $P$ in Text $T$ in $O(N+M)$.

### Prefix Function ($\\pi$ / LPS)
$\\pi[i]$ = Length of the longest proper prefix of $S[0..i]$ that is also a suffix of $S[0..i]$.
**Construction**:
\`\`\`cpp
for (int i = 1; i < n; i++) {
    int j = pi[i-1];
    while (j > 0 && s[i] != s[j]) j = pi[j-1];
    if (s[i] == s[j]) j++;
    pi[i] = j;
}
\`\`\`

### Applications
- Pattern Search (Search $P + \# + T$).
- String Periodicity.

### Practice Problems
- [String Matching (CSES)](https://cses.fi/problemset/task/1753)
- [Password (Codeforces 126B)](https://codeforces.com/problemset/problem/126/B)`
    },
    {
        title: "2. Z-Algorithm",
        content: `# Z-Algorithm
Constructs Z-array where $Z[i]$ is the length of the longest common prefix between $S$ and the suffix starting at $S[i]$.
**Constraint**: $O(N)$.

### Comparison with KMP
Simpler to understand "Prefix of Suffix" concept.
Often used interchangeably with KMP.

### Code Template
\`\`\`cpp
for (int i = 1, l = 0, r = 0; i < n; i++) {
    if (i <= r) z[i] = min(r - i + 1, z[i - l]);
    while (i + z[i] < n && s[z[i]] == s[i + z[i]]) z[i]++;
    if (i + z[i] - 1 > r) l = i, r = i + z[i] - 1;
}
\`\`\`

### Practice Problems
- [Prefixes and Suffixes (Codeforces 432D)](https://codeforces.com/problemset/problem/432/D)
- [Password (Codeforces)](https://codeforces.com/problemset/problem/126/B) - Solvable with Z-Algo too`
    },
    {
        title: "3. Manacher's Algorithm",
        content: `# Manacher's Algorithm
Finds longest palindromic substring centered at EACH position in $O(N)$.
Handles odd and even length palindromes (using \`#\` separators).

### Output
Returns array $P[i]$ where $P[i]$ is the radius of palindrome at center $i$.
Max Length = $max(P[i]) - 1$.

### Practice Problems
- [Longest Palindrome (CSES)](https://cses.fi/problemset/task/1111)
- [Palindromic characteristics (Codeforces 600C)](https://codeforces.com/problemset/problem/600/C)`
    },
    {
        title: "4. Trie (Prefix Tree)",
        content: `# Trie (Prefix Tree)
Efficiently store and query strings.
**Operations**: Insert $O(L)$, Search $O(L)$, Prefix Count.

### XOR Trie (Binary Trie)
Insert numbers as 30-bit binary strings.
**Application**: Find pair with Max XOR.
Traverse bits from MSB. If we want bit '1', try to go to '0' branch (to make XOR 1).

### Code Template
\`\`\`cpp
struct Node { Trie *child[26]; int count; };
void insert(string s) {
    Node* curr = root;
    for(char c : s) {
        if(!curr->child[c-'a']) curr->child[c-'a'] = new Node();
        curr = curr->child[c-'a'];
        curr->count++;
    }
}
\`\`\`

### Practice Problems
- [Word Combinations (CSES)](https://cses.fi/problemset/task/1731) - Trie + DP
- [Maximum XOR Subarray (CSES)](https://cses.fi/problemset/task/1655) - Binary Trie`
    }
];

const gameTheoryTopics = [
    {
        title: "1. Impartial Games & Nim Sum",
        content: `# Game Theory Basics
**Impartial Game**: Available moves depend only on state, not on which player is moving.
**Normal Play**: Last player to move wins (no moves = lose).

### Nim Game
$N$ piles of stones. Players take any number from one pile.
**Theorem**:
- Compute XOR sum $S = A_1 \\oplus A_2 \\oplus ... \\oplus A_N$.
- If $S \neq 0$: **First** player wins (Winning State).
- If $S == 0$: **Second** player wins (Losing State).

### Practice Problems
- [Nim Game I (CSES)](https://cses.fi/problemset/task/1730)
- [Nim Game II (CSES)](https://cses.fi/problemset/task/1098)`
    },
    {
        title: "2. Sprague-Grundy Theorem",
        content: `# Sprague-Grundy Theorem
Every impartial game under the normal play convention is equivalent to a Nim pile of a certain size.

### Grandy Number (Mex)
$G(State) = Mex({ G(NextState) \\text{ for all moves} })$.
**Mex (Minimum Excluded)**: Smallest non-negative integer NOT in the set.
- Win if $G(State) > 0$.
- Lose if $G(State) == 0$.

### Composite Games
If a game is composed of independent subgames:
$G(Total) = G(Sub_1) \\oplus G(Sub_2) \\oplus ...$

### Practice Problems
- [Game of Stones (SPOJ)](https://www.spoj.com/problems/MCOINS/)
- [Grundy's Game (Codeforces)](https://codeforces.com/problemset/problem/1194/D)`
    },
    {
        title: "3. Minimax Algorithm (Zero-Sum)",
        content: `# Minimax Algorithm
Used for games like Chess, Tic-Tac-Toe (Perfect Information, Deterministic).
**Goal**: Maximize your score, assuming opponent minimizes it.

### Algorithm
DFS on game state tree.
- **Max Node** (Your turn): $Value = max(Children)$.
- **Min Node** (Opponent turn): $Value = min(Children)$.

### Practice Problems
- [Predict the Winner (LeetCode)](https://leetcode.com/problems/predict-the-winner/)
- [Can I Win (LeetCode)](https://leetcode.com/problems/can-i-win/)`
    }
];

const advancedTopics = [
    {
        title: "1. Tree Decompositions (HLD & Centroid)",
        content: `# Advanced Tree Algorithms

### Heavy-Light Decomposition (HLD)
Decomposes tree into "heavy" paths.
**Goal**: Path queries/updates in $O(\\log^2 N)$.
**Tech**: Segment Tree over flattened array where heavy paths are contiguous.

### Centroid Decomposition
Divide and Conquer on Trees.
**Centroid**: Node whose removal splits tree into subtrees of size $\\le N/2$.
**Goal**: Path counting (e.g., pairs with distance $K$) in $O(N \\log N)$.

### Practice Problems
- [Path Queries II (CSES)](https://cses.fi/problemset/task/2134) - HLD
- [Fixed-Length Paths I (CSES)](https://cses.fi/problemset/task/2080) - Centroid`
    },
    {
        title: "2. Suffix Array & LCP",
        content: `# Suffix Array
Sorted array of all suffixes of a string.
**Construction**: $O(N \\log N)$ using prefix doubling.

### LCP Array (Longest Common Prefix)
$LCP[i]$ = Length of common prefix between $Suffix[i]$ and $Suffix[i-1]$.
**Applications**:
1. Number of distinct substrings.
2. Longest repeated substring.

### Practice Problems
- [Suffix Array (CSES)](https://cses.fi/problemset/task/2105) - Construction
- [Longest Common Substring (SPOJ)](https://www.spoj.com/problems/LCS/)`
    },
    {
        title: "3. Meet-in-the-Middle",
        content: `# Meet-in-the-Middle
Optimization technique to reduce exponential complexity.
Split problem into two halves, solve each, and merge.
**Typical**: $O(2^N) \\to O(2^{N/2})$.

### Example: Subset Sum
Find if subset sum $S$ exists for $N=40$.
1. Generate all sums for first $N/2$ ($\to$ Set A).
2. Generate all sums for last $N/2$ ($\to$ Set B).
3. For each $x \\in A$, check if $S-x \\in B$ (using HashSet or Two Pointers).

### Practice Problems
- [Meet in the Middle (CSES)](https://cses.fi/problemset/task/1628)
- [Maximum Subsequence Sum (Codeforces 888E)](https://codeforces.com/problemset/problem/888/E)`
    },
    {
        title: "4. 2-SAT (Boolean Satisfiability)",
        content: `# 2-Satisfiability (2-SAT)
Assign values (True/False) to variables to satisfy CNF constraints like $(A \\lor B) \\land (!A \\lor C)$.
**Constraint**: Each clause has 2 variables.

### Implication Graph
Edge $!A \\to B$ means "If A is False, B must be True".
Edge $!B \\to A$ means "If B is False, A must be True".

### Algorithm
1. Build graph.
2. Find Strongly Connected Components (SCC).
3. If $X$ and $!X$ in same SCC $\\to$ Impossible.
4. Else, assign true if $Topological(X) > Topological(!X)$.

### Practice Problems
- [Giant Pizza (CSES)](https://cses.fi/problemset/task/1684)
- [The Door Problem (Codeforces 776D)](https://codeforces.com/problemset/problem/776/D)`
    },
    {
        title: "5. Constructive & Randomized Algorithms",
        content: `# Ad-Hoc Techniques

### Constructive Algorithms
Building a valid configuration instead of finding one.
**Patterns**:
- **Balanced Brackets**: Stack-based or Counter (keep count $\\ge 0$).
- **MEX (Minimum Excluded)**: Used in greedy strategies.

### Randomized Algorithms
Using randomness to solve hard problems or pass tests.
1. **Random Shuffle**: Avoid O(N^2) worst case in QuickSort.
2. **Random Integers (Hashing)**: Polynomial Rolling Hash.
3. **Simulated Annealing**: Optimization heuristics (Geometric Median).

### Practice Problems
- [Constructive Forces (Codeforces Blog)](https://codeforces.com/blog/entry/102937)
- [Balanced Bracket Sequence (Codeforces)](https://codeforces.com/problemset/problem/5/C)`
    }
];

async function setupCP() {
    try {
        console.log('🚀 Setting up Competitive Programming Path...');

        // 1. Create Tables
        await pool.query(`
            CREATE TABLE IF NOT EXISTS cp_modules (
                module_id SERIAL PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                description TEXT,
                module_order INT DEFAULT 0
            );
        `);
        console.log('✅ cp_modules table created/verified');

        await pool.query(`
            CREATE TABLE IF NOT EXISTS cp_topics (
                topic_id SERIAL PRIMARY KEY,
                module_id INT REFERENCES cp_modules(module_id),
                title VARCHAR(255) NOT NULL,
                content TEXT,
                video_url TEXT,
                topic_order INT DEFAULT 0
            );
        `);
        console.log('✅ cp_topics table created/verified');

        // 2. Clear existing data to avoid duplicates/mess (Optional: remove this if you want to preserve)
        // For development/setup, it's cleaner to reset tables or check existence carefully.
        // Let's check if modules exist differently.

        // 3. Insert Modules
        for (let i = 0; i < modules.length; i++) {
            const title = modules[i];
            const check = await pool.query('SELECT * FROM cp_modules WHERE title = $1', [title]);

            let module_id;
            if (check.rows.length === 0) {
                const res = await pool.query(
                    'INSERT INTO cp_modules (title, description, module_order) VALUES ($1, $2, $3) RETURNING module_id',
                    [title, `Master ${title} techniques for CP.`, i + 1]
                );
                module_id = res.rows[0].module_id;
                console.log(`   + Added Module: ${title}`);
            } else {
                module_id = check.rows[0].module_id;
                console.log(`   . Module exists: ${title}`);
            }

            // 4. Insert Topics for Module 1 (Number Theory)
            if (i === 0) { // Number Theory is index 0
                for (let j = 0; j < numberTheoryTopics.length; j++) {
                    const topic = numberTheoryTopics[j];
                    const topicCheck = await pool.query('SELECT * FROM cp_topics WHERE module_id = $1 AND title = $2', [module_id, topic.title]);

                    if (topicCheck.rows.length === 0) {
                        await pool.query(
                            'INSERT INTO cp_topics (module_id, title, content, topic_order) VALUES ($1, $2, $3, $4)',
                            [module_id, topic.title, topic.content, j + 1]
                        );
                        console.log(`      + Added Topic: ${topic.title}`);
                    }
                }
            }

            // 5. Insert Topics for Module 2 (Bit Manipulation)
            if (i === 1) { // Index 1 = Bit Manipulation
                for (let j = 0; j < bitManipulationTopics.length; j++) {
                    const topic = bitManipulationTopics[j];
                    const topicCheck = await pool.query('SELECT * FROM cp_topics WHERE module_id = $1 AND title = $2', [module_id, topic.title]);

                    if (topicCheck.rows.length === 0) {
                        await pool.query(
                            'INSERT INTO cp_topics (module_id, title, content, topic_order) VALUES ($1, $2, $3, $4)',
                            [module_id, topic.title, topic.content, j + 1]
                        );
                        console.log(`      + Added Topic: ${topic.title}`);
                    }
                }
            }

            // 6. Insert Topics for Module 3 (Combinatorics)
            if (i === 2) { // Index 2 = Combinatorics
                for (let j = 0; j < combinatoricsTopics.length; j++) {
                    const topic = combinatoricsTopics[j];
                    const topicCheck = await pool.query('SELECT * FROM cp_topics WHERE module_id = $1 AND title = $2', [module_id, topic.title]);

                    if (topicCheck.rows.length === 0) {
                        await pool.query(
                            'INSERT INTO cp_topics (module_id, title, content, topic_order) VALUES ($1, $2, $3, $4)',
                            [module_id, topic.title, topic.content, j + 1]
                        );
                        console.log(`      + Added Topic: ${topic.title}`);
                    }
                }
            }

            // 7. Insert Topics for Module 4 (Advanced Mathematics)
            if (i === 3) { // Index 3 = Advanced Mathematics
                for (let j = 0; j < advancedMathTopics.length; j++) {
                    const topic = advancedMathTopics[j];
                    const topicCheck = await pool.query('SELECT * FROM cp_topics WHERE module_id = $1 AND title = $2', [module_id, topic.title]);

                    if (topicCheck.rows.length === 0) {
                        await pool.query(
                            'INSERT INTO cp_topics (module_id, title, content, topic_order) VALUES ($1, $2, $3, $4)',
                            [module_id, topic.title, topic.content, j + 1]
                        );
                        console.log(`      + Added Topic: ${topic.title}`);
                    }
                }
            }

            // 8. Insert Topics for Module 5 (Greedy Algorithms)
            if (i === 4) { // Index 4 = Greedy Algorithms
                for (let j = 0; j < greedyTopics.length; j++) {
                    const topic = greedyTopics[j];
                    const topicCheck = await pool.query('SELECT * FROM cp_topics WHERE module_id = $1 AND title = $2', [module_id, topic.title]);

                    if (topicCheck.rows.length === 0) {
                        await pool.query(
                            'INSERT INTO cp_topics (module_id, title, content, topic_order) VALUES ($1, $2, $3, $4)',
                            [module_id, topic.title, topic.content, j + 1]
                        );
                        console.log(`      + Added Topic: ${topic.title}`);
                    }
                }
            }

            // 9. Insert Topics for Module 6 (Searching Techniques)
            if (i === 5) { // Index 5 = Searching Techniques
                for (let j = 0; j < searchingTopics.length; j++) {
                    const topic = searchingTopics[j];
                    const topicCheck = await pool.query('SELECT * FROM cp_topics WHERE module_id = $1 AND title = $2', [module_id, topic.title]);

                    if (topicCheck.rows.length === 0) {
                        await pool.query(
                            'INSERT INTO cp_topics (module_id, title, content, topic_order) VALUES ($1, $2, $3, $4)',
                            [module_id, topic.title, topic.content, j + 1]
                        );
                        console.log(`      + Added Topic: ${topic.title}`);
                    }
                }
            }

            // 10. Insert Topics for Module 7 (Must know Data Structures)
            if (i === 6) { // Index 6 = Data Structures
                for (let j = 0; j < dataStructuresTopics.length; j++) {
                    const topic = dataStructuresTopics[j];
                    const topicCheck = await pool.query('SELECT * FROM cp_topics WHERE module_id = $1 AND title = $2', [module_id, topic.title]);

                    if (topicCheck.rows.length === 0) {
                        await pool.query(
                            'INSERT INTO cp_topics (module_id, title, content, topic_order) VALUES ($1, $2, $3, $4)',
                            [module_id, topic.title, topic.content, j + 1]
                        );
                        console.log(`      + Added Topic: ${topic.title}`);
                    }
                }
            }

            // 11. Insert Topics for Module 8 (Pre-Computation)
            if (i === 7) { // Index 7 = Pre-Computation
                for (let j = 0; j < preComputationTopics.length; j++) {
                    const topic = preComputationTopics[j];
                    const topicCheck = await pool.query('SELECT * FROM cp_topics WHERE module_id = $1 AND title = $2', [module_id, topic.title]);

                    if (topicCheck.rows.length === 0) {
                        await pool.query(
                            'INSERT INTO cp_topics (module_id, title, content, topic_order) VALUES ($1, $2, $3, $4)',
                            [module_id, topic.title, topic.content, j + 1]
                        );
                        console.log(`      + Added Topic: ${topic.title}`);
                    }
                }
            }

            // 12. Insert Topics for Module 9 (Graph Algorithms)
            if (i === 8) { // Index 8 = Graph Algorithms
                for (let j = 0; j < graphTopics.length; j++) {
                    const topic = graphTopics[j];
                    const topicCheck = await pool.query('SELECT * FROM cp_topics WHERE module_id = $1 AND title = $2', [module_id, topic.title]);

                    if (topicCheck.rows.length === 0) {
                        await pool.query(
                            'INSERT INTO cp_topics (module_id, title, content, topic_order) VALUES ($1, $2, $3, $4)',
                            [module_id, topic.title, topic.content, j + 1]
                        );
                        console.log(`      + Added Topic: ${topic.title}`);
                    }
                }
            }

            // 13. Insert Topics for Module 10 (Tree Algorithms)
            if (i === 9) { // Index 9 = Tree Algorithms
                for (let j = 0; j < treeTopics.length; j++) {
                    const topic = treeTopics[j];
                    const topicCheck = await pool.query('SELECT * FROM cp_topics WHERE module_id = $1 AND title = $2', [module_id, topic.title]);

                    if (topicCheck.rows.length === 0) {
                        await pool.query(
                            'INSERT INTO cp_topics (module_id, title, content, topic_order) VALUES ($1, $2, $3, $4)',
                            [module_id, topic.title, topic.content, j + 1]
                        );
                        console.log(`      + Added Topic: ${topic.title}`);
                    }
                }
            }

            // 14. Insert Topics for Module 11 (Dynamic Programming)
            if (i === 10) { // Index 10 = Dynamic Programming
                for (let j = 0; j < dpTopics.length; j++) {
                    const topic = dpTopics[j];
                    const topicCheck = await pool.query('SELECT * FROM cp_topics WHERE module_id = $1 AND title = $2', [module_id, topic.title]);

                    if (topicCheck.rows.length === 0) {
                        await pool.query(
                            'INSERT INTO cp_topics (module_id, title, content, topic_order) VALUES ($1, $2, $3, $4)',
                            [module_id, topic.title, topic.content, j + 1]
                        );
                        console.log(`      + Added Topic: ${topic.title}`);
                    }
                }
            }

            // 15. Insert Topics for Module 12 (Range Queries)
            if (i === 11) { // Index 11 = Range Queries
                for (let j = 0; j < rangeQueryTopics.length; j++) {
                    const topic = rangeQueryTopics[j];
                    const topicCheck = await pool.query('SELECT * FROM cp_topics WHERE module_id = $1 AND title = $2', [module_id, topic.title]);

                    if (topicCheck.rows.length === 0) {
                        await pool.query(
                            'INSERT INTO cp_topics (module_id, title, content, topic_order) VALUES ($1, $2, $3, $4)',
                            [module_id, topic.title, topic.content, j + 1]
                        );
                        console.log(`      + Added Topic: ${topic.title}`);
                    }
                }
            }

            // 16. Insert Topics for Module 13 (String Algorithms)
            if (i === 12) { // Index 12 = String Algorithms
                for (let j = 0; j < stringTopics.length; j++) {
                    const topic = stringTopics[j];
                    const topicCheck = await pool.query('SELECT * FROM cp_topics WHERE module_id = $1 AND title = $2', [module_id, topic.title]);

                    if (topicCheck.rows.length === 0) {
                        await pool.query(
                            'INSERT INTO cp_topics (module_id, title, content, topic_order) VALUES ($1, $2, $3, $4)',
                            [module_id, topic.title, topic.content, j + 1]
                        );
                        console.log(`      + Added Topic: ${topic.title}`);
                    }
                }
            }

            // 17. Insert Topics for Module 14 (Game Theory)
            if (i === 13) { // Index 13 = Game Theory
                for (let j = 0; j < gameTheoryTopics.length; j++) {
                    const topic = gameTheoryTopics[j];
                    const topicCheck = await pool.query('SELECT * FROM cp_topics WHERE module_id = $1 AND title = $2', [module_id, topic.title]);

                    if (topicCheck.rows.length === 0) {
                        await pool.query(
                            'INSERT INTO cp_topics (module_id, title, content, topic_order) VALUES ($1, $2, $3, $4)',
                            [module_id, topic.title, topic.content, j + 1]
                        );
                        console.log(`      + Added Topic: ${topic.title}`);
                    }
                }
            }

            // 18. Insert Topics for Module 15 (Advanced Topics)
            if (i === 14) { // Index 14 = Advanced Topics
                for (let j = 0; j < advancedTopics.length; j++) {
                    const topic = advancedTopics[j];
                    const topicCheck = await pool.query('SELECT * FROM cp_topics WHERE module_id = $1 AND title = $2', [module_id, topic.title]);

                    if (topicCheck.rows.length === 0) {
                        await pool.query(
                            'INSERT INTO cp_topics (module_id, title, content, topic_order) VALUES ($1, $2, $3, $4)',
                            [module_id, topic.title, topic.content, j + 1]
                        );
                        console.log(`      + Added Topic: ${topic.title}`);
                    }
                }
            }

        }

        // 5. Enable RLS (Security Best Practice)
        await pool.query(`ALTER TABLE cp_modules ENABLE ROW LEVEL SECURITY;`);
        await pool.query(`ALTER TABLE cp_topics ENABLE ROW LEVEL SECURITY;`);
        console.log('✅ Enabled RLS on CP tables');

        console.log('✨ Competitive Programming setup complete!');
        process.exit(0);

    } catch (err) {
        console.error('❌ Error:', err);
        process.exit(1);
    }
}

setupCP();
