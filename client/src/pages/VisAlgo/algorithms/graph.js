// Graph represented as Adjacency Dictionary: { nodeId: [neighborId, ...] }

export const bfs = (graph, startNode) => {
    const steps = [];
    const queue = [startNode];
    const visited = new Set();
    const traversalOrder = [];

    visited.add(startNode);

    steps.push({
        queue: [...queue],
        visited: [...visited],
        current: null,
        description: `Starting BFS from node ${startNode}`,
        line: 1
    });

    while (queue.length > 0) {
        const currentNode = queue.shift();
        traversalOrder.push(currentNode);

        steps.push({
            queue: [...queue],
            visited: [...visited],
            current: currentNode,
            description: `Visiting Node ${currentNode}`,
            line: 3 // Dequeue and Visit
        });

        const neighbors = graph[currentNode] || [];
        for (const neighbor of neighbors) {
            steps.push({
                queue: [...queue],
                visited: [...visited],
                current: currentNode,
                checking: neighbor,
                description: `Checking neighbor ${neighbor} of Node ${currentNode}`,
                line: 5 // Check neighbor
            });

            if (!visited.has(neighbor)) {
                visited.add(neighbor);
                queue.push(neighbor);
                steps.push({
                    queue: [...queue],
                    visited: [...visited],
                    current: currentNode,
                    checking: neighbor,
                    description: `Node ${neighbor} not visited. Adding to queue.`,
                    line: 7 // Enqueue
                });
            }
        }
    }

    steps.push({
        queue: [],
        visited: [...visited],
        current: null,
        description: `BFS Traversal Complete: ${traversalOrder.join(' -> ')}`,
        line: 10
    });

    return steps;
};

export const dfs = (graph, startNode) => {
    const steps = [];
    const stack = [startNode];
    const visited = new Set();
    const traversalOrder = [];

    // Note: To match standard recursive DFS order visually using a stack, behavior varies.
    // Standard stack DFS pops, visits, then pushes neighbors.
    // We'll simulate standard "Visits" order.

    steps.push({
        stack: [...stack],
        visited: [...visited],
        current: null,
        description: `Starting DFS from node ${startNode}`,
        line: 1
    });

    while (stack.length > 0) {
        const currentNode = stack.pop();

        if (!visited.has(currentNode)) {
            visited.add(currentNode);
            traversalOrder.push(currentNode);

            steps.push({
                stack: [...stack],
                visited: [...visited],
                current: currentNode,
                description: `Visiting Node ${currentNode}`,
                line: 3
            });

            const neighbors = graph[currentNode] || [];
            // Push in reverse order so they are popped in original order
            for (let i = neighbors.length - 1; i >= 0; i--) {
                const neighbor = neighbors[i];
                if (!visited.has(neighbor)) {
                    stack.push(neighbor);
                    steps.push({
                        stack: [...stack],
                        visited: [...visited],
                        current: currentNode,
                        checking: neighbor,
                        description: `Pushing neighbor ${neighbor} to stack`,
                        line: 6
                    });
                }
            }
        }
    }

    return steps;
};


// --- Weighted Graph Algorithms ---

// Helper for priority queue (min-heap simulation)
const getMin = (set, dist) => {
    let minNode = null;
    let minVal = Infinity;
    for (const node of set) {
        if (dist[node] < minVal) {
            minVal = dist[node];
            minNode = node;
        }
    }
    return minNode;
};

