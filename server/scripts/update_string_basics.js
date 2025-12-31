/**
 * update_string_basics.js
 * 
 * Adds "0. String Mastery & CP Patterns" to the String Algorithms module.
 * Covers STL basics, conversions, greedy patterns, and basic string DP.
 * 
 * Usage: node scripts/update_string_basics.js "DATABASE_URL"
 */

const { Pool } = require('pg');

const DATABASE_URL = process.argv[2];

if (!DATABASE_URL) {
    console.error('❌ Please provide DATABASE_URL as argument!');
    console.error('Usage: node scripts/update_string_basics.js "postgresql://..."');
    process.exit(1);
}

const pool = new Pool({
    connectionString: DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

const topicTitle = "0. String Mastery & CP Patterns";
const moduleTitle = "String Algorithms";

// Using array join to avoid template literal escaping hell
const contentLines = [
    "# 🧵 String Mastery & CP Patterns",
    "",
    "In competitive programming, 30-40% of standard problems involve some form of string manipulation. Mastering the STL `string` class, conversions, and standard greedy/DP patterns is crucial before diving into KMP or Z-algo.",
    "",
    "---",
    "",
    "## 1. 🛠️ C++ STL String Mastery",
    "",
    "### 🔹 Declaration & Best Practices",
    "Always use `std::string` over `char[]` in C++. It handles memory automatically and provides powerful methods.",
    "",
    "```cpp",
    "string s = \"hello\";",
    "string t(5, 'a'); // \"aaaaa\"",
    "string sub = s.substr(1, 3); // \"ell\" (start_index, length)",
    "```",
    "",
    "### 🔹 Essential Functions (Cheatsheet)",
    "| Function | Usage | Time Complexity |",
    "|----------|-------|-----------------|",
    "| `s += 'a'` | Append char | O(1) amortized |",
    "| `s.pop_back()` | Remove last char | O(1) |",
    "| `s.find(t)` | Find first occurrence of t | O(N*M) worst |",
    "| `s.rfind(t)` | Find last occurrence | O(N*M) worst |",
    "| `s.substr(i, len)` | Get substring | O(len) |",
    "| `count(all(s), 'a')` | Count frequency | O(N) |",
    "",
    "### 🔹 Conversions (String ↔️ Number)",
    "Common in tasks requiring digit processing.",
    "",
    "**String to Number:**",
    "```cpp",
    "string s = \"12345\";",
    "int x = stoi(s);       // String to int",
    "long long y = stoll(s); // String to long long",
    "```",
    "",
    "**Number to String:**",
    "```cpp",
    "int x = 42;",
    "string s = to_string(x); // \"42\"",
    "```",
    "",
    "**Char to Int (Digit):**",
    "```cpp",
    "char c = '7';",
    "int d = c - '0'; // 7",
    "```",
    "",
    "---",
    "",
    "## 2. 🌀 Manipulation Tricks",
    "",
    "### 🔹 Cyclic Shift Check",
    "Check if string B is a cyclic shift of A (e.g., \"abcde\" -> \"cdeab\").",
    "**Trick:** `A + A` contains all cyclic shifts.",
    "```cpp",
    "bool isCyclicBox(string a, string b) {",
    "    if (a.size() != b.size()) return false;",
    "    string aa = a + a;",
    "    return aa.find(b) != string::npos;",
    "}",
    "```",
    "",
    "### 🔹 Frequency Arrays (The \"Bucket\" Technique)",
    "Instead of a map, use an array for lowercase English letters. Faster and simpler.",
    "```cpp",
    "int cnt[26] = {0};",
    "for (char c : s) cnt[c - 'a']++;",
    "```",
    "",
    "### 🔹 Palindrome Check (Two Pointers)",
    "```cpp",
    "bool isPalindrome(string& s) {",
    "    int l = 0, r = s.size() - 1;",
    "    while (l < r) {",
    "        if (s[l++] != s[r--]) return false;",
    "    }",
    "    return true;",
    "}",
    "```",
    "",
    "---",
    "",
    "## 3. 🦁 Greedy Strategies on Strings",
    "",
    "Greedy approaches work well for constructing *lexicographically* smallest/largest strings or deleting characters to satisfy conditions.",
    "",
    "### 🧩 Pattern 1: Lexicographically Smallest Subsequence",
    "**Problem:** Remove $K$ characters to get the smallest string.",
    "**Logic:** Use a Monotonic Stack (keep elements increasing).",
    "",
    "```cpp",
    "string smallestSubsequence(string s, int k) {",
    "    string st; // acts as stack",
    "    int remove_limit = k; ",
    "    for (char c : s) {",
    "        while (!st.empty() && remove_limit > 0 && st.back() > c) {",
    "            st.pop_back();",
    "            remove_limit--;",
    "        }",
    "        st.push_back(c);",
    "    }",
    "    while(remove_limit--) st.pop_back();",
    "    return st;",
    "}",
    "```",
    "",
    "### 🧩 Pattern 2: Making Palindromes (Greedy)",
    "If you can rearrange characters, check counts.",
    "- **Length is Even:** All character counts must be even.",
    "- **Length is Odd:** Exactly one character count can be odd.",
    "",
    "---",
    "",
    "## 4. 🧠 Dynamic Programming on Strings (Basics)",
    "",
    "Before KMP/Z, master these classic DP patterns.",
    "",
    "### 🧩 Pattern 1: Count Subsequences \"s1\" in \"s2\"",
    "Example: Count occurrences of \"QAQ\" in a string.",
    "**States:**",
    "- `dp[0]` = count of 'Q' seen so far",
    "- `dp[1]` = count of 'QA' formed",
    "- `dp[2]` = count of 'QAQ' formed",
    "",
    "```cpp",
    "long long q = 0, qa = 0, qaq = 0;",
    "for (char c : s) {",
    "    if (c == 'Q') {",
    "        q++;          // Start a new Q",
    "        qaq += qa;    // Complete a QA -> QAQ",
    "    }",
    "    else if (c == 'A') {",
    "        qa += q;      // Extend Q -> QA",
    "    }",
    "}",
    "```",
    "",
    "### 🧩 Pattern 2: Longest Palindromic Substring (Center Expansion)",
    "Better than O(N^3) brute force. Iterate every center (single char or gap between chars) and expand.",
    "```cpp",
    "for (int i = 0; i < n; i++) {",
    "    // Odd length (center is i)",
    "    int l = i, r = i;",
    "    while (l >= 0 && r < n && s[l] == s[r]) { /* update max */ l--; r++; }",
    "    ",
    "    // Even length (center is i, i+1)",
    "    l = i, r = i + 1;",
    "    while (l >= 0 && r < n && s[l] == s[r]) { /* update max */ l--; r++; }",
    "}",
    "```",
    "",
    "---",
    "",
    "## 5. 🎯 Famous Practice Problems",
    "",
    "| Problem | Platform | Tags |",
    "|---------|----------|------|",
    "| [Way Too Long Words](https://codeforces.com/problemset/problem/71/A) | Codeforces | Basics, Implementation |",
    "| [Petya and Strings](https://codeforces.com/problemset/problem/112/A) | Codeforces | Lexicographical Compare |",
    "| [Amusing Joke](https://codeforces.com/problemset/problem/141/A) | Codeforces | Sorting / Frequency Array |",
    "| [String Task](https://codeforces.com/problemset/problem/118/A) | Codeforces | Vowels/Consonants |",
    "| [Remove K Digits](https://leetcode.com/problems/remove-k-digits/) | LeetCode | Greedy, Monotonic Stack |",
    "| [Longest Palindromic Substring](https://leetcode.com/problems/longest-palindromic-substring/) | LeetCode | Expansion / DP |",
    "| [QAQ](https://codeforces.com/problemset/problem/894/A) | Codeforces | Subsequence Counting |"
];

const content = contentLines.join('\n');

async function updateStringBasics() {
    try {
        console.log(`🚀 Adding '${topicTitle}' to ${moduleTitle}...`);

        // 1. Get Module ID
        const modRes = await pool.query("SELECT module_id FROM cp_modules WHERE title = $1", [moduleTitle]);
        if (modRes.rowCount === 0) {
            throw new Error(`Module '${moduleTitle}' not found!`);
        }
        const moduleId = modRes.rows[0].module_id;

        // 2. Check if topic exists
        const topicRes = await pool.query(
            "SELECT topic_id FROM cp_topics WHERE title = $1 AND module_id = $2",
            [topicTitle, moduleId]
        );

        if (topicRes.rowCount > 0) {
            // Update
            await pool.query(
                "UPDATE cp_topics SET content = $1 WHERE topic_id = $2",
                [content, topicRes.rows[0].topic_id]
            );
            console.log("✅ Topic updated!");
        } else {
            // Insert
            await pool.query(
                "INSERT INTO cp_topics (module_id, title, content) VALUES ($1, $2, $3)",
                [moduleId, topicTitle, content]
            );
            console.log("✅ New topic inserted!");
        }

    } catch (err) {
        console.error("❌ Error:", err.message);
    } finally {
        await pool.end();
    }
}

updateStringBasics();
