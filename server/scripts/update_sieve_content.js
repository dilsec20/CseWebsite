/**
 * One-time script to update the Sieve of Eratosthenes topic content in the database.
 * Run: node scripts/update_sieve_content.js
 */
const pool = require('../db');

// Import the updated content from setup_cp.js
// We'll read the numberTheoryTopics array indirectly by requiring the file data

const updatedContent = `# Sieve of Eratosthenes

## 🧠 Intuition — What & Why?
Imagine you need to find **all prime numbers from 1 to 1,000,000**. Checking each number one-by-one using the $O(\\sqrt{N})$ primality test would be too slow — that's $10^6 \\times 10^3 = 10^9$ operations!

The **Sieve of Eratosthenes** is a clever shortcut: instead of checking if each number is prime, we **eliminate all composite numbers** by crossing out multiples. Whatever survives is prime.

> **Think of it like this**: Write numbers 2 to N on a whiteboard. Circle 2 (it's prime), then erase all multiples of 2 (4, 6, 8...). Move to the next un-erased number (3), circle it, erase its multiples (9, 15, 21...). Keep going. Everything still on the board at the end is prime!

---

## 📝 Step-by-Step Code Explanation

\`\`\`cpp
const int MAXN = 1000000;       // We want primes up to 1 million
bool is_prime[MAXN + 1];        // is_prime[i] = true means i is prime

void sieve() {
    // Step 1: Assume everything is prime initially
    fill(is_prime, is_prime + MAXN + 1, true);

    // Step 2: 0 and 1 are NOT prime (by definition)
    is_prime[0] = is_prime[1] = false;

    // Step 3: For each number p starting from 2...
    for (int p = 2; p * p <= MAXN; p++) {

        // Step 4: If p is still marked prime, it IS prime
        if (is_prime[p]) {

            // Step 5: Mark ALL multiples of p as NOT prime
            // Start from p*p (because smaller multiples are already marked)
            for (int i = p * p; i <= MAXN; i += p)
                is_prime[i] = false;
        }
    }
}
\`\`\`

### Line-by-Line Breakdown:

| Line | What it does | Why? |
|------|-------------|------|
| \`fill(is_prime, ..., true)\` | Sets every entry to \`true\` | We start optimistic — assume all are prime |
| \`is_prime[0] = is_prime[1] = false\` | Marks 0 and 1 as non-prime | By definition, primes start from 2 |
| \`p * p <= MAXN\` | Only loop up to $\\sqrt{N}$ | If a number has a factor > $\\sqrt{N}$, it must also have one < $\\sqrt{N}$ (already handled) |
| \`if (is_prime[p])\` | Skip if p is already crossed out | Its multiples were already removed by a smaller prime |
| \`i = p * p\` | Start crossing from $p^2$, not $2p$ | Multiples $2p, 3p, ..., (p-1)p$ were already crossed by primes 2, 3, ..., $p-1$ |
| \`i += p\` | Jump in steps of p | $p^2, p^2+p, p^2+2p, ...$ are all multiples of p |

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

**Final result — Primes up to 30**:
> **2, 3, 5, 7, 11, 13, 17, 19, 23, 29** ✅

---

## ⚡ Key Implementation Tips

1. **Why start inner loop from $p^2$?**
   All multiples $2 \\times p, 3 \\times p, ..., (p-1) \\times p$ have a factor smaller than $p$, so they were already marked by an earlier prime. Starting from $p^2$ saves a LOT of time.

2. **Global arrays in C++** are initialized to 0 (false) by default. If using global array, you can initialize to \`true\` with \`memset(is_prime, true, sizeof(is_prime))\` instead of \`fill\`.

3. **Memory limit**: \`bool\` array for $10^7$ uses ~10 MB. For $10^8$, use \`bitset\` to reduce to ~12.5 MB.

4. **Speed**: You can find all primes up to $10^7$ in under 1 second easily. For $10^8$, it takes about 3-4 seconds.

5. **Common mistake**: Forgetting \`is_prime[0] = is_prime[1] = false\`. This causes wrong answers when the problem asks "is 1 prime?"

**Time Complexity**: $O(N \\log \\log N)$ — almost linear!
**Space Complexity**: $O(N)$

### Practice Problems
- [TDKPRIME - Finding the Kth Prime](https://www.spoj.com/problems/TDKPRIME/)
- [Sherlock and his girlfriend (Codeforces 776B)](https://codeforces.com/problemset/problem/776/B)`;

async function updateSieveContent() {
    try {
        console.log('🔄 Updating Sieve of Eratosthenes content...');

        // Find the topic by title pattern
        const findResult = await pool.query(
            "SELECT topic_id, title FROM cp_topics WHERE title LIKE '%Sieve%'"
        );

        if (findResult.rows.length === 0) {
            console.error('❌ Topic "Sieve of Eratosthenes" not found in database!');
            process.exit(1);
        }

        const topic = findResult.rows[0];
        console.log(`📍 Found topic: "${topic.title}" (ID: ${topic.topic_id})`);

        // Update the content
        const updateResult = await pool.query(
            'UPDATE cp_topics SET content = $1 WHERE topic_id = $2',
            [updatedContent, topic.topic_id]
        );

        if (updateResult.rowCount === 1) {
            console.log('✅ Successfully updated Sieve of Eratosthenes content!');
            console.log('📝 New content includes: Intuition, Code Explanation, Dry Run, Tips');
        } else {
            console.error('❌ Update failed - no rows affected');
        }

        process.exit(0);
    } catch (err) {
        console.error('❌ Error:', err.message);
        process.exit(1);
    }
}

updateSieveContent();
