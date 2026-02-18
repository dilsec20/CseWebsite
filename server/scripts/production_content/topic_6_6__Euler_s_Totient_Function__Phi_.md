# Euler's Totient Function (φ)

## 🎯 Concept Overview
$\phi(n)$ = count of integers in $[1, n]$ that are coprime with n.

**Formula:**
$$\phi(n) = n \cdot \prod_{p | n} \left(1 - \frac{1}{p}\right)$$

---

## 🧠 Properties

1. If p is prime: $\phi(p) = p - 1$
2. If p is prime: $\phi(p^k) = p^{k-1}(p-1)$
3. Multiplicative: $\phi(ab) = \phi(a) \phi(b)$ if $\gcd(a,b) = 1$
4. **Euler's Theorem**: $a^{\phi(m)} \equiv 1 \pmod{m}$ if $\gcd(a,m) = 1$

---

## 💻 Code Templates

### Single Value O(√n)
```cpp
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
```

### Sieve for all φ(1) to φ(N)
```cpp
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
```

---

## 🎮 Applications

### 1. Modular Exponentiation with Large Exponents
When computing $a^b \mod m$:
- If $\gcd(a, m) = 1$: $a^b \equiv a^{b \mod \phi(m)} \pmod{m}$
- General case: Use Euler's generalization

### 2. Count fractions in lowest terms
$\frac{k}{n}$ is in lowest terms iff $\gcd(k, n) = 1$. Count = $\phi(n)$.

### 3. Primitive roots count
Number of primitive roots mod n = $\phi(\phi(n))$

---

## 📚 Practice Problems

- [ETF (SPOJ)](https://www.spoj.com/problems/ETF/)
- [Power Tower (CF 906D)](https://codeforces.com/problemset/problem/906/D)
