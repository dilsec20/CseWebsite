# Primality Testing

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
```cpp
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
```

### Miller-Rabin (Deterministic for N < 3,317,044,064,679,887,385,961,981)
```cpp
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
```

---

## ⏱️ Complexity Analysis

| Method | Time | Space | Use Case |
|--------|------|-------|----------|
| Naive | O(N) | O(1) | Never use |
| √N check | O(√N) | O(1) | N ≤ 10^12 |
| Miller-Rabin | O(k log³N) | O(1) | N ≤ 10^18 |

---

## ⚠️ Common Pitfalls

1. **Integer overflow**: Use `long long` for i*i comparison
   ```cpp
   for (long long i = 5; i * i <= n; ...)  // NOT int i
   ```

2. **Edge cases**: Handle n = 0, 1, 2, 3 explicitly

3. **TLE on multiple queries**: Precompute with Sieve if checking many numbers

---

## 🎮 Patterns

### Pattern 1: "Is N prime?" (single query)
Use O(√N) check directly.

### Pattern 2: "Count primes ≤ N"
Use Sieve of Eratosthenes (next topic).

### Pattern 3: "Find smallest prime factor"
```cpp
int smallestPrimeFactor(int n) {
    if (n % 2 == 0) return 2;
    for (int i = 3; i * i <= n; i += 2)
        if (n % i == 0) return i;
    return n;
}
```

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
