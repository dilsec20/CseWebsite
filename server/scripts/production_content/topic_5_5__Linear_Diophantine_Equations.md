# Linear Diophantine Equations

## 🎯 Concept Overview
Solve equations of form: $ax + by = c$ where we need integer solutions.

**Solution exists iff** $\gcd(a, b) | c$

---

## 🧠 Algorithm

1. Use Extended GCD to find $x_0, y_0$ such that $ax_0 + by_0 = \gcd(a,b)$
2. Multiply by $c / \gcd(a,b)$ to get a particular solution
3. General solution: $x = x_0 + k \cdot \frac{b}{g}$, $y = y_0 - k \cdot \frac{a}{g}$

---

## 💻 Code Template

```cpp
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
```

---

## 🎮 Patterns

### Pattern: Coin Problem
"Can you pay exactly C using coins of value A and B?"
This is $Ax + By = C$ where $x, y \geq 0$.

### Pattern: Chicken McNugget
Largest number that CANNOT be represented as $ax + by$ (where $\gcd(a,b) = 1$):
$$\text{Frobenius number} = ab - a - b$$

---

## 📚 Practice Problems

- [Ebony and Ivory (CF 633A)](https://codeforces.com/problemset/problem/633/A)
- [Get AC (AtCoder ABC186E)](https://atcoder.jp/contests/abc186/tasks/abc186_e)
