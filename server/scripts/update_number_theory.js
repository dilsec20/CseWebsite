const { Pool } = require('pg');

const pool = new Pool({
    connectionString: 'postgresql://postgres.xlqzqcqacpajpqwneqpa:05Supabase%40%40%3F%3F@aws-1-ap-south-1.pooler.supabase.com:6543/postgres',
    ssl: { rejectUnauthorized: false }
});

// ============================================
// MODULE 1: NUMBER THEORY - DETAILED CONTENT
// ============================================

const numberTheoryContent = {
    "1. Basic Number Theory & Primality Test": `# Primality Testing

## 🎯 Concept Overview
A **prime number** is a natural number greater than 1 that has exactly two divisors: 1 and itself. Primality testing is checking whether a given number N is prime.

**When to use:**
- Validating if a number is prime before factorization
- Cryptography problems (RSA, etc.)
- Problems asking "is N prime?" for large N

---

## 🧠 Algorithm & Intuition

### Naive Approach: O(N)
Check all numbers from 2 to N-1. Too slow!

### Optimized: O(√N)
**Key insight**: If N has a factor > √N, it must also have a factor < √N.
- Only check divisors up to √N
- Skip even numbers after checking 2

### Miller-Rabin (Probabilistic): O(k log³N)
For very large N (> 10^18), use probabilistic primality test.

---

## 💻 Code Templates

### Basic O(√N) Check
\`\`\`cpp
bool isPrime(long long n) {
    if (n <= 1) return false;
    if (n <= 3) return true;
    if (n % 2 == 0 || n % 3 == 0) return false;
    
    // Check 6k ± 1 pattern
    for (long long i = 5; i * i <= n; i += 6) {
        if (n % i == 0 || n % (i + 2) == 0)
            return false;
    }
    return true;
}
\`\`\`

### Miller-Rabin (Deterministic for N < 3,317,044,064,679,887,385,961,981)
\`\`\`cpp
using ull = unsigned long long;

ull mulmod(ull a, ull b, ull m) {
    return (__uint128_t)a * b % m;
}

ull powmod(ull a, ull b, ull m) {
    ull res = 1;
    a %= m;
    while (b > 0) {
        if (b & 1) res = mulmod(res, a, m);
        a = mulmod(a, a, m);
        b >>= 1;
    }
    return res;
}

bool millerRabin(ull n, ull a) {
    if (n % a == 0) return n == a;
    ull d = n - 1;
    int r = 0;
    while (d % 2 == 0) { d /= 2; r++; }
    
    ull x = powmod(a, d, n);
    if (x == 1 || x == n - 1) return true;
    
    for (int i = 0; i < r - 1; i++) {
        x = mulmod(x, x, n);
        if (x == n - 1) return true;
    }
    return false;
}

bool isPrime(ull n) {
    if (n < 2) return false;
    if (n == 2 || n == 3) return true;
    if (n % 2 == 0) return false;
    
    // These bases work for n < 3,317,044,064,679,887,385,961,981
    for (ull a : {2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37})
        if (!millerRabin(n, a)) return false;
    return true;
}
\`\`\`

---

## ⏱️ Complexity Analysis

| Method | Time | Space | Use Case |
|--------|------|-------|----------|
| Naive | O(N) | O(1) | Never use |
| √N check | O(√N) | O(1) | N ≤ 10^12 |
| Miller-Rabin | O(k log³N) | O(1) | N ≤ 10^18 |

---

## ⚠️ Common Pitfalls

1. **Integer overflow**: Use \`long long\` for i*i comparison
   \`\`\`cpp
   for (long long i = 5; i * i <= n; ...)  // NOT int i
   \`\`\`

2. **Edge cases**: Handle n = 0, 1, 2, 3 explicitly

3. **TLE on multiple queries**: Precompute with Sieve if checking many numbers

---

## 🎮 Patterns

### Pattern 1: "Is N prime?" (single query)
Use O(√N) check directly.

### Pattern 2: "Count primes ≤ N"
Use Sieve of Eratosthenes (next topic).

### Pattern 3: "Find smallest prime factor"
\`\`\`cpp
int smallestPrimeFactor(int n) {
    if (n % 2 == 0) return 2;
    for (int i = 3; i * i <= n; i += 2)
        if (n % i == 0) return i;
    return n;
}
\`\`\`

---

## 📚 Practice Problems

### Easy (800-1200)
- [A+B Prime](https://codeforces.com/problemset/problem/17/A)
- [Prime Generator SPOJ](https://www.spoj.com/problems/PRIME1/)

### Medium (1300-1700)
- [Almost Prime (CF 26A)](https://codeforces.com/problemset/problem/26/A)
- [T-primes (CF 230B)](https://codeforces.com/problemset/problem/230/B)

### Hard (1800+)
- [Divisibility by Eight (CF 550C)](https://codeforces.com/problemset/problem/550/C)
- [Prime Path (SPOJ)](https://www.spoj.com/problems/PPATH/)
`,

    "2. Sieve of Eratosthenes": `# Sieve of Eratosthenes

## 🎯 Concept Overview
The **Sieve of Eratosthenes** finds **all prime numbers up to N** in O(N log log N) time.

**When to use:**
- Finding all primes up to N (N ≤ 10^7)
- Precomputing prime factorizations
- Problems involving "count of primes", "sum of primes", "k-th prime"
- Building block for other number theory algorithms

---

## 🧠 Algorithm

### Step-by-Step
1. Create boolean array \`is_prime[0..N]\`, initialize all as \`true\`
2. Mark \`is_prime[0] = is_prime[1] = false\`
3. For each p from 2 to √N:
   - If \`is_prime[p]\` is \`true\`, mark all multiples of p starting from p² as \`false\`

### Why start from p²?
Smaller multiples were already marked by smaller primes.

---

## 💻 Code Templates

### Basic Sieve
\`\`\`cpp
const int MAXN = 1e7 + 5;
bool is_prime[MAXN];
vector<int> primes;

void sieve() {
    fill(is_prime, is_prime + MAXN, true);
    is_prime[0] = is_prime[1] = false;
    
    for (int p = 2; p * p < MAXN; p++) {
        if (is_prime[p]) {
            for (int i = p * p; i < MAXN; i += p)
                is_prime[i] = false;
        }
    }
    
    for (int i = 2; i < MAXN; i++)
        if (is_prime[i]) primes.push_back(i);
}
\`\`\`

### Linear Sieve with SPF (Smallest Prime Factor)
\`\`\`cpp
const int MAXN = 1e7 + 5;
int spf[MAXN];
vector<int> primes;

void linearSieve() {
    for (int i = 2; i < MAXN; i++) {
        if (spf[i] == 0) {
            spf[i] = i;
            primes.push_back(i);
        }
        for (int j = 0; j < primes.size() && primes[j] <= spf[i] && i * primes[j] < MAXN; j++) {
            spf[i * primes[j]] = primes[j];
        }
    }
}

// Factorize in O(log n) using SPF
vector<pair<int,int>> factorize(int n) {
    vector<pair<int,int>> factors;
    while (n > 1) {
        int p = spf[n], cnt = 0;
        while (n % p == 0) { n /= p; cnt++; }
        factors.push_back({p, cnt});
    }
    return factors;
}
\`\`\`

### Segmented Sieve (for large ranges L to R)
\`\`\`cpp
vector<int> segmentedSieve(long long L, long long R) {
    int lim = sqrt(R) + 1;
    vector<bool> mark(lim + 1, false);
    vector<int> basePrimes;
    
    for (int i = 2; i <= lim; i++) {
        if (!mark[i]) {
            basePrimes.push_back(i);
            for (long long j = (long long)i * i; j <= lim; j += i)
                mark[j] = true;
        }
    }
    
    vector<bool> segment(R - L + 1, true);
    for (int p : basePrimes) {
        long long start = max((long long)p * p, ((L + p - 1) / p) * p);
        for (long long j = start; j <= R; j += p)
            segment[j - L] = false;
    }
    
    vector<int> result;
    for (long long i = max(2LL, L); i <= R; i++)
        if (segment[i - L]) result.push_back(i);
    return result;
}
\`\`\`

---

## ⏱️ Complexity

| Variant | Time | Space |
|---------|------|-------|
| Basic | O(N log log N) | O(N) |
| Linear | O(N) | O(N) |
| Segmented | O(√R + (R-L) log log R) | O(√R) |

---

## ⚠️ Common Pitfalls & TLE/MLE

1. **Start inner loop from p², not 2p**
2. **Use \`long long\` for p*p when p can be large**
3. **MLE fix**: Use \`bitset<N>\` instead of \`bool[N]\` (8x memory savings)
4. **TLE fix**: Precompute sieve ONCE, not per test case

---

## 📚 Practice Problems

### Easy
- [TDKPRIME](https://www.spoj.com/problems/TDKPRIME/)
- [Sherlock and his girlfriend (CF 776B)](https://codeforces.com/problemset/problem/776/B)

### Medium
- [T-primes (CF 230B)](https://codeforces.com/problemset/problem/230/B)
- [Almost Prime (CF 26A)](https://codeforces.com/problemset/problem/26/A)

### Hard
- [Prime Generator (SPOJ)](https://www.spoj.com/problems/PRIME1/)
- [Lucky Numbers (CF 96B)](https://codeforces.com/problemset/problem/96/B)
`,

    "3. Euclidean Algorithm (GCD & LCM)": `# Euclidean Algorithm (GCD & LCM)

## 🎯 Concept Overview
**GCD (Greatest Common Divisor)**: Largest number dividing both A and B.
**LCM (Least Common Multiple)**: Smallest number divisible by both A and B.

$$\\text{LCM}(A, B) = \\frac{A \\times B}{\\text{GCD}(A, B)}$$

---

## 🧠 Algorithm

### Euclidean Algorithm
$$\\text{GCD}(A, B) = \\text{GCD}(B, A \\mod B)$$
Base case: $\\text{GCD}(A, 0) = A$

### Extended Euclidean Algorithm
Find x, y such that: $Ax + By = \\text{GCD}(A, B)$

---

## 💻 Code Templates

### Basic GCD (Recursive)
\`\`\`cpp
long long gcd(long long a, long long b) {
    return b == 0 ? a : gcd(b, a % b);
}

long long lcm(long long a, long long b) {
    return a / gcd(a, b) * b;  // Avoid overflow
}

// C++17: use std::gcd and std::lcm from <numeric>
\`\`\`

### Extended GCD
\`\`\`cpp
long long extgcd(long long a, long long b, long long &x, long long &y) {
    if (b == 0) {
        x = 1; y = 0;
        return a;
    }
    long long x1, y1;
    long long g = extgcd(b, a % b, x1, y1);
    x = y1;
    y = x1 - (a / b) * y1;
    return g;
}
\`\`\`

### Binary GCD (Stein's Algorithm) - Faster on some systems
\`\`\`cpp
long long binaryGcd(long long a, long long b) {
    if (a == 0) return b;
    if (b == 0) return a;
    
    int shift = __builtin_ctzll(a | b);
    a >>= __builtin_ctzll(a);
    
    while (b) {
        b >>= __builtin_ctzll(b);
        if (a > b) swap(a, b);
        b -= a;
    }
    return a << shift;
}
\`\`\`

---

## 🎮 Patterns

### Pattern 1: GCD of Array
\`\`\`cpp
int arrayGcd(vector<int>& arr) {
    int result = arr[0];
    for (int i = 1; i < arr.size(); i++)
        result = gcd(result, arr[i]);
    return result;
}
\`\`\`

### Pattern 2: LCM of Array (watch for overflow!)
\`\`\`cpp
long long arrayLcm(vector<int>& arr) {
    long long result = arr[0];
    for (int i = 1; i < arr.size(); i++) {
        result = result / gcd(result, (long long)arr[i]) * arr[i];
        if (result > 1e18) return -1;  // Overflow
    }
    return result;
}
\`\`\`

### Pattern 3: Count pairs with GCD = K
Count pairs (i, j) where GCD(arr[i], arr[j]) = K.
**Approach**: Divide all elements by K, count pairs with GCD = 1.

---

## ⚠️ Common Pitfalls

1. **LCM overflow**: Compute \`a / gcd(a,b) * b\` not \`a * b / gcd(a,b)\`
2. **Negative numbers**: Use \`abs()\` before GCD
3. **Zero handling**: GCD(0, x) = x, LCM(0, x) = 0

---

## 📚 Practice Problems

### Easy
- [GCD and LCM (CodeChef)](https://www.codechef.com/problems/FLOW016)
- [Complicated GCD (CF 664A)](https://codeforces.com/problemset/problem/664/A)

### Medium
- [GCD Table (CF 582A)](https://codeforces.com/problemset/problem/582/A)
- [Array GCD (CF 623B)](https://codeforces.com/problemset/problem/623/B)

### Hard
- [GCD Counting (CF 990G)](https://codeforces.com/problemset/problem/990/G)
`,

    "4. Binary Exponentiation (Modular Pow)": `# Binary Exponentiation

## 🎯 Concept Overview
Compute $a^b \\mod m$ efficiently in $O(\\log b)$ time instead of $O(b)$.

**When to use:**
- Computing large powers modulo M
- Matrix exponentiation for recurrences
- Modular inverse (via Fermat's little theorem)

---

## 🧠 Idea

$$a^{13} = a^{1101_2} = a^8 \\cdot a^4 \\cdot a^1$$

Process bits of exponent from LSB. If bit is set, multiply result by current power of a.

---

## 💻 Code Templates

### Iterative (Preferred)
\`\`\`cpp
long long binpow(long long a, long long b, long long m) {
    a %= m;
    long long result = 1;
    while (b > 0) {
        if (b & 1)
            result = result * a % m;
        a = a * a % m;
        b >>= 1;
    }
    return result;
}
\`\`\`

### Recursive
\`\`\`cpp
long long binpow(long long a, long long b, long long m) {
    if (b == 0) return 1;
    long long half = binpow(a, b / 2, m);
    half = half * half % m;
    if (b & 1) half = half * a % m;
    return half;
}
\`\`\`

### For very large mod (avoiding overflow)
\`\`\`cpp
long long mulmod(long long a, long long b, long long m) {
    return (__int128)a * b % m;
}

long long binpow(long long a, long long b, long long m) {
    a %= m;
    long long result = 1;
    while (b > 0) {
        if (b & 1)
            result = mulmod(result, a, m);
        a = mulmod(a, a, m);
        b >>= 1;
    }
    return result;
}
\`\`\`

---

## 🎮 Applications

### 1. Modular Inverse (when m is prime)
$$a^{-1} \\equiv a^{m-2} \\pmod{m}$$
\`\`\`cpp
long long modInverse(long long a, long long m) {
    return binpow(a, m - 2, m);
}
\`\`\`

### 2. Fibonacci in O(log n) - Matrix Exponentiation
\`\`\`cpp
typedef vector<vector<long long>> Matrix;

Matrix multiply(Matrix& A, Matrix& B, long long m) {
    int n = A.size();
    Matrix C(n, vector<long long>(n, 0));
    for (int i = 0; i < n; i++)
        for (int j = 0; j < n; j++)
            for (int k = 0; k < n; k++)
                C[i][j] = (C[i][j] + A[i][k] * B[k][j]) % m;
    return C;
}

Matrix matpow(Matrix A, long long p, long long m) {
    int n = A.size();
    Matrix result(n, vector<long long>(n, 0));
    for (int i = 0; i < n; i++) result[i][i] = 1;  // Identity
    
    while (p > 0) {
        if (p & 1) result = multiply(result, A, m);
        A = multiply(A, A, m);
        p >>= 1;
    }
    return result;
}

long long fib(long long n, long long m) {
    if (n == 0) return 0;
    Matrix A = {{1, 1}, {1, 0}};
    Matrix result = matpow(A, n - 1, m);
    return result[0][0];
}
\`\`\`

---

## ⚠️ Common Pitfalls

1. **Negative base**: Use \`(a % m + m) % m\` to handle negative a
2. **Overflow**: Use \`__int128\` or \`mulmod\` for large m
3. **b = 0**: Always return 1, not 0

---

## 📚 Practice Problems

### Easy
- [Big Mod (UVA 374)](https://onlinejudge.org/external/3/374.pdf)
- [Parking Lot (CF 630I)](https://codeforces.com/problemset/problem/630/I)

### Medium
- [Power of Power (CF 630J)](https://codeforces.com/problemset/problem/630/J)
- [Xor Power (Atcoder)](https://atcoder.jp/contests/abc123)

### Hard
- [Fibonacci Sum (SPOJ)](https://www.spoj.com/problems/FIBOSUM/)
`,

    "5. Linear Diophantine Equations": `# Linear Diophantine Equations

## 🎯 Concept Overview
Solve equations of form: $ax + by = c$ where we need integer solutions.

**Solution exists iff** $\\gcd(a, b) | c$

---

## 🧠 Algorithm

1. Use Extended GCD to find $x_0, y_0$ such that $ax_0 + by_0 = \\gcd(a,b)$
2. Multiply by $c / \\gcd(a,b)$ to get a particular solution
3. General solution: $x = x_0 + k \\cdot \\frac{b}{g}$, $y = y_0 - k \\cdot \\frac{a}{g}$

---

## 💻 Code Template

\`\`\`cpp
long long extgcd(long long a, long long b, long long &x, long long &y) {
    if (b == 0) { x = 1; y = 0; return a; }
    long long x1, y1;
    long long g = extgcd(b, a % b, x1, y1);
    x = y1;
    y = x1 - (a / b) * y1;
    return g;
}

bool solveDiophantine(long long a, long long b, long long c, 
                       long long &x, long long &y, long long &g) {
    g = extgcd(abs(a), abs(b), x, y);
    if (c % g != 0) return false;
    
    x *= c / g;
    y *= c / g;
    if (a < 0) x = -x;
    if (b < 0) y = -y;
    return true;
}

// Find all solutions in range
void allSolutions(long long a, long long b, long long c,
                  long long minX, long long maxX) {
    long long x, y, g;
    if (!solveDiophantine(a, b, c, x, y, g)) {
        cout << "No solution" << endl;
        return;
    }
    
    long long stepX = b / g;
    // Shift x to be >= minX
    if (stepX > 0) {
        long long k = (minX - x + stepX - 1) / stepX;
        x += k * stepX;
    } else {
        // Handle negative step
    }
    
    // Print all x in [minX, maxX]
    while (x <= maxX) {
        cout << x << " " << (c - a * x) / b << endl;
        x += abs(stepX);
    }
}
\`\`\`

---

## 🎮 Patterns

### Pattern: Coin Problem
"Can you pay exactly C using coins of value A and B?"
This is $Ax + By = C$ where $x, y \\geq 0$.

### Pattern: Chicken McNugget
Largest number that CANNOT be represented as $ax + by$ (where $\\gcd(a,b) = 1$):
$$\\text{Frobenius number} = ab - a - b$$

---

## 📚 Practice Problems

- [Ebony and Ivory (CF 633A)](https://codeforces.com/problemset/problem/633/A)
- [Get AC (AtCoder ABC186E)](https://atcoder.jp/contests/abc186/tasks/abc186_e)
`,

    "6. Euler's Totient Function (Phi)": `# Euler's Totient Function (φ)

## 🎯 Concept Overview
$\\phi(n)$ = count of integers in $[1, n]$ that are coprime with n.

**Formula:**
$$\\phi(n) = n \\cdot \\prod_{p | n} \\left(1 - \\frac{1}{p}\\right)$$

---

## 🧠 Properties

1. If p is prime: $\\phi(p) = p - 1$
2. If p is prime: $\\phi(p^k) = p^{k-1}(p-1)$
3. Multiplicative: $\\phi(ab) = \\phi(a) \\phi(b)$ if $\\gcd(a,b) = 1$
4. **Euler's Theorem**: $a^{\\phi(m)} \\equiv 1 \\pmod{m}$ if $\\gcd(a,m) = 1$

---

## 💻 Code Templates

### Single Value O(√n)
\`\`\`cpp
long long phi(long long n) {
    long long result = n;
    for (long long p = 2; p * p <= n; p++) {
        if (n % p == 0) {
            while (n % p == 0) n /= p;
            result -= result / p;
        }
    }
    if (n > 1) result -= result / n;
    return result;
}
\`\`\`

### Sieve for all φ(1) to φ(N)
\`\`\`cpp
const int MAXN = 1e6 + 5;
int phi[MAXN];

void phiSieve() {
    for (int i = 0; i < MAXN; i++) phi[i] = i;
    for (int i = 2; i < MAXN; i++) {
        if (phi[i] == i) {  // i is prime
            for (int j = i; j < MAXN; j += i)
                phi[j] -= phi[j] / i;
        }
    }
}
\`\`\`

---

## 🎮 Applications

### 1. Modular Exponentiation with Large Exponents
When computing $a^b \\mod m$:
- If $\\gcd(a, m) = 1$: $a^b \\equiv a^{b \\mod \\phi(m)} \\pmod{m}$
- General case: Use Euler's generalization

### 2. Count fractions in lowest terms
$\\frac{k}{n}$ is in lowest terms iff $\\gcd(k, n) = 1$. Count = $\\phi(n)$.

### 3. Primitive roots count
Number of primitive roots mod n = $\\phi(\\phi(n))$

---

## 📚 Practice Problems

- [ETF (SPOJ)](https://www.spoj.com/problems/ETF/)
- [Power Tower (CF 906D)](https://codeforces.com/problemset/problem/906/D)
`,

    "7. Modular Inverse": `# Modular Multiplicative Inverse

## 🎯 Concept Overview
Find $x$ such that $a \\cdot x \\equiv 1 \\pmod{m}$

**Requirements**: $\\gcd(a, m) = 1$ (inverse exists only if coprime)

---

## 💻 Methods

### Method 1: Fermat's Little Theorem (m is prime)
$$a^{-1} \\equiv a^{m-2} \\pmod{m}$$
\`\`\`cpp
long long modInverse(long long a, long long m) {
    return binpow(a, m - 2, m);
}
\`\`\`

### Method 2: Extended GCD (any m)
\`\`\`cpp
long long modInverse(long long a, long long m) {
    long long x, y;
    long long g = extgcd(a, m, x, y);
    if (g != 1) return -1;  // No inverse
    return (x % m + m) % m;
}
\`\`\`

### Method 3: Precompute all inverses 1 to N
\`\`\`cpp
const int MAXN = 1e6 + 5;
const long long MOD = 1e9 + 7;
long long inv[MAXN];

void precomputeInverses() {
    inv[1] = 1;
    for (int i = 2; i < MAXN; i++)
        inv[i] = (MOD - (MOD / i) * inv[MOD % i] % MOD) % MOD;
}
\`\`\`

---

## 🎮 Application: Modular Division

$$\\frac{a}{b} \\mod m = a \\cdot b^{-1} \\mod m$$

**Example: nCr mod p**
\`\`\`cpp
const long long MOD = 1e9 + 7;
long long fact[MAXN], invFact[MAXN];

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
\`\`\`

---

## 📚 Practice Problems

- [Beautiful Numbers (CF 300C)](https://codeforces.com/problemset/problem/300/C)
- [Modular Inverse (HackerRank)](https://www.hackerrank.com/challenges/modular-1d-array-c)
`,

    "8. Chinese Remainder Theorem (CRT)": `# Chinese Remainder Theorem

## 🎯 Concept Overview
Solve system of congruences:
$$x \\equiv a_1 \\pmod{m_1}$$
$$x \\equiv a_2 \\pmod{m_2}$$
$$\\vdots$$

**Requirement**: All $m_i$ are pairwise coprime.
**Unique solution** exists modulo $M = m_1 \\cdot m_2 \\cdots$

---

## 💻 Code Template

### Two Equations
\`\`\`cpp
// Solve: x ≡ a1 (mod m1), x ≡ a2 (mod m2)
pair<long long, long long> crt(long long a1, long long m1, 
                                 long long a2, long long m2) {
    long long x, y;
    long long g = extgcd(m1, m2, x, y);
    
    if ((a2 - a1) % g != 0) return {-1, -1};  // No solution
    
    long long lcm = m1 / g * m2;
    long long ans = (a1 + m1 * ((a2 - a1) / g % (m2 / g) * x % (m2 / g) + m2 / g)) % lcm;
    return {(ans + lcm) % lcm, lcm};
}
\`\`\`

### General CRT (N equations)
\`\`\`cpp
pair<long long, long long> generalCRT(vector<long long>& a, vector<long long>& m) {
    long long curA = a[0], curM = m[0];
    for (int i = 1; i < a.size(); i++) {
        auto [newA, newM] = crt(curA, curM, a[i], m[i]);
        if (newM == -1) return {-1, -1};
        curA = newA;
        curM = newM;
    }
    return {curA, curM};
}
\`\`\`

---

## 🎮 Applications

1. **Compute large mod products**: Split mod into prime powers, compute separately, combine with CRT
2. **Garner's Algorithm**: Alternative to CRT for large numbers
3. **Hash collision avoidance**: Use multiple mods, combine results

---

## 📚 Practice Problems

- [Remainders Game (CF 687B)](https://codeforces.com/problemset/problem/687/B)
- [Strange Food Chain (SPOJ)](https://www.spoj.com/problems/CHAIN/)
`
};

// Update function
async function updateNumberTheory() {
    try {
        console.log('📚 Updating Number Theory Module with detailed content...');

        for (const [title, content] of Object.entries(numberTheoryContent)) {
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

        console.log('🎉 Number Theory module updated!');
    } catch (err) {
        console.error('Error:', err);
    } finally {
        await pool.end();
    }
}

updateNumberTheory();
