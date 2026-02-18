# Modular Multiplicative Inverse

## 🎯 Concept Overview
Find $x$ such that $a \cdot x \equiv 1 \pmod{m}$

**Requirements**: $\gcd(a, m) = 1$ (inverse exists only if coprime)

---

## 💻 Methods

### Method 1: Fermat's Little Theorem (m is prime)
$$a^{-1} \equiv a^{m-2} \pmod{m}$$
```cpp
long long modInverse(long long a, long long m) {
    return binpow(a, m - 2, m);
}
```

### Method 2: Extended GCD (any m)
```cpp
long long modInverse(long long a, long long m) {
    long long x, y;
    long long g = extgcd(a, m, x, y);
    if (g != 1) return -1;  // No inverse
    return (x % m + m) % m;
}
```

### Method 3: Precompute all inverses 1 to N
```cpp
const int MAXN = 1e6 + 5;
const long long MOD = 1e9 + 7;
long long inv[MAXN];

void precomputeInverses() {
    inv[1] = 1;
    for (int i = 2; i < MAXN; i++)
        inv[i] = (MOD - (MOD / i) * inv[MOD % i] % MOD) % MOD;
}
```

---

## 🎮 Application: Modular Division

$$\frac{a}{b} \mod m = a \cdot b^{-1} \mod m$$

**Example: nCr mod p**
```cpp
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
```

---

## 📚 Practice Problems

- [Beautiful Numbers (CF 300C)](https://codeforces.com/problemset/problem/300/C)
- [Modular Inverse (HackerRank)](https://www.hackerrank.com/challenges/modular-1d-array-c)
