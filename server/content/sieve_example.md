# Sieve of Eratosthenes

## 🎯 Concept Overview
The **Sieve of Eratosthenes** is an ancient and efficient algorithm to find **all prime numbers up to N** in $O(N \log \log N)$ time. It's one of the most fundamental algorithms in competitive programming.

**When to use:**
- Finding all primes up to N (e.g., $N \leq 10^7$)
- Precomputing prime factorizations
- Problems involving "count of primes", "sum of primes", "k-th prime"
- As a building block for other number theory algorithms

---

## 🧠 Intuition & Algorithm

### Core Idea
If a number $p$ is prime, then all its multiples ($2p, 3p, 4p, ...$) are composite. We mark these multiples as "not prime."

### Step-by-Step Algorithm
1. Create boolean array `is_prime[0..N]`, initialize all as `true`
2. Mark `is_prime[0] = is_prime[1] = false` (0 and 1 are not prime)
3. For each $p$ from 2 to $\sqrt{N}$:
   - If `is_prime[p]` is still `true`, then $p$ is prime
   - Mark all multiples of $p$ starting from $p^2$ as `false`
   - **Why start from $p^2$?** Smaller multiples like $2p, 3p, ...$ were already marked by smaller primes

### Visual Example (N = 30)
```
Initial: 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30
p=2:     2 3 _ 5 _ 7 _ 9 __ 11 __ 13 __ 15 __ 17 __ 19 __ 21 __ 23 __ 25 __ 27 __ 29 __
p=3:     2 3   5   7   _    11    13    __    17    19    __    23    25    __    29   
p=5:     2 3   5   7        11    13          17    19          23    __          29   
Result:  2,3,5,7,11,13,17,19,23,29
```

---

## 💻 Code Templates

### Basic Sieve (C++)
```cpp
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
    
    // Collect all primes
    for (int i = 2; i < MAXN; i++)
        if (is_prime[i]) primes.push_back(i);
}
```

### Linear Sieve (O(N)) - Advanced
```cpp
const int MAXN = 1e7 + 5;
int lp[MAXN]; // Lowest prime factor
vector<int> primes;

void linear_sieve() {
    for (int i = 2; i < MAXN; i++) {
        if (lp[i] == 0) {
            lp[i] = i;
            primes.push_back(i);
        }
        for (int j = 0; j < primes.size() && primes[j] <= lp[i] && i * primes[j] < MAXN; j++) {
            lp[i * primes[j]] = primes[j];
        }
    }
}
```

### Segmented Sieve (for large ranges)
When you need primes in range $[L, R]$ where $R$ can be up to $10^{12}$:
```cpp
vector<int> segmented_sieve(long long L, long long R) {
    // First sieve primes up to sqrt(R)
    int lim = sqrt(R) + 1;
    vector<bool> mark(lim + 1, false);
    vector<int> base_primes;
    
    for (int i = 2; i <= lim; i++) {
        if (!mark[i]) {
            base_primes.push_back(i);
            for (long long j = (long long)i * i; j <= lim; j += i)
                mark[j] = true;
        }
    }
    
    // Sieve the segment [L, R]
    vector<bool> segment(R - L + 1, true);
    for (int p : base_primes) {
        long long start = max((long long)p * p, ((L + p - 1) / p) * p);
        for (long long j = start; j <= R; j += p)
            segment[j - L] = false;
    }
    
    vector<int> result;
    for (long long i = max(2LL, L); i <= R; i++)
        if (segment[i - L]) result.push_back(i);
    return result;
}
```

---

## ⏱️ Complexity Analysis

| Variant | Time | Space | Use Case |
|---------|------|-------|----------|
| Basic Sieve | $O(N \log \log N)$ | $O(N)$ | N ≤ $10^7$ |
| Linear Sieve | $O(N)$ | $O(N)$ | Need lowest prime factor |
| Segmented | $O(\sqrt{R} + (R-L) \log \log R)$ | $O(\sqrt{R})$ | Large ranges |

**Memory:**
- `bool` array: 1 byte per element → $10^7$ = 10 MB
- `bitset`: 1 bit per element → $10^8$ = 12.5 MB

