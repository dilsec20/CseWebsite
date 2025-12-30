/**
 * fix_dp_latex_v2.js - Fixes broken LaTeX in DP content
 */
const { Pool } = require('pg');
const pool = new Pool({
    connectionString: process.argv[2],
    ssl: { rejectUnauthorized: false }
});

const fixedClassics = `# 🧩 DP LEVELS 4–10 — CLASSIC PATTERNS

---

## 💠 LEVEL 4 — Longest Increasing Subsequence (LIS)

### 🔹 Core Idea
We need the longest subsequence where every next element is greater than the previous.

### 🔹 Transition
For each element arr[i], look at all previous arr[j] where arr[j] < arr[i].

**Formula:** dp[i] = 1 + max(dp[j]) for all j < i where arr[j] < arr[i]

### 🔹 Code
\`\`\`cpp
int n; cin >> n;
vector<int> a(n);
for (int i = 0; i < n; i++) cin >> a[i];

vector<int> dp(n, 1);
int ans = 1;

for (int i = 0; i < n; i++) {
    for (int j = 0; j < i; j++) {
        if (a[j] < a[i])
            dp[i] = max(dp[i], 1 + dp[j]);
    }
    ans = max(ans, dp[i]);
}
cout << ans;
\`\`\`

### 🔹 Complexity
O(n²) — can be optimized to **O(n log n)** using lower_bound().

### 🔹 Practice Problems
| Problem | Platform | Link |
|---------|----------|------|
| Longest Increasing Subsequence | LeetCode | [300](https://leetcode.com/problems/longest-increasing-subsequence/) |
| Interesting drink | Codeforces | [706B](https://codeforces.com/problemset/problem/706/B) |
| LIS | AtCoder DP | Task L |

---

## 🧩 LEVEL 5 — Longest Common Subsequence (LCS)

### 🔹 Core Idea
Given strings s1 and s2, find the longest subsequence common to both.

### 🔹 Recurrence
- If last chars match: **dp[i][j] = 1 + dp[i-1][j-1]**
- Else: **dp[i][j] = max(dp[i-1][j], dp[i][j-1])**

### 🔹 Code
\`\`\`cpp
string s1, s2; cin >> s1 >> s2;
int n = s1.size(), m = s2.size();
vector<vector<int>> dp(n+1, vector<int>(m+1, 0));

for(int i=1; i<=n; i++){
    for(int j=1; j<=m; j++){
        if(s1[i-1]==s2[j-1])
            dp[i][j]=1+dp[i-1][j-1];
        else
            dp[i][j]=max(dp[i-1][j],dp[i][j-1]);
    }
}
cout << dp[n][m];
\`\`\`

### 🔹 Practice Problems
| Problem | Platform | Link |
|---------|----------|------|
| Longest Common Subsequence | LeetCode | [1143](https://leetcode.com/problems/longest-common-subsequence/) |
| Longest Common Subsequence | GFG | Classic |
| LCS | AtCoder DP | Task F |

---

## 💬 LEVEL 6 — Edit Distance / String Conversion

### 🔹 Core Idea
Minimum number of operations (insert, delete, replace) to convert one string to another.

### 🔹 Recurrence
If characters match → skip.  
Else → 1 + min(insert, delete, replace).

**Base Cases:**
- dp[i][0] = i (delete all chars from s1)
- dp[0][j] = j (insert all chars to match s2)

**Transition:**
- If s1[i-1] == s2[j-1]: dp[i][j] = dp[i-1][j-1]
- Else: dp[i][j] = 1 + min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1])

### 🔹 Code
\`\`\`cpp
string s1, s2;
cin >> s1 >> s2;
int n=s1.size(), m=s2.size();
vector<vector<int>> dp(n+1, vector<int>(m+1));

for(int i=0;i<=n;i++) dp[i][0]=i;
for(int j=0;j<=m;j++) dp[0][j]=j;

for(int i=1;i<=n;i++){
    for(int j=1;j<=m;j++){
        if(s1[i-1]==s2[j-1])
            dp[i][j]=dp[i-1][j-1];
        else
            dp[i][j]=1+min({dp[i-1][j],dp[i][j-1],dp[i-1][j-1]});
    }
}
cout<<dp[n][m];
\`\`\`

### 🔹 Practice Problems
| Problem | Platform | Link |
|---------|----------|------|
| Edit Distance | LeetCode | [72](https://leetcode.com/problems/edit-distance/) |
| Edit Distance | GFG | Classic |
| String Problem | Codeforces | [33B](https://codeforces.com/problemset/problem/33/B) |

---

## 🎒 LEVEL 7 — 0/1 Knapsack

### 🔹 Core Idea
Each item can either be taken once or not taken.  
We aim to **maximize value** within a weight limit.

### 🔹 Recurrence
**Base:** dp[i][0] = 0 and dp[0][w] = 0

**Transition:**
- Don't take item i: dp[i][w] = dp[i-1][w]
- Take item i (if wt[i] <= w): dp[i][w] = max(dp[i-1][w], val[i] + dp[i-1][w-wt[i]])

### 🔹 Code
\`\`\`cpp
int n, W; cin >> n >> W;
vector<int> wt(n), val(n);
for(int i=0;i<n;i++) cin >> wt[i] >> val[i];

vector<vector<int>> dp(n+1, vector<int>(W+1, 0));

for(int i=1;i<=n;i++){
    for(int w=0; w<=W; w++){
        dp[i][w] = dp[i-1][w];
        if(wt[i-1] <= w)
            dp[i][w] = max(dp[i][w], val[i-1] + dp[i-1][w - wt[i-1]]);
    }
}
cout << dp[n][W];
\`\`\`

### 🔹 1D Optimization
Iterate w from W to 0 to prevent overcounting:
\`\`\`cpp
for (int w=W; w>=wt[i]; w--) 
    dp[w] = max(dp[w], val[i]+dp[w-wt[i]]);
\`\`\`

### 🔹 Practice Problems
| Problem | Platform | Link |
|---------|----------|------|
| Knapsack 1 | AtCoder DP | Task D |
| Partition Equal Subset Sum | LeetCode | [416](https://leetcode.com/problems/partition-equal-subset-sum/) |
| 0/1 Knapsack Problem | GFG | Classic |

---

## 🧮 LEVEL 8 — Subset Sum DP

### 🔹 Core Idea
Find if there exists a subset of array whose sum = target.  
(This is a simplified version of knapsack.)

### 🔹 Recurrence
**Base:** dp[i][0] = true (empty subset has sum 0)

**Transition:**
- dp[i][sum] = dp[i-1][sum] OR dp[i-1][sum-arr[i-1]] (if arr[i-1] <= sum)

### 🔹 Code
\`\`\`cpp
int n, target; cin >> n >> target;
vector<int> a(n);
for(int &x : a) cin >> x;

vector<vector<bool>> dp(n+1, vector<bool>(target+1, false));
for(int i=0;i<=n;i++) dp[i][0]=true;

for(int i=1;i<=n;i++){
    for(int sum=1; sum<=target; sum++){
        dp[i][sum] = dp[i-1][sum];
        if(sum >= a[i-1])
            dp[i][sum] = dp[i][sum] || dp[i-1][sum - a[i-1]];
    }
}
cout << (dp[n][target] ? "YES" : "NO");
\`\`\`

### 🔹 Practice Problems
| Problem | Platform | Link |
|---------|----------|------|
| Partition Equal Subset Sum | LeetCode | [416](https://leetcode.com/problems/partition-equal-subset-sum/) |
| Subset Sum Problem | GFG | Classic |
| Knapsack 2 | AtCoder DP | Task E |

---

## ⚖️ LEVEL 9 — Partition DP (Equal or Minimum Difference)

### 🔹 Core Idea
Split array into two subsets such that:
- Their sum difference is minimum, or
- They are equal (Partition Equal Subset Sum).

### 🔹 Approach
1. Calculate total = sum(arr)  
2. Use Subset Sum DP up to total/2  
3. Find the largest achievable sum <= total/2  
4. Result = total - 2 * achievable_sum

### 🔹 Code
\`\`\`cpp
int n; cin >> n;
vector<int> a(n);
for(int &x : a) cin >> x;
int total = accumulate(a.begin(), a.end(), 0);

vector<vector<bool>> dp(n+1, vector<bool>(total/2 + 1, false));
for(int i=0;i<=n;i++) dp[i][0]=true;

for(int i=1;i<=n;i++){
    for(int sum=1; sum<=total/2; sum++){
        dp[i][sum]=dp[i-1][sum];
        if(sum>=a[i-1])
            dp[i][sum]=dp[i][sum]||dp[i-1][sum-a[i-1]];
    }
}

int best = 0;
for(int sum=total/2; sum>=0; sum--){
    if(dp[n][sum]){
        best=sum;
        break;
    }
}
cout << total - 2*best;
\`\`\`

### 🔹 Practice Problems
| Problem | Platform | Link |
|---------|----------|------|
| Last Stone Weight II | LeetCode | [1049](https://leetcode.com/problems/last-stone-weight-ii/) |
| Minimum subset sum difference | GFG | Classic |
| Balance the Scale | Codeforces | [17C](https://codeforces.com/problemset/problem/17/C) |

---

## 💠 LEVEL 10 — Palindromic DP

### 🔹 Core Idea
We deal with palindromic subsequences, substrings, or minimum insertions/deletions.

### 🔹 Common Types
1. Longest Palindromic Subsequence (LPS)  
2. Minimum insertions to make a string palindrome  
3. Count of palindromic substrings

### 🧩 1. Longest Palindromic Subsequence (LPS)
**Trick:** LPS of s = LCS(s, reverse(s))

\`\`\`cpp
string s; cin >> s;
string t = s; reverse(t.begin(), t.end());
int n = s.size();
vector<vector<int>> dp(n+1, vector<int>(n+1, 0));

for(int i=1;i<=n;i++){
    for(int j=1;j<=n;j++){
        if(s[i-1]==t[j-1])
            dp[i][j]=1+dp[i-1][j-1];
        else
            dp[i][j]=max(dp[i-1][j],dp[i][j-1]);
    }
}
cout << dp[n][n];
\`\`\`

### 🧩 2. Minimum Insertions to Make Palindrome
**Formula:** Insertions = n - LPS(s)

### 🧩 3. Count of Palindromic Substrings
\`\`\`cpp
string s; cin >> s;
int n = s.size(), count = 0;
vector<vector<bool>> dp(n, vector<bool>(n,false));

for(int len=1; len<=n; len++){
    for(int i=0; i+len-1<n; i++){
        int j=i+len-1;
        if(s[i]==s[j] && (len<=2 || dp[i+1][j-1])){
            dp[i][j]=true;
            count++;
        }
    }
}
cout << count;
\`\`\`

### 🔹 Practice Problems
| Problem | Platform | Link |
|---------|----------|------|
| Longest Palindromic Subsequence | LeetCode | [516](https://leetcode.com/problems/longest-palindromic-subsequence/) |
| Minimum Insertion Steps | LeetCode | [1312](https://leetcode.com/problems/minimum-insertion-steps-to-make-a-string-palindrome/) |
| Palindromic Substrings | LeetCode | [647](https://leetcode.com/problems/palindromic-substrings/) |
`;

