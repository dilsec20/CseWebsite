const { Pool } = require('pg');

const connectionString = 'postgresql://postgres.xlqzqcqacpajpqwneqpa:05Supabase%40%40%3F%3F@aws-1-ap-south-1.pooler.supabase.com:6543/postgres';

const pool = new Pool({
    connectionString: connectionString,
    ssl: { rejectUnauthorized: false }
});

const binaryExpContent = `# Binary Exponentiation
**Goal**: Compute $a^b$ efficiently in $O(\\log b)$.

**Idea**: 
Using the binary representation of the exponent:
$$a^{13} = a^{1101_2} = a^8 \\cdot a^4 \\cdot a^1$$

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
- [Parking Lot (Codeforces 630I)](https://codeforces.com/problemset/problem/630/I)`;

const bitwiseContent = `# Bitwise Operators
Basic operators in C++:
- \`&\` (AND): 1 if both bits are 1.
- \`|\` (OR): 1 if at least one bit is 1.
- \`^\` (XOR): 1 if bits are different.
- \`~\` (NOT): Inverts all bits (one's complement).
- \`<<\` (Left Shift): \`a << b\` multiplies $a$ by $2^b$.
- \`>>\` (Right Shift): \`a >> b\` divides $a$ by $2^b$.

### Truth Table (XOR)
| A | B | A^B |
|---|---|---|
| 0 | 0 | 0 |
| 0 | 1 | 1 |
| 1 | 0 | 1 |
| 1 | 1 | 0 |

### Properties of XOR
$$x \\oplus x = 0$$
$$x \\oplus 0 = x$$
$$x \\oplus y = y \\oplus x \\quad (\\text{Commutative})$$
$$(x \\oplus y) \\oplus z = x \\oplus (y \\oplus z) \\quad (\\text{Associative})$$

**Key Application**: In an array where every element appears twice except one, find that unique element.
**Solution**: XOR all elements.
$$Result = \\text{UniqueElement}$$

### Complexity
All bitwise operations are $O(1)$.

### Practice Problems
- [A+B (Trial Problem)](https://codeforces.com/problemset/problem/1/A)
- [Sum of Two Integers (LeetCode)](https://leetcode.com/problems/sum-of-two-integers/)
- [Mahmoud and Ehab and the xor-MST (Codeforces 959C)](https://codeforces.com/problemset/problem/959/C)
- [XORwice (Codeforces 1421A)](https://codeforces.com/problemset/problem/1421/A)`;

async function updateContent() {
    try {
        console.log('🔄 Updating CP Content...');

        // Update Binary Exponentiation
        const res1 = await pool.query(
            `UPDATE cp_topics SET content = $1 WHERE title LIKE '4. Binary Exponentiation%'`,
            [binaryExpContent]
        );
        console.log(`✅ Updated Binary Exponentiation: ${res1.rowCount} rows`);

        // Update Bitwise Operators
        const res2 = await pool.query(
            `UPDATE cp_topics SET content = $1 WHERE title LIKE '1. Bitwise Operators%'`,
            [bitwiseContent]
        );
        console.log(`✅ Updated Bitwise Operators: ${res2.rowCount} rows`);

        await pool.end();
    } catch (err) {
        console.error('❌ Error updating content:', err);
    }
}

updateContent();
