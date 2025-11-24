const pool = require('../db');

async function addFinalBatch() {
    const client = await pool.connect();
    try {
        console.log('🚀 Adding Final Missing Topics...\n');

        const modules = await client.query("SELECT module_id, title FROM dsa_modules");
        const moduleMap = {};
        modules.rows.forEach(m => moduleMap[m.title] = m.module_id);

        const getNextOrder = async (moduleId) => {
            const res = await client.query(
                "SELECT COALESCE(MAX(order_index), 0) + 1 as next_order FROM dsa_topics WHERE module_id = $1",
                [moduleId]
            );
            return res.rows[0].next_order;
        };

        let count = 0;

        // 1. I/O Techniques
        let order = await getNextOrder(moduleMap['1. Introduction & C++ Basics']);
        await client.query(
            "INSERT INTO dsa_topics (module_id, title, content, order_index) VALUES ($1, $2, $3, $4)",
            [moduleMap['1. Introduction & C++ Basics'], 'Fast Input/Output Techniques', `
# Fast I/O Techniques for Competitive Programming

## Speed Up cin/cout
\`\`\`cpp
int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    
    int n;
    cin >> n;
    // Fast I/O now
}
\`\`\`

## Reading Until EOF
\`\`\`cpp
int n;
while (cin >> n) {
    // Process n
}
\`\`\`

## Reading Entire Line
\`\`\`cpp
string line;
getline(cin, line);
\`\`\`

## Multiple Test Cases
\`\`\`cpp
int t;
cin >> t;
while (t--) {
    // Solve test case
}
\`\`\`
`, order]);
        count++;

        // 2. Rabin-Karp
        order = await getNextOrder(moduleMap['5. Strings']);
        await client.query(
            "INSERT INTO dsa_topics (module_id, title, content, order_index) VALUES ($1, $2, $3, $4)",
            [moduleMap['5. Strings'], 'Rabin-Karp Algorithm (Rolling Hash)', `
# Rabin-Karp Algorithm

Pattern matching using rolling hash.

\`\`\`cpp
const int MOD = 1e9 + 7;
const int BASE = 31;

long long computeHash(string s) {
    long long hash = 0;
    long long pow = 1;
    for (char c : s) {
        hash = (hash + (c - 'a' + 1) * pow) % MOD;
        pow = (pow * BASE) % MOD;
    }
    return hash;
}

vector<int> rabinKarp(string text, string pattern) {
    int n = text.size(), m = pattern.size();
    if (m > n) return {};
    
    long long patternHash = computeHash(pattern);
    long long textHash = computeHash(text.substr(0, m));
    
    vector<int> matches;
    if (textHash == patternHash && text.substr(0, m) == pattern) {
        matches.push_back(0);
    }
    
    long long pow = 1;
    for (int i = 0; i < m - 1; i++) pow = (pow * BASE) % MOD;
    
    for (int i = 1; i <= n - m; i++) {
        textHash = (textHash - (text[i-1] - 'a' + 1) + MOD) % MOD;
        textHash = (textHash * BASE) % MOD;
        textHash = (textHash + (text[i+m-1] - 'a' + 1)) % MOD;
        
        if (textHash == patternHash && text.substr(i, m) == pattern) {
            matches.push_back(i);
        }
    }
    return matches;
}
\`\`\`

**Time**: O(n + m) average case
`, order]);
        count++;

        // 3. Quick Select
        order = await getNextOrder(moduleMap['6. Searching & Sorting']);
        await client.query(
            "INSERT INTO dsa_topics (module_id, title, content, order_index) VALUES ($1, $2, $3, $4)",
            [moduleMap['6. Searching & Sorting'], 'Quick Select (Kth Element)', `
# Quick Select Algorithm

Find Kth smallest/largest element in O(n) average time.

\`\`\`cpp
int partition(vector<int>& arr, int left, int right) {
    int pivot = arr[right];
    int i = left;
    
    for (int j = left; j < right; j++) {
        if (arr[j] <= pivot) {
            swap(arr[i], arr[j]);
            i++;
        }
    }
    swap(arr[i], arr[right]);
    return i;
}

int quickSelect(vector<int>& arr, int left, int right, int k) {
    if (left == right) return arr[left];
    
    int pivotIndex = partition(arr, left, right);
    
    if (k == pivotIndex) {
        return arr[k];
    } else if (k < pivotIndex) {
        return quickSelect(arr, left, pivotIndex - 1, k);
    } else {
        return quickSelect(arr, pivotIndex + 1, right, k);
    }
}

int findKthSmallest(vector<int>& nums, int k) {
    return quickSelect(nums, 0, nums.size() - 1, k - 1);
}
\`\`\`

**Time**: O(n) average, O(n²) worst case  
**Use for**: Finding median, Kth largest element
`, order]);
        count++;

        // 4. Subset Generation
        order = await getNextOrder(moduleMap['7. Recursion & Backtracking']);
        await client.query(
            "INSERT INTO dsa_topics (module_id, title, content, order_index) VALUES ($1, $2, $3, $4)",
            [moduleMap['7. Recursion & Backtracking'], 'Subset Generation & Combination Sum', `
# Generating All Subsets

## Using Backtracking
\`\`\`cpp
void backtrack(vector<int>& nums, int start, vector<int>& current, vector<vector<int>>& result) {
    result.push_back(current);
    
    for (int i = start; i < nums.size(); i++) {
        current.push_back(nums[i]);
        backtrack(nums, i + 1, current, result);
        current.pop_back();
    }
}

vector<vector<int>> subsets(vector<int>& nums) {
    vector<vector<int>> result;
    vector<int> current;
    backtrack(nums, 0, current, result);
    return result;
}
\`\`\`

## Using Bit Manipulation
\`\`\`cpp
vector<vector<int>> subsets(vector<int>& nums) {
    int n = nums.size();
    vector<vector<int>> result;
    
    for (int mask = 0; mask < (1 << n); mask++) {
        vector<int> subset;
        for (int i = 0; i < n; i++) {
            if (mask & (1 << i)) {
                subset.push_back(nums[i]);
            }
        }
        result.push_back(subset);
    }
    return result;
}
\`\`\`

## Combination Sum
\`\`\`cpp
void backtrack(vector<int>& candidates, int target, int start, vector<int>& current, vector<vector<int>>& result) {
    if (target == 0) {
        result.push_back(current);
        return;
    }
    
    for (int i = start; i < candidates.size(); i++) {
        if (candidates[i] > target) continue;
        current.push_back(candidates[i]);
        backtrack(candidates, target - candidates[i], i, current, result);
        current.pop_back();
    }
}
\`\`\`
`, order]);
        count++;

        // 5. Next Greater Element
        order = await getNextOrder(moduleMap['9. Stacks & Queues']);
        await client.query(
            "INSERT INTO dsa_topics (module_id, title, content, order_index) VALUES ($1, $2, $3, $4)",
            [moduleMap['9. Stacks & Queues'], 'Next Greater Element Problems', `
# Next Greater Element

## Basic Next Greater Element
\`\`\`cpp
vector<int> nextGreaterElement(vector<int>& nums) {
    int n = nums.size();
    vector<int> result(n, -1);
    stack<int> st;
    
    for (int i = 0; i < n; i++) {
        while (!st.empty() && nums[st.top()] < nums[i]) {
            result[st.top()] = nums[i];
            st.pop();
        }
        st.push(i);
    }
    return result;
}
\`\`\`

## Next Greater Element in Circular Array
\`\`\`cpp
vector<int> nextGreaterElements(vector<int>& nums) {
    int n = nums.size();
    vector<int> result(n, -1);
    stack<int> st;
    
    for (int i = 0; i < 2 * n; i++) {
        while (!st.empty() && nums[st.top()] < nums[i % n]) {
            result[st.top()] = nums[i % n];
            st.pop();
        }
        if (i < n) st.push(i);
    }
    return result;
}
\`\`\`

## Stock Span Problem
\`\`\`cpp
class StockSpanner {
    stack<pair<int, int>> st; // {price, span}
public:
    int next(int price) {
        int span = 1;
        while (!st.empty() && st.top().first <= price) {
            span += st.top().second;
            st.pop();
        }
        st.push({price, span});
        return span;
    }
};
\`\`\`
`, order]);
        count++;

        // 6. Strongly Connected Components
        order = await getNextOrder(moduleMap['12. Graphs']);
        await client.query(
            "INSERT INTO dsa_topics (module_id, title, content, order_index) VALUES ($1, $2, $3, $4)",
            [moduleMap['12. Graphs'], 'Strongly Connected Components (Kosaraju)', `
# Strongly Connected Components (SCC)

## Kosaraju's Algorithm

\`\`\`cpp
void dfs1(int u, vector<vector<int>>& adj, vector<bool>& visited, stack<int>& finishStack) {
    visited[u] = true;
    for (int v : adj[u]) {
        if (!visited[v]) dfs1(v, adj, visited, finishStack);
    }
    finishStack.push(u);
}

void dfs2(int u, vector<vector<int>>& revAdj, vector<bool>& visited, vector<int>& component) {
    visited[u] = true;
    component.push_back(u);
    for (int v : revAdj[u]) {
        if (!visited[v]) dfs2(v, revAdj, visited, component);
    }
}

vector<vector<int>> findSCCs(int n, vector<vector<int>>& adj) {
    // Step 1: Fill order of vertices by finish time
    vector<bool> visited(n, false);
    stack<int> finishStack;
    
    for (int i = 0; i < n; i++) {
        if (!visited[i]) dfs1(i, adj, visited, finishStack);
    }
    
    // Step 2: Create reverse graph
    vector<vector<int>> revAdj(n);
    for (int u = 0; u < n; u++) {
        for (int v : adj[u]) {
            revAdj[v].push_back(u);
        }
    }
    
    // Step 3: DFS in reverse graph
    fill(visited.begin(), visited.end(), false);
    vector<vector<int>> sccs;
    
    while (!finishStack.empty()) {
        int u = finishStack.top();
        finishStack.pop();
        
        if (!visited[u]) {
            vector<int> component;
            dfs2(u, revAdj, visited, component);
            sccs.push_back(component);
        }
    }
    
    return sccs;
}
\`\`\`

**Time**: O(V + E)  
**Applications**: Finding cycles in directed graphs, condensation graph
`, order]);
        count++;

        // 7. Matrix Chain Multiplication
        order = await getNextOrder(moduleMap['13. Dynamic Programming']);
        await client.query(
            "INSERT INTO dsa_topics (module_id, title, content, order_index) VALUES ($1, $2, $3, $4)",
            [moduleMap['13. Dynamic Programming'], 'Matrix Chain Multiplication', `
# Matrix Chain Multiplication

Find minimum number of operations to multiply a chain of matrices.

\`\`\`cpp
int matrixChainMultiplication(vector<int>& dims) {
    int n = dims.size() - 1;
    vector<vector<int>> dp(n, vector<int>(n, 0));
    
    for (int len = 2; len <= n; len++) {
        for (int i = 0; i < n - len + 1; i++) {
            int j = i + len - 1;
            dp[i][j] = INT_MAX;
            
            for (int k = i; k < j; k++) {
                int cost = dp[i][k] + dp[k+1][j] + dims[i] * dims[k+1] * dims[j+1];
                dp[i][j] = min(dp[i][j], cost);
            }
        }
    }
    return dp[0][n-1];
}
\`\`\`

**Example**: Matrices A(10×20), B(20×30), C(30×40)  
dims = [10, 20, 30, 40]  
Result: Minimum operations needed

**Time**: O(n³)
`, order]);
        count++;

        // 8. Combinatorics
        order = await getNextOrder(moduleMap['15. Number Theory & Math']);
        await client.query(
            "INSERT INTO dsa_topics (module_id, title, content, order_index) VALUES ($1, $2, $3, $4)",
            [moduleMap['15. Number Theory & Math'], 'Combinatorics (nCr, nPr, Catalan)', `
# Combinatorics

## nCr (n Choose r)
\`\`\`cpp
const int MOD = 1e9 + 7;
const int MAXN = 1e6;
long long fact[MAXN + 1];
long long invFact[MAXN + 1];

long long power(long long a, long long b, long long mod) {
    long long result = 1;
    while (b > 0) {
        if (b & 1) result = (result * a) % mod;
        a = (a * a) % mod;
        b >>= 1;
    }
    return result;
}

void precompute() {
    fact[0] = 1;
    for (int i = 1; i <= MAXN; i++) {
        fact[i] = (fact[i-1] * i) % MOD;
    }
    invFact[MAXN] = power(fact[MAXN], MOD - 2, MOD);
    for (int i = MAXN - 1; i >= 0; i--) {
        invFact[i] = (invFact[i+1] * (i+1)) % MOD;
    }
}

long long nCr(int n, int r) {
    if (r > n || r < 0) return 0;
    return (fact[n] * invFact[r] % MOD) * invFact[n-r] % MOD;
}

long long nPr(int n, int r) {
    if (r > n || r < 0) return 0;
    return (fact[n] * invFact[n-r]) % MOD;
}
\`\`\`

## Catalan Numbers
\`\`\`cpp
long long catalan(int n) {
    return nCr(2*n, n) * power(n+1, MOD-2, MOD) % MOD;
}
// Catalan: 1, 1, 2, 5, 14, 42, ...
// Applications: BST count, parentheses combinations
\`\`\`

## Pascal's Triangle
\`\`\`cpp
vector<vector<int>> pascalTriangle(int n) {
    vector<vector<int>> triangle(n);
    for (int i = 0; i < n; i++) {
        triangle[i].resize(i + 1, 1);
        for (int j = 1; j < i; j++) {
            triangle[i][j] = triangle[i-1][j-1] + triangle[i-1][j];
        }
    }
    return triangle;
}
\`\`\`
`, order]);
        count++;

        console.log(`\n✅ Added ${count} final topics!`);
        console.log('Final batch:');
        console.log('  - Fast Input/Output Techniques');
        console.log('  - Rabin-Karp Algorithm');
        console.log('  - Quick Select');
        console.log('  - Subset Generation & Combination Sum');
        console.log('  - Next Greater Element Problems');
        console.log('  - Strongly Connected Components (Kosaraju)');
        console.log('  - Matrix Chain Multiplication');
        console.log('  - Combinatorics (nCr, nPr, Catalan)');

    } catch (err) {
        console.error('Error:', err);
    } finally {
        client.release();
        await pool.end();
    }
}

addFinalBatch();
