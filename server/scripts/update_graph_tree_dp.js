const { Pool } = require('pg');

const pool = new Pool({
    connectionString: 'postgresql://postgres.xlqzqcqacpajpqwneqpa:05Supabase%40%40%3F%3F@aws-1-ap-south-1.pooler.supabase.com:6543/postgres',
    ssl: { rejectUnauthorized: false }
});

const graphContent = {
    "1. DFS & BFS Fundamentals": `# Graph Traversals

## 🧠 DFS (Depth First Search)
\`\`\`cpp
vector<int> adj[MAXN];
bool vis[MAXN];

void dfs(int u) {
    vis[u] = true;
    for (int v : adj[u])
        if (!vis[v]) dfs(v);
}
\`\`\`

**Applications**: Connectivity, cycle detection, topological sort, SCC.
**Complexity**: O(V + E)

---

## 🧠 BFS (Breadth First Search)
\`\`\`cpp
void bfs(int start) {
    queue<int> q;
    q.push(start);
    dist[start] = 0;
    
    while (!q.empty()) {
        int u = q.front(); q.pop();
        for (int v : adj[u]) {
            if (dist[v] == -1) {
                dist[v] = dist[u] + 1;
                q.push(v);
            }
        }
    }
}
\`\`\`

**Application**: Shortest path in unweighted graph.

---

## 🎮 0-1 BFS
For graphs with edge weights 0 or 1:
\`\`\`cpp
void bfs01(int start) {
    deque<int> dq;
    dq.push_back(start);
    dist[start] = 0;
    
    while (!dq.empty()) {
        int u = dq.front(); dq.pop_front();
        for (auto [v, w] : adj[u]) {
            if (dist[u] + w < dist[v]) {
                dist[v] = dist[u] + w;
                if (w == 0) dq.push_front(v);
                else dq.push_back(v);
            }
        }
    }
}
\`\`\`

---

## 📚 Practice Problems

- [Rumor (CF 893C)](https://codeforces.com/problemset/problem/893/C)
- [Counting Rooms (CSES)](https://cses.fi/problemset/task/1192)
`,

    "2. Shortest Path Algorithms": `# Shortest Path

## 🧠 Dijkstra's Algorithm
For non-negative edge weights. O(E log V).

\`\`\`cpp
vector<pair<int,int>> adj[MAXN];
long long dist[MAXN];

void dijkstra(int start) {
    fill(dist, dist + MAXN, LLONG_MAX);
    priority_queue<pair<long long,int>, vector<pair<long long,int>>, greater<>> pq;
    
    dist[start] = 0;
    pq.push({0, start});
    
    while (!pq.empty()) {
        auto [d, u] = pq.top(); pq.pop();
        if (d > dist[u]) continue;
        
        for (auto [v, w] : adj[u]) {
            if (dist[u] + w < dist[v]) {
                dist[v] = dist[u] + w;
                pq.push({dist[v], v});
            }
        }
    }
}
\`\`\`

---

## 🧠 Bellman-Ford
Handles negative weights, detects negative cycles. O(VE).

\`\`\`cpp
struct Edge { int u, v, w; };
vector<Edge> edges;

bool bellmanFord(int start, int n) {
    fill(dist, dist + n, LLONG_MAX);
    dist[start] = 0;
    
    for (int i = 0; i < n - 1; i++) {
        for (auto& e : edges) {
            if (dist[e.u] != LLONG_MAX && dist[e.u] + e.w < dist[e.v])
                dist[e.v] = dist[e.u] + e.w;
        }
    }
    
    // Check for negative cycle
    for (auto& e : edges)
        if (dist[e.u] != LLONG_MAX && dist[e.u] + e.w < dist[e.v])
            return true;  // Negative cycle exists
    return false;
}
\`\`\`

---

## 🧠 Floyd-Warshall
All-pairs shortest path. O(V³).

\`\`\`cpp
long long dist[MAXN][MAXN];

void floydWarshall(int n) {
    for (int k = 0; k < n; k++)
        for (int i = 0; i < n; i++)
            for (int j = 0; j < n; j++)
                if (dist[i][k] < INF && dist[k][j] < INF)
                    dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j]);
}
\`\`\`

---

## 📚 Practice Problems

- [Shortest Routes I (CSES)](https://cses.fi/problemset/task/1671)
- [Dijkstra? (CF 20C)](https://codeforces.com/problemset/problem/20/C)
`,

    "3. DSU & MST": `# DSU & Minimum Spanning Tree

## 🧠 Disjoint Set Union
\`\`\`cpp
int parent[MAXN], rnk[MAXN];

void init(int n) {
    for (int i = 0; i < n; i++) parent[i] = i, rnk[i] = 0;
}

int find(int x) {
    if (parent[x] != x) parent[x] = find(parent[x]);  // Path compression
    return parent[x];
}

void unite(int x, int y) {
    x = find(x); y = find(y);
    if (x == y) return;
    if (rnk[x] < rnk[y]) swap(x, y);  // Union by rank
    parent[y] = x;
    if (rnk[x] == rnk[y]) rnk[x]++;
}
\`\`\`

**Complexity**: Nearly O(1) per operation (amortized with path compression + union by rank).

---

## 🧠 Kruskal's Algorithm
\`\`\`cpp
struct Edge { int u, v, w; };

long long kruskal(vector<Edge>& edges, int n) {
    sort(edges.begin(), edges.end(), [](auto& a, auto& b) { return a.w < b.w; });
    init(n);
    
    long long mstWeight = 0;
    int edgesUsed = 0;
    
    for (auto& e : edges) {
        if (find(e.u) != find(e.v)) {
            unite(e.u, e.v);
            mstWeight += e.w;
            edgesUsed++;
            if (edgesUsed == n - 1) break;
        }
    }
    return (edgesUsed == n - 1) ? mstWeight : -1;  // -1 if disconnected
}
\`\`\`

---

## 📚 Practice Problems

- [Road Reparation (CSES)](https://cses.fi/problemset/task/1675)
- [Mocha and Diana (CF 1559D1)](https://codeforces.com/problemset/problem/1559/D1)
`,

    "4. DAG & Topological Sort": `# DAG & Topological Sort

## 🧠 Kahn's Algorithm (BFS)
\`\`\`cpp
vector<int> topoSort(int n, vector<int> adj[]) {
    vector<int> inDegree(n);
    for (int u = 0; u < n; u++)
        for (int v : adj[u]) inDegree[v]++;
    
    queue<int> q;
    for (int i = 0; i < n; i++)
        if (inDegree[i] == 0) q.push(i);
    
    vector<int> result;
    while (!q.empty()) {
        int u = q.front(); q.pop();
        result.push_back(u);
        for (int v : adj[u]) {
            if (--inDegree[v] == 0) q.push(v);
        }
    }
    
    return (result.size() == n) ? result : vector<int>();  // Empty if cycle
}
\`\`\`

---

## 🎮 Longest Path in DAG
\`\`\`cpp
int dp[MAXN];
bool vis[MAXN];

int longestPath(int u) {
    if (vis[u]) return dp[u];
    vis[u] = true;
    dp[u] = 0;
    for (int v : adj[u])
        dp[u] = max(dp[u], 1 + longestPath(v));
    return dp[u];
}
\`\`\`

---

## 📚 Practice Problems

- [Course Schedule II (LeetCode)](https://leetcode.com/problems/course-schedule-ii/)
- [Game Routes (CSES)](https://cses.fi/problemset/task/1681)
`,

    "5. Advanced Connectivity (Bridges, SCC)": `# Bridges & SCC

## 🧠 Finding Bridges
\`\`\`cpp
int tin[MAXN], low[MAXN], timer = 0;
vector<pair<int,int>> bridges;

void dfs(int u, int parent) {
    tin[u] = low[u] = timer++;
    for (int v : adj[u]) {
        if (v == parent) continue;
        if (tin[v] != -1) {
            low[u] = min(low[u], tin[v]);
        } else {
            dfs(v, u);
            low[u] = min(low[u], low[v]);
            if (low[v] > tin[u])
                bridges.push_back({u, v});
        }
    }
}
\`\`\`

---

## 🧠 SCC (Kosaraju's Algorithm)
\`\`\`cpp
vector<int> adj[MAXN], radj[MAXN];
stack<int> order;
int comp[MAXN];

void dfs1(int u) {
    vis[u] = true;
    for (int v : adj[u]) if (!vis[v]) dfs1(v);
    order.push(u);
}

void dfs2(int u, int c) {
    comp[u] = c;
    for (int v : radj[u]) if (comp[v] == -1) dfs2(v, c);
}

int kosaraju(int n) {
    fill(vis, vis + n, false);
    for (int i = 0; i < n; i++) if (!vis[i]) dfs1(i);
    
    fill(comp, comp + n, -1);
    int numSCC = 0;
    while (!order.empty()) {
        int u = order.top(); order.pop();
        if (comp[u] == -1) dfs2(u, numSCC++);
    }
    return numSCC;
}
\`\`\`

---

## 📚 Practice Problems

- [Critical Connections (LeetCode)](https://leetcode.com/problems/critical-connections-in-a-network/)
- [Checkposts (CF 427C)](https://codeforces.com/problemset/problem/427/C)
`,

    "6. Grid Graphs & Matrix Algorithms": `# Grid Graphs

## 💻 Template
\`\`\`cpp
int dx[] = {0, 0, 1, -1};
int dy[] = {1, -1, 0, 0};

bool isValid(int x, int y, int n, int m) {
    return x >= 0 && x < n && y >= 0 && y < m;
}

void bfsGrid(int sr, int sc, int n, int m) {
    queue<pair<int,int>> q;
    q.push({sr, sc});
    dist[sr][sc] = 0;
    
    while (!q.empty()) {
        auto [x, y] = q.front(); q.pop();
        for (int d = 0; d < 4; d++) {
            int nx = x + dx[d], ny = y + dy[d];
            if (isValid(nx, ny, n, m) && grid[nx][ny] != '#' && dist[nx][ny] == -1) {
                dist[nx][ny] = dist[x][y] + 1;
                q.push({nx, ny});
            }
        }
    }
}
\`\`\`

---

## 🎮 Multi-Source BFS
Push all sources at once with distance 0:
\`\`\`cpp
for (auto& source : sources) {
    q.push(source);
    dist[source.first][source.second] = 0;
}
// Then run normal BFS
\`\`\`

---

## 📚 Practice Problems

- [Labyrinth (CSES)](https://cses.fi/problemset/task/1193)
- [Minimum Path Sum (LeetCode)](https://leetcode.com/problems/minimum-path-sum/)
`
};

