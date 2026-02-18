/**
 * Update Sieve of Eratosthenes — MERGED version.
 * Keeps original production-style structure (concept, code templates, complexity, pitfalls, patterns, practice problems)
 * and ADDS dry run + line-by-line code explanation.
 */
const { Pool } = require('pg');

const pool = new Pool({
    connectionString: 'postgresql://postgres.xlqzqcqacpajpqwneqpa:05Supabase%40%40%3F%3F@aws-1-ap-south-1.pooler.supabase.com:6543/postgres',
    ssl: { rejectUnauthorized: false }
});

const mergedContent = `# Sieve of Eratosthenes

## 🎯 Concept Overview
The **Sieve of Eratosthenes** is an efficient algorithm to find **all prime numbers up to a specified integer N**.

**When to use:**
- Finding all primes up to N (e.g., precompute primes for multiple queries)
- Counting primes in a range
- Problems involving prime factorization of multiple numbers
- Any problem where you need fast \`isPrime[x]\` lookups

---

## 🧠 Algorithm & Intuition

**Idea**: Instead of checking each number for primality, **eliminate all composite numbers** by crossing out multiples. Whatever survives is prime.

> **Think of it like this**: Write numbers 2 to N on a whiteboard. Circle 2 (it's prime), then erase all multiples of 2 (4, 6, 8...). Move to the next un-erased number (3), circle it, erase its multiples (9, 15, 21...). Keep going. Everything still on the board at the end is prime!

**Algorithm Steps:**
1. Create a boolean array \`isPrime[0..N]\` and initialize all entries as true.
2. Mark 0 and 1 as false (not prime by definition).
3. For each $p$ from 2 to $\\sqrt{N}$:
   - If \`isPrime[p]\` is true, mark all multiples of $p$ starting from $p^2$ as false.

**Why start from $p^2$?** All smaller multiples like $2p, 3p, ..., (p-1)p$ have a factor smaller than $p$, so they were already marked by an earlier prime.

---

## 💻 Code Templates

### Standard Sieve
\`\`\`cpp
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
\`\`\`

### 📝 Line-by-Line Breakdown

| Line | What it does | Why? |
|------|-------------|------|
| \`fill(is_prime, ..., true)\` | Sets every entry to \`true\` | Start optimistic — assume all are prime |
| \`is_prime[0] = is_prime[1] = false\` | Marks 0 and 1 as non-prime | By definition, primes start from 2 |
| \`p * p <= MAXN\` | Only loop p up to $\\sqrt{N}$ | If a number has a factor > $\\sqrt{N}$, it must also have one < $\\sqrt{N}$ (already handled) |
| \`if (is_prime[p])\` | Skip if p is already crossed out | Its multiples were already removed by a smaller prime |
| \`i = p * p\` | Start crossing from $p^2$, not $2p$ | Multiples $2p, 3p, ..., (p-1)p$ already crossed by smaller primes |
| \`i += p\` | Jump in steps of p | $p^2, p^2+p, p^2+2p, ...$ are all multiples of p |

### Segmented Sieve (for large ranges)
\`\`\`cpp
// Finds primes in range [L, R] where R can be up to 10^12
// Requires: R - L + 1 fits in memory
vector<bool> segmented_sieve(long long L, long long R) {
    long long lim = sqrt(R);
    // First, get small primes up to sqrt(R)
    vector<bool> mark(lim + 1, false);
    vector<long long> primes;
    for (long long i = 2; i <= lim; i++) {
        if (!mark[i]) {
            primes.push_back(i);
            for (long long j = i * i; j <= lim; j += i)
                mark[j] = true;
        }
    }
    
    vector<bool> is_prime(R - L + 1, true);
    for (long long p : primes) {
        long long start = max(p * p, ((L + p - 1) / p) * p);
        for (long long j = start; j <= R; j += p)
            is_prime[j - L] = false;
    }
    if (L == 1) is_prime[0] = false;
    return is_prime;
}
\`\`\`

---

## 🔍 Dry Run — Finding primes up to N = 30

**Initial array** (all \`true\` except 0, 1):

| Index | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 |
|-------|---|---|---|---|---|---|---|---|---|---|----|----|----|----|----|----|
| Prime? | ❌ | ❌ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |

| Index | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 |
|-------|----|----|----|----|----|----|----|----|----|----|----|----|----|----|-----|
| Prime? | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |

**p = 2** (is prime ✅): Cross out multiples starting from $2^2 = 4$:
→ Cross: **4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30**

**p = 3** (is prime ✅): Cross out multiples starting from $3^2 = 9$:
→ Cross: **9, 15, 21, 27** (6, 12, 18, 24, 30 already crossed by 2)

**p = 4** (already crossed ❌): **Skip!**

**p = 5** (is prime ✅): Cross out multiples starting from $5^2 = 25$:
→ Cross: **25** (30 already crossed by 2)

**Loop ends** since $6^2 = 36 > 30$.

**Final result — Primes up to 30:**
> **2, 3, 5, 7, 11, 13, 17, 19, 23, 29** ✅

---

## ⏱️ Complexity Analysis

| Method | Time | Space | Use Case |
|--------|------|-------|----------|
| Standard Sieve | $O(N \\log \\log N)$ | $O(N)$ | N ≤ $10^7$ |
| Segmented Sieve | $O((R-L) \\log \\log R)$ | $O(\\sqrt{R} + (R-L))$ | Large ranges up to $10^{12}$ |

- Standard sieve can handle up to $10^7$ in ~1 second, $10^8$ in ~3-4 seconds.
- \`bool\` array for $10^7$ uses ~10 MB. For $10^8$, use \`bitset\` to reduce to ~12.5 MB.

---

## ⚠️ Common Pitfalls

1. **Forgetting base cases**: Always set \`is_prime[0] = is_prime[1] = false\`. Causes WA when problem asks "is 1 prime?"

2. **Integer overflow in inner loop**: Use \`long long\` if MAXN > $4.6 \\times 10^4$ for \`i * i\`
   \`\`\`cpp
   for (long long i = p * p; ...)  // NOT int if MAXN is large
   \`\`\`

3. **Global vs Local arrays**: Global arrays are initialized to 0; local arrays contain garbage. Use global for large arrays.

4. **Memory limit**: \`bool\` array for $10^8$ takes ~100 MB. Use \`bitset\` or segmented sieve instead.

---

## 🎮 Patterns

### Pattern 1: "Find all primes ≤ N"
Use standard sieve directly.

### Pattern 2: "Count/Find primes in range [L, R]" (L, R up to $10^{12}$)
Use **Segmented Sieve**.

### Pattern 3: "Smallest prime factor of every number ≤ N"
\`\`\`cpp
int spf[MAXN + 1]; // smallest prime factor
void sieve_spf() {
    for (int i = 0; i <= MAXN; i++) spf[i] = i;
    for (int p = 2; p * p <= MAXN; p++) {
        if (spf[p] == p) { // p is prime
            for (int i = p * p; i <= MAXN; i += p)
                if (spf[i] == i) spf[i] = p;
        }
    }
}
// Usage: Factorize any n ≤ MAXN in O(log n)
// while (n > 1) { factors.push(spf[n]); n /= spf[n]; }
\`\`\`

### Pattern 4: "Count divisors / Sum of divisors for all numbers ≤ N"
Modify sieve to compute multiplicative functions.

---

## 📚 Practice Problems

### Easy (800-1200)
- [TDKPRIME - Finding the Kth Prime](https://www.spoj.com/problems/TDKPRIME/)
- [Sherlock and his girlfriend (CF 776B)](https://codeforces.com/problemset/problem/776/B)

### Medium (1300-1700)
- [T-primes (CF 230B)](https://codeforces.com/problemset/problem/230/B)
- [Noldbach Problem (CF 17A)](https://codeforces.com/problemset/problem/17/A)
- [Segmented Sieve (SPOJ PRIME1)](https://www.spoj.com/problems/PRIME1/)

### Hard (1800+)
- [Almost Prime (CF 26A)](https://codeforces.com/problemset/problem/26/A)
- [Sherlock and Divisors (CF 776E)](https://codeforces.com/problemset/problem/776/E)
- [Count Primes (LeetCode 204)](https://leetcode.com/problems/count-primes/)`;

