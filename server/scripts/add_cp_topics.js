const pool = require('../db');

async function addCompetitiveProgrammingTopics() {
    const client = await pool.connect();
    try {
        console.log('🚀 Adding Competitive Programming Topics...\n');

        // Create new modules for CP topics
        const bitManipModule = await client.query(
            "INSERT INTO dsa_modules (title, description, order_index) VALUES ($1, $2, $3) RETURNING module_id",
            ['14. Bit Manipulation', 'Master bitwise operations, bit masking, and XOR tricks.', 14]
        );
        const bitModuleId = bitManipModule.rows[0].module_id;
        console.log('✅ Created Module: Bit Manipulation');

        const numberTheoryModule = await client.query(
            "INSERT INTO dsa_modules (title, description, order_index) VALUES ($1, $2, $3) RETURNING module_id",
            ['15. Number Theory & Math', 'GCD, LCM, Prime numbers, Modular arithmetic for CP.', 15]
        );
        const mathModuleId = numberTheoryModule.rows[0].module_id;
        console.log('✅ Created Module: Number Theory & Math');

        // Get problem IDs
        const getProbId = async (titlePart) => {
            const res = await client.query("SELECT problem_id FROM problems WHERE title ILIKE $1 LIMIT 1", [`%${titlePart}%`]);
            return res.rows[0]?.problem_id || null;
        };

        const singleNumberId = await getProbId('Single Number');

        // === BIT MANIPULATION MODULE ===

        // Topic 1: Bit Manipulation Fundamentals
        await client.query(
            "INSERT INTO dsa_topics (module_id, title, content, problem_id, order_index) VALUES ($1, $2, $3, $4, $5)",
            [bitModuleId, 'Bit Manipulation Fundamentals', `
# Bit Manipulation Fundamentals

Bit manipulation involves directly operating on bits (0s and 1s) - the most fundamental representation of data.

## Binary Number System
Decimal to Binary:
- 5 = 101₂ (4 + 0 + 1)
- 13 = 1101₂ (8 + 4 + 0 + 1)

## Bitwise Operators

### 1. AND (&)
Returns 1 only if both bits are 1.
\`\`\`cpp
5 & 3
  101  (5)
& 011  (3)
-----
  001  (1)
\`\`\`

### 2. OR (|)
Returns 1 if at least one bit is 1.
\`\`\`cpp
5 | 3
  101  (5)
| 011  (3)
-----
  111  (7)
\`\`\`

### 3. XOR (^)
Returns 1 if bits are different.
\`\`\`cpp
5 ^ 3
  101  (5)
^ 011  (3)
-----
  110  (6)
\`\`\`

**XOR Properties (Very Important!)**
- \`a ^ a = 0\` (Same numbers cancel out)
- \`a ^ 0 = a\` (XOR with 0 = unchanged)
- \`a ^ b ^ a = b\` (Commutative)

### 4. NOT (~)
Flips all bits (0→1, 1→0).
\`\`\`cpp
~5 = -6  // In 32-bit: flips all 32 bits
\`\`\`

### 5. Left Shift (<<)
Shifts bits left, fills with 0. **Multiplies by 2^n**.
\`\`\`cpp
5 << 1   // 101 → 1010 = 10 (5 * 2)
5 << 2   // 101 → 10100 = 20 (5 * 4)
\`\`\`

### 6. Right Shift (>>)
Shifts bits right. **Divides by 2^n**.
\`\`\`cpp
20 >> 1  // 10100 → 1010 = 10 (20 / 2)
20 >> 2  // 10100 → 101 = 5 (20 / 4)
\`\`\`

## Essential Bit Operations

### Check if i-th bit is set
\`\`\`cpp
bool isSet(int num, int i) {
    return (num & (1 << i)) != 0;
}
// Example: isSet(5, 0) = true (101, bit 0 is 1)
\`\`\`

### Set i-th bit
\`\`\`cpp
int setBit(int num, int i) {
    return num | (1 << i);
}
// Example: setBit(5, 1) = 7 (101 → 111)
\`\`\`

### Clear i-th bit
\`\`\`cpp
int clearBit(int num, int i) {
    return num & ~(1 << i);
}
// Example: clearBit(5, 2) = 1 (101 → 001)
\`\`\`

### Toggle i-th bit
\`\`\`cpp
int toggleBit(int num, int i) {
    return num ^ (1 << i);
}
// Example: toggleBit(5, 1) = 7 (101 → 111)
\`\`\`

### Count set bits (Popcount)
\`\`\`cpp
int countSetBits(int n) {
    int count = 0;
    while (n) {
        count += n & 1;
        n >>= 1;
    }
    return count;
}
// Brian Kernighan's Algorithm (Better!)
int countSetBits(int n) {
    int count = 0;
    while (n) {
        n = n & (n - 1);  // Removes rightmost set bit
        count++;
    }
    return count;
}
\`\`\`

## Tips & Tricks
- XOR is self-inverse: \`a ^ b ^ b = a\`
- Use left shift for powers of 2: \`1 << n = 2^n\`
- Check even/odd: \`n & 1\` (1 = odd, 0 = even)
- Check power of 2: \`n & (n-1) == 0\` (and \`n != 0\`)
- Multiply/divide by 2: Use \`<< 1\` and \`>> 1\` (faster than * and /)

## Related Problems
- [Single Number](/problems/${singleNumberId}) - Classic XOR problem
            `, singleNumberId, 1]
        );

        // Topic 2: Bit Masking Techniques
        await client.query(
            "INSERT INTO dsa_topics (module_id, title, content, problem_id, order_index) VALUES ($1, $2, $3, $4, $5)",
            [bitModuleId, 'Bit Masking Techniques', `
# Bit Masking

Bit masking uses integers to represent sets of elements. Each bit position represents whether an element is present (1) or absent (0).

## Why Bit Masking?
- **Space Efficient**: Store 32 boolean values in one integer
- **Fast Operations**: Set operations (union, intersection) in O(1)
- **Dynamic Programming**: Represent states compactly

## Basic Bit Mask Operations

### Representing a Set
\`\`\`cpp
// Set of {0, 2, 4} represented as 10101₂ = 21
int mask = (1 << 0) | (1 << 2) | (1 << 4);  // 21
\`\`\`

### Check if element i is in set
\`\`\`cpp
bool contains(int mask, int i) {
    return (mask & (1 << i)) != 0;
}
\`\`\`

### Add element i to set
\`\`\`cpp
int add(int mask, int i) {
    return mask | (1 << i);
}
\`\`\`

### Remove element i from set
\`\`\`cpp
int remove(int mask, int i) {
    return mask & ~(1 << i);
}
\`\`\`

### Toggle element i
\`\`\`cpp
int toggle(int mask, int i) {
    return mask ^ (1 << i);
}
\`\`\`

## Set Operations Using Masks

### Union (Set A OR Set B)
\`\`\`cpp
int unionSet(int maskA, int maskB) {
    return maskA | maskB;
}
\`\`\`

### Intersection (Set A AND Set B)
\`\`\`cpp
int intersection(int maskA, int maskB) {
    return maskA & maskB;
}
\`\`\`

### Difference (Set A - Set B)
\`\`\`cpp
int difference(int maskA, int maskB) {
    return maskA & ~maskB;
}
\`\`\`

## Iterating Through All Subsets
\`\`\`cpp
int n = 3;  // Elements {0, 1, 2}
for (int mask = 0; mask < (1 << n); mask++) {
    // mask represents a subset
    cout << "Subset: ";
    for (int i = 0; i < n; i++) {
        if (mask & (1 << i)) {
            cout << i << " ";
        }
    }
    cout << endl;
}
// Prints all 2^3 = 8 subsets
\`\`\`

## Iterating Through All Subsets of a Mask
\`\`\`cpp
int fullMask = 13;  // 1101₂ = {0, 2, 3}
for (int submask = fullMask; submask; submask = (submask - 1) & fullMask) {
    // Iterate through all subsets of fullMask
    cout << submask << endl;
}
// Prints: 13, 12, 9, 8, 5, 4, 1
\`\`\`

## DP with Bitmask Example: Traveling Salesman
\`\`\`cpp
// dp[mask][i] = minimum cost to visit cities in 'mask' and end at city i
int n = 4;  // 4 cities
vector<vector<int>> dp(1 << n, vector<int>(n, INT_MAX));

dp[1][0] = 0;  // Start at city 0

for (int mask = 0; mask < (1 << n); mask++) {
    for (int u = 0; u < n; u++) {
        if (!(mask & (1 << u))) continue;  // u not in mask
        
        for (int v = 0; v < n; v++) {
            if (mask & (1 << v)) continue;  // v already visited
            
            int newMask = mask | (1 << v);
            dp[newMask][v] = min(dp[newMask][v], dp[mask][u] + dist[u][v]);
        }
    }
}
\`\`\`

## Advanced Tricks

### Get rightmost set bit
\`\`\`cpp
int rightmost = n & -n;
// Example: n = 12 (1100₂) → rightmost = 4 (0100₂)
\`\`\`

### Turn off rightmost set bit
\`\`\`cpp
int turnOff = n & (n - 1);
// Example: n = 12 (1100₂) → turnOff = 8 (1000₂)
\`\`\`

### Check if subset
\`\`\`cpp
bool isSubset(int maskA, int maskB) {
    return (maskA & maskB) == maskA;
}
\`\`\`

## Tips & Tricks
- Maximum mask size: 32 bits (int) or 64 bits (long long)
- For n elements: Total subsets = 2^n
- Use \`__builtin_popcount(mask)\` for counting set bits (GCC)
- Bitmask DP: O(2^n × n²) typically, use for n ≤ 20
- Always check bounds: \`i < 32\` before \`1 << i\`

## Common Applications
- Subset generation
- DP state compression (TSP, Assignment problems)
- Representing visited/unvisited states
- Fast set operations
            `, null, 2]
        );

        // Topic 3: Character-Number Tricks
        await client.query(
            "INSERT INTO dsa_topics (module_id, title, content, problem_id, order_index) VALUES ($1, $2, $3, $4, $5)",
            [bitModuleId, 'Character & Number Conversion Tricks', `
# Character & Number Conversion Tricks

Master the art of converting between characters, numbers, and their ASCII representations.

## ASCII Basics
- \`'A'\` to \`'Z'\`: 65 to 90
- \`'a'\` to \`'z'\`: 97 to 122
- \`'0'\` to \`'9'\`: 48 to 57
- Difference: \`'a' - 'A' = 32\`

## Essential Conversions

### 1. Character to Integer (Digit)
\`\`\`cpp
char c = '7';
int digit = c - '0';  // 7
\`\`\`

### 2. Integer to Character
\`\`\`cpp
int num = 5;
char c = '0' + num;  // '5'
\`\`\`

### 3. Uppercase to Lowercase
\`\`\`cpp
char upper = 'A';
char lower = upper + 32;  // 'a'
// Or use library:
char lower = tolower(upper);
\`\`\`

### 4. Lowercase to Uppercase
\`\`\`cpp
char lower = 'g';
char upper = lower - 32;  // 'G'
// Or use library:
char upper = toupper(lower);
\`\`\`

### 5. Toggle Case
\`\`\`cpp
char c = 'A';
c = c ^ 32;  // 'a' (XOR with 32 flips case!)

// Toggle back
c = c ^ 32;  // 'A'
\`\`\`

## Bit Manipulation for Characters

### Check if Lowercase
\`\`\`cpp
bool isLowercase(char c) {
    return c >= 'a' && c <= 'z';
}
// Using bits (check 6th bit):
bool isLowercase(char c) {
    return (c & 32) != 0;  // Lowercase has 6th bit = 1
}
\`\`\`

### Convert to Lowercase (Force 6th bit to 1)
\`\`\`cpp
char toLower(char c) {
    return c | 32;
}
// 'A' (01000001) | 32 (00100000) = 'a' (01100001)
\`\`\`

### Convert to Uppercase (Force 6th bit to 0)
\`\`\`cpp
char toUpper(char c) {
    return c & ~32;  // Same as c & 223
}
// 'a' (01100001) & ~32 (11011111) = 'A' (01000001)
\`\`\`

## Character Array (Index) to Bit Position

### Map character to index (0-25)
\`\`\`cpp
// For 'a' to 'z'
int index = c - 'a';  // 'a'→0, 'b'→1, ..., 'z'→25

// For 'A' to 'Z'
int index = c - 'A';  // 'A'→0, 'B'→1, ..., 'Z'→25
\`\`\`

### Use in frequency arrays
\`\`\`cpp
string s = "hello";
int freq[26] = {0};

for (char c : s) {
    freq[c - 'a']++;
}
// freq[7] = 1 ('h'), freq[4] = 1 ('e'), etc.
\`\`\`

### Use in bitmask (for set of characters)
\`\`\`cpp
// Check if all characters in string are unique
bool hasUniqueChars(string s) {
    int mask = 0;
    for (char c : s) {
        int bit = c - 'a';
        if (mask & (1 << bit)) {
            return false;  // Already seen
        }
        mask |= (1 << bit);
    }
    return true;
}
\`\`\`

## Number to String & String to Number

### Integer to String
\`\`\`cpp
int num = 123;
string s = to_string(num);  // "123"
\`\`\`

### String to Integer
\`\`\`cpp
string s = "456";
int num = stoi(s);  // 456

// For long long:
long long num = stoll(s);
\`\`\`

### Manual String to Integer
\`\`\`cpp
string s = "789";
int num = 0;
for (char c : s) {
    num = num * 10 + (c - '0');
}
// num = 789
\`\`\`

### Manual Integer to String
\`\`\`cpp
int num = 321;
string s = "";
while (num) {
    s = char('0' + num % 10) + s;
    num /= 10;
}
// s = "321"
\`\`\`

## Advanced Tricks

### Check if character is alphanumeric
\`\`\`cpp
bool isAlphaNum(char c) {
    return (c >= '0' && c <= '9') ||
           (c >= 'A' && c <= 'Z') ||
           (c >= 'a' && c <= 'z');
}
\`\`\`

### Remove case sensitivity in comparison
\`\`\`cpp
bool equalIgnoreCase(char a, char b) {
    return (a | 32) == (b | 32);
}
// 'A' | 32 = 'a', so 'A' and 'a' become same
\`\`\`

### Count vowels using bitmask
\`\`\`cpp
bool isVowel(char c) {
    c = c | 32;  // Make lowercase
    return (1 << (c - 'a')) & ((1 << 0) | (1 << 4) | (1 << 8) | (1 << 14) | (1 << 20));
}
\`\`\`

## Tips & Tricks
- **XOR 32** to toggle case (works for both upper ↔ lower)
- **OR 32** to force lowercase
- **AND ~32** to force uppercase
- **Character distance**: \`c - 'a'\` gives 0-25 for alphabet
- **Digit value**: \`c - '0'\` gives 0-9 for digits
- Use bitmask to track character sets (26 letters fit in int)
- \`isalpha(c)\`, \`isdigit(c)\`, \`isalnum(c)\` from \`<cctype>\`

## Common Patterns
\`\`\`cpp
// Case-insensitive string comparison
bool equalIgnoreCase(string s1, string s2) {
    if (s1.size() != s2.size()) return false;
    for (int i = 0; i < s1.size(); i++) {
        if ((s1[i] | 32) != (s2[i] | 32)) return false;
    }
    return true;
}

// Count distinct characters (using bitmask)
int countDistinct(string s) {
    int mask = 0;
    for (char c : s) {
        mask |= (1 << (c - 'a'));
    }
    return __builtin_popcount(mask);
}
\`\`\`
            `, null, 3]
        );

        // === NUMBER THEORY MODULE ===

        // Topic 1: GCD & LCM
        await client.query(
            "INSERT INTO dsa_topics (module_id, title, content, problem_id, order_index) VALUES ($1, $2, $3, $4, $5)",
            [mathModuleId, 'GCD & LCM', `
# GCD & LCM (Greatest Common Divisor & Least Common Multiple)

## GCD (Greatest Common Divisor)
The largest number that divides both a and b.

### Euclidean Algorithm
\`\`\`cpp
int gcd(int a, int b) {
    if (b == 0) return a;
    return gcd(b, a % b);
}

// Iterative version
int gcd(int a, int b) {
    while (b) {
        int temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}

// C++17 built-in
#include <numeric>
int g = __gcd(a, b);  // Or gcd(a, b) in C++17
\`\`\`

**Time Complexity**: O(log(min(a, b)))

### Example
\`\`\`cpp
gcd(48, 18)
= gcd(18, 12)  // 48 % 18 = 12
= gcd(12, 6)   // 18 % 12 = 6
= gcd(6, 0)    // 12 % 6 = 0
= 6
\`\`\`

## LCM (Least Common Multiple)
The smallest number divisible by both a and b.

### Formula
\`\`\`
LCM(a, b) = (a × b) / GCD(a, b)
\`\`\`

### Implementation
\`\`\`cpp
long long lcm(int a, int b) {
    return (long long)a * b / gcd(a, b);
}
// Note: Multiply first, then divide to avoid overflow
\`\`\`

## Extended Euclidean Algorithm
Finds x and y such that: \`ax + by = gcd(a, b)\`

\`\`\`cpp
int extendedGCD(int a, int b, int& x, int& y) {
    if (b == 0) {
        x = 1;
        y = 0;
        return a;
    }
    int x1, y1;
    int g = extendedGCD(b, a % b, x1, y1);
    x = y1;
    y = x1 - (a / b) * y1;
    return g;
}
\`\`\`

## Tips & Tricks
- GCD is commutative: \`gcd(a, b) = gcd(b, a)\`
- \`gcd(a, 0) = a\`
- For multiple numbers: \`gcd(a, b, c) = gcd(gcd(a, b), c)\`
- Always use \`long long\` for LCM to avoid overflow
- GCD of array: iterate and compute pairwise

## Common Applications
- Simplifying fractions: \`a/b → (a/gcd)/(b/gcd)\`
- Finding coprime numbers: \`gcd(a, b) = 1\`
- Modular inverse calculation
            `, null, 1]
        );

        // Topic 2: Prime Numbers
        await client.query(
            "INSERT INTO dsa_topics (module_id, title, content, problem_id, order_index) VALUES ($1, $2, $3, $4, $5)",
            [mathModuleId, 'Prime Numbers & Sieve', `
# Prime Numbers

A prime number is divisible only by 1 and itself (greater than 1).

## Check if Prime
\`\`\`cpp
bool isPrime(int n) {
    if (n <= 1) return false;
    if (n <= 3) return true;
    if (n % 2 == 0 || n % 3 == 0) return false;
    
    for (int i = 5; i * i <= n; i += 6) {
        if (n % i == 0 || n % (i + 2) == 0) {
            return false;
        }
    }
    return true;
}
\`\`\`

**Time Complexity**: O(√n)

## Sieve of Eratosthenes
Find all primes up to n efficiently.

\`\`\`cpp
vector<bool> sieve(int n) {
    vector<bool> isPrime(n + 1, true);
    isPrime[0] = isPrime[1] = false;
    
    for (int i = 2; i * i <= n; i++) {
        if (isPrime[i]) {
            for (int j = i * i; j <= n; j += i) {
                isPrime[j] = false;
            }
        }
    }
    return isPrime;
}

// Usage: Get all primes
vector<int> getPrimes(int n) {
    vector<bool> is = sieve(n);
    vector<int> primes;
    for (int i = 2; i <= n; i++) {
        if (is[i]) primes.push_back(i);
    }
    return primes;
}
\`\`\`

**Time Complexity**: O(n log log n)  
**Space Complexity**: O(n)

## Prime Factorization
\`\`\`cpp
vector<int> primeFactors(int n) {
    vector<int> factors;
    
    for (int i = 2; i * i <= n; i++) {
        while (n % i == 0) {
            factors.push_back(i);
            n /= i;
        }
    }
    if (n > 1) factors.push_back(n);
    
    return factors;
}
// Example: primeFactors(12) = [2, 2, 3]
\`\`\`

## Count Divisors
\`\`\`cpp
int countDivisors(int n) {
    int count = 0;
    for (int i = 1; i * i <= n; i++) {
        if (n % i == 0) {
            count++;
            if (i != n / i) count++;  // Count both i and n/i
        }
    }
    return count;
}
\`\`\`

## Tips & Tricks
- Only check divisors up to √n
- Every composite number has a prime factor ≤ √n
- Primes > 3 are of form \`6k ± 1\`
- Use sieve for multiple queries
- Number of primes ≤ n ≈ n / ln(n)

## Common Applications
- Cryptography (RSA)
- Hash table sizing (use prime numbers)
- Finding GCD using prime factorization
            `, null, 2]
        );

        // Topic 3: Modular Arithmetic
        await client.query(
            "INSERT INTO dsa_topics (module_id, title, content, problem_id, order_index) VALUES ($1, $2, $3, $4, $5)",
            [mathModuleId, 'Modular Arithmetic', `
# Modular Arithmetic

Modular arithmetic is essential in competitive programming to avoid overflow and work with large numbers.

## Basics
\`\`\`
a ≡ b (mod m)  means  a % m = b % m
\`\`\`

## Properties
1. **(a + b) % m = ((a % m) + (b % m)) % m**
2. **(a - b) % m = ((a % m) - (b % m) + m) % m**
3. **(a × b) % m = ((a % m) × (b % m)) % m**
4. **a^b % m ≠ (a % m)^b % m** (Use modular exponentiation!)

## Modular Addition/Subtraction
\`\`\`cpp
const int MOD = 1e9 + 7;

int add(int a, int b) {
    return ((a % MOD) + (b % MOD)) % MOD;
}

int subtract(int a, int b) {
    return ((a % MOD) - (b % MOD) + MOD) % MOD;
}

int multiply(long long a, long long b) {
    return ((a % MOD) * (b % MOD)) % MOD;
}
\`\`\`

## Modular Exponentiation (Power)
Calculate \`a^b % m\` efficiently.

\`\`\`cpp
long long power(long long a, long long b, long long m) {
    long long result = 1;
    a %= m;
    
    while (b > 0) {
        if (b & 1) {
            result = (result * a) % m;
        }
        a = (a * a) % m;
        b >>= 1;
    }
    return result;
}
\`\`\`

**Time Complexity**: O(log b)

## Modular Inverse
Find x such that \`(a × x) % m = 1\`.

### Method 1: Fermat's Little Theorem (for prime m)
\`\`\`
a^(-1) ≡ a^(m-2) (mod m)
\`\`\`

\`\`\`cpp
long long modInverse(long long a, long long m) {
    return power(a, m - 2, m);
}
\`\`\`

### Method 2: Extended Euclidean
\`\`\`cpp
long long modInverse(long long a, long long m) {
    long long x, y;
    long long g = extendedGCD(a, m, x, y);
    if (g != 1) return -1;  // Inverse doesn't exist
    return (x % m + m) % m;
}
\`\`\`

## Modular Division
\`\`\`cpp
// (a / b) % m = (a * b^(-1)) % m
lon long divide(long long a, long long b, long long m) {
    return (a * modInverse(b, m)) % m;
}
\`\`\`

## Common Modulo Values
- **10^9 + 7** (1000000007) - Most common, prime
- **998244353** - Prime, has nice properties for FFT
- **10^9 + 9** (1000000009) - Another prime

## Factorial Modulo (Precomputation)
\`\`\`cpp
const int MAXN = 1e6;
const int MOD = 1e9 + 7;
long long fact[MAXN + 1];

void precomputeFactorial() {
    fact[0] = 1;
    for (int i = 1; i <= MAXN; i++) {
        fact[i] = (fact[i-1] * i) % MOD;
    }
}

// nCr = n! / (r! × (n-r)!)
long long nCr(int n, int r) {
    if (r > n) return 0;
    long long num = fact[n];
    long long den = (fact[r] * fact[n - r]) % MOD;
    return (num * modInverse(den, MOD)) % MOD;
}
\`\`\`

## Tips & Tricks
- Always take mod at each step to avoid overflow
- For subtraction, add MOD before taking mod: \`(a - b + MOD) % MOD\`
- Use \`long long\` for intermediate calculations
- Precompute factorials if computing many C(n, r)
- Division by 2: Multiply by \`modInverse(2, MOD)\` or \`(MOD + 1) / 2\`

## Common Mistakes
- **Not taking mod**: \`a * b\` can overflow!
- **Negative results**: \`(a - b) % MOD\` can be negative
- **Using \`a^(-1)\`**: No direct division, use modular inverse
- **Forgetting \`long long\`**: Even with mod, intermediate can overflow

## Applications
- Computing large combinatorics modulo
- Hashing with modulo
- Avoiding overflow in DP
- Cryptography
            `, null, 3]
        );

        console.log('\n✨ Competitive Programming Topics Added!');
        console.log('   Module 14: Bit Manipulation (3 topics)');
        console.log('   Module 15: Number Theory (3 topics)');

    } catch (err) {
        console.error('Error:', err);
    } finally {
        client.release();
        await pool.end();
    }
}

addCompetitiveProgrammingTopics();
