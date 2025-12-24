const pool = require('../db');

const modules = [
    "Number Theory",
    "Bit Manipulation",
    "Combinatorics",
    "Advance Mathematics",
    "Greedy Algorithms",
    "Searching Techniques",
    "Must know Data Structures",
    "Pre-Computation",
    "Graph Algorithms",
    "Tree Algorithms",
    "Dynamic Programming",
    "Range Queries",
    "String Algorithms",
    "Game Theory",
    "Advanced Topics"
];

const numberTheoryTopics = [
    {
        title: "1. Basic Number Theory & Primality Test",
        content: `# Primality Test
**Intution**: A number $N$ is prime if it has exactly two divisors: 1 and $N$.
To check if a number is prime efficiently, we only need to check divisors up to $\\sqrt{N}$. If $N$ has a divisor greater than $\\sqrt{N}$, it must also have a corresponding divisor smaller than $\\sqrt{N}$.

### Code Template (C++)
\`\`\`cpp
bool isPrime(long long n) {
    if (n <= 1) return false;
    if (n <= 3) return true;
    if (n % 2 == 0 || n % 3 == 0) return false;
    for (long long i = 5; i * i <= n; i = i + 6)
        if (n % i == 0 || n % (i + 2) == 0)
            return false;
    return true;
}
\`\`\`
**Time Complexity**: $O(\\sqrt{N})$

### Practice Problems
- [Prime Generator (SPOJ)](https://www.spoj.com/problems/PRIME1/) - Easy
- [Checking for Primes](https://codeforces.com/problemset/problem/999/999) - Easy`
    },
    {
        title: "2. Sieve of Eratosthenes",
        content: `# Sieve of Eratosthenes
**Concept**: An efficient algorithm to find all prime numbers up to a specified integer $N$.
**Algorithm**:
1. Create a boolean array \`isPrime[0..N]\` and initialize all entries as true.
2. Mark 0 and 1 as false.
3. For $p = 2$ to $\\sqrt{N}$:
    If \`isPrime[p]\` is true, loop through all multiples of $p$ starting from $p*p$ and mark them as false.

### Code Template
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
**Time Complexity**: $O(N \\log \\log N)$
**Tips**:
- Global arrays are initialized to 0 (false) by default in C++.
- You can compute primes up to $10^7$ in ~1 second.

### Practice Problems
- [TDKPRIME - Finding the Kth Prime](https://www.spoj.com/problems/TDKPRIME/)
- [Sherlock and his girlfriend (Codeforces 776B)](https://codeforces.com/problemset/problem/776/B)`
    },
    {
        title: "3. Euclidean Algorithm (GCD & LCM)",
        content: `# GCD & LCM
**GCD (Greatest Common Divisor)**: The largest number that divides both $A$ and $B$.
**LCM (Least Common Multiple)**: The smallest number divisible by both $A$ and $B$.

**Relationship**: $A \\times B = GCD(A, B) \\times LCM(A, B)$

### Euclidean Algorithm
\`\`\`cpp
long long gcd(long long a, long long b) {
    if (b == 0) return a;
    return gcd(b, a % b);
}

// C++ Built-in (recommended)
// #include <numeric>
// std::gcd(a, b);
\`\`\`

### Extended Euclidean Algorithm
Used to find integer solutions for $ax + by = gcd(a, b)$. Useful for finding Modular Inverse.

\`\`\`cpp
long long extended_gcd(long long a, long long b, long long &x, long long &y) {
    if (b == 0) {
        x = 1; y = 0;
        return a;
    }
    long long x1, y1;
    long long d = extended_gcd(b, a % b, x1, y1);
    x = y1;
    y = x1 - y1 * (a / b);
    return d;
}
\`\`\`

### Practice Problems
- [GCD and LCM (CodeChef)](https://www.codechef.com/problems/FLOW016)
- [Complicated GCD (Codeforces 664A)](https://codeforces.com/problemset/problem/664/A)`
    },
    {
        title: "4. Binary Exponentiation (Modular Pow)",
        content: `# Binary Exponentiation
**Goal**: Compute $a^b$ efficiently in $O(\\log b)$.
**Idea**: 
$a^{13} = a^{1101_2} = a^8 \\cdot a^4 \\cdot a^1$

### Code Template
\`\`\`cpp
long long binpow(long long a, long long b, long long m) {
    a %= m;
    long long res = 1;
    while (b > 0) {
        if (b & 1) res = res * a % m;
        a = a * a % m;
        b >>= 1;
    }
    return res;
}
\`\`\`
**Tip**: Always handle negative bases using \`(a % m + m) % m\`.

### Practice Problems
- [Big Mod (UVA 374)](https://onlinejudge.org/index.php?option=com_onlinejudge&Itemid=8&category=5&page=show_problem&problem=310)
- [Parking Lot (Codeforces 630I)](https://codeforces.com/problemset/problem/630/I)`
    }
];