const treeContent = {
    "1. Tree Basics & Traversal": `# Tree Basics

## 🧠 Properties
- N nodes, N-1 edges
- Connected and acyclic
- Unique path between any two nodes

---

## 🎮 Tree Diameter
Longest path between any two nodes.

\`\`\`cpp
pair<int,int> bfs(int start) {
    queue<int> q;
    vector<int> dist(n, -1);
    q.push(start);
    dist[start] = 0;
    int farthest = start;
    
    while (!q.empty()) {
        int u = q.front(); q.pop();
        for (int v : adj[u]) {
            if (dist[v] == -1) {
                dist[v] = dist[u] + 1;
                q.push(v);
                if (dist[v] > dist[farthest]) farthest = v;
            }
        }
    }
    return {farthest, dist[farthest]};
}

int treeDiameter() {
    auto [u, _] = bfs(0);
    auto [v, d] = bfs(u);
    return d;
}
\`\`\`

---

## 📚 Practice Problems

- [Tree Diameter (CSES)](https://cses.fi/problemset/task/1131)
- [Subordinates (CSES)](https://cses.fi/problemset/task/1674)
`,

    "2. Lowest Common Ancestor (LCA)": `# LCA with Binary Lifting

## 💻 Template
\`\`\`cpp
const int LOG = 20;
int up[MAXN][LOG], depth[MAXN];

void dfs(int u, int p) {
    up[u][0] = p;
    for (int i = 1; i < LOG; i++)
        up[u][i] = (up[u][i-1] == -1) ? -1 : up[up[u][i-1]][i-1];
    
    for (int v : adj[u]) {
        if (v != p) {
            depth[v] = depth[u] + 1;
            dfs(v, u);
        }
    }
}

int lca(int u, int v) {
    if (depth[u] < depth[v]) swap(u, v);
    int diff = depth[u] - depth[v];
    
    for (int i = 0; i < LOG; i++)
        if ((diff >> i) & 1) u = up[u][i];
    
    if (u == v) return u;
    
    for (int i = LOG - 1; i >= 0; i--)
        if (up[u][i] != up[v][i]) {
            u = up[u][i];
            v = up[v][i];
        }
    return up[u][0];
}

int dist(int u, int v) {
    return depth[u] + depth[v] - 2 * depth[lca(u, v)];
}
\`\`\`

**Complexity**: O(N log N) preprocess, O(log N) query.

---

## 📚 Practice Problems

- [Company Queries II (CSES)](https://cses.fi/problemset/task/1688)
`,

    "3. Tree Flattening (Euler Tour)": `# Euler Tour / Tree Flattening

## 🎯 Purpose
Convert tree to array for range queries on subtrees.

---

## 💻 Template
\`\`\`cpp
int tin[MAXN], tout[MAXN], timer = 0;
int euler[MAXN];

void dfs(int u, int p) {
    tin[u] = timer;
    euler[timer++] = u;
    
    for (int v : adj[u])
        if (v != p) dfs(v, u);
    
    tout[u] = timer - 1;
}
\`\`\`

**Subtree of u**: corresponds to range [tin[u], tout[u]] in euler array.

---

## 📚 Practice Problems

- [Subtree Queries (CSES)](https://cses.fi/problemset/task/1137)
- [Path Queries (CSES)](https://cses.fi/problemset/task/1138)
`,

    "4. Tree Dynamic Programming": `# Tree DP

## 🧠 Template
\`\`\`cpp
void dfs(int u, int p) {
    for (int v : adj[u]) {
        if (v != p) {
            dfs(v, u);
            // Combine dp[v] into dp[u]
        }
    }
    // Finalize dp[u]
}
\`\`\`

---

## 🎮 Examples

### Subtree Size
\`\`\`cpp
void dfs(int u, int p) {
    sz[u] = 1;
    for (int v : adj[u])
        if (v != p) { dfs(v, u); sz[u] += sz[v]; }
}
\`\`\`

### Max Independent Set
\`\`\`cpp
void dfs(int u, int p) {
    dp[u][0] = 0;  // Don't take u
    dp[u][1] = 1;  // Take u
    for (int v : adj[u]) {
        if (v != p) {
            dfs(v, u);
            dp[u][0] += max(dp[v][0], dp[v][1]);
            dp[u][1] += dp[v][0];
        }
    }
}
\`\`\`

### Rerooting (All Tree Distances)
Compute answer for all nodes as root in O(N).

---

## 📚 Practice Problems

- [Tree Matching (CSES)](https://cses.fi/problemset/task/1130)
- [Tree Distances I (CSES)](https://cses.fi/problemset/task/1132)
`
};

