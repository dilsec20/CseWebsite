const pool = require('../db');

async function addShortcutsAndTips() {
    const client = await pool.connect();
    try {
        console.log('💡 Adding Pro Tips & Shortcuts to Modules...\n');

        const tips = {
            'Introduction & C++ Basics': `

## 💡 Pro Tips & Shortcuts
- **Built-in Min/Max**: Use \`min(a, b)\` and \`max(a, b)\` instead of if-else.
- **Swap**: \`swap(a, b)\` swaps values instantly.
- **Fast I/O**: Use \`ios_base::sync_with_stdio(false); cin.tie(NULL);\` for faster execution in competitive programming.
- **GCD**: \`__gcd(a, b)\` finds the greatest common divisor (requires \`<algorithm>\`).`,

            'Time & Space Complexity': `

## 💡 Pro Tips & Shortcuts
- **Constraints Check**: Always check input size (N).
  - N ≤ 10-20 → O(2^N) or O(N!)
  - N ≤ 10^4 → O(N²)
  - N ≤ 10^6 → O(N log N) or O(N)
  - N > 10^8 → O(1) or O(log N)
- **Space**: Be careful with recursion depth (stack space).`,

            'Arrays & Vectors': `

## 💡 Pro Tips & Shortcuts
- **Fill**: \`fill(v.begin(), v.end(), val)\` sets all elements to \`val\`.
- **Sort**: \`sort(v.begin(), v.end())\` sorts in ascending order (O(N log N)).
- **Reverse**: \`reverse(v.begin(), v.end())\` reverses the vector.
- **Accumulate**: \`accumulate(v.begin(), v.end(), 0)\` sums up elements (requires \`<numeric>\`).`,

            'Common Array Techniques': `

## 💡 Pro Tips & Shortcuts
- **Memset**: \`memset(arr, 0, sizeof(arr))\` quickly initializes arrays to 0 or -1. (Don't use for other values!).
- **Two Pointers**: Great for sorted arrays (e.g., Two Sum, Remove Duplicates).
- **Sliding Window**: Use for subarray problems (e.g., Max Sum Subarray of size K).`,

            'Strings': `

## 💡 Pro Tips & Shortcuts
- **Character Checks**:
  - \`isalpha(c)\`: Checks if alphabet.
  - \`isdigit(c)\`: Checks if digit.
  - \`isalnum(c)\`: Checks if alphanumeric.
  - \`islower(c)\` / \`isupper(c)\`: Checks case.
- **Conversions**:
  - \`tolower(c)\` / \`toupper(c)\`: Converts case.
  - \`stoi(s)\`: String to Integer.
  - \`to_string(n)\`: Integer to String.
- **Substrings**: \`s.substr(start_index, length)\`.
- **Find**: \`s.find("sub")\` returns index or \`string::npos\` if not found.`,

            'Searching & Sorting': `

## 💡 Pro Tips & Shortcuts
- **Binary Search**: \`binary_search(v.begin(), v.end(), key)\` returns true/false.
- **Lower Bound**: \`lower_bound(v.begin(), v.end(), key)\` returns iterator to first element ≥ key.
- **Upper Bound**: \`upper_bound(v.begin(), v.end(), key)\` returns iterator to first element > key.
- **Custom Sort**: Use lambda functions: \`sort(v.begin(), v.end(), [](int a, int b) { return a > b; });\` for descending.`,

            'Recursion & Backtracking': `

## 💡 Pro Tips & Shortcuts
- **Base Case**: Always define the exit condition first!
- **Pruning**: Stop exploring paths early if they violate constraints (saves huge time).
- **Memoization**: If parameters repeat, store results to convert recursion to DP.`,

            'Linked Lists': `

## 💡 Pro Tips & Shortcuts
- **Dummy Node**: Use a dummy head node to simplify edge cases (inserting/deleting at head).
- **Fast & Slow**: Use two pointers (slow moves 1 step, fast moves 2) to find middle or detect cycles.
- **Reverse**: Master the 3-pointer approach (prev, curr, next) for reversing.`,

            'Stacks & Queues': `

## 💡 Pro Tips & Shortcuts
- **Stack**: LIFO (Last In, First Out). Use for parsing, backtracking, and "next greater" problems.
- **Queue**: FIFO (First In, First Out). Use for BFS.
- **Deque**: Double-ended queue. Useful for sliding window maximum.
- **Priority Queue**: \`priority_queue<int>\` (Max Heap) by default. Use \`priority_queue<int, vector<int>, greater<int>>\` for Min Heap.`,

            'Binary Trees & BST': `

## 💡 Pro Tips & Shortcuts
- **Inorder Traversal**: In a BST, inorder traversal gives sorted values.
- **Height**: \`height = 1 + max(left_height, right_height)\`.
- **BFS**: Use a queue for level-order traversal.
- **DFS**: Use recursion (or stack) for preorder/inorder/postorder.`,

            'Heaps & Priority Queues': `

## 💡 Pro Tips & Shortcuts
- **Kth Elements**:
  - Find Kth Largest → Use Min Heap of size K.
  - Find Kth Smallest → Use Max Heap of size K.
- **Complexity**: Push/Pop is O(log N), Top is O(1).
- **Make Heap**: \`make_heap(v.begin(), v.end())\` converts vector to heap in O(N).`,

            'Graphs': `

## 💡 Pro Tips & Shortcuts
- **Adjacency List**: Use \`vector<vector<int>> adj\` for most problems (saves space).
- **Visited Array**: Always use \`vector<bool> visited\` to prevent cycles in BFS/DFS.
- **BFS**: Finds shortest path in unweighted graphs.
- **DFS**: Good for connectivity and detecting cycles.`,

            'Dynamic Programming': `

## 💡 Pro Tips & Shortcuts
- **Initialization**: \`memset(dp, -1, sizeof(dp))\` is standard for top-down memoization.
- **State Definition**: Clearly define what \`dp[i]\` represents (e.g., "min cost to reach step i").
- **Space Optimization**: If \`dp[i]\` only depends on \`dp[i-1]\` and \`dp[i-2]\`, you only need 2 variables, not an array.`,

            'Bit Manipulation': `

## 💡 Pro Tips & Shortcuts
- **Set Bit Check**: \`if (n & (1 << i))\` checks if ith bit is set.
- **Toggle Bit**: \`n ^= (1 << i)\`.
- **Clear Bit**: \`n &= ~(1 << i)\`.
- **Count Set Bits**: \`__builtin_popcount(n)\` (GCC builtin) or \`bitset<32>(n).count()\`.
- **Power of 2**: \`n > 0 && (n & (n - 1)) == 0\`.
- **LSB**: \`n & -n\` extracts the lowest set bit.`,

            'Number Theory & Math': `

## 💡 Pro Tips & Shortcuts
- **GCD/LCM**: \`__gcd(a, b)\` and \`lcm = (a * b) / gcd(a, b)\`.
- **Modulo Arithmetic**: \`(a + b) % m\`, \`(a * b) % m\`. For subtraction: \`(a - b + m) % m\`.
- **Even/Odd**: \`if (n & 1)\` is faster than \`if (n % 2 != 0)\`.
- **Sieve**: Precompute primes up to N using Sieve of Eratosthenes for O(1) prime checks.`
        };

        let updated = 0;

        // Get all Extra Practice topics
        const topics = await client.query(`
            SELECT t.topic_id, t.content, m.title as module_title
            FROM dsa_topics t
            JOIN dsa_modules m ON t.module_id = m.module_id
            WHERE t.title LIKE '%Extra Practice%'
        `);

        for (const topic of topics.rows) {
            const tipsContent = tips[topic.module_title];

            if (tipsContent) {
                // Check if tips already exist to avoid duplication
                if (!topic.content.includes('## 💡 Pro Tips & Shortcuts')) {
                    const newContent = topic.content + tipsContent;
                    await client.query(
                        'UPDATE dsa_topics SET content = $1 WHERE topic_id = $2',
                        [newContent, topic.topic_id]
                    );
                    console.log(`✅ Added Tips to: ${topic.module_title}`);
                    updated++;
                } else {
                    console.log(`Skipped: ${topic.module_title} (Tips already present)`);
                }
            }
        }

        console.log(`\n🎉 Successfully added Pro Tips to ${updated} modules!`);

    } catch (err) {
        console.error(err);
    } finally {
        client.release();
        await pool.end();
    }
}

addShortcutsAndTips();
