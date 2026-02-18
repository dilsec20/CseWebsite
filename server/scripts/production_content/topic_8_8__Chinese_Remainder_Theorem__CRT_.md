# Chinese Remainder Theorem

## 🎯 Concept Overview
Solve system of congruences:
$$x \equiv a_1 \pmod{m_1}$$
$$x \equiv a_2 \pmod{m_2}$$
$$\vdots$$

**Requirement**: All $m_i$ are pairwise coprime.
**Unique solution** exists modulo $M = m_1 \cdot m_2 \cdots$

---

## 💻 Code Template

### Two Equations
```cpp
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
```

### General CRT (N equations)
```cpp
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
```

---

## 🎮 Applications

1. **Compute large mod products**: Split mod into prime powers, compute separately, combine with CRT
2. **Garner's Algorithm**: Alternative to CRT for large numbers
3. **Hash collision avoidance**: Use multiple mods, combine results

---

## 📚 Practice Problems

- [Remainders Game (CF 687B)](https://codeforces.com/problemset/problem/687/B)
- [Strange Food Chain (SPOJ)](https://www.spoj.com/problems/CHAIN/)