const fixedRange = `# 🧱 DP LEVELS 11–12 — COUNTING & INTERVALS

---

## 🧮 LEVEL 11 — Counting DP (Ways to Form / Count Patterns)

### 🔹 Core Idea
Instead of maximizing/minimizing, now you **count the number of valid configurations**.

### 🔹 Example: Count ways to reach Nth step
**Formula:** dp[i] = dp[i-1] + dp[i-2]

### 🧩 Example — Count Subsequences Matching a Pattern
"How many subsequences equal to T exist in S"

\`\`\`cpp
string s,t; cin>>s>>t;
int n=s.size(), m=t.size();
vector<vector<long long>> dp(n+1,vector<long long>(m+1,0));

for(int i=0;i<=n;i++) dp[i][0]=1;

for(int i=1;i<=n;i++){
    for(int j=1;j<=m;j++){
        dp[i][j]=dp[i-1][j];
        if(s[i-1]==t[j-1]) dp[i][j]+=dp[i-1][j-1];
    }
}
cout<<dp[n][m];
\`\`\`

### 🔹 Practice Problems
| Problem | Platform | Link |
|---------|----------|------|
| Distinct Subsequences | LeetCode | [115](https://leetcode.com/problems/distinct-subsequences/) |
| Sushi | AtCoder DP | Task J |
| Count subsequences | GFG | Pattern counting |

---

## 🔄 LEVEL 12 — Sequence Transformation DP

### 🔹 Core Idea
Transform one sequence into another with minimum cost.

### 🧩 Example — Convert Array A to B
Let dp[i][j] = min operations to convert first i of A to first j of B.

**Transition:**
- If A[i-1] == B[j-1]: dp[i][j] = dp[i-1][j-1]
- Else: dp[i][j] = 1 + min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1])

(Same as Edit Distance but applied to arrays.)

### 🔹 Practice Problems
| Problem | Platform | Link |
|---------|----------|------|
| Minimum ASCII Delete Sum | LeetCode | [712](https://leetcode.com/problems/minimum-ascii-delete-sum-for-two-strings/) |
| The Delivery Dilemma | Codeforces | [1443C](https://codeforces.com/problemset/problem/1443/C) |
| Stones | AtCoder DP | Task K |
`;

async function fix() {
    try {
        console.log('Fixing DP content...');

        // Update topic 57 (Classic Problems)
        await pool.query('UPDATE cp_topics SET content = $1 WHERE topic_id = 57', [fixedClassics]);
        console.log('Fixed topic 57: Classic Problems');

        // Update topic 58 (Range DP)
        await pool.query('UPDATE cp_topics SET content = $1 WHERE topic_id = 58', [fixedRange]);
        console.log('Fixed topic 58: Range DP');

        console.log('Done!');
    } catch (err) {
        console.error('Error:', err.message);
    } finally {
        await pool.end();
    }
}

fix();
