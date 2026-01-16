export const fibonacci = (n) => {
    const steps = [];
    const memo = {};
    const tree = { id: 'root', val: n, children: [] }; // Visual Recursion Tree

    // We need to build the tree and the execution steps.
    // Since recursion is depth-first, we can just trace it.

    let nodeIdCounter = 0;

    const solve = (k, parentId) => {
        const myId = nodeIdCounter++;
        // Add node to tree (visual)
        steps.push({
            action: 'call',
            val: k,
            id: myId,
            parentId: parentId,
            description: `Calculating Fib(${k})`,
            line: 1
        });

        if (k <= 1) {
            steps.push({
                action: 'return',
                val: k,
                id: myId,
                description: `Base case: Fib(${k}) = ${k}`,
                line: 2
            });
            return k;
        }

        if (memo[k] !== undefined) {
            steps.push({
                action: 'memo_hit',
                val: k,
                id: myId,
                description: `Memo hit! Fib(${k}) = ${memo[k]}`,
                line: 3
            });
            return memo[k];
        }

        // Fib(k-1)
        steps.push({ action: 'left_call', line: 4, description: `Calling Fib(${k - 1})` });
        const left = solve(k - 1, myId);

        // Fib(k-2)
        steps.push({ action: 'right_call', line: 5, description: `Calling Fib(${k - 2})` });
        const right = solve(k - 2, myId);

        const res = left + right;
        memo[k] = res;

        steps.push({
            action: 'resolve',
            val: res,
            id: myId,
            description: `Fib(${k}) = ${left} + ${right} = ${res}`,
            line: 6
        });

        return res;
    };

    solve(n, -1);
    return steps;
};

// We will implement a simpler visualization for DP:
// Just showing the Memoization Table filling up for now.
// Recursion tree is complex to layout dynamically.
// Let's switch to "Coin Change" or "Knapsack" table visualization?
// Or simplest: "Fibonacci" Table format.

export const fibTable = (n) => {
    const steps = [];
    const dp = new Array(n + 1).fill(null);

    steps.push({
        dp: [...dp],
        current: null,
        description: `Initialize DP table of size ${n + 1}`,
        line: 1
    });

    dp[0] = 0;
    steps.push({
        dp: [...dp],
        current: 0,
        description: `Base Case: Fib(0) = 0`,
        line: 2
    });

    dp[1] = 1;
    steps.push({
        dp: [...dp],
        current: 1,
        description: `Base Case: Fib(1) = 1`,
        line: 3
    });

    for (let i = 2; i <= n; i++) {
        steps.push({
            dp: [...dp],
            current: i,
            highlight: [i - 1, i - 2],
            description: `Calculate Fib(${i}) = Fib(${i - 1}) + Fib(${i - 2})`,
            line: 4
        });

        dp[i] = dp[i - 1] + dp[i - 2];

        steps.push({
            dp: [...dp],
            current: i,
            description: `Fib(${i}) = ${dp[i - 1]} + ${dp[i - 2]} = ${dp[i]}`,
            line: 5
        });
    }

    return steps;
};

export const dpCode = `int fib(int n) {
    int dp[n+1];
    dp[0] = 0;
    dp[1] = 1;
    
    for (int i = 2; i <= n; i++) {
        dp[i] = dp[i-1] + dp[i-2];
    }
    
    return dp[n];
}`;
