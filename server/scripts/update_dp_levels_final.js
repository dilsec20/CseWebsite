/**
 * update_dp_levels_final.js
 * Integrates comprehensive DP Levels 1-17 from conversation.txt into the DP Module.
 * 
 * Mapping:
 * - 1. DP Fundamentals (1D & 2D): Levels 1-3
 * - 2. Classic Problems (Knapsack, LIS, LCS): Levels 4-10
 * - 3. Range DP (Intervals): Levels 11-12
 * - 6. Master DP: Patterns & Constraints: Levels 13-14 (Tree/Graph DP)
 * - 4. Digit DP & Bitmask DP: Levels 15, 17
 * - 5. DP Optimizations (CHT, SOS): Level 16
 * 
 * Usage: node scripts/update_dp_levels_final.js "DATABASE_URL"
 */

const { Pool } = require('pg');

const DATABASE_URL = process.argv[2];

if (!DATABASE_URL) {
    console.error('❌ Please provide DATABASE_URL as argument!');
    console.error('Usage: node scripts/update_dp_levels_final.js "postgresql://..."');
    process.exit(1);
}

const pool = new Pool({
    connectionString: DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

const content = {
    // ============================================================
    // LIMIT: Topic 1 - Fundamentals
    // ============================================================
    "1. DP Fundamentals (1D & 2D)": `

---

## 🧩 DP LEVEL 1–3 — FOUNDATIONS

### 🌱 LEVEL 1 — Introduction to Dynamic Programming
**Core Idea:**  
DP = Recursion + Memoization or Tabulation.  
It breaks problems into overlapping subproblems and optimal substructure.

**Formula Pattern:**  
If a problem has:
- 👉 “choice” (pick or skip, divide or merge)
- 👉 overlapping recursion
- 👉 optimal sub-solution dependency
Then → likely DP.

**Example: Fibonacci**
\`\`\`cpp
int fib(int n, vector<int>& dp){
    if(n<=1) return n;
    if(dp[n]!=-1) return dp[n];
    return dp[n] = fib(n-1,dp)+fib(n-2,dp);
}
\`\`\`
*Memoization (Top-down) stores computed results in dp[].*

**Practice Problems:**
| Problem | Platform | Notes |
|---------|----------|-------|
| 509. Fibonacci Number | LeetCode | Classic recursion → memoization |
| Count ways to reach n-th stair | GFG | 1D DP transition |
| 431C - k-Tree | Codeforces | First real DP with constraints |

---

### 🧩 LEVEL 2 — 1D DP (Linear DP)
**Core Idea:**  
Single dimension DP — each state depends on a few previous states.

**Common Formula:**  
$$dp[i] = \text{max/min/sum}(dp[i-1], dp[i-2], \dots) + \text{something}$$

**Example: Climbing Stairs / Min Cost Climbing**
\`\`\`cpp
int n; cin>>n;
vector<int> cost(n), dp(n);
dp[0]=cost[0];
dp[1]=cost[1];
for(int i=2;i<n;i++)
    dp[i]=cost[i]+min(dp[i-1],dp[i-2]);
\`\`\`

**When to Use:**  
If the problem depends only on previous few elements (like n-1, n-2), it’s 1D DP.

**Practice Problems:**
| Problem | Platform | Notes |
|---------|----------|-------|
| 746. Min Cost Climbing Stairs | LeetCode | Classic iterative DP |
| Maximum sum increasing subsequence | GFG | Variation of LIS |
| 580C - Kefa and Park | Codeforces | DFS + DP combination |

---

### 🔸 LEVEL 3 — 2D DP (Grid DP)
**Core Idea:**  
Grid movement — each cell’s value depends on top/left/diagonal.

**Formula:**  
$$dp[i][j] = grid[i][j] + \min(dp[i-1][j], dp[i][j-1])$$

**Example: Minimum Path Sum**
\`\`\`cpp
int n,m; cin>>n>>m;
vector<vector<int>> grid(n,vector<int>(m));
vector<vector<int>> dp(n,vector<int>(m,1e9));
dp[0][0]=grid[0][0];
for(int i=0;i<n;i++){
    for(int j=0;j<m;j++){
        if(i) dp[i][j]=min(dp[i][j],grid[i][j]+dp[i-1][j]);
        if(j) dp[i][j]=min(dp[i][j],grid[i][j]+dp[i][j-1]);
    }
}
\`\`\`

**When to Use:**  
Whenever movement is on grid / matrix / path counting.

**Practice Problems:**
| Problem | Platform | Notes |
|---------|----------|-------|
| 64. Minimum Path Sum | LeetCode | Simple 2D grid DP |
| Unique Paths in a Grid | GFG | Paths counting |
| Grid Paths (dp_h) | AtCoder | Standard grid path pattern |
`,

    // ============================================================
    // LIMIT: Topic 2 - Classic Problems
    // ============================================================
    "2. Classic Problems (Knapsack, LIS, LCS)": `

---

## 🧩 DP LEVEL 4–10 — CLASSIC PATTERNS

### 💠 LEVEL 4 — Longest Increasing Subsequence (LIS)
**Core Idea:**  
We need the longest subsequence where every next element is greater than the previous.

**Transition:**  
$$dp[i] = 1 + \max(dp[j]) \quad \forall j < i \text{ where } arr[j] < arr[i]$$

**Code:**
\`\`\`cpp
for (int i = 0; i < n; i++) {
    for (int j = 0; j < i; j++) {
        if (a[j] < a[i])
            dp[i] = max(dp[i], 1 + dp[j]);
    }
    ans = max(ans, dp[i]);
}
\`\`\`

**Practice Problems:**
| Problem | Platform | Notes |
|---------|----------|-------|
| 300. Longest Increasing Subsequence | LeetCode | O(N²) or O(N log N) |
| Longest Bitonic Subsequence | GFG | Two LIS combinations |
| 10D - LCIS | Codeforces | Longest Common Increasing Subsequence |

---

### 🧩 LEVEL 5 — Longest Common Subsequence (LCS)
**Core Idea:**  
Given strings s1 and s2, find the longest subsequence common to both.

**Recurrence:**  
- If matches: $$dp[i][j] = 1 + dp[i-1][j-1]$$
- Else: $$dp[i][j] = \max(dp[i-1][j], dp[i][j-1])$$

**Practice Problems:**
| Problem | Platform | Notes |
|---------|----------|-------|
| 1143. Longest Common Subsequence | LeetCode | Base of string DP |
| Print LCS | GFG | Reconstruct sequence |
| 1220C - DP String | Codeforces | LCS with modifications |

---

### 💬 LEVEL 6 — Edit Distance / String Conversion
**Core Idea:**  
Minimum number of operations (insert, delete, replace) to convert one string to another.

**Recurrence:**  
$$dp[i][j] = 1 + \min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1])$$ (if chars don't match)

**Practice Problems:**
| Problem | Platform | Notes |
|---------|----------|-------|
| 72. Edit Distance | LeetCode | Classic string edit |
| Minimum insertions/deletions | GFG | LCS variant |
| dp_f - LCS | AtCoder | Base for string transformations |

---

### 🎒 LEVEL 7 — 0/1 Knapsack
**Core Idea:**  
Each item can either be taken once or not taken. Maximize value within weight limit.

**Recurrence:**  
$$dp[i][w] = \max(dp[i-1][w], \text{val}[i] + dp[i-1][w-\text{wt}[i]])$$

**Practice Problems:**
| Problem | Platform | Notes |
|---------|----------|-------|
| 416. Partition Equal Subset Sum | LeetCode | Subset sum |
| 0/1 Knapsack Problem | GFG | Classic |
| dp_d - Knapsack 1 | AtCoder | Benchmark problem |

---

### 💰 LEVEL 8 — Unbounded / Coin Change
**Practice Problems:**
| Problem | Platform | Notes |
|---------|----------|-------|
| 518. Coin Change II | LeetCode | Unbounded ways |
| Coin Change Problem | GFG | Count ways |
| dp_e - Knapsack 2 | AtCoder | Large weights version |

---

### 🧮 LEVEL 9 — Partition / Subset DP
**Core Idea:**  
Find if there exists a subset of array whose sum = target.

**Practice Problems:**
| Problem | Platform | Notes |
|---------|----------|-------|
| 494. Target Sum | LeetCode | Subset to target sum |
| 189A - Cut Ribbon | Codeforces | DP on partitions |
| Subset Sum Problem | GFG | Fundamental subset DP |

---

### 🪞 LEVEL 10 — Palindrome / String Interval DP
**Core Idea:**  
LPS of s = LCS(s, reverse(s)).
Insertions = n - LPS(s).

**Practice Problems:**
| Problem | Platform | Notes |
|---------|----------|-------|
| 516. Longest Palindromic Subsequence | LeetCode | Classic |
| Minimum Deletions for Palindrome | GFG | LCS-based |
| dp_aq - LPS | AtCoder | Interval DP version |
`,

    // ============================================================
    // LIMIT: Topic 3 - Range DP
    // ============================================================
    "3. Range DP (Intervals)": `

---

## 🧱 LEVEL 11–12 — COUNTING & INTERVALS

### 🧮 LEVEL 11 — Counting DP & Matrix Chain
**Core Idea:**  
Count valid patterns (e.g. distinct subsequences). Matrix Chain Multiplication logic for interval cuts.

**Example 1: Distinct Subsequences**  
$$dp[i][j] = dp[i-1][j] + (s[i-1]==t[j-1] ? dp[i-1][j-1] : 0)$$

**Practice Problems:**
| Problem | Platform | Notes |
|---------|----------|-------|
| Matrix Chain Multiplication | GFG | Foundational |
| 312. Burst Balloons | LeetCode | Classic interval DP |
| 607A - Chain Reaction | Codeforces | Weighted intervals |

---

### 🔄 LEVEL 12 — Sequence Transformation (Partition Optimization)
**Core Idea:**  
Transform sequences with minimum cost, often using prefix/suffix optimizations.

**Practice Problems:**
| Problem | Platform | Notes |
|---------|----------|-------|
| Optimal Binary Search Tree | GFG | Knuth-type |
| 1442B - DP on prefix/suffix | Codeforces | Prefix transitions |
| dp_m - Candies | AtCoder | Prefix optimization base |
`,

    // ============================================================
    // LIMIT: Topic 6 - Master DP (Misc / Tree / Graph) 
    // ============================================================
    "6. Master DP: Patterns & Constraints": `

---

## 🌲 LEVEL 13–14 — TREE & GRAPH DP

### 🌲 LEVEL 13 — TREE DP
**Core Idea:**  
DP on a tree’s hierarchical structure. DFS where node depends on children.
$$dp[u] = f(\text{dp of children})$$

**Example: Max Independent Set**
\`\`\`cpp
void dfs(int u, int p){
    dp[u][0] = 0;
    dp[u][1] = val[u];
    for(auto v : g[u]){
        if(v == p) continue;
        dfs(v,u);
        dp[u][0] += max(dp[v][0], dp[v][1]);
        dp[u][1] += dp[v][0];
    }
}
\`\`\`

**Practice Problems:**
| Problem | Platform | Notes |
|---------|----------|-------|
| Max sum of non-adjacent nodes | GFG | Intro |
| dp_p - Independent Set | AtCoder | Classic |
| 337D - Book of Evil | Codeforces | Multi-DFS Tree DP |

---

### 🔺 LEVEL 14 — GRAPH DP (DAG)
**Core Idea:**  
DP on DAGs using Topological Order (e.g., Longest Path).  
For general graphs: Floyd-Warshall or Bellman-Ford as DP.

**Example: Longest Path in DAG**
Use Kahn's Algorithm + relaxation:
$$dp[v] = \max(dp[v], dp[u] + 1)$$

**Practice Problems:**
| Problem | Platform | Notes |
|---------|----------|-------|
| dp_g - Longest Path | AtCoder | Topo + DP |
| 1857. Largest Color Value | LeetCode | DAG DP |
| 1385E - Directing Edges | Codeforces | DP reasoning on DAG |
`,

    // ============================================================
    // LIMIT: Topic 4 - Digit & Bitmask
    // ============================================================
    "4. Digit DP & Bitmask DP": `

---

## 💻 LEVEL 15 & 17 — BITMASK & DIGIT DP

### 💻 LEVEL 15 — BITMASK DP
**Core Idea:**  
Encode subsets as bitmasks (N <= 20).
$$dp[\text{mask}] = \text{best value for subset}$$

**Example: TSP**
$$dp[\text{mask}][u] = \min(dp[\text{mask}][u], \text{cost}[u][v] + \text{solve}(\text{mask} | (1<<v), v))$$

**Practice Problems:**
| Problem | Platform | Notes |
|---------|----------|-------|
| Travelling Salesman Problem | GFG | Foundation |
| dp_o - Matching | AtCoder | Classic |
| 847. Shortest Path Visiting All Nodes | LeetCode | Bitmask BFS/DP |

---

### 🔢 LEVEL 17 — DIGIT DP + SOS DP
**17.1 Digit DP**  
Count numbers in range [L, R] satisfying digit constraints.
State: \`dp[pos][sum][tight]\`

**Code Pattern:**
\`\`\`cpp
int dfs(int pos, int sum, int tight){
    if(pos == s.size()) return (sum%K==0);
    int limit = tight ? s[pos]-'0' : 9;
    for(int d=0; d<=limit; d++)
        res += dfs(pos+1, arg..., tight&(d==limit));
    return res;
}
\`\`\`

**17.2 SOS DP (Sum Over Subsets)**  
Compute DP for all submasks efficiently in $O(N \cdot 2^N)$.
\`\`\`cpp
for(int i=0; i<n; i++)
    for(int mask=0; mask<(1<<n); mask++)
        if(mask & (1<<i)) dp[mask] += dp[mask^(1<<i)];
\`\`\`

**Practice Problems:**
| Problem | Platform | Notes |
|---------|----------|-------|
| 1036C - Classy Numbers | Codeforces | Digit DP |
| 165E - Compatible Numbers | Codeforces | SOS DP |
| dp_u - Grouping | AtCoder | Subset combination DP |
`,

    // ============================================================
    // LIMIT: Topic 5 - Optimizations
    // ============================================================
    "5. DP Optimizations (CHT, SOS)": `

---

## ⚙️ LEVEL 16 — OPTIMIZED TRANSITIONS

### 🧠 DP State Optimizations
Sometimes $O(N^2)$ is too slow.

**1. Knuth Optimization**  
For $$dp[i][j] = \min(dp[i][k] + dp[k][j]) + C[i][j]$$ associated with quadrangle inequality.

**2. Divide & Conquer Optimization**  
When optimal $k$ for $dp[i][j]$ is monotonic.

**3. Monotonic Queue (Sliding Window)**  
For $$dp[i] = \min(dp[j]) + \dots$$ in a window.

**Practice Problems:**
| Problem | Platform | Notes |
|---------|----------|-------|
| dp_m - Candies | AtCoder | Prefix sums optimization |
| 321E - Ciel and Gondolas | Codeforces | Knuth Optimization |
| Array Division | CSES | DP partition logic |
`
};

async function updateDP() {
    try {
        console.log('🚀 Starting Comprehensive DP Levels 1-17 Update...\n');

        for (const [topicTitle, extraContent] of Object.entries(content)) {
            // Check if topic exists in Module 11 (Dynamic Programming)
            // We search by title match.
            const res = await pool.query(
                `SELECT topic_id, content FROM cp_topics 
                  WHERE title = $1 
                  AND module_id = (SELECT module_id FROM cp_modules WHERE title LIKE '%Dynamic Programming%')`,
                [topicTitle]
            );

            if (res.rowCount > 0) {
                const currentContent = res.rows[0].content;
                // Append content
                const newContent = currentContent + '\n' + extraContent;

                await pool.query(
                    'UPDATE cp_topics SET content = $1 WHERE topic_id = $2',
                    [newContent, res.rows[0].topic_id]
                );
                console.log('✅ Updated: ' + topicTitle + ' (Appended Levels)');
            } else {
                console.log('⚠️ Topic not found in DP Module: ' + topicTitle);
            }
        }

        console.log('\n🎉 DP Content Integration Complete!');
    } catch (err) {
        console.error('❌ Error:', err.message);
    } finally {
        await pool.end();
    }
}

updateDP();
