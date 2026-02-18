# Euclidean Algorithm (GCD & LCM)

## 🎯 Concept Overview
**GCD (Greatest Common Divisor)**: Largest number dividing both A and B.
**LCM (Least Common Multiple)**: Smallest number divisible by both A and B.

$$\text{LCM}(A, B) = \frac{A \times B}{\text{GCD}(A, B)}$$

---

## 🧠 Algorithm

### Euclidean Algorithm
$$\text{GCD}(A, B) = \text{GCD}(B, A \mod B)$$
Base case: $\text{GCD}(A, 0) = A$

### Extended Euclidean Algorithm
Find x, y such that: $Ax + By = \text{GCD}(A, B)$

---

## 💻 Code Templates

### Basic GCD (Recursive)
```cpp
long long gcd(long long a, long long b) {
    return b == 0 ? a : gcd(b, a % b);
}

long long lcm(long long a, long long b) {
    return a / gcd(a, b) * b;  // Avoid overflow
}

// C++17: use std::gcd and std::lcm from <numeric>
```

### Extended GCD
```cpp
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
```

### Binary GCD (Stein's Algorithm) - Faster on some systems
```cpp
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
```

---

## 🎮 Patterns

### Pattern 1: GCD of Array
```cpp
int arrayGcd(vector<int>& arr) {
    int result = arr[0];
    for (int i = 1; i < arr.size(); i++)
        result = gcd(result, arr[i]);
    return result;
}
```

### Pattern 2: LCM of Array (watch for overflow!)
```cpp
long long arrayLcm(vector<int>& arr) {
    long long result = arr[0];
    for (int i = 1; i < arr.size(); i++) {
        result = result / gcd(result, (long long)arr[i]) * arr[i];
        if (result > 1e18) return -1;  // Overflow
    }
    return result;
}
```

### Pattern 3: Count pairs with GCD = K
Count pairs (i, j) where GCD(arr[i], arr[j]) = K.
**Approach**: Divide all elements by K, count pairs with GCD = 1.

---

## ⚠️ Common Pitfalls

1. **LCM overflow**: Compute `a / gcd(a,b) * b` not `a * b / gcd(a,b)`
2. **Negative numbers**: Use `abs()` before GCD
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