async function updateSieveContent() {
    try {
        console.log('🔄 Connecting to PRODUCTION database...');

        const testConn = await pool.query('SELECT NOW()');
        console.log('✅ Connected at:', testConn.rows[0].now);

        // Find the topic
        const findResult = await pool.query(
            "SELECT topic_id, title, LENGTH(content) as old_len FROM cp_topics WHERE title LIKE '%Sieve%'"
        );

        if (findResult.rows.length === 0) {
            console.error('❌ Topic not found!');
            process.exit(1);
        }

        const topic = findResult.rows[0];
        console.log(`📍 Found: "${topic.title}" (ID: ${topic.topic_id}, current: ${topic.old_len} chars)`);

        // Update
        await pool.query(
            'UPDATE cp_topics SET content = $1 WHERE topic_id = $2',
            [mergedContent, topic.topic_id]
        );

        // Verify
        const verify = await pool.query(
            "SELECT LENGTH(content) as new_len FROM cp_topics WHERE topic_id = $1",
            [topic.topic_id]
        );
        console.log(`✅ Updated! New length: ${verify.rows[0].new_len} chars`);
        console.log('📝 Structure: Concept → Algorithm → Code (with line-by-line) → Dry Run → Complexity → Pitfalls → Patterns → Practice Problems');

        await pool.end();
        process.exit(0);
    } catch (err) {
        console.error('❌ Error:', err.message);
        process.exit(1);
    }
}

updateSieveContent();
