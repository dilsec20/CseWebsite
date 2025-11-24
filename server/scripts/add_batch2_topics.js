const pool = require('../db');

async function addBatch2() {
    const client = await pool.connect();
    try {
        console.log('🚀 Adding Batch 2 Topics...\n');

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

        // Number Theory - Fast Exponentiation
        let order = await getNextOrder(moduleMap['15. Number Theory & Math']);
        await client.query(
            "INSERT INTO dsa_topics (module_id, title, content, order_index) VALUES ($1, $2, $3, $4)",
            [moduleMap['15. Number Theory & Math'], 'Fast Exponentiation & Binary Exponentiation', `
# Fast Exponentiation (Binary Exponentiation)

Compute a^n in O(log n) instead of O(n).

\`\`\`cpp
long long power(long long a, long long n) {
    long long result = 1;
    while (n > 0) {
        if (n & 1) result *= a;
        a *= a;
        n >>= 1;
    }
    return result;
}
\`\`\`

## With Modulo
\`\`\`cpp
long long powerMod(long long a, long long n, long long mod) {
    long long result = 1;
    a %= mod;
    while (n > 0) {
        if (n & 1) result = (result * a) % mod;
        a = (a * a) % mod;
        n >>= 1;
    }
    return result;
}
\`\`\`

## Matrix Exponentiation (for Fibonacci)
\`\`\`cpp
typedef vector<vector<long long>> Matrix;

Matrix multiply(Matrix& A, Matrix& B) {
    int n = A.size();
    Matrix C(n, vector<long long>(n, 0));
    for (int i = 0; i < n; i++)
        for (int j = 0; j < n; j++)
            for (int k = 0; k < n; k++)
                C[i][j] += A[i][k] * B[k][j];
    return C;
}

long long fib(int n) {
    Matrix F = {{1, 1}, {1, 0}};
    Matrix result = {{1, 0}, {0, 1}};
    while (n > 0) {
        if (n & 1) result = multiply(result, F);
        F = multiply(F, F);
        n >>= 1;
    }
    return result[0][1];
}
\`\`\`
`, order]);
        count++;

        // Searching & Sorting - Binary Search Variations
        order = await getNextOrder(moduleMap['6. Searching & Sorting']);
        await client.query(
            "INSERT INTO dsa_topics (module_id, title, content, order_index) VALUES ($1, $2, $3, $4)",
            [moduleMap['6. Searching & Sorting'], 'Binary Search Advanced (Lower/Upper Bound, Rotated Array)', `
# Advanced Binary Search

## Search in Rotated Sorted Array
\`\`\`cpp
int search(vector<int>& nums, int target) {
    int left = 0, right = nums.size() - 1;
    
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (nums[mid] == target) return mid;
        
        if (nums[left] <= nums[mid]) {  // Left half sorted
            if (target >= nums[left] && target < nums[mid])
                right = mid - 1;
            else
                left = mid + 1;
        } else {  // Right half sorted
            if (target > nums[mid] && target <= nums[right])
                left = mid + 1;
            else
                right = mid - 1;
        }
    }
    return -1;
}
\`\`\`

## Binary Search on Answer
\`\`\`cpp
// Find minimum capacity to ship packages within D days
int shipWithinDays(vector<int>& weights, int days) {
    int left = *max_element(weights.begin(), weights.end());
    int right = accumulate(weights.begin(), weights.end(), 0);
    
    auto canShip = [&](int capacity) {
        int daysNeeded = 1, currentLoad = 0;
        for (int w : weights) {
            if (currentLoad + w > capacity) {
                daysNeeded++;
                currentLoad = w;
            } else {
                currentLoad += w;
            }
        }
        return daysNeeded <= days;
    };
    
    while (left < right) {
        int mid = left + (right - left) / 2;
        if (canShip(mid)) {
            right = mid;
        } else {
            left = mid + 1;
        }
    }
    return left;
}
\`\`\`
`, order]);
        count++;

        // Graphs - Bellman-Ford
        order = await getNextOrder(moduleMap['12. Graphs']);
        await client.query(
            "INSERT INTO dsa_topics (module_id, title, content, order_index) VALUES ($1, $2, $3, $4)",
            [moduleMap['12. Graphs'], 'Bellman-Ford Algorithm (Negative Weights)', `
# Bellman-Ford Algorithm

Handles negative edge weights, detects negative cycles.

\`\`\`cpp
struct Edge {
    int u, v, weight;
};

vector<int> bellmanFord(int n, int source, vector<Edge>& edges) {
    vector<int> dist(n, INT_MAX);
    dist[source] = 0;
    
    // Relax all edges n-1 times
    for (int i = 0; i < n - 1; i++) {
        for (auto& e : edges) {
            if (dist[e.u] != INT_MAX && dist[e.u] + e.weight < dist[e.v]) {
                dist[e.v] = dist[e.u] + e.weight;
            }
        }
    }
    
    // Check for negative cycles
    for (auto& e : edges) {
        if (dist[e.u] != INT_MAX && dist[e.u] + e.weight < dist[e.v]) {
            cout << "Negative cycle detected!" << endl;
            return {};
        }
    }
    
    return dist;
}
\`\`\`

**Time**: O(VE)  
**Use when**: Graph has negative weights or need to detect negative cycles
`, order]);
        count++;

        //Graphs - Bipartite Check
        await client.query(
            "INSERT INTO dsa_topics (module_id, title, content, order_index) VALUES ($1, $2, $3, $4)",
            [moduleMap['12. Graphs'], 'Bipartite Graph Detection', `
# Bipartite Graph

A graph whose vertices can be divided into two disjoint sets such that no two vertices within the same set are adjacent.

## Using BFS (2-Coloring)
\`\`\`cpp
bool isBipartite(vector<vector<int>>& adj) {
    int n = adj.size();
    vector<int> color(n, -1);
    
    for (int i = 0; i < n; i++) {
        if (color[i] == -1) {
            queue<int> q;
            q.push(i);
            color[i] = 0;
            
            while (!q.empty()) {
                int u = q.front();
                q.pop();
                
                for (int v : adj[u]) {
                    if (color[v] == -1) {
                        color[v] = 1 - color[u];
                        q.push(v);
                    } else if (color[v] == color[u]) {
                        return false;
                    }
                }
            }
        }
    }
    return true;
}
\`\`\`

**Applications**: Job matching, scheduling problems
`, order + 1]);
        count++;

        // DP - Longest Increasing Subsequence
        order = await getNextOrder(moduleMap['13. Dynamic Programming']);
        await client.query(
            "INSERT INTO dsa_topics (module_id, title, content, order_index) VALUES ($1, $2, $3, $4)",
            [moduleMap['13. Dynamic Programming'], 'Longest Increasing Subsequence (LIS)', `
# Longest Increasing Subsequence

## O(n²) DP Solution
\`\`\`cpp
int lengthOfLIS(vector<int>& nums) {
    int n = nums.size();
    vector<int> dp(n, 1);
    int maxLen = 1;
    
    for (int i = 1; i < n; i++) {
        for (int j = 0; j < i; j++) {
            if (nums[j] < nums[i]) {
                dp[i] = max(dp[i], dp[j] + 1);
            }
        }
        maxLen = max(maxLen, dp[i]);
    }
    return maxLen;
}
\`\`\`

## O(n log n) Binary Search Solution
\`\`\`cpp
int lengthOfLIS(vector<int>& nums) {
    vector<int> tail;
    
    for (int num : nums) {
        auto it = lower_bound(tail.begin(), tail.end(), num);
        if (it == tail.end()) {
            tail.push_back(num);
        } else {
            *it = num;
        }
    }
    return tail.size();
}
\`\`\`

**Variations**: Longest Bitonic Subsequence, Russian Doll Envelopes
`, order]);
        count++;

        // Trees - Serialize/Deserialize
        order = await getNextOrder(moduleMap['10. Binary Trees & BST']);
        await client.query(
            "INSERT INTO dsa_topics (module_id, title, content, order_index) VALUES ($1, $2, $3, $4)",
            [moduleMap['10. Binary Trees & BST'], 'Serialize and Deserialize Binary Tree', `
# Serialize and Deserialize

## Using Preorder Traversal
\`\`\`cpp
class Codec {
public:
    string serialize(TreeNode* root) {
        if (!root) return "null,";
        return to_string(root->val) + "," + 
               serialize(root->left) + 
               serialize(root->right);
    }
    
    TreeNode* deserialize(string data) {
        queue<string> q;
        stringstream ss(data);
        string item;
        while (getline(ss, item, ',')) {
            q.push(item);
        }
        return helper(q);
    }
    
private:
    TreeNode* helper(queue<string>& q) {
        string val = q.front();
        q.pop();
        if (val == "null") return nullptr;
        
        TreeNode* root = new TreeNode(stoi(val));
        root->left = helper(q);
        root->right = helper(q);
        return root;
    }
};
\`\`\`

## Using Level Order
\`\`\`cpp
string serialize(TreeNode* root) {
    if (!root) return "";
    string result;
    queue<TreeNode*> q;
    q.push(root);
    
    while (!q.empty()) {
        TreeNode* node = q.front();
        q.pop();
        
        if (node) {
            result += to_string(node->val) + ",";
            q.push(node->left);
            q.push(node->right);
        } else {
            result += "null,";
        }
    }
    return result;
}
\`\`\`
`, order]);
        count++;

        // Arrays - 2D Arrays
        order = await getNextOrder(moduleMap['3. Arrays & Vectors']);
        await client.query(
            "INSERT INTO dsa_topics (module_id, title, content, order_index) VALUES ($1, $2, $3, $4)",
            [moduleMap['3. Arrays & Vectors'], '2D Arrays & Matrix Operations', `
# 2D Arrays (Matrices)

## Declaration & Initialization
\`\`\`cpp
// Static 2D array
int arr[3][4];

// Using vector
vector<vector<int>> matrix(n, vector<int>(m, 0));

// Input
for (int i = 0; i < n; i++) {
    for (int j = 0; j < m; j++) {
        cin >> matrix[i][j];
    }
}
\`\`\`

## Matrix Rotation (90° clockwise)
\`\`\`cpp
void rotate(vector<vector<int>>& matrix) {
    int n = matrix.size();
    
    // Transpose
    for (int i = 0; i < n; i++) {
        for (int j = i + 1; j < n; j++) {
            swap(matrix[i][j], matrix[j][i]);
        }
    }
    
    // Reverse each row
    for (int i = 0; i < n; i++) {
        reverse(matrix[i].begin(), matrix[i].end());
    }
}
\`\`\`

## Spiral Matrix Traversal
\`\`\`cpp
vector<int> spiralOrder(vector<vector<int>>& matrix) {
    vector<int> result;
    if (matrix.empty()) return result;
    
    int top = 0, bottom = matrix.size() - 1;
    int left = 0, right = matrix[0].size() - 1;
    
    while (top <= bottom && left <= right) {
        for (int i = left; i <= right; i++) result.push_back(matrix[top][i]);
        top++;
        
        for (int i = top; i <= bottom; i++) result.push_back(matrix[i][right]);
        right--;
        
        if (top <= bottom) {
            for (int i = right; i >= left; i--) result.push_back(matrix[bottom][i]);
            bottom--;
        }
        
        if (left <= right) {
            for (int i = bottom; i >= top; i--) result.push_back(matrix[i][left]);
            left++;
        }
    }
    return result;
}
\`\`\`

## Search in Row & Column Sorted Matrix
\`\`\`cpp
bool searchMatrix(vector<vector<int>>& matrix, int target) {
    int n = matrix.size(), m = matrix[0].size();
    int row = 0, col = m - 1;
    
    while (row < n && col >= 0) {
        if (matrix[row][col] == target) return true;
        else if (matrix[row][col] > target) col--;
        else row++;
    }
    return false;
}
\`\`\`
`, order]);
        count++;

        // Heaps - Merge K Sorted
        order = await getNextOrder(moduleMap['11. Heaps & Priority Queues']);
        await client.query(
            "INSERT INTO dsa_topics (module_id, title, content, order_index) VALUES ($1, $2, $3, $4)",
            [moduleMap['11. Heaps & Priority Queues'], 'Merge K Sorted Lists/Arrays', `
# Merge K Sorted Lists

\`\`\`cpp
ListNode* mergeKLists(vector<ListNode*>& lists) {
    auto cmp = [](ListNode* a, ListNode* b) { return a->val > b->val; };
    priority_queue<ListNode*, vector<ListNode*>, decltype(cmp)> pq(cmp);
    
    for (ListNode* list : lists) {
        if (list) pq.push(list);
    }
    
    ListNode dummy(0);
    ListNode* tail = &dummy;
    
    while (!pq.empty()) {
        ListNode* node = pq.top();
        pq.pop();
        
        tail->next = node;
        tail = tail->next;
        
        if (node->next) {
            pq.push(node->next);
        }
    }
    return dummy.next;
}
\`\`\`

## Merge K Sorted Arrays
\`\`\`cpp
vector<int> mergeKArrays(vector<vector<int>>& arrays) {
    auto cmp = [](tuple<int,int,int> a, tuple<int,int,int> b) {
        return get<0>(a) > get<0>(b);
    };
    priority_queue<tuple<int,int,int>, vector<tuple<int,int,int>>, decltype(cmp)> pq(cmp);
    
    for (int i = 0; i < arrays.size(); i++) {
        if (!arrays[i].empty()) {
            pq.push({arrays[i][0], i, 0});
        }
    }
    
    vector<int> result;
    while (!pq.empty()) {
        auto [val, arrIdx, elemIdx] = pq.top();
        pq.pop();
        result.push_back(val);
        
        if (elemIdx + 1 < arrays[arrIdx].size()) {
            pq.push({arrays[arrIdx][elemIdx + 1], arrIdx, elemIdx + 1});
        }
    }
    return result;
}
\`\`\`

**Time**: O(N log K) where N = total elements, K = number of lists/arrays
`, order]);
        count++;

        console.log(`\n✅ Added ${count} more topics!`);
        console.log('Batch 2 topics:');
        console.log('  - Fast Exponentiation & Binary Exponentiation');
        console.log('  - Binary Search Advanced (Rotated Array, Binary Search on Answer)');
        console.log('  - Bellman-Ford Algorithm');
        console.log('  - Bipartite Graph Detection');
        console.log('  - Longest Increasing Subsequence (LIS)');
        console.log('  - Serialize and Deserialize Binary Tree');
        console.log('  - 2D Arrays & Matrix Operations');
        console.log('  - Merge K Sorted Lists/Arrays');

    } catch (err) {
        console.error('Error:', err);
    } finally {
        client.release();
        await pool.end();
    }
}

addBatch2();
