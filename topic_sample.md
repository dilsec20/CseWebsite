# Sieve of Eratosthenes
**Concept**: An efficient algorithm to find all prime numbers up to a specified integer $N$.
**Algorithm**:
1. Create a boolean array `isPrime[0..N]` and initialize all entries as true.
2. Mark 0 and 1 as false.
3. For $p = 2$ to $\sqrt{N}$:
    If `isPrime[p]` is true, loop through all multiples of $p$ starting from $p*p$ and mark them as false.

### Code Template
```cpp
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
```
**Time Complexity**: $O(N \log \log N)$
**Tips**:
- Global arrays are initialized to 0 (false) by default in C++.
- You can compute primes up to $10^7$ in ~1 second.

### Practice Problems
- [TDKPRIME - Finding the Kth Prime](https://www.spoj.com/problems/TDKPRIME/)
- [Sherlock and his girlfriend (Codeforces 776B)](https://codeforces.com/problemset/problem/776/B)