---

## ⚠️ Common Pitfalls & TLE/MLE Fixes

### TLE Issues
1. **Starting inner loop from $2p$ instead of $p^2$**
   - Fix: `for (int i = p * p; ...)` not `for (int i = 2 * p; ...)`
   
2. **Not using fast I/O for multiple queries**
   ```cpp
   ios::sync_with_stdio(false);
   cin.tie(nullptr);
   ```

3. **Recomputing sieve for each test case**
   - Fix: Precompute sieve ONCE in main() before reading input

### MLE Issues
1. **Using `int` array instead of `bool`**
   - Fix: `bool is_prime[]` or `bitset<MAXN>`
   
2. **N too large for memory**
   - If N > $10^8$, use **Segmented Sieve**

### Runtime Errors
- **Integer overflow**: Use `(long long)p * p` when checking bounds
- **Array bounds**: Make sure array size is `MAXN + 1` if accessing index N

---

## 🎮 Algorithmic Patterns

### Pattern 1: "Count primes in range [L, R]"
```cpp
// Precompute prefix sum of primes
int prime_count[MAXN];
void compute_prefix() {
    sieve();
    for (int i = 1; i < MAXN; i++)
        prime_count[i] = prime_count[i-1] + is_prime[i];
}
// Answer: prime_count[R] - prime_count[L-1]
```

### Pattern 2: "Find k-th prime"
Store primes in vector during sieve, answer is `primes[k-1]`.

### Pattern 3: "Sum/Product of all primes up to N"
```cpp
long long sum = 0;
for (int p : primes) {
    if (p > N) break;
    sum += p;
}
```

### Pattern 4: "Prime factorization using SPF (Smallest Prime Factor)"
```cpp
vector<pair<int,int>> factorize(int n) {
    vector<pair<int,int>> factors;
    while (n > 1) {
        int p = spf[n], cnt = 0;
        while (n % p == 0) { n /= p; cnt++; }
        factors.push_back({p, cnt});
    }
    return factors;
}
```

---

## 📚 Practice Problems (Easy → Hard)

### Easy (800-1200 rating)
1. [TDKPRIME - K-th Prime](https://www.spoj.com/problems/TDKPRIME/) - Direct sieve application
2. [Sherlock and his girlfriend (CF 776B)](https://codeforces.com/problemset/problem/776/B) - Color primes vs composites

### Medium (1300-1700 rating)
3. [Almost Prime (CF 26A)](https://codeforces.com/problemset/problem/26/A) - Count numbers with exactly 2 distinct prime factors
4. [T-primes (CF 230B)](https://codeforces.com/problemset/problem/230/B) - Numbers with exactly 3 divisors (perfect squares of primes)
5. [Noldbach Problem (CF 17A)](https://codeforces.com/problemset/problem/17/A) - Primes as sum of two consecutive primes + 1

### Hard (1800-2000+ rating)
6. [Prime Generator (SPOJ PRIME1)](https://www.spoj.com/problems/PRIME1/) - Segmented sieve required
7. [Goldbach's Conjecture (UVa 543)](https://onlinejudge.org/external/5/543.pdf) - Express even numbers as sum of two primes
8. [Divisor Summation (CF 1557D)](https://codeforces.com/problemset/problem/1557/D) - Advanced sieve with divisor counting

---

## 🔧 Optimization Tips for CP

1. **Use `bitset` for N > $10^7$**: Reduces memory by 8x
   ```cpp
   bitset<100000001> is_prime;
   ```

2. **Wheel optimization**: Skip even numbers
   ```cpp
   is_prime[2] = true;
   for (int i = 3; i < MAXN; i += 2) // Only odd numbers
   ```

3. **Cache precomputed primes**: Store in global vector for O(1) access

4. **Use lower_bound for range queries**:
   ```cpp
   // Count primes in [L, R]
   auto lo = lower_bound(primes.begin(), primes.end(), L);
   auto hi = upper_bound(primes.begin(), primes.end(), R);
   int count = hi - lo;
   ```

---

*Master the Sieve — it's the foundation for half of Number Theory problems in CP!*