async function setupCP() {
    try {
        console.log('🚀 Setting up Competitive Programming Path...');

        // 1. Create Tables
        await pool.query(`
            CREATE TABLE IF NOT EXISTS cp_modules (
                module_id SERIAL PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                description TEXT,
                module_order INT DEFAULT 0
            );
        `);
        console.log('✅ cp_modules table created/verified');

        await pool.query(`
            CREATE TABLE IF NOT EXISTS cp_topics (
                topic_id SERIAL PRIMARY KEY,
                module_id INT REFERENCES cp_modules(module_id),
                title VARCHAR(255) NOT NULL,
                content TEXT,
                video_url TEXT,
                topic_order INT DEFAULT 0
            );
        `);
        console.log('✅ cp_topics table created/verified');

        // 2. Clear existing data to avoid duplicates/mess (Optional: remove this if you want to preserve)
        // For development/setup, it's cleaner to reset tables or check existence carefully.
        // Let's check if modules exist differently.

        // 3. Insert Modules
        for (let i = 0; i < modules.length; i++) {
            const title = modules[i];
            const check = await pool.query('SELECT * FROM cp_modules WHERE title = $1', [title]);

            let module_id;
            if (check.rows.length === 0) {
                const res = await pool.query(
                    'INSERT INTO cp_modules (title, description, module_order) VALUES ($1, $2, $3) RETURNING module_id',
                    [title, `Master ${title} techniques for CP.`, i + 1]
                );
                module_id = res.rows[0].module_id;
                console.log(`   + Added Module: ${title}`);
            } else {
                module_id = check.rows[0].module_id;
                console.log(`   . Module exists: ${title}`);
            }

            // 4. Insert Topics for Module 1 (Number Theory)
            if (i === 0) { // Number Theory is index 0
                for (let j = 0; j < numberTheoryTopics.length; j++) {
                    const topic = numberTheoryTopics[j];
                    const topicCheck = await pool.query('SELECT * FROM cp_topics WHERE module_id = $1 AND title = $2', [module_id, topic.title]);

                    if (topicCheck.rows.length === 0) {
                        await pool.query(
                            'INSERT INTO cp_topics (module_id, title, content, topic_order) VALUES ($1, $2, $3, $4)',
                            [module_id, topic.title, topic.content, j + 1]
                        );
                        console.log(`      + Added Topic: ${topic.title}`);
                    }
                }
            }
        }

        // 5. Enable RLS (Security Best Practice)
        await pool.query(`ALTER TABLE cp_modules ENABLE ROW LEVEL SECURITY;`);
        await pool.query(`ALTER TABLE cp_topics ENABLE ROW LEVEL SECURITY;`);
        console.log('✅ Enabled RLS on CP tables');

        console.log('✨ Competitive Programming setup complete!');
        process.exit(0);

    } catch (err) {
        console.error('❌ Error:', err);
        process.exit(1);
    }
}

setupCP();
