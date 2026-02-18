/**
 * Graph, Tree & DP Content Update Script
 * Integrates level-wise content from ChatGPT conversation
 * 
 * Usage: node scripts/update_graph_tree_dp_v2.js "postgresql://..."
 */

const { Pool } = require('pg');

const DATABASE_URL = process.argv[2];

if (!DATABASE_URL) {
    console.error('❌ Please provide DATABASE_URL as argument!');
    console.error('Usage: node scripts/update_graph_tree_dp_v2.js "postgresql://..."');
    process.exit(1);
}

const pool = new Pool({
    connectionString: DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});


// Content additions organized by topic
const contentAdditions = {
    // ==========================================
    // GRAPHS MODULE - Level 1-7 Content
    // ==========================================

    "1. DFS & BFS Fundamentals": `

---

## 📚 Level-wise Learning Path (Graphs)

### 🟢 Level 1: DFS Template & Basics
\`\`\`cpp
const int N = 1e5+10;
vector<int> g[N];
bool vis[N];

void dfs(int vertex) {
    vis[vertex] = true;
    cout << vertex << " ";
    
    for(int child : g[vertex]) {
        if(!vis[child]) dfs(child);
    }
}
\`\`\`

**Key Points:**
- Use adjacency list for sparse graphs
- Always mark visited before recursing
- For disconnected graphs, loop through all nodes

### 🟢 Level 2: Connected Components
\`\`\`cpp
vector<vector<int>> cc;
vector<int> current_cc;

void dfs(int vertex) {
    vis[vertex] = true;
    current_cc.push_back(vertex);
    for(int child : g[vertex]) {
        if(!vis[child]) dfs(child);
    }
}

// In main:
for(int i = 1; i <= n; i++) {
    if(!vis[i]) {
        current_cc.clear();
        dfs(i);
        cc.push_back(current_cc);
    }
}
cout << cc.size(); // Number of components
\`\`\`

### 🟡 Level 3: Cycle Detection

**Undirected Graph (check parent):**
\`\`\`cpp
bool dfs_cycle(int node, int parent) {
    vis[node] = true;
    for(int child : g[node]) {
        if(!vis[child]) {
            if(dfs_cycle(child, node)) return true;
        } else if(child != parent) {
            return true; // Back edge = cycle
        }
    }
    return false;
}
\`\`\`

**Directed Graph (recursion stack):**
\`\`\`cpp
bool inRecursion[N];

bool dfs_directed_cycle(int node) {
    vis[node] = true;
    inRecursion[node] = true;
    
    for(int child : g[node]) {
        if(!vis[child]) {
            if(dfs_directed_cycle(child)) return true;
        } else if(inRecursion[child]) {
            return true; // Back edge
        }
    }
    inRecursion[node] = false;
    return false;
}
\`\`\`

### 🟡 Level 4: BFS Shortest Path (Unweighted)
\`\`\`cpp
void bfs(int src, int n) {
    vector<int> dist(n+1, INT_MAX);
    queue<int> q;
    
    dist[src] = 0;
    q.push(src);
    
    while(!q.empty()) {
        int node = q.front(); q.pop();
        for(int child : g[node]) {
            if(dist[child] == INT_MAX) {
                dist[child] = dist[node] + 1;
                q.push(child);
            }
        }
    }
}
\`\`\`

## 🎯 Practice Problems (DFS/BFS)

| Problem | Platform | Difficulty |
|---------|----------|------------|
| [Number of Islands](https://leetcode.com/problems/number-of-islands/) | LeetCode | Medium |
| [Max Area of Island](https://leetcode.com/problems/max-area-of-island/) | LeetCode | Medium |
| [Journey to the Moon](https://hackerrank.com/challenges/journey-to-the-moon) | HackerRank | Medium |
| [Counting Rooms](https://cses.fi/problemset/task/1192) | CSES | Easy |
| [Building Roads](https://cses.fi/problemset/task/1666) | CSES | Easy |
| [Course Schedule](https://leetcode.com/problems/course-schedule/) | LeetCode | Medium |
| [Rotting Oranges](https://leetcode.com/problems/rotting-oranges/) | LeetCode | Medium |
| [01 Matrix](https://leetcode.com/problems/01-matrix/) | LeetCode | Medium |
| [Shortest Path Binary Matrix](https://leetcode.com/problems/shortest-path-in-binary-matrix/) | LeetCode | Medium |
`,

    "2. Shortest Path Algorithms": `

---

## 📚 Algorithm Comparison

| Algorithm | Graph Type | Complexity | Negative Weights? |
|-----------|------------|------------|-------------------|
| BFS | Unweighted | O(V+E) | N/A |
| Dijkstra | Non-negative | O((V+E)logV) | ❌ |
| Bellman-Ford | Any | O(V×E) | ✅ |
| Floyd-Warshall | All-pairs | O(V³) | ✅ |

### 🟡 Dijkstra's Algorithm
\`\`\`cpp
void dijkstra(int src, int n) {
    vector<int> dist(n+1, INT_MAX);
    priority_queue<pair<int,int>, vector<pair<int,int>>, greater<pair<int,int>>> pq;
    
    dist[src] = 0;
    pq.push({0, src});
    
    while(!pq.empty()) {
        auto [d, node] = pq.top(); pq.pop();
        if(d > dist[node]) continue;
        
        for(auto [nbr, wt] : g[node]) {
            if(dist[node] + wt < dist[nbr]) {
                dist[nbr] = dist[node] + wt;
                pq.push({dist[nbr], nbr});
            }
        }
    }
}
\`\`\`

### 🔴 Bellman-Ford Algorithm
\`\`\`cpp
struct Edge { int u, v, w; };

void bellmanFord(int src, int n, vector<Edge>& edges) {
    vector<int> dist(n+1, INT_MAX);
    dist[src] = 0;
    
    for(int i = 1; i < n; i++) {
        for(auto& e : edges) {
            if(dist[e.u] != INT_MAX && dist[e.u] + e.w < dist[e.v]) {
                dist[e.v] = dist[e.u] + e.w;
            }
        }
    }
    
    // Check negative cycle
    for(auto& e : edges) {
        if(dist[e.u] != INT_MAX && dist[e.u] + e.w < dist[e.v]) {
            cout << "Negative cycle detected!";
            return;
        }
    }
}
\`\`\`

### 🔴 Floyd-Warshall (All-Pairs)
\`\`\`cpp
void floydWarshall(int n) {
    // dist[i][j] initialized with weights, INF for no edge
    for(int k = 1; k <= n; k++)
        for(int i = 1; i <= n; i++)
            for(int j = 1; j <= n; j++)
                dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j]);
}
\`\`\`

## 🎯 Practice Problems

| Problem | Platform | Algorithm |
|---------|----------|-----------|
| [Network Delay Time](https://leetcode.com/problems/network-delay-time/) | LeetCode | Dijkstra |
| [Cheapest Flights Within K Stops](https://leetcode.com/problems/cheapest-flights-within-k-stops/) | LeetCode | Bellman-Ford |
| [Find the City](https://leetcode.com/problems/find-the-city-with-the-smallest-number-of-neighbors-at-a-threshold-distance/) | LeetCode | Floyd-Warshall |
| [Shortest Paths](https://cses.fi/problemset/task/1671) | CSES | Dijkstra |
| [High Score](https://cses.fi/problemset/task/1673) | CSES | Bellman-Ford |
`,

    "4. DAG & Topological Sort": `

---

## 📚 Topological Sorting Methods

### 🟡 DFS-Based (Stack Method)
\`\`\`cpp
stack<int> st;

void dfs(int node) {
    vis[node] = true;
    for(int child : g[node]) {
        if(!vis[child]) dfs(child);
    }
    st.push(node); // Push after visiting all children
}

// In main: Pop stack for topological order
while(!st.empty()) {
    cout << st.top() << " ";
    st.pop();
}
\`\`\`

### 🟡 BFS-Based (Kahn's Algorithm)
\`\`\`cpp
vector<int> topoSort(int n) {
    vector<int> indegree(n+1, 0);
    for(int i = 1; i <= n; i++)
        for(int j : g[i]) indegree[j]++;
    
    queue<int> q;
    for(int i = 1; i <= n; i++)
        if(indegree[i] == 0) q.push(i);
    
    vector<int> topo;
    while(!q.empty()) {
        int node = q.front(); q.pop();
        topo.push_back(node);
        
        for(int child : g[node]) {
            indegree[child]--;
            if(indegree[child] == 0) q.push(child);
        }
    }
    
    if(topo.size() != n) cout << "Cycle detected!";
    return topo;
}
\`\`\`

## 🎯 Practice Problems

| Problem | Platform | Type |
|---------|----------|------|
| [Course Schedule II](https://leetcode.com/problems/course-schedule-ii/) | LeetCode | Topological Sort |
| [Course Schedule](https://cses.fi/problemset/task/1679) | CSES | Topological Sort |
| [Game Routes](https://cses.fi/problemset/task/1681) | CSES | DAG DP |
| [Longest Path](https://atcoder.jp/contests/dp/tasks/dp_g) | AtCoder | DAG DP |
`,

    "5. Advanced Connectivity (Bridges, SCC)": `

---

## 📚 Advanced Graph Algorithms

### 🔴 Bridges (Tarjan's Algorithm)
\`\`\`cpp
int in[N], low[N], timer = 1;

void dfs(int node, int parent) {
    in[node] = low[node] = timer++;
    vis[node] = true;
    
    for(int child : g[node]) {
        if(child == parent) continue;
        if(vis[child]) {
            low[node] = min(low[node], in[child]);
        } else {
            dfs(child, node);
            if(low[child] > in[node])
                cout << "Bridge: " << node << " - " << child << "\\n";
            low[node] = min(low[node], low[child]);
        }
    }
}
\`\`\`

### 🔴 SCC (Kosaraju's Algorithm)
\`\`\`cpp
vector<int> g[N], gr[N]; // Original and reversed
vector<int> order;

void dfs1(int v) {
    vis[v] = true;
    for(int u : g[v]) if(!vis[u]) dfs1(u);
    order.push_back(v);
}

void dfs2(int v, vector<int>& comp) {
    vis[v] = true;
    comp.push_back(v);
    for(int u : gr[v]) if(!vis[u]) dfs2(u, comp);
}

// In main:
// 1. Run dfs1 on all nodes
// 2. Reverse order
// 3. Run dfs2 in reversed order on gr[]
\`\`\`

## 🎯 Practice Problems

| Problem | Platform | Type |
|---------|----------|------|
| [Critical Connections](https://leetcode.com/problems/critical-connections-in-a-network/) | LeetCode | Bridges |
| [Articulation Points](https://practice.geeksforgeeks.org/problems/articulation-point-ii/) | GFG | Articulation |
| [Planets and Kingdoms](https://cses.fi/problemset/task/1683) | CSES | SCC |
| [Coin Collector](https://cses.fi/problemset/task/1686) | CSES | SCC + DP |
`,

    // ==========================================
    // TREES MODULE - Level 8-13 Content
    // ==========================================

    "1. Tree Basics & Traversal": `

---

## 📚 Level-wise Learning Path (Trees)

### 🟢 Level 1: Tree DFS Template
\`\`\`cpp
void dfs(int node, int parent = -1) {
    // Process node (preorder)
    
    for(int child : g[node]) {
        if(child == parent) continue;
        dfs(child, node);
    }
    
    // Process node (postorder)
}
\`\`\`

### 🟢 Level 2: Basic Tree Properties

**Depth/Level:**
\`\`\`cpp
int depth[N];
void dfs(int node, int par) {
    for(int child : g[node]) {
        if(child == par) continue;
        depth[child] = depth[node] + 1;
        dfs(child, node);
    }
}
\`\`\`

**Height:**
\`\`\`cpp
int height[N];
void dfs_height(int node, int par) {
    height[node] = 0;
    for(int child : g[node]) {
        if(child == par) continue;
        dfs_height(child, node);
        height[node] = max(height[node], 1 + height[child]);
    }
}
\`\`\`

**Subtree Size:**
\`\`\`cpp
int subtree_size[N];
void dfs(int node, int par) {
    subtree_size[node] = 1;
    for(int child : g[node]) {
        if(child == par) continue;
        dfs(child, node);
        subtree_size[node] += subtree_size[child];
    }
}
\`\`\`

### 🟡 Level 3: BFS on Trees (Level Order)
\`\`\`cpp
void bfs(int root) {
    queue<int> q;
    q.push(root);
    vis[root] = true;
    
    while(!q.empty()) {
        int sz = q.size(); // Nodes at current level
        while(sz--) {
            int node = q.front(); q.pop();
            cout << node << " ";
            
            for(int child : g[node]) {
                if(!vis[child]) {
                    vis[child] = true;
                    q.push(child);
                }
            }
        }
        cout << "\\n"; // New level
    }
}
\`\`\`

## 🎯 Practice Problems

| Problem | Platform | Topic |
|---------|----------|-------|
| [Binary Tree Inorder Traversal](https://leetcode.com/problems/binary-tree-inorder-traversal/) | LeetCode | DFS |
| [Binary Tree Level Order](https://leetcode.com/problems/binary-tree-level-order-traversal/) | LeetCode | BFS |
| [Maximum Depth](https://leetcode.com/problems/maximum-depth-of-binary-tree/) | LeetCode | Height |
| [Subordinates](https://cses.fi/problemset/task/1674) | CSES | Subtree Size |
`,

    "2. Lowest Common Ancestor (LCA)": `

---

## 📚 LCA Algorithms

### 🟡 Method 1: Parent Array (Simple)
\`\`\`cpp
int parent[N], depth[N];

void dfs(int node, int par) {
    parent[node] = par;
    for(int child : g[node]) {
        if(child == par) continue;
        depth[child] = depth[node] + 1;
        dfs(child, node);
    }
}

int lca(int a, int b) {
    // Bring to same depth
    while(depth[a] > depth[b]) a = parent[a];
    while(depth[b] > depth[a]) b = parent[b];
    
    // Move up together
    while(a != b) {
        a = parent[a];
        b = parent[b];
    }
    return a;
}
\`\`\`

### 🔴 Method 2: Binary Lifting (O(log n) per query)
\`\`\`cpp
int up[N][20]; // up[v][j] = 2^j ancestor of v

void preprocess(int node, int par) {
    up[node][0] = par;
    for(int j = 1; j < 20; j++)
        if(up[node][j-1] != -1)
            up[node][j] = up[up[node][j-1]][j-1];
    
    for(int child : g[node])
        if(child != par) preprocess(child, node);
}

int lca(int a, int b) {
    if(depth[a] < depth[b]) swap(a, b);
    int diff = depth[a] - depth[b];
    
    for(int j = 0; j < 20; j++)
        if((diff >> j) & 1) a = up[a][j];
    
    if(a == b) return a;
    
    for(int j = 19; j >= 0; j--)
        if(up[a][j] != up[b][j]) {
            a = up[a][j];
            b = up[b][j];
        }
    return up[a][0];
}
\`\`\`

## 🎯 Practice Problems

| Problem | Platform | Type |
|---------|----------|------|
| [LCA of Binary Tree](https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/) | LeetCode | Basic |
| [LCA of BST](https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/) | LeetCode | BST |
| [Company Queries II](https://cses.fi/problemset/task/1688) | CSES | Binary Lifting |
| [Distance Queries](https://cses.fi/problemset/task/1135) | CSES | LCA + Distance |
`,

    "3. Tree Diameter & Path": `

---

## 📚 Tree Diameter Algorithms

### 🟡 Method 1: Two BFS/DFS
\`\`\`cpp
pair<int,int> bfs_farthest(int start, int n) {
    vector<int> dist(n+1, -1);
    queue<int> q;
    q.push(start);
    dist[start] = 0;
    
    while(!q.empty()) {
        int v = q.front(); q.pop();
        for(int c : g[v]) {
            if(dist[c] == -1) {
                dist[c] = dist[v] + 1;
                q.push(c);
            }
        }
    }
    
    int farthest = start;
    for(int i = 1; i <= n; i++)
        if(dist[i] > dist[farthest]) farthest = i;
    
    return {farthest, dist[farthest]};
}

// Usage:
auto [A, _] = bfs_farthest(1, n);
auto [B, diameter] = bfs_farthest(A, n);
\`\`\`

### 🟡 Method 2: Single DFS (Tree DP)
\`\`\`cpp
int diameter = 0;

int height(int node, int par) {
    int h1 = 0, h2 = 0;
    for(int child : g[node]) {
        if(child == par) continue;
        int h = 1 + height(child, node);
        if(h > h1) { h2 = h1; h1 = h; }
        else if(h > h2) h2 = h;
    }
    diameter = max(diameter, h1 + h2);
    return h1;
}
\`\`\`

## 🎯 Practice Problems

| Problem | Platform | Type |
|---------|----------|------|
| [Diameter of Binary Tree](https://leetcode.com/problems/diameter-of-binary-tree/) | LeetCode | Tree DP |
| [Tree Diameter](https://cses.fi/problemset/task/1131) | CSES | Two BFS |
| [Tree Distances I](https://cses.fi/problemset/task/1132) | CSES | Diameter |
| [Three Paths on Tree](https://codeforces.com/contest/1294/problem/F) | Codeforces | Advanced |
`,

    "4. Tree Dynamic Programming": `

---

## 📚 Tree DP Patterns

### 🟡 Subtree Sum/Value
\`\`\`cpp
int subtree_sum[N];
void dfs(int node, int par) {
    subtree_sum[node] = val[node];
    for(int child : g[node]) {
        if(child == par) continue;
        dfs(child, node);
        subtree_sum[node] += subtree_sum[child];
    }
}
\`\`\`

### 🔴 Rerooting DP (Sum of Distances)
\`\`\`cpp
int subtree_size[N], dist_sum[N];

void dfs1(int node, int par) {
    subtree_size[node] = 1;
    for(int child : g[node]) {
        if(child == par) continue;
        dfs1(child, node);
        subtree_size[node] += subtree_size[child];
        dist_sum[node] += dist_sum[child] + subtree_size[child];
    }
}

void dfs2(int node, int par) {
    for(int child : g[node]) {
        if(child == par) continue;
        dist_sum[child] = dist_sum[node] 
                        - subtree_size[child] 
                        + (n - subtree_size[child]);
        dfs2(child, node);
    }
}
\`\`\`

### 🔴 Max Independent Set
\`\`\`cpp
int dp[N][2]; // dp[node][0/1] = not taken / taken

void dfs(int node, int par) {
    dp[node][0] = 0;
    dp[node][1] = 1; // Include this node
    
    for(int child : g[node]) {
        if(child == par) continue;
        dfs(child, node);
        dp[node][0] += max(dp[child][0], dp[child][1]);
        dp[node][1] += dp[child][0]; // Can't take adjacent
    }
}
// Answer: max(dp[root][0], dp[root][1])
\`\`\`

## 🎯 Practice Problems

| Problem | Platform | Type |
|---------|----------|------|
| [Sum of Distances](https://leetcode.com/problems/sum-of-distances-in-tree/) | LeetCode | Rerooting |
| [House Robber III](https://leetcode.com/problems/house-robber-iii/) | LeetCode | Max Independent Set |
| [Tree Distances II](https://cses.fi/problemset/task/1133) | CSES | Rerooting |
| [Maximum Path Sum](https://leetcode.com/problems/binary-tree-maximum-path-sum/) | LeetCode | Path DP |
`,

    // ==========================================
    // DP MODULE - Level 14-18 Content
    // ==========================================

    "4. Digit DP & Bitmask DP": `

---

## 📚 Bitmask DP Patterns

### 🔴 TSP (Traveling Salesman)
\`\`\`cpp
int dp[1<<N][N];

int tsp(int mask, int pos) {
    if(mask == (1<<n)-1) return cost[pos][0];
    if(dp[mask][pos] != -1) return dp[mask][pos];
    
    int ans = INF;
    for(int city = 0; city < n; city++) {
        if(!(mask & (1<<city))) {
            ans = min(ans, cost[pos][city] + tsp(mask | (1<<city), city));
        }
    }
    return dp[mask][pos] = ans;
}
\`\`\`

### 🔴 SOS DP (Sum Over Subsets)
\`\`\`cpp
// g[mask] = sum of f[submask] for all submasks of mask
for(int i = 0; i < n; i++) {
    for(int mask = 0; mask < (1<<n); mask++) {
        if(mask & (1<<i))
            g[mask] += g[mask ^ (1<<i)];
    }
}
\`\`\`

## 🎯 Practice Problems

| Problem | Platform | Type |
|---------|----------|------|
| [Hamiltonian Flights](https://cses.fi/problemset/task/1690) | CSES | TSP |
| [Shortest Superstring](https://leetcode.com/problems/find-the-shortest-superstring/) | LeetCode | Bitmask |
| [Matching](https://atcoder.jp/contests/dp/tasks/dp_o) | AtCoder | Bitmask |
| [Compatible Numbers](https://codeforces.com/contest/165/problem/E) | Codeforces | SOS DP |
`,

    "5. DP Optimizations (CHT, SOS)": `

---

## 📚 Advanced DP Optimization Techniques

### 🔴 Meet in the Middle
Split large search space into two halves, process separately, then merge.

\`\`\`cpp
// Subset Sum with n=40 → split into two halves of 20
vector<ll> left_sums, right_sums;

for(int mask = 0; mask < (1<<n1); mask++) {
    ll sum = 0;
    for(int i = 0; i < n1; i++)
        if(mask & (1<<i)) sum += a[i];
    left_sums.push_back(sum);
}

// Similarly for right half
sort(right_sums.begin(), right_sums.end());

// For each left sum, binary search complement in right
for(ll s : left_sums) {
    if(binary_search(right_sums.begin(), right_sums.end(), X - s))
        return true;
}
\`\`\`

### 🔴 Convex Hull Trick (CHT)
For DP of form: dp[i] = min(m[j] * x[i] + b[j])

\`\`\`cpp
struct Line {
    ll m, b;
    ll eval(ll x) { return m * x + b; }
};

deque<Line> hull;

bool bad(Line l1, Line l2, Line l3) {
    return (l3.b - l1.b) * (l1.m - l2.m) <= (l2.b - l1.b) * (l1.m - l3.m);
}

void addLine(Line l) {
    while(hull.size() >= 2 && bad(hull[hull.size()-2], hull.back(), l))
        hull.pop_back();
    hull.push_back(l);
}

ll query(ll x) {
    while(hull.size() >= 2 && hull[0].eval(x) >= hull[1].eval(x))
        hull.pop_front();
    return hull[0].eval(x);
}
\`\`\`

## 🎯 Practice Problems

| Problem | Platform | Type |
|---------|----------|------|
| [ABC 184 F](https://atcoder.jp/contests/abc184/tasks/abc184_f) | AtCoder | Meet in Middle |
| [Subset Sum II](https://cses.fi/problemset/task/1628) | CSES | Meet in Middle |
| [Covered Walkway](https://open.kattis.com/problems/coveredwalkway) | Kattis | CHT |
| [Kalila and Dimna](https://codeforces.com/contest/319/problem/C) | Codeforces | CHT |
`
};

async function updateTopics() {
    try {
        console.log('📚 Starting Graph/Tree/DP content update...\n');

        for (const [topicTitle, extraContent] of Object.entries(contentAdditions)) {
            // Get current content
            const res = await pool.query(
                'SELECT topic_id, content FROM cp_topics WHERE title = $1',
                [topicTitle]
            );

            if (res.rowCount > 0) {
                const currentContent = res.rows[0].content;
                const newContent = currentContent + '\n' + extraContent;

                await pool.query(
                    'UPDATE cp_topics SET content = $1 WHERE title = $2',
                    [newContent, topicTitle]
                );
                console.log('✅ Updated: ' + topicTitle);
            } else {
                console.log('⚠️ Topic not found: ' + topicTitle);
            }
        }

        console.log('\n🎉 All topics updated successfully!');
    } catch (err) {
        console.error('❌ Error:', err.message);
    } finally {
        await pool.end();
    }
}

updateTopics();