export const dijkstra = (adj, startNode, nodes) => {
    // adj is now: { nodeId: [{target, weight}, ...] }
    // But our visualizer currently passes checks: { nodeId: [targetId, ...] }
    // We need to update visualizer to pass weights.

    // For now assuming: adj[u] = [ {to: v, w: 5}, ... ]

    const steps = [];
    const dist = {};
    const parent = {};
    const unvisited = new Set();

    nodes.forEach(n => {
        dist[n.id] = Infinity;
        parent[n.id] = null;
        unvisited.add(n.id);
    });
    dist[startNode] = 0;

    steps.push({
        dist: { ...dist },
        visited: [], // implicitly unvisited = nodes - visited
        current: null,
        description: `Initialize distances. Start Node ${startNode} = 0, others = Infinity`,
        line: 1
    });

    while (unvisited.size > 0) {
        const u = getMin(unvisited, dist);

        if (u === null || dist[u] === Infinity) break; // Remaining nodes unreachable

        unvisited.delete(u);

        steps.push({
            dist: { ...dist },
            visited: nodes.map(n => n.id).filter(id => !unvisited.has(id)),
            current: u,
            description: `picked min dist node ${u} (dist: ${dist[u]})`,
            line: 3
        });

        const neighbors = adj[u] || [];
        for (const edge of neighbors) {
            const v = edge.to;
            const weight = edge.w;

            if (unvisited.has(v)) {
                steps.push({
                    dist: { ...dist },
                    visited: nodes.map(n => n.id).filter(id => !unvisited.has(id)),
                    current: u,
                    checking: v,
                    description: `Checking neighbor ${v} with weight ${weight}`,
                    line: 5
                });

                if (dist[u] + weight < dist[v]) {
                    dist[v] = dist[u] + weight;
                    parent[v] = u;
                    steps.push({
                        dist: { ...dist },
                        visited: nodes.map(n => n.id).filter(id => !unvisited.has(id)),
                        current: u,
                        checking: v,
                        description: `Relaxing ${v}: New dist ${dist[v]}`,
                        line: 6
                    });
                }
            }
        }
    }
    return steps;
};

export const prim = (adj, startNode, nodes) => {
    const steps = [];
    const key = {}; // Min weight to connect to MST
    const parent = {};
    const mstSet = new Set();

    nodes.forEach(n => {
        key[n.id] = Infinity;
        parent[n.id] = null;
    });

    key[startNode] = 0;

    // Set of vertices not yet in MST
    const unvisited = new Set(nodes.map(n => n.id));

    steps.push({
        dist: { ...key }, // Reuse dist visual logic for 'key' values
        visited: [],
        current: null,
        description: `Initialize Keys. Start Node ${startNode} = 0`,
        line: 1
    });

    while (unvisited.size > 0) {
        const u = getMin(unvisited, key);

        if (u === null) break;

        unvisited.delete(u);
        mstSet.add(u);

        steps.push({
            dist: { ...key },
            visited: [...mstSet],
            current: u,
            description: `Grow MST: Added node ${u}`,
            line: 3
        });

        const neighbors = adj[u] || [];
        for (const edge of neighbors) {
            const v = edge.to;
            const weight = edge.w;

            if (unvisited.has(v) && weight < key[v]) {
                parent[v] = u;
                key[v] = weight;
                steps.push({
                    dist: { ...key },
                    visited: [...mstSet],
                    current: u,
                    checking: v,
                    description: `Update Key of ${v} to ${weight}`,
                    line: 5
                });
            }
        }
    }
    return steps;
};

export const bfsCode = `void BFS(int startNode) {
    bool visited[V];
    memset(visited, 0, sizeof(visited));
    queue<int> q;

    visited[startNode] = true;
    q.push(startNode);

    while(!q.empty()) {
        int u = q.front(); q.pop();
        cout << u << " ";

        for(int v : adj[u]) {
            if(!visited[v]) {
                visited[v] = true;
                q.push(v);
            }
        }
    }
}`;
export const dfsCode = `void DFS(int u) {
    visited[u] = true;
    cout << u << " ";
    
    for(int v : adj[u]) {
        if(!visited[v]) {
            DFS(v);
        }
    }
}`;

export const dijkstraCode = `void Dijkstra(int src) {
    dist[src] = 0;
    pq.push({0, src});

    while (!pq.empty()) {
        int u = pq.top().second; pq.pop();

        for (auto edge : adj[u]) {
            int v = edge.to;
            int weight = edge.weight;

            if (dist[u] + weight < dist[v]) {
                dist[v] = dist[u] + weight;
                pq.push({dist[v], v});
            }
        }
    }
}`;

export const primsCode = `void Prim(int src) {
    key[src] = 0;
    pq.push({0, src});

    while (!pq.empty()) {
        int u = pq.top().second; pq.pop();
        inMST[u] = true;

        for (auto edge : adj[u]) {
            int v = edge.to;
            int weight = edge.weight;

            if (!inMST[v] && weight < key[v]) {
                key[v] = weight;
                pq.push({key[v], v});
                parent[v] = u;
            }
        }
    }
}`;
