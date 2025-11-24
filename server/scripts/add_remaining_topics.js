const pool = require('../db');

async function addRemainingTopics() {
    const client = await pool.connect();
    try {
        console.log('🚀 Adding Remaining Critical Topics...\n');

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

        // Arrays Module - Prefix Sum
        let order = await getNextOrder(moduleMap['3. Arrays & Vectors']);
        await client.query(
            "INSERT INTO dsa_topics (module_id, title, content, order_index) VALUES ($1, $2, $3, $4)",
            [moduleMap['3. Arrays & Vectors'], 'Prefix Sum & Difference Array', `
# Prefix Sum Technique

## What is Prefix Sum?
Store cumulative sums to answer range sum queries in O(1).

\`\`\`cpp
vector<int> arr = {2, 4, 1, 5, 3};
vector<int> prefix(arr.size() + 1, 0);

for (int i = 0; i < arr.size(); i++) {
    prefix[i + 1] = prefix[i] + arr[i];
}

// Sum from index L to R
int rangeSum(int L, int R) {
    return prefix[R + 1] - prefix[L];
}
\`\`\`

## 2D Prefix Sum
\`\`\`cpp
vector<vector<int>> prefix(n + 1, vector<int>(m + 1, 0));
for (int i = 1; i <= n; i++) {
    for (int j = 1; j <= m; j++) {
        prefix[i][j] = matrix[i-1][j-1] 
                     + prefix[i-1][j] 
                     + prefix[i][j-1] 
                     - prefix[i-1][j-1];
    }
}
\`\`\`
`, order]);
        count++;

        // Linked Lists - Fast & Slow Pointers
        order = await getNextOrder(moduleMap['8. Linked Lists']);
        await client.query(
            "INSERT INTO dsa_topics (module_id, title, content, order_index) VALUES ($1, $2, $3, $4)",
            [moduleMap['8. Linked Lists'], 'Fast & Slow Pointers (Cycle Detection)', `
# Fast & Slow Pointers (Floyd's Algorithm)

## Detect Cycle
\`\`\`cpp
bool hasCycle(ListNode* head) {
    ListNode *slow = head, *fast = head;
    
    while (fast && fast->next) {
        slow = slow->next;
        fast = fast->next->next;
        if (slow == fast) return true;
    }
    return false;
}
\`\`\`

## Find Cycle Start
\`\`\`cpp
ListNode* detectCycle(ListNode* head) {
    ListNode *slow = head, *fast = head;
    
    while (fast && fast->next) {
        slow = slow->next;
        fast = fast->next->next;
        if (slow == fast) {
            slow = head;
            while (slow != fast) {
                slow = slow->next;
                fast = fast->next;
            }
            return slow;
        }
    }
    return nullptr;
}
\`\`\`

## Find Middle Element
\`\`\`cpp
ListNode* findMiddle(ListNode* head) {
    ListNode *slow = head, *fast = head;
    while (fast && fast->next) {
        slow = slow->next;
        fast = fast->next->next;
    }
    return slow;
}
\`\`\`
`, order]);
        count++;

        // Stacks - Monotonic Stack
        order = await getNextOrder(moduleMap['9. Stacks & Queues']);
        await client.query(
            "INSERT INTO dsa_topics (module_id, title, content, order_index) VALUES ($1, $2, $3, $4)",
            [moduleMap['9. Stacks & Queues'], 'Monotonic Stack Pattern', `
# Monotonic Stack

## Next Greater Element
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

## Next Smaller Element
Use same logic with > instead of <

## Applications
- Stock span problem
- Largest rectangle in histogram
- Trapping rain water
`, order]);
        count++;

        // Trees - LCA
        order = await getNextOrder(moduleMap['10. Binary Trees & BST']);
        await client.query(
            "INSERT INTO dsa_topics (module_id, title, content, order_index) VALUES ($1, $2, $3, $4)",
            [moduleMap['10. Binary Trees & BST'], 'Lowest Common Ancestor (LCA)', `
# Lowest Common Ancestor

\`\`\`cpp
TreeNode* lowestCommonAncestor(TreeNode* root, TreeNode* p, TreeNode* q) {
    if (!root || root == p || root == q) return root;
    
    TreeNode* left = lowestCommonAncestor(root->left, p, q);
    TreeNode* right = lowestCommonAncestor(root->right, p, q);
    
    if (left && right) return root;
    return left ? left : right;
}
\`\`\`

## For BST (Optimized)
\`\`\`cpp
TreeNode* lowestCommonAncestor(TreeNode* root, TreeNode* p, TreeNode* q) {
    if (p->val < root->val && q->val < root->val)
        return lowestCommonAncestor(root->left, p, q);
    if (p->val > root->val && q->val > root->val)
        return lowestCommonAncestor(root->right, p, q);
    return root;
}
\`\`\`
`, order]);
        count++;

        // Heaps - Top K Elements
        order = await getNextOrder(moduleMap['11. Heaps & Priority Queues']);
        await client.query(
            "INSERT INTO dsa_topics (module_id, title, content, order_index) VALUES ($1, $2, $3, $4)",
            [moduleMap['11. Heaps & Priority Queues'], 'Top K Elements Pattern', `
# Top K Elements

## Kth Largest Element
\`\`\`cpp
int findKthLargest(vector<int>& nums, int k) {
    priority_queue<int, vector<int>, greater<int>> minHeap;
    
    for (int num : nums) {
        minHeap.push(num);
        if (minHeap.size() > k) minHeap.pop();
    }
    return minHeap.top();
}
\`\`\`

## Top K Frequent Elements
\`\`\`cpp
vector<int> topKFrequent(vector<int>& nums, int k) {
    unordered_map<int, int> freq;
    for (int num : nums) freq[num]++;
    
    auto cmp = [](pair<int,int> a, pair<int,int> b) { return a.second > b.second; };
    priority_queue<pair<int,int>, vector<pair<int,int>>, decltype(cmp)> pq(cmp);
    
    for (auto& p : freq) {
        pq.push(p);
        if (pq.size() > k) pq.pop();
    }
    
    vector<int> result;
    while (!pq.empty()) {
        result.push_back(pq.top().first);
        pq.pop();
    }
    return result;
}
\`\`\`
`, order]);
        count++;

        // Strings - Trie
        order = await getNextOrder(moduleMap['5. Strings']);
        await client.query(
            "INSERT INTO dsa_topics (module_id, title, content, order_index) VALUES ($1, $2, $3, $4)",
            [moduleMap['5. Strings'], 'Trie (Prefix Tree)', `
# Trie Data Structure

\`\`\`cpp
class TrieNode {
public:
    unordered_map<char, TrieNode*> children;
    bool isEnd;
    TrieNode() : isEnd(false) {}
};

class Trie {
    TrieNode* root;
public:
    Trie() { root = new TrieNode(); }
    
    void insert(string word) {
        TrieNode* node = root;
        for (char c : word) {
            if (!node->children[c]) {
                node->children[c] = new TrieNode();
            }
            node = node->children[c];
        }
        node->isEnd = true;
    }
    
    bool search(string word) {
        TrieNode* node = root;
        for (char c : word) {
            if (!node->children[c]) return false;
            node = node->children[c];
        }
        return node->isEnd;
    }
    
    bool startsWith(string prefix) {
        TrieNode* node = root;
        for (char c : prefix) {
            if (!node->children[c]) return false;
            node = node->children[c];
        }
        return true;
    }
};
\`\`\`

## Applications
- Autocomplete
- Spell checker
- IP routing
- Word search
`, order]);
        count++;

        // DP - LCS
        order = await getNextOrder(moduleMap['13. Dynamic Programming']);
        await client.query(
            "INSERT INTO dsa_topics (module_id, title, content, order_index) VALUES ($1, $2, $3, $4)",
            [moduleMap['13. Dynamic Programming'], 'Longest Common Subsequence (LCS)', `
# Longest Common Subsequence

\`\`\`cpp
int longestCommonSubsequence(string s1, string s2) {
    int m = s1.size(), n = s2.size();
    vector<vector<int>> dp(m + 1, vector<int>(n + 1, 0));
    
    for (int i = 1; i <= m; i++) {
        for (int j = 1; j <= n; j++) {
            if (s1[i-1] == s2[j-1]) {
                dp[i][j] = 1 + dp[i-1][j-1];
            } else {
                dp[i][j] = max(dp[i-1][j], dp[i][j-1]);
            }
        }
    }
    return dp[m][n];
}
\`\`\`

## Print LCS
\`\`\`cpp
string printLCS(string s1, string s2) {
    int m = s1.size(), n = s2.size();
    vector<vector<int>> dp(m + 1, vector<int>(n + 1, 0));
    
    for (int i = 1; i <= m; i++) {
        for (int j = 1; j <= n; j++) {
            if (s1[i-1] == s2[j-1]) {
                dp[i][j] = 1 + dp[i-1][j-1];
            } else {
                dp[i][j] = max(dp[i-1][j], dp[i][j-1]);
            }
        }
    }
    
    string lcs;
    int i = m, j = n;
    while (i > 0 && j > 0) {
        if (s1[i-1] == s2[j-1]) {
            lcs = s1[i-1] + lcs;
            i--; j--;
        } else if (dp[i-1][j] > dp[i][j-1]) {
            i--;
        } else {
            j--;
        }
    }
    return lcs;
}
\`\`\`
`, order]);
        count++;

        // DP - Edit Distance
        await client.query(
            "INSERT INTO dsa_topics (module_id, title, content, order_index) VALUES ($1, $2, $3, $4)",
            [moduleMap['13. Dynamic Programming'], 'Edit Distance', `
# Edit Distance (Levenshtein Distance)

Minimum operations (insert, delete, replace) to convert s1 to s2.

\`\`\`cpp
int minDistance(string s1, string s2) {
    int m = s1.size(), n = s2.size();
    vector<vector<int>> dp(m + 1, vector<int>(n + 1));
    
    for (int i = 0; i <= m; i++) dp[i][0] = i;
    for (int j = 0; j <= n; j++) dp[0][j] = j;
    
    for (int i = 1; i <= m; i++) {
        for (int j = 1; j <= n; j++) {
            if (s1[i-1] == s2[j-1]) {
                dp[i][j] = dp[i-1][j-1];
            } else {
                dp[i][j] = 1 + min({
                    dp[i-1][j],      // delete
                    dp[i][j-1],      // insert
                    dp[i-1][j-1]     // replace
                });
            }
        }
    }
    return dp[m][n];
}
\`\`\`
`, order + 1]);
        count++;

        // DP - 0/1 Knapsack
        await client.query(
            "INSERT INTO dsa_topics (module_id, title, content, order_index) VALUES ($1, $2, $3, $4)",
            [moduleMap['13. Dynamic Programming'], '0/1 Knapsack & Variations', `
# 0/1 Knapsack

\`\`\`cpp
int knapsack(vector<int>& wt, vector<int>& val, int W) {
    int n = wt.size();
    vector<vector<int>> dp(n + 1, vector<int>(W + 1, 0));
    
    for (int i = 1; i <= n; i++) {
        for (int w = 0; w <= W; w++) {
            if (wt[i-1] <= w) {
                dp[i][w] = max(dp[i-1][w], val[i-1] + dp[i-1][w - wt[i-1]]);
            } else {
                dp[i][w] = dp[i-1][w];
            }
        }
    }
    return dp[n][W];
}
\`\`\`

## Space Optimized
\`\`\`cpp
int knapsack(vector<int>& wt, vector<int>& val, int W) {
    vector<int> dp(W + 1, 0);
    for (int i = 0; i < wt.size(); i++) {
        for (int w = W; w >= wt[i]; w--) {
            dp[w] = max(dp[w], val[i] + dp[w - wt[i]]);
        }
    }
    return dp[W];
}
\`\`\`

## Subset Sum
\`\`\`cpp
bool subsetSum(vector<int>& nums, int target) {
    vector<bool> dp(target + 1, false);
    dp[0] = true;
    for (int num : nums) {
        for (int i = target; i >= num; i--) {
            dp[i] = dp[i] || dp[i - num];
        }
    }
    return dp[target];
}
\`\`\`
`, order + 2]);
        count++;

        // Graphs - BFS Applications
        order = await getNextOrder(moduleMap['12. Graphs']);
        await client.query(
            "INSERT INTO dsa_topics (module_id, title, content, order_index) VALUES ($1, $2, $3, $4)",
            [moduleMap['12. Graphs'], 'BFS Applications & Variations', `
# BFS Applications

## Multi-Source BFS
\`\`\`cpp
int shortestPath(vector<vector<int>>& grid) {
    queue<pair<int,int>> q;
    // Add all sources
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < m; j++) {
            if (grid[i][j] == SOURCE) {
                q.push({i, j});
            }
        }
    }
    
    int level = 0;
    while (!q.empty()) {
        int size = q.size();
        for (int i = 0; i < size; i++) {
            auto [x, y] = q.front();
            q.pop();
            // Process neighbors
        }
        level++;
    }
}
\`\`\`

## 0-1 BFS (Using Deque)
\`\`\`cpp
int shortestPath01(vector<vector<pair<int,int>>>& adj, int n) {
    vector<int> dist(n, INT_MAX);
    deque<int> dq;
    dist[0] = 0;
    dq.push_front(0);
    
    while (!dq.empty()) {
        int u = dq.front();
        dq.pop_front();
        
        for (auto [v, weight] : adj[u]) {
            if (dist[u] + weight < dist[v]) {
                dist[v] = dist[u] + weight;
                if (weight == 0) dq.push_front(v);
                else dq.push_back(v);
            }
        }
    }
    return dist[n-1];
}
\`\`\`
`, order]);
        count++;

        // Graphs - DFS Applications
        await client.query(
            "INSERT INTO dsa_topics (module_id, title, content, order_index) VALUES ($1, $2, $3, $4)",
            [moduleMap['12. Graphs'], 'DFS Applications (Cycle, Components, Paths)', `
# DFS Applications

## Detect Cycle in Directed Graph
\`\`\`cpp
bool hasCycleDFS(int u, vector<vector<int>>& adj, vector<int>& color) {
    color[u] = 1; // Gray (visiting)
    
    for (int v : adj[u]) {
        if (color[v] == 1) return true; // Back edge
        if (color[v] == 0 && hasCycleDFS(v, adj, color)) return true;
    }
    
    color[u] = 2; // Black (visited)
    return false;
}
\`\`\`

## Count Connected Components
\`\`\`cpp
void dfs(int u, vector<vector<int>>& adj, vector<bool>& visited) {
    visited[u] = true;
    for (int v : adj[u]) {
        if (!visited[v]) dfs(v, adj, visited);
    }
}

int countComponents(int n, vector<vector<int>>& adj) {
    vector<bool> visited(n, false);
    int count = 0;
    for (int i = 0; i < n; i++) {
        if (!visited[i]) {
            dfs(i, adj, visited);
            count++;
        }
    }
    return count;
}
\`\`\`

## All Paths from Source to Target
\`\`\`cpp
void dfs(int u, int target, vector<vector<int>>& adj, vector<int>& path, vector<vector<int>>& result) {
    path.push_back(u);
    if (u == target) {
        result.push_back(path);
    } else {
        for (int v : adj[u]) {
            dfs(v, target, adj, path, result);
        }
    }
    path.pop_back();
}
\`\`\`
`, order + 1]);
        count++;

        console.log(`\n✅ Added ${count} critical topics!`);
        console.log('Topics added:');
        console.log('  - Prefix Sum & Difference Array');
        console.log('  - Fast & Slow Pointers');
        console.log('  - Monotonic Stack Pattern');
        console.log('  - LCA');
        console.log('  - Top K Elements Pattern');
        console.log('  - Trie (Prefix Tree)');
        console.log('  - LCS');
        console.log('  - Edit Distance');
        console.log('  - 0/1 Knapsack & Variations');
        console.log('  - BFS Applications & Variations');
        console.log('  - DFS Applications');

    } catch (err) {
        console.error('Error:', err);
    } finally {
        client.release();
        await pool.end();
    }
}

addRemainingTopics();
