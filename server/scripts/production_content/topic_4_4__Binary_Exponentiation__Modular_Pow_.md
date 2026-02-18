# Binary Exponentiation

## 🎯 Concept Overview
Compute $a^b \mod m$ efficiently in $O(\log b)$ time instead of $O(b)$.

**When to use:**
- Computing large powers modulo M
- Matrix exponentiation for recurrences
- Modular inverse (via Fermat's little theorem)

---

## 🧠 Idea

$$a^{13} = a^{1101_2} = a^8 \cdot a^4 \cdot a^1$$

Process bits of exponent from LSB. If bit is set, multiply result by current power of a.

---

## 💻 Code Templates

### Iterative (Preferred)
```cpp
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
```

### Recursive
```cpp
long long binpow(long long a, long long b, long long m) {
    if (b == 0) return 1;
    long long half = binpow(a, b / 2, m);
    half = half * half % m;
    if (b & 1) half = half * a % m;
    return half;
}
```

### For very large mod (avoiding overflow)
```cpp
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
```

---

## 🎮 Applications

### 1. Modular Inverse (when m is prime)
$$a^{-1} \equiv a^{m-2} \pmod{m}$$
```cpp
long long modInverse(long long a, long long m) {
    return binpow(a, m - 2, m);
}
```

### 2. Fibonacci in O(log n) - Matrix Exponentiation
```cpp
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
```

---

## ⚠️ Common Pitfalls

1. **Negative base**: Use `(a % m + m) % m` to handle negative a
2. **Overflow**: Use `__int128` or `mulmod` for large m
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