const dpContent = {
    "1. DP Fundamentals (1D & 2D)": `# Dynamic Programming Basics

## 🧠 Core Concepts
1. **Optimal Substructure**: Optimal solution contains optimal solutions to subproblems
2. **Overlapping Subproblems**: Same subproblems solved multiple times

---

## 💻 1D DP Template
\`\`\`cpp
// Fibonacci
dp[0] = 0; dp[1] = 1;
for (int i = 2; i <= n; i++)
    dp[i] = dp[i-1] + dp[i-2];
\`\`\`

---

## 💻 2D DP Template (Grid Paths)
\`\`\`cpp
dp[0][0] = 1;
for (int i = 0; i < n; i++) {
    for (int j = 0; j < m; j++) {
        if (grid[i][j] == '#') continue;
        if (i > 0) dp[i][j] += dp[i-1][j];
        if (j > 0) dp[i][j] += dp[i][j-1];
    }
}
// Answer: dp[n-1][m-1]
\`\`\`

---

## 📚 Practice Problems

- [Frog 1 (AtCoder DP A)](https://atcoder.jp/contests/dp/tasks/dp_a)
- [Grid Paths (CSES)](https://cses.fi/problemset/task/1638)
`,

    "2. Classic Problems (Knapsack, LIS, LCS)": `# Classic DP Problems

## 🧠 0/1 Knapsack
\`\`\`cpp
// dp[i] = max value with capacity i
for (int i = 0; i < n; i++)
    for (int w = W; w >= weight[i]; w--)
        dp[w] = max(dp[w], dp[w - weight[i]] + value[i]);
\`\`\`

---

## 🧠 LIS (Longest Increasing Subsequence)
O(N log N) with binary search:
\`\`\`cpp
vector<int> lis;
for (int x : arr) {
    auto it = lower_bound(lis.begin(), lis.end(), x);
    if (it == lis.end()) lis.push_back(x);
    else *it = x;
}
// Answer: lis.size()
\`\`\`

---

## 🧠 LCS (Longest Common Subsequence)
\`\`\`cpp
for (int i = 1; i <= n; i++) {
    for (int j = 1; j <= m; j++) {
        if (a[i-1] == b[j-1])
            dp[i][j] = dp[i-1][j-1] + 1;
        else
            dp[i][j] = max(dp[i-1][j], dp[i][j-1]);
    }
}
\`\`\`

---

## 📚 Practice Problems

- [Knapsack 1 (AtCoder DP D)](https://atcoder.jp/contests/dp/tasks/dp_d)
- [LIS (CSES)](https://cses.fi/problemset/task/1145)
`,

    "3. Range DP (Intervals)": `# Range DP

## 🧠 Template
\`\`\`cpp
// dp[i][j] = answer for range [i, j]
for (int len = 2; len <= n; len++) {
    for (int i = 0; i + len - 1 < n; i++) {
        int j = i + len - 1;
        dp[i][j] = INF;
        for (int k = i; k < j; k++) {
            dp[i][j] = min(dp[i][j], dp[i][k] + dp[k+1][j] + cost(i, k, j));
        }
    }
}
\`\`\`

**Complexity**: O(N³)

---

## 📚 Practice Problems

- [Matrix Chain (GFG)](https://practice.geeksforgeeks.org/problems/matrix-chain-multiplication0303/1)
- [Slime (AtCoder DP N)](https://atcoder.jp/contests/dp/tasks/dp_n)
`,

    "4. Digit DP & Bitmask DP": `# Advanced DP

## 🧠 Digit DP
Count numbers in [0, R] with some property.

\`\`\`cpp
string num;
int dp[20][2][...];  // [pos][tight][state]

int solve(int pos, bool tight, int state) {
    if (pos == num.size()) return /* base case */;
    if (dp[pos][tight][state] != -1) return dp[pos][tight][state];
    
    int limit = tight ? (num[pos] - '0') : 9;
    int result = 0;
    for (int d = 0; d <= limit; d++) {
        int newState = /* update state with digit d */;
        result += solve(pos + 1, tight && (d == limit), newState);
    }
    return dp[pos][tight][state] = result;
}
\`\`\`

---

## 🧠 Bitmask DP (TSP)
See Bit Manipulation module.

---

## 📚 Practice Problems

- [Digit Sum (SPOJ)](https://www.spoj.com/problems/PR003004/)
- [Matching (AtCoder DP O)](https://atcoder.jp/contests/dp/tasks/dp_o)
`,

    "5. DP Optimizations (CHT, SOS)": `# DP Optimizations

## 🧠 Convex Hull Trick
For recurrence: dp[i] = min(dp[j] + b[j] * a[i])

Reduce O(N²) to O(N) or O(N log N).

---

## 🧠 SOS DP (Sum Over Subsets)
\`\`\`cpp
for (int i = 0; i < (1 << n); i++)
    f[i] = a[i];

for (int j = 0; j < n; j++)
    for (int mask = 0; mask < (1 << n); mask++)
        if (mask & (1 << j))
            f[mask] += f[mask ^ (1 << j)];

// f[mask] = sum of a[sub] for all sub ⊆ mask
\`\`\`

---

## 📚 Practice Problems

- [Frog 3 (AtCoder DP Z)](https://atcoder.jp/contests/dp/tasks/dp_z)
- [Vowels (CF 383E)](https://codeforces.com/problemset/problem/383/E)
`,

    "6. Master DP: Patterns & Constraints": `# DP Problem-Solving Guide

## 🎮 Constraint Analysis

| Constraint | Likely Approach |
|------------|-----------------|
| N ≤ 20 | Bitmask DP O(2^N × N) |
| N ≤ 100 | O(N³) Range DP |
| N ≤ 1000 | O(N²) 2D DP |
| N ≤ 10^5 | O(N log N) DP + optimization |

---

## 🎮 Common Patterns

1. **Pick/Skip**: dp[i] = max(dp[i-1], dp[i-2] + val[i])
2. **Partition**: dp[i] = min(dp[j] + cost(j+1, i))
3. **Counting**: dp[i][j] = dp[i-1][j-1] + dp[i-1][j]

---

## ⚠️ Debugging Tips

1. Print DP table for small inputs
2. Check base cases carefully
3. Verify transitions with manual examples

---

## 📚 Practice Problems

- [Boredom (CF 455A)](https://codeforces.com/problemset/problem/455/A)
- [Flowers (CF 474D)](https://codeforces.com/problemset/problem/474/D)
`
};

async function update() {
    try {
        for (const [title, content] of Object.entries(graphContent)) {
            await pool.query('UPDATE cp_topics SET content = $1 WHERE title = $2', [content, title]);
            console.log('✅ ' + title);
        }
        for (const [title, content] of Object.entries(treeContent)) {
            await pool.query('UPDATE cp_topics SET content = $1 WHERE title = $2', [content, title]);
            console.log('✅ ' + title);
        }
        for (const [title, content] of Object.entries(dpContent)) {
            await pool.query('UPDATE cp_topics SET content = $1 WHERE title = $2', [content, title]);
            console.log('✅ ' + title);
        }
        console.log('🎉 Done!');
    } catch (err) {
        console.error(err);
    } finally {
        await pool.end();
    }
}

update();
