const pool = require('../db');

async function addAdvancedTopics() {
    const client = await pool.connect();
    try {
        console.log('🚀 Adding Advanced DSA Topics...\n');

        // Get module IDs
        const modules = await client.query("SELECT module_id, title FROM dsa_modules");
        const moduleMap = {};
        modules.rows.forEach(m => {
            moduleMap[m.title] = m.module_id;
        });

        const getProbId = async (titlePart) => {
            const res = await client.query("SELECT problem_id FROM problems WHERE title ILIKE $1 LIMIT 1", [`%${titlePart}%`]);
            return res.rows[0]?.problem_id || null;
        };

        // Get max order for each module
        const getNextOrder = async (moduleId) => {
            const res = await client.query(
                "SELECT COALESCE(MAX(order_index), 0) + 1 as next_order FROM dsa_topics WHERE module_id = $1",
                [moduleId]
            );
            return res.rows[0].next_order;
        };

        // === GRAPH ADVANCED TOPICS ===
        const graphModuleId = moduleMap['12. Graphs'];
        let graphOrder = await getNextOrder(graphModuleId);

        // Dijkstra's Algorithm
        await client.query(
            "INSERT INTO dsa_topics (module_id, title, content, problem_id, order_index) VALUES ($1, $2, $3, $4, $5)",
            [graphModuleId, 'Dijkstra\'s Algorithm', `
# Dijkstra's Algorithm (Shortest Path)

Dijkstra's algorithm finds the shortest path from a source vertex to all other vertices in a weighted graph with **non-negative** edge weights.

## Algorithm Overview
1. Initialize distances: dist[source] = 0, all others = ∞
2. Use a min-heap (priority queue) to always process the nearest unvisited vertex
3. Relax edges: If a shorter path is found, update distance
4. Repeat until all vertices are processed

## Implementation
\`\`\`cpp
vector<int> dijkstra(int n, int source, vector<vector<pair<int, int>>>& adj) {
    // adj[u] = {(v, weight), ...}
    vector<int> dist(n, INT_MAX);
    priority_queue<pair<int, int>, vector<pair<int, int>>, greater<>> pq;
    
    dist[source] = 0;
    pq.push({0, source});  // {distance, vertex}
    
    while (!pq.empty()) {
        auto [d, u] = pq.top();
        pq.pop();
        
        if (d > dist[u]) continue;  // Already processed with shorter path
        
        for (auto [v, weight] : adj[u]) {
            if (dist[u] + weight < dist[v]) {
                dist[v] = dist[u] + weight;
                pq.push({dist[v], v});
            }
        }
    }
    return dist;
}
\`\`\`

## Time Complexity
- **O((V + E) log V)** using min-heap (priority queue)
- **O(V²)** using simple array

## Space Complexity
- **O(V + E)** for adjacency list and priority queue

## Key Points
- **Greedy algorithm**: Always picks the closest unvisited vertex
- **Doesn't work with negative weights**: Use Bellman-Ford instead
- Can reconstruct path by keeping parent array

## Path Reconstruction
\`\`\`cpp
vector<int> getPath(int source, int target, vector<int>& parent) {
    vector<int> path;
    for (int v = target; v != -1; v = parent[v]) {
        path.push_back(v);
    }
    reverse(path.begin(), path.end());
    return path;
}
\`\`\`

## Tips & Tricks
- Use \`pair<int, int>\` as {distance, vertex} in priority queue
- Check \`if (d > dist[u]) continue\` to skip outdated entries
- For path reconstruction, maintain \`parent[v]\` array
- Works on both directed and undirected graphs
            `, null, graphOrder++]
        );

        // MST - Prim's & Kruskal's
        await client.query(
            "INSERT INTO dsa_topics (module_id, title, content, problem_id, order_index) VALUES ($1, $2, $3, $4, $5)",
            [graphModuleId, 'Minimum Spanning Tree (MST)', `
# Minimum Spanning Tree (MST)

An MST is a subset of edges that connects all vertices with minimum total weight and no cycles.

## Prim's Algorithm (Similar to Dijkstra)

### Approach
Start from any vertex and greedily add the minimum weight edge that connects the tree to a new vertex.

\`\`\`cpp
int primMST(int n, vector<vector<pair<int, int>>>& adj) {
    // adj[u] = {(v, weight), ...}
    vector<bool> inMST(n, false);
    priority_queue<pair<int, int>, vector<pair<int, int>>, greater<>> pq;
    
    int mstWeight = 0;
    pq.push({0, 0});  // {weight, vertex}
    
    while (!pq.empty()) {
        auto [weight, u] = pq.top();
        pq.pop();
        
        if (inMST[u]) continue;
        
        inMST[u] = true;
        mstWeight += weight;
        
        for (auto [v, w] : adj[u]) {
            if (!inMST[v]) {
                pq.push({w, v});
            }
        }
    }
    return mstWeight;
}
\`\`\`

**Time Complexity**: O((V + E) log V)

## Kruskal's Algorithm (Uses DSU)

### Approach
Sort all edges by weight. Add edges one by one if they don't form a cycle (use DSU).

\`\`\`cpp
struct Edge {
    int u, v, weight;
    bool operator<(const Edge& other) const {
        return weight < other.weight;
    }
};

class DSU {
    vector<int> parent, rank;
public:
    DSU(int n) : parent(n), rank(n, 0) {
        iota(parent.begin(), parent.end(), 0);
    }
    
    int find(int x) {
        if (parent[x] != x) parent[x] = find(parent[x]);
        return parent[x];
    }
    
    bool unite(int x, int y) {
        int px = find(x), py = find(y);
        if (px == py) return false;
        
        if (rank[px] < rank[py]) swap(px, py);
        parent[py] = px;
        if (rank[px] == rank[py]) rank[px]++;
        return true;
    }
};

int kruskalMST(int n, vector<Edge>& edges) {
    sort(edges.begin(), edges.end());
    DSU dsu(n);
    
    int mstWeight = 0;
    for (auto& e : edges) {
        if (dsu.unite(e.u, e.v)) {
            mstWeight += e.weight;
        }
    }
    return mstWeight;
}
\`\`\`

**Time Complexity**: O(E log E) due to sorting

## When to Use Which?
- **Prim's**: Dense graphs (many edges), adjacency matrix
- **Kruskal's**: Sparse graphs (few edges), edge list

## Tips & Tricks
- MST has exactly V-1 edges
- Total MST edges picked = n - 1
- Both algorithms work on undirected weighted graphs
- For Kruskal's, sort edges first
            `, null, graphOrder++]
        );

        // Topological Sort
        await client.query(
            "INSERT INTO dsa_topics (module_id, title, content, problem_id, order_index) VALUES ($1, $2, $3, $4, $5)",
            [graphModuleId, 'Topological Sort', `
# Topological Sort

A linear ordering of vertices in a Directed Acyclic Graph (DAG) such that for every edge u → v, u comes before v.

## Use Cases
- Course prerequisites
- Task scheduling
- Build systems (dependencies)

## Method 1: DFS-based
\`\`\`cpp
void dfs(int u, vector<vector<int>>& adj, vector<bool>& visited, stack<int>& st) {
    visited[u] = true;
    
    for (int v : adj[u]) {
        if (!visited[v]) {
            dfs(v, adj, visited, st);
        }
    }
    st.push(u);  // Add to stack AFTER visiting all neighbors
}

vector<int> topologicalSort(int n, vector<vector<int>>& adj) {
    vector<bool> visited(n, false);
    stack<int> st;
    
    for (int i = 0; i < n; i++) {
        if (!visited[i]) {
            dfs(i, adj, visited, st);
        }
    }
    
    vector<int> result;
    while (!st.empty()) {
        result.push_back(st.top());
        st.pop();
    }
    return result;
}
\`\`\`

## Method 2: Kahn's Algorithm (BFS-based)
\`\`\`cpp
vector<int> topologicalSort(int n, vector<vector<int>>& adj) {
    vector<int> indegree(n, 0);
    
    // Calculate indegrees
    for (int u = 0; u < n; u++) {
        for (int v : adj[u]) {
            indegree[v]++;
        }
    }
    
    queue<int> q;
    for (int i = 0; i < n; i++) {
        if (indegree[i] == 0) {
            q.push(i);
        }
    }
    
    vector<int> result;
    while (!q.empty()) {
        int u = q.front();
        q.pop();
        result.push_back(u);
        
        for (int v : adj[u]) {
            indegree[v]--;
            if (indegree[v] == 0) {
                q.push(v);
            }
        }
    }
    
    // Check for cycle
    if (result.size() != n) {
        return {};  // Graph has cycle, topological sort not possible
    }
    return result;
}
\`\`\`

## Cycle Detection
If topological sort result has fewer than n vertices, graph contains a cycle.

## Time Complexity
- **O(V + E)** for both methods

## Tips & Tricks
- Only works on **DAGs** (Directed Acyclic Graphs)
- Multiple valid topological orderings possible
- Kahn's can detect cycles (if queue empties before processing all nodes)
- Use for dependency resolution problems
            `, null, graphOrder++]
        );

        // DSU (Disjoint Set Union)
        await client.query(
            "INSERT INTO dsa_topics (module_id, title, content, problem_id, order_index) VALUES ($1, $2, $3, $4, $5)",
            [graphModuleId, 'Disjoint Set Union (DSU/Union-Find)', `
# Disjoint Set Union (Union-Find)

DSU is a data structure that efficiently handles:
1. **Find**: Which set does an element belong to?
2. **Union**: Merge two sets

## Implementation
\`\`\`cpp
class DSU {
    vector<int> parent;
    vector<int> rank;
    
public:
    DSU(int n) {
        parent.resize(n);
        rank.resize(n, 0);
        iota(parent.begin(), parent.end(), 0);  // parent[i] = i
    }
    
    // Find with path compression
    int find(int x) {
        if (parent[x] != x) {
            parent[x] = find(parent[x]);  // Path compression
        }
        return parent[x];
    }
    
    // Union by rank
    bool unite(int x, int y) {
        int px = find(x);
        int py = find(y);
        
        if (px == py) return false;  // Already in same set
        
        // Union by rank
        if (rank[px] < rank[py]) {
            parent[px] = py;
        } else if (rank[px] > rank[py]) {
            parent[py] = px;
        } else {
            parent[py] = px;
            rank[px]++;
        }
        return true;
    }
    
    bool connected(int x, int y) {
        return find(x) == find(y);
    }
};
\`\`\`

## Key Optimizations

### 1. Path Compression
Flatten the tree during find operations.
\`\`\`cpp
int find(int x) {
    if (parent[x] != x) {
        parent[x] = find(parent[x]);  // Compress path
    }
    return parent[x];
}
\`\`\`

### 2. Union by Rank
Attach smaller tree under larger tree.

## Time Complexity
- **Find**: O(α(n)) ≈ O(1) amortized (inverse Ackermann function)
- **Union**: O(α(n)) ≈ O(1) amortized

## Applications

### Check if Graph is Connected
\`\`\`cpp
bool isConnected(int n, vector<pair<int, int>>& edges) {
    DSU dsu(n);
    for (auto [u, v] : edges) {
        dsu.unite(u, v);
    }
    
    int root = dsu.find(0);
    for (int i = 1; i < n; i++) {
        if (dsu.find(i) != root) return false;
    }
    return true;
}
\`\`\`

### Count Connected Components
\`\`\`cpp
int countComponents(int n, vector<pair<int, int>>& edges) {
    DSU dsu(n);
    for (auto [u, v] : edges) {
        dsu.unite(u, v);
    }
    
    unordered_set<int> roots;
    for (int i = 0; i < n; i++) {
        roots.insert(dsu.find(i));
    }
    return roots.size();
}
\`\`\`

### Detect Cycle in Undirected Graph
\`\`\`cpp
bool hasCycle(int n, vector<pair<int, int>>& edges) {
    DSU dsu(n);
    for (auto [u, v] : edges) {
        if (!dsu.unite(u, v)) {
            return true;  // u and v already connected → cycle!
        }
    }
    return false;
}
\`\`\`

## Advanced: Size Tracking
\`\`\`cpp
class DSU {
    vector<int> parent, size;
public:
    DSU(int n) : parent(n), size(n, 1) {
        iota(parent.begin(), parent.end(), 0);
    }
    
    int find(int x) {
        if (parent[x] != x) parent[x] = find(parent[x]);
        return parent[x];
    }
    
    bool unite(int x, int y) {
        int px = find(x), py = find(y);
        if (px == py) return false;
        
        if (size[px] < size[py]) swap(px, py);
        parent[py] = px;
        size[px] += size[py];
        return true;
    }
    
    int getSize(int x) {
        return size[find(x)];
    }
};
\`\`\`

## Tips & Tricks
- Always use path compression + union by rank
- For Kruskal's MST, DSU is essential
- Can track component sizes
- Almost constant time operations (α(n) ≈ 4 for practical sizes)
- Remember: parent[i] = i for isolated nodes

## Common Use Cases
- Kruskal's MST algorithm
- Cycle detection in undirected graphs
- Dynamic connectivity queries
- Network connectivity
- Image segmentation (finding connected pixels)
            `, null, graphOrder++]
        );

        console.log('✅ Added 4 advanced Graph topics');

        // === TREE ENHANCEMENTS ===
        const treeModuleId = moduleMap['10. Binary Trees & BST'];
        let treeOrder = await getNextOrder(treeModuleId);

        await client.query(
            "INSERT INTO dsa_topics (module_id, title, content, problem_id, order_index) VALUES ($1, $2, $3, $4, $5)",
            [treeModuleId, 'Level Order Traversal (BFS)', `
# Level Order Traversal

Traverse tree level by level from left to right.

## Implementation
\`\`\`cpp
vector<vector<int>> levelOrder(TreeNode* root) {
    vector<vector<int>> result;
    if (!root) return result;
    
    queue<TreeNode*> q;
    q.push(root);
    
    while (!q.empty()) {
        int levelSize = q.size();
        vector<int> currentLevel;
        
        for (int i = 0; i < levelSize; i++) {
            TreeNode* node = q.front();
            q.pop();
            currentLevel.push_back(node->val);
            
            if (node->left) q.push(node->left);
            if (node->right) q.push(node->right);
        }
        result.push_back(currentLevel);
    }
    return result;
}
\`\`\`

## Applications
- Print tree by levels
- Find minimum depth
- Binary tree right side view
- Zigzag level order

## Time Complexity: O(n)
## Space Complexity: O(w) where w is max width
            `, null, treeOrder++]
        );

        console.log('✅ Added Tree topic');

        // === STRING ENHANCEMENTS ===
        const stringModuleId = moduleMap['5. Strings'];
        let stringOrder = await getNextOrder(stringModuleId);

        await client.query(
            "INSERT INTO dsa_topics (module_id, title, content, problem_id, order_index) VALUES ($1, $2, $3, $4, $5)",
            [stringModuleId, 'Pattern Matching - KMP Algorithm', `
# KMP (Knuth-Morris-Pratt) Algorithm

Efficiently find pattern in text in O(n + m) time.

## Preprocessing: Build LPS Array
LPS[i] = Longest Proper Prefix which is also Suffix

\`\`\`cpp
vector<int> computeLPS(string pattern) {
    int m = pattern.size();
    vector<int> lps(m, 0);
    int len = 0;
    
    for (int i = 1; i < m; i++) {
        while (len > 0 && pattern[i] != pattern[len]) {
            len = lps[len - 1];
        }
        if (pattern[i] == pattern[len]) {
            len++;
        }
        lps[i] = len;
    }
    return lps;
}
\`\`\`

## KMP Search
\`\`\`cpp
vector<int> KMP(string text, string pattern) {
    vector<int> lps = computeLPS(pattern);
    vector<int> matches;
    
    int n = text.size(), m = pattern.size();
    int i = 0, j = 0;
    
    while (i < n) {
        if (text[i] == pattern[j]) {
            i++;
            j++;
        }
        
        if (j == m) {
            matches.push_back(i - j);
            j = lps[j - 1];
        } else if (i < n && text[i] != pattern[j]) {
            if (j != 0) {
                j = lps[j - 1];
            } else {
                i++;
            }
        }
    }
    return matches;
}
\`\`\`

## Time Complexity
- Preprocessing: O(m)
- Search: O(n)
- **Total: O(n + m)**

## Use Cases
- Pattern matching
- DNA sequence analysis
- Text editors (find feature)
            `, null, stringOrder++]
        );

        console.log('✅ Added String topic');

        console.log('\n🎉 Advanced Topics Addition Complete!');
        console.log('   Graphs: +4 topics (Dijkstra, MST, Topological Sort, DSU)');
        console.log('   Trees: +1 topic (Level Order)');
        console.log('   Strings: +1 topic (KMP)');

    } catch (err) {
        console.error('Error:', err);
    } finally {
        client.release();
        await pool.end();
    }
}

addAdvancedTopics();
